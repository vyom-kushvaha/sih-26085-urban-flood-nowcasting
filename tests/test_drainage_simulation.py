import pytest
from backend.services.drainage_simulation import SimulationRequest, simulate
from test_drainage_graph import network


def run(**kwargs):
    return simulate(SimulationRequest(graph=network(), storage_area_m2={'0':1, '1':1},
                    outfall_head_m={'2':kwargs.pop('tail', 2)}, **kwargs))


def test_dry_and_zero_time():
    assert run()['balance']['final_storage_m3'] == 0
    result = run(duration_s=0, inflow_m3_s={'0':1})
    assert len(result['frames']) == 1
    assert result['balance']['inflow_m3'] == 0


def test_blockage_surcharge_and_conservation():
    clean = run(inflow_m3_s={'0':.1})
    blocked = run(inflow_m3_s={'0':.1}, blockage_pct={'1':100})
    assert blocked['balance']['surcharge_m3'] > clean['balance']['surcharge_m3']
    for result in [clean, blocked]:
        assert result['balance']['residual_m3'] == pytest.approx(0, abs=1e-9)
        assert all(n['storage_m3'] >= 0 for f in result['frames'] for n in f['nodes'].values())


def test_high_outfall_restricts_flow():
    free = run(inflow_m3_s={'0':.1})
    restricted = run(inflow_m3_s={'0':.1}, tail=6)
    assert restricted['balance']['outfall_m3'] == 0
    assert restricted['balance']['surcharge_m3'] > free['balance']['surcharge_m3']


def test_invalid_initial_storage():
    with pytest.raises(ValueError, match='exceeds ground'):
        run(initial_depth_m={'0':3})
