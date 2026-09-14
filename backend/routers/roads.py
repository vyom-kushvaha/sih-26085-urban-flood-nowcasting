from fastapi import APIRouter, HTTPException, Query, Response

from backend.services.road_exposure import road_exposure
from backend.services.demo_road_scenario import demo_road_exposure
from backend.services import operations as operations_store
from backend.routers.risk import get_risk_engine

router = APIRouter(prefix="/api/v1/roads", tags=["Road exposure"])


def _bounds(west, south, east, north):
    if west >= east or south >= north:
        raise HTTPException(422, "Invalid map bounds")
    if east - west > .50 or north - south > .55:
        raise HTTPException(422, "Visible area exceeds Greater Mumbai coverage")
    return {"west": west, "south": south, "east": east, "north": north}


@router.get("/demo-exposure")
def demo_exposure(response: Response,
                  west: float = Query(..., ge=72.50, le=73.25), south: float = Query(..., ge=18.70, le=19.50),
                  east: float = Query(..., ge=72.50, le=73.25), north: float = Query(..., ge=18.70, le=19.50),
                  zoom: int = Query(13, ge=10, le=19), lead_hours: int = Query(0, ge=0, le=3)):
    response.headers["Cache-Control"] = "public, max-age=300"
    return demo_road_exposure(_bounds(west, south, east, north), zoom, lead_hours)


@router.get("/exposure")
def exposure(response: Response,
             west: float = Query(..., ge=72.50, le=73.25), south: float = Query(..., ge=18.70, le=19.50),
             east: float = Query(..., ge=72.50, le=73.25), north: float = Query(..., ge=18.70, le=19.50),
             zoom: int = Query(13, ge=10, le=19), force_refresh: bool = False):
    bounds = _bounds(west, south, east, north)
    response.headers["Cache-Control"] = "no-store"
    try:
        with operations_store.session() as db:
            observations = operations_store.verified_water_observations(db, bounds)
        return road_exposure(bounds, zoom, get_risk_engine(), force_refresh, observations)
    except ValueError as exc:
        raise HTTPException(422, str(exc)) from exc
    except Exception as exc:
        raise HTTPException(503, "Visible road exposure unavailable") from exc
