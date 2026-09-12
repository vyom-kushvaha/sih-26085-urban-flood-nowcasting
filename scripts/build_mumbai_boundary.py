"""Build the R.A.K.S.H.A.K. display boundary (requires shapely==2.1.2).

Input: Sanjana Krishnan's BMC_admin_wards.geojson, CC BY 4.0.
Union preserves source coastline/islands/holes; no convex hull or manual outline.
"""
import json
from pathlib import Path
from shapely.geometry import shape, mapping
from shapely.ops import unary_union

ROOT = Path(__file__).resolve().parents[1]
source = ROOT / 'data/raw/boundaries/BMC_admin_wards.geojson'
wards = json.loads(source.read_text(encoding='utf-8'))
boundary = unary_union([shape(f['geometry']) for f in wards['features']])
assert boundary.is_valid and not boundary.is_empty
output = {
    'type': 'Feature',
    'properties': {
        'name': 'Greater Mumbai',
        'source': 'Sanjana Krishnan — BMC administrative wards',
        'source_url': 'https://github.com/sanjanakrishnan/mumbai_spatial_data',
        'license': 'CC BY 4.0',
        'processing': 'Union of 24 wards; source coastline preserved without simplification',
        'note': 'Context boundary, not a surveyed coastline or validated flood coverage',
    },
    'geometry': mapping(boundary),
}
target = ROOT / 'frontend/mumbai-boundary.geojson'
target.write_text(json.dumps(output, separators=(',', ':')), encoding='utf-8')
print(f'Built {target.name}: {boundary.geom_type}, {target.stat().st_size} bytes')
