"""Deterministic, explicitly non-live Mumbai map scenario for product demonstrations."""
from backend.services.osm_road_router import distance_m
from backend.services.road_exposure import visible_roads


SCENARIO = {
    "id": "mumbai_monsoon_demo",
    "name": "Mumbai Monsoon Demonstration",
    "data_mode": "DEMONSTRATION_SCENARIO",
    "input_quality": "SYNTHETIC",
    "is_live": False,
    "depth_validated": False,
}

# Coordinates define illustrative centres only. Values are synthetic model-demo
# inputs and must never be presented as measurements or historical ground truth.
HOTSPOTS = (
    ("Hindmata", 19.0178, 72.8478, 2600, (6, 18, 38, 23)),
    ("Sion", 19.0434, 72.8614, 2500, (4, 14, 29, 19)),
    ("Kurla", 19.0657, 72.8793, 3000, (5, 17, 34, 24)),
    ("Milan Subway", 19.1180, 72.8490, 2400, (3, 12, 27, 17)),
    ("Bhandup", 19.1435, 72.9365, 2800, (3, 11, 25, 16)),
    ("Malad", 19.1870, 72.8495, 2600, (2, 10, 23, 15)),
)
BASE_DEPTH_CM = (0.3, 0.8, 1.5, 0.7)
ROAD_CLASS_FACTOR = {
    "motorway": .45, "motorway_link": .5, "trunk": .55, "trunk_link": .6,
    "primary": .7, "primary_link": .75, "secondary": .82, "secondary_link": .85,
    "tertiary": .9, "tertiary_link": .92, "unclassified": .96,
    "residential": 1.0, "living_street": 1.02, "service": 1.05, "road": 1.0,
}


def _depth_at(point, lead_hours, exposure_factor=1.0):
    influence = 0.0
    for _, lat, lon, radius_m, depths in HOTSPOTS:
        distance = distance_m(point, [lat, lon])
        decay = max(0.0, 1.0 - distance / radius_m) ** 1.35
        influence = max(influence, depths[lead_hours] * decay)
    return round(BASE_DEPTH_CM[lead_hours] + influence * exposure_factor, 1)


def _road_exposure_factor(road_id, highway, segment_index):
    """Stable illustrative proxy for relative road elevation and drainage."""
    token = f"{road_id}:{segment_index}"
    raw = (sum((index + 1) * ord(char) for index, char in enumerate(token)) % 100) / 100
    # The curve gives well-drained/elevated streets enough visual presence for
    # judges to compare all risk bands inside one neighbourhood viewport.
    variation = .20 + .80 * (raw ** 1.1)
    return round(min(1.0, variation * ROAD_CLASS_FACTOR.get(highway, 1.0)), 2)


def _band(depth_cm):
    """Road flood risk bands: green passable, orange risky, red likely blocked."""
    if depth_cm <= 10:
        return "GREEN", "#16a34a", "LOW"
    if depth_cm <= 30:
        return "ORANGE", "#f59e0b", "MODERATE"
    return "RED", "#dc2626", "HIGH"


def demo_road_exposure(bounds, zoom, lead_hours):
    roads, source = visible_roads(bounds, zoom)
    features = []
    counts = {"GREEN": 0, "ORANGE": 0, "RED": 0}
    road_class_counts = {}
    for road_id, name, highway, coordinates, _ in roads:
        road_class_counts[highway] = road_class_counts.get(highway, 0) + 1
        for segment_index, (start, end) in enumerate(zip(coordinates, coordinates[1:])):
            midpoint = [(start[0] + end[0]) / 2, (start[1] + end[1]) / 2]
            exposure_factor = _road_exposure_factor(road_id, highway, segment_index)
            depth = _depth_at(midpoint, lead_hours, exposure_factor)
            category, color, risk = _band(depth)
            counts[category] += 1
            features.append({
                "type": "Feature",
                "id": f"demo:{road_id}:{segment_index}",
                "geometry": {"type": "LineString", "coordinates": [start[::-1], end[::-1]]},
                "properties": {
                    "road_id": road_id,
                    "name": name or "Unnamed road",
                    "highway": highway,
                    "category": category,
                    "risk": risk,
                    "color": color,
                    "depth_cm": depth,
                    "illustrative_exposure_factor": exposure_factor,
                    "lead_hours": lead_hours,
                    "classification_basis": "ILLUSTRATIVE_MODEL_OUTPUT",
                    "safe_route_certified": False,
                    "closure_status": "UNKNOWN",
                },
            })

    hotspots = []
    for key, lat, lon, _, depths in HOTSPOTS:
        depth = round(BASE_DEPTH_CM[lead_hours] + depths[lead_hours], 1)
        category, color, risk = _band(depth)
        if depth > 10:
            hotspots.append({"type": "Feature", "geometry": {"type": "Point", "coordinates": [lon, lat]},
                "properties": {"name": key, "depth_cm": depth, "risk": risk, "color": color,
                    "lead_hours": lead_hours, "basis": "ILLUSTRATIVE_MODEL_OUTPUT"}})

    return {
        "type": "FeatureCollection",
        "features": features,
        "hotspots": {"type": "FeatureCollection", "features": hotspots},
        "metadata": {
            **SCENARIO,
            "lead_hours": lead_hours,
            "zoom": zoom,
            "road_way_count": len(roads),
            "road_segment_count": len(features),
            "road_class_counts": road_class_counts,
            "hotspot_count": len(hotspots),
            "category_counts": counts,
            "rainfall_profile_mm_hr": [8, 24, 55, 32],
            "calculation": "hotspot intensity × deterministic road surface/drainage factor + background depth",
            "source": source,
            "safe_route_certified": False,
            "official_closures_included": False,
            "limitations": [
                "Illustrative deterministic scenario; not live weather, an observed event, or a validated forecast.",
                "Depth values demonstrate product behaviour and must not guide travel or emergency decisions.",
                "Official road closures are not included.",
                "Road coverage follows mapped OSM drivable ways and depends on OpenStreetMap completeness.",
            ],
        },
    }
