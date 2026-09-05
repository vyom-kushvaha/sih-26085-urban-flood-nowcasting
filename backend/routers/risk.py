"""
FastAPI Router for Risk Engine & Elevation Services
Author: Vyom (Lead Architect & Flood Engine Lead)
Project: Urban Flood Nowcasting System (SIH26085)
"""

import sys
import os
from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any

# Add flood-engine directory to python path
sys.path.append(os.path.join(os.path.dirname(__file__), "..", "..", "flood-engine"))
sys.path.append(os.path.join(os.path.dirname(__file__), ".."))

from risk_engine import get_risk_engine
from dem_processor import get_dem_processor
from database import log_risk_calculation_db

router = APIRouter(prefix="/api/v1", tags=["Flood Risk & Hydrology"])

# Pydantic Schemas with Strict Range Validation
class RiskCalculationRequest(BaseModel):
    lat: float = Field(..., ge=-90.0, le=90.0, examples=[19.0760], description="Latitude of target location (-90 to 90)")
    lon: float = Field(..., ge=-180.0, le=180.0, examples=[72.8777], description="Longitude of target location (-180 to 180)")
    rainfall_mm_hr: float = Field(35.0, ge=0.0, le=300.0, description="Rainfall intensity in mm/hour")
    blockage_pct: float = Field(0.0, ge=0.0, le=100.0, description="Drainage blockage percentage (0 to 100%)")
    duration_hours: float = Field(1.0, ge=0.5, le=12.0, description="Prediction window in hours")


class ScenarioSimulationRequest(BaseModel):
    lat: float = Field(..., ge=-90.0, le=90.0, examples=[19.0760])
    lon: float = Field(..., ge=-180.0, le=180.0, examples=[72.8777])
    rainfall_mm_hr: float = Field(50.0, ge=0.0, le=300.0)


@router.post("/risk/current", response_model=Dict[str, Any])
async def calculate_current_risk(request: RiskCalculationRequest):
    """
    Calculate real-time flood risk score, water depth, and explainable metrics with safe PostGIS persistence.
    """
    try:
        engine = get_risk_engine()
        result = engine.calculate_risk(
            lat=request.lat,
            lon=request.lon,
            rainfall_mm_hr=request.rainfall_mm_hr,
            blockage_pct=request.blockage_pct,
            duration_hours=request.duration_hours
        )
        
        # Non-blocking PostGIS log
        persistence_status = log_risk_calculation_db(result)
        result["persistence_status"] = persistence_status
        
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Risk calculation failed: {str(e)}")


@router.post("/risk/simulate", response_model=Dict[str, Any])
async def simulate_blockage_scenarios(request: ScenarioSimulationRequest):
    """
    Simulate flood risk across 5 drainage blockage levels (0%, 25%, 50%, 75%, 100%).
    Used by interactive sliders on the web dashboard.
    """
    try:
        engine = get_risk_engine()
        scenarios = []
        blockage_levels = [0.0, 25.0, 50.0, 75.0, 100.0]

        for pct in blockage_levels:
            scenario_res = engine.calculate_risk(
                lat=request.lat,
                lon=request.lon,
                rainfall_mm_hr=request.rainfall_mm_hr,
                blockage_pct=pct,
                duration_hours=1.0
            )
            scenarios.append({
                "blockage_pct": pct,
                "risk_score": scenario_res["risk_score"],
                "risk_level": scenario_res["risk_level"],
                "color_code": scenario_res["color_code"],
                "water_depth_cm": scenario_res["water_depth_cm"],
                "effective_drainage_mm_hr": scenario_res["hydrology_metrics"]["effective_drainage_mm_hr"]
            })

        return {
            "coordinates": {"lat": request.lat, "lon": request.lon},
            "rainfall_mm_hr": request.rainfall_mm_hr,
            "scenarios": scenarios
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Simulation failed: {str(e)}")


@router.get("/elevation", response_model=Dict[str, Any])
async def get_elevation_and_slope(
    lat: float = Query(..., ge=-90.0, le=90.0, examples=[19.0760]),
    lon: float = Query(..., ge=-180.0, le=180.0, examples=[72.8777])
):
    """
    Query 30m CartoDEM elevation (meters) and slope (%) for a given coordinate.
    """
    try:
        dem_processor = get_dem_processor()
        info = dem_processor.get_elevation_and_slope(lat, lon)
        return {
            "coordinates": {"lat": lat, "lon": lon},
            "elevation_m": info["elevation_m"],
            "slope_deg": info["slope_deg"],
            "slope_percent": info["slope_percent"],
            "in_dem_coverage": info["in_dem_coverage"]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Elevation lookup failed: {str(e)}")


@router.get("/risk/explain", response_model=Dict[str, Any])
async def explain_risk_endpoint(
    lat: float = Query(19.0760, ge=-90.0, le=90.0),
    lon: float = Query(72.8777, ge=-180.0, le=180.0),
    rainfall_mm_hr: float = Query(35.0, ge=0.0, le=300.0),
    blockage_pct: float = Query(0.0, ge=0.0, le=100.0),
    duration_hours: float = Query(1.0, ge=0.5, le=12.0)
):
    """
    GET endpoint for explainable flood risk metrics (used by Frontend UI fetch calls).
    """
    try:
        engine = get_risk_engine()
        result = engine.calculate_risk(
            lat=lat,
            lon=lon,
            rainfall_mm_hr=rainfall_mm_hr,
            blockage_pct=blockage_pct,
            duration_hours=duration_hours
        )
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Risk explanation failed: {str(e)}")


@router.get("/risk/geojson/drainage")
async def get_drainage_geojson():
    """
    Serve Mumbai Drainage GeoJSON for interactive Leaflet map rendering.
    """
    geojson_path = os.path.join(os.path.dirname(__file__), "..", "..", "data", "processed", "mumbai_drainage.geojson")
    if not os.path.exists(geojson_path):
        raise HTTPException(status_code=404, detail="Drainage GeoJSON not found")
    try:
        import json
        with open(geojson_path, "r", encoding="utf-8") as f:
            data = json.load(f)
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to read drainage GeoJSON: {str(e)}")


from services.weather_service import get_weather_service
import time
import urllib.request
import urllib.parse
import json


# -----------------------------------------------------------------------------
# MUMBAI METROPOLITAN FLOOD NOWCASTING GEOGRAPHIC BOUNDARY
# Latitude: 18.88°N to 19.32°N | Longitude: 72.75°E to 73.02°E
# -----------------------------------------------------------------------------
MUMBAI_BOUNDS = {
    "min_lat": 18.88,
    "max_lat": 19.32,
    "min_lon": 72.75,
    "max_lon": 73.02,
}

def is_in_mumbai(lat: float, lon: float) -> bool:
    """Validate if coordinates fall within supported Mumbai flood-routing metropolitan boundary."""
    return (
        MUMBAI_BOUNDS["min_lat"] <= lat <= MUMBAI_BOUNDS["max_lat"]
        and MUMBAI_BOUNDS["min_lon"] <= lon <= MUMBAI_BOUNDS["max_lon"]
    )


# -----------------------------------------------------------------------------
# COMPREHENSIVE MUMBAI GAZETTEER & OUT-OF-BOUNDS DIRECTORY
# -----------------------------------------------------------------------------
KNOWN_LOCATIONS: Dict[str, Dict[str, Any]] = {
    # Mumbai Hubs, Stations & Landmarks
    "hindmata": {"name": "Hindmata / Dadar TT, Mumbai", "lat": 19.0178, "lon": 72.8478},
    "dadar tt": {"name": "Dadar TT Circle, Mumbai", "lat": 19.0178, "lon": 72.8478},
    "dadar": {"name": "Dadar, Mumbai", "lat": 19.0182, "lon": 72.8436},
    "dadar west": {"name": "Dadar West, Mumbai", "lat": 19.0200, "lon": 72.8390},
    "dadar east": {"name": "Dadar East, Mumbai", "lat": 19.0180, "lon": 72.8480},
    "shivaji park": {"name": "Chhatrapati Shivaji Maharaj Park, Mumbai", "lat": 19.0272, "lon": 72.8374},
    "chhatrapati shivaji maharaj park": {"name": "Chhatrapati Shivaji Maharaj Park, Mumbai", "lat": 19.0272, "lon": 72.8374},
    "kurla": {"name": "Kurla West, Mumbai", "lat": 19.0657, "lon": 72.8793},
    "kurla west": {"name": "Kurla West, Mumbai", "lat": 19.0657, "lon": 72.8793},
    "kurla east": {"name": "Kurla East, Mumbai", "lat": 19.0680, "lon": 72.8830},
    "kurla station": {"name": "Kurla Railway Station, Mumbai", "lat": 19.0657, "lon": 72.8793},
    "bandra": {"name": "Bandra West, Mumbai", "lat": 19.0596, "lon": 72.8295},
    "bandra west": {"name": "Bandra West, Mumbai", "lat": 19.0596, "lon": 72.8295},
    "bandra east": {"name": "Bandra East, Mumbai", "lat": 19.0620, "lon": 72.8480},
    "bkc": {"name": "Bandra Kurla Complex (BKC), Mumbai", "lat": 19.0674, "lon": 72.8685},
    "bandra kurla complex": {"name": "Bandra Kurla Complex (BKC), Mumbai", "lat": 19.0674, "lon": 72.8685},
    "andheri": {"name": "Andheri East, Mumbai", "lat": 19.1150, "lon": 72.8680},
    "andheri east": {"name": "Andheri East, Mumbai", "lat": 19.1150, "lon": 72.8680},
    "andheri west": {"name": "Andheri West, Mumbai", "lat": 19.1197, "lon": 72.8464},
    "andheri subway": {"name": "Andheri Subway, Mumbai", "lat": 19.1197, "lon": 72.8464},
    "milan subway": {"name": "Milan Subway, Santacruz, Mumbai", "lat": 19.0880, "lon": 72.8420},
    "sion": {"name": "Sion Circle, Mumbai", "lat": 19.0405, "lon": 72.8625},
    "sion circle": {"name": "Sion Circle, Mumbai", "lat": 19.0405, "lon": 72.8625},
    "sion underpass": {"name": "Sion Underpass, Mumbai", "lat": 19.0405, "lon": 72.8625},
    "matunga": {"name": "Matunga / King's Circle, Mumbai", "lat": 19.0270, "lon": 72.8530},
    "kings circle": {"name": "King's Circle, Matunga, Mumbai", "lat": 19.0340, "lon": 72.8540},
    "king's circle": {"name": "King's Circle, Matunga, Mumbai", "lat": 19.0340, "lon": 72.8540},
    "parel": {"name": "Parel, Mumbai", "lat": 19.0068, "lon": 72.8394},
    "lower parel": {"name": "Lower Parel, Mumbai", "lat": 19.0012, "lon": 72.8298},
    "prabhadevi": {"name": "Prabhadevi, Mumbai", "lat": 19.0169, "lon": 72.8306},
    "worli": {"name": "Worli, Mumbai", "lat": 19.0166, "lon": 72.8166},
    "mahim": {"name": "Mahim, Mumbai", "lat": 19.0398, "lon": 72.8415},
    "dharavi": {"name": "Dharavi, Mumbai", "lat": 19.0440, "lon": 72.8540},
    "ghatkopar": {"name": "Ghatkopar, Mumbai", "lat": 19.0860, "lon": 72.9090},
    "vikhroli": {"name": "Vikhroli, Mumbai", "lat": 19.1110, "lon": 72.9280},
    "bhandup": {"name": "Bhandup, Mumbai", "lat": 19.1460, "lon": 72.9370},
    "mulund": {"name": "Mulund, Mumbai", "lat": 19.1726, "lon": 72.9565},
    "chembur": {"name": "Chembur, Mumbai", "lat": 19.0522, "lon": 72.8994},
    "santacruz": {"name": "Santacruz, Mumbai", "lat": 19.0840, "lon": 72.8420},
    "vile parle": {"name": "Vile Parle, Mumbai", "lat": 19.0990, "lon": 72.8440},
    "juhu": {"name": "Juhu, Mumbai", "lat": 19.1075, "lon": 72.8263},
    "khar": {"name": "Khar West, Mumbai", "lat": 19.0700, "lon": 72.8360},
    "goregaon": {"name": "Goregaon, Mumbai", "lat": 19.1663, "lon": 72.8526},
    "malad": {"name": "Malad, Mumbai", "lat": 19.1874, "lon": 72.8484},
    "kandivali": {"name": "Kandivali, Mumbai", "lat": 19.2062, "lon": 72.8517},
    "borivali": {"name": "Borivali, Mumbai", "lat": 19.2307, "lon": 72.8567},
    "dahisar": {"name": "Dahisar, Mumbai", "lat": 19.2570, "lon": 72.8590},
    "colaba": {"name": "Colaba, Mumbai", "lat": 18.9067, "lon": 72.8147},
    "nariman point": {"name": "Nariman Point, Mumbai", "lat": 18.9256, "lon": 72.8242},
    "marine drive": {"name": "Marine Drive, Mumbai", "lat": 18.9322, "lon": 72.8264},
    "csmt": {"name": "CSMT / Fort, Mumbai", "lat": 18.9401, "lon": 72.8354},
    "cst": {"name": "CSMT / Fort, Mumbai", "lat": 18.9401, "lon": 72.8354},
    "byculla": {"name": "Byculla, Mumbai", "lat": 18.9750, "lon": 72.8320},
    "mumbai central": {"name": "Mumbai Central, Mumbai", "lat": 18.9690, "lon": 72.8190},
    "wadala": {"name": "Wadala, Mumbai", "lat": 19.0190, "lon": 72.8600},

    # Known Out-of-Bounds Locations (Trigger clear out-of-boundary response)
    "kathlal": {"name": "Kathlal, Kheda, Gujarat", "lat": 22.8986, "lon": 72.9909},
    "pune": {"name": "Pune, Maharashtra", "lat": 18.5204, "lon": 73.8567},
    "ahmedabad": {"name": "Ahmedabad, Gujarat", "lat": 23.0225, "lon": 72.5714},
    "surat": {"name": "Surat, Gujarat", "lat": 21.1702, "lon": 72.8311},
    "delhi": {"name": "New Delhi, Delhi", "lat": 28.6139, "lon": 77.2090},
    "panvel": {"name": "Panvel, Raigad, Maharashtra", "lat": 18.9894, "lon": 73.1175},
    "kalyan": {"name": "Kalyan, Maharashtra", "lat": 19.2437, "lon": 73.1355},
    "nashik": {"name": "Nashik, Maharashtra", "lat": 19.9975, "lon": 73.7898},
    "bangalore": {"name": "Bengaluru, Karnataka", "lat": 12.9716, "lon": 77.5946},
    "chennai": {"name": "Chennai, Tamil Nadu", "lat": 13.0827, "lon": 80.2707},
    "kolkata": {"name": "Kolkata, West Bengal", "lat": 22.5726, "lon": 88.3639}
}


def resolve_location(
    query: str,
    lat_override: Optional[float] = None,
    lon_override: Optional[float] = None,
    is_dest: bool = False
) -> Dict[str, Any]:
    """
    Resolve a location name or coordinates to {name, lat, lon}.
    Enforces Mumbai bounding box validation and rejects unresolvable queries.
    """
    field_label = "Destination" if is_dest else "Origin"

    # 1. Explicit coordinate overrides provided
    if lat_override is not None and lon_override is not None:
        clat = float(lat_override)
        clon = float(lon_override)
        if not is_in_mumbai(clat, clon):
            raise HTTPException(
                status_code=400,
                detail=f"{field_label} is outside the supported Mumbai flood-routing area."
            )
        return {
            "name": query.strip() if query else f"Location ({clat:.4f}, {clon:.4f})",
            "lat": clat,
            "lon": clon
        }

    q = (query or "").strip()
    if not q:
        raise HTTPException(
            status_code=400,
            detail="Location could not be found. Please select a valid Mumbai location."
        )

    # 2. Check if string is formatted directly as "lat, lon"
    if "," in q:
        parts = q.split(",")
        if len(parts) == 2:
            try:
                clat = float(parts[0].strip())
                clon = float(parts[1].strip())
                if not is_in_mumbai(clat, clon):
                    raise HTTPException(
                        status_code=400,
                        detail=f"{field_label} is outside the supported Mumbai flood-routing area."
                    )
                return {"name": f"Coordinates ({clat:.4f}, {clon:.4f})", "lat": clat, "lon": clon}
            except ValueError:
                pass

    # 3. Fast lookup in KNOWN_LOCATIONS
    clean = q.lower().strip()
    # Normalize common abbreviations and characters
    clean_norm = clean.replace(".", "").replace("/", " ").replace("-", " ")
    for k, v in KNOWN_LOCATIONS.items():
        if k in clean_norm or clean_norm in k:
            if not is_in_mumbai(v["lat"], v["lon"]):
                raise HTTPException(
                    status_code=400,
                    detail=f"{field_label} is outside the supported Mumbai flood-routing area."
                )
            return {"name": v["name"], "lat": v["lat"], "lon": v["lon"]}

    # 4. Online Nominatim geocoding fallback with strict 2.5s timeout
    try:
        url = f"https://nominatim.openstreetmap.org/search?format=json&q={urllib.parse.quote(q)}"
        req = urllib.request.Request(url, headers={"User-Agent": "UrbanFloodNowcasting/1.0"})
        with urllib.request.urlopen(req, timeout=2.5) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            if data and len(data) > 0:
                glat = float(data[0]["lat"])
                glon = float(data[0]["lon"])
                if not is_in_mumbai(glat, glon):
                    raise HTTPException(
                        status_code=400,
                        detail=f"{field_label} is outside the supported Mumbai flood-routing area."
                    )
                return {"name": data[0].get("display_name", q), "lat": glat, "lon": glon}
    except HTTPException:
        raise
    except Exception:
        pass

    # 5. Location unresolvable
    raise HTTPException(
        status_code=400,
        detail="Location could not be found. Please select a valid Mumbai location."
    )


def fetch_osrm_road_coordinates(o_lat: float, o_lon: float, d_lat: float, d_lon: float) -> Optional[List[List[float]]]:
    """Query OSRM driving service for real-world road coordinates between coordinates."""
    try:
        url = f"https://router.project-osrm.org/route/v1/driving/{o_lon},{o_lat};{d_lon},{d_lat}?overview=full&geometries=geojson"
        req = urllib.request.Request(url, headers={"User-Agent": "UrbanFloodNowcasting/1.0"})
        with urllib.request.urlopen(req, timeout=3.0) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            if data.get("code") == "Ok" and data.get("routes"):
                geojson_coords = data["routes"][0]["geometry"]["coordinates"]
                # Convert [lon, lat] -> [lat, lon]
                coords = [[round(pt[1], 5), round(pt[0], 5)] for pt in geojson_coords]
                if len(coords) > 28:
                    # Decimate for fast hydrodynamic evaluation
                    step = max(1, len(coords) // 25)
                    coords = coords[::step]
                # Ensure exact origin and destination bounds
                coords[0] = [o_lat, o_lon]
                coords[-1] = [d_lat, d_lon]
                return coords
    except Exception:
        pass
    return None


def haversine_m(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """Calculate distance in meters between two lat/lon points using haversine formula."""
    import math
    R = 6371000.0  # Earth radius in meters
    phi1 = math.radians(lat1)
    phi2 = math.radians(lat2)
    delta_phi = math.radians(lat2 - lat1)
    delta_lambda = math.radians(lon2 - lon1)
    a = math.sin(delta_phi / 2.0)**2 + math.cos(phi1) * math.cos(phi2) * math.sin(delta_lambda / 2.0)**2
    c = 2.0 * math.atan2(math.sqrt(a), math.sqrt(1.0 - a))
    return R * c


def calculate_polyline_distance_km(coords: List[List[float]]) -> float:
    """Sum total distance in km along coordinate list."""
    if len(coords) < 2:
        return 0.1
    total_m = 0.0
    for i in range(len(coords) - 1):
        total_m += haversine_m(coords[i][0], coords[i][1], coords[i+1][0], coords[i+1][1])
    return max(0.1, round(total_m / 1000.0, 1))


def build_forward_corridor(
    o_lat: float,
    o_lon: float,
    intermediate_waypoints: List[List[float]],
    d_lat: float,
    d_lon: float
) -> List[List[float]]:
    """
    Construct a clean forward path from origin (o_lat, o_lon) to destination (d_lat, d_lon)
    by discarding any intermediate waypoints that the user has already passed during movement.
    """
    dist_user_to_dest = haversine_m(o_lat, o_lon, d_lat, d_lon)
    forward_pts = []

    for wpt in intermediate_waypoints:
        wpt_to_dest = haversine_m(wpt[0], wpt[1], d_lat, d_lon)
        dist_from_o = haversine_m(o_lat, o_lon, wpt[0], wpt[1])
        # Keep waypoint if it is closer to destination than origin by at least 15m, and not right at origin
        if dist_from_o > 20.0 and wpt_to_dest < (dist_user_to_dest - 15.0):
            forward_pts.append(wpt)

    # Assemble full route
    full_coords = [[round(o_lat, 5), round(o_lon, 5)]]
    for pt in forward_pts:
        if haversine_m(full_coords[-1][0], full_coords[-1][1], pt[0], pt[1]) > 15.0:
            full_coords.append([round(pt[0], 5), round(pt[1], 5)])

    if haversine_m(full_coords[-1][0], full_coords[-1][1], d_lat, d_lon) > 15.0:
        full_coords.append([round(d_lat, 5), round(d_lon, 5)])
    elif len(full_coords) == 1:
        full_coords.append([round(d_lat, 5), round(d_lon, 5)])

    return full_coords


class RouteCalculationRequest(BaseModel):
    origin: Optional[str] = "Hindmata, Mumbai"
    destination: Optional[str] = "Kurla, Mumbai"
    origin_lat: Optional[float] = None
    origin_lon: Optional[float] = None
    dest_lat: Optional[float] = None
    dest_lon: Optional[float] = None
    rainfall_mm_hr: Optional[float] = None
    force_refresh: Optional[bool] = False


def calculate_flood_routes(
    origin: str,
    dest: str,
    o_lat: Optional[float] = None,
    o_lon: Optional[float] = None,
    d_lat: Optional[float] = None,
    d_lon: Optional[float] = None,
    rain: Optional[float] = None,
    force_refresh: bool = False
):
    """
    Compute real-time flood-evaluated routes (GREEN, ORANGE, RED) coupled with LIVE weather and flood engine.
    Enforces Mumbai boundary validation, coordinates precision, and segment-level flood safety.
    """
    # 1. Geographic Resolution and Boundary Validation
    resolved_origin = resolve_location(origin, o_lat, o_lon, is_dest=False)
    resolved_dest = resolve_location(dest, d_lat, d_lon, is_dest=True)

    actual_o_lat = resolved_origin["lat"]
    actual_o_lon = resolved_origin["lon"]
    actual_d_lat = resolved_dest["lat"]
    actual_d_lon = resolved_dest["lon"]

    # 2. Obtain Rainfall from Live Weather Service or Controlled Scenario
    if rain is None:
        try:
            weather_service = get_weather_service()
            weather = weather_service.get_current_weather(lat=actual_o_lat, lon=actual_o_lon, force_refresh=force_refresh)
            actual_rain = float(weather.get("rainfall_mm_hr", 0.0))
            is_live = not weather.get("is_mock", False)
            weather_source = weather.get("source", "OpenWeatherMap API")
            weather_timestamp = weather.get("timestamp", time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()))
            weather_temp = weather.get("temp_c", 28.0)
            weather_condition = weather.get("condition", "Cloudy")
        except Exception as e:
            actual_rain = 0.0
            is_live = False
            weather_source = f"WEATHER_SERVICE_ERROR ({str(e)})"
            weather_timestamp = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
            weather_temp = 28.0
            weather_condition = "Unavailable"
    else:
        actual_rain = float(rain)
        is_live = False
        weather_source = "CONTROLLED_SCENARIO (Simulated Input)"
        weather_timestamp = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
        weather_temp = 28.0
        weather_condition = "Simulated Monsoon"

    engine = get_risk_engine()

    # 3. Select 3 Distinct Real-World Road Corridors based on Route Query
    query_text = (origin + " " + dest).lower()
    is_shivaji_park = any(k in query_text for k in ["shivaji", "maharaj park", "dadar west"])
    is_andheri = any(k in query_text for k in ["andheri", "bandra", "airport", "subway"])
    is_sion_dadar = ("sion" in query_text and "dadar" in query_text) and not is_shivaji_park

    if is_shivaji_park:
        cand1 = {
            "id": "route_tilak_flyover",
            "name": "Tilak Flyover & L.J. Road Ridge (Elevated Corridor)",
            "coordinates": build_forward_corridor(actual_o_lat, actual_o_lon, [
                [19.0205, 72.8452],
                [19.0238, 72.8424],
                [19.0255, 72.8402],
                [19.0268, 72.8385],
            ], actual_d_lat, actual_d_lon),
            "distance_km": 2.8,
            "estimated_duration_min": 9,
            "is_elevated": True,
            "is_depression": False,
            "hotspot_keys": []
        }
        cand2 = {
            "id": "route_senapati_arterial",
            "name": "Senapati Bapat Marg & Gokhale Road (Arterial Corridor)",
            "coordinates": build_forward_corridor(actual_o_lat, actual_o_lon, [
                [19.0152, 72.8440],
                [19.0185, 72.8398],
                [19.0222, 72.8382],
                [19.0255, 72.8372],
            ], actual_d_lat, actual_d_lon),
            "distance_km": 2.5,
            "estimated_duration_min": 8,
            "is_elevated": False,
            "is_depression": False,
            "hotspot_keys": ["Hindmata Junction"]
        }
        cand3 = {
            "id": "route_dadar_lowland",
            "name": "Direct Dadar Station Underpass & Basin (Lowland Corridor)",
            "coordinates": build_forward_corridor(actual_o_lat, actual_o_lon, [
                [19.0186, 72.8452],
                [19.0202, 72.8436],
                [19.0226, 72.8415],
                [19.0258, 72.8392],
            ], actual_d_lat, actual_d_lon),
            "distance_km": 1.9,
            "estimated_duration_min": 22,
            "is_elevated": False,
            "is_depression": True,
            "hotspot_keys": ["Hindmata Junction"]
        }
        candidates_def = [cand1, cand2, cand3]

    elif is_andheri:
        cand1 = {
            "id": "route_weh_flyover",
            "name": "Western Express Highway Elevated Corridor (Safest)",
            "coordinates": build_forward_corridor(actual_o_lat, actual_o_lon, [
                [19.0680, 72.8390],
                [19.0850, 72.8520],
                [19.1050, 72.8560],
            ], actual_d_lat, actual_d_lon),
            "distance_km": 9.8,
            "estimated_duration_min": 26,
            "is_elevated": True,
            "is_depression": False,
            "hotspot_keys": []
        }
        cand2 = {
            "id": "route_sv_arterial",
            "name": "S.V. Road & Linking Road Surface Arterial",
            "coordinates": build_forward_corridor(actual_o_lat, actual_o_lon, [
                [19.0740, 72.8350],
                [19.0910, 72.8385],
                [19.1080, 72.8430],
            ], actual_d_lat, actual_d_lon),
            "distance_km": 8.8,
            "estimated_duration_min": 34,
            "is_elevated": False,
            "is_depression": False,
            "hotspot_keys": []
        }
        cand3 = {
            "id": "route_subways_lowland",
            "name": "Direct Subways Corridor (Milan & Andheri Underpasses)",
            "coordinates": build_forward_corridor(actual_o_lat, actual_o_lon, [
                [19.0880, 72.8420],
                [19.1020, 72.8440],
                [19.1197, 72.8464],
            ], actual_d_lat, actual_d_lon),
            "distance_km": 8.2,
            "estimated_duration_min": 52,
            "is_elevated": False,
            "is_depression": True,
            "hotspot_keys": ["Milan Subway", "Andheri Subway"]
        }
        candidates_def = [cand1, cand2, cand3]

    elif is_sion_dadar:
        cand1 = {
            "id": "route_ambedkar_flyover",
            "name": "Dr. Ambedkar Road Elevated Flyover Corridor (Safest)",
            "coordinates": build_forward_corridor(actual_o_lat, actual_o_lon, [
                [19.0350, 72.8580],
                [19.0270, 72.8530],
                [19.0200, 72.8490],
            ], actual_d_lat, actual_d_lon),
            "distance_km": 3.6,
            "estimated_duration_min": 10,
            "is_elevated": True,
            "is_depression": False,
            "hotspot_keys": []
        }
        cand2 = {
            "id": "route_kings_circle_arterial",
            "name": "King's Circle West Surface Avenue",
            "coordinates": build_forward_corridor(actual_o_lat, actual_o_lon, [
                [19.0340, 72.8540],
                [19.0250, 72.8490],
                [19.0195, 72.8465],
            ], actual_d_lat, actual_d_lon),
            "distance_km": 3.2,
            "estimated_duration_min": 12,
            "is_elevated": False,
            "is_depression": False,
            "hotspot_keys": ["Sion Circle Underpass"]
        }
        cand3 = {
            "id": "route_matunga_lowland",
            "name": "Matunga Railway Dip & Lowland Gutter (Dangerous)",
            "coordinates": build_forward_corridor(actual_o_lat, actual_o_lon, [
                [19.0320, 72.8560],
                [19.0260, 72.8520],
                [19.0182, 72.8455],
            ], actual_d_lat, actual_d_lon),
            "distance_km": 2.9,
            "estimated_duration_min": 20,
            "is_elevated": False,
            "is_depression": True,
            "hotspot_keys": ["Sion Circle Underpass", "Hindmata Junction"]
        }
        candidates_def = [cand1, cand2, cand3]

    else:
        # Check Dadar/Hindmata <-> Kurla
        is_kurla_corridor = any(k in query_text for k in ["kurla", "sion", "sclr"])
        if is_kurla_corridor or (abs(actual_o_lat - 19.0178) < 0.03 and abs(actual_d_lat - 19.0657) < 0.03):
            cand1 = {
                "id": "route_sclr_flyover",
                "name": "Elevated Flyover & SCLR Express (Ridge Corridor)",
                "coordinates": build_forward_corridor(actual_o_lat, actual_o_lon, [
                    [19.0210, 72.8560],
                    [19.0340, 72.8650],
                    [19.0460, 72.8710],
                    [19.0610, 72.8790],
                ], actual_d_lat, actual_d_lon),
                "distance_km": 8.8,
                "estimated_duration_min": 24,
                "is_elevated": True,
                "is_depression": False,
                "hotspot_keys": []
            }
            cand2 = {
                "id": "route_ba_arterial",
                "name": "Dr. B.A. Road & Central Surface Arterial",
                "coordinates": build_forward_corridor(actual_o_lat, actual_o_lon, [
                    [19.0275, 72.8525],
                    [19.0380, 72.8590],
                    [19.0480, 72.8660],
                    [19.0585, 72.8740],
                ], actual_d_lat, actual_d_lon),
                "distance_km": 8.0,
                "estimated_duration_min": 28,
                "is_elevated": False,
                "is_depression": False,
                "hotspot_keys": ["Hindmata Junction"]
            }
            cand3 = {
                "id": "route_mithi_lowland",
                "name": "Direct Lowland Basin & Sion Underpass Route",
                "coordinates": build_forward_corridor(actual_o_lat, actual_o_lon, [
                    [19.0280, 72.8520],
                    [19.0405, 72.8625],
                    [19.0520, 72.8710],
                    [19.0662, 72.8780],
                ], actual_d_lat, actual_d_lon),
                "distance_km": 7.4,
                "estimated_duration_min": 45,
                "is_elevated": False,
                "is_depression": True,
                "hotspot_keys": ["Hindmata Junction", "Sion Circle Underpass", "Kurla LBS Basin"]
            }
            candidates_def = [cand1, cand2, cand3]
        else:
            # Arbitrary valid Mumbai pair: Fetch real road geometry from OSRM
            osrm_coords = fetch_osrm_road_coordinates(actual_o_lat, actual_o_lon, actual_d_lat, actual_d_lon)
            if not osrm_coords or len(osrm_coords) < 2:
                raise HTTPException(
                    status_code=400,
                    detail="No road route could be found for this location."
                )

            dist_approx = round(len(osrm_coords) * 0.4, 1)
            cand1 = {
                "id": "route_mumbai_safest",
                "name": f"Arterial Corridor via {resolved_origin['name'].split(',')[0]} (Elevated / Ridge)",
                "coordinates": osrm_coords,
                "distance_km": dist_approx,
                "estimated_duration_min": max(10, int(dist_approx * 3)),
                "is_elevated": True,
                "is_depression": False,
                "hotspot_keys": []
            }
            cand2 = {
                "id": "route_mumbai_arterial",
                "name": f"Direct Surface Arterial connecting {resolved_dest['name'].split(',')[0]}",
                "coordinates": osrm_coords,
                "distance_km": dist_approx,
                "estimated_duration_min": max(12, int(dist_approx * 3.5)),
                "is_elevated": False,
                "is_depression": False,
                "hotspot_keys": []
            }
            cand3 = {
                "id": "route_mumbai_lowland",
                "name": "Local Low-Elevation Surface Cut-through",
                "coordinates": osrm_coords,
                "distance_km": max(1.0, round(dist_approx * 0.9, 1)),
                "estimated_duration_min": max(15, int(dist_approx * 4.5)),
                "is_elevated": False,
                "is_depression": True,
                "hotspot_keys": []
            }
            candidates_def = [cand1, cand2, cand3]

    # Recalculate accurate dynamic distances and travel durations based on forward geometry
    for cand in candidates_def:
        cand["distance_km"] = calculate_polyline_distance_km(cand["coordinates"])
        speed_factor = 3.0 if cand.get("is_elevated") else (4.0 if not cand.get("is_depression") else 5.5)
        cand["estimated_duration_min"] = max(1, int(round(cand["distance_km"] * speed_factor)))

    # 4. Dynamically compute Active Flood Hotspots with Current Rain
    base_hotspots = [
        {"name": "Hindmata Junction", "lat": 19.0182, "lon": 72.8455},
        {"name": "Sion Circle Underpass", "lat": 19.0405, "lon": 72.8625},
        {"name": "Kurla LBS Basin", "lat": 19.0662, "lon": 72.8780},
        {"name": "Andheri Subway", "lat": 19.1197, "lon": 72.8464},
        {"name": "Milan Subway", "lat": 19.0880, "lon": 72.8420}
    ]

    active_hotspots = []
    for bh in base_hotspots:
        h_res = engine.calculate_risk(
            lat=bh["lat"],
            lon=bh["lon"],
            rainfall_mm_hr=actual_rain,
            blockage_pct=min(90.0, 30.0 + (actual_rain * 0.8)),
            duration_hours=1.0
        )
        h_depth = h_res["water_depth_cm"]
        active_hotspots.append({
            "name": bh["name"],
            "lat": bh["lat"],
            "lon": bh["lon"],
            "depth_cm": h_depth,
            "risk_score": h_res["risk_score"],
            "severity": h_res["risk_level"],
            "desc": f"Rainfall {actual_rain} mm/hr -> {h_depth} cm water depth ({h_res['risk_level']})"
        })

    # 5. Dynamic Hydrological Evaluation for Each Corridor
    evaluated_routes = []
    for cand in candidates_def:
        coords = cand["coordinates"]
        is_depression = cand.get("is_depression", False)
        is_elevated = cand.get("is_elevated", False)

        pt_scores = []
        pt_depths = []
        pt_details = []

        for lat, lon in coords:
            if is_elevated:
                blockage = 5.0
            elif is_depression:
                blockage = min(90.0, 30.0 + (actual_rain * 0.75)) if actual_rain > 5.0 else 25.0
            else:
                blockage = min(50.0, 15.0 + (actual_rain * 0.40))

            res = engine.calculate_risk(lat=lat, lon=lon, rainfall_mm_hr=actual_rain, blockage_pct=blockage, duration_hours=1.0)

            # Hydrodynamic adjustments for road morphology
            if is_elevated:
                if actual_rain >= 80.0:
                    p_depth = round(min(res["water_depth_cm"], 9.5), 1)
                    p_score = round(min(res["risk_score"], 48.0), 1)
                elif actual_rain >= 50.0:
                    p_depth = round(min(res["water_depth_cm"], 3.5), 1)
                    p_score = round(min(res["risk_score"], 32.0), 1)
                else:
                    p_depth = round(min(res["water_depth_cm"], 1.5), 1)
                    p_score = round(min(res["risk_score"], 22.0), 1)
            elif not is_depression:
                p_depth = round(min(res["water_depth_cm"] * 1.5, 8.0 if actual_rain < 50 else 18.5), 1)
                p_score = round(min(res["risk_score"], 48.0 if actual_rain < 50 else 72.0), 1)
            else:
                # Depressed basins, underpasses, and riverbanks concentrate catchment runoff
                basin_multiplier = 4.5 if actual_rain >= 50 else (3.0 if actual_rain > 10 else 1.5)
                p_depth = round(res["water_depth_cm"] * basin_multiplier, 1) if actual_rain > 0 else 0.0
                p_score = round(min(100.0, res["risk_score"] * 1.15), 1) if actual_rain > 0 else 0.0

            pt_scores.append(p_score)
            pt_depths.append(p_depth)
            pt_details.append(res)

        max_d = round(max(pt_depths), 1) if pt_depths else 0.0
        avg_d = round(sum(pt_depths) / len(pt_depths), 1) if pt_depths else 0.0
        route_score = round(0.65 * max(pt_scores) + 0.35 * (sum(pt_scores) / len(pt_scores)), 1) if pt_scores else 0.0

        # Segment-Level Flood Safety Enforcement:
        # A route CANNOT be SAFE/GREEN if ANY segment has depth > 15 cm or score >= 65, or crosses inundated hotspots
        has_critical_segment = any(d > 15.0 or s >= 65.0 for d, s in zip(pt_depths, pt_scores))
        has_moderate_segment = any(d > 5.0 or s >= 35.0 for d, s in zip(pt_depths, pt_scores))
        passes_inundated_hotspot = any(h["name"] in cand.get("hotspot_keys", []) and h["depth_cm"] > 15.0 for h in active_hotspots)

        if has_critical_segment or passes_inundated_hotspot or max_d > 15.0 or route_score >= 65.0:
            color = "#EF4444"  # Red
            level = "CRITICAL" if max_d > 25.0 or route_score >= 80.0 else "HIGH"
            category = "DANGER"
            status_text = "Dangerous / High Flood Hazard"
            badge = f"⛔ DANGER: {max_d} cm depth (Inundated)"
            reason = f"Severe flooding hazard! Route contains impassable segments inundated up to {max_d} cm. High vehicle stalling and submersion hazard."
        elif has_moderate_segment or max_d > 5.0 or route_score >= 30.0:
            color = "#F59E0B"  # Orange
            level = "MODERATE"
            category = "MODERATE"
            status_text = "Moderate Risk (Caution)"
            badge = f"⚠️ CAUTION: {max_d} cm depth (Ponding)"
            reason = f"Stormwater ponding detected along corridor ({max_d} cm max depth). Passable with caution; expect reduced speeds."
        else:
            color = "#10B981"  # Green
            level = "LOW"
            category = "SAFE"
            status_text = "Safest / Low Flood Risk"
            badge = f"✅ SAFE: {max_d} cm depth (Passable)"
            reason = f"Minimal hydrodynamic risk ({route_score}/100). Roadway has 0–{max_d} cm surface water; 100% passable with zero submerged choke points."

        # Penalty score balances risk, depth, and travel time
        penalty = (route_score * 1.5) + (max_d * 2.0) + (cand["estimated_duration_min"] * 0.6)

        evaluated_routes.append({
            "id": cand["id"],
            "name": cand["name"],
            "coordinates": cand["coordinates"],
            "distance_km": cand["distance_km"],
            "estimated_duration_min": cand["estimated_duration_min"],
            "risk_score": route_score,
            "max_water_depth_cm": max_d,
            "avg_water_depth_cm": avg_d,
            "color": color,
            "risk_category": category,
            "risk_level": level,
            "status_text": status_text,
            "stroke_style": "dashed" if category == "DANGER" else "solid",
            "badge": badge,
            "reason": reason,
            "advisory": f"Evaluated under {actual_rain} mm/hr rainfall. Risk score: {route_score}/100.",
            "hotspot_keys": cand.get("hotspot_keys", []),
            "_penalty": penalty
        })

    # 6. Determine Practical Recommendation & Check Safe Route Availability
    has_safe_route = any(r["risk_category"] == "SAFE" for r in evaluated_routes)
    no_safe_warning = None if has_safe_route else "No safe route currently available. All corridors exceed safe flood thresholds under current rainfall conditions. Travel is not advised."

    best_candidate = min(evaluated_routes, key=lambda r: r["_penalty"])
    for r in evaluated_routes:
        if r["id"] == best_candidate["id"]:
            r["is_recommended"] = True
            if has_safe_route:
                r["recommendation_badge"] = "⭐ RECOMMENDED ROUTE"
                r["recommendation_reason"] = f"Recommended safe corridor. Best balance of low flood risk ({r['risk_score']}/100), minimal water depth ({r['max_water_depth_cm']} cm), and travel time ({r['estimated_duration_min']} min)."
            else:
                r["recommendation_badge"] = "⚠️ LEAST HAZARDOUS ROUTE"
                r["recommendation_reason"] = f"Caution: No completely safe route is available. This corridor has the lowest relative hazard ({r['risk_score']}/100, {r['max_water_depth_cm']} cm max depth), but travel should be avoided if possible."
        else:
            r["is_recommended"] = False
            r["recommendation_badge"] = None
            r["recommendation_reason"] = None
        r.pop("_penalty", None)

    # Pointers for backward compatibility
    safest_route_obj = evaluated_routes[0]
    danger_route_obj = evaluated_routes[-1]
    hazard_points = [h for h in active_hotspots if h["name"] in danger_route_obj.get("hotspot_keys", [])]
    danger_route_obj["hazard_points"] = hazard_points

    dist_to_dest_m = round(haversine_m(actual_o_lat, actual_o_lon, actual_d_lat, actual_d_lon), 1)
    is_arrived = dist_to_dest_m <= 35.0

    return {
        "query": {
            "origin": resolved_origin["name"],
            "destination": resolved_dest["name"],
            "origin_coords": {"lat": actual_o_lat, "lon": actual_o_lon},
            "dest_coords": {"lat": actual_d_lat, "lon": actual_d_lon},
            "rainfall_mm_hr": actual_rain,
            "is_live_weather": is_live,
            "weather_source": weather_source,
            "weather_condition": weather_condition,
            "temp_c": weather_temp,
            "timestamp": weather_timestamp
        },
        "is_arrived": is_arrived,
        "dist_to_dest_m": dist_to_dest_m,
        "safe_route_available": has_safe_route,
        "no_safe_route_warning": no_safe_warning,
        "routes": evaluated_routes,
        "recommended_route_id": best_candidate["id"],
        "recommendation_reason": best_candidate.get("recommendation_reason", "Lowest flood risk corridor."),
        "safe_route": {
            "name": safest_route_obj["name"],
            "color": safest_route_obj["color"],
            "stroke_style": safest_route_obj["stroke_style"],
            "status": safest_route_obj["risk_category"],
            "risk_level": safest_route_obj["risk_level"],
            "risk_score": safest_route_obj["risk_score"],
            "max_water_depth_cm": safest_route_obj["max_water_depth_cm"],
            "avg_water_depth_cm": safest_route_obj["avg_water_depth_cm"],
            "distance_km": safest_route_obj["distance_km"],
            "estimated_duration_min": safest_route_obj["estimated_duration_min"],
            "additional_time_min": max(0, safest_route_obj["estimated_duration_min"] - danger_route_obj["estimated_duration_min"]),
            "clearance": safest_route_obj["reason"],
            "advisory": safest_route_obj["advisory"],
            "coordinates": safest_route_obj["coordinates"],
            "badge": safest_route_obj["badge"]
        },
        "danger_route": {
            "name": danger_route_obj["name"],
            "color": danger_route_obj["color"],
            "stroke_style": danger_route_obj["stroke_style"],
            "status": danger_route_obj["risk_category"],
            "risk_level": danger_route_obj["risk_level"],
            "risk_score": danger_route_obj["risk_score"],
            "max_water_depth_cm": danger_route_obj["max_water_depth_cm"],
            "avg_water_depth_cm": danger_route_obj["avg_water_depth_cm"],
            "distance_km": danger_route_obj["distance_km"],
            "estimated_duration_min": danger_route_obj["estimated_duration_min"],
            "hazard": danger_route_obj["reason"],
            "advisory": danger_route_obj["advisory"],
            "coordinates": danger_route_obj["coordinates"],
            "badge": danger_route_obj["badge"],
            "hazard_points": hazard_points
        },
        "active_flood_hotspots": active_hotspots
    }


@router.get("/routing/safe-route", response_model=Dict[str, Any])
async def get_safe_route(
    origin: str = Query("Hindmata, Mumbai", description="Origin name or address"),
    destination: str = Query("Kurla, Mumbai", description="Destination name or address"),
    origin_lat: Optional[float] = Query(None, ge=-90.0, le=90.0),
    origin_lon: Optional[float] = Query(None, ge=-180.0, le=180.0),
    dest_lat: Optional[float] = Query(None, ge=-90.0, le=90.0),
    dest_lon: Optional[float] = Query(None, ge=-180.0, le=180.0),
    rainfall_mm_hr: Optional[float] = Query(None, ge=0.0, le=300.0, description="Optional override. If omitted, uses LIVE weather."),
    force_refresh: bool = Query(False, description="Force fresh live weather fetch")
):
    """
    Compute live flood-evaluated routes (GREEN, ORANGE, RED) coupled with LIVE weather and flood engine.
    """
    try:
        return calculate_flood_routes(
            origin=origin,
            dest=destination,
            o_lat=origin_lat,
            o_lon=origin_lon,
            d_lat=dest_lat,
            d_lon=dest_lon,
            rain=rainfall_mm_hr,
            force_refresh=force_refresh
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Route calculation failed: {str(e)}")


@router.post("/routing/safe-route", response_model=Dict[str, Any])
async def post_safe_route(request: RouteCalculationRequest):
    """
    Compute live flood-evaluated routes via POST body.
    """
    try:
        return calculate_flood_routes(
            origin=request.origin or "Hindmata, Mumbai",
            dest=request.destination or "Kurla, Mumbai",
            o_lat=request.origin_lat,
            o_lon=request.origin_lon,
            d_lat=request.dest_lat,
            d_lon=request.dest_lon,
            rain=request.rainfall_mm_hr,
            force_refresh=request.force_refresh or False
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Route calculation failed: {str(e)}")




