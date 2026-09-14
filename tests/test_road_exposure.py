from unittest.mock import Mock

from fastapi.testclient import TestClient

from backend.main import app
from backend.services import road_exposure as roads


def network():
    return ([{"id": 1, "name": "Primary Road", "highway": "primary", "coordinates": [[19.01, 72.84], [19.011, 72.841]]},
             {"id": 2, "name": "Tertiary Road", "highway": "tertiary", "coordinates": [[19.011, 72.841], [19.012, 72.842]]}],
            {"source": "test"})


def test_visible_roads_are_clipped_and_zoom_filtered(monkeypatch):
    monkeypatch.setattr(roads, "road_ways", network)
    result, _ = roads.visible_roads({"south": 19, "west": 72.83, "north": 19.02, "east": 72.85}, 11)
    assert len(result) == 1
    result, _ = roads.visible_roads({"south": 19, "west": 72.83, "north": 19.02, "east": 72.85}, 15)
    assert len(result) == 2


def test_local_roads_are_progressively_revealed(monkeypatch):
    def full_network():
        coordinates = [[19.01, 72.84], [19.011, 72.841]]
        return ([
            {"id": 1, "name": "Primary", "highway": "primary", "coordinates": coordinates},
            {"id": 2, "name": "Residential", "highway": "residential", "coordinates": coordinates},
            {"id": 3, "name": "Service", "highway": "service", "coordinates": coordinates},
        ], {"source": "test"})

    monkeypatch.setattr(roads, "road_ways", full_network)
    bounds = {"south": 19, "west": 72.83, "north": 19.02, "east": 72.85}
    assert [item[2] for item in roads.visible_roads(bounds, 14)[0]] == ["primary"]
    assert [item[2] for item in roads.visible_roads(bounds, 15)[0]] == ["primary", "residential"]
    assert [item[2] for item in roads.visible_roads(bounds, 16)[0]] == ["primary", "residential", "service"]


def test_road_screening_falls_back_to_blue_rainfall(monkeypatch):
    monkeypatch.setattr(roads, "road_ways", network)
    monkeypatch.setattr(roads, "fetch_rainfall", lambda cells, refresh: {
        cell: {"rainfall_mm_hr": 2, "valid_time": "2026-09-13T04:00:00+00:00"} for cell in cells})
    engine = Mock()
    engine.calculate_risk.return_value = {"prediction_valid": False}
    result = roads.road_exposure({"south": 19, "west": 72.83, "north": 19.02, "east": 72.85}, 15, engine)
    assert len(result["features"]) == 2
    assert all(f["properties"]["category"] == "BLUE" for f in result["features"])
    assert result["metadata"]["weather_coverage_pct"] == 100
    assert result["metadata"]["terrain_model_coverage_pct"] == 0
    assert result["metadata"]["safe_route_certified"] is False


def test_valid_depth_uses_green_or_red_but_never_certifies(monkeypatch):
    monkeypatch.setattr(roads, "road_ways", network)
    monkeypatch.setattr(roads, "fetch_rainfall", lambda cells, refresh: {
        cell: {"rainfall_mm_hr": 10, "valid_time": "2026-09-13T04:00:00+00:00"} for cell in cells})
    engine = Mock()
    engine.calculate_risk.side_effect = lambda blockage_pct, **kw: {
        "prediction_valid": True, "hydrology_metrics": {"dem_status": "VALIDATED_HIGH_RES_DTM"},
        "water_depth_cm": 2 if blockage_pct == 0 else 20}
    result = roads.road_exposure({"south": 19, "west": 72.83, "north": 19.02, "east": 72.85}, 15, engine)
    assert all(f["properties"]["category"] == "RED" for f in result["features"])
    assert all(f["properties"]["safe_route_certified"] is False for f in result["features"])


def test_fresh_verified_observation_overrides_rainfall_screening(monkeypatch):
    monkeypatch.setattr(roads, "road_ways", network)
    monkeypatch.setattr(roads, "fetch_rainfall", lambda cells, refresh: {
        cell: {"rainfall_mm_hr": 1, "valid_time": "2026-09-13T04:00:00+00:00"} for cell in cells})
    engine = Mock()
    engine.calculate_risk.return_value = {"prediction_valid": False}
    observation = {"report_id": "verified-1", "lat": 19.0105, "lon": 72.8405,
                   "water_depth_cm": 22, "observed_at": "2026-09-13T04:00:00+00:00"}
    result = roads.road_exposure({"south": 19, "west": 72.83, "north": 19.02, "east": 72.85},
                                 11, engine, verified_observations=[observation])
    feature = result["features"][0]
    assert feature["properties"]["category"] == "RED"
    assert feature["properties"]["classification_basis"] == "VERIFIED_CITIZEN_OBSERVATION"
    assert feature["properties"]["observed_water_depth_cm"] == 22
    assert result["metadata"]["verified_observation_road_count"] == 1


def test_endpoint_rejects_area_larger_than_mumbai():
    client = TestClient(app)
    response = client.get("/api/v1/roads/exposure?west=72.70&south=18.80&east=73.10&north=19.40")
    assert response.status_code == 422
