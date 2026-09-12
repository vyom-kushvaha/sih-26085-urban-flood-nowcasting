"""Validate a manifest-backed DTM against the SIH pilot terrain contract."""

from __future__ import annotations

import argparse
import json
import os
import sys

PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
FLOOD_ENGINE = os.path.join(PROJECT_ROOT, "flood-engine")
if FLOOD_ENGINE not in sys.path:
    sys.path.insert(0, FLOOD_ENGINE)

from terrain_dataset import TerrainDataset, TerrainValidationError


def main() -> int:
    parser = argparse.ArgumentParser(description="Validate a high-resolution DTM and its manifest")
    parser.add_argument("--manifest", required=True, help="Path to terrain manifest JSON")
    parser.add_argument(
        "--aoi",
        default=os.path.join(PROJECT_ROOT, "data", "pilot", "hindmata_dadar_aoi.geojson"),
        help="Pilot AOI GeoJSON",
    )
    parser.add_argument("--lat", type=float, help="Optional latitude to query after acceptance")
    parser.add_argument("--lon", type=float, help="Optional longitude to query after acceptance")
    args = parser.parse_args()

    terrain = TerrainDataset(args.manifest)
    result = terrain.validate(args.aoi)
    if result["accepted"] and args.lat is not None and args.lon is not None:
        try:
            result["query"] = terrain.elevation_at(args.lat, args.lon)
        except TerrainValidationError as exc:
            result["accepted"] = False
            result["errors"].append(str(exc))
    elif (args.lat is None) != (args.lon is None):
        result["accepted"] = False
        result["errors"].append("--lat and --lon must be supplied together")

    print(json.dumps(result, indent=2))
    return 0 if result["accepted"] else 1


if __name__ == "__main__":
    raise SystemExit(main())
