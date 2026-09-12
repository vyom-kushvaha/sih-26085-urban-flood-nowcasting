"""
FastAPI Router for Risk Engine & Elevation Services
Author: Vyom (Lead Architect & Flood Engine Lead)
Project: Urban Flood Nowcasting System (SIH26085)
"""

import sys
import os
from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any, Tuple

# Add flood-engine directory to python path
sys.path.append(os.path.join(os.path.dirname(__file__), "..", "..", "flood-engine"))
sys.path.append(os.path.join(os.path.dirname(__file__), ".."))

from risk_engine import get_risk_engine
from dem_processor import get_dem_processor
from database import log_risk_calculation_db
from backend.services.historical_scenarios import (
    get_historical_scenarios,
    get_historical_scenario,
    get_scenario_replay_rainfall
)
from services.weather_service import get_weather_service
from backend.services.osm_road_router import route as local_osm_route

router = APIRouter(prefix="/api/v1", tags=["Flood Risk & Hydrology"])

# Pydantic Schemas with Strict Range Validation
class RiskCalculationRequest(BaseModel):
    lat: float = Field(..., ge=-90.0, le=90.0, examples=[19.0760], description="Latitude of target location (-90 to 90)")
    lon: float = Field(..., ge=-180.0, le=180.0, examples=[72.8777], description="Longitude of target location (-180 to 180)")
    rainfall_mm_hr: float = Field(35.0, ge=0.0, le=300.0, description="Rainfall intensity in mm/hour")
    blockage_pct: float = Field(0.0, ge=0.0, le=100.0, description="Drainage blockage percentage (0 to 100%)")
    duration_hours: float = Field(1.0, ge=0.5, le=12.0, description="Prediction window in hours")


class RiskForecastRequest(BaseModel):
    lat: float = Field(..., ge=-90.0, le=90.0, examples=[19.0760], description="Latitude of target location (-90 to 90)")
    lon: float = Field(..., ge=-180.0, le=180.0, examples=[72.8777], description="Longitude of target location (-180 to 180)")
    horizon_hours: int = Field(3, ge=1, le=3, description="Forecast horizon in hours (strictly 1 to 3 hours)")
    blockage_pct: float = Field(0.0, ge=0.0, le=100.0, description="Drainage blockage percentage (0 to 100%)")
    force_refresh: bool = Field(False, description="Bypass weather cache if True")


class ScenarioSimulationRequest(BaseModel):
    lat: float = Field(..., ge=-90.0, le=90.0, examples=[19.0760], description="Target latitude (-90 to 90)")
    lon: float = Field(..., ge=-180.0, le=180.0, examples=[72.8777], description="Target longitude (-180 to 180)")
    rainfall_mm_hr: float = Field(50.0, ge=0.0, le=300.0, description="Rainfall intensity in mm/hour")
    blockage_pct: Optional[float] = Field(0.0, ge=0.0, le=100.0, description="Drainage blockage percentage (0 to 100%)")
    duration_hours: Optional[float] = Field(1.0, ge=0.25, le=12.0, description="Rainfall duration in hours")


@router.post("/risk/current", response_model=Dict[str, Any])
async def calculate_current_risk(request: RiskCalculationRequest):
    """
    Calculate real-time flood risk score, water depth, and explainable metrics with safe PostGIS persistence.
    """
    try:
        engine = get_risk_engine()
        result = engine.calculate_risk(
            lat=request.lat,
            lon=request.lon,
            rainfall_mm_hr=request.rainfall_mm_hr,
            blockage_pct=request.blockage_pct,
            duration_hours=request.duration_hours
        )
        
        # Non-blocking PostGIS log
        persistence_status = log_risk_calculation_db(result)
        result["persistence_status"] = persistence_status
        
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Risk calculation failed: {str(e)}")


@router.post("/risk/simulate", response_model=Dict[str, Any])
async def simulate_blockage_scenarios(request: ScenarioSimulationRequest):
    """
    Simulate flood risk across 5 drainage blockage levels (0%, 25%, 50%, 75%, 100%)
    and compute specific user scenario metrics (risk, water depth, effective drainage,
    drainage deficit) powered by the active RiskEngine.
    """
    try:
        engine = get_risk_engine()
        scenarios = []
        blockage_levels = [0.0, 25.0, 50.0, 75.0, 100.0]
        sim_duration = request.duration_hours if request.duration_hours is not None else 1.0
        active_blockage = request.blockage_pct if request.blockage_pct is not None else 0.0

        for pct in blockage_levels:
            scenario_res = engine.calculate_risk(
                lat=request.lat,
                lon=request.lon,
                rainfall_mm_hr=request.rainfall_mm_hr,
                blockage_pct=pct,
                duration_hours=sim_duration
            )
            scenarios.append({
                "blockage_pct": pct,
                "risk_score": scenario_res["risk_score"],
                "risk_level": scenario_res["risk_level"],
                "color_code": scenario_res["color_code"],
                "water_depth_cm": scenario_res["water_depth_cm"],
                "water_depth_mm": scenario_res.get("water_depth_mm", round(scenario_res["water_depth_cm"] * 10.0, 1)),
                "gross_runoff_mm_hr": scenario_res["hydrology_metrics"].get("gross_runoff_mm_hr"),
                "base_drainage_mm_hr": scenario_res["hydrology_metrics"].get("base_drainage_mm_hr"),
                "effective_drainage_mm_hr": scenario_res["hydrology_metrics"]["effective_drainage_mm_hr"],
                "drainage_deficit_mm_hr": scenario_res["hydrology_metrics"].get("drainage_deficit_mm_hr"),
                "drainage_status": scenario_res["drainage"].get("drainage_status")
            })

        # Calculate active scenario for user's specified blockage & duration
        active_res = engine.calculate_risk(
            lat=request.lat,
            lon=request.lon,
            rainfall_mm_hr=request.rainfall_mm_hr,
            blockage_pct=active_blockage,
            duration_hours=sim_duration
        )

        # Baseline scenario for normal conditions (0 mm/hr, 0% blockage)
        baseline_res = engine.calculate_risk(
            lat=request.lat,
            lon=request.lon,
            rainfall_mm_hr=0.0,
            blockage_pct=0.0,
            duration_hours=sim_duration
        )

        # Timeline steps for progressive ponding accumulation / drainage
        # Preserves RiskEngine's mass-balance logic
        net_excess_rate = active_res["hydrology_metrics"].get("net_excess_rate_mm_hr", 0.0)
        effective_drainage = active_res["hydrology_metrics"].get("effective_drainage_mm_hr", 0.0)
        slope_relief = active_res["hydrology_metrics"].get("slope_relief_mm_hr", 0.0)
        drain_rate = effective_drainage + slope_relief

        # Standard dashboard time steps
        timeline_def = [
            ("Now", 0.0),
            ("+30 min", 0.5),
            ("+60 min", 1.0),
            ("+90 min", 1.5),
            ("+120 min", 2.0),
            ("+180 min", 3.0),
        ]

        timeline = []
        for step_idx, (label, t_hr) in enumerate(timeline_def):
            if t_hr == 0.0:
                step_depth_mm = 0.0
            elif t_hr <= sim_duration:
                step_depth_mm = round(net_excess_rate * t_hr, 1)
            else:
                peak_depth_mm = net_excess_rate * sim_duration
                recession_time = t_hr - sim_duration
                step_depth_mm = max(0.0, round(peak_depth_mm - (drain_rate * recession_time), 1))

            step_depth_cm = round(step_depth_mm / 10.0, 2)

            # Determine risk level from step depth & active conditions
            if step_depth_cm > 15.0:
                step_level = "CRITICAL"
                step_color = "#ef4444"
                step_score = max(active_res["risk_score"], 85.0)
            elif step_depth_cm > 5.0:
                step_level = "HIGH"
                step_color = "#f97316"
                step_score = max(active_res["risk_score"], 65.0)
            elif step_depth_cm > 0.0 or (t_hr <= sim_duration and request.rainfall_mm_hr > 20.0):
                step_level = "MODERATE"
                step_color = "#eab308"
                step_score = max(active_res["risk_score"] * 0.7, 40.0)
            else:
                step_level = "LOW"
                step_color = "#22c55e"
                step_score = 0.0 if t_hr == 0.0 else min(active_res["risk_score"], 20.0)

            timeline.append({
                "step": step_idx,
                "label": label,
                "hours": t_hr,
                "minutes": int(t_hr * 60),
                "water_depth_cm": step_depth_cm,
                "water_depth_mm": step_depth_mm,
                "risk_score": round(step_score, 1),
                "risk_level": step_level,
                "color_code": step_color
            })

        return {
            "coordinates": {"lat": request.lat, "lon": request.lon},
            "rainfall_mm_hr": request.rainfall_mm_hr,
            "blockage_pct": active_blockage,
            "duration_hours": sim_duration,
            "active_scenario": {
                "risk_score": active_res["risk_score"],
                "risk_level": active_res["risk_level"],
                "color_code": active_res["color_code"],
                "water_depth_cm": active_res["water_depth_cm"],
                "water_depth_mm": active_res["water_depth_mm"],
                "gross_runoff_mm_hr": active_res["hydrology_metrics"].get("gross_runoff_mm_hr"),
                "base_drainage_mm_hr": active_res["hydrology_metrics"].get("base_drainage_mm_hr"),
                "effective_drainage_mm_hr": active_res["hydrology_metrics"]["effective_drainage_mm_hr"],
                "drainage_deficit_mm_hr": active_res["hydrology_metrics"].get("drainage_deficit_mm_hr"),
                "slope_relief_mm_hr": active_res["hydrology_metrics"].get("slope_relief_mm_hr"),
                "net_excess_rate_mm_hr": active_res["hydrology_metrics"].get("net_excess_rate_mm_hr"),
                "drainage_status": active_res["drainage"].get("drainage_status"),
                "elevation_m": active_res["hydrology_metrics"].get("elevation_m"),
                "slope_percent": active_res["hydrology_metrics"].get("slope_percent"),
                "dem_status": active_res["hydrology_metrics"].get("dem_status"),
                "nearest_drain_name": active_res["drainage"].get("nearest_drain_name"),
                "drain_distance_m": active_res["drainage"].get("distance_meters"),
                "contributing_factors": active_res.get("contributing_factors", [])
            },
            "baseline_scenario": {
                "risk_score": baseline_res["risk_score"],
                "risk_level": baseline_res["risk_level"],
                "color_code": baseline_res["color_code"],
                "water_depth_cm": baseline_res["water_depth_cm"],
                "effective_drainage_mm_hr": baseline_res["hydrology_metrics"]["effective_drainage_mm_hr"]
            },
            "scenarios": scenarios,
            "timeline": timeline
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Simulation failed: {str(e)}")


def compute_risk_forecast(
    lat: float,
    lon: float,
    horizon_hours: int = 3,
    blockage_pct: float = 0.0,
    force_refresh: bool = False
) -> Dict[str, Any]:
    """
    Compute 0 to horizon_hours (max 3 hours) localized flood-risk nowcasting.
    Integrates Open-Meteo numerical weather forecast with the active RiskEngine
    and physical 1D hydrological mass balance for progressive ponding accumulation.
    """
    if not (1 <= horizon_hours <= 3):
        raise ValueError("horizon_hours must be an integer between 1 and 3")

    weather_svc = get_weather_service()
    engine = get_risk_engine()

    # Query weather forecast for T+0 up to T+horizon_hours (horizon_hours + 1 hourly steps)
    steps_count = horizon_hours + 1
    weather_steps = weather_svc.get_hourly_rainfall_forecast(lat, lon, hours=steps_count, force_refresh=force_refresh)

    cumulative_depth_mm = 0.0
    timeline = []
    is_any_mock = False
    sources_used = set()
    root_hydro = {}

    for idx, item in enumerate(weather_steps[:steps_count]):
        h = item.get("hour", idx)
        lead_time = item.get("lead_time", "NOW" if h == 0 else f"+{h} HOUR" if h == 1 else f"+{h} HOURS")
        timestamp = item.get("timestamp", "")
        rainfall_mm_hr = float(item.get("rainfall_mm_hr", 0.0))
        is_mock = bool(item.get("is_mock", False))
        source = item.get("source", "Unknown")
        if is_mock:
            is_any_mock = True
        sources_used.add(source)

        # Call active RiskEngine for 1-hour physical response
        step_res = engine.calculate_risk(
            lat=lat,
            lon=lon,
            rainfall_mm_hr=rainfall_mm_hr,
            blockage_pct=blockage_pct,
            duration_hours=1.0
        )

        hydro = step_res.get("hydrology_metrics", {})
        if idx == 0:
            root_hydro = hydro

        gross_runoff = hydro.get("gross_runoff_mm_hr", 0.0)
        effective_drainage = hydro.get("effective_drainage_mm_hr", 0.0)
        slope_pct = hydro.get("slope_percent", 0.0)
        elevation_m = hydro.get("elevation_m")

        # Slope relief bounded at 25% max
        slope_relief = min(gross_runoff * 0.25, gross_runoff * (slope_pct / 8.0 * 0.25))

        # Hourly excess depth generated in this hour alone
        hourly_excess_depth_mm = max(0.0, gross_runoff - effective_drainage - slope_relief)
        hourly_excess_depth_cm = round(hourly_excess_depth_mm / 10.0, 2)

        # Hydrological mass balance for progressive ponded water depth:
        # Net rate (mm/hr): positive accumulates water, negative allows standing water to drain
        net_rate = gross_runoff - effective_drainage - slope_relief
        if idx == 0:
            cumulative_depth_mm = max(0.0, net_rate * 1.0)
        else:
            cumulative_depth_mm = max(0.0, cumulative_depth_mm + (net_rate * 1.0))

        cumulative_water_depth_cm = round(cumulative_depth_mm / 10.0, 2)

        # Safety adjustment based on standing ponded water depth
        engine_score = step_res.get("risk_score", 0.0)
        if cumulative_water_depth_cm > 15.0:
            forecast_risk_score = max(engine_score, 85.0)
            forecast_risk_level = "CRITICAL"
            forecast_color_code = "#ef4444"
        elif cumulative_water_depth_cm > 5.0:
            forecast_risk_score = max(engine_score, 65.0)
            forecast_risk_level = "HIGH" if forecast_risk_score < 80.0 else "CRITICAL"
            forecast_color_code = "#f97316" if forecast_risk_score < 80.0 else "#ef4444"
        else:
            forecast_risk_score = engine_score
            forecast_risk_level = step_res.get("risk_level", "LOW")
            forecast_color_code = step_res.get("color_code", "#22c55e")

        timeline.append({
            "hour": h,
            "lead_time": lead_time,
            "timestamp": timestamp,
            "rainfall_mm_hr": rainfall_mm_hr,
            "risk_score": forecast_risk_score,
            "risk_level": forecast_risk_level,
            "color_code": forecast_color_code,
            "hourly_water_depth_cm": hourly_excess_depth_cm,
            "cumulative_water_depth_cm": cumulative_water_depth_cm,
            "water_depth_cm": cumulative_water_depth_cm,
            "base_drainage_mm_hr": hydro.get("base_drainage_mm_hr", effective_drainage),
            "effective_drainage_mm_hr": effective_drainage,
            "drainage_deficit_mm_hr": hydro.get("drainage_deficit_mm_hr", 0.0),
            "gross_runoff_mm_hr": gross_runoff,
            "terrain_vulnerability_score": hydro.get("terrain_vulnerability_score", 0.0),
            "elevation_m": elevation_m,
            "slope_percent": slope_pct,
            "contributing_factors": step_res.get("contributing_factors", []),
            "weather_source": source,
            "is_weather_fallback": is_mock
        })

    is_dem_fallback = root_hydro.get("is_dem_fallback", False)
    terrain_prov = "REAL_DATA (Copernicus DEM 30m)" if not is_dem_fallback else "FALLBACK (Default Urban Baseline)"

    return {
        "location": {"lat": lat, "lon": lon},
        "nowcast_type": "weather-forecast-driven urban flood nowcasting",
        "methodology": "Open-Meteo numerical weather prediction coupled with R.A.K.S.H.A.K. 1D runoff mass balance & DEM terrain vulnerability",
        "disclaimer": "Forecast is driven by numerical weather prediction models (Open-Meteo). This is NOT Doppler radar nowcasting or IMD radar assimilation.",
        "horizon_hours": horizon_hours,
        "lead_time_range": f"T+0h to T+{horizon_hours}h",
        "blockage_pct": blockage_pct,
        "terrain": {
            "elevation_m": root_hydro.get("elevation_m"),
            "slope_percent": root_hydro.get("slope_percent"),
            "dem_status": root_hydro.get("dem_status", "REAL_DEM")
        },
        "data_provenance": {
            "weather_input": "FALLBACK_MOCK" if is_any_mock else "REAL_FORECAST",
            "weather_source": ", ".join(sorted(sources_used)),
            "terrain_elevation": terrain_prov,
            "drainage": "Spatial OSM Network" if timeline else "Default",
            "hydrology_model": "R.A.K.S.H.A.K. 1D Runoff & Ponding Engine"
        },
        "forecast": timeline
    }


@router.get("/risk/forecast", response_model=Dict[str, Any])
async def get_risk_forecast(
    lat: float = Query(..., ge=-90.0, le=90.0, examples=[19.0760], description="Latitude (-90 to 90)"),
    lon: float = Query(..., ge=-180.0, le=180.0, examples=[72.8777], description="Longitude (-180 to 180)"),
    horizon_hours: int = Query(3, ge=1, le=3, description="Forecast horizon in hours (strictly 1 to 3 hours)"),
    blockage_pct: float = Query(0.0, ge=0.0, le=100.0, description="Drainage blockage percentage (0 to 100%)"),
    force_refresh: bool = Query(False, description="Bypass weather cache if True")
):
    """
    0-3 Hour Weather-Forecast-Driven Urban Flood Nowcasting.
    Generates localized flood-risk predictions across T+0h to T+Hh (H <= 3) using
    Open-Meteo hourly weather forecast, 30m DEM terrain, and active R.A.K.S.H.A.K. RiskEngine.
    """
    try:
        return compute_risk_forecast(
            lat=lat,
            lon=lon,
            horizon_hours=horizon_hours,
            blockage_pct=blockage_pct,
            force_refresh=force_refresh
        )
    except ValueError as ve:
        raise HTTPException(status_code=422, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Risk forecast failed: {str(e)}")


@router.post("/risk/forecast", response_model=Dict[str, Any])
async def post_risk_forecast(request: RiskForecastRequest):
    """
    0-3 Hour Weather-Forecast-Driven Urban Flood Nowcasting via POST body.
    """
    try:
        return compute_risk_forecast(
            lat=request.lat,
            lon=request.lon,
            horizon_hours=request.horizon_hours,
            blockage_pct=request.blockage_pct,
            force_refresh=request.force_refresh
        )
    except ValueError as ve:
        raise HTTPException(status_code=422, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Risk forecast failed: {str(e)}")


class ScenarioReplayRequest(BaseModel):
    origin: Optional[str] = "Hindmata, Dadar, Mumbai"
    destination: Optional[str] = "Chhatrapati Shivaji Maharaj Park"
    timestep: Optional[str] = Field("peak_burst", description="Timestep: 'peak_burst', 'daily_average', or 'sustained_deluge'")
    force_refresh: Optional[bool] = False


@router.get("/scenarios", response_model=Dict[str, Any])
async def list_historical_scenarios():
    """
    List registered authoritative historical flood scenarios (Mumbai 2005 Deluge, August 2017 Flood)
    with official provenance metadata, observed metrics, and validation disclaimer.
    """
    scenarios = get_historical_scenarios()
    return {
        "status": "success",
        "count": len(scenarios),
        "disclaimer": "All rainfall values sourced directly from official IMD, MHA, MOSDAC/ISRO, and PIB publications. Historical spatial flood-depth ground truth is NOT AVAILABLE.",
        "scenarios": scenarios
    }


@router.get("/scenarios/{scenario_id}", response_model=Dict[str, Any])
async def get_single_historical_scenario(scenario_id: str):
    """
    Retrieve full details, time-series observations, and model comparisons for a single historical scenario.
    """
    sc = get_historical_scenario(scenario_id)
    if not sc:
        raise HTTPException(status_code=404, detail=f"Scenario '{scenario_id}' not found. Valid IDs: ['2005_deluge', '2017_flood']")
    return sc


@router.post("/scenarios/{scenario_id}/replay", response_model=Dict[str, Any])
async def replay_historical_scenario(scenario_id: str, request: Optional[ScenarioReplayRequest] = None):
    """
    Replay an authoritative historical flood scenario through the existing physics + ML hybrid route engine.
    Feeds authentic source-derived rainfall into the operational flood engine without creating a duplicate engine.
    """
    req = request or ScenarioReplayRequest()
    try:
        return calculate_flood_routes(
            origin=req.origin or "Hindmata, Dadar, Mumbai",
            dest=req.destination or "Chhatrapati Shivaji Maharaj Park",
            scenario_id=scenario_id,
            timestep=req.timestep or "peak_burst",
            force_refresh=req.force_refresh or False
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Scenario replay failed: {str(e)}")


@router.get("/elevation", response_model=Dict[str, Any])
async def get_elevation_and_slope(
    lat: float = Query(..., ge=-90.0, le=90.0, examples=[19.0760]),
    lon: float = Query(..., ge=-180.0, le=180.0, examples=[72.8777])
):
    """
    Query 30m terrain elevation (meters) and slope (%) for a given coordinate.
    Exposes authentic DEM raster observations, derived slope gradient, and transparent fallback status.
    """
    try:
        dem_processor = get_dem_processor()
        info = dem_processor.get_elevation_and_slope(lat, lon)
        return {
            "latitude": lat,
            "longitude": lon,
            "coordinates": {"lat": lat, "lon": lon},
            "elevation_m": info["elevation_m"],
            "slope_deg": info["slope_deg"],
            "slope_percent": info["slope_percent"],
            "in_dem_coverage": info["in_dem_coverage"],
            "dem_status": info.get("dem_status", "UNKNOWN"),
            "data_source": info.get("data_source", "Unknown"),
            "tile_filename": info.get("tile_filename"),
            "is_fallback": info.get("is_fallback", False),
            "provenance": info.get("provenance", {
                "elevation": "REAL_DATA" if info["in_dem_coverage"] else "FALLBACK",
                "slope": "MODEL_OUTPUT" if info["in_dem_coverage"] else "FALLBACK"
            })
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Elevation lookup failed: {str(e)}")


@router.get("/risk/explain", response_model=Dict[str, Any])
async def explain_risk_endpoint(
    lat: float = Query(19.0760, ge=-90.0, le=90.0),
    lon: float = Query(72.8777, ge=-180.0, le=180.0),
    rainfall_mm_hr: float = Query(35.0, ge=0.0, le=300.0),
    blockage_pct: float = Query(0.0, ge=0.0, le=100.0),
    duration_hours: float = Query(1.0, ge=0.5, le=12.0)
):
    """
    GET endpoint for explainable flood risk metrics (used by Frontend UI fetch calls).
    """
    try:
        engine = get_risk_engine()
        result = engine.calculate_risk(
            lat=lat,
            lon=lon,
            rainfall_mm_hr=rainfall_mm_hr,
            blockage_pct=blockage_pct,
            duration_hours=duration_hours
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Risk explanation failed: {str(e)}")


@router.get("/risk/geojson/drainage")
async def get_drainage_geojson():
    """
    Serve Mumbai Drainage GeoJSON for interactive Leaflet map rendering.
    """
    geojson_path = os.path.join(os.path.dirname(__file__), "..", "..", "data", "processed", "mumbai_drainage.geojson")
    if not os.path.exists(geojson_path):
        raise HTTPException(status_code=404, detail="Drainage GeoJSON not found")
    try:
        import json
        with open(geojson_path, "r", encoding="utf-8") as f:
            data = json.load(f)
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to read drainage GeoJSON: {str(e)}")


from services.weather_service import get_weather_service
import time
import urllib.request
import urllib.parse
import json


# -----------------------------------------------------------------------------
# MUMBAI METROPOLITAN FLOOD NOWCASTING GEOGRAPHIC BOUNDARY
# Latitude: 18.88°N to 19.32°N | Longitude: 72.75°E to 73.02°E
# -----------------------------------------------------------------------------
MUMBAI_BOUNDS = {
    "min_lat": 18.88,
    "max_lat": 19.32,
    "min_lon": 72.75,
    "max_lon": 73.02,
}

def is_in_mumbai(lat: float, lon: float) -> bool:
    """Validate if coordinates fall within supported Mumbai flood-routing metropolitan boundary."""
    return (
        MUMBAI_BOUNDS["min_lat"] <= lat <= MUMBAI_BOUNDS["max_lat"]
        and MUMBAI_BOUNDS["min_lon"] <= lon <= MUMBAI_BOUNDS["max_lon"]
    )


# -----------------------------------------------------------------------------
# COMPREHENSIVE MUMBAI GAZETTEER & OUT-OF-BOUNDS DIRECTORY
# -----------------------------------------------------------------------------
KNOWN_LOCATIONS: Dict[str, Dict[str, Any]] = {
    # Mumbai Hubs, Stations & Landmarks
    "hindmata": {"name": "Hindmata / Dadar TT, Mumbai", "lat": 19.0178, "lon": 72.8478},
    "dadar tt": {"name": "Dadar TT Circle, Mumbai", "lat": 19.0178, "lon": 72.8478},
    "dadar": {"name": "Dadar, Mumbai", "lat": 19.0182, "lon": 72.8436},
    "dadar west": {"name": "Dadar West, Mumbai", "lat": 19.0200, "lon": 72.8390},
    "dadar east": {"name": "Dadar East, Mumbai", "lat": 19.0180, "lon": 72.8480},
    "shivaji park": {"name": "Chhatrapati Shivaji Maharaj Park, Mumbai", "lat": 19.0272, "lon": 72.8374},
    "chhatrapati shivaji maharaj park": {"name": "Chhatrapati Shivaji Maharaj Park, Mumbai", "lat": 19.0272, "lon": 72.8374},
    "kurla": {"name": "Kurla West, Mumbai", "lat": 19.0657, "lon": 72.8793},
    "kurla west": {"name": "Kurla West, Mumbai", "lat": 19.0657, "lon": 72.8793},
    "kurla east": {"name": "Kurla East, Mumbai", "lat": 19.0680, "lon": 72.8830},
    "kurla station": {"name": "Kurla Railway Station, Mumbai", "lat": 19.0657, "lon": 72.8793},
    "bandra": {"name": "Bandra West, Mumbai", "lat": 19.0596, "lon": 72.8295},
    "bandra west": {"name": "Bandra West, Mumbai", "lat": 19.0596, "lon": 72.8295},
    "bandra east": {"name": "Bandra East, Mumbai", "lat": 19.0620, "lon": 72.8480},
    "bkc": {"name": "Bandra Kurla Complex (BKC), Mumbai", "lat": 19.0674, "lon": 72.8685},
    "bandra kurla complex": {"name": "Bandra Kurla Complex (BKC), Mumbai", "lat": 19.0674, "lon": 72.8685},
    "andheri": {"name": "Andheri East, Mumbai", "lat": 19.1150, "lon": 72.8680},
    "andheri east": {"name": "Andheri East, Mumbai", "lat": 19.1150, "lon": 72.8680},
    "andheri west": {"name": "Andheri West, Mumbai", "lat": 19.1197, "lon": 72.8464},
    "andheri subway": {"name": "Andheri Subway, Mumbai", "lat": 19.1197, "lon": 72.8464},
    "milan subway": {"name": "Milan Subway, Santacruz, Mumbai", "lat": 19.0880, "lon": 72.8420},
    "sion": {"name": "Sion Circle, Mumbai", "lat": 19.0405, "lon": 72.8625},
    "sion circle": {"name": "Sion Circle, Mumbai", "lat": 19.0405, "lon": 72.8625},
    "sion underpass": {"name": "Sion Underpass, Mumbai", "lat": 19.0405, "lon": 72.8625},
    "matunga": {"name": "Matunga / King's Circle, Mumbai", "lat": 19.0270, "lon": 72.8530},
    "kings circle": {"name": "King's Circle, Matunga, Mumbai", "lat": 19.0340, "lon": 72.8540},
    "king's circle": {"name": "King's Circle, Matunga, Mumbai", "lat": 19.0340, "lon": 72.8540},
    "parel": {"name": "Parel, Mumbai", "lat": 19.0068, "lon": 72.8394},
    "lower parel": {"name": "Lower Parel, Mumbai", "lat": 19.0012, "lon": 72.8298},
    "prabhadevi": {"name": "Prabhadevi, Mumbai", "lat": 19.0169, "lon": 72.8306},
    "worli": {"name": "Worli, Mumbai", "lat": 19.0166, "lon": 72.8166},
    "mahim": {"name": "Mahim, Mumbai", "lat": 19.0398, "lon": 72.8415},
    "dharavi": {"name": "Dharavi, Mumbai", "lat": 19.0440, "lon": 72.8540},
    "ghatkopar": {"name": "Ghatkopar, Mumbai", "lat": 19.0860, "lon": 72.9090},
    "vikhroli": {"name": "Vikhroli, Mumbai", "lat": 19.1110, "lon": 72.9280},
    "bhandup": {"name": "Bhandup, Mumbai", "lat": 19.1460, "lon": 72.9370},
    "mulund": {"name": "Mulund, Mumbai", "lat": 19.1726, "lon": 72.9565},
    "chembur": {"name": "Chembur, Mumbai", "lat": 19.0522, "lon": 72.8994},
    "santacruz": {"name": "Santacruz, Mumbai", "lat": 19.0840, "lon": 72.8420},
    "vile parle": {"name": "Vile Parle, Mumbai", "lat": 19.0990, "lon": 72.8440},
    "juhu": {"name": "Juhu, Mumbai", "lat": 19.1075, "lon": 72.8263},
    "khar": {"name": "Khar West, Mumbai", "lat": 19.0700, "lon": 72.8360},
    "goregaon": {"name": "Goregaon, Mumbai", "lat": 19.1663, "lon": 72.8526},
    "malad": {"name": "Malad, Mumbai", "lat": 19.1874, "lon": 72.8484},
    "kandivali": {"name": "Kandivali, Mumbai", "lat": 19.2062, "lon": 72.8517},
    "borivali": {"name": "Borivali, Mumbai", "lat": 19.2307, "lon": 72.8567},
    "dahisar": {"name": "Dahisar, Mumbai", "lat": 19.2570, "lon": 72.8590},
    "colaba": {"name": "Colaba, Mumbai", "lat": 18.9067, "lon": 72.8147},
    "nariman point": {"name": "Nariman Point, Mumbai", "lat": 18.9256, "lon": 72.8242},
    "marine drive": {"name": "Marine Drive, Mumbai", "lat": 18.9322, "lon": 72.8264},
    "csmt": {"name": "CSMT / Fort, Mumbai", "lat": 18.9401, "lon": 72.8354},
    "cst": {"name": "CSMT / Fort, Mumbai", "lat": 18.9401, "lon": 72.8354},
    "byculla": {"name": "Byculla, Mumbai", "lat": 18.9750, "lon": 72.8320},
    "mumbai central": {"name": "Mumbai Central, Mumbai", "lat": 18.9690, "lon": 72.8190},
    "wadala": {"name": "Wadala, Mumbai", "lat": 19.0190, "lon": 72.8600},

    # Known Out-of-Bounds Locations (Trigger clear out-of-boundary response)
    "kathlal": {"name": "Kathlal, Kheda, Gujarat", "lat": 22.8986, "lon": 72.9909},
    "pune": {"name": "Pune, Maharashtra", "lat": 18.5204, "lon": 73.8567},
    "ahmedabad": {"name": "Ahmedabad, Gujarat", "lat": 23.0225, "lon": 72.5714},
    "surat": {"name": "Surat, Gujarat", "lat": 21.1702, "lon": 72.8311},
    "delhi": {"name": "New Delhi, Delhi", "lat": 28.6139, "lon": 77.2090},
    "panvel": {"name": "Panvel, Raigad, Maharashtra", "lat": 18.9894, "lon": 73.1175},
    "kalyan": {"name": "Kalyan, Maharashtra", "lat": 19.2437, "lon": 73.1355},
    "nashik": {"name": "Nashik, Maharashtra", "lat": 19.9975, "lon": 73.7898},
    "bangalore": {"name": "Bengaluru, Karnataka", "lat": 12.9716, "lon": 77.5946},
    "chennai": {"name": "Chennai, Tamil Nadu", "lat": 13.0827, "lon": 80.2707},
    "kolkata": {"name": "Kolkata, West Bengal", "lat": 22.5726, "lon": 88.3639}
}


def resolve_location(
    query: str,
    lat_override: Optional[float] = None,
    lon_override: Optional[float] = None,
    is_dest: bool = False
) -> Dict[str, Any]:
    """
    Resolve a location name or coordinates to {name, lat, lon}.
    Enforces Mumbai bounding box validation and rejects unresolvable queries.
    """
    field_label = "Destination" if is_dest else "Origin"

    # 1. Explicit coordinate overrides provided
    if lat_override is not None and lon_override is not None:
        clat = float(lat_override)
        clon = float(lon_override)
        if not is_in_mumbai(clat, clon):
            raise HTTPException(
                status_code=400,
                detail=f"{field_label} is outside the supported Mumbai flood-routing area."
            )
        return {
            "name": query.strip() if query else f"Location ({clat:.4f}, {clon:.4f})",
            "lat": clat,
            "lon": clon
        }

    q = (query or "").strip()
    if not q:
        raise HTTPException(
            status_code=400,
            detail="Location could not be found. Please select a valid Mumbai location."
        )

    # 2. Check if string is formatted directly as "lat, lon"
    if "," in q:
        parts = q.split(",")
        if len(parts) == 2:
            try:
                clat = float(parts[0].strip())
                clon = float(parts[1].strip())
                if not is_in_mumbai(clat, clon):
                    raise HTTPException(
                        status_code=400,
                        detail=f"{field_label} is outside the supported Mumbai flood-routing area."
                    )
                return {"name": f"Coordinates ({clat:.4f}, {clon:.4f})", "lat": clat, "lon": clon}
            except ValueError:
                pass

    # 3. Fast lookup in KNOWN_LOCATIONS
    clean = q.lower().strip()
    # Normalize common abbreviations and characters
    clean_norm = clean.replace(".", "").replace("/", " ").replace("-", " ")
    # Prefer an exact place name.  Without this, "Dadar" matched the longer
    # "dadar tt" alias first and made origin and destination identical.
    if clean_norm in KNOWN_LOCATIONS:
        v = KNOWN_LOCATIONS[clean_norm]
        if not is_in_mumbai(v["lat"], v["lon"]):
            raise HTTPException(status_code=400, detail=f"{field_label} is outside the supported Mumbai flood-routing area.")
        return {"name": v["name"], "lat": v["lat"], "lon": v["lon"]}
    for k, v in KNOWN_LOCATIONS.items():
        if k in clean_norm:
            if not is_in_mumbai(v["lat"], v["lon"]):
                raise HTTPException(
                    status_code=400,
                    detail=f"{field_label} is outside the supported Mumbai flood-routing area."
                )
            return {"name": v["name"], "lat": v["lat"], "lon": v["lon"]}

    # 4. Online Nominatim geocoding fallback with strict 2.5s timeout
    try:
        url = f"https://nominatim.openstreetmap.org/search?format=json&q={urllib.parse.quote(q)}"
        req = urllib.request.Request(url, headers={"User-Agent": "UrbanFloodNowcasting/1.0"})
        with urllib.request.urlopen(req, timeout=2.5) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            if data and len(data) > 0:
                glat = float(data[0]["lat"])
                glon = float(data[0]["lon"])
                if not is_in_mumbai(glat, glon):
                    raise HTTPException(
                        status_code=400,
                        detail=f"{field_label} is outside the supported Mumbai flood-routing area."
                    )
                return {"name": data[0].get("display_name", q), "lat": glat, "lon": glon}
    except HTTPException:
        raise
    except Exception:
        pass

    # 5. Location unresolvable
    raise HTTPException(
        status_code=400,
        detail="Location could not be found. Please select a valid Mumbai location."
    )


_OSRM_CACHE: Dict[Tuple[float, float, float, float], List[Dict[str, Any]]] = {}


def _query_osrm_routes(o_lat: float, o_lon: float, d_lat: float, d_lon: float, via=None) -> List[Dict[str, Any]]:
    """Query OSRM driving service with alternatives=3 for real-world OSM road routes, with memory caching."""
    cache_key = (o_lat, o_lon, d_lat, d_lon, via)
    if cache_key in _OSRM_CACHE:
        return [dict(r) for r in _OSRM_CACHE[cache_key]]

    try:
        # `overview=full` is deliberate: simplifying this geometry joins distant
        # vertices with straight chords and makes the map look like it crosses
        # buildings.  These coordinates are the routed OSM road shape.
        locations = f"{o_lon},{o_lat};" + (f"{via[1]},{via[0]};" if via else "") + f"{d_lon},{d_lat}"
        url = f"https://router.project-osrm.org/route/v1/driving/{locations}?overview=full&geometries=geojson&alternatives=3&steps=true"
        if via:
            url += "&continue_straight=true&waypoints=0;2&radiuses=250;250;250"
        req = urllib.request.Request(url, headers={"User-Agent": "UrbanFloodNowcasting/1.0"})
        with urllib.request.urlopen(req, timeout=6) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            if data.get("code") == "Ok" and data.get("routes"):
                routes_out = []
                for idx, r in enumerate(data["routes"]):
                    geojson_coords = r.get("geometry", {}).get("coordinates", [])
                    if not geojson_coords or len(geojson_coords) < 2:
                        continue
                    coords = [[pt[1], pt[0]] for pt in geojson_coords]
                    steps = []
                    for leg in r.get("legs", []):
                        for step in leg.get("steps", []):
                            maneuver = step.get("maneuver", {})
                            steps.append({
                                "road_name": step.get("name") or step.get("ref") or "Unnamed road",
                                "distance_m": step.get("distance", 0),
                                "duration_s": step.get("duration", 0),
                                "type": maneuver.get("type", "continue"),
                                "modifier": maneuver.get("modifier", ""),
                                "exit": maneuver.get("exit"),
                                "location": list(reversed(maneuver["location"])) if maneuver.get("location") else None,
                            })

                    dist_km = round(r.get("distance", 0.0) / 1000.0, 1)
                    if dist_km <= 0.0:
                        dist_km = calculate_polyline_distance_km(coords)
                    dur_min = max(1, int(round(r.get("duration", 0.0) / 60.0)))

                    routes_out.append({
                        "id": f"osrm_route_{idx+1}",
                        "name": f"OSM Alternate Corridor {idx+1}" if idx > 0 else "OSM Primary Shortest Route",
                        "coordinates": coords,
                        "geometry_source": "OSRM_ROAD_NETWORK",
                        "steps": steps,
                        "distance_km": dist_km,
                        "estimated_duration_min": dur_min
                    })

                if routes_out and len(_OSRM_CACHE) < 2048:
                    _OSRM_CACHE[cache_key] = [dict(r) for r in routes_out]
                return routes_out
    except Exception:
        pass
    return []


def fetch_osrm_routes(o_lat: float, o_lon: float, d_lat: float, d_lon: float) -> List[Dict[str, Any]]:
    """Return up to three distinct connected driving routes, including nearby corridors."""
    import math
    from concurrent.futures import ThreadPoolExecutor
    key = (o_lat, o_lon, d_lat, d_lon)
    if key in _OSRM_CACHE:
        return [dict(r) for r in _OSRM_CACHE[key]]
    routes = []
    def add(candidate):
        points = {tuple(round(v, 5) for v in p) for p in candidate['coordinates']}
        for existing in routes:
            other = {tuple(round(v, 5) for v in p) for p in existing['coordinates']}
            if len(points & other) / max(1, min(len(points), len(other))) > .9:
                return
        routes.append(dict(candidate))
    for candidate in _query_osrm_routes(o_lat, o_lon, d_lat, d_lon):
        add(candidate)
    if routes and len(routes) < 3:
        # Probe neighbouring corridors, but let OSRM snap and route every metre.
        # No waypoint chord ever becomes displayed geometry.
        scale = math.cos(math.radians((o_lat + d_lat) / 2))
        dx, dy = (d_lon-o_lon)*scale, d_lat-o_lat
        length = math.hypot(dx, dy)
        if length > .001:
            offset = min(.008, max(.003, length*.2))
            probes = [((o_lat+d_lat)/2 + sign*dx/length*offset,
                       (o_lon+d_lon)/2 - sign*dy/length*offset/scale) for sign in (-1, 1)]
            baseline = min(r['distance_km'] for r in routes)
            baseline_uturns = max(sum(s.get('modifier') == 'uturn' for s in r.get('steps', [])) for r in routes)
            with ThreadPoolExecutor(max_workers=2) as pool:
                batches = list(pool.map(lambda via: _query_osrm_routes(o_lat, o_lon, d_lat, d_lon, via), probes))
            for batch in batches:
                for candidate in batch:
                    if candidate['distance_km'] > baseline*1.8 + .3:
                        continue
                    if sum(s.get('modifier') == 'uturn' for s in candidate.get('steps', [])) > baseline_uturns:
                        continue
                    add(candidate)
    routes = sorted(routes, key=lambda r: (r['distance_km'], r['estimated_duration_min']))[:3]
    for index, r in enumerate(routes, 1):
        r['id'] = f'osrm_route_{index}'
        roads = list(dict.fromkeys(s['road_name'] for s in r.get('steps', []) if s.get('road_name') not in (None, 'Unnamed road')))
        r['name'] = 'Via ' + ' / '.join(roads[:2]) if roads else f'Road option {index}'
    if routes and len(_OSRM_CACHE) < 2048:
        _OSRM_CACHE[key] = [dict(r) for r in routes]
    return routes


def fetch_osrm_road_coordinates(o_lat: float, o_lon: float, d_lat: float, d_lon: float) -> Optional[List[List[float]]]:
    """Query OSRM driving service for real-world road coordinates between coordinates, with memory caching."""
    routes = fetch_osrm_routes(o_lat, o_lon, d_lat, d_lon)
    return routes[0]["coordinates"] if routes else None



def haversine_m(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """Calculate distance in meters between two lat/lon points using haversine formula."""
    import math
    R = 6371000.0  # Earth radius in meters
    phi1 = math.radians(lat1)
    phi2 = math.radians(lat2)
    delta_phi = math.radians(lat2 - lat1)
    delta_lambda = math.radians(lon2 - lon1)
    a = math.sin(delta_phi / 2.0)**2 + math.cos(phi1) * math.cos(phi2) * math.sin(delta_lambda / 2.0)**2
    c = 2.0 * math.atan2(math.sqrt(a), math.sqrt(1.0 - a))
    return R * c


def calculate_polyline_distance_km(coords: List[List[float]]) -> float:
    """Sum total distance in km along coordinate list."""
    if len(coords) < 2:
        return 0.1
    total_m = 0.0
    for i in range(len(coords) - 1):
        total_m += haversine_m(coords[i][0], coords[i][1], coords[i+1][0], coords[i+1][1])
    return max(0.1, round(total_m / 1000.0, 1))


def build_forward_corridor(
    o_lat: float,
    o_lon: float,
    intermediate_waypoints: List[List[float]],
    d_lat: float,
    d_lon: float
) -> List[List[float]]:
    """
    Construct a clean forward path from origin (o_lat, o_lon) to destination (d_lat, d_lon)
    by discarding any intermediate waypoints that the user has already passed during movement.
    """
    dist_user_to_dest = haversine_m(o_lat, o_lon, d_lat, d_lon)
    forward_pts = []

    for wpt in intermediate_waypoints:
        wpt_to_dest = haversine_m(wpt[0], wpt[1], d_lat, d_lon)
        dist_from_o = haversine_m(o_lat, o_lon, wpt[0], wpt[1])
        # Keep waypoint if it is closer to destination than origin by at least 15m, and not right at origin
        if dist_from_o > 20.0 and wpt_to_dest < (dist_user_to_dest - 15.0):
            forward_pts.append(wpt)

    # Assemble full route
    full_coords = [[round(o_lat, 5), round(o_lon, 5)]]
    for pt in forward_pts:
        if haversine_m(full_coords[-1][0], full_coords[-1][1], pt[0], pt[1]) > 15.0:
            full_coords.append([round(pt[0], 5), round(pt[1], 5)])

    if haversine_m(full_coords[-1][0], full_coords[-1][1], d_lat, d_lon) > 15.0:
        full_coords.append([round(d_lat, 5), round(d_lon, 5)])
    elif len(full_coords) == 1:
        full_coords.append([round(d_lat, 5), round(d_lon, 5)])

    return full_coords


class RouteCalculationRequest(BaseModel):
    origin: Optional[str] = "Hindmata, Mumbai"
    destination: Optional[str] = "Kurla, Mumbai"
    origin_lat: Optional[float] = None
    origin_lon: Optional[float] = None
    dest_lat: Optional[float] = None
    dest_lon: Optional[float] = None
    rainfall_mm_hr: Optional[float] = None
    blockage_pct: Optional[float] = None
    force_refresh: Optional[bool] = False
    scenario_id: Optional[str] = None
    timestep: Optional[str] = None


def calculate_flood_routes(
    origin: str,
    dest: str,
    o_lat: Optional[float] = None,
    o_lon: Optional[float] = None,
    d_lat: Optional[float] = None,
    d_lon: Optional[float] = None,
    rain: Optional[float] = None,
    blockage_pct: Optional[float] = None,
    force_refresh: bool = False,
    scenario_id: Optional[str] = None,
    timestep: Optional[str] = None
):
    """
    Compute real-time flood-evaluated routes (GREEN, ORANGE, RED) coupled with LIVE weather,
    controlled simulation, or authoritative historical scenario replay (2005 Deluge / 2017 Flood).
    Enforces Mumbai boundary validation, coordinates precision, and segment-level flood safety.
    """
    # 1. Geographic Resolution and Boundary Validation
    resolved_origin = resolve_location(origin, o_lat, o_lon, is_dest=False)
    resolved_dest = resolve_location(dest, d_lat, d_lon, is_dest=True)

    actual_o_lat = resolved_origin["lat"]
    actual_o_lon = resolved_origin["lon"]
    actual_d_lat = resolved_dest["lat"]
    actual_d_lon = resolved_dest["lon"]

    # 2. Obtain Rainfall from Historical Scenario, Live Weather Service, or Controlled Input
    scenario_meta = None
    if scenario_id:
        replay = get_scenario_replay_rainfall(scenario_id, timestep=timestep)
        actual_rain = float(replay["rainfall_mm_hr"])
        is_live = False
        weather_source = f"HISTORICAL_SCENARIO: {replay['scenario_id']} ({replay['event_name']}) - {replay['source_label']}"
        weather_timestamp = "Historical Event"
        weather_temp = 27.0
        weather_condition = f"Historical Deluge Replay ({replay['timestep_label']})"
        scenario_meta = replay
        data_mode = "HISTORICAL_REPLAY"
    elif rain is None:
        try:
            weather_service = get_weather_service()
            weather = weather_service.get_current_weather(lat=actual_o_lat, lon=actual_o_lon, force_refresh=force_refresh)
            actual_rain = float(weather.get("rainfall_mm_hr", 0.0))
            is_live = not weather.get("is_mock", False)
            weather_source = weather.get("source", "OpenWeatherMap API")
            weather_timestamp = weather.get("timestamp", time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()))
            weather_temp = weather.get("temp_c", 28.0)
            weather_condition = weather.get("condition", "Cloudy")
            data_mode = "LIVE_WEATHER" if is_live else "SIMULATED_WEATHER_FALLBACK"
        except Exception as e:
            actual_rain = 0.0
            is_live = False
            weather_source = f"WEATHER_SERVICE_ERROR ({str(e)})"
            weather_timestamp = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
            weather_temp = 28.0
            weather_condition = "Unavailable"
            data_mode = "WEATHER_UNAVAILABLE"
    else:
        actual_rain = float(rain)
        is_live = False
        weather_source = "CONTROLLED_SCENARIO (Simulated Input)"
        weather_timestamp = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
        weather_temp = 28.0
        weather_condition = "Simulated Monsoon"
        data_mode = "CONTROLLED_SIMULATION"

    engine = get_risk_engine()

    # 3. Select 3 Distinct Real-World Road Corridors based on Route Query
    query_text = (origin + " " + dest).lower()
    is_shivaji_park = any(k in query_text for k in ["shivaji", "maharaj park", "dadar west"])
    is_andheri = any(k in query_text for k in ["andheri", "bandra", "airport", "subway"])
    is_sion_dadar = ("sion" in query_text and "dadar" in query_text) and not is_shivaji_park
    origin_destination_distance_m = haversine_m(actual_o_lat, actual_o_lon, actual_d_lat, actual_d_lon)

    if origin_destination_distance_m <= 35.0:
        candidates_def = [{
            "id": "route_arrived",
            "name": "Destination Reached",
            "coordinates": [[actual_o_lat, actual_o_lon], [actual_d_lat, actual_d_lon]],
            "distance_km": origin_destination_distance_m / 1000.0,
            "estimated_duration_min": 0,
            "is_elevated": False,
            "is_depression": False,
            "hotspot_keys": []
        }]
    elif is_shivaji_park:
        cand1 = {
            "id": "route_tilak_flyover",
            "name": "Tilak Flyover & L.J. Road Ridge (Elevated Corridor)",
            "coordinates": build_forward_corridor(actual_o_lat, actual_o_lon, [
                [19.0205, 72.8452],
                [19.0238, 72.8424],
                [19.0255, 72.8402],
                [19.0268, 72.8385],
            ], actual_d_lat, actual_d_lon),
            "distance_km": 2.8,
            "estimated_duration_min": 9,
            "is_elevated": True,
            "is_depression": False,
            "hotspot_keys": []
        }
        cand2 = {
            "id": "route_senapati_arterial",
            "name": "Senapati Bapat Marg & Gokhale Road (Arterial Corridor)",
            "coordinates": build_forward_corridor(actual_o_lat, actual_o_lon, [
                [19.0152, 72.8440],
                [19.0185, 72.8398],
                [19.0222, 72.8382],
                [19.0255, 72.8372],
            ], actual_d_lat, actual_d_lon),
            "distance_km": 2.5,
            "estimated_duration_min": 8,
            "is_elevated": False,
            "is_depression": False,
            "hotspot_keys": ["Hindmata Junction"]
        }
        cand3 = {
            "id": "route_dadar_lowland",
            "name": "Direct Dadar Station Underpass & Basin (Lowland Corridor)",
            "coordinates": build_forward_corridor(actual_o_lat, actual_o_lon, [
                [19.0186, 72.8452],
                [19.0202, 72.8436],
                [19.0226, 72.8415],
                [19.0258, 72.8392],
            ], actual_d_lat, actual_d_lon),
            "distance_km": 1.9,
            "estimated_duration_min": 22,
            "is_elevated": False,
            "is_depression": True,
            "hotspot_keys": ["Hindmata Junction"]
        }
        candidates_def = [cand1, cand2, cand3]

    elif is_andheri:
        cand1 = {
            "id": "route_weh_flyover",
            "name": "Western Express Highway Elevated Corridor (Safest)",
            "coordinates": build_forward_corridor(actual_o_lat, actual_o_lon, [
                [19.0680, 72.8390],
                [19.0850, 72.8520],
                [19.1050, 72.8560],
            ], actual_d_lat, actual_d_lon),
            "distance_km": 9.8,
            "estimated_duration_min": 26,
            "is_elevated": True,
            "is_depression": False,
            "hotspot_keys": []
        }
        cand2 = {
            "id": "route_sv_arterial",
            "name": "S.V. Road & Linking Road Surface Arterial",
            "coordinates": build_forward_corridor(actual_o_lat, actual_o_lon, [
                [19.0740, 72.8350],
                [19.0910, 72.8385],
                [19.1080, 72.8430],
            ], actual_d_lat, actual_d_lon),
            "distance_km": 8.8,
            "estimated_duration_min": 34,
            "is_elevated": False,
            "is_depression": False,
            "hotspot_keys": []
        }
        cand3 = {
            "id": "route_subways_lowland",
            "name": "Direct Subways Corridor (Milan & Andheri Underpasses)",
            "coordinates": build_forward_corridor(actual_o_lat, actual_o_lon, [
                [19.0880, 72.8420],
                [19.1020, 72.8440],
                [19.1197, 72.8464],
            ], actual_d_lat, actual_d_lon),
            "distance_km": 8.2,
            "estimated_duration_min": 52,
            "is_elevated": False,
            "is_depression": True,
            "hotspot_keys": ["Milan Subway", "Andheri Subway"]
        }
        candidates_def = [cand1, cand2, cand3]

    elif is_sion_dadar:
        cand1 = {
            "id": "route_ambedkar_flyover",
            "name": "Dr. Ambedkar Road Elevated Flyover Corridor (Safest)",
            "coordinates": build_forward_corridor(actual_o_lat, actual_o_lon, [
                [19.0350, 72.8580],
                [19.0270, 72.8530],
                [19.0200, 72.8490],
            ], actual_d_lat, actual_d_lon),
            "distance_km": 3.6,
            "estimated_duration_min": 10,
            "is_elevated": True,
            "is_depression": False,
            "hotspot_keys": []
        }
        cand2 = {
            "id": "route_kings_circle_arterial",
            "name": "King's Circle West Surface Avenue",
            "coordinates": build_forward_corridor(actual_o_lat, actual_o_lon, [
                [19.0340, 72.8540],
                [19.0250, 72.8490],
                [19.0195, 72.8465],
            ], actual_d_lat, actual_d_lon),
            "distance_km": 3.2,
            "estimated_duration_min": 12,
            "is_elevated": False,
            "is_depression": False,
            "hotspot_keys": ["Sion Circle Underpass"]
        }
        cand3 = {
            "id": "route_matunga_lowland",
            "name": "Matunga Railway Dip & Lowland Gutter (Dangerous)",
            "coordinates": build_forward_corridor(actual_o_lat, actual_o_lon, [
                [19.0320, 72.8560],
                [19.0260, 72.8520],
                [19.0182, 72.8455],
            ], actual_d_lat, actual_d_lon),
            "distance_km": 2.9,
            "estimated_duration_min": 20,
            "is_elevated": False,
            "is_depression": True,
            "hotspot_keys": ["Sion Circle Underpass", "Hindmata Junction"]
        }
        candidates_def = [cand1, cand2, cand3]

    else:
        # Check Dadar/Hindmata <-> Kurla
        is_kurla_corridor = any(k in query_text for k in ["kurla", "sion", "sclr"])
        if is_kurla_corridor or (abs(actual_o_lat - 19.0178) < 0.03 and abs(actual_d_lat - 19.0657) < 0.03):
            cand1 = {
                "id": "route_sclr_flyover",
                "name": "Elevated Flyover & SCLR Express (Ridge Corridor)",
                "coordinates": build_forward_corridor(actual_o_lat, actual_o_lon, [
                    [19.0210, 72.8560],
                    [19.0340, 72.8650],
                    [19.0460, 72.8710],
                    [19.0610, 72.8790],
                ], actual_d_lat, actual_d_lon),
                "distance_km": 8.8,
                "estimated_duration_min": 24,
                "is_elevated": True,
                "is_depression": False,
                "hotspot_keys": []
            }
            cand2 = {
                "id": "route_ba_arterial",
                "name": "Dr. B.A. Road & Central Surface Arterial",
                "coordinates": build_forward_corridor(actual_o_lat, actual_o_lon, [
                    [19.0275, 72.8525],
                    [19.0380, 72.8590],
                    [19.0480, 72.8660],
                    [19.0585, 72.8740],
                ], actual_d_lat, actual_d_lon),
                "distance_km": 8.0,
                "estimated_duration_min": 28,
                "is_elevated": False,
                "is_depression": False,
                "hotspot_keys": ["Hindmata Junction"]
            }
            cand3 = {
                "id": "route_mithi_lowland",
                "name": "Direct Lowland Basin & Sion Underpass Route",
                "coordinates": build_forward_corridor(actual_o_lat, actual_o_lon, [
                    [19.0280, 72.8520],
                    [19.0405, 72.8625],
                    [19.0520, 72.8710],
                    [19.0662, 72.8780],
                ], actual_d_lat, actual_d_lon),
                "distance_km": 7.4,
                "estimated_duration_min": 45,
                "is_elevated": False,
                "is_depression": True,
                "hotspot_keys": ["Hindmata Junction", "Sion Circle Underpass", "Kurla LBS Basin"]
            }
            candidates_def = [cand1, cand2, cand3]
        else:
            # Arbitrary valid Mumbai pair: Fetch real road geometry from OSRM
            osrm_routes = fetch_osrm_routes(actual_o_lat, actual_o_lon, actual_d_lat, actual_d_lon)
            candidates_def = []
            for idx, ort in enumerate(osrm_routes[:3]):
                cand_id = f"route_osrm_{idx+1}"
                cand_name = f"OSM Alternate Corridor {idx+1}" if idx > 0 else f"OSM Primary Shortest Route"
                candidates_def.append({
                    "id": cand_id,
                    "name": cand_name,
                    "coordinates": ort["coordinates"],
                    "distance_km": ort["distance_km"],
                    "estimated_duration_min": ort["estimated_duration_min"],
                    "is_elevated": False,
                    "is_depression": False,
                    "hotspot_keys": []
                })

    # Displayed vehicle routes must come from the road network, never from the
    # illustrative waypoint corridors above.  Those legacy corridors are still
    # used only for their scenario labels/hotspot metadata while this replacement
    # obtains the complete, turn-by-turn OSM road geometry.
    if origin_destination_distance_m > 35.0:
        osrm_routes = fetch_osrm_routes(actual_o_lat, actual_o_lon, actual_d_lat, actual_d_lon)
        if not osrm_routes:
            offline_route = local_osm_route(actual_o_lat, actual_o_lon, actual_d_lat, actual_d_lon)
            osrm_routes = [offline_route] if offline_route else []
        if not osrm_routes:
            raise HTTPException(status_code=503, detail="No connected road route is available for this journey. No straight-line route will be shown.")
        candidates_def = [{
            "id": route["id"],
            "name": route["name"],
            "coordinates": route["coordinates"],
            "geometry_source": route["geometry_source"],
            "steps": route.get("steps", []),
            "distance_km": route["distance_km"],
            "estimated_duration_min": route["estimated_duration_min"],
            "is_elevated": False,
            "is_depression": False,
            "hotspot_keys": [],
        } for route in osrm_routes[:3]]
    else:
        candidates_def[0]["geometry_source"] = "NO_TRAVEL_REQUIRED"

    # Recalculate accurate dynamic distances and travel durations based on road geometry.
    for cand in candidates_def:
        cand["distance_km"] = calculate_polyline_distance_km(cand["coordinates"])
        speed_factor = 3.0 if cand.get("is_elevated") else (4.0 if not cand.get("is_depression") else 5.5)
        cand["estimated_duration_min"] = max(1, int(round(cand["distance_km"] * speed_factor)))

    # 4. Dynamically compute Active Flood Hotspots with Current Rain
    base_hotspots = [
        {"name": "Hindmata Junction", "lat": 19.0182, "lon": 72.8455},
        {"name": "Sion Circle Underpass", "lat": 19.0405, "lon": 72.8625},
        {"name": "Kurla LBS Basin", "lat": 19.0662, "lon": 72.8780},
        {"name": "Andheri Subway", "lat": 19.1197, "lon": 72.8464},
        {"name": "Milan Subway", "lat": 19.0880, "lon": 72.8420}
    ]

    active_hotspots = []
    for bh in base_hotspots:
        h_blockage = float(blockage_pct) if blockage_pct is not None else min(90.0, 30.0 + (actual_rain * 0.8))
        h_res = engine.calculate_risk(
            lat=bh["lat"],
            lon=bh["lon"],
            rainfall_mm_hr=actual_rain,
            blockage_pct=h_blockage,
            duration_hours=1.0
        )
        h_depth = h_res["water_depth_cm"]
        active_hotspots.append({
            "name": bh["name"],
            "lat": bh["lat"],
            "lon": bh["lon"],
            "depth_cm": h_depth,
            "risk_score": h_res["risk_score"],
            "severity": h_res["risk_level"],
            "desc": f"Rainfall {actual_rain} mm/hr -> {h_depth} cm water depth ({h_res['risk_level']})"
        })

    # 5. Dynamic Hydrological Evaluation for Each Corridor
    evaluated_routes = []
    for cand in candidates_def:
        coords = cand["coordinates"]
        is_depression = cand.get("is_depression", False)
        is_elevated = cand.get("is_elevated", False)

        pt_scores = []
        pt_depths = []
        pt_details = []
        high_risk_pts = []

        for lat, lon in coords:
            if blockage_pct is not None:
                active_b = float(blockage_pct)
            elif is_elevated:
                active_b = 5.0
            elif is_depression:
                active_b = min(90.0, 30.0 + (actual_rain * 0.75)) if actual_rain > 5.0 else 25.0
            else:
                active_b = min(50.0, 15.0 + (actual_rain * 0.40))

            res = engine.calculate_risk(lat=lat, lon=lon, rainfall_mm_hr=actual_rain, blockage_pct=active_b, duration_hours=1.0)
            hydro = res["hydrology_metrics"]
            drain = res["drainage"]
            elev = hydro.get("elevation_m", 15.0)
            slope = hydro.get("slope_percent", 2.0)
            deficit = hydro.get("drainage_deficit_mm_hr", 0.0)

            # Hydrodynamic adjustments for road morphology
            if is_elevated:
                if actual_rain >= 80.0:
                    p_depth = round(min(res["water_depth_cm"], 4.5), 1)
                    p_score = round(min(res["risk_score"], 45.0), 1)
                elif actual_rain >= 50.0:
                    p_depth = round(min(res["water_depth_cm"], 2.5), 1)
                    p_score = round(min(res["risk_score"], 30.0), 1)
                else:
                    p_depth = round(min(res["water_depth_cm"], 1.0), 1)
                    p_score = round(min(res["risk_score"], 20.0), 1)
            elif not is_depression:
                p_depth = round(min(res["water_depth_cm"] * 1.5, 8.0 if actual_rain < 50 else 18.5), 1)
                p_score = round(min(res["risk_score"], 48.0 if actual_rain < 50 else 72.0), 1)
            else:
                # Depressed basins, underpasses, and riverbanks concentrate catchment runoff
                basin_multiplier = 4.5 if actual_rain >= 50 else (3.0 if actual_rain > 10 else 1.5)
                p_depth = round(res["water_depth_cm"] * basin_multiplier, 1) if actual_rain > 0 else 0.0
                p_score = round(min(100.0, res["risk_score"] * 1.15), 1) if actual_rain > 0 else 0.0

            pt_scores.append(p_score)
            pt_depths.append(p_depth)
            pt_details.append(res)

            if p_depth > 15.0 or p_score >= 65.0:
                high_risk_pts.append({
                    "location_name": drain.get("nearest_drain_name") or f"Choke Point ({round(lat, 4)}, {round(lon, 4)})",
                    "coordinates": [round(lat, 5), round(lon, 5)],
                    "water_depth_cm": p_depth,
                    "risk_score": p_score,
                    "risk_level": "CRITICAL" if p_depth > 25.0 or p_score >= 80.0 else "HIGH",
                    "elevation_m": elev,
                    "slope_percent": slope,
                    "drainage_deficit_mm_hr": deficit,
                    "hazard_description": f"Ponding up to {p_depth} cm (DEM elevation: {elev}m MSL, Drainage deficit: {deficit} mm/hr)."
                })

        max_d = round(max(pt_depths), 1) if pt_depths else 0.0
        avg_d = round(sum(pt_depths) / len(pt_depths), 1) if pt_depths else 0.0
        route_score = round(0.65 * max(pt_scores) + 0.35 * (sum(pt_scores) / len(pt_scores)), 1) if pt_scores else 0.0
        num_high_risk = len(high_risk_pts)
        terrain_valid = bool(pt_details) and all(p.get("prediction_valid", False) for p in pt_details)

        # Segment-Level Flood Safety Enforcement:
        # A route CANNOT be SAFE/GREEN if ANY segment has depth > 15 cm or score >= 65, or crosses inundated hotspots
        has_critical_segment = any(d > 15.0 or s >= 65.0 for d, s in zip(pt_depths, pt_scores))
        has_moderate_segment = any(d > 5.0 or s >= 35.0 for d, s in zip(pt_depths, pt_scores))
        passes_inundated_hotspot = any(h["name"] in cand.get("hotspot_keys", []) and h["depth_cm"] > 15.0 for h in active_hotspots)

        if not terrain_valid:
            color = "#64748B"
            level = "UNAVAILABLE"
            category = "UNAVAILABLE"
            status_text = "Flood assessment unavailable"
            badge = "TERRAIN DATA REQUIRED"
            reason = "Route geometry is available, but flood safety cannot be assessed because validated terrain is unavailable."
        elif has_critical_segment or passes_inundated_hotspot or max_d > 15.0 or route_score >= 65.0:
            color = "#EF4444"  # Red
            level = "CRITICAL" if max_d > 25.0 or route_score >= 80.0 else "HIGH"
            category = "DANGER"
            status_text = "Dangerous / High Flood Hazard"
            badge = f"⛔ DANGER: {max_d} cm depth (Inundated)"
            reason = f"Severe flooding hazard! Route contains impassable segments inundated up to {max_d} cm. High vehicle stalling and submersion hazard."
        elif has_moderate_segment or max_d > 5.0 or route_score >= 30.0:
            color = "#F59E0B"  # Orange
            level = "MODERATE"
            category = "MODERATE"
            status_text = "Moderate Risk (Caution)"
            badge = f"⚠️ CAUTION: {max_d} cm depth (Ponding)"
            reason = f"Stormwater ponding detected along corridor ({max_d} cm max depth). Passable with caution; expect reduced speeds."
        else:
            color = "#10B981"  # Green
            level = "LOW"
            category = "SAFE"
            status_text = "Safest / Low Flood Risk"
            badge = f"✅ SAFE: {max_d} cm depth (Passable)"
            reason = f"Minimal hydrodynamic risk ({route_score}/100). Roadway has 0–{max_d} cm surface water; 100% passable with zero submerged choke points."

        # Penalty score balances risk, depth, high-risk points, and travel time
        penalty = (cand["estimated_duration_min"] * 1.0) + (route_score * 1.2) + (max_d * 2.0) + (num_high_risk * 10.0)

        # Calculate average ML score if available across route waypoints
        valid_ml_pts = [p["ml_score"] for p in pt_details if p.get("ml_score") is not None]
        avg_ml_score = round(sum(valid_ml_pts) / len(valid_ml_pts), 1) if valid_ml_pts else None
        route_calibration_mode = "ml_calibrated" if valid_ml_pts else "physics_fallback"

        evaluated_routes.append({
            "id": cand["id"],
            "name": cand["name"],
            "coordinates": cand["coordinates"],
            "geometry_source": cand.get("geometry_source", "UNVERIFIED"),
            "steps": cand.get("steps", []),
            "distance_km": cand["distance_km"],
            "estimated_duration_min": cand["estimated_duration_min"],
            "risk_score": route_score,
            "physics_score": route_score,
            "ml_score": avg_ml_score,
            "hybrid_score": route_score,
            "calibration_mode": route_calibration_mode,
            "physics_weight": 0.7,
            "ml_weight": 0.3,
            "max_water_depth_cm": max_d,
            "avg_water_depth_cm": avg_d,
            "color": color,
            "risk_category": category,
            "risk_level": level,
            "terrain_valid": terrain_valid,
            "prediction_valid": terrain_valid,
            "status_text": status_text,
            "stroke_style": "dashed" if category == "DANGER" else "solid",
            "badge": badge,
            "reason": reason,
            "advisory": f"Evaluated under {actual_rain} mm/hr rainfall. Modelled risk score: {route_score}/100.",
            "hotspot_keys": cand.get("hotspot_keys", []),
            "flood_risk_score": route_score,
            "flood_risk_level": level,
            "num_high_risk_sections": num_high_risk,
            "major_risk_locations": high_risk_pts[:4],
            "provenance_label": "R.A.K.S.H.A.K._MODELLED_RISK (RiskEngine physics + Copernicus DEM + OSM Drainage)",
            "_penalty": penalty
        })

    # 6. Determine Practical Recommendation & Check Safe Route Availability
    has_safe_route = any(r["risk_category"] == "SAFE" for r in evaluated_routes)
    all_routes_terrain_valid = all(r["terrain_valid"] for r in evaluated_routes)
    if not all_routes_terrain_valid:
        no_safe_warning = "Flood-safe routing is unavailable because validated terrain data is missing. No route is certified safe."
    else:
        no_safe_warning = None if has_safe_route else f"No safe route currently available. All corridors exceed safe flood thresholds under current rainfall conditions ({actual_rain} mm/hr). Travel is not advised."

    # Identify normal (shortest) route and flood-aware safest route
    normal_candidate = min(evaluated_routes, key=lambda r: (r["distance_km"], r["estimated_duration_min"]))
    safest_candidate = min(evaluated_routes, key=lambda r: (
        {"SAFE": 0, "MODERATE": 1, "DANGER": 2, "UNAVAILABLE": 3}[r["risk_category"]],
        r["risk_score"], r["max_water_depth_cm"], r["distance_km"], r["estimated_duration_min"]))

    has_alternatives = len(evaluated_routes) > 1

    for r in evaluated_routes:
        is_safest = (r["id"] == safest_candidate["id"])
        is_normal = (r["id"] == normal_candidate["id"])
        r["is_shortest"] = is_normal
        r["is_safest"] = is_safest and all_routes_terrain_valid

        if not r["terrain_valid"]:
            r["route_type"] = "geometry_only"
            r["route_type_label"] = "Road Geometry Only"
            r["is_recommended"] = False
            r["recommendation_badge"] = "ASSESSMENT UNAVAILABLE"
            r["recommendation_reason"] = "Validated terrain is required before this route can receive a flood-safety recommendation."
        elif not has_alternatives:
            r["route_type"] = "single_available"
            r["route_type_label"] = "Single Available Corridor"
            r["is_recommended"] = True
            r["recommendation_badge"] = "ℹ️ EVALUATED CORRIDOR"
            r["recommendation_reason"] = f"Only one practical road route was returned by the road network. Evaluated with {r['max_water_depth_cm']} cm max depth and {r['risk_score']}/100 flood risk."
        else:
            if is_safest and is_normal and r["risk_category"] == "SAFE":
                r["route_type"] = "shortest_and_safest"
                r["route_type_label"] = "Shortest & Safest Route"
                r["is_recommended"] = True
                r["recommendation_badge"] = "⭐ BEST OVERALL ROUTE"
                r["recommendation_reason"] = f"Optimal choice: both the shortest distance ({r['distance_km']} km) and the safest flood exposure ({r['risk_score']}/100, {r['max_water_depth_cm']} cm depth)."
            elif is_safest:
                r["route_type"] = "flood_aware_safest"
                r["route_type_label"] = "Flood-Aware Safest Route"
                r["is_recommended"] = True
                if has_safe_route:
                    r["recommendation_badge"] = "⭐ RECOMMENDED ROUTE"
                    r["recommendation_reason"] = f"Recommended safe corridor. Safest option avoiding flood choke points ({r['risk_score']}/100, {r['max_water_depth_cm']} cm depth, {r['num_high_risk_sections']} high-risk points)."
                else:
                    r["recommendation_badge"] = "⚠️ LEAST HAZARDOUS ROUTE"
                    r["recommendation_reason"] = f"Caution: No completely safe route is available under {actual_rain} mm/hr rainfall. This corridor has the lowest relative hazard ({r['risk_score']}/100, {r['max_water_depth_cm']} cm depth), but travel should be avoided if possible."
            elif is_normal:
                r["route_type"] = "shortest_normal"
                r["route_type_label"] = "Shortest / Normal Route"
                r["is_recommended"] = False
                r["recommendation_badge"] = "⚡ SHORTEST / UNPROTECTED"
                r["recommendation_reason"] = f"Fastest/shortest corridor without flood avoidance ({r['distance_km']} km), but exhibits higher flood risk ({r['risk_score']}/100, {r['max_water_depth_cm']} cm max depth)."
            else:
                r["route_type"] = "alternative"
                r["route_type_label"] = "Alternative Corridor"
                r["is_recommended"] = False
                r["recommendation_badge"] = None
                r["recommendation_reason"] = None

        r.pop("_penalty", None)

    # Build comparison object
    if has_alternatives:
        risk_diff = round(normal_candidate["risk_score"] - safest_candidate["risk_score"], 1)
        depth_diff = round(max(0.0, normal_candidate["max_water_depth_cm"] - safest_candidate["max_water_depth_cm"]), 1)
        extra_dist = round(max(0.0, safest_candidate["distance_km"] - normal_candidate["distance_km"]), 1)
        extra_time = max(0, safest_candidate["estimated_duration_min"] - normal_candidate["estimated_duration_min"])

        if safest_candidate["id"] == normal_candidate["id"]:
            rec_summary = f"The shortest route ({normal_candidate['name']}) is also the safest available path with minimal flood exposure."
        else:
            rec_summary = f"Flood-aware routing recommends {safest_candidate['name']}: reduces flood risk by {risk_diff} points and water depth by {depth_diff} cm with {extra_dist} km (~{extra_time} min) detour."

        route_comparison = {
            "has_alternatives": True,
            "alternatives_count": len(evaluated_routes),
            "alternative_status": "Multiple road corridors evaluated",
            "normal_route": {
                "id": normal_candidate["id"],
                "name": normal_candidate["name"],
                "distance_km": normal_candidate["distance_km"],
                "estimated_duration_min": normal_candidate["estimated_duration_min"],
                "flood_risk_score": normal_candidate["risk_score"],
                "flood_risk_level": normal_candidate["risk_level"],
                "max_water_depth_cm": normal_candidate["max_water_depth_cm"],
                "num_high_risk_sections": normal_candidate["num_high_risk_sections"],
                "risk_category": normal_candidate["risk_category"]
            },
            "safest_route": {
                "id": safest_candidate["id"],
                "name": safest_candidate["name"],
                "distance_km": safest_candidate["distance_km"],
                "estimated_duration_min": safest_candidate["estimated_duration_min"],
                "flood_risk_score": safest_candidate["risk_score"],
                "flood_risk_level": safest_candidate["risk_level"],
                "max_water_depth_cm": safest_candidate["max_water_depth_cm"],
                "num_high_risk_sections": safest_candidate["num_high_risk_sections"],
                "risk_category": safest_candidate["risk_category"]
            },
            "flood_risk_reduction": risk_diff,
            "risk_reduction_score": risk_diff,
            "water_depth_reduction_cm": depth_diff,
            "depth_reduction_cm": depth_diff,
            "additional_distance_km": extra_dist,
            "extra_distance_km": extra_dist,
            "additional_duration_min": extra_time,
            "extra_duration_min": extra_time,
            "shortest_route_name": normal_candidate["name"],
            "safest_route_name": safest_candidate["name"],
            "recommendation_summary": rec_summary
        }
    else:
        route_comparison = {
            "has_alternatives": False,
            "alternatives_count": 1,
            "alternative_status": "OSRM provided only one practical road route for this origin-destination pair. No safer alternative corridor is currently available.",
            "normal_route": {
                "id": normal_candidate["id"],
                "name": normal_candidate["name"],
                "distance_km": normal_candidate["distance_km"],
                "estimated_duration_min": normal_candidate["estimated_duration_min"],
                "flood_risk_score": normal_candidate["risk_score"],
                "flood_risk_level": normal_candidate["risk_level"],
                "max_water_depth_cm": normal_candidate["max_water_depth_cm"],
                "num_high_risk_sections": normal_candidate["num_high_risk_sections"],
                "risk_category": normal_candidate["risk_category"]
            },
            "safest_route": {
                "id": normal_candidate["id"],
                "name": normal_candidate["name"],
                "distance_km": normal_candidate["distance_km"],
                "estimated_duration_min": normal_candidate["estimated_duration_min"],
                "flood_risk_score": normal_candidate["risk_score"],
                "flood_risk_level": normal_candidate["risk_level"],
                "max_water_depth_cm": normal_candidate["max_water_depth_cm"],
                "num_high_risk_sections": normal_candidate["num_high_risk_sections"],
                "risk_category": normal_candidate["risk_category"]
            },
            "flood_risk_reduction": 0.0,
            "risk_reduction_score": 0.0,
            "water_depth_reduction_cm": 0.0,
            "depth_reduction_cm": 0.0,
            "additional_distance_km": 0.0,
            "extra_distance_km": 0.0,
            "additional_duration_min": 0,
            "extra_duration_min": 0,
            "shortest_route_name": normal_candidate["name"],
            "safest_route_name": normal_candidate["name"],
            "recommendation_summary": "Single practical road route available. No alternative was found to compare."
        }

    # Pointers for backward compatibility
    safest_route_obj = safest_candidate
    danger_route_obj = max(evaluated_routes, key=lambda r: (r["max_water_depth_cm"], r["risk_score"]))
    hazard_points = [h for h in active_hotspots if h["name"] in danger_route_obj.get("hotspot_keys", [])]
    danger_route_obj["hazard_points"] = hazard_points

    dist_to_dest_m = round(haversine_m(actual_o_lat, actual_o_lon, actual_d_lat, actual_d_lon), 1)
    is_arrived = dist_to_dest_m <= 35.0

    return {
        "query": {
            "origin": resolved_origin["name"],
            "destination": resolved_dest["name"],
            "origin_coords": {"lat": actual_o_lat, "lon": actual_o_lon},
            "dest_coords": {"lat": actual_d_lat, "lon": actual_d_lon},
            "rainfall_mm_hr": actual_rain,
            "blockage_pct": float(blockage_pct) if blockage_pct is not None else None,
            "is_live_weather": is_live,
            "weather_source": weather_source,
            "weather_condition": weather_condition,
            "temp_c": weather_temp,
            "timestamp": weather_timestamp,
            "calibration_mode": "ml_calibrated" if any(r.get("calibration_mode") == "ml_calibrated" for r in evaluated_routes) else "physics_fallback",
            "physics_weight": 0.7,
            "ml_weight": 0.3,
            "scenario": scenario_meta,
            "data_mode": data_mode,
            "historical_flood_depth_ground_truth": scenario_meta.get("historical_flood_depth_ground_truth", "NOT APPLICABLE (Live)") if scenario_meta else "NOT APPLICABLE (Live)",
            "validation_status": scenario_meta.get("validation_status", "MODELLED SCENARIO") if scenario_meta else ("MODELLED ESTIMATE" if all_routes_terrain_valid else "UNAVAILABLE: VALIDATED TERRAIN REQUIRED"),
            "accuracy_percentage": None,
            "provenance_disclosure": "Route geometry and prototype risk values are model outputs, not measured road sensor telemetry. A flood-safety recommendation requires validated terrain.",
            "terrain_valid": all_routes_terrain_valid
        },
        "is_arrived": is_arrived,
        "dist_to_dest_m": dist_to_dest_m,
        "safe_route_available": has_safe_route,
        "prediction_valid": all_routes_terrain_valid,
        "data_mode": data_mode,
        "no_safe_route_warning": no_safe_warning,
        "routes": evaluated_routes,
        "route_comparison": route_comparison,
        "provenance_label": "R.A.K.S.H.A.K. prototype estimate; validated terrain required",
        "recommended_route_id": safest_candidate["id"],
        "recommendation_reason": safest_candidate.get("recommendation_reason", "Lowest flood risk corridor."),
        "safe_route": {
            "id": safest_route_obj["id"],
            "name": safest_route_obj["name"],
            "route_type": safest_route_obj.get("route_type"),
            "route_type_label": safest_route_obj.get("route_type_label"),
            "color": safest_route_obj["color"],
            "stroke_style": safest_route_obj["stroke_style"],
            "status": safest_route_obj["risk_category"],
            "risk_level": safest_route_obj["risk_level"],
            "risk_score": safest_route_obj["risk_score"],
            "max_water_depth_cm": safest_route_obj["max_water_depth_cm"],
            "avg_water_depth_cm": safest_route_obj["avg_water_depth_cm"],
            "distance_km": safest_route_obj["distance_km"],
            "estimated_duration_min": safest_route_obj["estimated_duration_min"],
            "additional_time_min": max(0, safest_route_obj["estimated_duration_min"] - danger_route_obj["estimated_duration_min"]),
            "clearance": safest_route_obj["reason"],
            "advisory": safest_route_obj["advisory"],
            "coordinates": safest_route_obj["coordinates"],
            "geometry_source": safest_route_obj["geometry_source"],
            "steps": safest_route_obj["steps"],
            "badge": safest_route_obj["badge"],
            "num_high_risk_sections": safest_route_obj.get("num_high_risk_sections", 0),
            "major_risk_locations": safest_route_obj.get("major_risk_locations", []),
            "provenance_label": safest_route_obj.get("provenance_label")
        },
        "danger_route": {
            "id": danger_route_obj["id"],
            "name": danger_route_obj["name"],
            "route_type": danger_route_obj.get("route_type"),
            "route_type_label": danger_route_obj.get("route_type_label"),
            "color": danger_route_obj["color"],
            "stroke_style": danger_route_obj["stroke_style"],
            "status": danger_route_obj["risk_category"],
            "risk_level": danger_route_obj["risk_level"],
            "risk_score": danger_route_obj["risk_score"],
            "max_water_depth_cm": danger_route_obj["max_water_depth_cm"],
            "avg_water_depth_cm": danger_route_obj["avg_water_depth_cm"],
            "distance_km": danger_route_obj["distance_km"],
            "estimated_duration_min": danger_route_obj["estimated_duration_min"],
            "hazard": danger_route_obj["reason"],
            "advisory": danger_route_obj["advisory"],
            "coordinates": danger_route_obj["coordinates"],
            "geometry_source": danger_route_obj["geometry_source"],
            "steps": danger_route_obj["steps"],
            "badge": danger_route_obj["badge"],
            "hazard_points": hazard_points,
            "num_high_risk_sections": danger_route_obj.get("num_high_risk_sections", 0),
            "major_risk_locations": danger_route_obj.get("major_risk_locations", []),
            "provenance_label": danger_route_obj.get("provenance_label")
        },
        "active_flood_hotspots": active_hotspots
    }


@router.get("/routing/safe-route", response_model=Dict[str, Any])
@router.get("/risk/safe-route", response_model=Dict[str, Any])
async def get_safe_route(
    origin: str = Query("Hindmata, Mumbai", description="Origin name or address"),
    destination: str = Query("Kurla, Mumbai", description="Destination name or address"),
    origin_lat: Optional[float] = Query(None, ge=-90.0, le=90.0),
    origin_lon: Optional[float] = Query(None, ge=-180.0, le=180.0),
    dest_lat: Optional[float] = Query(None, ge=-90.0, le=90.0),
    dest_lon: Optional[float] = Query(None, ge=-180.0, le=180.0),
    rainfall_mm_hr: Optional[float] = Query(None, ge=0.0, le=300.0, description="Optional override. If omitted, uses LIVE weather."),
    blockage_pct: Optional[float] = Query(None, ge=0.0, le=100.0, description="Optional drainage blockage percentage override."),
    force_refresh: bool = Query(False, description="Force fresh live weather fetch"),
    scenario_id: Optional[str] = Query(None, description="Authoritative historical scenario ID: '2005_deluge' or '2017_flood'"),
    timestep: Optional[str] = Query(None, description="Timestep: 'peak_burst', 'daily_average', 'sustained_deluge'")
):
    """
    Compute live flood-evaluated routes (GREEN, ORANGE, RED) coupled with LIVE weather,
    controlled input, or authoritative historical scenario replay.
    """
    try:
        return calculate_flood_routes(
            origin=origin,
            dest=destination,
            o_lat=origin_lat,
            o_lon=origin_lon,
            d_lat=dest_lat,
            d_lon=dest_lon,
            rain=rainfall_mm_hr,
            blockage_pct=blockage_pct,
            force_refresh=force_refresh,
            scenario_id=scenario_id,
            timestep=timestep
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Route calculation failed: {str(e)}")


@router.post("/routing/safe-route", response_model=Dict[str, Any])
@router.post("/risk/safe-route", response_model=Dict[str, Any])
async def post_safe_route(request: RouteCalculationRequest):
    """
    Compute live flood-evaluated routes via POST body with optional historical scenario replay.
    """
    try:
        return calculate_flood_routes(
            origin=request.origin or "Hindmata, Mumbai",
            dest=request.destination or "Kurla, Mumbai",
            o_lat=request.origin_lat,
            o_lon=request.origin_lon,
            d_lat=request.dest_lat,
            d_lon=request.dest_lon,
            rain=request.rainfall_mm_hr,
            blockage_pct=request.blockage_pct,
            force_refresh=request.force_refresh or False,
            scenario_id=request.scenario_id,
            timestep=request.timestep
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Route calculation failed: {str(e)}")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Route calculation failed: {str(e)}")




