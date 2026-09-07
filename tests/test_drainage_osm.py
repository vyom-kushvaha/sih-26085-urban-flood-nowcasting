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


def test_distance_decay_and_density():
    """Test 5: Continuous distance decay and local network density metrics."""
    processor = DrainageProcessor()
    
    # Point A: Hindmata / BKC close to drain (< 500m)
    res_near = processor.calculate_effective_capacity(19.0600, 72.8520, blockage_pct=0.0)
    assert res_near["nearest_drain"]["has_spatial_match"] is True
    assert "local_density_count_1km" in res_near
    assert res_near["local_density_count_1km"] > 0
    assert res_near["distance_decay_factor"] > 0.40
    
    # Point B: Very far from major channel
    res_far = processor.calculate_effective_capacity(19.0, 72.0, blockage_pct=0.0)
    assert res_far["nearest_drain"]["has_spatial_match"] is False
    assert res_far["distance_decay_factor"] == 0.40
    assert res_near["base_capacity_mm_hr"] > res_far["base_capacity_mm_hr"]
    print("  [PASS] Test 5: Continuous Distance Decay & Network Density Verified")


def test_provenance_labels():
    """Test 6: Transparent data provenance separating REAL_DATA, MODELLED_PARAMETER, SCENARIO."""
    processor = DrainageProcessor()
    res = processor.calculate_effective_capacity(19.0600, 72.8520, blockage_pct=40.0)
    
    prov = res["provenance"]
    assert "REAL_DATA" in prov["drainage_geometry"]
    assert "MODELLED_PARAMETER" in prov["capacity_model"]
    assert "USER_SUPPLIED_SCENARIO" in prov["scenario_blockage"]
    assert "40" in prov["scenario_blockage"]
    assert "not official municipal telemetry" in res["disclaimer"]
    print("  [PASS] Test 6: Transparent Drainage Provenance Verified")


def test_blockage_monotonic_reduction():
    """Test 7: Effective capacity monotonically decreases as blockage increases from 0% to 100%."""
    processor = DrainageProcessor()
    prev_cap = float("inf")
    blockage_levels = [0.0, 20.0, 40.0, 60.0, 80.0, 100.0]
    
    for b in blockage_levels:
        res = processor.calculate_effective_capacity(19.0760, 72.8777, blockage_pct=b)
        eff = res["effective_capacity_mm_hr"]
        assert eff <= prev_cap, f"Expected capacity to decrease or stay equal at blockage {b}%, got {eff} > {prev_cap}"
        prev_cap = eff
        
    assert prev_cap == 0.0, "Effective capacity at 100% blockage must be 0.0"
    print("  [PASS] Test 7: Blockage Monotonic Reduction Verified")


if __name__ == "__main__":
    print("=== RUNNING MUMBAI OSM DRAINAGE UNIT TESTS ===")
    test_mumbai_coordinates_nearest_drain()
    test_blockage_status_thresholds()
    test_overpass_failure_fallback()
    test_invalid_geometry_handling()
    test_distance_decay_and_density()
    test_provenance_labels()
    test_blockage_monotonic_reduction()
    print("\n[SUCCESS] ALL 7 MUMBAI DRAINAGE UNIT TESTS PASSED SUCCESSFULLY!")
