import sqlite3
import math
from rasterio.crs import CRS
from rasterio.warp import transform
from uuid import UUID
from fastapi import APIRouter, HTTPException, Query
from backend.services.forecast_store import get_run, save_run, list_runs
from backend.services.rainfall_pipeline import RainfallRun, run_rainfall
from backend.services.forecast_roads import forecast_roads
from backend.services.forecast_hotspots import forecast_hotspots
from backend.services.forecast_routes import route_exposure
from pydantic import BaseModel, ConfigDict, Field, model_validator
from typing import Annotated


class RouteCandidate(BaseModel):
    model_config = ConfigDict(extra='forbid', allow_inf_nan=False)
    id: str = Field(min_length=1, max_length=100)
    coordinates: list[tuple[Annotated[float, Field(ge=-90, le=90)],
                            Annotated[float, Field(ge=-180, le=180)]]] = Field(min_length=2, max_length=10000)


class RouteCandidates(BaseModel):
    model_config = ConfigDict(extra='forbid')
    routes: list[RouteCandidate] = Field(min_length=1, max_length=3)

    @model_validator(mode='after')
    def unique_ids(self):
        if len({r.id for r in self.routes}) != len(self.routes):
            raise ValueError('Candidate IDs must be unique')
        return self

router = APIRouter(prefix='/api/v1/forecasts', tags=['Saved forecasts'])


@router.get('')
def available_forecasts(limit: int = Query(20, ge=1, le=100), offset: int = Query(0, ge=0)):
    try:
        return {'items': list_runs(limit, offset), 'limit': limit, 'offset': offset}
    except Exception as exc:
        raise HTTPException(503, 'Forecast storage unavailable') from exc


@router.post('/{run_id}/route-exposure')
def assess_routes(run_id: UUID, request: RouteCandidates, lead_minutes: int = Query(..., ge=0, le=180)):
    run = read_forecast(run_id)
    snapshot = next((s for s in run['result']['snapshots'] if s['lead_minutes'] == lead_minutes), None)
    if snapshot is None:
        raise HTTPException(404, 'Lead time not saved for this run')
    return {'run_id': str(run_id), **route_exposure(run['result'], snapshot,
                                                   [r.model_dump() for r in request.routes])}


@router.get('/{run_id}/map')
def map_manifest(run_id: UUID):
    """Small map contract: only advertise snapshots actually persisted."""
    run = read_forecast(run_id)
    result = run['result']
    base = f'/api/v1/forecasts/{run_id}'
    return {
        'run_id': str(run_id), 'created_at': run['created_at'],
        'output_quality': result['output_quality'], 'model': result['model'],
        'terrain_source': result['terrain_source'], 'limitations': result['limitations'],
        'is_live': False, 'safe_route_certified': False,
        'snapshots': [
            {'lead_minutes': s['lead_minutes'], 'valid_time': s['valid_time'],
             'layers': {name: f'{base}/{endpoint}?lead_minutes={s["lead_minutes"]}'
                        for name, endpoint in [('depth', 'depth.geojson'),
                                               ('roads', 'roads.geojson'),
                                               ('hotspots', 'hotspots.geojson'),
                                               ('drainage', 'drainage')]}}
            for s in sorted(result['snapshots'], key=lambda s: s['lead_minutes'])
        ],
    }


@router.get('/{run_id}/hotspots.geojson')
def hotspot_layer(run_id: UUID, lead_minutes: int = Query(..., ge=0, le=180),
                  threshold_cm: float = Query(5, ge=1, le=300),
                  limit: int = Query(100, ge=1, le=500)):
    run = read_forecast(run_id)
    snapshot = next((s for s in run['result']['snapshots'] if s['lead_minutes'] == lead_minutes), None)
    if snapshot is None:
        raise HTTPException(404, 'Lead time not saved for this run')
    try:
        return {'run_id': str(run_id), **forecast_hotspots(run['result'], snapshot, threshold_cm, limit)}
    except (ValueError, RuntimeError) as exc:
        raise HTTPException(422, 'Forecast grid cannot produce priority areas') from exc


@router.get('/{run_id}/roads.geojson')
def forecast_road_layer(run_id: UUID, lead_minutes: int = Query(..., ge=0, le=180)):
    run = read_forecast(run_id)
    snapshot = next((s for s in run['result']['snapshots'] if s['lead_minutes'] == lead_minutes), None)
    if snapshot is None:
        raise HTTPException(404, 'Lead time not saved for this run')
    return {'run_id':str(run_id), **forecast_roads(run['result'], snapshot)}


@router.get('/{run_id}/depth.geojson')
def depth_geojson(run_id: UUID, lead_minutes: int = Query(..., ge=0, le=180)):
    layer = depth_layer(run_id, lead_minutes)
    grid = layer['grid']
    try:
        crs = CRS.from_user_input(grid['crs'])
        if not crs.is_projected or crs.linear_units != 'metre':
            raise ValueError('A projected metre-based CRS is required')
        features = []
        size = grid['cell_size_m']
        for row, depths in enumerate(layer['depth_m']):
            for col, depth in enumerate(depths):
                x, y = grid['origin_x_m'] + col * size, grid['origin_y_m'] - row * size
                lon, lat = transform(crs, 'EPSG:4326', [x,x+size,x+size,x,x], [y,y,y-size,y-size,y])
                if not all(math.isfinite(v) for v in lon+lat):
                    raise ValueError('Invalid transformed coordinates')
                features.append({'type':'Feature','geometry':{'type':'Polygon','coordinates':[list(map(list,zip(lon,lat)))]},
                                 'properties':{'row':row,'col':col,'depth_cm':depth*100}})
        return {**{k:v for k,v in layer.items() if k != 'depth_m'}, 'type':'FeatureCollection','features':features}
    except (ValueError, RuntimeError) as exc:
        raise HTTPException(422, 'Depth grid cannot be transformed to map coordinates') from exc


@router.post('', status_code=201)
def create_forecast(request: RainfallRun):
    try:
        result = run_rainfall(request)
        return save_run(request.model_dump(mode='json'), result)
    except ValueError as exc:
        raise HTTPException(422, str(exc)) from exc
    except Exception as exc:
        raise HTTPException(503, 'Forecast storage unavailable') from exc


@router.get('/{run_id}')
def read_forecast(run_id: UUID):
    try:
        return get_run(run_id)
    except KeyError as exc:
        raise HTTPException(404, 'Forecast run not found') from exc
    except Exception as exc:
        raise HTTPException(503, 'Forecast storage unavailable') from exc


@router.get('/{run_id}/depth')
def depth_layer(run_id: UUID, lead_minutes: int = Query(..., ge=0, le=180)):
    run = read_forecast(run_id)
    result = run['result']
    snapshot = next((s for s in result['snapshots'] if s['lead_minutes'] == lead_minutes), None)
    if snapshot is None:
        raise HTTPException(404, 'Lead time not saved for this run')
    return {'run_id':str(run_id), 'lead_minutes':lead_minutes,
            'valid_time':snapshot['valid_time'], 'grid':result['grid'],
            'depth_m':snapshot['depth_m'], 'output_quality':result['output_quality'],
            'model':result['model'], 'terrain_source':result['terrain_source'],
            'limitations':result['limitations']}


@router.get('/{run_id}/drainage')
def drainage_layer(run_id: UUID, lead_minutes: int = Query(..., ge=0, le=180)):
    run = read_forecast(run_id)
    snapshot = next((s for s in run['result']['snapshots'] if s['lead_minutes'] == lead_minutes), None)
    if snapshot is None:
        raise HTTPException(404, 'Lead time not saved for this run')
    features = []
    graph = run['input']['domain']['drainage']['graph']
    nodes = {node['id']: node for node in graph['nodes']}
    for node in graph['nodes']:
        depth = snapshot['node_depth_m'].get(node['id'])
        head = node['invert_m'] + depth if depth is not None else None
        features.append({'type':'Feature', 'id':node['id'],
            'geometry':{'type':'Point','coordinates':[node['lon'],node['lat']]},
            'properties':{**node, 'asset_type': 'node', 'depth_m':depth, 'head_m':head,
                          'freeboard_m': node['ground_m'] - head if head is not None else None,
                          'stress': 'UNKNOWN' if head is None else 'AT_GROUND' if head >= node['ground_m'] - 1e-8 else 'BELOW_GROUND',
                          'exchange_totals': snapshot.get('exchange_totals', {}).get(node['id'])}})
    edges = []
    for edge in graph['edges']:
        a, b = nodes[edge['upstream']], nodes[edge['downstream']]
        edges.append({'type': 'Feature', 'id': edge['id'],
            'geometry': {'type': 'LineString', 'coordinates': edge.get('coordinates') or [[a['lon'], a['lat']], [b['lon'], b['lat']]]},
            'properties': {**edge, 'asset_type': 'edge', 'discharge_m3_s': None,
                           'capacity_utilization': None,
                           'geometry_basis': 'SUPPLIED_ALIGNMENT' if edge.get('coordinates') else 'SCHEMATIC_NODE_CONNECTION'}})
    return {'type':'FeatureCollection', 'run_id':str(run_id), 'lead_minutes':lead_minutes,
            'valid_time':snapshot['valid_time'], 'features':features,
            'edges': {'type': 'FeatureCollection', 'features': edges},
            'exchange_basis': 'CUMULATIVE_SINCE_RUN_START' if 'exchange_totals' in snapshot else 'NOT_SAVED',
            'output_quality':'MODEL_OUTPUT', 'limitations':run['result']['limitations']}
