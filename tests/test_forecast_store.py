from fastapi.testclient import TestClient
from backend.main import app
from backend.services.forecast_store import get_run
from backend.services.rainfall_pipeline import RainfallRun
from test_rainfall_pipeline import data


def test_saved_run_survives_connection_and_has_consistent_layers(tmp_path, monkeypatch):
    monkeypatch.setenv('FORECAST_DB_PATH',str(tmp_path/'runs.sqlite3'))
    with TestClient(app) as client:
        response = client.post('/api/v1/forecasts',json=data())
        assert response.status_code == 201
        run_id = response.json()['run_id']
        saved = get_run(run_id)
        assert saved['input'] == RainfallRun(**data()).model_dump(mode='json')
        for lead in [0,1,2]:
            layer = client.get(f'/api/v1/forecasts/{run_id}/depth?lead_minutes={lead}')
            assert layer.status_code == 200
            assert layer.json()['depth_m'] == saved['result']['snapshots'][lead]['depth_m']
            drains = client.get(f'/api/v1/forecasts/{run_id}/drainage?lead_minutes={lead}').json()
            assert drains['valid_time'] == layer.json()['valid_time']
            assert len(drains['features']) == 3
            geo = client.get(f'/api/v1/forecasts/{run_id}/depth.geojson?lead_minutes={lead}')
            assert geo.status_code == 200
            assert len(geo.json()['features']) == 2
            ring = geo.json()['features'][0]['geometry']['coordinates'][0]
            assert ring[0] == ring[-1]
            assert all(-180 <= x <= 180 and -90 <= y <= 90 for x,y in ring)
        assert client.get(f'/api/v1/forecasts/{run_id}/depth?lead_minutes=3').status_code == 404
        assert client.get('/api/v1/forecasts/00000000-0000-0000-0000-000000000000').status_code == 404
