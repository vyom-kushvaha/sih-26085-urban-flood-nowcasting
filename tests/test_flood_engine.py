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
from ml_model import get_ml_model, FloodMLModel
from hybrid_model import calculate_hybrid_risk
from backend.main import app

client = TestClient(app)


def test_dem_processor():
    """Verify DEM elevation and slope calculation."""
    dem = get_dem_processor()
    
    # 1. Fallback check on out-of-bounds coordinates
    res_fallback = dem.get_elevation_and_slope(28.6139, 77.2090)
    assert res_fallback["in_dem_coverage"] is False
    assert res_fallback["elevation_m"] == 15.0
    assert "slope_deg" in res_fallback
    assert "slope_percent" in res_fallback
    assert res_fallback["is_fallback"] is True

    # 2. Observed elevation check on valid positive DEM coverage point
    res_observed = dem.get_elevation_and_slope(19.2, 72.9)
    assert res_observed["in_dem_coverage"] is True
    assert res_observed["elevation_m"] > 0.0
    assert res_observed["is_fallback"] is False
    print("  [PASS] DEM Processor Test (Safe Fallback + Observed Coverage)")


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


def test_physics_only_fallback():
    """TEST 1: Physics-only fallback when ML model is unavailable/untrained."""
    engine = get_risk_engine()
    ml_model = get_ml_model()
    ml_model.model = None
    ml_model.is_trained = False

    res = engine.calculate_risk(lat=19.0760, lon=72.8777, rainfall_mm_hr=40.0)
    assert res["ml_score"] is None
    assert res["calibration_mode"] == "physics_fallback"
    assert res["hybrid_score"] == res["physics_score"]
    assert res["risk_score"] == res["physics_score"]
    assert res["physics_weight"] == 0.7
    assert res["ml_weight"] == 0.3
    print("  [PASS] Test 1: Physics-Only Graceful Fallback Verified")


def test_hybrid_calculation_with_controlled_ml_stub():
    """TEST 2: Hybrid calculation with deterministic test ML prediction stub (70% physics / 30% ML)."""
    class DeterministicMockModel:
        def predict(self, features):
            return [60.0]

    engine = get_risk_engine()
    ml_model = get_ml_model()
    try:
        ml_model.model = DeterministicMockModel()
        ml_model.is_trained = True

        res = engine.calculate_risk(lat=19.0760, lon=72.8777, rainfall_mm_hr=25.0)
        assert res["ml_score"] == 60.0
        assert res["calibration_mode"] == "ml_calibrated"
        expected_hybrid = round(res["physics_score"] * 0.7 + 60.0 * 0.3, 1)
        assert abs(res["hybrid_score"] - expected_hybrid) < 0.1
    finally:
        ml_model.model = None
        ml_model.is_trained = False
    print("  [PASS] Test 2: Hybrid Risk 70/30 Weighting with Deterministic Stub Verified")


def test_ml_feature_vector_structure():
    """TEST 3: Feature vector structure strictly contains: rainfall, water depth, slope, drainage capacity, blockage."""
    ml_model = get_ml_model()
    features = ml_model.prepare_features(
        rainfall_mm_hr=50.0,
        water_depth_cm=12.5,
        slope_percent=1.8,
        drainage_capacity_mm_hr=35.0,
        blockage_pct=20.0
    )
    assert features.shape == (1, 5)
    assert features[0][0] == 50.0   # rainfall_mm_hr
    assert features[0][1] == 12.5   # water_depth_cm
    assert features[0][2] == 1.8    # slope_percent
    assert features[0][3] == 35.0   # drainage_capacity_mm_hr
    assert features[0][4] == 20.0   # blockage_pct
    print("  [PASS] Test 3: ML Feature Vector Extraction Structure Verified")


def test_risk_explain_endpoint_hybrid_breakdown():
    """TEST 4: Risk explain endpoint exposes physics_score, ml_score, hybrid_score, and calibration_mode."""
    resp = client.get("/api/v1/risk/explain?lat=19.0760&lon=72.8777&rainfall_mm_hr=40.0")
    assert resp.status_code == 200
    data = resp.json()

    assert "physics_score" in data
    assert "ml_score" in data
    assert data["ml_score"] is None
    assert "hybrid_score" in data
    assert data["hybrid_score"] == data["physics_score"]
    assert data["calibration_mode"] == "physics_fallback"
    assert data["physics_weight"] == 0.7
    assert data["ml_weight"] == 0.3
    print("  [PASS] Test 4: Risk Explain Endpoint Exposes Hybrid Explainability Breakdown")


def test_route_safety_critical_depth_not_green_with_ml():
    """TEST 6: Critical physical water-depth conditions cannot become GREEN merely because of ML."""
    class ZeroRiskStub:
        def predict(self, features):
            return [0.0]

    engine = get_risk_engine()
    ml_model = get_ml_model()
    try:
        ml_model.model = ZeroRiskStub()
        ml_model.is_trained = True

        res = engine.calculate_risk(lat=19.0182, lon=72.8455, rainfall_mm_hr=85.0, blockage_pct=60.0, duration_hours=4.0)
        assert res["water_depth_cm"] > 15.0
        assert res["risk_score"] >= 85.0
        assert res["risk_level"] == "CRITICAL"
        assert res["color_code"] == "#ef4444"
    finally:
        ml_model.model = None
        ml_model.is_trained = False
def test_drainage_deficit_and_blockage_progression():
    """TEST 7: Drainage deficit calculation and monotonic blockage progression (0% vs 60% vs 100%)."""
    engine = get_risk_engine()

    res_0 = engine.calculate_risk(lat=19.0600, lon=72.8520, rainfall_mm_hr=45.0, blockage_pct=0.0)
    res_60 = engine.calculate_risk(lat=19.0600, lon=72.8520, rainfall_mm_hr=45.0, blockage_pct=60.0)
    res_100 = engine.calculate_risk(lat=19.0600, lon=72.8520, rainfall_mm_hr=45.0, blockage_pct=100.0)

    # 1. Drainage deficit exists in hydrology_metrics and drainage
    assert "drainage_deficit_mm_hr" in res_0["hydrology_metrics"]
    assert "drainage_deficit_ratio" in res_0["hydrology_metrics"]
    assert "base_drainage_mm_hr" in res_0["hydrology_metrics"]
    assert "drainage_deficit_mm_hr" in res_0["drainage"]
    assert "provenance" in res_0["drainage"]

    # 2. Monotonic increase in drainage deficit: 0% < 60% < 100%
    def_0 = res_0["hydrology_metrics"]["drainage_deficit_mm_hr"]
    def_60 = res_60["hydrology_metrics"]["drainage_deficit_mm_hr"]
    def_100 = res_100["hydrology_metrics"]["drainage_deficit_mm_hr"]
    assert def_0 < def_60 < def_100, f"Expected def_0 ({def_0}) < def_60 ({def_60}) < def_100 ({def_100})"

    # 3. Monotonic decrease in effective capacity: 0% > 60% > 100%
    eff_0 = res_0["hydrology_metrics"]["effective_drainage_mm_hr"]
    eff_60 = res_60["hydrology_metrics"]["effective_drainage_mm_hr"]
    eff_100 = res_100["hydrology_metrics"]["effective_drainage_mm_hr"]
    assert eff_0 > eff_60 > eff_100, f"Expected eff_0 ({eff_0}) > eff_60 ({eff_60}) > eff_100 ({eff_100})"
    assert eff_100 == 0.0

    # 4. Monotonic increase in water depth: 0% < 60% < 100%
    assert res_0["water_depth_cm"] < res_60["water_depth_cm"] < res_100["water_depth_cm"]

    # 5. Monotonic increase in risk score: 0% < 60% < 100%
    assert res_0["risk_score"] < res_60["risk_score"] < res_100["risk_score"]

    print("  [PASS] Test 7: Drainage Deficit & Monotonic Blockage Progression (0% < 60% < 100%) Verified")


if __name__ == "__main__":
    print("=== RUNNING FLOOD ENGINE UNIT & FASTAPI TESTCLIENT VALIDATION TESTS ===")
    test_dem_processor()
    test_drainage_processor()
    test_invalid_coordinates_fastapi_testclient_422()
    test_valid_http_endpoints_fastapi_testclient()
    test_physics_only_fallback()
    test_hybrid_calculation_with_controlled_ml_stub()
    test_ml_feature_vector_structure()
    test_risk_explain_endpoint_hybrid_breakdown()
    test_route_safety_critical_depth_not_green_with_ml()
    test_drainage_deficit_and_blockage_progression()
    print("\n[SUCCESS] ALL FLOOD ENGINE & HYBRID MODEL VALIDATION TESTS PASSED SUCCESSFULLY!")

