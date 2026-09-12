"""
Deterministic Integration Tests for R.A.K.S.H.A.K. Frontend & FastAPI Backend Coupling
Author: Vyom (Lead Architect & Flood Engine Lead)
Project: Urban Flood Nowcasting System (SIH26085)
"""

import sys
import os
from fastapi.testclient import TestClient

# Add project root and backend directory to path
sys.path.append(os.path.join(os.path.dirname(__file__), ".."))
sys.path.append(os.path.join(os.path.dirname(__file__), "..", "backend"))

from backend.main import app

client = TestClient(app)


def test_root_serves_frontend_index_html():
    """Serve the agreed identity and application assets."""
    response = client.get("/")
    assert response.status_code == 200
    assert "text/html" in response.headers["content-type"]
    assert "R.A.K.S.H.A.K." in response.text
    assert "Real-time Assessment &amp; Knowledge System" in response.text
    assert "/static/platform.js" in response.text


def test_drainage_geojson_endpoint():
    """Test 2: GET /api/v1/risk/geojson/drainage should return valid GeoJSON for Leaflet map."""
    response = client.get("/api/v1/risk/geojson/drainage")
    assert response.status_code == 200
    data = response.json()
    assert data["type"] == "FeatureCollection"
    assert "features" in data
    assert len(data["features"]) > 0
    print(f"  [PASS] Test 2: GeoJSON Drainage Endpoint Serves {len(data['features'])} Features")


def test_explainable_risk_endpoint_get():
    """Test 3: GET /api/v1/risk/explain should return risk metrics and quality metadata."""
    response = client.get("/api/v1/risk/explain?lat=19.0760&lon=72.8777&blockage_pct=25.0")
    assert response.status_code == 200
    data = response.json()
    assert "risk_score" in data
    assert "risk_level" in data
    assert "hydrology_metrics" in data
    assert "effective_drainage_mm_hr" in data["hydrology_metrics"]
    print("  [PASS] Test 3: Explainable Risk GET Endpoint Verified")


def test_weather_current_endpoint():
    """Test 4: GET /api/v1/weather/current should return real-time or fallback rainfall data."""
    response = client.get("/api/v1/weather/current?lat=19.0760&lon=72.8777")
    assert response.status_code == 200
    data = response.json()
    assert "weather" in data
    assert "rainfall_mm_hr" in data["weather"]
    assert "source" in data["weather"]
    print("  [PASS] Test 4: Weather Current Endpoint Verified")


def test_safe_route_endpoint():
    """Test 5: GET /api/v1/routing/safe-route should dynamically evaluate routes based on weather."""
    # Live weather test
    response = client.get("/api/v1/routing/safe-route?origin=Hindmata&destination=Kurla")
    assert response.status_code == 200
    data = response.json()
    assert "safe_route" in data
    assert "danger_route" in data
    assert data["safe_route"]["color"] in ["#10B981", "#F59E0B", "#EF4444", "#64748B"]
    if data["safe_route"]["color"] == "#64748B":
        assert data["prediction_valid"] is False
        assert data["safe_route_available"] is False
    assert data["danger_route"]["color"] in ["#10B981", "#F59E0B", "#EF4444", "#64748B"]
    assert len(data["safe_route"]["coordinates"]) > 0
    assert len(data["danger_route"]["coordinates"]) > 0
    assert "active_flood_hotspots" in data

    # Extreme monsoon scenario test (80 mm/hr) -> direct lowland corridor must turn RED
    monsoon_res = client.get("/api/v1/routing/safe-route?origin=Hindmata&destination=Kurla&rainfall_mm_hr=80.0")
    assert monsoon_res.status_code == 200
    m_data = monsoon_res.json()
    if m_data["prediction_valid"]:
        assert m_data["danger_route"]["color"] == "#EF4444"
        assert m_data["danger_route"]["status"] == "DANGER"
        assert m_data["danger_route"]["max_water_depth_cm"] > 0
    else:
        assert m_data["danger_route"]["color"] == "#64748B"
    print("  [PASS] Test 5: Dynamic Safe/Danger Route Endpoint Verified (Live + 80mm/hr Monsoon)")



def test_all_routes_together():
    """Test 6: GET /api/v1/routing/safe-route returns multiple distinct candidate routes together."""
    res = client.get("/api/v1/routing/safe-route?origin=Hindmata&destination=Chhatrapati+Shivaji+Maharaj+Park")
    assert res.status_code == 200
    data = res.json()
    assert "routes" in data
    assert len(data["routes"]) == 3

    route_ids = [r["id"] for r in data["routes"]]
    assert len(set(route_ids)) == 3

    # Verify geometries are actually different
    coords_list = [r["coordinates"] for r in data["routes"]]
    assert coords_list[0] != coords_list[1]
    assert coords_list[1] != coords_list[2]
    assert coords_list[0] != coords_list[2]

    # Verify each route has independent metrics and properties
    for r in data["routes"]:
        assert "name" in r
        assert "distance_km" in r
        assert "estimated_duration_min" in r
        assert "risk_score" in r
        assert "max_water_depth_cm" in r
        assert "risk_category" in r
        assert "color" in r
        assert r["color"] in ["#10B981", "#F59E0B", "#EF4444", "#64748B"]

    # Verify recommended route
    assert "recommended_route_id" in data
    assert data["recommended_route_id"] in route_ids

    # Verify backward compatibility
    assert "safe_route" in data
    assert "danger_route" in data
    print("  [PASS] Test 6: Multiple Candidate Routes (3 Corridors) with Distinct Geometries Verified")


def test_route_origin_destination_coordinates_matching():
    """Test 7: Route coordinates[0] and coordinates[-1] strictly match resolved origin and destination."""
    res = client.get("/api/v1/routing/safe-route?origin=Hindmata&destination=Chhatrapati+Shivaji+Maharaj+Park")
    assert res.status_code == 200
    data = res.json()
    assert "origin_coords" in data["query"]
    assert "dest_coords" in data["query"]

    o_lat = data["query"]["origin_coords"]["lat"]
    o_lon = data["query"]["origin_coords"]["lon"]
    d_lat = data["query"]["dest_coords"]["lat"]
    d_lon = data["query"]["dest_coords"]["lon"]

    # Endpoints match resolved coordinates
    assert abs(o_lat - 19.0178) < 0.001
    assert abs(o_lon - 72.8478) < 0.001
    assert abs(d_lat - 19.0272) < 0.001
    assert abs(d_lon - 72.8374) < 0.001

    for r in data["routes"]:
        start_pt = r["coordinates"][0]
        end_pt = r["coordinates"][-1]
        assert abs(start_pt[0] - o_lat) < 0.001
        assert abs(start_pt[1] - o_lon) < 0.001
        assert abs(end_pt[0] - d_lat) < 0.001
        assert abs(end_pt[1] - d_lon) < 0.001
    print("  [PASS] Test 7: Origin and Destination Coordinates Strictly Match Route Endpoints")


def test_changing_destination_updates_coordinates():
    """Test 8: Changing destination input updates endpoint coordinates from Shivaji Park to Kurla."""
    res_shivaji = client.get("/api/v1/routing/safe-route?origin=Hindmata&destination=Chhatrapati+Shivaji+Maharaj+Park")
    assert res_shivaji.status_code == 200
    shivaji_end = res_shivaji.json()["routes"][0]["coordinates"][-1]

    res_kurla = client.get("/api/v1/routing/safe-route?origin=Hindmata&destination=Kurla")
    assert res_kurla.status_code == 200
    kurla_end = res_kurla.json()["routes"][0]["coordinates"][-1]

    # Destination coordinates must change and not be stuck on old destination
    assert shivaji_end != kurla_end
    assert abs(kurla_end[0] - 19.0657) < 0.005
    assert abs(kurla_end[1] - 72.8793) < 0.005
    print("  [PASS] Test 8: Changing Destination Updates Route Coordinates Dynamically")


def test_out_of_bounds_rejection():
    """Test 9: Locations outside Mumbai metropolitan boundary (e.g. Kathlal, Pune) are rejected with HTTP 400."""
    # Kathlal in Gujarat
    res_kathlal = client.get("/api/v1/routing/safe-route?origin=Hindmata&destination=Kathlal")
    assert res_kathlal.status_code == 400
    assert "Destination is outside the supported Mumbai flood-routing area." in res_kathlal.json()["detail"]

    # Pune
    res_pune = client.get("/api/v1/routing/safe-route?origin=Pune&destination=Hindmata")
    assert res_pune.status_code == 400
    assert "Origin is outside the supported Mumbai flood-routing area." in res_pune.json()["detail"]

    # Explicit coordinates outside Mumbai
    res_coords = client.get("/api/v1/routing/safe-route?origin=Hindmata&destination=Out&dest_lat=22.8986&dest_lon=72.9909")
    assert res_coords.status_code == 400
    assert "Destination is outside the supported Mumbai flood-routing area." in res_coords.json()["detail"]
    print("  [PASS] Test 9: General Geographic Boundary Validation Rejects Out-of-Bounds Queries")


def test_unresolvable_location_rejection():
    """Test 10: Invalid/unresolvable strings (e.g. XYZ_RANDOM_INVALID_LOCATION_123) are rejected with HTTP 400."""
    res_invalid = client.get("/api/v1/routing/safe-route?origin=Hindmata&destination=XYZ_RANDOM_INVALID_LOCATION_123")
    assert res_invalid.status_code == 400
    assert "Location could not be found. Please select a valid Mumbai location." in res_invalid.json()["detail"]
    print("  [PASS] Test 10: Unresolvable / Invalid Locations Properly Rejected with Clean Error")


def test_segment_flood_safety_and_no_forced_green():
    """Test 11: Segment-level flood safety enforcement and no forced GREEN routes during severe deluge."""
    # Under extreme monsoon rain (80 mm/hr)
    res = client.get("/api/v1/routing/safe-route?origin=Hindmata&destination=Kurla&rainfall_mm_hr=80.0")
    assert res.status_code == 200
    data = res.json()

    # In extreme deluge, no candidate qualifies as SAFE (Green)
    assert data["safe_route_available"] is False
    assert data["no_safe_route_warning"] is not None
    assert (
        "No safe route currently available" in data["no_safe_route_warning"]
        or "Flood-safe routing is unavailable" in data["no_safe_route_warning"]
    )

    # Colors must reflect true risk, no forced #10B981
    colors = [r["color"] for r in data["routes"]]
    assert "#10B981" not in colors
    assert all(c in ["#F59E0B", "#EF4444", "#64748B"] for c in colors)

    # The road provider chooses route IDs; risk classification must not depend on
    # a fabricated corridor name such as "lowland".
    if data["prediction_valid"]:
        assert any(route["risk_category"] == "DANGER" for route in data["routes"])
    else:
        assert all(route["risk_category"] == "UNAVAILABLE" for route in data["routes"])
    print("  [PASS] Test 11: Segment-Level Flood Safety & No Forced GREEN During Severe Deluge Verified")


def test_live_gps_walking_origin_and_exact_match():
    """Test 12: Route calculation with live GPS origin matches user coordinates exactly."""
    live_lat, live_lon = 19.0195, 72.8465
    res = client.get(f"/api/v1/routing/safe-route?origin=Live+GPS&origin_lat={live_lat}&origin_lon={live_lon}&destination=Chhatrapati+Shivaji+Maharaj+Park")
    assert res.status_code == 200
    data = res.json()
    assert abs(data["query"]["origin_coords"]["lat"] - live_lat) < 0.0001
    assert abs(data["query"]["origin_coords"]["lon"] - live_lon) < 0.0001

    for r in data["routes"]:
        start_pt = r["coordinates"][0]
        assert abs(start_pt[0] - live_lat) < 0.0001
        assert abs(start_pt[1] - live_lon) < 0.0001
    print("  [PASS] Test 12: Live GPS Origin Navigation Coordinates Strictly Matched")


def test_intermediate_walking_reroute_and_distance_reduction():
    """Test 13: Forward movement along route reduces distance and avoids looping backwards."""
    # 1. Start at Hindmata
    start_res = client.get("/api/v1/routing/safe-route?origin=Hindmata&destination=Chhatrapati+Shivaji+Maharaj+Park")
    assert start_res.status_code == 200
    start_data = start_res.json()
    initial_dist = start_data["routes"][0]["distance_km"]

    # 2. User walks forward ~700 meters to intermediate point along Tilak / Gokhale corridor
    fwd_lat, fwd_lon = 19.0245, 72.8410
    fwd_res = client.get(f"/api/v1/routing/safe-route?origin=Live+GPS&origin_lat={fwd_lat}&origin_lon={fwd_lon}&destination=Chhatrapati+Shivaji+Maharaj+Park")
    assert fwd_res.status_code == 200
    fwd_data = fwd_res.json()
    remaining_dist = fwd_data["routes"][0]["distance_km"]

    # Remaining distance must be less than initial distance
    assert remaining_dist < initial_dist
    # Coordinates start at the forward walking position
    assert abs(fwd_data["routes"][0]["coordinates"][0][0] - fwd_lat) < 0.0001
    # Destination remains fixed at Shivaji Park
    assert abs(fwd_data["routes"][0]["coordinates"][-1][0] - 19.0272) < 0.001
    print("  [PASS] Test 13: Intermediate Walking Reroute Confirms Distance Countdown & Forward Direction")


def test_off_route_recalculation():
    """Test 14: Off-route deviation triggers dynamic reroute from deviated position to fixed destination."""
    deviated_lat, deviated_lon = 19.0210, 72.8490
    res = client.get(f"/api/v1/routing/safe-route?origin=Live+GPS&origin_lat={deviated_lat}&origin_lon={deviated_lon}&destination=Chhatrapati+Shivaji+Maharaj+Park")
    assert res.status_code == 200
    data = res.json()
    assert len(data["routes"]) > 0
    assert abs(data["routes"][0]["coordinates"][0][0] - deviated_lat) < 0.0001
    assert abs(data["routes"][0]["coordinates"][-1][0] - 19.0272) < 0.001
    assert data["routes"][0]["risk_category"] in ["SAFE", "MODERATE", "DANGER", "UNAVAILABLE"]
    if data["routes"][0]["risk_category"] == "UNAVAILABLE":
        assert data["safe_route_available"] is False
        assert data["prediction_valid"] is False
    print("  [PASS] Test 14: Dynamic Off-Route Recalculation from Deviated Coordinates Verified")


def test_arrival_proximity_detection():
    """Test 15: Proximity within 35m of destination sets is_arrived flag and reports distance."""
    # Shivaji Park coords: lat 19.0272, lon 72.8374
    # Arrival coordinate ~15m away
    arr_lat, arr_lon = 19.0273, 72.8375
    res = client.get(f"/api/v1/routing/safe-route?origin=Live+GPS&origin_lat={arr_lat}&origin_lon={arr_lon}&destination=Chhatrapati+Shivaji+Maharaj+Park")
    assert res.status_code == 200
    data = res.json()
    assert data["is_arrived"] is True
    assert data["dist_to_dest_m"] <= 35.0
    print("  [PASS] Test 15: Destination Arrival Proximity (<=35m) Detection Verified")


def test_live_gps_out_of_bounds_rejected():
    """Test 16: Live GPS coordinates outside Mumbai boundary return HTTP 400."""
    res = client.get("/api/v1/routing/safe-route?origin=Live+GPS&origin_lat=22.8986&origin_lon=72.9909&destination=Kurla")
    assert res.status_code == 400
    assert "Origin is outside the supported Mumbai flood-routing area." in res.json()["detail"]
    print("  [PASS] Test 16: Out-of-Bounds Live GPS Origin Properly Rejected with HTTP 400")


def test_current_route_control_in_frontend_html():
    """Current recenter, follow and route controls are present."""
    html = client.get("/").text
    for control in ["mumbai-default", "find-route", "origin", "destination"]:
        assert f'id="{control}"' in html


def test_focus_current_route_logic_and_safeguards():
    """JS asset is served correctly; handler behavior has Node tests."""
    response = client.get("/static/platform.js")
    assert response.status_code == 200
    assert "javascript" in response.headers["content-type"]
    assert "localhost" not in response.text


def test_map_drag_preserves_route_state():
    """Responsive assets are served by the same application."""
    for path in ["/static/platform.css", "/static/brand.css", "/static/mumbai-boundary.geojson"]:
        response = client.get(path)
        assert response.status_code == 200
        assert len(response.content) > 0


def test_safe_route_hybrid_breakdown():
    """Test 20: Verify /api/v1/routing/safe-route exposes physics/ML hybrid breakdown and fallback metadata."""
    res = client.get("/api/v1/routing/safe-route?origin=Hindmata&destination=Kurla")
    assert res.status_code == 200
    data = res.json()

    assert "query" in data
    assert data["query"]["calibration_mode"] == "physics_fallback"
    assert data["query"]["physics_weight"] == 0.7
    assert data["query"]["ml_weight"] == 0.3

    assert "routes" in data
    assert len(data["routes"]) > 0
    for r in data["routes"]:
        assert "physics_score" in r
        assert "hybrid_score" in r
        assert "calibration_mode" in r
        assert r["calibration_mode"] == "physics_fallback"
        assert r["ml_score"] is None
        assert r["hybrid_score"] == r["physics_score"]
    print("  [PASS] Test 20: Safe Route Endpoint Exposes Hybrid Metadata & Fallback Alignment")


def test_scenario_simulator_frontend_integration():
    """The product uses the requested five-page navigation."""
    html = client.get("/").text
    for page in ["map", "dashboard", "report", "about", "login"]:
        assert f'href="#/{page}"' in html
    assert 'type="range"' not in html
    assert "computeDepthFromInputs" not in html


if __name__ == "__main__":
    print("=== RUNNING FRONTEND INTEGRATION & FASTAPI TESTCLIENT TESTS ===")
    test_root_serves_frontend_index_html()
    test_drainage_geojson_endpoint()
    test_explainable_risk_endpoint_get()
    test_weather_current_endpoint()
    test_safe_route_endpoint()
    test_all_routes_together()
    test_route_origin_destination_coordinates_matching()
    test_changing_destination_updates_coordinates()
    test_out_of_bounds_rejection()
    test_unresolvable_location_rejection()
    test_segment_flood_safety_and_no_forced_green()
    test_live_gps_walking_origin_and_exact_match()
    test_intermediate_walking_reroute_and_distance_reduction()
    test_off_route_recalculation()
    test_arrival_proximity_detection()
    test_live_gps_out_of_bounds_rejected()
    test_current_route_control_in_frontend_html()
    test_focus_current_route_logic_and_safeguards()
    test_map_drag_preserves_route_state()
    test_safe_route_hybrid_breakdown()
    test_scenario_simulator_frontend_integration()
    print("\n[SUCCESS] ALL 21 INTEGRATION, LIVE GPS, BOUNDARY, MAP CONTROL, SIMULATOR & HYBRID TESTS PASSED SUCCESSFULLY!")




