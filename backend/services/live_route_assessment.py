"""Live rainfall exposure screening along actual road geometry.

This is a comparative estimate, never an operational road-passability claim.
"""
import math
import time
from datetime import datetime, timezone
from threading import Lock

import requests

from backend.services.osm_road_router import distance_m

_cache = {}
_lock = Lock()
SPACING_M = 100
MAX_SAMPLES = 2400


def weather_cell(point):
    return tuple(round(value / .02) * .02 for value in point)


def fetch_rainfall(cells, force_refresh=False):
    """Batch ~2 km query cells; preserve actual provider grid and valid time."""
    now = datetime.now(timezone.utc)
    result, missing = {}, []
    with _lock:
        for cell in cells:
            cached = _cache.get(cell)
            if cached and not force_refresh and time.monotonic() - cached[0] < 300:
                result[cell] = cached[1]
            else:
                missing.append(cell)
    for start in range(0, len(missing), 40):
        chunk = missing[start:start + 40]
        try:
            response = requests.get("https://api.open-meteo.com/v1/forecast", params={
                "latitude": ",".join(str(c[0]) for c in chunk),
                "longitude": ",".join(str(c[1]) for c in chunk),
                "current": "precipitation", "timezone": "UTC"}, timeout=10)
            response.raise_for_status()
            payload = response.json()
            rows = payload if isinstance(payload, list) else [payload]
            if len(rows) != len(chunk):
                raise ValueError("Incomplete weather coverage")
            for cell, row in zip(chunk, rows):
                current = row.get("current", {})
                stamp = datetime.fromisoformat(current["time"].replace("Z", "+00:00"))
                if stamp.tzinfo is None:
                    stamp = stamp.replace(tzinfo=timezone.utc)
                age = (now - stamp).total_seconds()
                interval = float(current["interval"])
                amount = float(current["precipitation"])
                if not (-300 <= age <= 1800) or not (0 < interval <= 3600) or not math.isfinite(amount) or amount < 0 or row.get("current_units", {}).get("precipitation") != "mm":
                    continue
                item = {"rainfall_mm_hr": amount * 3600 / interval,
                        "precipitation_mm": amount, "interval_seconds": interval,
                        "valid_time": stamp.isoformat(), "source": "Open-Meteo numerical weather model",
                        "provider_lat": row.get("latitude"), "provider_lon": row.get("longitude"),
                        "fetched_at": now.isoformat()}
                result[cell] = item
                with _lock:
                    if len(_cache) > 512:
                        _cache.clear()
                    _cache[cell] = (time.monotonic(), item)
        except (requests.RequestException, ValueError, KeyError, TypeError):
            continue
    # Cached records also pass freshness checks at the time of use.
    return {cell: item for cell, item in result.items()
            if -300 <= (now - datetime.fromisoformat(item["valid_time"])).total_seconds() <= 1800}


def sample_segments(coordinates):
    segments = []
    for a, b in zip(coordinates, coordinates[1:]):
        if any(not math.isfinite(v) for p in (a, b) for v in p):
            raise ValueError("Invalid road geometry")
        length = distance_m(a, b)
        count = max(1, math.ceil(length / SPACING_M))
        if len(segments) + count > MAX_SAMPLES:
            raise ValueError("Journey exceeds live assessment domain; choose a shorter journey")
        for i in range(count):
            p = [a[j] + (b[j] - a[j]) * i / count for j in range(2)]
            q = [a[j] + (b[j] - a[j]) * (i + 1) / count for j in range(2)]
            midpoint = [(p[j] + q[j]) / 2 for j in range(2)]
            segments.append({"coordinates": [p, q], "point": midpoint, "length_m": length / count})
    return segments


def assess_routes(candidates, engine, origin, destination, force_refresh=False):
    sampled = [sample_segments(route["coordinates"]) for route in candidates]
    cells = sorted({weather_cell(s["point"]) for segments in sampled for s in segments})
    if len(cells) > 120:
        raise ValueError("Journey exceeds live weather coverage limit")
    weather = fetch_rainfall(cells, force_refresh)
    routes = []
    for candidate, segments in zip(candidates, sampled):
        covered = 0.0
        weighted_rain = 0.0
        maximum_rain = 0.0
        model_points = []
        modelled_length = 0.0
        weighted_upper_depth = 0.0
        for segment in segments:
            record = weather.get(weather_cell(segment["point"]))
            segment["rainfall_mm_hr"] = record["rainfall_mm_hr"] if record else None
            segment["weather_valid_time"] = record["valid_time"] if record else None
            segment["status"] = "UNAVAILABLE"
            if record:
                rain = record["rainfall_mm_hr"]
                covered += segment["length_m"]
                weighted_rain += rain * segment["length_m"]
                maximum_rain = max(maximum_rain, rain)
                segment["status"] = "HIGH" if rain >= 20 else "MODERATE" if rain >= 5 else "LOW"
                # Report a sensitivity range; drain blockage is not observed.
                estimates = [engine.calculate_risk(lat=segment["point"][0], lon=segment["point"][1],
                    rainfall_mm_hr=rain, blockage_pct=blockage, duration_hours=1.0) for blockage in (0, 100)]
                if all(p.get("prediction_valid") and p.get("hydrology_metrics", {}).get("dem_status") == "VALIDATED_HIGH_RES_DTM" for p in estimates):
                    segment["estimated_1h_depth_range_cm"] = [p["water_depth_cm"] for p in estimates]
                    model_points.append(segment["estimated_1h_depth_range_cm"])
                    modelled_length += segment["length_m"]
                    weighted_upper_depth += segment["estimated_1h_depth_range_cm"][1] * segment["length_m"]
            segment.pop("point")
        length = sum(s["length_m"] for s in segments)
        complete = bool(segments) and all(s["rainfall_mm_hr"] is not None for s in segments)
        mean = weighted_rain / covered if covered else None
        # Length-weighted mean avoids bias from dense vertices; peak retains local extremes.
        score = .65 * maximum_rain + .35 * mean if complete else None
        model_complete = len(model_points) == len(segments) and bool(segments)
        max_depth_range = [max(p[i] for p in model_points) for i in range(2)] if model_points else None
        mean_upper_depth = weighted_upper_depth / modelled_length if modelled_length else None
        flood_index = (.7 * max_depth_range[1] + .3 * mean_upper_depth) if model_complete else None
        routes.append({**candidate, "segments": segments, "assessment_complete": complete,
            "distance_km": round(length / 1000, 3),
            "rainfall_coverage_pct": round(covered / length * 100, 1) if length else 0,
            "mean_rainfall_mm_hr": round(mean, 2) if mean is not None else None,
            "max_rainfall_mm_hr": round(maximum_rain, 2) if covered else None,
            "rainfall_exposure_index": round(score, 3) if score is not None else None,
            "estimated_1h_depth_range_cm": max_depth_range,
            "terrain_model_coverage_pct": round(modelled_length / length * 100, 1) if length else 0,
            "mean_upper_depth_cm": round(mean_upper_depth, 2) if mean_upper_depth is not None else None,
            "modelled_flood_exposure_index": round(flood_index, 3) if flood_index is not None else None,
            "prediction_valid": False, "risk_category": "UNAVAILABLE", "risk_level": "UNAVAILABLE",
            "risk_score": None, "max_water_depth_cm": None, "num_high_risk_sections": 0,
            "route_type": "live_rainfall_screening", "provenance_label": "ESTIMATED: live numerical weather exposure",
            "color": "#64748B", "stroke_style": "dashed", "is_recommended": False})
    complete = bool(routes) and all(r["assessment_complete"] for r in routes)
    model_complete = complete and all(r["modelled_flood_exposure_index"] is not None for r in routes)
    metric = "modelled_flood_exposure_index" if model_complete else "rainfall_exposure_index"
    best = min(routes, key=lambda r: (r[metric], r["distance_km"])) if complete else None
    tolerance = .25 if model_complete else .1
    tied = complete and max(r[metric] for r in routes) - min(r[metric] for r in routes) < tolerance
    for route in routes:
        route["is_lowest_exposure"] = complete and route[metric] - best[metric] < tolerance
        route["is_lowest_rainfall_exposure"] = route["is_lowest_exposure"] if not model_complete else None
        basis = "modelled flood exposure" if model_complete else "rainfall exposure"
        route["screening_label"] = "Only available road option" if len(routes) == 1 and complete else f"Similar {basis}" if tied else f"Lower {basis}" if route["is_lowest_exposure"] else f"Higher {basis}" if complete else "Data coverage incomplete"
        if complete:
            route["color"] = "#64748B" if tied else "#2563eb" if route["is_lowest_exposure"] else "#e47e32"
    basis = "modelled flood exposure" if model_complete else "rainfall exposure"
    summary = f"Live calculation complete. Colours compare {basis}; flood safety is unverified." if complete else "Live data unavailable or incomplete. Flood safety cannot be determined."
    if len(routes) == 1:
        summary += " Only one road option was returned; no safest-route comparison is possible."
    elif tied:
        summary += f" {basis.capitalize()} does not distinguish these road options."
    direct_distance = distance_m((origin["lat"], origin["lon"]), (destination["lat"], destination["lon"]))
    return {"routes": routes, "is_arrived": direct_distance <= 35, "dist_to_dest_m": round(direct_distance, 1),
        "query": {"origin": origin["name"], "destination": destination["name"],
            "origin_coords": {"lat": origin["lat"], "lon": origin["lon"]}, "dest_coords": {"lat": destination["lat"], "lon": destination["lon"]},
            "is_live_weather": complete, "weather_source": "Open-Meteo numerical weather model", "data_mode": "LIVE_RAINFALL_SCREENING"},
        "data_mode": "LIVE_RAINFALL_SCREENING", "prediction_valid": False, "safe_route_available": False,
        "screening_complete": complete, "recommended_route_id": None,
        "lowest_rainfall_route_id": best["id"] if best and not tied and not model_complete else None,
        "lowest_modelled_exposure_route_id": best["id"] if best and not tied and model_complete else None,
        "comparison_basis": basis if complete else None,
        "no_safe_route_warning": summary,
        "safe_route": {**routes[0], "color": "#64748B", "status": "UNAVAILABLE"},
        "danger_route": {**routes[-1], "color": "#64748B", "status": "UNAVAILABLE"},
        "active_flood_hotspots": [], "weather_cells": list(weather.values()),
        "calculation": {"sample_spacing_max_m": SPACING_M, "sample_count": sum(map(len, sampled)),
            "rainfall_formula": "0.65 * maximum rainfall + 0.35 * distance-weighted mean rainfall",
            "flood_exposure_formula": "0.70 * maximum upper depth + 0.30 * distance-weighted mean upper depth",
            "unit": "mm/hour", "model_horizon_hours": 1, "blockage_sensitivity_pct": [0, 100]},
        "limitations": ["Numerical weather data is not a road flood observation or radar nowcast.",
            "100 m road sampling does not imply 100 m weather resolution.",
            "Depth range is an uncalibrated one-hour scenario with 0–100% blockage, not observed water depth.",
            "Validated terrain, hydraulic drainage, initial flooding, tides and closure feeds are required for safest-route claims."],
        "route_comparison": {"has_alternatives": len(routes) > 1, "recommendation_summary": summary}}
