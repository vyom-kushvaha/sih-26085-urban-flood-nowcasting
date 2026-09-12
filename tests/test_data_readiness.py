import hashlib
import json
from fastapi.testclient import TestClient
from backend.main import app
from backend.services import data_readiness as service


def fixture(tmp_path, monkeypatch):
    monkeypatch.setattr(service, 'PROJECT_ROOT', tmp_path)
    folder = tmp_path / 'data/raw/pilot_downloads'
    folder.mkdir(parents=True)
    artifacts = []
    for name in ['storm_manholes', 'storm_drains', 'contours_20cm', 'supplementary_manholes']:
        path = folder / (name + '.json')
        path.write_bytes(b'{}')
        artifacts.append({'dataset':name, 'artifact':{'path':str(path.relative_to(tmp_path)),
            'bytes':2, 'sha256':hashlib.sha256(b'{}').hexdigest()}})
    report = tmp_path / 'data/pilot/municipal_qa.json'
    report.parent.mkdir(parents=True)
    report.write_text(json.dumps({'artifacts':artifacts, 'operational_ready':True}))
    return folder, report


def test_verified_downloads_do_not_imply_operational_readiness(tmp_path, monkeypatch):
    fixture(tmp_path, monkeypatch)
    with TestClient(app) as client:
        response = client.get('/api/v1/data/readiness')
    assert response.status_code == 200
    assert response.headers['cache-control'] == 'no-store'
    assert response.json()['download_integrity_ok']
    assert response.json()['operational_ready'] is False
    assert str(tmp_path) not in response.text


def test_tampered_and_missing_files_are_detected(tmp_path, monkeypatch):
    folder, _ = fixture(tmp_path, monkeypatch)
    (folder / 'storm_drains.json').write_bytes(b'[]')
    (folder / 'storm_manholes.json').unlink()
    report = service.data_readiness()
    assert report['status'] == 'DATA_INCOMPLETE'
    assert not report['download_integrity_ok']
    assert {a['status'] for a in report['artifacts']} == {'VERIFIED','MISSING','CHECKSUM_MISMATCH'}


def test_missing_audit_and_outside_paths_fail_closed(tmp_path, monkeypatch):
    monkeypatch.setattr(service, 'PROJECT_ROOT', tmp_path)
    assert service.data_readiness()['status'] == 'AUDIT_UNAVAILABLE'
    assert service.inspect_artifact({'artifact':{'path':'../outside'}}, tmp_path)['status'] == 'INVALID_MANIFEST'
