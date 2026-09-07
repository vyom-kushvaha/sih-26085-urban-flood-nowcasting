"""
Comprehensive Test Suite for Task 5 — Flood-Aware Safe Routing
Urban Flood Nowcasting System (SIH26085)
"""

import sys
import os
from typing import Dict, Any

# Add project root and flood-engine to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "flood-engine"))

from backend.routers.risk import calculate_flood_routes, router
from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)


def test_routing_monsoon_comparison():
    """
    Test 1: Under monsoon conditions (80 mm/hr), system evaluates multiple corridors
    and identifies the safest corridor vs shortest corridor.
    """
    print("\n--- Test 1: Monsoon 80 mm/hr Corridor Comparison ---")
    result = calculate_flood_routes(
        origin="Hindmata, Mumbai",
        dest="Kurla, Mumbai",
        rain=80.0,
        blockage_pct=25.0
    )

    assert "routes" in result
    assert len(result["routes"]) >= 2
    assert "route_comparison" in result
    comp = result["route_comparison"]
    assert comp["has_alternatives"] is True
    assert "risk_reduction_score" in comp
    assert "depth_reduction_cm" in comp
    assert "recommendation_summary" in comp

    # Safe route vs danger/normal route
    safe_route = result["safe_route"]
    assert safe_route is not None
    assert "risk_score" in safe_route
    assert "max_water_depth_cm" in safe_route
    assert "num_high_risk_sections" in safe_route
    assert "route_type" in safe_route
    assert "provenance_label" in safe_route

    print(f"Routes found: {len(result['routes'])}")
    print(f"Safest route: {safe_route['name']} (Score: {safe_route['risk_score']}, Max Depth: {safe_route['max_water_depth_cm']}cm)")
    print(f"Comparison: Risk reduction = {comp['risk_reduction_score']} pts, Depth reduction = {comp['depth_reduction_cm']} cm")
    print(f"Recommendation: {comp['recommendation_summary']}")
    assert safe_route["risk_score"] <= result["danger_route"]["risk_score"]


def test_routing_dry_conditions():
    """
    Test 2: Under dry conditions (0 mm/hr), flood risk is minimal and shortest route is preferred.
    """
    print("\n--- Test 2: Dry Conditions (0 mm/hr) ---")
    result = calculate_flood_routes(
        origin="Hindmata, Mumbai",
        dest="Kurla, Mumbai",
        rain=0.0,
        blockage_pct=0.0
    )

    safe_route = result["safe_route"]
    assert safe_route is not None
    assert safe_route["max_water_depth_cm"] == 0.0
    assert safe_route["risk_score"] <= 30.0  # Safe range
    assert safe_route["num_high_risk_sections"] == 0
    print(f"Dry safe route risk: {safe_route['risk_score']}, depth: {safe_route['max_water_depth_cm']} cm")


def test_routing_blockage_sensitivity():
    """
    Test 3: Increasing drainage blockage percentage increases flood depth and risk
    along the evaluated corridors.
    """
    print("\n--- Test 3: Drainage Blockage Sensitivity ---")
    res_clean = calculate_flood_routes(
        origin="Hindmata, Mumbai",
        dest="Kurla, Mumbai",
        rain=70.0,
        blockage_pct=0.0
    )
    res_blocked = calculate_flood_routes(
        origin="Hindmata, Mumbai",
        dest="Kurla, Mumbai",
        rain=70.0,
        blockage_pct=75.0
    )

    # Compare the same corridor across blockage levels
    clean_depths = [r["max_water_depth_cm"] for r in res_clean["routes"]]
    blocked_depths = [r["max_water_depth_cm"] for r in res_blocked["routes"]]

    print(f"Max depths (0% blockage): {clean_depths}")
    print(f"Max depths (75% blockage): {blocked_depths}")

    assert max(blocked_depths) >= max(clean_depths)
    # Average risk score should increase with blockage
    clean_avg_risk = sum(r["risk_score"] for r in res_clean["routes"]) / len(res_clean["routes"])
    blocked_avg_risk = sum(r["risk_score"] for r in res_blocked["routes"]) / len(res_blocked["routes"])
    print(f"Avg risk score: Clean={clean_avg_risk:.1f}, Blocked={blocked_avg_risk:.1f}")
    assert blocked_avg_risk >= clean_avg_risk


def test_single_route_handling():
    """
    Test 4: When origin and destination are identical or have only 1 route,
    system does NOT fabricate fake alternative corridors.
    """
    print("\n--- Test 4: Single / Direct Route Handling (No Fake Alternatives) ---")
    result = calculate_flood_routes(
        origin="Hindmata, Mumbai",
        dest="Hindmata, Mumbai",
        o_lat=19.0180,
        o_lon=72.8440,
        d_lat=19.0180,
        d_lon=72.8440,
        rain=40.0
    )

    assert "route_comparison" in result
    assert result["route_comparison"]["has_alternatives"] is False
    assert len(result["routes"]) == 1
    assert result["routes"][0]["route_type"] == "single_available"
    print(f"Single corridor correctly handled: {result['routes'][0]['name']}")
    print(f"Advisory: {result['route_comparison']['recommendation_summary']}")


def test_high_risk_sections_and_locations():
    """
    Test 5: System extracts and reports num_high_risk_sections and major_risk_locations.
    """
    print("\n--- Test 5: High-Risk Sections & Pinpoint Locations ---")
    result = calculate_flood_routes(
        origin="Hindmata, Mumbai",
        dest="Kurla, Mumbai",
        rain=100.0,
        blockage_pct=50.0
    )

    for route in result["routes"]:
        assert "num_high_risk_sections" in route
        assert "major_risk_locations" in route
        assert isinstance(route["major_risk_locations"], list)
        print(f"Corridor '{route['name']}': {route['num_high_risk_sections']} high-risk points, {len(route['major_risk_locations'])} locations logged")


def test_provenance_disclosure():
    """
    Test 6: Provenance labels declare HYDROLENS modelled risk from Copernicus DEM and OSM drainage,
    with no fabricated road sensor claims.
    """
    print("\n--- Test 6: Provenance and Scientific Integrity ---")
    result = calculate_flood_routes(
        origin="Hindmata, Mumbai",
        dest="Kurla, Mumbai",
        rain=50.0
    )

    assert "provenance_label" in result
    assert "Copernicus DEM" in result["provenance_label"] or "HYDROLENS" in result["provenance_label"]
    assert "provenance_disclosure" in result["query"]

    for cand in result["routes"]:
        assert "provenance_label" in cand
        print(f"Corridor provenance: {cand['provenance_label']}")


def test_backward_compatibility():
    """
    Test 7: Top-level keys required by previous versions and frontend remain intact.
    """
    print("\n--- Test 7: Backward Compatibility Schema Check ---")
    result = calculate_flood_routes(
        origin="Hindmata, Mumbai",
        dest="Kurla, Mumbai",
        rain=50.0
    )

    required_keys = ["safe_route", "danger_route", "routes", "recommended_route_id", "safe_route_available", "query"]
    for k in required_keys:
        assert k in result, f"Missing required key: {k}"

    cand = result["routes"][0]
    cand_keys = ["id", "name", "distance_km", "estimated_duration_min", "max_water_depth_cm", "risk_score", "risk_level", "risk_category", "color", "coordinates"]
    for ck in cand_keys:
        assert ck in cand, f"Missing candidate route key: {ck}"
    print("Backward compatibility schema check: ALL KEYS PRESENT")


def test_api_endpoints():
    """
    Test 8: Both GET and POST endpoints for /api/v1/routing/safe-route and /api/v1/risk/safe-route work.
    """
    print("\n--- Test 8: API Endpoints (GET and POST) ---")
    
    # GET /api/v1/routing/safe-route
    res_get_routing = client.get("/api/v1/routing/safe-route?origin=Hindmata&destination=Kurla&rainfall_mm_hr=45.0")
    assert res_get_routing.status_code == 200, f"GET /routing/safe-route failed: {res_get_routing.text}"
    data_get = res_get_routing.json()
    assert "routes" in data_get
    assert "route_comparison" in data_get

    # GET /api/v1/risk/safe-route (alias)
    res_get_risk = client.get("/api/v1/risk/safe-route?origin=Hindmata&destination=Kurla&rainfall_mm_hr=45.0")
    assert res_get_risk.status_code == 200, f"GET /risk/safe-route failed: {res_get_risk.text}"
    assert "routes" in res_get_risk.json()

    # POST /api/v1/routing/safe-route
    res_post_routing = client.post(
        "/api/v1/routing/safe-route",
        json={"origin": "Hindmata", "destination": "Kurla", "rainfall_mm_hr": 45.0, "blockage_pct": 20.0}
    )
    assert res_post_routing.status_code == 200, f"POST /routing/safe-route failed: {res_post_routing.text}"
    data_post = res_post_routing.json()
    assert data_post["query"]["rainfall_mm_hr"] == 45.0

    # POST /api/v1/risk/safe-route (alias)
    res_post_risk = client.post(
        "/api/v1/risk/safe-route",
        json={"origin": "Hindmata", "destination": "Kurla", "rainfall_mm_hr": 45.0}
    )
    assert res_post_risk.status_code == 200, f"POST /risk/safe-route failed: {res_post_risk.text}"
    print("API Endpoints verified: GET/POST /routing/safe-route & /risk/safe-route all return 200 OK")


if __name__ == "__main__":
    test_routing_monsoon_comparison()
    test_routing_dry_conditions()
    test_routing_blockage_sensitivity()
    test_single_route_handling()
    test_high_risk_sections_and_locations()
    test_provenance_disclosure()
    test_backward_compatibility()
    test_api_endpoints()
    print("\n=======================================================")
    print("ALL TASK 5 SAFE ROUTING TESTS COMPLETED SUCCESSFULLY! [PASS]")
    print("=======================================================")
