"""Create the initial versioned PostGIS application schema.

Revision ID: 20260913_0001
Revises:
"""

from alembic import op
import sqlalchemy as sa
from geoalchemy2 import Geometry
from sqlalchemy.dialects import postgresql


revision = "20260913_0001"
down_revision = None
branch_labels = None
depends_on = None

UUID = postgresql.UUID(as_uuid=True)
JSONB = postgresql.JSONB(astext_type=sa.Text())


def upgrade() -> None:
    op.execute("CREATE EXTENSION IF NOT EXISTS postgis")
    op.create_table(
        "model_versions",
        sa.Column("id", UUID, primary_key=True),
        sa.Column("version", sa.String(), nullable=False, unique=True),
        sa.Column("description", sa.Text()),
        sa.Column("created_at", sa.DateTime(timezone=True)),
        sa.Column("is_active", sa.Boolean(), nullable=False, server_default=sa.false()),
    )
    op.create_index("ix_model_versions_version", "model_versions", ["version"], unique=True)
    op.create_table(
        "cities",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("name", sa.String(), nullable=False, unique=True),
        sa.Column("state", sa.String(), nullable=False),
        sa.Column("boundary", Geometry("POLYGON", srid=4326)),
        sa.Column("dem_resolution_m", sa.Float()),
        sa.Column("created_at", sa.DateTime(timezone=True)),
    )
    op.create_index("ix_cities_name", "cities", ["name"], unique=True)
    op.create_table(
        "wards",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("city_id", sa.Integer(), sa.ForeignKey("cities.id"), nullable=False),
        sa.Column("name", sa.String(), nullable=False),
        sa.Column("code", sa.String()),
        sa.Column("boundary", Geometry("POLYGON", srid=4326)),
        sa.Column("population", sa.Integer()),
        sa.Column("flood_prone", sa.Boolean(), nullable=False, server_default=sa.false()),
        sa.UniqueConstraint("city_id", "code", name="uq_ward_city_code"),
    )
    op.create_table(
        "terrain_datasets",
        sa.Column("id", UUID, primary_key=True),
        sa.Column("city_id", sa.Integer(), sa.ForeignKey("cities.id"), nullable=False),
        sa.Column("source", sa.String(), nullable=False),
        sa.Column("dataset_version", sa.String(), nullable=False),
        sa.Column("checksum", sa.String()),
        sa.Column("crs", sa.String(), nullable=False),
        sa.Column("vertical_datum", sa.String()),
        sa.Column("resolution_m", sa.Float(), nullable=False),
        sa.Column("asset_path", sa.String(), nullable=False),
        sa.Column("bounds", Geometry("POLYGON", srid=4326)),
        sa.Column("created_at", sa.DateTime(timezone=True)),
        sa.Column("is_active", sa.Boolean(), nullable=False, server_default=sa.true()),
    )
    op.create_table(
        "drainage_nodes",
        sa.Column("id", sa.String(), primary_key=True),
        sa.Column("city_id", sa.Integer(), sa.ForeignKey("cities.id"), nullable=False),
        sa.Column("geom", Geometry("POINT", srid=4326), nullable=False),
        sa.Column("invert_m", sa.Float()),
        sa.Column("type", sa.String()),
        sa.Column("is_outfall", sa.Boolean(), nullable=False, server_default=sa.false()),
        sa.Column("outfall_status", sa.String(), nullable=False),
    )
    op.create_index("ix_drainage_nodes_city", "drainage_nodes", ["city_id"])
    op.create_table(
        "drainage_edges",
        sa.Column("id", sa.String(), primary_key=True),
        sa.Column("source_node_id", sa.String(), sa.ForeignKey("drainage_nodes.id"), nullable=False),
        sa.Column("target_node_id", sa.String(), sa.ForeignKey("drainage_nodes.id"), nullable=False),
        sa.Column("geom", Geometry("LINESTRING", srid=4326), nullable=False),
        sa.Column("diameter_m", sa.Float()),
        sa.Column("material", sa.String()),
        sa.Column("shape", sa.String()),
        sa.Column("invert_upstream_m", sa.Float()),
        sa.Column("invert_downstream_m", sa.Float()),
        sa.Column("roughness_n", sa.Float()),
        sa.Column("blockage_pct", sa.Float()),
        sa.Column("asset_status", sa.String(), nullable=False),
        sa.CheckConstraint("source_node_id <> target_node_id", name="ck_drainage_edge_not_self_loop"),
        sa.CheckConstraint("blockage_pct IS NULL OR (blockage_pct >= 0 AND blockage_pct <= 100)", name="ck_drainage_blockage_range"),
    )
    op.create_table(
        "road_segments",
        sa.Column("id", sa.String(), primary_key=True),
        sa.Column("city_id", sa.Integer(), sa.ForeignKey("cities.id"), nullable=False),
        sa.Column("geom", Geometry("LINESTRING", srid=4326), nullable=False),
        sa.Column("type", sa.String()),
        sa.Column("surface", sa.String()),
        sa.Column("elevation_m", sa.Float()),
        sa.Column("is_oneway", sa.Boolean(), nullable=False, server_default=sa.false()),
        sa.Column("access", sa.String()),
    )
    op.create_index("ix_road_segments_city", "road_segments", ["city_id"])
    op.create_table(
        "rainfall_frames",
        sa.Column("id", UUID, primary_key=True),
        sa.Column("timestamp", sa.DateTime(timezone=True), nullable=False),
        sa.Column("received_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("valid_until", sa.DateTime(timezone=True)),
        sa.Column("source", sa.String(), nullable=False),
        sa.Column("source_identifier", sa.String()),
        sa.Column("checksum", sa.String()),
        sa.Column("freshness_state", sa.String(), nullable=False),
        sa.Column("is_forecast", sa.Boolean(), nullable=False, server_default=sa.false()),
        sa.Column("asset_path", sa.String()),
        sa.Column("metadata_json", JSONB),
        sa.Column("created_at", sa.DateTime(timezone=True)),
        sa.UniqueConstraint("source", "source_identifier", name="uq_rainfall_source_identifier"),
    )
    op.create_index("ix_rainfall_frames_timestamp", "rainfall_frames", ["timestamp"])
    op.create_table(
        "forecast_runs",
        sa.Column("id", UUID, primary_key=True),
        sa.Column("model_version_id", UUID, sa.ForeignKey("model_versions.id")),
        sa.Column("rainfall_frame_id", UUID, sa.ForeignKey("rainfall_frames.id")),
        sa.Column("status", sa.String(), nullable=False),
        sa.Column("input_parameters", JSONB),
        sa.Column("warnings", JSONB),
        sa.Column("created_at", sa.DateTime(timezone=True)),
        sa.Column("completed_at", sa.DateTime(timezone=True)),
    )
    op.create_index("ix_forecast_runs_status_created", "forecast_runs", ["status", "created_at"])
    op.create_table(
        "forecast_layers",
        sa.Column("id", UUID, primary_key=True),
        sa.Column("run_id", UUID, sa.ForeignKey("forecast_runs.id"), nullable=False),
        sa.Column("lead_minutes", sa.Integer(), nullable=False),
        sa.Column("valid_time", sa.DateTime(timezone=True), nullable=False),
        sa.Column("type", sa.String(), nullable=False),
        sa.Column("asset_path", sa.String()),
        sa.Column("metadata_json", JSONB),
        sa.UniqueConstraint("run_id", "lead_minutes", "type", name="uq_forecast_layer_run_lead_type"),
    )
    op.create_table(
        "road_exposure_assessments",
        sa.Column("id", UUID, primary_key=True),
        sa.Column("forecast_layer_id", UUID, sa.ForeignKey("forecast_layers.id"), nullable=False),
        sa.Column("road_segment_id", sa.String(), sa.ForeignKey("road_segments.id"), nullable=False),
        sa.Column("max_depth_m", sa.Float()),
        sa.Column("risk_level", sa.String()),
        sa.Column("exposed_distance_m", sa.Float()),
        sa.Column("uncertainty", sa.Float()),
        sa.UniqueConstraint("forecast_layer_id", "road_segment_id", name="uq_road_exposure_layer_segment"),
    )
    op.create_table(
        "route_assessments",
        sa.Column("id", UUID, primary_key=True),
        sa.Column("origin_geom", Geometry("POINT", srid=4326)),
        sa.Column("destination_geom", Geometry("POINT", srid=4326)),
        sa.Column("forecast_run_id", UUID, sa.ForeignKey("forecast_runs.id")),
        sa.Column("route_geom", Geometry("LINESTRING", srid=4326)),
        sa.Column("max_depth_m", sa.Float()),
        sa.Column("is_safe", sa.Boolean()),
        sa.Column("route_type", sa.String()),
        sa.Column("distance_m", sa.Float()),
        sa.Column("duration_seconds", sa.Float()),
        sa.Column("risk_level", sa.String()),
        sa.Column("created_at", sa.DateTime(timezone=True)),
    )
    op.create_table(
        "citizen_reports",
        sa.Column("id", sa.String(), primary_key=True),
        sa.Column("user_id", sa.String()),
        sa.Column("geom", Geometry("POINT", srid=4326), nullable=False),
        sa.Column("photo_url", sa.String()),
        sa.Column("description", sa.Text()),
        sa.Column("severity", sa.String()),
        sa.Column("verified", sa.Boolean(), nullable=False, server_default=sa.false()),
        sa.Column("moderation_status", sa.String(), nullable=False),
        sa.Column("observed_at", sa.DateTime(timezone=True)),
        sa.Column("created_at", sa.DateTime(timezone=True)),
    )
    op.create_table(
        "shelters",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("name", sa.String(), nullable=False),
        sa.Column("address", sa.String()),
        sa.Column("geom", Geometry("POINT", srid=4326), nullable=False),
        sa.Column("capacity", sa.Integer()),
        sa.Column("current_occupancy", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("status", sa.String()),
        sa.Column("source", sa.String()),
        sa.Column("verified_at", sa.DateTime(timezone=True)),
        sa.Column("updated_at", sa.DateTime(timezone=True)),
        sa.CheckConstraint("capacity IS NULL OR capacity >= 0", name="ck_shelter_capacity_nonnegative"),
        sa.CheckConstraint("current_occupancy >= 0", name="ck_shelter_occupancy_nonnegative"),
    )
    op.create_table(
        "alerts",
        sa.Column("id", sa.String(), primary_key=True),
        sa.Column("ward_id", sa.Integer(), sa.ForeignKey("wards.id")),
        sa.Column("message", sa.Text(), nullable=False),
        sa.Column("severity", sa.String(), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True)),
        sa.Column("expires_at", sa.DateTime(timezone=True)),
        sa.Column("target_area", Geometry("POLYGON", srid=4326)),
        sa.Column("status", sa.String(), nullable=False),
        sa.Column("approved_by", sa.String()),
        sa.Column("approved_at", sa.DateTime(timezone=True)),
    )
    op.create_index("ix_alerts_status_expires", "alerts", ["status", "expires_at"])
    op.create_table(
        "alert_delivery_attempts",
        sa.Column("id", UUID, primary_key=True),
        sa.Column("alert_id", sa.String(), sa.ForeignKey("alerts.id"), nullable=False),
        sa.Column("channel", sa.String(), nullable=False),
        sa.Column("status", sa.String(), nullable=False),
        sa.Column("target_count", sa.Integer()),
        sa.Column("delivered_count", sa.Integer()),
        sa.Column("failed_count", sa.Integer()),
        sa.Column("attempted_at", sa.DateTime(timezone=True)),
    )
    op.create_table(
        "audit_events",
        sa.Column("id", UUID, primary_key=True),
        sa.Column("action", sa.String(), nullable=False),
        sa.Column("user_id", sa.String()),
        sa.Column("details", JSONB),
        sa.Column("created_at", sa.DateTime(timezone=True)),
    )
    op.create_table(
        "risk_assessments_log",
        sa.Column("id", UUID, primary_key=True),
        sa.Column("geom", Geometry("POINT", srid=4326), nullable=False),
        sa.Column("rainfall_mm_hr", sa.Float()),
        sa.Column("blockage_pct", sa.Float()),
        sa.Column("risk_score", sa.Float()),
        sa.Column("risk_level", sa.String()),
        sa.Column("water_depth_cm", sa.Float()),
        sa.Column("nearest_drain_name", sa.String()),
        sa.Column("nearest_drain_distance_m", sa.Float()),
        sa.Column("data_quality_label", sa.String()),
        sa.Column("created_at", sa.DateTime(timezone=True)),
    )


def downgrade() -> None:
    for table_name in (
        "risk_assessments_log",
        "audit_events",
        "alert_delivery_attempts",
        "alerts",
        "shelters",
        "citizen_reports",
        "route_assessments",
        "road_exposure_assessments",
        "forecast_layers",
        "forecast_runs",
        "rainfall_frames",
        "road_segments",
        "drainage_edges",
        "drainage_nodes",
        "terrain_datasets",
        "wards",
        "cities",
        "model_versions",
    ):
        op.drop_table(table_name)
    op.create_index("ix_risk_assessments_log_geom", "risk_assessments_log", ["geom"], postgresql_using="gist")


def downgrade() -> None:
    for table_name in (
        "risk_assessments_log", "audit_events", "alert_delivery_attempts", "alerts",
        "shelters", "citizen_reports", "route_assessments",
        "road_exposure_assessments", "forecast_layers", "forecast_runs",
        "rainfall_frames", "road_segments", "drainage_edges", "drainage_nodes",
        "terrain_datasets", "wards", "cities", "model_versions",
    ):
        op.drop_table(table_name)
