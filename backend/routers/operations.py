"""Citizen intake and authenticated municipal workflows; no simulated deliveries."""
import secrets
from datetime import datetime, timezone
from typing import Literal
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.exceptions import RequestValidationError
from pydantic import BaseModel, ConfigDict, Field, AwareDatetime, model_validator, field_validator
from fastapi.responses import Response
import base64
from backend.services.report_photos import normalize_photo

from backend.core.config import settings
from backend.services import operations as store

router = APIRouter(prefix="/api/v1", tags=["Civic operations"])
bearer = HTTPBearer(auto_error=False)


def municipal(credentials: HTTPAuthorizationCredentials | None = Depends(bearer)):
    token = settings.municipal_api_token
    if not token or len(token) < 32:
        raise HTTPException(503, "Municipal access is not configured")
    if credentials is None or not secrets.compare_digest(credentials.credentials.encode(), token.encode()):
        raise HTTPException(401, "Valid municipal credentials required", headers={"WWW-Authenticate": "Bearer"})


def database():
    try:
        with store.session() as db:
            yield db
    except (HTTPException, RequestValidationError):
        raise
    except KeyError as exc:
        raise HTTPException(404, "Record not found") from exc
    except ValueError as exc:
        raise HTTPException(409, str(exc)) from exc
    except Exception as exc:
        raise HTTPException(503, "Civic storage unavailable") from exc


class Input(BaseModel):
    model_config = ConfigDict(extra="forbid", str_strip_whitespace=True, allow_inf_nan=False)


class Report(Input):
    lat: float = Field(ge=18.89, le=19.30)
    lon: float = Field(ge=72.77, le=72.99)
    problem: Literal["Waterlogging", "Road Blocked", "Drainage Issue", "Other"]
    message: str = Field(default="", max_length=2000)
    water_depth_cm: float | None = Field(default=None, ge=0, le=300)
    observed_at: AwareDatetime | None = None
    photo: str | None = Field(default=None, max_length=340000)

    @field_validator('photo')
    @classmethod
    def validate_photo(cls, value):
        return normalize_photo(value)

    @model_validator(mode="after")
    def depth_only_for_waterlogging(self):
        if self.water_depth_cm is not None and self.problem != "Waterlogging":
            raise ValueError("Water depth can only be supplied for waterlogging reports")
        if self.observed_at and self.observed_at > datetime.now(timezone.utc):
            raise ValueError("Observation time cannot be in the future")
        return self


class Notice(Input):
    title: str = Field(min_length=3, max_length=160)
    area: str = Field(min_length=2, max_length=200)
    message: str = Field(min_length=5, max_length=4000)
    severity: Literal["Advisory", "Warning", "Closure"]
    expires_at: AwareDatetime

    @model_validator(mode="after")
    def future_expiry(self):
        if self.expires_at <= datetime.now(timezone.utc):
            raise ValueError("Expiry must be in the future")
        return self


class Shelter(Input):
    name: str = Field(min_length=3, max_length=160)
    address: str = Field(min_length=3, max_length=500)
    lat: float = Field(ge=18.89, le=19.30)
    lon: float = Field(ge=72.77, le=72.99)
    capacity: int = Field(ge=0, le=100000)
    occupancy: int = Field(ge=0)
    source: str = Field(min_length=3, max_length=500)
    status: Literal["OPEN", "CLOSED"] = "OPEN"

    @model_validator(mode="after")
    def capacity_check(self):
        if self.occupancy > self.capacity:
            raise ValueError("Occupancy exceeds capacity")
        return self


class Change(Input):
    status: Literal["VERIFIED", "ACTION_TAKEN", "RESOLVED", "REJECTED", "PUBLISHED", "WITHDRAWN"]
    revision: int = Field(ge=1)


@router.post("/reports", status_code=201)
def submit_report(request: Report, db=Depends(database)):
    payload = request.model_dump(mode="json")
    payload["observed_at"] = payload["observed_at"] or datetime.now(timezone.utc).isoformat()
    return store.insert(db, "report", "RECEIVED", {**payload, "provenance": "CITIZEN_REPORTED", "verified": False})


@router.get("/admin/session", dependencies=[Depends(municipal)])
def admin_session():
    return {"role": "municipal", "authentication": "deployment_api_token"}


@router.get("/admin/reports", dependencies=[Depends(municipal)])
def reports(limit: int = Query(50, ge=1, le=100), offset: int = Query(0, ge=0), db=Depends(database)):
    return {"items": store.records(db, "report", limit, offset)}


@router.get('/admin/reports/{record_id}/photo', dependencies=[Depends(municipal)])
def report_photo(record_id: UUID, db=Depends(database)):
    record = db.get(store.CivicRecord, str(record_id))
    if record is None or record.kind != 'report' or not record.payload.get('photo'):
        raise HTTPException(404, 'Photo not found')
    raw = base64.b64decode(record.payload['photo'].split(',', 1)[1])
    return Response(raw, media_type='image/jpeg', headers={'Cache-Control': 'no-store',
                    'X-Content-Type-Options': 'nosniff'})


@router.patch("/admin/reports/{record_id}", dependencies=[Depends(municipal)])
def moderate(record_id: UUID, request: Change, db=Depends(database)):
    transitions = {"VERIFIED": ["RECEIVED"], "ACTION_TAKEN": ["VERIFIED"],
                   "RESOLVED": ["ACTION_TAKEN"], "REJECTED": ["RECEIVED", "VERIFIED"]}
    return store.transition(db, str(record_id), "report", request.status, transitions.get(request.status, []), request.revision)


@router.post("/admin/notices", status_code=201, dependencies=[Depends(municipal)])
def create_notice(request: Notice, db=Depends(database)):
    result = store.insert(db, "notice", "DRAFT", request.model_dump(mode="json"))
    store.audit(db, "notice.created", result["id"])
    return result


@router.get("/admin/notices", dependencies=[Depends(municipal)])
def draft_notices(limit: int = Query(50, ge=1, le=100), offset: int = Query(0, ge=0), db=Depends(database)):
    return {"items": store.records(db, "notice", limit, offset)}


@router.patch("/admin/notices/{record_id}", dependencies=[Depends(municipal)])
def publish_notice(record_id: UUID, request: Change, db=Depends(database)):
    record = db.get(store.CivicRecord, str(record_id))
    if record is None or record.kind != "notice":
        raise HTTPException(404, "Notice not found")
    if request.status == "PUBLISHED" and datetime.fromisoformat(record.payload["expires_at"]) <= datetime.now(timezone.utc):
        raise HTTPException(409, "Expired notices cannot be published")
    allowed = {"PUBLISHED": ["DRAFT"], "WITHDRAWN": ["PUBLISHED"]}
    return store.transition(db, str(record_id), "notice", request.status, allowed.get(request.status, []), request.revision)


@router.get("/notices")
def notices(db=Depends(database)):
    # Filter before pagination so expired records cannot hide current notices.
    from sqlalchemy import select
    rows = db.scalars(select(store.CivicRecord).where(store.CivicRecord.kind == "notice", store.CivicRecord.status == "PUBLISHED").order_by(store.CivicRecord.created_at.desc()))
    items = []
    for record in rows:
        if datetime.fromisoformat(record.payload["expires_at"]) > datetime.now(timezone.utc):
            items.append(store.serialize(record))
            if len(items) == 100:
                break
    return {"items": items, "channel": "WEB", "external_delivery": "NOT_CONFIGURED"}


@router.post("/admin/shelters", status_code=201, dependencies=[Depends(municipal)])
def create_shelter(request: Shelter, db=Depends(database)):
    payload = request.model_dump(exclude={"status"})
    payload["verified_at"] = datetime.now(timezone.utc).isoformat()
    result = store.insert(db, "shelter", request.status, payload)
    store.audit(db, "shelter.created", result["id"])
    return result


@router.put("/admin/shelters/{record_id}", dependencies=[Depends(municipal)])
def update_shelter(record_id: UUID, request: Shelter, revision: int = Query(..., ge=1), db=Depends(database)):
    result = store.transition(db, str(record_id), "shelter", request.status, ["OPEN", "CLOSED"], revision)
    record = db.get(store.CivicRecord, str(record_id))
    record.payload = {**request.model_dump(exclude={"status"}), "verified_at": datetime.now(timezone.utc).isoformat()}
    return store.serialize(record)


@router.get("/shelters")
def shelters(limit: int = Query(50, ge=1, le=100), offset: int = Query(0, ge=0), db=Depends(database)):
    return {"items": store.records(db, "shelter", limit, offset), "flood_safety_assessed": False}


@router.get("/admin/audit", dependencies=[Depends(municipal)])
def audit_events(limit: int = Query(50, ge=1, le=100), offset: int = Query(0, ge=0), db=Depends(database)):
    return {"items": store.records(db, "audit", limit, offset)}
