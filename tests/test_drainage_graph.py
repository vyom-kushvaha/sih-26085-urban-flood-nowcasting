import copy

import pytest
from fastapi.testclient import TestClient
from backend.main import app
from backend.services.drainage_graph import DrainGraph, inspect_graph


def network():
    return {'vertical_datum': 'synthetic local datum', 'nodes': [
        {'id': str(i), 'kind': kind, 'lat': 19.018, 'lon': 72.845 + i * .001,
         'ground_m': 6, 'invert_m': 4 - i, 'source': 'unit fixture', 'quality': 'SIMULATED'}
        for i, kind in enumerate(['inlet', 'manhole', 'outfall'])], 'edges': [
        {'id': str(i), 'upstream': str(i), 'downstream': str(i + 1), 'length_m': 100,
         'diameter_m': .5, 'manning_n': .013, 'source': 'unit fixture', 'quality': 'SIMULATED'}
        for i in range(2)]}


def test_connected_graph_and_gis_attributes():
    result = inspect_graph(DrainGraph(**network()))
    assert result['valid']
    assert result['inlets_reaching_outfall'] == ['0']
    assert result['component_count'] == 1
    assert result['edge_slopes']['0'] == .01
    assert len(result['geojson']['features']) == 5
    assert result['qualities'] == ['SIMULATED']


@pytest.mark.parametrize('fault', ['duplicate', 'missing', 'cycle', 'uphill', 'disconnected'])
def test_topology_faults(fault):
    data = network()
    if fault == 'duplicate':
        data['nodes'].append(copy.deepcopy(data['nodes'][0]))
    elif fault == 'missing':
        data['edges'][0]['downstream'] = 'absent'
    elif fault == 'cycle':
        data['edges'][1]['downstream'] = '0'
    elif fault == 'uphill':
        data['nodes'][1]['invert_m'] = 5
    else:
        data['edges'] = []
    assert not inspect_graph(DrainGraph(**data))['valid']


def test_api_contract_and_invalid_dimensions():
    with TestClient(app) as client:
        response = client.post('/api/v1/drainage/inspect', json=network())
        assert response.status_code == 200
        assert response.json()['valid']
        data = network()
        data['edges'][0]['diameter_m'] = 0
        assert client.post('/api/v1/drainage/inspect', json=data).status_code == 422
