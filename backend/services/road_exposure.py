"""Automatic visible-area screening over acquired Greater Mumbai drivable roads."""
import json
import math
from functools import lru_cache
from pathlib import Path

from backend.services.live_route_assessment import fetch_rainfall, weather_cell
from backend.services.osm_road_router import distance_m

ROOT = Path(__file__).resolve().parents[2]
ROADS_PATH = ROOT / "data/processed/mumbai_major_roads.json"
MUMBAI_BOUNDS = {"south": 18.89, "west": 72.77, "north": 19.30, "east": 72.99}
ROAD_LEVELS = {"motorway": 0, "motorway_link": 0, "trunk": 0, "trunk_link": 0,
    "primary": 1, "primary_link": 1, "secondary": 2, "secondary_link": 2,
    "tertiary": 3, "tertiary_link": 3, "unclassified": 4, "residential": 4,
    "living_street": 4, "service": 5, "road": 5}


@lru_cache(maxsize=1)
def road_ways():
    if not ROADS_PATH.is_file():
        return [], {}
    data = json.loads(ROADS_PATH.read_text(encoding="utf-8"))
    return data.get("ways", []), data.get("metadata", {})


def _intersects(coordinates, bounds):
    south, north = min(p[0] for p in coordinates), max(p[0] for p in coordinates)
    west, east = min(p[1] for p in coordinates), max(p[1] for p in coordinates)
    return not (north < bounds["south"] or south > bounds["north"] or
                east < bounds["west"] or west > bounds["east"])


def visible_roads(bounds, zoom):
    ways, metadata = road_ways()
    # Keep city-wide views readable and progressively reveal smaller streets.
    max_level = 1 if zoom <= 11 else 2 if zoom <= 13 else 3 if zoom == 14 else 4 if zoom == 15 else 5
    found = []
    for way in ways:
        coordinates = way.get("coordinates", [])
        if (len(coordinates) >= 2 and ROAD_LEVELS.get(way.get("highway"), 99) <= max_level
                and _intersects(coordinates, bounds)):
            length = sum(distance_m(a, b) for a, b in zip(coordinates, coordinates[1:]))
            found.append((str(way["id"]), way.get("name"), way.get("highway"), coordinates, length))
    return found, metadata


def _point_to_road_m(point, coordinates):
    lat, lon = point
    lat_scale, lon_scale = 111_320.0, 111_320.0 * math.cos(math.radians(lat))
    best = float("inf")
    for a, b in zip(coordinates, coordinates[1:]):
        ax, ay = (a[1] - lon) * lon_scale, (a[0] - lat) * lat_scale
        bx, by = (b[1] - lon) * lon_scale, (b[0] - lat) * lat_scale
        dx, dy = bx - ax, by - ay
        t = max(0.0, min(1.0, -(ax * dx + ay * dy) / (dx * dx + dy * dy))) if dx or dy else 0.0
        best = min(best, math.hypot(ax + t * dx, ay + t * dy))
    return best


def road_exposure(bounds, zoom, engine, force_refresh=False, verified_observations=()):
    roads, source = visible_roads(bounds, zoom)
    midpoint = lambda coords: coords[len(coords) // 2]
    cells = sorted({weather_cell(midpoint(coords)) for _, _, _, coords, _ in roads})
    weather = fetch_rainfall(cells, force_refresh)
    features, weather_length, model_length, observed_length = [], 0.0, 0.0, 0.0
    counts = {"BLUE": 0, "GREEN": 0, "ORANGE": 0, "RED": 0, "GREY": 0}
    for road_id, name, highway, coordinates, length in roads:
        point = midpoint(coordinates)
        record = weather.get(weather_cell(point))
        rain = record["rainfall_mm_hr"] if record else None
        depth_range, basis = None, "UNAVAILABLE"
        nearby = [(obs, _point_to_road_m((obs["lat"], obs["lon"]), coordinates))
                  for obs in verified_observations]
        nearby = [item for item in nearby if item[1] <= 120]
        observation = min(nearby, key=lambda item: item[1])[0] if nearby else None
        if rain is not None:
            weather_length += length
            baseline = engine.calculate_risk(lat=point[0], lon=point[1], rainfall_mm_hr=rain,
                         blockage_pct=0, duration_hours=1.0)
            estimates = [baseline]
            if baseline.get("prediction_valid") and baseline.get("hydrology_metrics", {}).get("dem_status") == "VALIDATED_HIGH_RES_DTM":
                estimates.append(engine.calculate_risk(lat=point[0], lon=point[1], rainfall_mm_hr=rain,
                                 blockage_pct=100, duration_hours=1.0))
            if len(estimates) == 2 and all(item.get("prediction_valid") and item.get("hydrology_metrics", {}).get("dem_status") == "VALIDATED_HIGH_RES_DTM" for item in estimates):
                depth_range = [item["water_depth_cm"] for item in estimates]
                model_length += length
                basis = "MODELLED_DEPTH_SENSITIVITY"
        if observation is not None:
            observed_depth = observation["water_depth_cm"]
            observed_length += length
            category, color = (("GREEN", "#16a34a") if observed_depth < 5 else
                               (("ORANGE", "#f59e0b") if observed_depth <= 15 else ("RED", "#dc2626")))
            basis = "VERIFIED_CITIZEN_OBSERVATION"
        elif depth_range is not None:
            upper = depth_range[1]
            category, color = ("GREEN", "#16a34a") if upper < 5 else (("ORANGE", "#f59e0b") if upper <= 15 else ("RED", "#dc2626"))
        elif rain is not None:
            category, color = ("BLUE", "#2563eb") if rain < 5 else (("ORANGE", "#f59e0b") if rain <= 20 else ("RED", "#dc2626"))
            basis = "LIVE_RAINFALL_SCREENING"
        else:
            category, color = "GREY", "#64748b"
        counts[category] += 1
        features.append({"type": "Feature", "id": road_id,
            "geometry": {"type": "LineString", "coordinates": [[p[1], p[0]] for p in coordinates]},
            "properties": {"name": name or "Unnamed road", "highway": highway,
                "category": category, "color": color, "classification_basis": basis,
                "rainfall_mm_hr": round(rain, 2) if rain is not None else None,
                "estimated_1h_depth_range_cm": depth_range,
                "observed_water_depth_cm": observation["water_depth_cm"] if observation else None,
                "observation_time": observation["observed_at"] if observation else None,
                "observation_report_id": observation["report_id"] if observation else None,
                "weather_valid_time": record["valid_time"] if record else None,
                "weather_source": record.get("source") if record else None,
                "length_m": round(length, 1), "safe_route_certified": False}})
    total_length = sum(item[4] for item in roads)
    pct = lambda value: round(value / total_length * 100, 1) if total_length else 0.0
    return {"type": "FeatureCollection", "features": features,
        "metadata": {"coverage": "GREATER_MUMBAI_DRIVABLE_OSM", "coverage_bounds": MUMBAI_BOUNDS,
            "source": source.get("source"), "source_acquired_at": source.get("acquired_at"),
            "requested_bounds": bounds, "zoom": zoom, "road_count": len(features), "category_counts": counts,
            "weather_coverage_pct": pct(weather_length), "terrain_model_coverage_pct": pct(model_length),
            "weather_sources": sorted({item["source"] for item in weather.values() if item.get("source")}),
            "verified_observation_coverage_pct": pct(observed_length),
            "verified_observation_road_count": sum(1 for feature in features if feature["properties"]["classification_basis"] == "VERIFIED_CITIZEN_OBSERVATION"),
            "safe_route_certified": False,
            "blue_meaning": "Low live rainfall signal; flood safety unverified",
            "green_meaning": "Low modelled depth only when validated inputs cover the segment",
            "limitations": ["Coverage follows mapped OSM drivable ways and depends on OpenStreetMap completeness.",
                "Verified citizen depth reports affect roads within 120 metres for three hours.",
                "Red/orange/blue are screening signals, not official closures or safety certificates."]}}
