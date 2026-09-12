"""Deterministic doubles for the external road-routing provider.

Production never falls back to these coordinates: it requires OSRM geometry.
The suite cannot open public sockets, so routing integration tests replace the
provider boundary and exercise the application response deterministically.
"""
import pytest


def _road_provider(origin_lat, origin_lon, destination_lat, destination_lon):
    mid_lat = (origin_lat + destination_lat) / 2
    mid_lon = (origin_lon + destination_lon) / 2
    alternatives = []
    for index, offset in enumerate((-0.0012, 0.0, 0.0012), start=1):
        coordinates = [
            [origin_lat, origin_lon],
            [origin_lat * .75 + mid_lat * .25, origin_lon * .75 + mid_lon * .25 + offset],
            [mid_lat, mid_lon + offset],
            [origin_lat * .25 + destination_lat * .75, origin_lon * .25 + destination_lon * .75 + offset],
            [destination_lat, destination_lon],
        ]
        alternatives.append({
            'id': f'osrm_route_{index}',
            'name': 'OSM Primary Shortest Route' if index == 1 else f'OSM Alternate Corridor {index}',
            'coordinates': coordinates,
            'geometry_source': 'OSRM_ROAD_NETWORK',
            'distance_km': 1.0 + index / 10,
            'estimated_duration_min': 3 + index,
        })
    return alternatives


@pytest.fixture(autouse=True)
def mocked_road_provider(monkeypatch, request):
    modules = ('test_safe_routing', 'test_frontend_integration', 'test_historical_scenarios')
    if any(name in request.node.nodeid for name in modules):
        from backend.routers import risk
        monkeypatch.setattr(risk, 'fetch_osrm_routes', _road_provider)
