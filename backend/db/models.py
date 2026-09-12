import uuid
from datetime import datetime, timezone
from sqlalchemy import (
    Column, Integer, String, Float, Boolean, DateTime,
    ForeignKey, Text, CheckConstraint, Index, UniqueConstraint
)
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID, JSONB
from geoalchemy2 import Geometry

from backend.db.database import Base


def utcnow():
    return datetime.now(timezone.utc)


class ModelVersion(Base):
    __tablename__ = "model_versions"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    version = Column(String, unique=True, index=True, nullable=False)
    description = Column(Text)
    created_at = Column(DateTime(timezone=True), default=utcnow)
    is_active = Column(Boolean, default=False)


class City(Base):
    __tablename__ = "cities"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True, nullable=False)
    state = Column(String, nullable=False)
    boundary = Column(Geometry('POLYGON', srid=4326))
    dem_resolution_m = Column(Float)
    created_at = Column(DateTime(timezone=True), default=utcnow)


class Ward(Base):
    __tablename__ = "wards"
    id = Column(Integer, primary_key=True, index=True)
    city_id = Column(Integer, ForeignKey("cities.id"), nullable=False)
    name = Column(String, nullable=False)
    code = Column(String)
    boundary = Column(Geometry('POLYGON', srid=4326))
    population = Column(Integer)
    flood_prone = Column(Boolean, default=False)

    city = relationship("City")
    __table_args__ = (UniqueConstraint("city_id", "code", name="uq_ward_city_code"),)


class TerrainDataset(Base):
    __tablename__ = "terrain_datasets"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    city_id = Column(Integer, ForeignKey("cities.id"), nullable=False)
    source = Column(String, nullable=False)
    dataset_version = Column(String, nullable=False, default="unknown")
    checksum = Column(String)
    crs = Column(String, nullable=False, default="EPSG:4326")
    vertical_datum = Column(String)
    resolution_m = Column(Float, nullable=False)
    asset_path = Column(String, nullable=False)
    bounds = Column(Geometry('POLYGON', srid=4326))
    created_at = Column(DateTime(timezone=True), default=utcnow)
    is_active = Column(Boolean, default=True)


class DrainageNode(Base):
    __tablename__ = "drainage_nodes"
    id = Column(String, primary_key=True)
    city_id = Column(Integer, ForeignKey("cities.id"), nullable=False)
    geom = Column(Geometry('POINT', srid=4326), nullable=False)
    invert_m = Column(Float)
    type = Column(String) # MANHOLE, OUTFALL, etc.
    is_outfall = Column(Boolean, default=False)
    outfall_status = Column(String, nullable=False, default="UNKNOWN")


class DrainageEdge(Base):
    __tablename__ = "drainage_edges"
    id = Column(String, primary_key=True)
    source_node_id = Column(String, ForeignKey("drainage_nodes.id"), nullable=False)
    target_node_id = Column(String, ForeignKey("drainage_nodes.id"), nullable=False)
    geom = Column(Geometry('LINESTRING', srid=4326), nullable=False)
    diameter_m = Column(Float)
    material = Column(String)
    shape = Column(String)
    invert_upstream_m = Column(Float)
    invert_downstream_m = Column(Float)
    roughness_n = Column(Float)
    blockage_pct = Column(Float)
    asset_status = Column(String, nullable=False, default="EXISTING")
    __table_args__ = (
        CheckConstraint("source_node_id <> target_node_id", name="ck_drainage_edge_not_self_loop"),
        CheckConstraint("blockage_pct IS NULL OR (blockage_pct >= 0 AND blockage_pct <= 100)", name="ck_drainage_blockage_range"),
    )


class RoadSegment(Base):
    __tablename__ = "road_segments"
    id = Column(String, primary_key=True)
    city_id = Column(Integer, ForeignKey("cities.id"), nullable=False)
    geom = Column(Geometry('LINESTRING', srid=4326), nullable=False)
    type = Column(String) # primary, secondary, residential
    surface = Column(String)
    elevation_m = Column(Float)
    is_oneway = Column(Boolean, nullable=False, default=False)
    access = Column(String)


class RainfallFrame(Base):
    __tablename__ = "rainfall_frames"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    timestamp = Column(DateTime(timezone=True), nullable=False, index=True)
    received_at = Column(DateTime(timezone=True), nullable=False, default=utcnow)
    valid_until = Column(DateTime(timezone=True))
    source = Column(String, nullable=False) # IMD, OpenMeteo, DWR
    source_identifier = Column(String)
    checksum = Column(String)
    freshness_state = Column(String, nullable=False, default="UNKNOWN")
    is_forecast = Column(Boolean, default=False)
    asset_path = Column(String) # path to grid or netcdf
    metadata_json = Column(JSONB)
    created_at = Column(DateTime(timezone=True), default=utcnow)
    __table_args__ = (
        UniqueConstraint("source", "source_identifier", name="uq_rainfall_source_identifier"),
    )


class ForecastRun(Base):
    __tablename__ = "forecast_runs"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    model_version_id = Column(UUID(as_uuid=True), ForeignKey("model_versions.id"))
    rainfall_frame_id = Column(UUID(as_uuid=True), ForeignKey("rainfall_frames.id"))
    status = Column(String, nullable=False) # RUNNING, COMPLETED, FAILED
    input_parameters = Column(JSONB)
    created_at = Column(DateTime(timezone=True), default=utcnow)
    completed_at = Column(DateTime(timezone=True))
    warnings = Column(JSONB)

    # relationships
    layers = relationship("ForecastLayer", back_populates="run")


class ForecastLayer(Base):
    __tablename__ = "forecast_layers"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    run_id = Column(UUID(as_uuid=True), ForeignKey("forecast_runs.id"), nullable=False)
    lead_minutes = Column(Integer, nullable=False)
    valid_time = Column(DateTime(timezone=True), nullable=False)
    type = Column(String, nullable=False) # DEPTH, VELOCITY, DRAINAGE_SURCHARGE
    asset_path = Column(String)
    metadata_json = Column(JSONB)

    run = relationship("ForecastRun", back_populates="layers")
    __table_args__ = (
        UniqueConstraint("run_id", "lead_minutes", "type", name="uq_forecast_layer_run_lead_type"),
    )


class RoadExposureAssessment(Base):
    __tablename__ = "road_exposure_assessments"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    forecast_layer_id = Column(UUID(as_uuid=True), ForeignKey("forecast_layers.id"), nullable=False)
    road_segment_id = Column(String, ForeignKey("road_segments.id"), nullable=False)
    max_depth_m = Column(Float)
    risk_level = Column(String)
    exposed_distance_m = Column(Float)
    uncertainty = Column(Float)
    __table_args__ = (
        UniqueConstraint("forecast_layer_id", "road_segment_id", name="uq_road_exposure_layer_segment"),
    )


class RouteAssessment(Base):
    __tablename__ = "route_assessments"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    origin_geom = Column(Geometry('POINT', srid=4326))
    destination_geom = Column(Geometry('POINT', srid=4326))
    forecast_run_id = Column(UUID(as_uuid=True), ForeignKey("forecast_runs.id"))
    route_geom = Column(Geometry('LINESTRING', srid=4326))
    max_depth_m = Column(Float)
    is_safe = Column(Boolean)
    route_type = Column(String)
    distance_m = Column(Float)
    duration_seconds = Column(Float)
    risk_level = Column(String)
    created_at = Column(DateTime(timezone=True), default=utcnow)


class CitizenReport(Base):
    __tablename__ = "citizen_reports"
    id = Column(String, primary_key=True)
    user_id = Column(String)
    geom = Column(Geometry('POINT', srid=4326), nullable=False)
    photo_url = Column(String)
    description = Column(Text)
    severity = Column(String)
    verified = Column(Boolean, default=False)
    moderation_status = Column(String, nullable=False, default="RECEIVED")
    observed_at = Column(DateTime(timezone=True))
    created_at = Column(DateTime(timezone=True), default=utcnow)


class Shelter(Base):
    __tablename__ = "shelters"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    address = Column(String)
    geom = Column(Geometry('POINT', srid=4326), nullable=False)
    capacity = Column(Integer)
    current_occupancy = Column(Integer, default=0)
    status = Column(String, default='OPEN')
    source = Column(String)
    verified_at = Column(DateTime(timezone=True))
    updated_at = Column(DateTime(timezone=True), default=utcnow, onupdate=utcnow)
    __table_args__ = (
        CheckConstraint("capacity IS NULL OR capacity >= 0", name="ck_shelter_capacity_nonnegative"),
        CheckConstraint("current_occupancy >= 0", name="ck_shelter_occupancy_nonnegative"),
    )


class Alert(Base):
    __tablename__ = "alerts"
    id = Column(String, primary_key=True)
    ward_id = Column(Integer, ForeignKey("wards.id"))
    message = Column(Text, nullable=False)
    severity = Column(String, nullable=False)
    created_at = Column(DateTime(timezone=True), default=utcnow)
    expires_at = Column(DateTime(timezone=True))
    target_area = Column(Geometry('POLYGON', srid=4326))
    status = Column(String, nullable=False, default="DRAFT")
    approved_by = Column(String)
    approved_at = Column(DateTime(timezone=True))
    status = Column(String, nullable=False, default="DRAFT")
    approved_by = Column(String)
    approved_at = Column(DateTime(timezone=True))
    status = Column(String, nullable=False, default="DRAFT")
    approved_by = Column(String)
    approved_at = Column(DateTime(timezone=True))

    deliveries = relationship("AlertDeliveryAttempt", back_populates="alert")


class AlertDeliveryAttempt(Base):
    __tablename__ = "alert_delivery_attempts"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    alert_id = Column(String, ForeignKey("alerts.id"), nullable=False)
    channel = Column(String, nullable=False) # SMS, APP, EMAIL
    status = Column(String, nullable=False) # SENT, FAILED
    target_count = Column(Integer)
    delivered_count = Column(Integer)
    failed_count = Column(Integer)
    attempted_at = Column(DateTime(timezone=True), default=utcnow)

    alert = relationship("Alert", back_populates="deliveries")


class AuditEvent(Base):
    __tablename__ = "audit_events"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    action = Column(String, nullable=False)
    user_id = Column(String)
    details = Column(JSONB)
    created_at = Column(DateTime(timezone=True), default=utcnow)


class RiskAssessmentLog(Base):
    """Replaces risk_calculations table"""
    __tablename__ = "risk_assessments_log"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    geom = Column(Geometry('POINT', srid=4326), nullable=False)
    rainfall_mm_hr = Column(Float)
    blockage_pct = Column(Float)
    risk_score = Column(Float)
    risk_level = Column(String)
    water_depth_cm = Column(Float)
    nearest_drain_name = Column(String)
    nearest_drain_distance_m = Column(Float)
    data_quality_label = Column(String)
    created_at = Column(DateTime(timezone=True), default=utcnow)


Index("ix_road_segments_city", RoadSegment.city_id)
Index("ix_drainage_nodes_city", DrainageNode.city_id)
Index("ix_forecast_runs_status_created", ForecastRun.status, ForecastRun.created_at)
Index("ix_alerts_status_expires", Alert.status, Alert.expires_at)
