"""
Drainage Network Processing & Nearest-Drain Spatial Proximity Module
Author: Vyom (Lead Architect & Flood Engine Lead)
Project: Urban Flood Nowcasting System (SIH26085)

This module:
1. Ingests Mumbai OSM drainage GeoJSON (data/processed/mumbai_drainage.geojson)
2. Calculates location-based nearest-drain distance (meters) using vector projection
3. Estimates effective drainage discharge capacity: Q_effective = Q_base * (1 - Blockage_Factor)
4. EXPLICITLY LABELS data source as "OSM-derived proximity + estimated capacity model"
   (Does NOT claim official municipal telemetry)
"""

import os
import json
import math
import collections
from typing import Dict, Any, List, Tuple, Optional

DEFAULT_GEOJSON_PATH = os.environ.get(
    "MUNICIPAL_DRAINAGE_GEOJSON",
    os.path.normpath(os.path.join(os.path.dirname(__file__), "..", "data", "processed", "mumbai_drainage.geojson"))
)
METERS_PER_DEGREE_LAT = 111320.0


def point_to_segment_distance_m(
    p_lat: float, p_lon: float, 
    a_lat: float, a_lon: float, 
    b_lat: float, b_lon: float
) -> float:
    """
    Calculate minimum spatial distance in meters from point P to line segment AB.
    """
    center_lat = math.radians((p_lat + a_lat + b_lat) / 3.0)
    meters_per_deg_lon = METERS_PER_DEGREE_LAT * math.cos(center_lat)

    px, py = p_lon * meters_per_deg_lon, p_lat * METERS_PER_DEGREE_LAT
    ax, ay = a_lon * meters_per_deg_lon, a_lat * METERS_PER_DEGREE_LAT
    bx, by = b_lon * meters_per_deg_lon, b_lat * METERS_PER_DEGREE_LAT

    dx = bx - ax
    dy = by - ay

    if dx == 0 and dy == 0:
        return math.hypot(px - ax, py - ay)

    t = ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy)
    t = max(0.0, min(1.0, t))

    proj_x = ax + t * dx
    proj_y = ay + t * dy

    return math.hypot(px - proj_x, py - proj_y)


class DrainageProcessor:
    """Calculates drainage discharge capacity and nearest-drain spatial proximity for Mumbai."""

    def __init__(self, geojson_path: str = DEFAULT_GEOJSON_PATH, base_capacity_mm_hr: Optional[float] = None):
        self.geojson_path = geojson_path
        self.default_base_capacity = base_capacity_mm_hr
        self.drain_features: List[Dict[str, Any]] = []
        self._segments: List[Tuple[float, float, float, float, Dict[str, Any]]] = []
        self._grid: Dict[Tuple[int, int], List[Tuple[float, float, float, float, Dict[str, Any]]]] = collections.defaultdict(list)
        self._cache: Dict[Tuple[float, float], Dict[str, Any]] = {}
        self._load_mumbai_drainage()

    def _load_mumbai_drainage(self):
        """Load Mumbai drainage GeoJSON if file exists and build spatial grid index."""
        if os.path.exists(self.geojson_path):
            try:
                with open(self.geojson_path, "r", encoding="utf-8") as f:
                    data = json.load(f)
                    self.drain_features = data.get("features", [])
                    print(f"[DrainageProcessor] Loaded {len(self.drain_features)} Mumbai drainage lines from {self.geojson_path}")
                
                # Build pre-flattened segment list and 2km spatial grid for fast proximity indexing
                self._segments = []
                self._grid.clear()
                self._cache.clear()
                for feature in self.drain_features:
                    geom = feature.get("geometry", {})
                    coords = geom.get("coordinates", [])
                    if geom.get("type") == "LineString" and len(coords) >= 2:
                        for i in range(len(coords) - 1):
                            lon1, lat1 = coords[i]
                            lon2, lat2 = coords[i + 1]
                            seg = (lat1, lon1, lat2, lon2, feature)
                            self._segments.append(seg)
                            # 0.02 deg ~ 2.2km grid cell
                            g_lat1 = int(math.floor(lat1 / 0.02))
                            g_lat2 = int(math.floor(lat2 / 0.02))
                            g_lon1 = int(math.floor(lon1 / 0.02))
                            g_lon2 = int(math.floor(lon2 / 0.02))
                            for glat in range(min(g_lat1, g_lat2), max(g_lat1, g_lat2) + 1):
                                for glon in range(min(g_lon1, g_lon2), max(g_lon1, g_lon2) + 1):
                                    self._grid[(glat, glon)].append(seg)
            except Exception as e:
                print(f"[DrainageProcessor] Error loading GeoJSON {self.geojson_path}: {e}")
                self.drain_features = []
                self._segments = []
                self._grid.clear()
        else:
            print(f"[DrainageProcessor] GeoJSON not found at {self.geojson_path}. Running without spatial GeoJSON index.")

    def find_nearest_drain(self, lat: float, lon: float) -> Dict[str, Any]:
        """
        Find nearest Mumbai drainage feature and distance in meters.
        Optimized with spatial grid indexing and fast spatial coordinate caching.
        """
        if not self.drain_features:
            return {
                "nearest_drain_name": "Generic Urban Drain",
                "waterway_type": "drain",
                "distance_meters": 500.0,
                "has_spatial_match": False,
                "local_density_count_1km": 0
            }

        cache_key = (round(lat, 4), round(lon, 4))
        if cache_key in self._cache:
            return self._cache[cache_key]

        glat = int(math.floor(lat / 0.02))
        glon = int(math.floor(lon / 0.02))

        # Check candidate segments in 3x3 grid neighborhood
        candidates = []
        for dlat in (-1, 0, 1):
            for dlon in (-1, 0, 1):
                cell = (glat + dlat, glon + dlon)
                if cell in self._grid:
                    candidates.extend(self._grid[cell])

        min_dist = float("inf")
        nearest_feature = None
        nearby_feature_ids = set()

        if candidates:
            for lat1, lon1, lat2, lon2, feat in candidates:
                dist = point_to_segment_distance_m(lat, lon, lat1, lon1, lat2, lon2)
                if dist <= 1000.0:
                    nearby_feature_ids.add(feat.get("properties", {}).get("osm_id") or id(feat))
                if dist < min_dist:
                    min_dist = dist
                    nearest_feature = feat

        # Fallback to full segment scan if no candidate or closest is beyond cell boundary (> 1500m)
        if min_dist > 1500.0 or nearest_feature is None:
            for lat1, lon1, lat2, lon2, feat in self._segments:
                dist = point_to_segment_distance_m(lat, lon, lat1, lon1, lat2, lon2)
                if dist <= 1000.0:
                    nearby_feature_ids.add(feat.get("properties", {}).get("osm_id") or id(feat))
                if dist < min_dist:
                    min_dist = dist
                    nearest_feature = feat

        density_count = len(nearby_feature_ids)

        if nearest_feature and min_dist < 10000.0:  # Within 10 km
            props = nearest_feature.get("properties", {})
            res = {
                "nearest_drain_name": props.get("name", "Unnamed Drain"),
                "waterway_type": props.get("waterway", "drain"),
                "distance_meters": round(min_dist, 1),
                "osm_id": props.get("osm_id", None),
                "has_spatial_match": True,
                "local_density_count_1km": density_count
            }
        else:
            res = {
                "nearest_drain_name": "Far from Major Channel",
                "waterway_type": "overland_street",
                "distance_meters": round(min_dist, 1) if min_dist != float("inf") else 2000.0,
                "has_spatial_match": False,
                "local_density_count_1km": 0
            }

        if len(self._cache) < 4096:
            self._cache[cache_key] = res
        return res

    def calculate_effective_capacity(
        self, 
        lat: float, 
        lon: float, 
        blockage_pct: float = 0.0
    ) -> Dict[str, Any]:
        """
        Calculate effective drainage capacity, local network density, and spatial proximity.
        Follows a continuous physical distance decay and local density modulation model.
        """
        blockage_pct = max(0.0, min(100.0, float(blockage_pct)))
        blockage_factor = blockage_pct / 100.0

        # Spatial lookup
        spatial_match = self.find_nearest_drain(lat, lon)
        dist_m = spatial_match["distance_meters"]
        waterway = spatial_match["waterway_type"]
        density_count = spatial_match.get("local_density_count_1km", 0)

        if self.default_base_capacity is not None:
            base_capacity = float(self.default_base_capacity)
            dist_factor = 1.0
            density_factor = 1.0
        else:
            # 1. Base channel potential discharge by classification
            if waterway in ["river", "canal"]:
                channel_base = 50.0  # Major arterial discharge channel (e.g. Mithi River)
            elif waterway in ["stream"]:
                channel_base = 40.0  # Natural secondary stream channel
            elif waterway in ["drain", "ditch"]:
                channel_base = 35.0  # Designed collector drain or roadside ditch
            else:
                channel_base = 20.0  # Default urban overland street flow

            # 2. Continuous distance decay factor (overland flow resistance & curb delay)
            # Full intake within 50m (1.0); decays smoothly to 0.40 at 1000m; bounded at 0.40 beyond
            if not spatial_match["has_spatial_match"] or dist_m > 1500.0:
                dist_factor = 0.40
                channel_base = 20.0
            elif dist_m <= 50.0:
                dist_factor = 1.0
            else:
                dist_factor = max(0.40, 1.0 - 0.60 * ((dist_m - 50.0) / 950.0))

            # 3. Local drainage network density factor within 1 km
            # High density of channels accelerates convergence; sparse channels create bottlenecks
            # Modulates base capacity within [0.90, 1.15]
            if density_count == 0:
                density_factor = 0.90
            elif density_count >= 10:
                density_factor = 1.15
            else:
                density_factor = 0.90 + 0.25 * (density_count / 10.0)

            # Modulate and bound within [15.0, 55.0] mm/hr
            base_capacity = round(max(15.0, min(55.0, channel_base * dist_factor * density_factor)), 2)

        # Effective discharge formula: Q_eff = Q_base * (1 - blockage_factor)
        effective_cap = round(max(0.0, base_capacity * (1.0 - blockage_factor)), 2)

        # Precise blockage status thresholds
        if blockage_pct == 0.0:
            status = "CLEAN"
        elif blockage_pct < 40.0:
            status = "PARTIALLY_OBSTRUCTED"
        elif blockage_pct < 75.0:
            status = "SEVERELY_CLOGGED"
        elif blockage_pct < 100.0:
            status = "CRITICALLY_CLOGGED"
        else:
            status = "FULLY_BLOCKED"

        return {
            "base_capacity_mm_hr": round(base_capacity, 2),
            "blockage_percentage": round(blockage_pct, 1),
            "blockage_factor": round(blockage_factor, 2),
            "effective_capacity_mm_hr": round(effective_cap, 2),
            "drainage_status": status,
            "nearest_drain": {
                "name": spatial_match["nearest_drain_name"],
                "waterway_type": waterway,
                "distance_meters": dist_m,
                "has_spatial_match": spatial_match["has_spatial_match"],
                "osm_id": spatial_match.get("osm_id")
            },
            "local_density_count_1km": density_count,
            "distance_decay_factor": round(dist_factor, 2),
            "density_factor": round(density_factor, 2),
            # BACKWARD COMPATIBILITY
            "capacity_source": "OSM GeoJSON Proximity + Estimated Discharge Model",
            "disclaimer": "Capacity is estimated from OSM channel proximity and baseline hydrology; not official municipal telemetry. Pipe diameter, invert levels, manhole connectivity, and flow telemetry are not available in public open data and are not fabricated.",
            # STRICT DATA PROVENANCE
            "provenance": {
                "drainage_geometry": "REAL_DATA (OSM Mapped Surface Waterways & Open Drains)" if spatial_match["has_spatial_match"] else "FALLBACK (Default Baseline)",
                "capacity_model": "MODELLED_PARAMETER (Continuous proximity & density decay model: 15-55 mm/hr)",
                "scenario_blockage": f"USER_SUPPLIED_SCENARIO (Blockage: {round(blockage_pct, 1)}%)"
            }
        }


# Singleton instance
_global_drainage_processor = None

def get_drainage_processor(
    geojson_path: str = DEFAULT_GEOJSON_PATH, 
    base_capacity_mm_hr: Optional[float] = None
) -> DrainageProcessor:
    global _global_drainage_processor
    if _global_drainage_processor is None or base_capacity_mm_hr is not None:
        _global_drainage_processor = DrainageProcessor(
            geojson_path=geojson_path, 
            base_capacity_mm_hr=base_capacity_mm_hr
        )
    return _global_drainage_processor
