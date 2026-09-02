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

import math
from typing import Dict, Any, List
from dem_processor import get_dem_processor
from drainage_processor import get_drainage_processor


class RiskEngine:
    """Core Hydrological Nowcasting & Risk Engine."""

    # Urban Concrete/Asphalt Runoff Coefficient (C) -> 85% of rain becomes runoff
    URBAN_RUNOFF_COEFFICIENT = 0.85

    def __init__(self, dem_dir: str = "data/raw/dem"):
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

        # Slope runoff relief factor (Steeper slopes drain water faster)
        slope_relief = min(gross_runoff, gross_runoff * (slope_pct / 8.0))

        # Net Water Excess Rate (mm/hr)
        net_excess_rate = max(0.0, gross_runoff - effective_drainage - slope_relief)

        # 4. Water Accumulation Depth (mm and cm)
        accumulated_depth_mm = net_excess_rate * duration_hours
        accumulated_depth_cm = round(accumulated_depth_mm / 10.0, 2)

        # 5. Composite Risk Score Calculation (0 to 100)
        if rainfall_mm_hr == 0.0:
            composite_score = 0.0
        else:
            # Sub-score A: Rainfall Intensity (Max at 100 mm/hr)
            rain_score = min(100.0, (rainfall_mm_hr / 100.0) * 100.0)

            # Sub-score B: Drainage Deficit
            if gross_runoff > 0:
                drainage_deficit_ratio = max(0.0, (gross_runoff - effective_drainage) / gross_runoff)
            else:
                drainage_deficit_ratio = 0.0
            drainage_score = drainage_deficit_ratio * 100.0

            # Sub-score C: Terrain Vulnerability
            slope_vulnerability = max(0.0, (3.0 - min(3.0, slope_pct)) / 3.0) * 100.0

            # Weighted Composite Risk Formula
            composite_score = (0.40 * rain_score) + (0.35 * drainage_score) + (0.25 * slope_vulnerability)
            
            # Boost score if water is actively accumulating (> 5 cm depth)
            if accumulated_depth_cm > 15.0:
                composite_score = max(composite_score, 85.0)
            elif accumulated_depth_cm > 5.0:
                composite_score = max(composite_score, 65.0)

        composite_score = min(100.0, round(composite_score, 1))

        # 6. Risk Level Categorization
        if composite_score < 25.0:
            risk_level = "LOW"
            color_code = "#22c55e"  # Green
        elif composite_score < 55.0:
            risk_level = "MODERATE"
            color_code = "#eab308"  # Yellow
        elif composite_score < 80.0:
            risk_level = "HIGH"
            color_code = "#f97316"  # Orange
        else:
            risk_level = "CRITICAL"
            color_code = "#ef4444"  # Red

        # 7. Generate Explainable Contributing Factors
        contributing_factors = []
        if rainfall_mm_hr > 50.0:
            contributing_factors.append(f"Heavy Rainfall ({rainfall_mm_hr} mm/hr)")
        elif rainfall_mm_hr > 20.0:
            contributing_factors.append(f"Moderate Rainfall ({rainfall_mm_hr} mm/hr)")

        if blockage_pct >= 50.0:
            contributing_factors.append(f"Severe Drain Clogging ({blockage_pct}%)")
        elif blockage_pct > 0:
            contributing_factors.append(f"Partial Drain Clogging ({blockage_pct}%)")

        if slope_pct < 1.5 and rainfall_mm_hr > 0:
            contributing_factors.append(f"Flat Lowland Terrain (Slope {slope_pct}%)")

        if not contributing_factors:
            contributing_factors.append("Normal weather & clear drainage capacity")

        return {
            "coordinates": {"lat": lat, "lon": lon},
            "risk_score": composite_score,
            "risk_level": risk_level,
            "color_code": color_code,
            "water_depth_cm": accumulated_depth_cm,
            "water_depth_mm": round(accumulated_depth_mm, 1),
            "nowcast_duration_hours": duration_hours,
            "blockage_pct": blockage_pct,
            "hydrology_metrics": {
                "rainfall_mm_hr": rainfall_mm_hr,
                "gross_runoff_mm_hr": round(gross_runoff, 2),
                "effective_drainage_mm_hr": effective_drainage,
                "elevation_m": elevation_m,
                "slope_percent": slope_pct,
            },
            "drainage": {
                "nearest_drain_name": drainage_info["nearest_drain"]["name"],
                "waterway_type": drainage_info["nearest_drain"]["waterway_type"],
                "distance_meters": drainage_info["nearest_drain"]["distance_meters"],
                "has_spatial_match": drainage_info["nearest_drain"]["has_spatial_match"],
                "drainage_status": drainage_info["drainage_status"],
                "capacity_source": drainage_info["capacity_source"],
                "disclaimer": drainage_info["disclaimer"]
            },
            "contributing_factors": contributing_factors,
            "data_quality": {
                "rainfall": "Realtime / Input",
                "dem_elevation": "Observed CartoDEM 30m" if dem_info["in_dem_coverage"] else "Estimated Urban Default",
                "drainage": drainage_info["capacity_source"]
            }
        }


# Singleton instance
_global_risk_engine = None

def get_risk_engine(dem_dir: str = "data/raw/dem") -> RiskEngine:
    global _global_risk_engine
    if _global_risk_engine is None:
        _global_risk_engine = RiskEngine(dem_dir=dem_dir)
    return _global_risk_engine
