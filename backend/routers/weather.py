"""
FastAPI Router for Real-time Weather Services
Author: Vyom (Lead Architect & Flood Engine Lead)
Project: Urban Flood Nowcasting System (SIH26085)
"""

import sys
import os
from fastapi import APIRouter, HTTPException, Query
from typing import Dict, Any

# Add backend directory to sys.path
sys.path.append(os.path.join(os.path.dirname(__file__), ".."))

from services.weather_service import get_weather_service

router = APIRouter(prefix="/api/v1", tags=["Weather Service"])


@router.get("/weather/current", response_model=Dict[str, Any])
async def get_current_weather_endpoint(
    lat: float = Query(..., ge=-90.0, le=90.0, examples=[19.0760], description="Latitude (-90 to 90)"),
    lon: float = Query(..., ge=-180.0, le=180.0, examples=[72.8777], description="Longitude (-180 to 180)"),
    force_refresh: bool = Query(False, description="Bypass 15-min cache if True")
):
    """
    Get current rainfall intensity (mm/hr) and weather conditions with TTL cache & fallback.
    """
    try:
        service = get_weather_service()
        weather_data = service.get_current_weather(lat=lat, lon=lon, force_refresh=force_refresh)
        return {
            "coordinates": {"lat": lat, "lon": lon},
            "weather": weather_data
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Weather service failed: {str(e)}")


@router.get("/weather/forecast", response_model=Dict[str, Any])
async def get_weather_forecast_endpoint(
    lat: float = Query(..., ge=-90.0, le=90.0, examples=[19.0760], description="Latitude (-90 to 90)"),
    lon: float = Query(..., ge=-180.0, le=180.0, examples=[72.8777], description="Longitude (-180 to 180)"),
    force_refresh: bool = Query(False, description="Bypass 15-min cache if True")
):
    """
    Get 1h, 3h, and 6h rainfall forecast timeline with TTL cache, data quality labels & simulated fallback.
    """
    try:
        service = get_weather_service()
        forecast_data = service.get_weather_forecast(lat=lat, lon=lon, force_refresh=force_refresh)
        return {
            "coordinates": {"lat": lat, "lon": lon},
            "forecast": forecast_data
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Weather forecast failed: {str(e)}")
