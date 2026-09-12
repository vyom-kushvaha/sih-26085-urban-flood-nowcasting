import pytest
from fastapi.testclient import TestClient
from backend.main import app
from backend.services.coupled_simulation import CoupledRequest, simulate_coupled
from test_drainage_graph import network


def fixture(blocked=False, duration=60):
    return {'surface':{'elevation_m':[[6,6]], 'initial_depth_m':[[1,0]],
        'rainfall_mm_hr':[[0,0]], 'runoff_coefficient':[[1,1]], 'cell_size_m':10,
        'duration_s':duration, 'crs':'EPSG:32643', 'origin_x_m':0,'origin_y_m':0,'source':'SIMULATED'},
        'drainage':{'graph':network(), 'storage_area_m2':{'0':1,'1':1},
        'outfall_head_m':{'2':2}, 'duration_s':duration, 'blockage_pct':{'1':100} if blocked else {}},
        'exchange':{'0':{'row':0,'col':0,'intake_m3_s':.3},'1':{'row':0,'col':1,'intake_m3_s':0}}}


def test_surcharge_returns_and_conserves_volume():
    blocked = simulate_coupled(CoupledRequest(**fixture(True)))
    clean = simulate_coupled(CoupledRequest(**fixture()))
    returned = lambda r: sum(r['exchange_history'][-1]['surcharge_returned_m3'].values())
    assert returned(blocked) > returned(clean)
    assert returned(blocked) > 0
    for result in [blocked,clean]:
        assert abs(result['balance']['residual_m3']) < 1e-8
        assert min(result['depth_m'][0]) >= 0


def test_zero_time_and_bad_mapping_api():
    result = simulate_coupled(CoupledRequest(**fixture(duration=0)))
    assert result['depth_m'] == [[1,0]]
    assert result['balance']['residual_m3'] == 0
    data = fixture()
    data['exchange']['0']['col'] = 99
    with TestClient(app) as client:
        assert client.post('/api/v1/surface/coupled',json=data).status_code == 422
