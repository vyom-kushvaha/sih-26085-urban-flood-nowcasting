"""Inspect user-supplied drainage networks without persisting input."""
from fastapi import APIRouter, HTTPException
from backend.services.drainage_capacity import CapacityRequest, calculate_capacity
from backend.services.drainage_graph import DrainGraph, inspect_graph
from backend.services.drainage_simulation import SimulationRequest, simulate
from backend.services.network_topology import TopologyRequest, inspect_topology
from backend.services.municipal_model import MunicipalCompileRequest, compile_municipal

router = APIRouter(prefix='/api/v1/drainage', tags=['Drainage graph'])


@router.post('/topology')
def topology(request: TopologyRequest):
    return inspect_topology(request)


@router.post('/municipal-model/compile')
def compile_municipal_model(request: MunicipalCompileRequest):
    """Compile a reviewed public extract without supplying missing survey values."""
    try:
        return compile_municipal(request.data, request.config)
    except (KeyError, TypeError) as exc:
        raise HTTPException(status_code=422, detail='Invalid normalized municipal extract') from exc


@router.post('/simulate')
def simulate_drainage(request: SimulationRequest):
    try:
        return simulate(request)
    except ValueError as exc:
        raise HTTPException(status_code=422, detail=str(exc)) from exc


@router.post('/inspect')
def inspect_drainage(graph: DrainGraph):
    return inspect_graph(graph)


@router.post('/capacity')
def drainage_capacity(request: CapacityRequest):
    try:
        return calculate_capacity(request)
    except ValueError as exc:
        raise HTTPException(status_code=422, detail=str(exc)) from exc
