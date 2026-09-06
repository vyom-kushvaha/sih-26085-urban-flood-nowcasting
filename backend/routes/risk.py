import sys
from pathlib import Path
from fastapi import APIRouter

# Add flood-engine to sys.path
FLOOD_ENGINE_DIR = Path(__file__).resolve().parents[2] / "flood-engine"
if str(FLOOD_ENGINE_DIR) not in sys.path:
    sys.path.insert(0, str(FLOOD_ENGINE_DIR))

from risk_engine import get_risk_engine

try:
    from backend.routes.weather import get_current_weather
except ImportError:
    from routes.weather import get_current_weather

router = APIRouter(prefix="/risk", tags=["risk"])


@router.get("/current")
async def get_current_risk(
    lat: float = 19.0760,
    lon: float = 72.8777,
    blockage_pct: float = 0.0,
    duration_hours: float = 1.0,
):
    weather = await get_current_weather(lat, lon)
    risk_engine = get_risk_engine()
    risk = risk_engine.calculate_risk(
        lat=lat,
        lon=lon,
        rainfall_mm_hr=weather["rainfall_1h"],
        blockage_pct=blockage_pct,
        duration_hours=duration_hours,
    )
    return {
        "weather": weather,
        "risk": risk,
    }
