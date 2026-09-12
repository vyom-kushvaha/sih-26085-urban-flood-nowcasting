"""Check that the shipped city context excludes known offshore locations."""
import json
from pathlib import Path
from shapely.geometry import shape, Point

ROOT = Path(__file__).resolve().parents[1]

def test_mumbai_boundary_includes_city_and_excludes_sea_and_other_cities():
    feature = json.loads((ROOT / 'frontend/mumbai-boundary.geojson').read_text())
    boundary = shape(feature['geometry'])
    assert boundary.is_valid
    for lon, lat in [(72.84, 19.01), (72.869, 19.118), (72.829, 18.94)]:
        assert boundary.covers(Point(lon, lat))
    for lon, lat in [(72.81, 19.04), (72.83, 18.90), (73.0, 19.03), (72.97, 19.22)]:
        assert not boundary.covers(Point(lon, lat))
    assert feature['properties']['license'] == 'CC BY 4.0'
