"""Operational rainfall ingestion endpoints."""

from fastapi import APIRouter, HTTPException, Query

from backend.services.rainfall_ingestion import (
    RainfallUnavailable,
    get_rainfall_ingestion_service,
)


router = APIRouter(prefix="/api/v1/rainfall", tags=["Rainfall ingestion"])


@router.get("/current")
def current_rainfall(
    lat: float = Query(..., ge=18.89, le=19.30),
    lon: float = Query(..., ge=72.77, le=72.99),
    force_refresh: bool = False,
):
    try:
        return get_rainfall_ingestion_service().ingest(lat, lon, force_refresh)
    except RainfallUnavailable as exc:
        raise HTTPException(
            status_code=503,
            detail={
                "code": "RAINFALL_UNAVAILABLE",
                "message": "No configured rainfall provider returned a valid observation.",
                "provider_failures": str(exc),
            },
        ) from exc
