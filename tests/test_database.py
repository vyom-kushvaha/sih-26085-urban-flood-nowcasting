import pytest
import os
from unittest.mock import patch
from sqlalchemy import text
from sqlalchemy.exc import IntegrityError
from backend.core.config import Settings, settings
from backend.db.database import get_db_session, is_db_available, Base, engine, create_db_engine
from backend.db.repositories import ForecastRepository, RiskRepository
from backend.db.models import ForecastRun, ForecastLayer, City


LIVE_POSTGIS_TESTS = os.getenv("RUN_POSTGIS_TESTS") == "1" and is_db_available()


@pytest.fixture(scope="module")
def setup_database():
    """Setup test database schema if available."""
    if is_db_available():
        Base.metadata.drop_all(bind=engine)
        Base.metadata.create_all(bind=engine)
    yield
    if is_db_available():
        Base.metadata.drop_all(bind=engine)


@pytest.mark.skipif(not LIVE_POSTGIS_TESTS, reason="Set RUN_POSTGIS_TESTS=1 for an isolated PostGIS test database")
def test_schema_creation_and_spatial(setup_database):
    """Test schema creation and spatial queries"""
    with get_db_session() as session:
        # Create a city
        city = City(
            name="Test City",
            state="TS",
            boundary="SRID=4326;POLYGON((0 0, 0 1, 1 1, 1 0, 0 0))"
        )
        session.add(city)
        session.flush()

        # Test spatial query
        result = session.execute(
            text("SELECT ST_Area(boundary) FROM cities WHERE name='Test City'")
        ).scalar()
        assert result == 1.0


@pytest.mark.skipif(not LIVE_POSTGIS_TESTS, reason="Set RUN_POSTGIS_TESTS=1 for an isolated PostGIS test database")
def test_transaction_rollback(setup_database):
    """Test transaction rollback on error"""
    with pytest.raises(IntegrityError):
        with get_db_session() as session:
            city1 = City(name="Rollback City", state="TS")
            session.add(city1)
            # Cause integrity error by violating unique constraint
            city2 = City(name="Rollback City", state="TS")
            session.add(city2)

    # Verify rollback happened
    with get_db_session() as session:
        count = session.query(City).filter_by(name="Rollback City").count()
        assert count == 0


@pytest.mark.skipif(not LIVE_POSTGIS_TESTS, reason="Set RUN_POSTGIS_TESTS=1 for an isolated PostGIS test database")
def test_invalid_foreign_keys(setup_database):
    """Test invalid foreign key constraints"""
    from backend.db.models import Ward
    with pytest.raises(IntegrityError):
        with get_db_session() as session:
            ward = Ward(city_id=999, name="Invalid Ward") # 999 doesn't exist
            session.add(ward)


@pytest.mark.skipif(not LIVE_POSTGIS_TESTS, reason="Set RUN_POSTGIS_TESTS=1 for an isolated PostGIS test database")
def test_repository_operations(setup_database):
    """Test repository operations and persistence across sessions"""
    run_id = None

    # Session 1: Save
    with get_db_session() as session:
        repo = ForecastRepository(session)
        inputs = {"param": "value"}
        result = {"snapshots": [{"lead_minutes": 0, "valid_time": "2026-09-02T10:00:00Z"}]}

        saved = repo.save_run(inputs, result)
        assert saved["status"] == "COMPLETED"
        run_id = saved["run_id"]

    # Session 2: Retrieve (persistence across sessions)
    with get_db_session() as session:
        repo = ForecastRepository(session)
        loaded = repo.get_run(run_id)
        assert loaded["input"]["param"] == "value"
        assert loaded["result"]["snapshots"][0]["lead_minutes"] == 0


def test_unavailable_database_behavior(monkeypatch):
    """An unconfigured development database enables the explicit fallback."""
    config = Settings(
        env="development", database_url=None, db_password=None,
        allow_sqlite_fallback=True, _env_file=None,
    )
    assert create_db_engine(config) is None
    assert config.sqlite_fallback_allowed is True


def test_configured_engine_is_lazy():
    config = Settings(
        env="development",
        database_url="postgresql+psycopg2://user:pass@db.example/test",
        _env_file=None,
    )
    sentinel = object()
    with patch("backend.db.database.create_engine", return_value=sentinel) as create:
        assert create_db_engine(config) is sentinel
    create.assert_called_once()


def test_production_rejects_fallback_and_missing_database():
    with pytest.raises(RuntimeError, match="DATABASE_URL"):
        create_db_engine(Settings(
            env="production", database_url=None, db_password=None,
            allow_sqlite_fallback=False, _env_file=None,
        ))
    with pytest.raises(RuntimeError, match="ALLOW_SQLITE_FALLBACK"):
        create_db_engine(Settings(
            env="production", database_url="postgresql://example/test",
            allow_sqlite_fallback=True, _env_file=None,
        ))


def test_schema_contains_required_persistence_tables():
    required = {
        "cities", "wards", "terrain_datasets", "drainage_nodes",
        "drainage_edges", "road_segments", "rainfall_frames",
        "forecast_runs", "forecast_layers", "road_exposure_assessments",
        "route_assessments", "citizen_reports", "shelters", "alerts",
        "alert_delivery_attempts", "model_versions", "audit_events",
    }
    assert required <= set(Base.metadata.tables)
