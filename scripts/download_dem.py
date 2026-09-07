"""
Copernicus GLO-30 DEM Ingestion Script for Mumbai
Author: Vyom (Lead Architect & Flood Engine Lead)
Project: Urban Flood Nowcasting System (SIH26085)

Downloads official, open-access Copernicus GLO-30 (30m spatial resolution)
GeoTIFF tiles covering the Mumbai Metropolitan Region (18°N to 20°N, 72°E to 73°E)
directly from the public AWS Open Data bucket (no credentials required).

Tile coverage:
- N19_00_E072_00: Central & Northern Mumbai, Salsette Island, Thane, Navi Mumbai (19°N-20°N, 72°E-73°E)
- N18_00_E072_00: Southern Mumbai, Colaba, Nariman Point, Harbour (18°N-19°N, 72°E-73°E)
"""

import os
import sys
import argparse
import urllib.request
import time
from typing import Dict, List

# Official AWS Open Data Copernicus DEM 30m GLO-30 bucket HTTPS endpoint
BASE_URL = "https://copernicus-dem-30m.s3.eu-central-1.amazonaws.com"

MUMBAI_TILES: Dict[str, Dict[str, str]] = {
    "N19_00_E072_00": {
        "filename": "Copernicus_DSM_COG_10_N19_00_E072_00_DEM.tif",
        "relative_path": "Copernicus_DSM_COG_10_N19_00_E072_00_DEM/Copernicus_DSM_COG_10_N19_00_E072_00_DEM.tif",
        "expected_size_approx": 13336459,  # ~13.3 MB
        "description": "Mumbai Central/North, Salsette Island, Thane, Sanjay Gandhi National Park (19°N-20°N, 72°E-73°E)"
    },
    "N18_00_E072_00": {
        "filename": "Copernicus_DSM_COG_10_N18_00_E072_00_DEM.tif",
        "relative_path": "Copernicus_DSM_COG_10_N18_00_E072_00_DEM/Copernicus_DSM_COG_10_N18_00_E072_00_DEM.tif",
        "expected_size_approx": 4027713,   # ~4.0 MB
        "description": "Mumbai South, Colaba, Marine Drive, Mumbai Harbour (18°N-19°N, 72°E-73°E)"
    }
}


def download_tile(tile_key: str, dest_dir: str, force: bool = False) -> bool:
    """Download a single Copernicus DEM tile into dest_dir with progress report."""
    if tile_key not in MUMBAI_TILES:
        print(f"[ERROR] Unknown tile key '{tile_key}'. Valid keys: {list(MUMBAI_TILES.keys())}")
        return False

    tile_meta = MUMBAI_TILES[tile_key]
    dest_path = os.path.join(dest_dir, tile_meta["filename"])

    if os.path.exists(dest_path) and not force:
        file_size = os.path.getsize(dest_path)
        if file_size > 1000000:  # > 1 MB
            print(f"[DEM Download] Tile already exists: {dest_path} ({file_size / (1024*1024):.2f} MB). Skipping.")
            return True

    url = f"{BASE_URL}/{tile_meta['relative_path']}"
    print(f"[DEM Download] Fetching {tile_key}...")
    print(f"  Source:      {url}")
    print(f"  Destination: {dest_path}")
    print(f"  Description: {tile_meta['description']}")

    start_time = time.time()
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "HydroLens-SIH26085-DEM-Downloader/1.0"})
        with urllib.request.urlopen(req, timeout=30.0) as response, open(dest_path, "wb") as out_file:
            total_size = int(response.headers.get("Content-Length", 0))
            downloaded = 0
            block_size = 65536

            while True:
                buffer = response.read(block_size)
                if not buffer:
                    break
                downloaded += len(buffer)
                out_file.write(buffer)
                if total_size > 0:
                    pct = (downloaded / total_size) * 100
                    print(f"\r  Progress: {pct:5.1f}% ({downloaded / (1024*1024):.2f} MB / {total_size / (1024*1024):.2f} MB)", end="")

        elapsed = time.time() - start_time
        final_size = os.path.getsize(dest_path)
        print(f"\n  [SUCCESS] Completed {tile_meta['filename']} ({final_size / (1024*1024):.2f} MB in {elapsed:.1f}s)")
        return True
    except Exception as e:
        print(f"\n  [ERROR] Failed to download {tile_key}: {e}")
        if os.path.exists(dest_path):
            try:
                os.remove(dest_path)
            except OSError:
                pass
        return False


def ensure_mumbai_dem(dest_dir: str = "data/raw/dem", force: bool = False) -> bool:
    """Ensure all required Mumbai DEM tiles are present in dest_dir."""
    os.makedirs(dest_dir, exist_ok=True)
    success = True
    for tile_key in MUMBAI_TILES:
        ok = download_tile(tile_key, dest_dir=dest_dir, force=force)
        if not ok:
            success = False
    return success


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Download official Copernicus GLO-30 DEM tiles for Mumbai")
    parser.add_argument("--dest", default=os.path.join(os.path.dirname(__file__), "..", "data", "raw", "dem"),
                        help="Target directory for GeoTIFF rasters (default: data/raw/dem)")
    parser.add_argument("--force", action="store_true", help="Force re-download even if files already exist")
    parser.add_argument("--tile", choices=list(MUMBAI_TILES.keys()), default=None,
                        help="Specific tile to download (default: download all Mumbai tiles)")

    args = parser.parse_args()
    dest_dir = os.path.abspath(args.dest)

    print("=== HYDROLENS MUMBAI DEM INGESTION PIPELINE ===")
    print(f"Target Directory: {dest_dir}")

    if args.tile:
        ok = download_tile(args.tile, dest_dir=dest_dir, force=args.force)
    else:
        ok = ensure_mumbai_dem(dest_dir=dest_dir, force=args.force)

    if ok:
        print("\n[COMPLETE] All requested Mumbai DEM rasters are ready for DEMProcessor.")
        sys.exit(0)
    else:
        print("\n[FAILED] One or more DEM tiles could not be downloaded.")
        sys.exit(1)
