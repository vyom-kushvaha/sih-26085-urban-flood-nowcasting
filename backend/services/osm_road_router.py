"""Small, offline driving router over the downloaded OSM pilot road graph."""
import heapq
import json
import math
from functools import lru_cache
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
OSM_PILOT = ROOT / 'data/raw/pilot_downloads/20260911T180659313239Z_osm/osm_roads_waterways.json'
NON_DRIVING = {'footway', 'path', 'steps', 'pedestrian', 'cycleway', 'bridleway'}


def distance_m(a, b):
    lat1, lon1 = a
    lat2, lon2 = b
    lat_scale = 111_320
    lon_scale = lat_scale * math.cos(math.radians((lat1 + lat2) / 2))
    return math.hypot((lat2 - lat1) * lat_scale, (lon2 - lon1) * lon_scale)


@lru_cache(maxsize=1)
def graph():
    if not OSM_PILOT.is_file():
        return {}, {}
    elements = json.loads(OSM_PILOT.read_text(encoding='utf-8'))['elements']
    nodes = {item['id']: (item['lat'], item['lon']) for item in elements if item['type'] == 'node'}
    adjacent = {node_id: [] for node_id in nodes}
    for way in (item for item in elements if item['type'] == 'way'):
        tags = way.get('tags', {})
        if not tags.get('highway') or tags.get('highway') in NON_DRIVING | {'construction', 'proposed'}:
            continue
        access = tags.get('motorcar', tags.get('motor_vehicle', tags.get('vehicle', tags.get('access'))))
        if access in {'no', 'private'}:
            continue
        ids = way.get('nodes', [])
        oneway = str(tags.get('oneway', 'yes' if tags.get('junction') == 'roundabout' or tags.get('highway') == 'motorway' else 'no')).lower()
        for start, end in zip(ids, ids[1:]):
            # A missing node breaks the road; never bridge the gap with a chord.
            if start not in nodes or end not in nodes:
                continue
            cost = distance_m(nodes[start], nodes[end])
            if oneway != '-1':
                adjacent[start].append((end, cost))
            if oneway not in {'yes', '1', 'true'}:
                adjacent[end].append((start, cost))
    return nodes, adjacent


def nearest(nodes, adjacent, point, maximum_m=250):
    # The raw Overpass extract also includes waterway-only nodes.  Snap only to
    # a node belonging to a drivable edge, never to an isolated map feature.
    connected = {node_id for node_id, edges in adjacent.items() if edges}
    connected.update(end for edges in adjacent.values() for end, _ in edges)
    closest = min(connected,
                  key=lambda node_id: distance_m(point, nodes[node_id]), default=None)
    return closest if closest is not None and distance_m(point, nodes[closest]) <= maximum_m else None


def route(origin_lat, origin_lon, destination_lat, destination_lon):
    nodes, adjacent = graph()
    if not nodes:
        return None
    start = nearest(nodes, adjacent, (origin_lat, origin_lon))
    goal = nearest(nodes, adjacent, (destination_lat, destination_lon))
    if start is None or goal is None or start == goal:
        return None
    queue = [(0, start)]
    cost = {start: 0}
    parent = {}
    while queue:
        current_cost, current = heapq.heappop(queue)
        if current == goal:
            break
        if current_cost != cost[current]:
            continue
        for next_node, edge_cost in adjacent.get(current, []):
            next_cost = current_cost + edge_cost
            if next_cost < cost.get(next_node, math.inf):
                cost[next_node] = next_cost
                parent[next_node] = current
                heapq.heappush(queue, (next_cost, next_node))
    if goal not in cost:
        return None
    path = [goal]
    while path[-1] != start:
        path.append(parent[path[-1]])
    path.reverse()
    coordinates = [[round(nodes[node_id][0], 6), round(nodes[node_id][1], 6)] for node_id in path]
    return {
        'id': 'local_osm_pilot_route', 'name': 'Local OSM Road Route',
        'coordinates': coordinates, 'geometry_source': 'LOCAL_OSM_ROAD_NETWORK',
        'distance_km': round(cost[goal] / 1000, 2),
        'estimated_duration_min': max(1, round(cost[goal] / 1000 / 25 * 60)),
    }
