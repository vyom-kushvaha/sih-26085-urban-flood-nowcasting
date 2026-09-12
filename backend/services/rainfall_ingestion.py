"""Provider-based rainfall observation ingestion with explicit provenance."""

from __future__ import annotations

import hashlib
import json
import time
from datetime import datetime, timedelta, timezone
from pathlib import Path
from typing import Protocol

import requests
from pydantic import AwareDatetime, BaseModel, ConfigDict, Field

from backend.core.config import Settings, settings
from backend.db.database import get_db_session, is_db_available
from backend.db.repositories import RainfallRepository


class RainfallUnavailable(RuntimeError):
    pass


class RainfallObservation(BaseModel):
    model_config = ConfigDict(extra="forbid")
    provider: str
    source_type: str
    quality: str
    observed_at: AwareDatetime
    received_at: AwareDatetime
    valid_until: AwareDatetime
    latitude: float = Field(ge=-90, le=90)
    longitude: float = Field(ge=-180, le=180)
    rainfall_mm_hr: float = Field(ge=0, le=1000)
    units: str = "mm/hr"
    freshness: str
    is_live: bool
    is_cached: bool = False
    source_identifier: str
    warnings: list[str] = Field(default_factory=list)

    @property
    def fingerprint(self) -> str:
        value = f"{self.provider}|{self.source_identifier}|{self.latitude:.5f}|{self.longitude:.5f}"
        return hashlib.sha256(value.encode("utf-8")).hexdigest()


class RainfallProvider(Protocol):
    name: str

    def fetch(self, latitude: float, longitude: float) -> RainfallObservation: ...


def _utc(value: str | datetime) -> datetime:
    parsed = value if isinstance(value, datetime) else datetime.fromisoformat(value.replace("Z", "+00:00"))
    if parsed.tzinfo is None:
        raise ValueError("Provider timestamp must include a timezone")
    return parsed.astimezone(timezone.utc)


def _request_json(session, url: str, *, attempts: int = 3, **kwargs) -> dict:
    last_error: requests.RequestException | None = None
    for attempt in range(attempts):
        try:
            response = session.get(url, **kwargs)
            response.raise_for_status()
            payload = response.json()
            if not isinstance(payload, dict):
                raise ValueError("Provider response must be a JSON object")
            return payload
        except requests.RequestException as exc:
            last_error = exc
            if attempt + 1 < attempts:
                time.sleep(0.2 * (2 ** attempt))
    assert last_error is not None
    raise last_error


class OpenMeteoRainfallProvider:
    name = "OPEN_METEO"

    def __init__(self, timeout_seconds: float = 8, session=requests):
        self.timeout_seconds = timeout_seconds
        self.session = session

    def fetch(self, latitude: float, longitude: float) -> RainfallObservation:
        payload = _request_json(
            self.session,
            "https://api.open-meteo.com/v1/forecast",
            params={
                "latitude": latitude,
                "longitude": longitude,
                "current": "precipitation,rain,showers",
                "timezone": "UTC",
            },
            timeout=self.timeout_seconds,
        )
        current = payload.get("current") or {}
        observed_at = _utc(current["time"])
        received_at = datetime.now(timezone.utc)
        rainfall = float(current.get("precipitation", current.get("rain", 0)))
        return RainfallObservation(
            provider=self.name,
            source_type="NWP_POINT",
            quality="PROVIDER_FORECAST",
            observed_at=observed_at,
            received_at=received_at,
            valid_until=observed_at + timedelta(hours=1),
            latitude=latitude,
            longitude=longitude,
            rainfall_mm_hr=rainfall,
            freshness="LIVE",
            is_live=True,
            source_identifier=f"{latitude:.4f}:{longitude:.4f}:{observed_at.isoformat()}",
            warnings=["Point NWP precipitation is not weather-radar coverage."],
        )


class OfficialJsonRainfallProvider:
    """Adapter for a configured provider-approved JSON observation endpoint."""

    name = "OFFICIAL_CONFIGURED_FEED"

    def __init__(self, url: str, token: str | None, timeout_seconds: float = 8, session=requests):
        self.url, self.token, self.timeout_seconds, self.session = url, token, timeout_seconds, session

    def fetch(self, latitude: float, longitude: float) -> RainfallObservation:
        headers = {"Authorization": f"Bearer {self.token}"} if self.token else {}
        payload = _request_json(
            self.session,
            self.url,
            params={"lat": latitude, "lon": longitude},
            headers=headers,
            timeout=self.timeout_seconds,
        )
        observed_at = _utc(payload["observed_at"])
        received_at = datetime.now(timezone.utc)
        valid_until = _utc(payload.get("valid_until", observed_at + timedelta(minutes=15)))
        return RainfallObservation(
            provider=str(payload.get("provider") or self.name),
            source_type=str(payload.get("source_type") or "RADAR_POINT"),
            quality=str(payload.get("quality") or "OBSERVED"),
            observed_at=observed_at,
            received_at=received_at,
            valid_until=valid_until,
            latitude=latitude,
            longitude=longitude,
            rainfall_mm_hr=float(payload["rainfall_mm_hr"]),
            freshness="LIVE",
            is_live=True,
            source_identifier=str(payload.get("source_identifier") or observed_at.isoformat()),
        )


class RainfallObservationStore:
    def __init__(self, root: str | Path):
        self.root = Path(root).resolve()

    def save(self, observation: RainfallObservation) -> tuple[Path, bool]:
        self.root.mkdir(parents=True, exist_ok=True)
        path = self.root / f"{observation.fingerprint}.json"
        if path.exists():
            return path, False
        temporary = path.with_suffix(".tmp")
        temporary.write_text(observation.model_dump_json(indent=2), encoding="utf-8")
        temporary.replace(path)
        return path, True


class RainfallIngestionService:
    def __init__(
        self,
        providers: list[RainfallProvider],
        store: RainfallObservationStore,
        stale_after: timedelta,
        require_database: bool = False,
    ):
        self.providers, self.store, self.stale_after = providers, store, stale_after
        self.require_database = require_database
        self._cache: dict[str, RainfallObservation] = {}

    def ingest(self, latitude: float, longitude: float, force: bool = False) -> dict:
        key = f"{latitude:.3f}:{longitude:.3f}"
        cached = self._cache.get(key)
        now = datetime.now(timezone.utc)
        if cached and not force and now - cached.received_at <= self.stale_after:
            item = cached.model_copy(update={"is_cached": True})
            return {"observation": item.model_dump(mode="json"), "stored": False}

        failures = []
        for provider in self.providers:
            try:
                item = provider.fetch(latitude, longitude)
                age = now - item.observed_at
                freshness = "STALE" if age > self.stale_after else "LIVE"
                item = item.model_copy(update={
                    "freshness": freshness,
                    "is_live": freshness == "LIVE",
                    "warnings": item.warnings + (["Observation exceeds the freshness threshold."] if freshness == "STALE" else []),
                })
                path, stored = self.store.save(item)
                database = {"status": "NOT_CONFIGURED", "stored": False}
                if is_db_available():
                    with get_db_session() as session:
                        frame_id, db_stored = RainfallRepository(session).save_observation(
                            item.model_dump(mode="python"), str(path)
                        )
                    database = {"status": "POSTGIS", "stored": db_stored, "frame_id": frame_id}
                elif self.require_database:
                    raise RainfallUnavailable("PostgreSQL is required for rainfall ingestion in production")
                self._cache[key] = item
                return {
                    "observation": item.model_dump(mode="json"),
                    "stored": stored,
                    "asset_path": str(path),
                    "database": database,
                }
            except (KeyError, TypeError, ValueError, requests.RequestException) as exc:
                failures.append({"provider": provider.name, "reason": exc.__class__.__name__})
        raise RainfallUnavailable(json.dumps(failures))


def build_rainfall_service(config: Settings = settings) -> RainfallIngestionService:
    providers: list[RainfallProvider] = []
    open_meteo = OpenMeteoRainfallProvider(config.rainfall_http_timeout_seconds)
    official = None
    if config.rainfall_official_feed_url:
        official = OfficialJsonRainfallProvider(
            config.rainfall_official_feed_url,
            config.rainfall_official_feed_token,
            config.rainfall_http_timeout_seconds,
        )
    if config.rainfall_primary_provider == "official" and official:
        providers.extend([official, open_meteo])
    else:
        providers.append(open_meteo)
        if official:
            providers.append(official)
    return RainfallIngestionService(
        providers,
        RainfallObservationStore(config.rainfall_store_path),
        timedelta(minutes=config.rainfall_stale_after_minutes),
        require_database=config.is_production,
    )


_service: RainfallIngestionService | None = None


def get_rainfall_ingestion_service() -> RainfallIngestionService:
    global _service
    if _service is None:
        _service = build_rainfall_service()
    return _service
