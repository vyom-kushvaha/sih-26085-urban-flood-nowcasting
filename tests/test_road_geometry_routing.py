from backend.routers import risk
import json
import pytest
from fastapi import HTTPException


def test_route_display_uses_full_osm_geometry_not_waypoint_chords(monkeypatch):
    road_shape = [
        [19.017801, 72.847801], [19.018104, 72.847222], [19.018641, 72.846910],
        [19.019153, 72.847302], [19.020008, 72.847117], [19.020600, 72.846500],
    ]

    monkeypatch.setattr(risk, 'fetch_osrm_routes', lambda *_: [{
        'id': 'osrm_route_1', 'name': 'OSM Primary Shortest Route',
        'coordinates': road_shape, 'geometry_source': 'OSRM_ROAD_NETWORK',
        'distance_km': 1.2, 'estimated_duration_min': 4,
    }])
    result = risk.calculate_flood_routes(
        origin='Hindmata', dest='Chhatrapati Shivaji Maharaj Park', rain=0,
    )
    route = result['routes'][0]
    assert route['geometry_source'] == 'OSRM_ROAD_NETWORK'
    assert route['coordinates'] == road_shape
    assert len(route['coordinates']) == len(road_shape)


def test_provider_keeps_bends_and_roundabout_steps(monkeypatch):
    shape = [[72.84, 19.01], [72.84001, 19.01002], [72.84002, 19.01]]
    class Response:
        def __enter__(self): return self
        def __exit__(self, *_): pass
        def read(self):
            return json.dumps({'code': 'Ok', 'routes': [{
                'geometry': {'coordinates': shape}, 'distance': 30, 'duration': 10,
                'legs': [{'steps': [{'name': 'Circle Road', 'distance': 20,
                    'maneuver': {'type': 'roundabout', 'exit': 2, 'location': shape[1]}}]}],
            }]}).encode()
    def open_request(req, **kwargs):
        assert 'overview=full' in req.full_url and 'steps=true' in req.full_url
        return Response()
    monkeypatch.setattr(risk, '_OSRM_CACHE', {})
    monkeypatch.setattr(risk.urllib.request, 'urlopen', open_request)
    result = risk.fetch_osrm_routes(19.01, 72.84, 19.02, 72.85)[0]
    assert result['coordinates'] == [[lat, lon] for lon, lat in shape]
    assert result['steps'][0]['exit'] == 2
    assert result['steps'][0]['location'] == [19.01002, 72.84001]


def test_no_road_provider_does_not_return_waypoint_fallback(monkeypatch):
    monkeypatch.setattr(risk, 'fetch_osrm_routes', lambda *_: [])
    monkeypatch.setattr(risk, 'local_osm_route', lambda *_: None)
    with pytest.raises(HTTPException) as error:
        risk.calculate_flood_routes(origin='Hindmata', dest='Kurla', rain=0)
    assert error.value.status_code == 503


def test_nearby_corridors_produce_three_distinct_road_options(monkeypatch):
    monkeypatch.setattr(risk, '_OSRM_CACHE', {})
    def provider(*args):
        via = args[4] if len(args) == 5 else None
        offset = 0 if via is None else (0.003 if via[0] > 19.01 else -0.003)
        return [{'coordinates': [[19,72], [19.01+offset,72.01], [19.02,72.02]],
                 'distance_km': 3 if via is None else 4, 'estimated_duration_min': 10,
                 'geometry_source': 'OSRM_ROAD_NETWORK', 'steps': []}]
    monkeypatch.setattr(risk, '_query_osrm_routes', provider)
    routes = risk.fetch_osrm_routes(19,72,19.02,72.02)
    assert len(routes) == 3
    assert len({r['id'] for r in routes}) == 3
    assert routes[0]['distance_km'] == 3


def test_duplicate_and_excessive_detours_do_not_pad_the_options(monkeypatch):
    monkeypatch.setattr(risk, '_OSRM_CACHE', {})
    base = {'coordinates': [[19,72],[19.01,72.01],[19.02,72.02]],
            'distance_km': 3, 'estimated_duration_min': 10, 'steps': []}
    def provider(*args):
        return [dict(base), dict(base, distance_km=99, coordinates=[[19,72],[20,73],[19.02,72.02]])] if len(args)==5 else [base,dict(base)]
    monkeypatch.setattr(risk, '_query_osrm_routes', provider)
    assert len(risk.fetch_osrm_routes(19,72,19.02,72.02)) == 1


def test_required_uturn_does_not_hide_valid_alternatives(monkeypatch):
    monkeypatch.setattr(risk, '_OSRM_CACHE', {})
    def provider(*args):
        via = args[4] if len(args) == 5 else None
        offset = 0 if via is None else (.003 if via[0] > 19.01 else -.003)
        return [{'coordinates': [[19,72],[19.01+offset,72.01],[19.02,72.02]],
                 'distance_km': 3 if via is None else 4, 'estimated_duration_min': 10,
                 'steps': [{'modifier': 'uturn', 'road_name': 'Divided road'}]}]
    monkeypatch.setattr(risk, '_query_osrm_routes', provider)
    assert len(risk.fetch_osrm_routes(19,72,19.02,72.02)) == 3
