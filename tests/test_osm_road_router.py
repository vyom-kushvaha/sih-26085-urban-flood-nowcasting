from backend.services.osm_road_router import route
from backend.services import osm_road_router as router
import json
import pytest


@pytest.fixture
def road_graph(tmp_path, monkeypatch):
    def build(ways):
        path = tmp_path / 'roads.json'
        nodes = [{'type': 'node', 'id': i, 'lat': 19, 'lon': 72 + i / 10000} for i in range(1, 5)]
        path.write_text(json.dumps({'elements': nodes + ways}))
        monkeypatch.setattr(router, 'OSM_PILOT', path)
        router.graph.cache_clear()
        return router.graph()
    yield build
    router.graph.cache_clear()


def test_waterways_and_inaccessible_roads_are_not_driving_edges(road_graph):
    _, adjacent = road_graph([
        {'type': 'way', 'nodes': [1, 2], 'tags': {'waterway': 'stream'}},
        {'type': 'way', 'nodes': [2, 3], 'tags': {'highway': 'service', 'access': 'private'}},
        {'type': 'way', 'nodes': [3, 4], 'tags': {'highway': 'residential'}},
    ])
    assert adjacent[1] == adjacent[2] == []
    assert adjacent[3][0][0] == 4


def test_missing_nodes_do_not_create_straight_shortcuts(road_graph):
    _, adjacent = road_graph([{'type': 'way', 'nodes': [1, 999, 3, 4], 'tags': {'highway': 'residential'}}])
    assert adjacent[1] == []
    assert [n for n, _ in adjacent[3]] == [4]


def test_reverse_oneway_and_roundabout_direction(road_graph):
    nodes, adjacent = road_graph([
        {'type': 'way', 'nodes': [1, 2], 'tags': {'highway': 'residential', 'oneway': '-1'}},
        {'type': 'way', 'nodes': [2, 3, 4, 2], 'tags': {'highway': 'residential', 'junction': 'roundabout'}},
    ])
    assert adjacent[1] == []
    assert {n for n, _ in adjacent[2]} == {1, 3}
    assert [n for n, _ in adjacent[3]] == [4]
    assert router.nearest(nodes, adjacent, nodes[1]) == 1


def test_downloaded_osm_pilot_yields_a_connected_road_only_route():
    result = route(19.0178, 72.8478, 19.0182, 72.8436)
    assert result['geometry_source'] == 'LOCAL_OSM_ROAD_NETWORK'
    assert len(result['coordinates']) > 2
    assert result['distance_km'] > 0
