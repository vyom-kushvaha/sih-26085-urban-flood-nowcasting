"""
Comprehensive Unit Tests for DEM Processing, Slope Calculations, and Risk Engine Integration
Author: Vyom (Lead Architect & Flood Engine Lead)
Project: Urban Flood Nowcasting System (SIH26085)

Tests:
1. DEM loading (Raster opening, GeoTIFF tags, dimensions, CRS parsing)
2. Coordinate query (Lat/Lon -> pixel row/col mapping)
3. Elevation extraction (Accurate heights at known Mumbai locations)
4. Slope calculation (% and degrees using finite-difference gradient)
5. Outside-raster handling (Graceful out-of-bounds fallback)
6. Risk engine integration (Slope and elevation in active composite physics risk)
7. Fallback behavior & Data Provenance (DEM unavailable vs Real DEM labeling)
"""

import sys
import os
import shutil
import tempfile
import numpy as np
from PIL import Image

# Ensure project modules are on sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "flood-engine")))
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from dem_processor import DEMProcessor, DEMTile, get_dem_processor
from risk_engine import RiskEngine, get_risk_engine


def test_1_dem_loading_and_crs():
    """Test 1: Verify DEM raster loading, dimensions, pixel scale, and CRS determination."""
    dem = get_dem_processor(force_reload=True)
    assert len(dem.tiles) >= 1, "At least one DEM tile must be loaded"

    tile = dem.tiles[0]
    assert tile.width == 3600
    assert tile.height == 3600
    assert tile.pixel_scale_x > 0.0
    assert tile.pixel_scale_y > 0.0
    assert "EPSG:4326" in tile.crs
    assert tile.elevation_grid is not None
    assert tile.elevation_grid.shape == (3600, 3600)
    print("  [PASS] Test 1: DEM Tile Loading & CRS Parsing Verified")


def test_2_coordinate_query_and_bounds():
    """Test 2: Coordinate query bounds checks and pixel conversion."""
    dem = get_dem_processor()

    # N19 tile should contain Dadar / Kurla / Andheri
    n19_tile = dem.get_tile_for_coord(19.0760, 72.8777)
    assert n19_tile is not None
    assert "N19" in n19_tile.filename

    # Check pixel conversion within bounds
    row, col = n19_tile.latlon_to_pixel(19.0760, 72.8777)
    assert 0 <= row < n19_tile.height
    assert 0 <= col < n19_tile.width

    # Top-left corner (20.0N, 72.0E)
    r_tl, c_tl = n19_tile.latlon_to_pixel(20.0, 72.0)
    assert r_tl == 0 and c_tl == 0

    print("  [PASS] Test 2: Spatial Coordinate Mapping & Bounds Checking Verified")


def test_3_elevation_extraction():
    """Test 3: Extract elevation at known Mumbai topographical points."""
    dem = get_dem_processor()

    # Coastal CartoDEM values are WGS84 ellipsoidal heights. Until a validated
    # geoid conversion is configured they must fail closed.
    hindmata = dem.get_elevation_and_slope(19.0178, 72.8478)
    assert hindmata["in_dem_coverage"] is False
    assert hindmata["dem_status"] == "FALLBACK_ANOMALOUS_ELEVATION"
    assert hindmata["is_fallback"] is True

    # Kurla / Mithi River basin has the same unresolved vertical-datum issue.
    kurla = dem.get_elevation_and_slope(19.0657, 72.8793)
    assert kurla["in_dem_coverage"] is False
    assert kurla["is_fallback"] is True

    # Sanjay Gandhi National Park / Kanheri Caves upland peak (> 100m)
    peak = dem.get_elevation_and_slope(19.22, 72.91)
    assert peak["in_dem_coverage"] is True
    assert peak["elevation_m"] > 100.0

    print("  [PASS] Test 3: Real Elevation Extraction at Known Locations Verified")


def test_4_slope_calculation():
    """Test 4: Slope calculation produces mathematically consistent degrees and percentages."""
    dem = get_dem_processor()

    # Lowland urban surface (flatter terrain)
    flat_res = dem.get_elevation_and_slope(19.0657, 72.8793)
    assert "slope_deg" in flat_res
    assert "slope_percent" in flat_res
    assert flat_res["slope_deg"] >= 0.0
    assert flat_res["slope_percent"] >= 0.0

    # Steep mountain slope in SGNP
    steep_res = dem.get_elevation_and_slope(19.22, 72.91)
    assert steep_res["slope_percent"] > flat_res["slope_percent"]
    assert steep_res["slope_deg"] > flat_res["slope_deg"]

    # Verify math consistency: slope_percent ≈ tan(slope_deg) * 100
    expected_pct = np.tan(np.radians(steep_res["slope_deg"])) * 100.0
    assert abs(steep_res["slope_percent"] - expected_pct) < 0.2

    print("  [PASS] Test 4: Geodesic Metric Slope Gradient Calculation Verified")


def test_5_outside_raster_handling():
    """Test 5: Handling of coordinates outside DEM raster coverage."""
    dem = get_dem_processor()

    # New Delhi (28.6139N, 77.2090E) — far outside Mumbai DEM
    out_res = dem.get_elevation_and_slope(28.6139, 77.2090)
    assert out_res["in_dem_coverage"] is False
    assert out_res["dem_status"] == "FALLBACK_OUT_OF_BOUNDS"
    assert out_res["is_fallback"] is True
    assert out_res["elevation_m"] == 15.0  # Safe urban baseline
    assert out_res["slope_deg"] == 1.0
    assert out_res["slope_percent"] == 1.75
    assert "Default Urban Baseline" in out_res["data_source"]
    assert out_res["provenance"]["elevation"] == "FALLBACK"

    print("  [PASS] Test 5: Out-of-Bounds Graceful Handling Verified")


def test_6_risk_engine_integration():
    """Test 6: Active risk engine couples elevation & slope with physical bounds."""
    engine = RiskEngine()

    # 1. Zero rainfall must result in 0 composite risk regardless of elevation
    zero_rain = engine.calculate_risk(lat=19.0178, lon=72.8478, rainfall_mm_hr=0.0)
    assert zero_rain["risk_score"] == 0.0
    assert zero_rain["physics_score"] == 0.0

    # 2. Moderate rain (35 mm/hr) at low-lying Hindmata (~7m) vs Upland (~214m)
    # Both evaluated with identical rainfall and drainage
    hindmata_risk = engine.calculate_risk(lat=19.0178, lon=72.8478, rainfall_mm_hr=40.0, blockage_pct=20.0)
    upland_risk = engine.calculate_risk(lat=19.22, lon=72.91, rainfall_mm_hr=40.0, blockage_pct=20.0)

    # Low-lying basin must have higher terrain vulnerability than steep upland
    hindmata_tv = hindmata_risk["hydrology_metrics"]["terrain_vulnerability_score"]
    upland_tv = upland_risk["hydrology_metrics"]["terrain_vulnerability_score"]
    assert hindmata_tv > upland_tv

    # Invalid terrain must be reflected and cannot produce an operational claim.
    assert hindmata_risk["data_quality"]["dem_elevation"].startswith("Fallback Baseline")
    assert hindmata_risk["prediction_valid"] is False
    assert hindmata_risk["operational_status"] == "UNAVAILABLE_TERRAIN"

    print("  [PASS] Test 6: Risk Engine Elevation & Slope Physics Integration Verified")


def test_7_fallback_behaviour_when_dem_missing():
    """Test 7: Verify fallback behavior and provenance when DEM files are completely unavailable."""
    # Create an empty temporary directory to simulate missing DEM rasters
    temp_dem_dir = tempfile.mkdtemp()
    try:
        empty_dem_processor = DEMProcessor(dem_dir=temp_dem_dir)
        assert len(empty_dem_processor.tiles) == 0

        res = empty_dem_processor.get_elevation_and_slope(19.0760, 72.8777)
        assert res["in_dem_coverage"] is False
        assert res["dem_status"] == "DEM_UNAVAILABLE"
        assert res["is_fallback"] is True
        assert res["elevation_m"] == 15.0
        assert res["provenance"]["elevation"] == "FALLBACK"

        # Risk engine with missing DEM
        fallback_engine = RiskEngine(dem_dir=temp_dem_dir)
        risk_res = fallback_engine.calculate_risk(lat=19.0760, lon=72.8777, rainfall_mm_hr=35.0)

        assert risk_res["risk_score"] > 0.0
        assert risk_res["hydrology_metrics"]["is_dem_fallback"] is True
        assert risk_res["data_quality"]["dem_elevation"].startswith("Fallback Baseline")
        assert "FALLBACK" in risk_res["data_quality"]["terrain_provenance"]
    finally:
        shutil.rmtree(temp_dem_dir, ignore_errors=True)

    print("  [PASS] Test 7: Strict Fallback Handling & Missing-DEM Provenance Verified")


if __name__ == "__main__":
    print("=== RUNNING DEM PROCESSOR & ACTIVE TERRAIN PIPELINE TESTS ===")
    test_1_dem_loading_and_crs()
    test_2_coordinate_query_and_bounds()
    test_3_elevation_extraction()
    test_4_slope_calculation()
    test_5_outside_raster_handling()
    test_6_risk_engine_integration()
    test_7_fallback_behaviour_when_dem_missing()
    print("\n[SUCCESS] ALL 7 DEM PROCESSOR & TERRAIN INTEGRATION TESTS PASSED!")
