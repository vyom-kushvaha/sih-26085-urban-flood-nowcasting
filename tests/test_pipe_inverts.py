import pytest
from fastapi.testclient import TestClient
from backend.main import app
from backend.services.drainage_graph import DrainGraph, inspect_graph
from backend.services.drainage_capacity import CapacityRequest, calculate_capacity
from backend.services.drainage_simulation import SimulationRequest, simulate
from test_drainage_graph import network


def offset_network():
    graph = network()
    graph['edges'][0].update(upstream_invert_m=5, downstream_invert_m=3.5)
    return graph


def test_capacity_uses_pipe_slope_and_keeps_node_storage_bottom():
    graph = offset_network()
    qa = inspect_graph(DrainGraph(**graph))
    assert qa['valid']
    assert qa['edge_slopes']['0'] == pytest.approx(.015)
    legacy = calculate_capacity(CapacityRequest(graph=network()))['edges'][0]
    actual = calculate_capacity(CapacityRequest(graph=graph))['edges'][0]
    assert actual['full_flow_capacity_m3_s'] / legacy['full_flow_capacity_m3_s'] == pytest.approx(1.5 ** .5)
    assert graph['nodes'][0]['invert_m'] == 4


@pytest.mark.parametrize('depth', [.5, 1, 1.5])
def test_raised_pipe_does_not_drain_sump_below_inlet(depth):
    result = simulate(SimulationRequest(graph=offset_network(), duration_s=60,
        storage_area_m2={'0':1, '1':1}, outfall_head_m={'2':2}, initial_depth_m={'0':depth}))
    assert result['frames'][-1]['nodes']['0']['storage_m3'] == pytest.approx(min(depth, 1), abs=1e-8)
    assert (result['edge_transferred_m3']['0'] > 0) == (depth > 1)
    assert result['balance']['residual_m3'] == pytest.approx(0, abs=1e-9)


@pytest.mark.parametrize('change', [{'upstream_invert_m':3}, {'downstream_invert_m':7},
    {'downstream_invert_m':None}, {'upstream_invert_m':3.5, 'downstream_invert_m':4}])
def test_invalid_pipe_levels_rejected_by_capacity_api(change):
    graph = offset_network()
    graph['edges'][0].update(change)
    with TestClient(app) as client:
        assert client.post('/api/v1/drainage/capacity', json={'graph':graph}).status_code == 422
