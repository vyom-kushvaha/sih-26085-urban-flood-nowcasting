import sqlite3
import math
from rasterio.crs import CRS
from rasterio.warp import transform
from uuid import UUID
from fastapi import APIRouter, HTTPException, Query
from backend.services.forecast_store import get_run, save_run
from backend.services.rainfall_pipeline import RainfallRun, run_rainfall

router = APIRouter(prefix='/api/v1/forecasts', tags=['Saved forecasts'])


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
    for node in run['input']['domain']['drainage']['graph']['nodes']:
        depth = snapshot['node_depth_m'].get(node['id'])
        features.append({'type':'Feature', 'id':node['id'],
            'geometry':{'type':'Point','coordinates':[node['lon'],node['lat']]},
            'properties':{**node, 'depth_m':depth,
                          'head_m':node['invert_m'] + depth if depth is not None else None}})
    return {'type':'FeatureCollection', 'run_id':str(run_id), 'lead_minutes':lead_minutes,
            'valid_time':snapshot['valid_time'], 'features':features,
            'output_quality':'MODEL_OUTPUT', 'limitations':run['result']['limitations']}
