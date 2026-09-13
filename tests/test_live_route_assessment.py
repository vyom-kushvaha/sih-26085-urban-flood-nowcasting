from datetime import datetime, timedelta, timezone
from unittest.mock import Mock

import pytest
from backend.services import live_route_assessment as live


def test_interval_conversion_and_stale_rejection(monkeypatch):
    live._cache.clear()
    now = datetime.now(timezone.utc)
    def row(stamp, amount=2):
        return {"current": {"time": stamp.isoformat(), "interval": 900, "precipitation": amount}, "current_units": {"precipitation": "mm"}}
    response = Mock()
    response.json.return_value = [row(now), row(now - timedelta(hours=2))]
    monkeypatch.setattr(live.requests, "get", lambda *a, **kw: response)
    result = live.fetch_rainfall([(19, 72), (19.1, 72.1)], True)
    assert result[(19, 72)]["rainfall_mm_hr"] == 8
    assert (19.1, 72.1) not in result


def test_met_norway_forecast_is_bounded_live_fallback(monkeypatch):
    live._cache.clear()
    now = datetime.now(timezone.utc)
    response = Mock()
    response.json.return_value = {"properties": {"meta": {
        "updated_at": now.isoformat(), "units": {"precipitation_amount": "mm"}},
        "timeseries": [{"time": now.isoformat(), "data": {"next_1_hours": {
            "details": {"precipitation_amount": 3.5}}}}]}}
    calls = []
    def get(url, **kwargs):
        calls.append(url)
        if "open-meteo" in url:
            raise live.requests.RequestException("primary unavailable")
        return response
    monkeypatch.setattr(live.requests, "get", get)
    result = live.fetch_rainfall([(19.00, 72.80), (19.02, 72.82)], True)
    assert len(result) == 2
    assert all(item["rainfall_mm_hr"] == 3.5 for item in result.values())
    assert all(item["source"].startswith("MET Norway") for item in result.values())
    assert calls.count(live.MET_NORWAY_URL) == 1


def test_sampling_covers_long_edges_without_chords():
    segments = live.sample_segments([[19, 72], [19.01, 72], [19.01, 72.01]])
    assert len(segments) > 20
    assert max(s["length_m"] for s in segments) <= 100
    assert segments[0]["coordinates"][0] == [19, 72]
    assert segments[-1]["coordinates"][-1] == [19.01, 72.01]


def test_live_ranking_and_missing_data_fail_closed(monkeypatch):
    def weather(cells, refresh):
        return {cell: {"rainfall_mm_hr": 30 if cell[0] > 19.01 else 1, "valid_time": datetime.now(timezone.utc).isoformat()} for cell in cells}
    monkeypatch.setattr(live, "fetch_rainfall", weather)
    engine = Mock()
    engine.calculate_risk.return_value = {"prediction_valid": False}
    routes = [{"id": str(i), "name": "Road", "coordinates": [[lat, 72.84], [lat, 72.85]], "distance_km": 1, "estimated_duration_min": 3, "geometry_source": "OSRM_ROAD_NETWORK"} for i, lat in enumerate([19, 19.04])]
    place = {"name": "Test", "lat": 19, "lon": 72.84}
    result = live.assess_routes(routes, engine, place, place)
    assert result["lowest_rainfall_route_id"] == "0"
    assert result["safe_route_available"] is False
    assert result["prediction_valid"] is False
    assert result["routes"][1]["screening_label"] == "Higher rainfall exposure"
    assert engine.calculate_risk.call_count == result["calculation"]["sample_count"] * 2
    monkeypatch.setattr(live, "fetch_rainfall", lambda *a: {})
    result = live.assess_routes(routes, engine, place, place)
    assert result["lowest_rainfall_route_id"] is None
    assert all(r["rainfall_exposure_index"] is None for r in result["routes"])


def test_equal_dry_weather_does_not_invent_safest(monkeypatch):
    monkeypatch.setattr(live, "fetch_rainfall", lambda cells, refresh: {c: {"rainfall_mm_hr": 0, "valid_time": "now"} for c in cells})
    engine = Mock()
    engine.calculate_risk.return_value = {"prediction_valid": False}
    candidate = {"id": "one", "name": "Road", "coordinates": [[19, 72.84], [19, 72.85]], "distance_km": 1, "estimated_duration_min": 3}
    place = {"name": "Test", "lat": 19, "lon": 72.84}
    result = live.assess_routes([candidate, {**candidate, "id": "two"}], engine, place, place)
    assert result["lowest_rainfall_route_id"] is None
    assert all(r["screening_label"] == "Similar rainfall exposure" for r in result["routes"])


def test_valid_model_ranks_by_depth_and_returns_sensitivity(monkeypatch):
    monkeypatch.setattr(live, "fetch_rainfall", lambda cells, refresh: {c: {"rainfall_mm_hr": 10, "valid_time": "now"} for c in cells})
    engine = Mock()
    def estimate(lat, **kwargs):
        upper = 20 if lat > 19.02 and kwargs["blockage_pct"] == 100 else 2
        return {"prediction_valid": True, "hydrology_metrics": {"dem_status": "VALIDATED_HIGH_RES_DTM"}, "water_depth_cm": upper}
    engine.calculate_risk.side_effect = estimate
    routes = [{"id": str(i), "coordinates": [[lat, 72.84], [lat, 72.85]], "distance_km": 1, "estimated_duration_min": 3} for i, lat in enumerate([19, 19.04])]
    place = {"name": "Test", "lat": 19, "lon": 72.84}
    result = live.assess_routes(routes, engine, place, place)
    assert result["comparison_basis"] == "modelled flood exposure"
    assert result["lowest_modelled_exposure_route_id"] == "0"
    assert result["routes"][1]["estimated_1h_depth_range_cm"] == [2, 20]
    assert result["routes"][1]["screening_label"] == "Higher modelled flood exposure"
