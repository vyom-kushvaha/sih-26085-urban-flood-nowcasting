"""
Unit & Integration Tests for Historical Flood Scenarios (Mumbai 2005 & 2017)
Author: Vyom (Lead Architect & Flood Engine Lead)
Project: Urban Flood Nowcasting System (SIH26085)

Verifies:
1. Strict adherence to authoritative official sources (IMD MAUSAM, MHA, NIDM, MOSDAC/ISRO, PIB).
2. Exact numerical values match official publications (no fabricated values).
3. Ground-truth validation honestly reports "NOT AVAILABLE".
4. Scenarios feed through the EXISTING physics + ML hybrid route engine.
5. Endpoints: GET /api/v1/scenarios, GET /api/v1/scenarios/{id}, POST /api/v1/scenarios/{id}/replay.
"""

import os
import sys
import pytest
from fastapi.testclient import TestClient

# Ensure project root is in sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from backend.main import app
from backend.services.historical_scenarios import (
    load_historical_scenarios,
    get_historical_scenarios,
    get_historical_scenario,
    get_scenario_replay_rainfall
)

client = TestClient(app)


def test_historical_scenarios_registry_schema():
    """Test 1: Registry loads cleanly and contains required schema structure."""
    data = load_historical_scenarios()
    assert "schema_version" in data
    assert "scenarios" in data
    assert len(data["scenarios"]) == 2

    ids = [s["scenario_id"] for s in data["scenarios"]]
    assert "2005_deluge" in ids
    assert "2017_flood" in ids
    print("  [PASS] Test 1: Historical Scenarios Registry Schema Verified")


def test_2005_deluge_authoritative_values():
    """Test 2: Mumbai 2005 scenario contains exact observed values from IMD MAUSAM Table 7 and MHA report."""
    sc = get_historical_scenario("2005_deluge")
    assert sc is not None
    assert sc["scenario_id"] == "2005_deluge"
    assert "26 July 2005" in sc["event_name"]
    assert sc["location"]["primary_station"] == "Santacruz Observatory, Mumbai"
    assert sc["location"]["coordinates"]["lat"] == 19.11
    assert sc["location"]["coordinates"]["lon"] == 72.85

    # Check sources
    source_urls = [s["url"] for s in sc["data_sources"]]
    assert "https://mausamjournal.imd.gov.in/Vol60spl.pdf" in source_urls
    assert "https://www.mha.gov.in/sites/default/files/ar0506-Eng_2.pdf" in source_urls
    assert "https://nidm.gov.in/PDF/pubs/areport_03.pdf" in source_urls
    assert "https://www.pib.gov.in/Pressreleaseshare.aspx?PRID=1630928&lang=2&reg=48" in source_urls

    # Observed 24h rainfall
    observed = sc["data_classification"]["observed_data"]
    assert observed["total_rainfall_mm"] == 944.2
    assert observed["total_rainfall_cm"] == 94.42
    assert observed["duration_hours"] == 24.0

    # Verify 3-hourly time series matches Table 7 on Page 52 of MAUSAM Vol. 60
    ts = observed["time_series_3hourly"]
    assert len(ts) == 9
    assert ts[0]["timestamp_utc"] == "2005-07-26T03:00:00Z"
    assert ts[0]["accumulated_cm"] == 0.09
    assert ts[3]["timestamp_utc"] == "2005-07-26T12:00:00Z"
    assert ts[3]["accumulated_cm"] == 45.01
    assert ts[3]["interval_rate_mm_hr"] == 143.9  # Peak burst: 431.7 mm in 3 hrs
    assert ts[8]["timestamp_utc"] == "2005-07-27T03:00:00Z"
    assert ts[8]["accumulated_cm"] == 94.42

    # Surrounding stations
    surrounding = observed["surrounding_stations"]
    colaba = next(s for s in surrounding if "Colaba" in s["station"])
    assert colaba["rainfall_24h_mm"] == 74.0

    # Modelled data distinction
    modelled = sc["data_classification"]["modelled_data"]["models"]
    cntl = next(m for m in modelled if "CNTL" in m["model_name"])
    assert cntl["total_24h_cm"] == 35.6
    dvar = next(m for m in modelled if "3DVAR" in m["model_name"])
    assert dvar["total_24h_cm"] == 78.1

    print("  [PASS] Test 2: Mumbai 2005 Exact Authoritative Values Verified")


def test_2017_flood_authoritative_values():
    """Test 3: Mumbai 2017 scenario contains exact documented values from MOSDAC/ISRO and IMD Mumbai records."""
    sc = get_historical_scenario("2017_flood")
    assert sc is not None
    assert sc["scenario_id"] == "2017_flood"
    assert "2017" in sc["event_name"]

    source_urls = [s["url"] for s in sc["data_sources"]]
    assert "https://mosdac.gov.in/docs/Mumbai_deluge.pdf?language=en" in source_urls
    assert "https://city.imd.gov.in/citywx/extreme/AUG/mumbai2.htm" in source_urls
    assert "https://www.pib.gov.in/Pressreleaseshare.aspx?PRID=1630928&lang=2&reg=48" in source_urls

    # Observed August extremes
    observed = sc["data_classification"]["observed_data"]
    assert observed["august_24h_max_mm"] == 331.4
    assert observed["august_monthly_total_mm"] == 950.3

    # AWS Thane burst episodes
    aws = observed["aws_burst_episodes"][0]
    assert aws["min_observed_burst_mm_hr"] == 50.0
    assert aws["max_observed_burst_mm_hr"] == 100.0

    # Forecast / Nowcast
    forecast = sc["data_classification"]["forecast_data"]
    assert forecast["lead_time_hours"] == 2.0
    assert forecast["radius_of_influence_km"] == 50.0

    # Modelled WRF
    modelled = sc["data_classification"]["modelled_data"]
    assert modelled["model"] == "WRF V3.9"
    assert modelled["spatial_resolution_km"] == 5.0

    print("  [PASS] Test 3: Mumbai 2017 Exact Authoritative Values Verified")


def test_historical_validation_status_honesty():
    """Test 4: Ground truth validation honestly reports NOT AVAILABLE without fabricated accuracy."""
    sc2005 = get_historical_scenario("2005_deluge")
    sc2017 = get_historical_scenario("2017_flood")

    expected_msg = "Historical rainfall replay implemented; historical flood-depth validation dataset unavailable."

    assert sc2005["validation"]["historical_flood_depth_ground_truth"] == "NOT AVAILABLE"
    assert sc2005["validation"]["validation_status"] == expected_msg
    assert sc2005["validation"]["accuracy_percentage"] is None

    assert sc2017["validation"]["historical_flood_depth_ground_truth"] == "NOT AVAILABLE"
    assert sc2017["validation"]["validation_status"] == expected_msg
    assert sc2017["validation"]["accuracy_percentage"] is None
    print("  [PASS] Test 4: Historical Validation Honesty & Ground Truth Exclusion Verified")


def test_api_get_scenarios_list():
    """Test 5: GET /api/v1/scenarios returns HTTP 200 with list of scenarios and metadata."""
    res = client.get("/api/v1/scenarios")
    assert res.status_code == 200
    data = res.json()
    assert data["status"] == "success"
    assert data["count"] == 2
    assert "disclaimer" in data
    assert len(data["scenarios"]) == 2
    print("  [PASS] Test 5: GET /api/v1/scenarios Endpoint Verified")


def test_api_get_single_scenario():
    """Test 6: GET /api/v1/scenarios/{id} retrieves scenario details; returns 404 on unknown ID."""
    res_2005 = client.get("/api/v1/scenarios/2005_deluge")
    assert res_2005.status_code == 200
    assert res_2005.json()["scenario_id"] == "2005_deluge"

    res_2017 = client.get("/api/v1/scenarios/2017_flood")
    assert res_2017.status_code == 200
    assert res_2017.json()["scenario_id"] == "2017_flood"

    res_unknown = client.get("/api/v1/scenarios/unknown_id")
    assert res_unknown.status_code == 404
    print("  [PASS] Test 6: GET /api/v1/scenarios/{id} Endpoint Verified")


def test_api_replay_2005_deluge_through_existing_pipeline():
    """Test 7: POST /api/v1/scenarios/2005_deluge/replay feeds peak burst into existing flood/route pipeline."""
    res = client.post("/api/v1/scenarios/2005_deluge/replay", json={
        "origin": "Hindmata, Dadar, Mumbai",
        "destination": "Chhatrapati Shivaji Maharaj Park",
        "timestep": "peak_burst"
    })
    assert res.status_code == 200
    data = res.json()

    query = data["query"]
    assert query["rainfall_mm_hr"] == 143.9
    assert "HISTORICAL_SCENARIO: 2005_deluge" in query["weather_source"]
    assert query["scenario"]["scenario_id"] == "2005_deluge"
    assert query["historical_flood_depth_ground_truth"] == "NOT AVAILABLE"
    assert "Historical rainfall replay implemented" in query["validation_status"]
    assert query["accuracy_percentage"] is None

    # Under 143.9 mm/hr deluge, routes must reflect high water accumulation and flood risk
    assert len(data["routes"]) == 3
    # Tilak Flyover elevated corridor should be relatively safest, while low-lying corridors are inundated
    danger_route = data["danger_route"]
    assert danger_route["risk_score"] > 60.0
    print("  [PASS] Test 7: 2005 Deluge Replay Through Existing Pipeline Verified")


def test_api_replay_2017_flood_through_existing_pipeline():
    """Test 8: POST /api/v1/scenarios/2017_flood/replay feeds AWS burst into existing flood/route pipeline."""
    res = client.post("/api/v1/scenarios/2017_flood/replay", json={
        "origin": "Hindmata, Dadar, Mumbai",
        "destination": "Chhatrapati Shivaji Maharaj Park",
        "timestep": "peak_burst"
    })
    assert res.status_code == 200
    data = res.json()

    query = data["query"]
    assert query["rainfall_mm_hr"] == 100.0
    assert "HISTORICAL_SCENARIO: 2017_flood" in query["weather_source"]
    assert query["scenario"]["scenario_id"] == "2017_flood"
    assert query["historical_flood_depth_ground_truth"] == "NOT AVAILABLE"
    assert "Historical rainfall replay implemented" in query["validation_status"]

    assert len(data["routes"]) == 3
    print("  [PASS] Test 8: 2017 Flood Replay Through Existing Pipeline Verified")


def test_safe_route_with_scenario_id_param():
    """Test 9: GET /api/v1/routing/safe-route accepts scenario_id query parameter and triggers replay."""
    res = client.get("/api/v1/routing/safe-route?origin=Hindmata&destination=Kurla&scenario_id=2005_deluge&timestep=daily_average")
    assert res.status_code == 200
    data = res.json()

    query = data["query"]
    assert query["rainfall_mm_hr"] == 39.34
    assert query["scenario"]["scenario_id"] == "2005_deluge"
    assert "daily_average" in query["scenario"]["timestep"]
    print("  [PASS] Test 9: /api/v1/routing/safe-route Scenario Query Parameters Verified")


def test_frontend_historical_flood_replay_ui():
    """Test 10: Verify frontend index.html exposes Historical Flood Replay controls, buttons, citations, and presets."""
    res = client.get("/")
    assert res.status_code == 200
    html = res.text

    # Historical Flood Replay container & section title
    assert "Historical Flood Replay" in html
    assert "hist-replay-panel" in html
    assert "histReplayPanel" in html

    # The 3 primary interactive buttons
    assert "btnReplayLive" in html
    assert "Live OpenWeatherMap" in html
    assert "btnReplay2005" in html
    assert "Mumbai 2005 Deluge" in html
    assert "btnReplay2017" in html
    assert "Mumbai 2017 Flood" in html

    # Replayed rainfall intensity values
    assert "143.9 mm/hr" in html
    assert "100.0 mm/hr" in html

    # Timestep controls & callbacks
    assert "hist-timestep-btn" in html
    assert "peak_burst" in html
    assert "daily_average" in html
    assert "setScenarioMode" in html
    assert "renderHistReplayDetailsHTML" in html

    # Honest disclaimer presence
    assert "Historical rainfall replay implemented; historical flood-depth validation dataset unavailable." in html

    # Scenario Simulator page presets
    assert '"Mumbai 2005 Deluge": {rainfall:143.9' in html or '"Mumbai 2005 Deluge": {rainfall: 143.9' in html
    assert '"Mumbai 2017 Flood": {rainfall:100.0' in html or '"Mumbai 2017 Flood": {rainfall: 100.0' in html

    print("  [PASS] Test 10: Frontend Historical Flood Replay Controls & Simulator Presets Verified")


if __name__ == "__main__":
    print("=== RUNNING HISTORICAL FLOOD SCENARIOS TESTS ===")
    test_historical_scenarios_registry_schema()
    test_2005_deluge_authoritative_values()
    test_2017_flood_authoritative_values()
    test_historical_validation_status_honesty()
    test_api_get_scenarios_list()
    test_api_get_single_scenario()
    test_api_replay_2005_deluge_through_existing_pipeline()
    test_api_replay_2017_flood_through_existing_pipeline()
    test_safe_route_with_scenario_id_param()
    test_frontend_historical_flood_replay_ui()
    print("\n[SUCCESS] ALL 10 HISTORICAL SCENARIO & FRONTEND REPLAY TESTS PASSED SUCCESSFULLY!")

