from fastapi import APIRouter, HTTPException
import sys
from pathlib import Path

FLOOD_ENGINE_DIR = Path(__file__).resolve().parents[2] / "flood-engine"
sys.path.insert(0, str(FLOOD_ENGINE_DIR))

from demo_api import get_demo_area

router = APIRouter(prefix="/demo", tags=["demo"])


@router.get("/{city}/{area}")
async def get_demo(city: str, area: str):
    data = get_demo_area(city, area)

    if data is None:
        raise HTTPException(
            status_code=404,
            detail="City or area not found in demo data."
        )

    return {
        "city": city,
        "area": area,
        "demo_data": data
    }
