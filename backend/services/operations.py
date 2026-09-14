"""Transactional civic records. PostgreSQL in production, explicit local fallback."""
from contextlib import contextmanager
from functools import lru_cache
from pathlib import Path
from uuid import uuid4
from datetime import datetime, timedelta, timezone

from sqlalchemy import Column, String, JSON, Integer, create_engine, select, update
from sqlalchemy.orm import Session

from backend.core.config import settings
from backend.db.database import Base, engine


class CivicRecord(Base):
    __tablename__ = "civic_records"
    id = Column(String(36), primary_key=True)
    kind = Column(String(24), nullable=False, index=True)
    status = Column(String(24), nullable=False, index=True)
    payload = Column(JSON, nullable=False)
    created_at = Column(String(40), nullable=False)
    revision = Column(Integer, nullable=False, default=1)


@lru_cache
def local_engine(path):
    target = Path(path).resolve()
    target.parent.mkdir(parents=True, exist_ok=True)
    db = create_engine(f"sqlite:///{target.as_posix()}", connect_args={"check_same_thread": False, "timeout": 10})
    CivicRecord.__table__.create(db, checkfirst=True)
    return db


@contextmanager
def session():
    db = engine
    if db is None:
        if not settings.sqlite_fallback_allowed:
            raise RuntimeError("Civic storage requires PostgreSQL")
        db = local_engine(settings.operations_db_path)
    with Session(db, expire_on_commit=False) as transaction:
        with transaction.begin():
            yield transaction


def serialize(record):
    result = {"id": record.id, "status": record.status, "created_at": record.created_at,
              "revision": record.revision, **record.payload}
    if record.kind == "report":
        result['photo_available'] = bool(result.pop('photo', None))
        result["verified"] = record.status in {"VERIFIED", "ACTION_TAKEN", "RESOLVED"}
    return result


def insert(db, kind, status, payload):
    record = CivicRecord(id=str(uuid4()), kind=kind, status=status, payload=payload,
                         created_at=datetime.now(timezone.utc).isoformat(), revision=1)
    db.add(record)
    db.flush()
    return serialize(record)


def audit(db, action, record_id):
    insert(db, "audit", "RECORDED", {"action": action, "record_id": record_id, "actor": "municipal_api"})


def records(db, kind, limit=50, offset=0, status=None):
    query = select(CivicRecord).where(CivicRecord.kind == kind)
    if status:
        query = query.where(CivicRecord.status == status)
    return [serialize(r) for r in db.scalars(query.order_by(CivicRecord.created_at.desc(), CivicRecord.id).limit(limit).offset(offset))]


def verified_water_observations(db, bounds, max_age_hours=3):
    """Return fresh, moderated water-depth observations inside map bounds."""
    cutoff = datetime.now(timezone.utc) - timedelta(hours=max_age_hours)
    query = select(CivicRecord).where(
        CivicRecord.kind == "report",
        CivicRecord.status.in_(("VERIFIED", "ACTION_TAKEN", "RESOLVED")),
    ).order_by(CivicRecord.created_at.desc())
    observations = []
    for record in db.scalars(query):
        payload = record.payload
        depth = payload.get("water_depth_cm")
        if payload.get("problem") != "Waterlogging" or depth is None:
            continue
        observed_at = datetime.fromisoformat(payload.get("observed_at") or record.created_at)
        if observed_at < cutoff:
            continue
        lat, lon = payload.get("lat"), payload.get("lon")
        if bounds["south"] <= lat <= bounds["north"] and bounds["west"] <= lon <= bounds["east"]:
            observations.append({"report_id": record.id, "lat": lat, "lon": lon,
                                 "water_depth_cm": float(depth), "observed_at": observed_at.isoformat(),
                                 "provenance": "VERIFIED_CITIZEN_OBSERVATION"})
    return observations


def transition(db, record_id, kind, status, allowed, revision):
    record = db.get(CivicRecord, record_id)
    if record is None or record.kind != kind:
        raise KeyError(record_id)
    if record.status not in allowed or record.revision != revision:
        raise ValueError("Record changed or transition is not allowed; refresh before retrying")
    result = db.execute(update(CivicRecord).where(CivicRecord.id == record_id,
                        CivicRecord.revision == revision).values(status=status, revision=revision + 1))
    if result.rowcount != 1:
        raise ValueError("Record changed; refresh before retrying")
    db.refresh(record)
    audit(db, f"{kind}.{status.lower()}", record_id)
    return serialize(record)
