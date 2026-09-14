import pytest
from backend.services.forecast_hotspots import forecast_hotspots


def layer(depths, **kwargs):
    return forecast_hotspots({'grid': {'crs': 'EPSG:32643', 'origin_x_m': 300000,
        'origin_y_m': 2100000, 'cell_size_m': 10}, 'output_quality': 'MODEL_OUTPUT', 'limitations': []},
        {'depth_m': depths, 'lead_minutes': 60, 'valid_time': '2026-09-14T01:00:00Z'}, **kwargs)


def test_clusters_preserve_unknown_holes_and_rank_peaks():
    result = layer([[.1, .2, None], [0, None, .4], [.05, 0, .5]])
    assert result['summary']['total_clusters'] == 3
    assert result['summary']['unknown_cells'] == 2
    assert result['summary']['affected_area_m2'] == 500
    props = [f['properties'] for f in result['features']]
    assert [p['max_depth_cm'] for p in props] == [50, 20, 5]
    assert props[0]['water_volume_m3'] == pytest.approx(90)
    assert props[0]['area_m2'] == 200
    assert result['summary']['high_risk_clusters'] == 2
    assert len(result['priority_areas']['features'][0]['geometry']['coordinates']) == 2
    assert all(p['ward'] is None for p in props)


def test_dry_unknown_and_truncation_are_explicit():
    assert layer([[0, 0]])['features'] == []
    result = layer([[None, float('nan'), -1]])
    assert result['summary']['unknown_cells'] == 3
    assert result['summary']['covered_area_m2'] == 0
    result = layer([[.1, 0, .2]], limit=1)
    assert result['summary']['truncated'] is True
    assert result['summary']['total_clusters'] == 2
    assert result['summary']['affected_area_m2'] == 200
    assert result['features'][0]['properties']['max_depth_cm'] == 20
