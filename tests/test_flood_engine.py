"""
Unit & Integration Tests for Flood Engine & FastAPI Endpoints (TestClient Verification)
Author: Vyom (Lead Architect & Flood Engine Lead)
Project: Urban Flood Nowcasting System (SIH26085)
"""

import sys
import os
import asyncio
from fastapi.testclient import TestClient

# Add project subdirectories to sys.path
sys.path.append(os.path.join(os.path.dirname(__file__), "..", "flood-engine"))
sys.path.append(os.path.join(os.path.dirname(__file__), ".."))

from dem_processor import get_dem_processor
from drainage_processor import get_drainage_processor
from risk_engine import get_risk_engine
from backend.main import app

client = TestClient(app)


def test_dem_processor():
    """Verify DEM elevation and slope calculation."""
    dem = get_dem_processor()
    res = dem.get_elevation_and_slope(19.0760, 72.8777)
    
    assert res["in_dem_coverage"] is True
    assert res["elevation_m"] >= 0.0
    assert "slope_deg" in res
    assert "slope_percent" in res
    print("  [PASS] DEM Processor Test")


def test_drainage_processor():
    """Verify effective drainage capacity under blockage scenarios."""
    drainage = get_drainage_processor(base_capacity_mm_hr=40.0)
    
    # 0% blockage -> 40 mm/hr
    res_clean = drainage.calculate_effective_capacity(19.0760, 72.8777, blockage_pct=0.0)
    assert res_clean["effective_capacity_mm_hr"] == 40.0
    assert res_clean["drainage_status"] == "CLEAN"
    
    # 75% blockage -> CRITICALLY_CLOGGED
    res_75 = drainage.calculate_effective_capacity(19.0760, 72.8777, blockage_pct=75.0)
    assert res_75["effective_capacity_mm_hr"] == 10.0
    assert res_75["drainage_status"] == "CRITICALLY_CLOGGED"
    
    # 100% blockage -> FULLY_BLOCKED
    res_100 = drainage.calculate_effective_capacity(19.0760, 72.8777, blockage_pct=100.0)
    assert res_100["effective_capacity_mm_hr"] == 0.0
    assert res_100["drainage_status"] == "FULLY_BLOCKED"
    print("  [PASS] Drainage Processor Test")


def test_invalid_coordinates_fastapi_testclient_422():
    """Test actual FastAPI HTTP endpoints returning HTTP 422 Unprocessable Entity for invalid coordinates."""
    # 1. Invalid Risk Request (Lat > 90)
    resp1 = client.post("/api/v1/risk/current", json={"lat": 999.0, "lon": 72.8777})
    assert resp1.status_code == 422, f"Expected HTTP 422, got {resp1.status_code}"

    # 2. Invalid Elevation Request (Lon < -180)
    resp2 = client.get("/api/v1/elevation?lat=19.0760&lon=-500.0")
    assert resp2.status_code == 422, f"Expected HTTP 422, got {resp2.status_code}"

    # 3. Invalid Weather Current Request (Lat < -90)
    resp3 = client.get("/api/v1/weather/current?lat=-100.0&lon=72.8777")
    assert resp3.status_code == 422, f"Expected HTTP 422, got {resp3.status_code}"

    # 4. Invalid Weather Forecast Request (Lon > 180)
    resp4 = client.get("/api/v1/weather/forecast?lat=19.0760&lon=200.0")
    assert resp4.status_code == 422, f"Expected HTTP 422, got {resp4.status_code}"

    print("  [PASS] FastAPI TestClient HTTP 422 Validation Tests (Risk, Elevation, Weather Current, Weather Forecast)")


def test_valid_http_endpoints_fastapi_testclient():
    """Test valid HTTP requests returning HTTP 200 OK via TestClient."""
    resp_root = client.get("/api/v1/health")
    assert resp_root.status_code == 200
    assert resp_root.json()["status"] == "OPERATIONAL"


    resp_risk = client.post("/api/v1/risk/current", json={"lat": 19.0760, "lon": 72.8777, "rainfall_mm_hr": 45.0, "blockage_pct": 25.0})
    assert resp_risk.status_code == 200
    assert "risk_score" in resp_risk.json()
    assert "drainage" in resp_risk.json()
    assert resp_risk.json()["blockage_pct"] == 25.0

    print("  [PASS] FastAPI TestClient HTTP 200 OK Endpoints")


if __name__ == "__main__":
    print("=== RUNNING FLOOD ENGINE UNIT & FASTAPI TESTCLIENT VALIDATION TESTS ===")
    test_dem_processor()
    test_drainage_processor()
    test_invalid_coordinates_fastapi_testclient_422()
    test_valid_http_endpoints_fastapi_testclient()
    print("\n[SUCCESS] ALL FLOOD ENGINE & API VALIDATION TESTS PASSED SUCCESSFULLY!")
