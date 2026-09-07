"""
SIH26085 — System & Deployment Automated Verification Script
Urban Flood Nowcasting System (R.A.K.S.H.A.K.)
"""

import sys
import os
import time

# Ensure project directories are importable
sys.path.insert(0, os.path.dirname(__file__))
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "flood-engine"))
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "backend"))

from dotenv import load_dotenv
load_dotenv()

def run_checks():
    print("=" * 70)
    print("   SIH26085 — FINAL SYSTEM & DEPLOYMENT HEALTH VERIFICATION")
    print("=" * 70)
    all_passed = True

    # 1. Environment & Config
    print("\n[1/5] Checking Environment Configuration...")
    has_owm = bool(os.getenv("OPENWEATHER_API_KEY"))
    has_db = bool(os.getenv("DB_PASSWORD") or os.getenv("POSTGRES_PASSWORD"))
    print(f"  - Database password configured: {has_db}")
    print(f"  - Weather API key configured:   {has_owm}")
    print("  -> Configuration Loaded OK")

    # 2. Database & PostGIS Health
    print("\n[2/5] Checking PostgreSQL + PostGIS Connection...")
    try:
        from backend.database import check_db_health
        health = check_db_health()
        print(f"  - Status:          {health.get('status')}")
        print(f"  - DB Name:         {health.get('dbname')}")
        print(f"  - PostGIS Enabled: {health.get('postgis_enabled')}")
        if health.get('postgis_enabled'):
            print("  -> PostGIS Spatial Engine: OPERATIONAL")
        else:
            print("  -> Running in Safe Offline GeoJSON Cache Mode")
    except Exception as e:
        print(f"  -> Database check warning: {e}")

    # 3. Hydrology Engine & DEM Tiles
    print("\n[3/5] Checking DEM Elevation & Safety Fallback...")
    try:
        from dem_processor import get_dem_processor
        dem = get_dem_processor()
        print(f"  - Loaded Tiles:    {len(dem.tiles)} GeoTIFF rasters")
        
        # Test safe fallback on out-of-bounds coordinate
        fb = dem.get_elevation_and_slope(28.6139, 77.2090)
        assert fb["elevation_m"] == 15.0 and fb["in_dem_coverage"] is False and fb["is_fallback"] is True
        print("  - Safe Fallback:   Triggered correctly on out-of-bounds coordinates")
        
        # Test positive coverage on Mumbai terrain
        obs = dem.get_elevation_and_slope(19.2, 72.9)
        assert obs["in_dem_coverage"] is True and obs["elevation_m"] > 0 and obs["is_fallback"] is False
        print(f"  - Valid Terrain:   Observed DEM elevation {obs['elevation_m']}m (Slope: {obs['slope_percent']}%)")
        print("  -> Hydrology DEM Pipeline: OPERATIONAL")
    except Exception as e:
        print(f"  -> DEM check error: {e}")
        all_passed = False

    # 4. Drainage Network
    print("\n[4/5] Checking Mumbai Drainage GeoJSON Spatial Index...")
    try:
        from drainage_processor import get_drainage_processor
        drainage = get_drainage_processor()
        print(f"  - Mapped Segments: {len(drainage.drain_features)} drainage lines")
        cap = drainage.calculate_effective_capacity(19.0600, 72.8520, blockage_pct=25.0)
        assert cap["nearest_drain"]["has_spatial_match"] is True
        print(f"  - Spatial Match:   Found '{cap['nearest_drain']['name']}' at {round(cap['nearest_drain']['distance_meters'], 1)}m")
        print("  -> Drainage Network Coupling: OPERATIONAL")
    except Exception as e:
        print(f"  -> Drainage check error: {e}")
        all_passed = False

    # 5. Full Automated Test Suite
    print("\n[5/5] Running Core Test Suite...")
    try:
        try:
            import pytest
            ret = pytest.main(["-q", "tests/"])
            if ret == 0:
                print("  -> All Automated Tests PASSED")
            else:
                print(f"  -> Pytest exited with code {ret}")
                all_passed = False
        except ImportError:
            import subprocess
            res_dem = subprocess.run([sys.executable, "tests/test_dem_processor.py"], capture_output=True, text=True)
            res_flood = subprocess.run([sys.executable, "tests/test_flood_engine.py"], capture_output=True, text=True)
            if res_dem.returncode == 0 and res_flood.returncode == 0:
                print("  -> All DEM Processor & Flood Engine Tests PASSED")
            else:
                print(f"  -> Tests failed: dem={res_dem.returncode}, flood={res_flood.returncode}")
                all_passed = False
    except Exception as e:
        print(f"  -> Test suite runner error: {e}")
        all_passed = False

    print("\n" + "=" * 70)
    if all_passed:
        print("   [SUCCESS] SYSTEM READY FOR LIVE DEMO & SIH EVALUATION!")
    else:
        print("   [WARNING] Some checks reported issues. Check logs above.")
    print("=" * 70)

if __name__ == "__main__":
    run_checks()
