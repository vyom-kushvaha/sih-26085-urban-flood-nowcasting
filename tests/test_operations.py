from datetime import datetime, timedelta, timezone

import pytest
from fastapi.testclient import TestClient

from backend.main import app
from backend.services import operations as store
from backend.core.config import settings


@pytest.fixture
def civic(tmp_path, monkeypatch):
    monkeypatch.setattr(store, "engine", None)
    monkeypatch.setattr(settings, "env", "test")
    monkeypatch.setattr(settings, "allow_sqlite_fallback", True)
    monkeypatch.setattr(settings, "operations_db_path", str(tmp_path / "civic.sqlite3"))
    monkeypatch.setattr(settings, "municipal_api_token", "test-secret-" * 4)
    with TestClient(app) as client:
        yield client, {"Authorization": "Bearer " + settings.municipal_api_token}
    store.local_engine(settings.operations_db_path).dispose()
    store.local_engine.cache_clear()


def test_report_durable_private_and_moderated(civic):
    client, auth = civic
    response = client.post("/api/v1/reports", json={"lat": 19.01, "lon": 72.84, "problem": "Waterlogging", "message": "Water on road"})
    assert response.status_code == 201
    record = response.json()
    assert record["verified"] is False
    assert client.get("/api/v1/admin/reports").status_code == 401
    store.local_engine(settings.operations_db_path).dispose()
    store.local_engine.cache_clear()
    assert client.get("/api/v1/admin/reports", headers=auth).json()["items"][0]["id"] == record["id"]
    url = "/api/v1/admin/reports/" + record["id"]
    assert client.patch(url, headers=auth, json={"status": "RESOLVED", "revision": 1}).status_code == 409
    verified = client.patch(url, headers=auth, json={"status": "VERIFIED", "revision": 1})
    assert verified.json()["verified"] is True
    assert client.patch(url, headers=auth, json={"status": "ACTION_TAKEN", "revision": 1}).status_code == 409
    assert client.patch(url, headers=auth, json={"status": "ACTION_TAKEN", "revision": 2}).status_code == 200
    assert client.patch(url, headers=auth, json={"status": "RESOLVED", "revision": 3}).status_code == 200
    assert len(client.get("/api/v1/admin/audit", headers=auth).json()["items"]) == 3


def test_notice_review_publication_expiry_and_withdrawal(civic):
    client, auth = civic
    body = {"title": "Road update", "area": "Dadar", "message": "Use the posted diversion", "severity": "Advisory", "expires_at": (datetime.now(timezone.utc) + timedelta(hours=1)).isoformat()}
    assert client.post("/api/v1/admin/notices", json=body).status_code == 401
    record = client.post("/api/v1/admin/notices", headers=auth, json=body).json()
    assert client.get("/api/v1/notices").json()["items"] == []
    url = "/api/v1/admin/notices/" + record["id"]
    assert client.patch(url, headers=auth, json={"status": "PUBLISHED", "revision": 1}).status_code == 200
    assert len(client.get("/api/v1/notices").json()["items"]) == 1
    assert client.patch(url, headers=auth, json={"status": "WITHDRAWN", "revision": 2}).status_code == 200
    assert client.get("/api/v1/notices").json()["items"] == []
    body["expires_at"] = (datetime.now(timezone.utc) - timedelta(hours=1)).isoformat()
    assert client.post("/api/v1/admin/notices", headers=auth, json=body).status_code == 422


def test_shelters_capacity_updates_and_no_safety_claim(civic):
    client, auth = civic
    body = {"name": "Test shelter", "address": "Test address", "lat": 19.01, "lon": 72.84, "capacity": 20, "occupancy": 21, "source": "Municipal registry"}
    assert client.post("/api/v1/admin/shelters", headers=auth, json=body).status_code == 422
    body["occupancy"] = 10
    record = client.post("/api/v1/admin/shelters", headers=auth, json=body).json()
    body["status"] = "CLOSED"
    assert client.put("/api/v1/admin/shelters/" + record["id"] + "?revision=1", headers=auth, json=body).json()["status"] == "CLOSED"
    assert client.get("/api/v1/shelters").json()["flood_safety_assessed"] is False


def test_validation_and_fail_closed(civic, monkeypatch):
    client, auth = civic
    assert client.post("/api/v1/reports", json={"lat": 0, "lon": 0, "problem": "Other"}).status_code == 422
    assert client.get("/api/v1/admin/reports", headers={"Authorization": "Bearer wrong"}).status_code == 401
    monkeypatch.setattr(settings, "municipal_api_token", None)
    assert client.get("/api/v1/admin/session", headers=auth).status_code == 503
    monkeypatch.setattr(settings, "env", "production")
    assert client.get("/api/v1/shelters").status_code == 503


def test_verified_fresh_water_depth_is_available_to_road_screening(civic):
    client, auth = civic
    response = client.post("/api/v1/reports", json={"lat": 19.01, "lon": 72.84,
        "problem": "Waterlogging", "water_depth_cm": 18.5, "message": "Measured at kerb"})
    record = response.json()
    client.patch("/api/v1/admin/reports/" + record["id"], headers=auth,
                 json={"status": "VERIFIED", "revision": 1})
    with store.session() as db:
        observations = store.verified_water_observations(db, {
            "south": 19, "west": 72.83, "north": 19.02, "east": 72.85})
    assert observations[0]["water_depth_cm"] == 18.5
    assert observations[0]["provenance"] == "VERIFIED_CITIZEN_OBSERVATION"


def test_depth_rejected_for_non_waterlogging_report(civic):
    client, _ = civic
    response = client.post("/api/v1/reports", json={"lat": 19.01, "lon": 72.84,
        "problem": "Road Blocked", "water_depth_cm": 10})
    assert response.status_code == 422
