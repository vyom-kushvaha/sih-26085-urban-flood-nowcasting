"""
OSM Drainage Network Extractor Script for Mumbai (Ways Only)
Author: Vyom (Lead Architect & Flood Engine Lead)
Project: Urban Flood Nowcasting System (SIH26085)

This script:
1. Queries OpenStreetMap Overpass API for way features matching waterways in Mumbai bounding box
2. Validates coordinates and deduplicates OSM way IDs
3. Exports clean GeoJSON to data/processed/mumbai_drainage.geojson
4. Includes SIMULATED_FALLBACK generator if network/Overpass API fails
"""

import os
import json
import time
import requests
from typing import Dict, Any, List, Set

# Mumbai Bounding Box: (min_lat, min_lon, max_lat, max_lon)
MUMBAI_BBOX = (18.88, 72.75, 19.33, 73.05)

OVERPASS_SERVERS = [
    "https://overpass-api.de/api/interpreter",
    "https://overpass.kumi.systems/api/interpreter",
    "https://overpass.nchc.org.tw/api/interpreter"
]

OUTPUT_PATH = os.path.join("data", "processed", "mumbai_drainage.geojson")


def fetch_osm_waterways(bbox: tuple = MUMBAI_BBOX) -> Dict[str, Any]:
    """
    Query Overpass API for waterway way features in Mumbai bounding box.
    """
    min_lat, min_lon, max_lat, max_lon = bbox
    overpass_query = f"""
    [out:json][timeout:25];
    (
      way["waterway"~"river|stream|drain|canal|ditch"]({min_lat},{min_lon},{max_lat},{max_lon});
    );
    out body;
    >;
    out skel qt;
    """
    headers = {"User-Agent": "SIH26085-UrbanFloodNowcasting/1.0"}

    for server in OVERPASS_SERVERS:
        try:
            print(f"[OSM Extractor] Querying Overpass endpoint ({server})...")
            response = requests.post(server, data={"data": overpass_query}, headers=headers, timeout=20)
            if response.status_code == 200:
                print(f"[OSM Extractor] Successfully fetched data from {server}")
                return response.json()
        except Exception as e:
            print(f"[OSM Extractor] Server {server} failed: {e}")
            
    raise RuntimeError("All Overpass API mirrors timed out or failed.")


def is_valid_coord(lon: float, lat: float) -> bool:
    """Validate latitude and longitude ranges."""
    return (-180.0 <= lon <= 180.0) and (-90.0 <= lat <= 90.0)


def parse_overpass_to_geojson(data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Convert raw Overpass JSON nodes and ways to GeoJSON FeatureCollection with ID deduplication.
    Strictly processes way elements only.
    """
    elements = data.get("elements", [])
    
    # Map node IDs to (longitude, latitude)
    nodes = {}
    for elem in elements:
        if elem.get("type") == "node" and "lon" in elem and "lat" in elem:
            lon, lat = float(elem["lon"]), float(elem["lat"])
            if is_valid_coord(lon, lat):
                nodes[elem["id"]] = (lon, lat)
            
    features = []
    seen_osm_ids: Set[int] = set()
    timestamp = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
    
    for elem in elements:
        if elem.get("type") == "way":
            osm_id = elem.get("id")
            
            if osm_id in seen_osm_ids:
                continue
                
            way_nodes = elem.get("nodes", [])
            coordinates = [nodes[node_id] for node_id in way_nodes if node_id in nodes]
            
            # Require at least 2 valid coordinates for LineString
            if len(coordinates) >= 2:
                seen_osm_ids.add(osm_id)
                tags = elem.get("tags", {})
                waterway_type = tags.get("waterway", "drain")
                name = tags.get("name", tags.get("name:en", "Unnamed Waterway"))
                
                feature = {
                    "type": "Feature",
                    "geometry": {
                        "type": "LineString",
                        "coordinates": coordinates
                    },
                    "properties": {
                        "osm_id": osm_id,
                        "osm_type": "way",
                        "waterway": waterway_type,
                        "name": name,
                        "source": "OpenStreetMap Overpass API",
                        "timestamp": timestamp,
                        "capacity_type": "Estimated Baseline (OSM-derived proximity model)",
                        "design_capacity_mm_hr": 50.0 if waterway_type in ["river", "canal"] else 35.0
                    }
                }
                features.append(feature)
                
    return {
        "type": "FeatureCollection",
        "metadata": {
            "city": "Mumbai",
            "bbox": MUMBAI_BBOX,
            "total_features": len(features),
            "timestamp": timestamp,
            "source": "OpenStreetMap Overpass API",
            "disclaimer": "Capacity fields are estimated hydrological assumptions based on OSM channel types; not official municipal telemetry."
        },
        "features": features
    }


def generate_fallback_mumbai_drainage() -> Dict[str, Any]:
    """
    Generates realistic SIMULATED_FALLBACK GeoJSON for major Mumbai waterways when Overpass API is unavailable.
    """
    timestamp = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
    
    fallback_features = [
        {
            "type": "Feature",
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    [72.8711, 19.1432], [72.8685, 19.1150], [72.8620, 19.0850], [72.8520, 19.0600], [72.8450, 19.0400]
                ]
            },
            "properties": {
                "osm_id": 9001,
                "osm_type": "way",
                "waterway": "river",
                "name": "Mithi River",
                "source": "SIMULATED_FALLBACK",
                "timestamp": timestamp,
                "capacity_type": "Estimated Baseline (Simulated Fallback)",
                "design_capacity_mm_hr": 50.0
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    [72.8590, 19.0820], [72.8550, 19.0750], [72.8510, 19.0680]
                ]
            },
            "properties": {
                "osm_id": 9002,
                "osm_type": "way",
                "waterway": "drain",
                "name": "Vakola Nallah",
                "source": "SIMULATED_FALLBACK",
                "timestamp": timestamp,
                "capacity_type": "Estimated Baseline (Simulated Fallback)",
                "design_capacity_mm_hr": 35.0
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    [72.8410, 19.0180], [72.8430, 19.0120], [72.8450, 19.0050]
                ]
            },
            "properties": {
                "osm_id": 9003,
                "osm_type": "way",
                "waterway": "drain",
                "name": "Hindmata Drain",
                "source": "SIMULATED_FALLBACK",
                "timestamp": timestamp,
                "capacity_type": "Estimated Baseline (Simulated Fallback)",
                "design_capacity_mm_hr": 30.0
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    [72.8560, 19.2310], [72.8480, 19.2250], [72.8350, 19.2200]
                ]
            },
            "properties": {
                "osm_id": 9004,
                "osm_type": "way",
                "waterway": "stream",
                "name": "Dahisar River",
                "source": "SIMULATED_FALLBACK",
                "timestamp": timestamp,
                "capacity_type": "Estimated Baseline (Simulated Fallback)",
                "design_capacity_mm_hr": 40.0
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    [72.8520, 19.2050], [72.8430, 19.2000], [72.8310, 19.1950]
                ]
            },
            "properties": {
                "osm_id": 9005,
                "osm_type": "way",
                "waterway": "stream",
                "name": "Poisar River",
                "source": "SIMULATED_FALLBACK",
                "timestamp": timestamp,
                "capacity_type": "Estimated Baseline (Simulated Fallback)",
                "design_capacity_mm_hr": 40.0
            }
        }
    ]
    
    return {
        "type": "FeatureCollection",
        "metadata": {
            "city": "Mumbai",
            "bbox": MUMBAI_BBOX,
            "total_features": len(fallback_features),
            "timestamp": timestamp,
            "source": "SIMULATED_FALLBACK",
            "disclaimer": "Simulated offline fallback dataset for Mumbai waterways when Overpass API is unavailable; not real-time OSM data."
        },
        "features": fallback_features
    }


def main():
    os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)
    
    try:
        raw_osm = fetch_osm_waterways()
        geojson_data = parse_overpass_to_geojson(raw_osm)
        
        # Check if features were returned
        if not geojson_data["features"]:
            print("[OSM Extractor] Overpass returned 0 features, switching to SIMULATED_FALLBACK...")
            geojson_data = generate_fallback_mumbai_drainage()
            
    except Exception as e:
        print(f"[OSM Extractor] All mirrors failed ({e}). Using SIMULATED_FALLBACK...")
        geojson_data = generate_fallback_mumbai_drainage()
        
    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(geojson_data, f, indent=2)
        
    print(f"[OSM Extractor] Saved clean Mumbai GeoJSON to {OUTPUT_PATH} (Source: {geojson_data['metadata']['source']}, {len(geojson_data['features'])} features)")


if __name__ == "__main__":
    main()
