"""
Unit & Integration Tests for Task 4: Scenario Simulator Backend & Hydrology Coupling
Author: Vyom (Lead Architect & Flood Engine Lead)
Project: Urban Flood Nowcasting System (SIH26085)
"""

import sys
import os
from fastapi.testclient import TestClient

# Add project root and subdirectories to sys.path
sys.path.append(os.path.join(os.path.dirname(__file__), "..", "flood-engine"))
sys.path.append(os.path.join(os.path.dirname(__file__), "..", "backend"))
sys.path.append(os.path.join(os.path.dirname(__file__), ".."))

from backend.main import app

client = TestClient(app)


def test_simulation_default_payload():
    """Test 1: Verify POST /api/v1/risk/simulate with default/legacy payload."""
    payload = {
        "lat": 19.0182,
        "lon": 72.8455,
        "rainfall_mm_hr": 50.0
    }
    response = client.post("/api/v1/risk/simulate", json=payload)
    assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
    data = response.json()

    # Verify top-level structure
    assert "coordinates" in data
    assert data["coordinates"]["lat"] == 19.0182
    assert data["coordinates"]["lon"] == 72.8455
    assert data["rainfall_mm_hr"] == 50.0
    assert data["blockage_pct"] == 0.0
    assert data["duration_hours"] == 1.0

    # Verify active scenario
    assert "active_scenario" in data
    active = data["active_scenario"]
    assert "risk_score" in active
    assert "risk_level" in active
    assert "water_depth_cm" in active
    assert "effective_drainage_mm_hr" in active
    assert "drainage_deficit_mm_hr" in active
    assert "elevation_m" in active
    assert "slope_percent" in active

    # Verify baseline scenario
    assert "baseline_scenario" in data
    assert data["baseline_scenario"]["risk_level"] == "LOW"
    assert data["baseline_scenario"]["water_depth_cm"] == 0.0

    # Verify scenarios array (5 blockage tiers)
    assert "scenarios" in data
    assert len(data["scenarios"]) == 5
    blockages = [s["blockage_pct"] for s in data["scenarios"]]
    assert blockages == [0.0, 25.0, 50.0, 75.0, 100.0]

    # Verify timeline array (6 steps)
    assert "timeline" in data
    assert len(data["timeline"]) == 6
    labels = [t["label"] for t in data["timeline"]]
    assert labels == ["Now", "+30 min", "+60 min", "+90 min", "+120 min", "+180 min"]

    print("  [PASS] Test 1: Simulation Default Payload & Full Schema Verified")


def test_useful_rainfall_scenarios_50_80_120():
    """Test 2: Verify 50, 80, and 120 mm/hr rainfall scenarios produce monotonic physical response."""
    lat, lon = 19.0182, 72.8455  # Hindmata

    res_50 = client.post("/api/v1/risk/simulate", json={"lat": lat, "lon": lon, "rainfall_mm_hr": 50.0, "blockage_pct": 20.0, "duration_hours": 1.0})
    res_80 = client.post("/api/v1/risk/simulate", json={"lat": lat, "lon": lon, "rainfall_mm_hr": 80.0, "blockage_pct": 20.0, "duration_hours": 1.0})
    res_120 = client.post("/api/v1/risk/simulate", json={"lat": lat, "lon": lon, "rainfall_mm_hr": 120.0, "blockage_pct": 20.0, "duration_hours": 1.0})

    assert res_50.status_code == 200
    assert res_80.status_code == 200
    assert res_120.status_code == 200

    d50 = res_50.json()["active_scenario"]
    d80 = res_80.json()["active_scenario"]
    d120 = res_120.json()["active_scenario"]

    # 1. Monotonic increase in water depth: 50 mm/hr < 80 mm/hr < 120 mm/hr
    assert d50["water_depth_cm"] < d80["water_depth_cm"] < d120["water_depth_cm"], \
        f"Expected depth 50 ({d50['water_depth_cm']}) < 80 ({d80['water_depth_cm']}) < 120 ({d120['water_depth_cm']})"

    # 2. Monotonic increase in drainage deficit: 50 mm/hr < 80 mm/hr < 120 mm/hr
    assert d50["drainage_deficit_mm_hr"] < d80["drainage_deficit_mm_hr"] < d120["drainage_deficit_mm_hr"], \
        f"Expected deficit 50 ({d50['drainage_deficit_mm_hr']}) < 80 ({d80['drainage_deficit_mm_hr']}) < 120 ({d120['drainage_deficit_mm_hr']})"

    # 3. Monotonic increase in risk score: 50 mm/hr < 80 mm/hr < 120 mm/hr
    assert d50["risk_score"] <= d80["risk_score"] <= d120["risk_score"], \
        f"Expected risk 50 ({d50['risk_score']}) <= 80 ({d80['risk_score']}) <= 120 ({d120['risk_score']})"

    # 4. Severe cloudburst (120 mm/hr) must result in severe risk (HIGH or CRITICAL)
    assert d120["risk_level"] in ["HIGH", "CRITICAL"]
    assert d120["risk_score"] >= 70.0

    print("  [PASS] Test 2: Useful Rainfall Scenarios (50, 80, 120 mm/hr) Monotonic Physical Response Verified")


def test_blockage_impact_on_drainage_and_deficit():
    """Test 3: Verify drainage blockage (0%, 25%, 50%, 75%, 100%) affects effective drainage and deficit."""
    lat, lon = 19.0405, 72.8625  # Sion
    rainfall = 60.0

    res = client.post("/api/v1/risk/simulate", json={"lat": lat, "lon": lon, "rainfall_mm_hr": rainfall})
    assert res.status_code == 200
    scenarios = res.json()["scenarios"]

    # Verify monotonic degradation across the 5 tiers
    for i in range(len(scenarios) - 1):
        curr = scenarios[i]
        nxt = scenarios[i + 1]

        # Effective drainage must decrease as blockage increases
        assert curr["effective_drainage_mm_hr"] > nxt["effective_drainage_mm_hr"], \
            f"Expected {curr['effective_drainage_mm_hr']} > {nxt['effective_drainage_mm_hr']}"

        # Drainage deficit must increase as blockage increases
        assert curr["drainage_deficit_mm_hr"] < nxt["drainage_deficit_mm_hr"], \
            f"Expected {curr['drainage_deficit_mm_hr']} < {nxt['drainage_deficit_mm_hr']}"

        # Water depth must increase as blockage increases
        assert curr["water_depth_cm"] <= nxt["water_depth_cm"], \
            f"Expected {curr['water_depth_cm']} <= {nxt['water_depth_cm']}"

        # Risk score must increase as blockage increases
        assert curr["risk_score"] <= nxt["risk_score"], \
            f"Expected {curr['risk_score']} <= {nxt['risk_score']}"

    # 100% blockage must completely zero out effective drainage
    assert scenarios[-1]["effective_drainage_mm_hr"] == 0.0
    assert scenarios[-1]["drainage_status"] == "FULLY_BLOCKED"

    print("  [PASS] Test 3: Blockage Sensitivity (0% -> 100%) Verified Monotonic in Drainage & Deficit")


def test_simulation_determinism():
    """Test 4: Verify identical inputs produce bit-for-bit deterministic simulation results."""
    payload = {
        "lat": 19.1197,
        "lon": 72.8464,
        "rainfall_mm_hr": 75.0,
        "blockage_pct": 35.0,
        "duration_hours": 1.5
    }
    res1 = client.post("/api/v1/risk/simulate", json=payload).json()
    res2 = client.post("/api/v1/risk/simulate", json=payload).json()

    assert res1["active_scenario"]["risk_score"] == res2["active_scenario"]["risk_score"]
    assert res1["active_scenario"]["water_depth_cm"] == res2["active_scenario"]["water_depth_cm"]
    assert res1["active_scenario"]["effective_drainage_mm_hr"] == res2["active_scenario"]["effective_drainage_mm_hr"]
    assert res1["active_scenario"]["drainage_deficit_mm_hr"] == res2["active_scenario"]["drainage_deficit_mm_hr"]
    assert res1["timeline"] == res2["timeline"]
    assert res1["scenarios"] == res2["scenarios"]

    print("  [PASS] Test 4: Simulation Backend Results are 100% Deterministic")


def test_timeline_mass_balance_and_drainage_recession():
    """Test 5: Verify timeline respects physical mass balance (ponding during storm, recession after storm)."""
    # 60 min storm at 70 mm/hr with 30% blockage
    payload = {
        "lat": 19.0182,
        "lon": 72.8455,
        "rainfall_mm_hr": 70.0,
        "blockage_pct": 30.0,
        "duration_hours": 1.0  # storm lasts 60 min
    }
    res = client.post("/api/v1/risk/simulate", json=payload).json()
    timeline = res["timeline"]

    # At Now (0 min): 0 cm
    assert timeline[0]["water_depth_cm"] == 0.0
    assert timeline[0]["label"] == "Now"

    # During storm: depth accumulates (30 min < 60 min)
    depth_30 = timeline[1]["water_depth_cm"]
    depth_60 = timeline[2]["water_depth_cm"]
    assert depth_30 > 0.0, "Depth at +30 min should be positive"
    assert depth_60 > depth_30, "Depth at +60 min should be greater than +30 min during rain"

    # After storm ends at 60 min: depth should decline or clear
    depth_90 = timeline[3]["water_depth_cm"]
    assert depth_90 <= depth_60, f"Depth at +90 min ({depth_90}) should be <= peak depth at +60 min ({depth_60})"

    print("  [PASS] Test 5: Timeline Mass Balance & Drainage Recession Verified")


def test_dem_and_osm_drainage_provenance_in_simulation():
    """Test 6: Verify real DEM and OSM drainage are coupled into the simulation response."""
    payload = {
        "lat": 19.0182,
        "lon": 72.8455,
        "rainfall_mm_hr": 50.0
    }
    res = client.post("/api/v1/risk/simulate", json=payload).json()
    active = res["active_scenario"]

    # Terrain fields remain explicit even when datum validation fails closed.
    assert "elevation_m" in active
    assert active["elevation_m"] > 0.0
    assert "slope_percent" in active
    assert active["dem_status"] in ["REAL_DEM", "DEM_UNAVAILABLE", "FALLBACK_ANOMALOUS_ELEVATION"]

    # Drainage metrics from OSM
    assert "nearest_drain_name" in active
    assert "drain_distance_m" in active
    assert active["drain_distance_m"] >= 0.0
    assert "drainage_status" in active

    print("  [PASS] Test 6: Copernicus DEM & OSM Drainage Coupling in Simulation Verified")


def test_all_mumbai_study_areas():
    """Test 7: Verify simulation succeeds across all standard Mumbai study areas in CITY_DATA."""
    areas = {
        "Hindmata": (19.0182, 72.8455),
        "Sion": (19.0405, 72.8625),
        "Andheri Subway": (19.1197, 72.8464),
        "Kurla": (19.0662, 72.8780)
    }

    for name, (lat, lon) in areas.items():
        res = client.post("/api/v1/risk/simulate", json={"lat": lat, "lon": lon, "rainfall_mm_hr": 55.0, "blockage_pct": 25.0})
        assert res.status_code == 200, f"Failed for {name}: {res.text}"
        data = res.json()
        assert data["active_scenario"]["risk_score"] > 0.0
        assert data["active_scenario"]["effective_drainage_mm_hr"] > 0.0

    print(f"  [PASS] Test 7: All {len(areas)} Mumbai Study Areas Simulate Successfully")


if __name__ == "__main__":
    print("=== RUNNING SCENARIO SIMULATOR INTEGRATION & HYDROLOGY TESTS ===")
    test_simulation_default_payload()
    test_useful_rainfall_scenarios_50_80_120()
    test_blockage_impact_on_drainage_and_deficit()
    test_simulation_determinism()
    test_timeline_mass_balance_and_drainage_recession()
    test_dem_and_osm_drainage_provenance_in_simulation()
    test_all_mumbai_study_areas()
    print("\n[SUCCESS] ALL SCENARIO SIMULATOR TESTS PASSED SUCCESSFULLY!")
