import pytest
from fastapi.testclient import TestClient
from backend.main import app
from backend.services.network_topology import TopologyRequest, inspect_topology


def fixture():
    return {'node_ids':['A','B','C','D','E'], 'edges':[
        {'id':'ab','upstream':'A','downstream':'B'},
        {'id':'bc','upstream':'B','downstream':'C'},
        {'id':'bd','upstream':'B','downstream':'D'}]}


def test_branch_trace_and_terminals_are_not_automatically_outfalls():
    result = inspect_topology(TopologyRequest(**fixture(), start_node='A', confirmed_outfall_ids=['C']))
    assert result['component_count'] == 2
    assert result['isolated_node_ids'] == ['E']
    assert result['branch_node_ids'] == ['B']
    assert result['unconfirmed_terminal_node_ids'] == ['D']
    assert result['nodes_without_confirmed_outfall_path'] == ['D','E']
    assert result['trace']['edge_ids'] == ['ab','bc','bd']
    assert result['trace']['confirmed_outfall_ids'] == ['C']


def test_reverse_trace_and_cycle_terminate():
    request = fixture()
    request['edges'].append({'id':'ca','upstream':'C','downstream':'A'})
    result = inspect_topology(TopologyRequest(**request, start_node='D', direction='upstream'))
    assert result['has_directed_cycle']
    assert result['trace']['node_ids'] == ['A','B','C','D']
    assert result['cycle_or_cycle_downstream_node_ids'] == ['A','B','C','D']


@pytest.mark.parametrize('change', [{'start_node':'absent'}, {'node_ids':['A','A']},
    {'confirmed_outfall_ids':['absent']}])
def test_api_rejects_bad_references(change):
    request = {**fixture(), **change}
    with TestClient(app) as client:
        assert client.post('/api/v1/drainage/topology',json=request).status_code == 422


def test_topology_api_does_not_require_invented_hydraulic_values():
    with TestClient(app) as client:
        response = client.post('/api/v1/drainage/topology',json=fixture())
    assert response.status_code == 200
    assert response.json()['operational_ready'] is False
    assert response.json()['unconfirmed_terminal_node_ids'] == ['C','D']
