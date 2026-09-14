from rasterio.warp import transform
from backend.services.forecast_routes import route_exposure


def test_partial_coverage_never_outranks_fully_assessed_candidate():
    result = {'grid': {'crs': 'EPSG:32643', 'origin_x_m': 300000, 'origin_y_m': 2100000,
                      'cell_size_m': 10}, 'output_quality': 'MODEL_OUTPUT',
              'terrain_source': 'Test DEM', 'limitations': []}
    snapshot = {'depth_m': [[.1, .4]], 'lead_minutes': 60, 'valid_time': '2026-09-14T01:00:00Z'}
    def route(name, xs):
        lon, lat = transform('EPSG:32643', 'EPSG:4326', xs, [2099995]*len(xs))
        return {'id': name, 'coordinates': list(map(list, zip(lat, lon)))}
    data = route_exposure(result, snapshot, [route('covered', [300001, 300009]),
                                           route('partial', [299990, 300001]),
                                           route('deeper', [300011, 300019])])
    assert [r['rank'] for r in data['routes']] == [1, None, 2]
    assert data['routes'][1]['coverage_pct'] < 100
    assert data['routes'][0]['max_depth_cm'] == 10
    assert data['safe_route_certified'] is False
