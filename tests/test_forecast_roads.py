import pytest
from rasterio.warp import transform
from backend.services.forecast_roads import forecast_roads, classify_depth


@pytest.mark.parametrize('depth,risk', [(None,'UNKNOWN'),(0,'LOW'),(4.99,'LOW'),
    (5,'MODERATE'),(15,'MODERATE'),(15.01,'HIGH'),(30,'HIGH'),(30.01,'CRITICAL')])
def test_depth_boundaries(depth, risk):
    assert classify_depth(depth)[0] == risk


def test_crossing_cells_preserves_unknown_and_changes_with_time():
    lon, lat = transform('EPSG:32643','EPSG:4326',[300005,300035],[2100005,2100005])
    ways = [{'id':1,'name':'Test street','coordinates':list(map(list,zip(lat,lon)))}]
    result = {'grid':{'crs':'EPSG:32643','origin_x_m':300010,'origin_y_m':2100010,'cell_size_m':10},
              'output_quality':'MODEL_OUTPUT','terrain_source':'SYNTHETIC','limitations':[]}
    snapshot = {'depth_m':[[0,.4]],'lead_minutes':0,'valid_time':'2026-09-14T00:00:00Z'}
    layer = forecast_roads(result,snapshot,ways)
    props = [f['properties'] for f in layer['features']]
    assert [p['risk'] for p in props] == ['UNKNOWN','LOW','CRITICAL','UNKNOWN']
    assert [p['depth_cm'] for p in props] == [None,0,40,None]
    assert all(p['safe_route_certified'] is False for p in props)
    snapshot.update(depth_m=[[.1,.2]],lead_minutes=60)
    updated = forecast_roads(result,snapshot,ways)
    assert [f['properties']['risk'] for f in updated['features']] == ['UNKNOWN','MODERATE','HIGH','UNKNOWN']
    assert updated['lead_minutes'] == 60
    assert forecast_roads(result,snapshot,[{'id':2,'coordinates':[[0,0],[0,.001]]}])['features'] == []
