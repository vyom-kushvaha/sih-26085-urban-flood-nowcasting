"""Acquire a compact, reproducible OSM arterial-road extract for Greater Mumbai."""
import hashlib
import json
from datetime import datetime, timezone
from pathlib import Path

import requests

BOUNDS = (18.89, 72.77, 19.30, 72.99)  # south, west, north, east
HIGHWAYS = "motorway|motorway_link|trunk|trunk_link|primary|primary_link|secondary|secondary_link|tertiary|tertiary_link"
SERVERS = ("https://overpass-api.de/api/interpreter", "https://overpass.kumi.systems/api/interpreter")
OUTPUT = Path("data/processed/mumbai_major_roads.json")


def acquire():
    south, west, north, east = BOUNDS
    query = f'[out:json][timeout:120];way["highway"~"^({HIGHWAYS})$"]({south},{west},{north},{east});out tags geom;'
    errors = []
    for server in SERVERS:
        try:
            response = requests.post(server, data={"data": query}, headers={"User-Agent": "RAKSHAK-SIH26085/1.0"}, timeout=150)
            response.raise_for_status()
            ways = []
            for item in response.json().get("elements", []):
                geometry = item.get("geometry", [])
                coordinates = [[round(float(p["lat"]), 7), round(float(p["lon"]), 7)] for p in geometry]
                if len(coordinates) < 2:
                    continue
                tags = item.get("tags", {})
                ways.append({"id": item["id"], "highway": tags.get("highway"),
                    "name": tags.get("name") or tags.get("name:en"), "oneway": tags.get("oneway"),
                    "coordinates": coordinates})
            if not ways:
                raise ValueError("Overpass returned no arterial roads")
            payload = {"metadata": {"source": "OpenStreetMap Overpass API", "source_url": server,
                "license": "ODbL 1.0; © OpenStreetMap contributors", "acquired_at": datetime.now(timezone.utc).isoformat(),
                "bounds": {"south": south, "west": west, "north": north, "east": east},
                "highway_filter": HIGHWAYS, "way_count": len(ways)}, "ways": ways}
            encoded = json.dumps(payload, ensure_ascii=False, separators=(",", ":")).encode("utf-8")
            payload["metadata"]["content_sha256_without_checksum"] = hashlib.sha256(encoded).hexdigest()
            OUTPUT.parent.mkdir(parents=True, exist_ok=True)
            OUTPUT.write_text(json.dumps(payload, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
            return payload["metadata"]
        except (requests.RequestException, ValueError, KeyError, TypeError) as exc:
            errors.append(f"{server}: {exc}")
    raise RuntimeError("; ".join(errors))


if __name__ == "__main__":
    print(json.dumps(acquire(), indent=2))
