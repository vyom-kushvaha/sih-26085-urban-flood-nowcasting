from fastapi import APIRouter, HTTPException
from backend.services.coupled_simulation import CoupledRequest, simulate_coupled
from backend.services.surface_routing import SurfaceRequest, simulate_surface
from backend.services.rainfall_pipeline import RainfallRun, run_rainfall

router = APIRouter(prefix='/api/v1/surface', tags=['Surface prototype'])


@router.post('/forecast')
def forecast(request: RainfallRun):
    try:
        return run_rainfall(request)
    except ValueError as exc:
        raise HTTPException(status_code=422, detail=str(exc)) from exc


@router.post('/coupled')
def coupled(request: CoupledRequest):
    try:
        return simulate_coupled(request)
    except ValueError as exc:
        raise HTTPException(status_code=422, detail=str(exc)) from exc


@router.post('/simulate')
def simulate(request: SurfaceRequest):
    return simulate_surface(request)
