from datetime import datetime, timedelta, timezone

import pytest
import requests
from fastapi.testclient import TestClient

from backend.main import app

from backend.services.rainfall_ingestion import (
    OpenMeteoRainfallProvider,
    RainfallIngestionService,
    RainfallObservation,
    RainfallObservationStore,
    RainfallUnavailable,
)


def observation(minutes_old=0, identifier="frame-1"):
    now = datetime.now(timezone.utc)
    observed = now - timedelta(minutes=minutes_old)
    return RainfallObservation(
        provider="TEST",
        source_type="RADAR_POINT",
        quality="OBSERVED",
        observed_at=observed,
        received_at=now,
        valid_until=observed + timedelta(minutes=15),
        latitude=19.0182,
        longitude=72.8455,
        rainfall_mm_hr=12.5,
        freshness="LIVE",
        is_live=True,
        source_identifier=identifier,
    )


class Provider:
    def __init__(self, name, result):
        self.name, self.result, self.calls = name, result, 0

    def fetch(self, latitude, longitude):
        self.calls += 1
        if isinstance(self.result, Exception):
            raise self.result
        return self.result.model_copy(update={"latitude": latitude, "longitude": longitude})


def service(tmp_path, providers, stale_minutes=30):
    return RainfallIngestionService(
        providers,
        RainfallObservationStore(tmp_path / "rainfall"),
        timedelta(minutes=stale_minutes),
    )


def test_ingests_persists_deduplicates_and_caches(tmp_path):
    provider = Provider("primary", observation())
    ingestion = service(tmp_path, [provider])
    first = ingestion.ingest(19.0182, 72.8455)
    second = ingestion.ingest(19.0182, 72.8455)
    forced = ingestion.ingest(19.0182, 72.8455, force=True)
    assert first["stored"] is True
    assert second["observation"]["is_cached"] is True
    assert forced["stored"] is False
    assert provider.calls == 2


def test_provider_failure_uses_next_provider(tmp_path):
    failed = Provider("official", requests.Timeout())
    fallback = Provider("secondary", observation(identifier="secondary"))
    result = service(tmp_path, [failed, fallback]).ingest(19.0182, 72.8455)
    assert result["observation"]["source_identifier"] == "secondary"
    assert failed.calls == fallback.calls == 1


def test_old_observation_is_explicitly_stale(tmp_path):
    result = service(tmp_path, [Provider("old", observation(minutes_old=45))]).ingest(19.0182, 72.8455)
    assert result["observation"]["freshness"] == "STALE"
    assert result["observation"]["is_live"] is False
    assert "freshness threshold" in result["observation"]["warnings"][-1]


def test_all_provider_failures_are_unavailable(tmp_path):
    ingestion = service(tmp_path, [Provider("one", ValueError("bad payload"))])
    with pytest.raises(RainfallUnavailable, match="ValueError"):
        ingestion.ingest(19.0182, 72.8455)


class Response:
    def raise_for_status(self):
        return None

    def json(self):
        return {"current": {"time": "2026-09-13T10:00:00Z", "precipitation": 8.4}}


class Session:
    def __init__(self):
        self.request = None

    def get(self, url, **kwargs):
        self.request = (url, kwargs)
        return Response()


def test_open_meteo_adapter_has_explicit_point_nwp_provenance():
    session = Session()
    item = OpenMeteoRainfallProvider(session=session).fetch(19.0182, 72.8455)
    assert item.rainfall_mm_hr == 8.4
    assert item.source_type == "NWP_POINT"
    assert item.quality == "PROVIDER_FORECAST"
    assert "weather-radar" in item.warnings[0]
    assert session.request[1]["params"]["timezone"] == "UTC"


def test_rainfall_endpoint_uses_service_and_rejects_outside_mumbai(monkeypatch, tmp_path):
    ingestion = service(tmp_path, [Provider("test", observation())])
    monkeypatch.setattr(
        "backend.routers.rainfall.get_rainfall_ingestion_service",
        lambda: ingestion,
    )
    with TestClient(app) as client:
        response = client.get("/api/v1/rainfall/current?lat=19.0182&lon=72.8455")
        outside = client.get("/api/v1/rainfall/current?lat=20&lon=72.8455")
    assert response.status_code == 200
    assert response.json()["observation"]["provider"] == "TEST"
    assert outside.status_code == 422
