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
from typing import Dict, Any, List, Tuple, Optional

DEFAULT_GEOJSON_PATH = os.path.join("data", "processed", "mumbai_drainage.geojson")
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
        self._load_mumbai_drainage()

    def _load_mumbai_drainage(self):
        """Load Mumbai drainage GeoJSON if file exists."""
        if os.path.exists(self.geojson_path):
            try:
                with open(self.geojson_path, "r", encoding="utf-8") as f:
                    data = json.load(f)
                    self.drain_features = data.get("features", [])
                    print(f"[DrainageProcessor] Loaded {len(self.drain_features)} Mumbai drainage lines from {self.geojson_path}")
            except Exception as e:
                print(f"[DrainageProcessor] Error loading GeoJSON {self.geojson_path}: {e}")
                self.drain_features = []
        else:
            print(f"[DrainageProcessor] GeoJSON not found at {self.geojson_path}. Running without spatial GeoJSON index.")

    def find_nearest_drain(self, lat: float, lon: float) -> Dict[str, Any]:
        """
        Find nearest Mumbai drainage feature and distance in meters.
        """
        if not self.drain_features:
            return {
                "nearest_drain_name": "Generic Urban Drain",
                "waterway_type": "drain",
                "distance_meters": 500.0,
                "has_spatial_match": False
            }

        min_dist = float("inf")
        nearest_feature = None

        for feature in self.drain_features:
            geom = feature.get("geometry", {})
            coords = geom.get("coordinates", [])
            
            if geom.get("type") == "LineString" and len(coords) >= 2:
                for i in range(len(coords) - 1):
                    lon1, lat1 = coords[i]
                    lon2, lat2 = coords[i + 1]
                    dist = point_to_segment_distance_m(lat, lon, lat1, lon1, lat2, lon2)
                    
                    if dist < min_dist:
                        min_dist = dist
                        nearest_feature = feature

        if nearest_feature and min_dist < 10000.0:  # Within 10 km
            props = nearest_feature.get("properties", {})
            return {
                "nearest_drain_name": props.get("name", "Unnamed Drain"),
                "waterway_type": props.get("waterway", "drain"),
                "distance_meters": round(min_dist, 1),
                "osm_id": props.get("osm_id", None),
                "has_spatial_match": True
            }

        return {
            "nearest_drain_name": "Far from Major Channel",
            "waterway_type": "overland_street",
            "distance_meters": round(min_dist, 1) if min_dist != float("inf") else 2000.0,
            "has_spatial_match": False
        }

    def calculate_effective_capacity(
        self, 
        lat: float, 
        lon: float, 
        blockage_pct: float = 0.0
    ) -> Dict[str, Any]:
        """
        Calculate effective drainage capacity and nearest drain spatial context.
        """
        blockage_pct = max(0.0, min(100.0, float(blockage_pct)))
        blockage_factor = blockage_pct / 100.0

        # Spatial lookup
        spatial_match = self.find_nearest_drain(lat, lon)
        dist_m = spatial_match["distance_meters"]
        waterway = spatial_match["waterway_type"]

        if self.default_base_capacity is not None:
            base_capacity = self.default_base_capacity
        else:
            # Estimate base capacity based on channel proximity
            if waterway in ["river", "canal"] and dist_m < 300.0:
                base_capacity = 50.0  # Major arterial discharge channel
            elif dist_m < 200.0:
                base_capacity = 40.0  # Immediate drain proximity
            elif dist_m < 800.0:
                base_capacity = 30.0  # Moderate street drain access
            else:
                base_capacity = 20.0  # Far from major drain / overland slow runoff

        # Effective discharge formula: Q_eff = Q_base * (1 - blockage_factor)
        effective_cap = base_capacity * (1.0 - blockage_factor)

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
                "has_spatial_match": spatial_match["has_spatial_match"]
            },
            # STRICT DATA QUALITY LABELS
            "capacity_source": "OSM GeoJSON Proximity + Estimated Discharge Model",
            "disclaimer": "Capacity is estimated from OSM channel proximity and baseline hydrology; not official municipal telemetry."
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
