import pytest
from fastapi.testclient import TestClient
from backend.main import app
from backend.services.rainfall_pipeline import RainfallRun, run_rainfall
from test_rainfall_pipeline import data


def remapped_request():
    request = data()
    request['frames'] = [dict(request['frames'][0], end_minute=2,
        values=[[60, 120, 180]], grid={'crs': 'EPSG:32643',
        'origin_x_m': -5, 'origin_y_m': 0, 'cell_size_m': 10})]
    return request


def test_offset_overlap_conserves_footprint_volume():
    result = run_rainfall(RainfallRun(**remapped_request()))
    # Two 10m cells average 90 and 150 mm/hr over two minutes.
    report = result['rainfall_remapping'][0]
    assert report['target_rate_m3_hr'] == pytest.approx(24)
    assert report['rainfall_volume_m3'] == pytest.approx(.8)
    assert report['residual_rate_m3_hr'] == pytest.approx(0, abs=1e-12)
    assert result['balance']['runoff_m3'] == pytest.approx(.8)
    assert result['balance']['residual_m3'] == pytest.approx(0, abs=1e-10)


def test_coarse_accumulation_through_saved_forecast(tmp_path, monkeypatch):
    monkeypatch.setenv('FORECAST_DB_PATH', str(tmp_path / 'runs.sqlite3'))
    request = remapped_request()
    request['frames'][0].update(values=[[2]], units='mm')
    request['frames'][0]['grid'].update(origin_x_m=0, cell_size_m=20)
    with TestClient(app) as client:
        response = client.post('/api/v1/forecasts', json=request)
        assert response.status_code == 201
        saved = client.get('/api/v1/forecasts/' + response.json()['run_id']).json()
    assert saved['result']['balance']['runoff_m3'] == pytest.approx(.4)
    assert saved['input']['frames'][0]['grid']['cell_size_m'] == 20


@pytest.mark.parametrize('change', [
    {'crs': 'EPSG:4326'}, {'crs': 'EPSG:32644'},
    {'origin_x_m': 1}, {'cell_size_m': 0}, {'crs': 'invalid'},
])
def test_invalid_or_incomplete_grid_is_rejected(change):
    request = remapped_request()
    request['frames'][0]['grid'].update(change)
    with TestClient(app) as client:
        assert client.post('/api/v1/surface/forecast', json=request).status_code == 422
