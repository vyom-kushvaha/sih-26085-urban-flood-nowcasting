"""
Unit & Integration Tests for PostgreSQL / PostGIS Database Integration
Author: Vyom (Lead Architect & Flood Engine Lead)
Project: Urban Flood Nowcasting System (SIH26085)
"""

import sys
import os

# Add backend directory to sys.path
sys.path.append(os.path.join(os.path.dirname(__file__), "..", "backend"))
sys.path.append(os.path.join(os.path.dirname(__file__), ".."))

from database import (
    get_db_password,
    check_db_health,
    initialize_schema_sql,
    log_risk_calculation_db
)


def test_schema_sql_file():
    """Test 1: Verify data/schema.sql exists and contains valid PostGIS DDL."""
    schema_path = os.path.join("data", "schema.sql")
    assert os.path.exists(schema_path), f"Schema file not found at {schema_path}"
    
    with open(schema_path, "r", encoding="utf-8") as f:
        sql = f.read()

    assert "CREATE EXTENSION IF NOT EXISTS postgis;" in sql
    assert "CREATE TABLE IF NOT EXISTS cities" in sql
    assert "CREATE TABLE IF NOT EXISTS drainage_segments" in sql
    assert "CREATE TABLE IF NOT EXISTS risk_calculations" in sql
    assert "USING GIST" in sql
    print("  [PASS] Test 1: PostGIS Schema SQL File & GiST Indexes Verified")


def test_password_env_resolution():
    """Test 2: Verify password naming mismatch resolution (DB_PASSWORD vs POSTGRES_PASSWORD)."""
    # Backup original envs
    orig_db_pass = os.environ.get("DB_PASSWORD")
    orig_pg_pass = os.environ.get("POSTGRES_PASSWORD")

    try:
        # Case A: DB_PASSWORD set
        os.environ["DB_PASSWORD"] = "test_pass_123"
        os.environ.pop("POSTGRES_PASSWORD", None)
        assert get_db_password() == "test_pass_123"

        # Case B: POSTGRES_PASSWORD set
        os.environ.pop("DB_PASSWORD", None)
        os.environ["POSTGRES_PASSWORD"] = "pg_pass_456"
        assert get_db_password() == "pg_pass_456"

        print("  [PASS] Test 2: Environment Password Resolution (DB_PASSWORD vs POSTGRES_PASSWORD)")
    finally:
        # Restore envs
        if orig_db_pass is not None:
            os.environ["DB_PASSWORD"] = orig_db_pass
        else:
            os.environ.pop("DB_PASSWORD", None)
            
        if orig_pg_pass is not None:
            os.environ["POSTGRES_PASSWORD"] = orig_pg_pass
        else:
            os.environ.pop("POSTGRES_PASSWORD", None)


def test_graceful_offline_fallback():
    """Test 3: Verify API and database functions do not crash when DB is offline."""
    # Temporarily clear password to simulate offline DB
    orig_db_pass = os.environ.get("DB_PASSWORD")
    orig_pg_pass = os.environ.get("POSTGRES_PASSWORD")

    os.environ.pop("DB_PASSWORD", None)
    os.environ.pop("POSTGRES_PASSWORD", None)

    try:
        health = check_db_health()
        assert health["status"] == "UNAVAILABLE"

        mock_payload = {
            "coordinates": {"lat": 19.0760, "lon": 72.8777},
            "risk_score": 45.0,
            "risk_level": "MODERATE",
            "water_depth_cm": 2.5,
            "hydrology_metrics": {"rainfall_mm_hr": 35.0},
            "drainage": {
                "nearest_drain_name": "Mithi River",
                "distance_meters": 150.0,
                "capacity_source": "OSM GeoJSON Proximity + Estimated Discharge Model"
            }
        }
        res = log_risk_calculation_db(mock_payload)
        assert res == "SKIPPED_DB_UNAVAILABLE"
        print("  [PASS] Test 3: Graceful Offline Fallback & Persistence Quality Labeling")
    finally:
        if orig_db_pass is not None:
            os.environ["DB_PASSWORD"] = orig_db_pass
        if orig_pg_pass is not None:
            os.environ["POSTGRES_PASSWORD"] = orig_pg_pass


def test_live_postgis_connection_status():
    """Test 4: Check live PostgreSQL/PostGIS connection status and run spatial query if connected."""
    health = check_db_health()
    print(f"  [DB STATUS REPORT] Live Database Health: {health['status']}")
    
    if health["status"] == "CONNECTED":
        print(f"    - DB Name: {health['dbname']}")
        print(f"    - Host: {health['host']}:{health['port']}")
        print(f"    - PostGIS Enabled: {health['postgis_enabled']}")
        if health.get("postgis_version"):
            print(f"    - PostGIS Version: {health['postgis_version']}")
        assert health["postgis_enabled"] is True
    else:
        print(f"    - Offline Reason: {health['reason']}")
        print("    - (Safe Offline Mode Active: System operates cleanly with disk GeoJSON + local DEM cache)")


if __name__ == "__main__":
    print("=== RUNNING POSTGRESQL / POSTGIS DATABASE UNIT TESTS ===")
    test_schema_sql_file()
    test_password_env_resolution()
    test_graceful_offline_fallback()
    test_live_postgis_connection_status()
    print("\n[SUCCESS] ALL DATABASE & POSTGIS UNIT TESTS PASSED SUCCESSFULLY!")
