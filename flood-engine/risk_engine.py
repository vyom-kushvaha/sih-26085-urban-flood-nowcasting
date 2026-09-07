"""
Hydrological Composite Flood Risk & Runoff Nowcasting Engine
Author: Vyom (Lead Architect & Flood Engine Lead)
Project: Urban Flood Nowcasting System (SIH26085)

This module couples:
1. Real-time / Forecast Rainfall Intensity (mm/hr)
2. DEM Elevation & Terrain Slope (%)
3. Effective Drainage Capacity, Clogging Factor & Nearest Drain Proximity
4. Urban Runoff Coefficients (Rational Method / Diffusive Wave Approximation)

Produces:
- Flood Risk Score (0 - 100)
- Risk Level (LOW, MODERATE, HIGH, CRITICAL)
- Estimated Water Depth (cm)
- Nearest Drain Spatial Proximity (Name, Waterway Type, Distance in Meters)
- Data Quality & Transparency Disclaimer Labels
"""

import os
import sys
import math
from typing import Dict, Any, List

# Ensure project root is in sys.path for ml_model and hybrid_model
_project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
if _project_root not in sys.path:
    sys.path.insert(0, _project_root)

from dem_processor import get_dem_processor
from drainage_processor import get_drainage_processor
from ml_model import get_ml_model, FloodMLModel
from hybrid_model import calculate_hybrid_risk


class RiskEngine:
    """Core Hydrological Nowcasting & Risk Engine."""

    # Urban Concrete/Asphalt Runoff Coefficient (C) -> 85% of rain becomes runoff
    URBAN_RUNOFF_COEFFICIENT = 0.85

    def __init__(self, dem_dir: Optional[str] = None, dem_processor: Optional[Any] = None):
        if dem_processor is not None:
            self.dem_processor = dem_processor
        else:
            self.dem_processor = get_dem_processor(dem_dir=dem_dir)
        self.drainage_processor = get_drainage_processor()

    def calculate_risk(
        self,
        lat: float,
        lon: float,
        rainfall_mm_hr: float,
        blockage_pct: float = 0.0,
        duration_hours: float = 1.0
    ) -> Dict[str, Any]:
        """
        Calculate real-time / nowcasting flood risk score and water accumulation.

        Args:
            lat: Latitude
            lon: Longitude
            rainfall_mm_hr: Rainfall rate in mm/hour
            blockage_pct: Drain blockage percentage (0.0 - 100.0)
            duration_hours: Nowcasting prediction window (e.g. 1.0, 3.0, 6.0 hours)

        Returns:
            Structured risk assessment dictionary with score, category, water depth, drainage proximity, and transparency labels.
        """
        # 1. Fetch Elevation & Terrain Slope
        dem_info = self.dem_processor.get_elevation_and_slope(lat, lon)
        elevation_m = dem_info["elevation_m"]
        slope_pct = dem_info["slope_percent"]

        # 2. Fetch Drainage Capacity & Spatial Proximity
        drainage_info = self.drainage_processor.calculate_effective_capacity(
            lat, lon, blockage_pct=blockage_pct
        )
        effective_drainage = drainage_info["effective_capacity_mm_hr"]

        # 3. Calculate Surface Runoff Rate (mm/hr)
        gross_runoff = rainfall_mm_hr * self.URBAN_RUNOFF_COEFFICIENT

        # Drainage Deficit Rate (mm/hr): Runoff exceeding effective evacuation capacity
        drainage_deficit_rate = max(0.0, gross_runoff - effective_drainage)

        # Slope runoff relief factor (Steeper slopes drain water faster)
        # Bounded at 25% max relief: steeper gradient accelerates gravity discharge,
        # but overland sheet flow on impervious concrete cannot completely eliminate extreme rainfall.
        slope_relief = min(gross_runoff * 0.25, gross_runoff * (slope_pct / 8.0 * 0.25))

        # Net Water Excess Rate (mm/hr)
        net_excess_rate = max(0.0, gross_runoff - effective_drainage - slope_relief)

        # 4. Water Accumulation Depth (mm and cm)
        accumulated_depth_mm = net_excess_rate * duration_hours
        accumulated_depth_cm = round(accumulated_depth_mm / 10.0, 2)

        # 5. Composite Risk Score Calculation (0 to 100)
        if rainfall_mm_hr == 0.0:
            composite_score = 0.0
            drainage_deficit_ratio = 0.0
            drainage_score = 0.0
        else:
            # Sub-score A: Rainfall Intensity (Max at 100 mm/hr)
            rain_score = min(100.0, (rainfall_mm_hr / 100.0) * 100.0)

            # Sub-score B: Drainage Deficit
            if gross_runoff > 0:
                drainage_deficit_ratio = min(1.0, max(0.0, (gross_runoff - effective_drainage) / gross_runoff))
            else:
                drainage_deficit_ratio = 0.0
            drainage_score = drainage_deficit_ratio * 100.0

            # Sub-score C: Terrain Vulnerability (Combined Slope & Elevation)
            # Physical rationale:
            # 1. Slope Factor (Manning's overland flow): Steeper slopes accelerate runoff drainage;
            #    flatter ground (< 3% slope) severely impedes gravity evacuation, promoting local ponding.
            # 2. Elevation Factor: Mumbai urban coastal lowlands (<= 15-20m MSL) act as topographical basins
            #    subject to gravitational drainage bottlenecks and tidal backwater constraints.
            #    Elevated ridges (> 25m MSL) shed water naturally toward surrounding catchments.
            # 3. Bounded normalization: Elevation vulnerability is strictly bounded in [0.0, 100.0]
            #    (0% at >= 25.0m MSL, scaling linearly to 100% at <= 5.0m MSL).
            # 4. Low elevation alone NEVER triggers flood risk without rainfall: Sub-score C only
            #    modulates risk when rain > 0 mm/hr. Rainfall (40%) and Drainage Deficit (35%) dominate.
            slope_vulnerability = max(0.0, (3.0 - min(3.0, slope_pct)) / 3.0) * 100.0
            elevation_vulnerability = max(0.0, min(100.0, ((25.0 - elevation_m) / 20.0) * 100.0))
            terrain_vulnerability = (0.60 * slope_vulnerability) + (0.40 * elevation_vulnerability)

            # Weighted Composite Risk Formula (Physics Core: 40% Rain, 35% Drainage, 25% Terrain)
            composite_score = (0.40 * rain_score) + (0.35 * drainage_score) + (0.25 * terrain_vulnerability)
            
            # Boost score if water is actively accumulating (> 5 cm depth)
            if accumulated_depth_cm > 15.0:
                composite_score = max(composite_score, 85.0)
            elif accumulated_depth_cm > 5.0:
                composite_score = max(composite_score, 65.0)

        physics_score = min(100.0, round(composite_score, 1))

        # 6. ML Feature Extraction & Hybrid Risk Integration
        ml_model = get_ml_model()
        features = ml_model.prepare_features(
            rainfall_mm_hr=rainfall_mm_hr,
            water_depth_cm=accumulated_depth_cm,
            slope_percent=slope_pct,
            drainage_capacity_mm_hr=effective_drainage,
            blockage_pct=blockage_pct,
        )

        # Predict ML score (returns None if untrained / unavailable)
        ml_score = ml_model.predict_risk(features)

        # Hybrid risk coupling (70% physics, 30% ML; graceful fallback to physics if ML is None)
        physics_weight = 0.7
        ml_weight = 0.3
        hybrid_score = calculate_hybrid_risk(
            physics_risk=physics_score,
            ml_risk=ml_score,
            physics_weight=physics_weight,
            ml_weight=ml_weight,
        )

        # Safety Enforcement: Critical physical water accumulation cannot be diluted by ML
        if accumulated_depth_cm > 15.0:
            hybrid_score = max(hybrid_score, 85.0)
        elif accumulated_depth_cm > 5.0:
            hybrid_score = max(hybrid_score, 65.0)

        hybrid_score = min(100.0, round(hybrid_score, 1))
        calibration_mode = "ml_calibrated" if ml_score is not None else "physics_fallback"

        # 7. Risk Level Categorization (driven by authoritative hybrid_score)
        if hybrid_score < 25.0:
            risk_level = "LOW"
            color_code = "#22c55e"  # Green
        elif hybrid_score < 55.0:
            risk_level = "MODERATE"
            color_code = "#eab308"  # Yellow
        elif hybrid_score < 80.0:
            risk_level = "HIGH"
            color_code = "#f97316"  # Orange
        else:
            risk_level = "CRITICAL"
            color_code = "#ef4444"  # Red

        # 8. Generate Explainable Contributing Factors
        contributing_factors = []
        if rainfall_mm_hr > 50.0:
            contributing_factors.append(f"Heavy Rainfall ({rainfall_mm_hr} mm/hr)")
        elif rainfall_mm_hr > 20.0:
            contributing_factors.append(f"Moderate Rainfall ({rainfall_mm_hr} mm/hr)")

        if blockage_pct >= 75.0:
            contributing_factors.append(f"Critical Drain Clogging ({blockage_pct}%)")
        elif blockage_pct >= 50.0:
            contributing_factors.append(f"Severe Drain Clogging ({blockage_pct}%)")
        elif blockage_pct > 0:
            contributing_factors.append(f"Partial Drain Clogging ({blockage_pct}%)")

        if drainage_deficit_rate > 15.0 and rainfall_mm_hr > 0:
            contributing_factors.append(f"Severe Drainage Deficit ({round(drainage_deficit_rate, 1)} mm/hr excess)")
        elif drainage_deficit_rate > 0.0 and rainfall_mm_hr > 0:
            contributing_factors.append(f"Moderate Drainage Deficit ({round(drainage_deficit_rate, 1)} mm/hr excess)")

        if slope_pct < 1.5 and rainfall_mm_hr > 0:
            contributing_factors.append(f"Flat Overland Terrain (Slope {slope_pct}%)")

        if elevation_m < 10.0 and rainfall_mm_hr > 0:
            contributing_factors.append(f"Low-lying Coastal Depression ({elevation_m}m MSL)")

        if not contributing_factors:
            contributing_factors.append("Normal weather & clear drainage capacity")

        # Determine explicit DEM data quality provenance
        is_dem_fallback = dem_info.get("is_fallback", not dem_info.get("in_dem_coverage", False))
        if not is_dem_fallback:
            dem_quality_label = f"Observed {dem_info.get('data_source', 'Copernicus GLO-30 DEM 30m')}"
            terrain_provenance = "REAL_DATA (Copernicus DEM 30m) + MODEL_OUTPUT (Slope)"
        else:
            dem_quality_label = f"Fallback Baseline ({dem_info.get('dem_status', 'DEM_UNAVAILABLE')})"
            terrain_provenance = "FALLBACK (Default Urban Baseline)"

        return {
            "coordinates": {"lat": lat, "lon": lon},
            "risk_score": hybrid_score,
            "physics_score": physics_score,
            "ml_score": ml_score,
            "hybrid_score": hybrid_score,
            "physics_weight": physics_weight,
            "ml_weight": ml_weight,
            "calibration_mode": calibration_mode,
            "risk_level": risk_level,
            "color_code": color_code,
            "water_depth_cm": accumulated_depth_cm,
            "water_depth_mm": round(accumulated_depth_mm, 1),
            "nowcast_duration_hours": duration_hours,
            "blockage_pct": blockage_pct,
            "hydrology_metrics": {
                "rainfall_mm_hr": rainfall_mm_hr,
                "gross_runoff_mm_hr": round(gross_runoff, 2),
                "base_drainage_mm_hr": drainage_info.get("base_capacity_mm_hr", effective_drainage),
                "effective_drainage_mm_hr": effective_drainage,
                "drainage_deficit_mm_hr": round(drainage_deficit_rate, 2),
                "drainage_deficit_ratio": round(drainage_deficit_ratio, 3),
                "slope_relief_mm_hr": round(slope_relief, 2),
                "net_excess_rate_mm_hr": round(net_excess_rate, 2),
                "elevation_m": elevation_m,
                "slope_percent": slope_pct,
                "terrain_vulnerability_score": round(terrain_vulnerability, 1) if rainfall_mm_hr > 0 else 0.0,
                "dem_status": dem_info.get("dem_status", "REAL_DEM" if not is_dem_fallback else "DEM_UNAVAILABLE"),
                "is_dem_fallback": is_dem_fallback,
            },
            "drainage": {
                "nearest_drain_name": drainage_info["nearest_drain"]["name"],
                "waterway_type": drainage_info["nearest_drain"]["waterway_type"],
                "distance_meters": drainage_info["nearest_drain"]["distance_meters"],
                "has_spatial_match": drainage_info["nearest_drain"]["has_spatial_match"],
                "osm_id": drainage_info["nearest_drain"].get("osm_id"),
                "local_density_count_1km": drainage_info.get("local_density_count_1km", 0),
                "base_capacity_mm_hr": drainage_info.get("base_capacity_mm_hr", effective_drainage),
                "effective_capacity_mm_hr": effective_drainage,
                "blockage_pct": blockage_pct,
                "drainage_deficit_mm_hr": round(drainage_deficit_rate, 2),
                "drainage_status": drainage_info["drainage_status"],
                "capacity_source": drainage_info["capacity_source"],
                "provenance": drainage_info.get("provenance", {
                    "drainage_geometry": "REAL_DATA (OSM Mapped Surface Waterways & Open Drains)" if drainage_info["nearest_drain"]["has_spatial_match"] else "FALLBACK (Default Baseline)",
                    "capacity_model": "MODELLED_PARAMETER (Continuous proximity & density decay model: 15-55 mm/hr)",
                    "scenario_blockage": f"USER_SUPPLIED_SCENARIO (Blockage: {round(blockage_pct, 1)}%)"
                }),
                "disclaimer": drainage_info["disclaimer"]
            },
            "contributing_factors": contributing_factors,
            "data_quality": {
                "rainfall": "Realtime / Input",
                "dem_elevation": dem_quality_label,
                "terrain_provenance": terrain_provenance,
                "drainage_geometry": "REAL_DATA (OSM Mapped Surface Waterways & Open Drains)" if drainage_info["nearest_drain"]["has_spatial_match"] else "FALLBACK (Default Baseline)",
                "drainage_capacity": drainage_info["capacity_source"],
                "drainage": drainage_info["capacity_source"],
                "model_calibration": calibration_mode
            }
        }


# Singleton instance
_global_risk_engine = None

def get_risk_engine(dem_dir: Optional[str] = None, force_reload: bool = False) -> RiskEngine:
    global _global_risk_engine
    if _global_risk_engine is None or force_reload or (dem_dir is not None and dem_dir != "data/raw/dem"):
        _global_risk_engine = RiskEngine(dem_dir=dem_dir)
    return _global_risk_engine
