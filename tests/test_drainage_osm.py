"""
Unit Tests for Mumbai OSM Drainage Network Extractor & Spatial Proximity Lookup
Author: Vyom (Lead Architect & Flood Engine Lead)
Project: Urban Flood Nowcasting System (SIH26085)
"""

import sys
import os
import math

# Add project subdirectories to sys.path
sys.path.append(os.path.join(os.path.dirname(__file__), "..", "flood-engine"))
sys.path.append(os.path.join(os.path.dirname(__file__), ".."))

from drainage_processor import DrainageProcessor, point_to_segment_distance_m
from scripts.fetch_osm_drainage import generate_fallback_mumbai_drainage, parse_overpass_to_geojson


def test_mumbai_coordinates_nearest_drain():
    """Test 1: Spatial lookup near Mithi River / BKC (19.0600°N, 72.8520°E)."""
    processor = DrainageProcessor()
    res = processor.calculate_effective_capacity(lat=19.0600, lon=72.8520, blockage_pct=25.0)

    assert res["effective_capacity_mm_hr"] > 0.0
    assert "nearest_drain" in res
    assert res["nearest_drain"]["has_spatial_match"] is True
    assert res["nearest_drain"]["distance_meters"] < 500.0  # Should be close to Mithi River segment
    
    # Check strict data quality label
    assert res["capacity_source"] == "OSM GeoJSON Proximity + Estimated Discharge Model"
    assert "not official municipal telemetry" in res["disclaimer"]
    print("  [PASS] Test 1: Mumbai Coordinates Spatial Match")


def test_blockage_status_thresholds():
    """Test 2: Verify blockage status labels (CLEAN, PARTIALLY_OBSTRUCTED, SEVERELY_CLOGGED, CRITICALLY_CLOGGED, FULLY_BLOCKED)."""
    processor = DrainageProcessor(base_capacity_mm_hr=40.0)
    
    assert processor.calculate_effective_capacity(19.0, 72.8, 0.0)["drainage_status"] == "CLEAN"
    assert processor.calculate_effective_capacity(19.0, 72.8, 25.0)["drainage_status"] == "PARTIALLY_OBSTRUCTED"
    assert processor.calculate_effective_capacity(19.0, 72.8, 50.0)["drainage_status"] == "SEVERELY_CLOGGED"
    assert processor.calculate_effective_capacity(19.0, 72.8, 75.0)["drainage_status"] == "CRITICALLY_CLOGGED"
    assert processor.calculate_effective_capacity(19.0, 72.8, 100.0)["drainage_status"] == "FULLY_BLOCKED"
    print("  [PASS] Test 2: Blockage Status Thresholds (FULLY_BLOCKED only at 100%)")


def test_overpass_failure_fallback():
    """Test 3: Verify offline SIMULATED_FALLBACK GeoJSON generator."""
    fallback_geojson = generate_fallback_mumbai_drainage()
    
    assert fallback_geojson["type"] == "FeatureCollection"
    assert len(fallback_geojson["features"]) >= 5
    assert fallback_geojson["metadata"]["city"] == "Mumbai"
    assert fallback_geojson["metadata"]["source"] == "SIMULATED_FALLBACK"
    
    feature = fallback_geojson["features"][0]
    assert "name" in feature["properties"]
    assert feature["properties"]["waterway"] in ["river", "drain", "stream", "canal"]
    assert feature["properties"]["source"] == "SIMULATED_FALLBACK"
    assert "Simulated Fallback" in feature["properties"]["capacity_type"]
    print("  [PASS] Test 3: Overpass Failure & SIMULATED_FALLBACK Generator")


def test_invalid_geometry_handling():
    """Test 4: Degenerate geometry (zero-length line segment, point-to-point distance)."""
    dist_zero = point_to_segment_distance_m(19.0, 72.8, 19.0, 72.8, 19.0, 72.8)
    assert dist_zero == 0.0

    empty_processor = DrainageProcessor(geojson_path="non_existent_file.geojson")
    res_empty = empty_processor.calculate_effective_capacity(19.0760, 72.8777)
    
    assert res_empty["effective_capacity_mm_hr"] > 0.0
    assert res_empty["nearest_drain"]["has_spatial_match"] is False
    print("  [PASS] Test 4: Invalid & Degenerate Geometry Handling")


if __name__ == "__main__":
    print("=== RUNNING MUMBAI OSM DRAINAGE UNIT TESTS ===")
    test_mumbai_coordinates_nearest_drain()
    test_blockage_status_thresholds()
    test_overpass_failure_fallback()
    test_invalid_geometry_handling()
    print("\n[SUCCESS] ALL MUMBAI DRAINAGE UNIT TESTS PASSED SUCCESSFULLY!")
