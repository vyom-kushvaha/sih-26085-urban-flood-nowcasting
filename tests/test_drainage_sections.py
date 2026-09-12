import pytest
from fastapi.testclient import TestClient
from backend.main import app
from backend.services.drainage_capacity import CapacityRequest, calculate_capacity
from backend.services.drainage_simulation import SimulationRequest, simulate
from test_drainage_graph import network


def rectangular(shape):
    graph = network()
    for edge in graph['edges']:
        edge.pop('diameter_m')
        edge.update(shape=shape, width_m=2, height_m=1)
    return graph


@pytest.mark.parametrize('shape,perimeter', [('rectangular_closed', 6), ('rectangular_open', 4)])
def test_analytical_reference_capacity(shape, perimeter):
    result = calculate_capacity(CapacityRequest(graph=rectangular(shape)))['edges'][0]
    assert result['area_m2'] == 2
    assert result['wetted_perimeter_m'] == perimeter
    assert result['hydraulic_radius_m'] == pytest.approx(2 / perimeter)
    assert result['full_flow_capacity_m3_s'] == pytest.approx(2 * (2/perimeter)**(2/3) * .1 / .013)
    assert result['capacity_basis'] == ('BANKFULL_OPEN_SECTION' if shape.endswith('open') else 'FULL_CLOSED_SECTION')


@pytest.mark.parametrize('shape', ['rectangular_closed', 'rectangular_open'])
def test_rectangular_blockage_conservation_and_api(shape):
    graph = rectangular(shape)
    request = dict(graph=graph, duration_s=60, storage_area_m2={'0':1, '1':1},
                   outfall_head_m={'2':2}, inflow_m3_s={'0':.1})
    clean = simulate(SimulationRequest(**request))
    blocked = simulate(SimulationRequest(**request, blockage_pct={'1':100}))
    assert blocked['balance']['surcharge_m3'] > clean['balance']['surcharge_m3']
    for result in [clean, blocked]:
        assert result['balance']['residual_m3'] == pytest.approx(0, abs=1e-9)
    with TestClient(app) as client:
        assert client.post('/api/v1/drainage/simulate', json=request).status_code == 200


@pytest.mark.parametrize('change', [{'height_m':None}, {'width_m':0}, {'diameter_m':1}, {'shape':'arch'}])
def test_ambiguous_or_invalid_sections_rejected(change):
    graph = rectangular('rectangular_open')
    graph['edges'][0].update(change)
    with TestClient(app) as client:
        assert client.post('/api/v1/drainage/capacity', json={'graph':graph}).status_code == 422
