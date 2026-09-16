from fastapi.testclient import TestClient

from backend.main import app
from backend.services import demo_road_scenario as demo


BOUNDS = {"south": 18.89, "west": 72.77, "north": 19.30, "east": 72.99}


def network(*_):
    return ([
        ("near", "Hindmata Road", "primary", [[19.0177, 72.8477], [19.0179, 72.8479]], 30),
        ("far", "North Edge Road", "primary", [[19.2900, 72.9700], [19.2910, 72.9710]], 150),
    ], {"source": "test roads"})


def test_demo_depth_changes_with_time_and_has_multiple_bands(monkeypatch):
    monkeypatch.setattr(demo, "visible_roads", network)
    now = demo.demo_road_exposure(BOUNDS, 11, 0)
    peak = demo.demo_road_exposure(BOUNDS, 11, 2)
    assert now["metadata"]["is_live"] is False
    assert now["metadata"]["depth_validated"] is False
    assert now["metadata"]["input_quality"] == "SYNTHETIC"
    assert peak["features"][0]["properties"]["depth_cm"] > now["features"][0]["properties"]["depth_cm"]
    assert len({f["properties"]["category"] for f in peak["features"]}) >= 2
    assert all(0 < f["properties"]["illustrative_exposure_factor"] <= 1 for f in peak["features"])
    assert all(f["properties"]["safe_route_certified"] is False for f in peak["features"])
    assert peak["hotspots"]["features"]
    assert "not live" in " ".join(peak["metadata"]["limitations"]).lower()


def test_demo_endpoint_and_validation(monkeypatch):
    monkeypatch.setattr(demo, "visible_roads", network)
    client = TestClient(app)
    response = client.get("/api/v1/roads/demo-exposure?west=72.77&south=18.89&east=72.99&north=19.30&zoom=11&lead_hours=2")
    assert response.status_code == 200
    assert response.json()["metadata"]["lead_hours"] == 2
    assert response.headers["cache-control"] == "public, max-age=300"
    assert client.get("/api/v1/roads/demo-exposure?west=72.77&south=18.89&east=72.99&north=19.30&lead_hours=4").status_code == 422


def test_frontend_exposes_honest_demo_switch():
    client = TestClient(app)
    html = client.get("/").text
    js = client.get("/static/road-exposure.js").text
    assert 'id="mode-demo"' in html
    assert 'id="mode-live"' in html
    assert "demoMode:true" in client.get("/static/platform.js").text
    assert "hour:0" in client.get("/static/platform.js").text
    assert "DEMO_MAP_ZOOM = 16" in client.get("/static/platform.js").text
    assert "/api/v1/roads/demo-exposure" in js
    assert "SIMULATED · NOT LIVE" in js
