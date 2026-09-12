import pytest
from pydantic import ValidationError
from backend.services.rainfall_pipeline import RainfallRun, run_rainfall
from test_coupled_simulation import fixture


def data():
    domain = fixture(duration=0)
    domain['surface']['initial_depth_m'] = [[0,0]]
    for link in domain['exchange'].values():
        link['intake_m3_s'] = 0
    return {'issue_time':'2026-09-11T12:00:00+05:30', 'domain':domain,
        'output_minutes':[0,1,2], 'frames':[
        {'start_minute':0,'end_minute':1,'values':[[60,0]],'units':'mm/hr',
         'source':'test storm','quality':'SIMULATED','source_type':'SYNTHETIC'},
        {'start_minute':1,'end_minute':2,'values':[[0,1]],'units':'mm',
         'source':'test storm','quality':'SIMULATED','source_type':'SYNTHETIC'}]}


def test_time_zero_intervals_and_accumulation_conservation():
    result = run_rainfall(RainfallRun(**data()))
    assert result['snapshots'][0]['depth_m'] == [[0,0]]
    assert [s['lead_minutes'] for s in result['snapshots']] == [0,1,2]
    assert result['snapshots'][1]['depth_m'][0][0] > result['snapshots'][1]['depth_m'][0][1]
    assert result['balance']['runoff_m3'] == pytest.approx(.2)
    assert result['balance']['residual_m3'] == pytest.approx(0,abs=1e-10)
    assert result['snapshots'][-1]['valid_time'] == '2026-09-11T12:02:00+05:30'


@pytest.mark.parametrize('fault',['gap','shape','timezone','negative'])
def test_invalid_inputs(fault):
    request = data()
    if fault == 'gap': request['frames'][1]['start_minute'] = 0
    if fault == 'shape': request['frames'][0]['values'] = [[1]]
    if fault == 'timezone': request['issue_time'] = '2026-09-11T12:00:00'
    if fault == 'negative': request['frames'][0]['values'] = [[-1,0]]
    with pytest.raises(ValidationError): RainfallRun(**request)


def test_full_three_hour_dry_run():
    request = data()
    request['frames'] = [dict(request['frames'][0], end_minute=180, values=[[0,0]])]
    request['output_minutes'] = [0,30,60,120,180]
    result = run_rainfall(RainfallRun(**request))
    assert [s['lead_minutes'] for s in result['snapshots']] == [0,30,60,120,180]
    assert result['balance']['final_storage_m3'] == 0
