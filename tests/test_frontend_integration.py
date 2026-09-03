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
    """Test 1: GET / should return HTTP 200 OK with R.A.K.S.H.A.K. HTML UI content."""
    response = client.get("/")
    assert response.status_code == 200
    assert "text/html" in response.headers["content-type"]
    assert "R.A.K.S.H.A.K." in response.text
    assert "SIH 2026 Prototype" in response.text
    print("  [PASS] Test 1: GET / Serves R.A.K.S.H.A.K. Frontend index.html")


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



if __name__ == "__main__":
    print("=== RUNNING FRONTEND INTEGRATION & FASTAPI TESTCLIENT TESTS ===")
    test_root_serves_frontend_index_html()
    test_drainage_geojson_endpoint()
    test_explainable_risk_endpoint_get()
    test_weather_current_endpoint()
    print("\n[SUCCESS] ALL FRONTEND INTEGRATION TESTS PASSED SUCCESSFULLY!")
