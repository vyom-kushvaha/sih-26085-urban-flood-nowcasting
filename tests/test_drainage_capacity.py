import pytest
from fastapi.testclient import TestClient
from backend.main import app
from backend.services.drainage_capacity import CapacityRequest, calculate_capacity
from test_drainage_graph import network


def test_analytical_full_flow_and_diameter_scaling():
    graph = network()
    first = calculate_capacity(CapacityRequest(graph=graph))['edges'][0]
    # D=.5 m, S=.01, n=.013 => R=.125, R^(2/3)=.25.
    assert first['full_flow_velocity_m_s'] == pytest.approx(1.923076923)
    assert first['full_flow_capacity_m3_s'] == pytest.approx(.377595271)
    graph['edges'][0]['diameter_m'] *= 2
    larger = calculate_capacity(CapacityRequest(graph=graph))['edges'][0]
    assert larger['full_flow_capacity_m3_s'] / first['full_flow_capacity_m3_s'] == pytest.approx(2 ** (8/3))


def test_blockage_is_asset_specific_and_no_infinite_ratio():
    result = calculate_capacity(CapacityRequest(graph=network(), blockage_pct={'0':100}, demand_m3_s={'0':1}))
    assert result['edges'][0]['effective_capacity_m3_s'] == 0
    assert result['edges'][0]['excess_demand_m3_s'] == 1
    assert result['edges'][0]['demand_capacity_ratio'] is None
    assert result['edges'][0]['status'] == 'BLOCKED'
    assert result['edges'][1]['effective_capacity_m3_s'] > 0
    assert result['edges'][1]['status'] == 'NOT_EVALUATED'


def test_partial_blockage_and_overload():
    result = calculate_capacity(CapacityRequest(graph=network(), blockage_pct={'0':50}, demand_m3_s={'0':.3, '1':0}))
    edge = result['edges'][0]
    assert edge['effective_capacity_m3_s'] == edge['full_flow_capacity_m3_s'] / 2
    assert edge['status'] == 'OVER_CAPACITY'
    assert result['edges'][1]['status'] == 'WITHIN_CAPACITY'


def test_api_success_and_rejection():
    with TestClient(app) as client:
        assert client.post('/api/v1/drainage/capacity', json={'graph':network()}).status_code == 200
        for field, value in [('blockage_pct', {'bad':10}), ('blockage_pct', {'0':101}), ('demand_m3_s', {'0':-1})]:
            assert client.post('/api/v1/drainage/capacity', json={'graph':network(), field:value}).status_code == 422
        graph = network()
        graph['edges'][0]['downstream'] = 'missing'
        assert client.post('/api/v1/drainage/capacity', json={'graph':graph}).status_code == 422
