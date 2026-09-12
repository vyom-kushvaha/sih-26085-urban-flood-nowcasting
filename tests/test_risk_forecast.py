"""
Comprehensive Tests for 0-3 Hour Urban Flood Nowcasting Pipeline
Author: Vyom (Lead Architect and Flood Engine Lead)
Project: Urban Flood Nowcasting System (SIH26085)
"""

import sys
import os
from unittest.mock import patch
from fastapi.testclient import TestClient

# Add project root and backend directory to path
sys.path.append(os.path.join(os.path.dirname(__file__), ".."))
sys.path.append(os.path.join(os.path.dirname(__file__), "..", "backend"))
sys.path.append(os.path.join(os.path.dirname(__file__), "..", "flood-engine"))

from backend.main import app
from backend.services.weather_service import get_weather_service
from risk_engine import get_risk_engine

client = TestClient(app)


def test_forecast_get_valid_3hour():
    """Test 1: Valid GET /api/v1/risk/forecast for Mumbai coordinates (horizon=3)."""
    response = client.get("/api/v1/risk/forecast?lat=19.0760&lon=72.8777&horizon_hours=3")
    assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
    data = response.json()

    # Structure checks
    assert data["nowcast_type"] == "weather-forecast-driven urban flood nowcasting"
    assert "radar" not in data["nowcast_type"].lower()
    assert "disclaimer" in data
    assert "Doppler radar" in data["disclaimer"]
    assert data["horizon_hours"] == 3
    assert data["lead_time_range"] == "T+0h to T+3h"
    assert "terrain" in data
    assert data["terrain"]["elevation_m"] is not None
    assert data["terrain"]["slope_percent"] is not None

    # Provenance checks
    assert "data_provenance" in data
    assert data["data_provenance"]["weather_input"] in ["REAL_FORECAST", "FALLBACK_MOCK"]
    terrain_provenance = data["data_provenance"]["terrain_elevation"]
    assert "REAL_DATA" in terrain_provenance or "FALLBACK" in terrain_provenance

    # Timeline checks (T+0 to T+3 = 4 timesteps)
    forecast = data["forecast"]
    assert len(forecast) == 4, f"Expected 4 forecast steps, got {len(forecast)}"

    expected_leads = ["NOW", "+1 HOUR", "+2 HOURS", "+3 HOURS"]
    for i, step in enumerate(forecast):
        assert step["hour"] == i
        assert step["lead_time"] == expected_leads[i]
        assert "rainfall_mm_hr" in step
        assert step["rainfall_mm_hr"] >= 0.0
        assert "risk_score" in step
        assert 0.0 <= step["risk_score"] <= 100.0
        assert step["risk_level"] in ["LOW", "MODERATE", "HIGH", "CRITICAL"]
        assert "hourly_water_depth_cm" in step
        assert "cumulative_water_depth_cm" in step
        assert step["hourly_water_depth_cm"] >= 0.0
        assert step["cumulative_water_depth_cm"] >= 0.0
        assert "contributing_factors" in step

    print("  [PASS] Test 1: Valid GET /risk/forecast with 4 timesteps (T+0..T+3)")


def test_forecast_post_valid():
    """Test 2: Valid POST /api/v1/risk/forecast."""
    payload = {
        "lat": 19.0182,
        "lon": 72.8455,
        "horizon_hours": 2,
        "blockage_pct": 25.0,
        "force_refresh": False
    }
    response = client.post("/api/v1/risk/forecast", json=payload)
    assert response.status_code == 200, f"Expected 200, got {response.status_code}: {response.text}"
    data = response.json()
    assert data["horizon_hours"] == 2
    assert len(data["forecast"]) == 3  # T+0, T+1, T+2
    assert data["blockage_pct"] == 25.0
    print("  [PASS] Test 2: Valid POST /risk/forecast with horizon=2")


def test_horizon_hours_strict_validation():
    """Test 3: horizon_hours MUST be strictly 1-3. Values 0, 4, 6 must return 422."""
    # horizon = 4 (above max 3)
    r4 = client.get("/api/v1/risk/forecast?lat=19.0760&lon=72.8777&horizon_hours=4")
    assert r4.status_code == 422, f"Expected 422 for horizon=4, got {r4.status_code}"

    # horizon = 0 (below min 1)
    r0 = client.get("/api/v1/risk/forecast?lat=19.0760&lon=72.8777&horizon_hours=0")
    assert r0.status_code == 422, f"Expected 422 for horizon=0, got {r0.status_code}"

    # horizon = 6 (disallowed in this task)
    r6 = client.get("/api/v1/risk/forecast?lat=19.0760&lon=72.8777&horizon_hours=6")
    assert r6.status_code == 422, f"Expected 422 for horizon=6, got {r6.status_code}"

    # POST validation for horizon = 5
    r_post = client.post("/api/v1/risk/forecast", json={"lat": 19.0760, "lon": 72.8777, "horizon_hours": 5})
    assert r_post.status_code == 422, f"Expected 422 for POST horizon=5, got {r_post.status_code}"

    # horizon = 1 (valid minimum)
    r1 = client.get("/api/v1/risk/forecast?lat=19.0760&lon=72.8777&horizon_hours=1")
    assert r1.status_code == 200
    assert len(r1.json()["forecast"]) == 2  # T+0, T+1

    print("  [PASS] Test 3: horizon_hours strict validation (1..3 enforced with HTTP 422)")


def test_invalid_coordinates_validation():
    """Test 4: Invalid latitude and longitude rejected with HTTP 422."""
    r_lat = client.get("/api/v1/risk/forecast?lat=95.0&lon=72.8777&horizon_hours=3")
    assert r_lat.status_code == 422

    r_lon = client.get("/api/v1/risk/forecast?lat=19.0760&lon=190.0&horizon_hours=3")
    assert r_lon.status_code == 422

    print("  [PASS] Test 4: Coordinate bounds [-90..90, -180..180] enforced with HTTP 422")


def test_progressive_water_accumulation_math():
    """Test 5: Verify mass balance accumulation and drainage recession."""
    ws = get_weather_service()
    ws._hourly_forecast_cache.clear()

    # Construct controlled hourly precipitation:
    # Hour 0: 30 mm/hr (at or near drainage capacity)
    # Hour 1: 60 mm/hr (heavy deluge -> significant runoff excess)
    # Hour 2: 70 mm/hr (intense burst -> cumulative depth increases further)
    # Hour 3: 10 mm/hr (light rain -> water drains, cumulative depth decreases)
    mock_pattern = [
        {"hour": 0, "lead_time": "NOW", "timestamp": "2026-09-07T00:00:00Z", "rainfall_mm_hr": 30.0, "source": "TEST_MOCK", "is_mock": True},
        {"hour": 1, "lead_time": "+1 HOUR", "timestamp": "2026-09-07T01:00:00Z", "rainfall_mm_hr": 60.0, "source": "TEST_MOCK", "is_mock": True},
        {"hour": 2, "lead_time": "+2 HOURS", "timestamp": "2026-09-07T02:00:00Z", "rainfall_mm_hr": 70.0, "source": "TEST_MOCK", "is_mock": True},
        {"hour": 3, "lead_time": "+3 HOURS", "timestamp": "2026-09-07T03:00:00Z", "rainfall_mm_hr": 10.0, "source": "TEST_MOCK", "is_mock": True}
    ]

    with patch.object(ws, "_fetch_open_meteo_hourly_forecast", return_value=mock_pattern):
        res = client.get("/api/v1/risk/forecast?lat=19.0760&lon=72.8777&horizon_hours=3&force_refresh=true")
        assert res.status_code == 200
        steps = res.json()["forecast"]

        # Step 0: Initial state
        h0 = steps[0]
        # Step 1: Deluge accumulates
        h1 = steps[1]
        assert h1["cumulative_water_depth_cm"] >= h1["hourly_water_depth_cm"]

        # Step 2: Second deluge hour increases cumulative depth
        h2 = steps[2]
        assert h2["cumulative_water_depth_cm"] > h1["cumulative_water_depth_cm"]

        # Step 3: Rain subsides to 10 mm/hr -> cumulative depth must DECREASE due to drainage
        h3 = steps[3]
        assert h3["cumulative_water_depth_cm"] < h2["cumulative_water_depth_cm"]
        print(f"    Math verification: T+0: {h0['cumulative_water_depth_cm']}cm -> T+1: {h1['cumulative_water_depth_cm']}cm -> T+2: {h2['cumulative_water_depth_cm']}cm -> T+3: {h3['cumulative_water_depth_cm']}cm (Receding)")

    print("  [PASS] Test 5: Progressive water accumulation & drainage mass balance verified")


def test_data_provenance_labels():
    """Test 6: Check fallback vs real forecast provenance labels."""
    ws = get_weather_service()
    ws._hourly_forecast_cache.clear()

    # Simulate network failure to force mock fallback
    with patch.object(ws, "_fetch_open_meteo_hourly_forecast", return_value=None):
        res = client.get("/api/v1/risk/forecast?lat=19.0760&lon=72.8777&horizon_hours=3&force_refresh=true")
        assert res.status_code == 200
        data = res.json()
        assert data["data_provenance"]["weather_input"] == "FALLBACK_MOCK"
        assert all(step["is_weather_fallback"] is True for step in data["forecast"])
        print("  [PASS] Test 6: Provenance correctly marks FALLBACK_MOCK on API outage")


def test_existing_endpoints_unaffected():
    """Test 7: Ensure existing risk, elevation, and route endpoints remain 100% operational."""
    # Current risk
    r_curr = client.post("/api/v1/risk/current", json={"lat": 19.0760, "lon": 72.8777, "rainfall_mm_hr": 35.0})
    assert r_curr.status_code == 200
    assert "risk_score" in r_curr.json()

    # Elevation
    r_elev = client.get("/api/v1/elevation?lat=19.0760&lon=72.8777")
    assert r_elev.status_code == 200
    assert "elevation_m" in r_elev.json()

    # Risk explain
    r_exp = client.get("/api/v1/risk/explain?lat=19.0760&lon=72.8777")
    assert r_exp.status_code == 200

    print("  [PASS] Test 7: All existing risk endpoints remain functional")


if __name__ == "__main__":
    print("\n========================================================")
    print("RUNNING 0-3 HOUR URBAN FLOOD NOWCASTING TEST SUITE")
    print("========================================================\n")
    test_forecast_get_valid_3hour()
    test_forecast_post_valid()
    test_horizon_hours_strict_validation()
    test_invalid_coordinates_validation()
    test_progressive_water_accumulation_math()
    test_data_provenance_labels()
    test_existing_endpoints_unaffected()
    print("\n========================================================")
    print("ALL 7 NOWCASTING PIPELINE TESTS PASSED DETERMINISTICALLY")
    print("========================================================\n")
