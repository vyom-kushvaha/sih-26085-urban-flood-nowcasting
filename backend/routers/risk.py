"""
FastAPI Router for Risk Engine & Elevation Services
Author: Vyom (Lead Architect & Flood Engine Lead)
Project: Urban Flood Nowcasting System (SIH26085)
"""

import sys
import os
from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any

# Add flood-engine directory to python path
sys.path.append(os.path.join(os.path.dirname(__file__), "..", "..", "flood-engine"))
sys.path.append(os.path.join(os.path.dirname(__file__), ".."))

from risk_engine import get_risk_engine
from dem_processor import get_dem_processor
from database import log_risk_calculation_db

router = APIRouter(prefix="/api/v1", tags=["Flood Risk & Hydrology"])

# Pydantic Schemas with Strict Range Validation
class RiskCalculationRequest(BaseModel):
    lat: float = Field(..., ge=-90.0, le=90.0, examples=[19.0760], description="Latitude of target location (-90 to 90)")
    lon: float = Field(..., ge=-180.0, le=180.0, examples=[72.8777], description="Longitude of target location (-180 to 180)")
    rainfall_mm_hr: float = Field(35.0, ge=0.0, le=300.0, description="Rainfall intensity in mm/hour")
    blockage_pct: float = Field(0.0, ge=0.0, le=100.0, description="Drainage blockage percentage (0 to 100%)")
    duration_hours: float = Field(1.0, ge=0.5, le=12.0, description="Prediction window in hours")


class ScenarioSimulationRequest(BaseModel):
    lat: float = Field(..., ge=-90.0, le=90.0, examples=[19.0760])
    lon: float = Field(..., ge=-180.0, le=180.0, examples=[72.8777])
    rainfall_mm_hr: float = Field(50.0, ge=0.0, le=300.0)


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
    Simulate flood risk across 5 drainage blockage levels (0%, 25%, 50%, 75%, 100%).
    Used by interactive sliders on the web dashboard.
    """
    try:
        engine = get_risk_engine()
        scenarios = []
        blockage_levels = [0.0, 25.0, 50.0, 75.0, 100.0]

        for pct in blockage_levels:
            scenario_res = engine.calculate_risk(
                lat=request.lat,
                lon=request.lon,
                rainfall_mm_hr=request.rainfall_mm_hr,
                blockage_pct=pct,
                duration_hours=1.0
            )
            scenarios.append({
                "blockage_pct": pct,
                "risk_score": scenario_res["risk_score"],
                "risk_level": scenario_res["risk_level"],
                "color_code": scenario_res["color_code"],
                "water_depth_cm": scenario_res["water_depth_cm"],
                "effective_drainage_mm_hr": scenario_res["hydrology_metrics"]["effective_drainage_mm_hr"]
            })

        return {
            "coordinates": {"lat": request.lat, "lon": request.lon},
            "rainfall_mm_hr": request.rainfall_mm_hr,
            "scenarios": scenarios
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Simulation failed: {str(e)}")


@router.get("/elevation", response_model=Dict[str, Any])
async def get_elevation_and_slope(
    lat: float = Query(..., ge=-90.0, le=90.0, examples=[19.0760]),
    lon: float = Query(..., ge=-180.0, le=180.0, examples=[72.8777])
):
    """
    Query 30m CartoDEM elevation (meters) and slope (%) for a given coordinate.
    """
    try:
        dem_processor = get_dem_processor()
        info = dem_processor.get_elevation_and_slope(lat, lon)
        return {
            "coordinates": {"lat": lat, "lon": lon},
            "elevation_m": info["elevation_m"],
            "slope_deg": info["slope_deg"],
            "slope_percent": info["slope_percent"],
            "in_dem_coverage": info["in_dem_coverage"]
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

