"""Inspect DEM GeoTIFF metadata and Mumbai checkpoint values.

This is a read-only QA command. It does not resample or modify terrain data.
"""

from __future__ import annotations

import argparse
import glob
import json
import math
import os
from pathlib import Path
from typing import Any

import numpy as np
from PIL import Image


CHECKPOINTS = {
    "Hindmata": (19.0178, 72.8478),
    "Sion Circle": (19.0405, 72.8625),
    "Kurla LBS": (19.0662, 72.8780),
    "Andheri Subway": (19.1197, 72.8464),
}


def tag_value(tags: Any, key: int, default: Any) -> Any:
    value = tags.get(key, default)
    return value if value is not None else default


def inspect_tile(path: str) -> tuple[dict[str, Any], dict[str, float]]:
    with Image.open(path) as image:
        width, height = image.size
        tags = getattr(image, "tag_v2", {})
        scale = tag_value(tags, 33550, (0.0, 0.0, 0.0))
        tiepoint = tag_value(tags, 33922, (0.0,) * 6)
        nodata_raw = tag_value(tags, 42113, None)
        grid = np.asarray(image, dtype=np.float32)

    scale_x = float(scale[0])
    scale_y = float(scale[1])
    min_lon = float(tiepoint[3])
    max_lat = float(tiepoint[4])
    max_lon = min_lon + width * scale_x
    min_lat = max_lat - height * scale_y
    centre_lat = (min_lat + max_lat) / 2.0
    resolution_x_m = scale_x * 111_320.0 * math.cos(math.radians(centre_lat))
    resolution_y_m = scale_y * 111_320.0

    nodata = None
    if nodata_raw is not None:
        try:
            nodata = float(str(nodata_raw).strip("\x00 \t\r\n"))
        except ValueError:
            pass

    valid = np.isfinite(grid)
    if nodata is not None:
        valid &= ~np.isclose(grid, nodata)
    valid &= (grid > -9000.0) & (grid < 30000.0)
    sample = grid[::20, ::20][valid[::20, ::20]]

    checkpoints: dict[str, float] = {}
    for name, (lat, lon) in CHECKPOINTS.items():
        if min_lat <= lat <= max_lat and min_lon <= lon <= max_lon:
            row = min(max(int((max_lat - lat) / scale_y), 0), height - 1)
            col = min(max(int((lon - min_lon) / scale_x), 0), width - 1)
            checkpoints[name] = round(float(grid[row, col]), 3)

    issues: list[str] = []
    if scale_x <= 0 or scale_y <= 0:
        issues.append("missing or invalid pixel scale")
    if not (-180 <= min_lon <= 180 and -90 <= min_lat <= 90):
        issues.append("coordinates are not a supported geographic lat/lon grid")
    if resolution_x_m > 2.0 or resolution_y_m > 2.0:
        issues.append("grid spacing exceeds the 2 m street-level target")
    if any(value < -15.0 for value in checkpoints.values()):
        issues.append(
            "checkpoint values are WGS84 ellipsoidal heights and require a validated "
            "geoid/vertical-datum transformation before use as elevations above MSL"
        )

    report = {
        "file": os.path.basename(path),
        "size_bytes": os.path.getsize(path),
        "shape": {"width": width, "height": height},
        "extent_wgs84": {
            "min_lon": min_lon,
            "min_lat": min_lat,
            "max_lon": max_lon,
            "max_lat": max_lat,
        },
        "pixel_size_degrees": {"x": scale_x, "y": scale_y},
        "approx_pixel_size_m": {
            "x": round(resolution_x_m, 2),
            "y": round(resolution_y_m, 2),
        },
        "nodata": nodata,
        "sample_statistics_m": {
            "minimum": round(float(np.min(sample)), 3),
            "p01": round(float(np.percentile(sample, 1)), 3),
            "median": round(float(np.median(sample)), 3),
            "p99": round(float(np.percentile(sample, 99)), 3),
            "maximum": round(float(np.max(sample)), 3),
        },
        "issues": issues,
    }
    return report, checkpoints


def main() -> int:
    parser = argparse.ArgumentParser(description="Validate DEM metadata and checkpoint values")
    parser.add_argument("--dem-dir", default="data/raw/dem", help="Directory containing GeoTIFF tiles")
    args = parser.parse_args()

    files = sorted(glob.glob(os.path.join(args.dem_dir, "*.tif")))
    tiles = []
    checkpoint_values: dict[str, float] = {}
    for path in files:
        tile, points = inspect_tile(path)
        tiles.append(tile)
        checkpoint_values.update(points)

    report = {
        "terrain_qa_version": 1,
        "source_directory": str(Path(args.dem_dir).resolve()),
        "street_level_target": {
            "maximum_grid_spacing_m": 2.0,
            "preferred_vertical_rmse_m": "0.15-0.30",
        },
        "tile_count": len(tiles),
        "tiles": tiles,
        "checkpoint_raw_elevations_m": checkpoint_values,
        "accepted_for_street_level_modelling": bool(tiles)
        and all(not tile["issues"] for tile in tiles),
    }
    print(json.dumps(report, indent=2))
    return 0 if report["accepted_for_street_level_modelling"] else 1


if __name__ == "__main__":
    raise SystemExit(main())
