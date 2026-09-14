import base64
from io import BytesIO
from PIL import Image
from fastapi.testclient import TestClient
from backend.main import app
from test_operations import civic


def test_private_photo_survives_submission_and_requires_auth(civic):
    client, auth = civic
    image = Image.new('RGB', (10, 10), 'blue')
    stream = BytesIO()
    image.save(stream, 'PNG')
    response = client.post('/api/v1/reports', json={'lat': 19.01, 'lon': 72.84,
        'problem': 'Waterlogging', 'photo': 'data:image/png;base64,' + base64.b64encode(stream.getvalue()).decode()})
    assert response.status_code == 201
    report = response.json()
    assert report['photo_available'] is True
    assert 'photo' not in report
    path = f'/api/v1/admin/reports/{report["id"]}/photo'
    assert client.get(path).status_code == 401
    photo = client.get(path, headers=auth)
    assert photo.status_code == 200
    assert photo.headers['content-type'] == 'image/jpeg'
    assert 'no-store' in photo.headers['cache-control']
    assert Image.open(BytesIO(photo.content)).size == (10, 10)
    assert 'photo' not in client.get('/api/v1/admin/reports', headers=auth).json()['items'][0]


def test_rejects_fake_photo_and_large_requests(civic):
    client, _ = civic
    assert client.post('/api/v1/reports', json={'lat': 19.01, 'lon': 72.84,
        'problem': 'Other', 'photo': 'data:image/jpeg;base64,not-an-image'}).status_code == 422
    assert client.post('/api/v1/reports', content=b'x' * 2_000_001).status_code == 413


def test_readiness_failure_is_non_200(monkeypatch):
    from backend.core.config import settings
    monkeypatch.setattr(settings, 'env', 'production')
    monkeypatch.setattr('backend.db.database.database_health', lambda: {'status': 'UNAVAILABLE'})
    with TestClient(app) as client:
        assert client.get('/health').status_code == 200
        assert client.get('/readiness').status_code == 503
