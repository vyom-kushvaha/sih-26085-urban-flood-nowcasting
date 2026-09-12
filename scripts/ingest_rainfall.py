"""Fetch and persist one configured rainfall observation."""

import argparse
import json
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from backend.services.rainfall_ingestion import (
    RainfallUnavailable,
    get_rainfall_ingestion_service,
)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--lat", type=float, required=True)
    parser.add_argument("--lon", type=float, required=True)
    parser.add_argument("--force", action="store_true")
    args = parser.parse_args()
    if not 18.89 <= args.lat <= 19.30 or not 72.77 <= args.lon <= 72.99:
        parser.error("coordinates must be inside the configured Mumbai coverage bounds")
    try:
        result = get_rainfall_ingestion_service().ingest(args.lat, args.lon, args.force)
    except RainfallUnavailable as exc:
        print(json.dumps({"status": "UNAVAILABLE", "provider_failures": str(exc)}))
        return 2
    print(json.dumps({"status": "SUCCESS", **result}, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
