"""Normalize the BMC public storm-water schema without inventing hydraulics."""
from collections import Counter
import math


def numeric(value):
    if isinstance(value, bool):
        return None
    try:
        number = float(value)
        return number if math.isfinite(number) else None
    except (TypeError, ValueError):
        return None


def prepare_municipal(manholes, drains, contours):
    nodes = []
    for feature in manholes['features']:
        p = feature['properties']
        nodes.append({'id': str(p.get('NODE_ID', '')).strip(), 'source_id': p.get('OBJECTID'),
                      'geometry': feature.get('geometry'), 'ground_level_source_units': numeric(p.get('GROUND_LEV')),
                      'ground_datum': 'UNCONFIRMED', 'kind': 'MANHOLE'})
    node_counts = Counter(n['id'] for n in nodes)
    edges, excluded = [], []
    statuses = Counter()
    for feature in drains['features']:
        p = feature['properties']
        status = str(p.get('USER_TEXT2', '')).strip()
        statuses[status] += 1
        if status.casefold() != 'existing':
            excluded.append({'source_id': p.get('OBJECTID'), 'reason': status or 'MISSING_STATUS'})
            continue
        width, height = numeric(p.get('CONDUIT_WI')), numeric(p.get('CONDUIT_HE'))
        edges.append({'id': str(p['OBJECTID']), 'upstream': str(p.get('US_NODE_ID', '')).strip(),
            'downstream': str(p.get('DS_NODE_ID', '')).strip(), 'shape': p.get('SHAPE_1'),
            'width_m': width / 1000 if width is not None else None,
            'height_m': height / 1000 if height is not None else None,
            'length_m': numeric(p.get('CONDUIT_LE')), 'upstream_invert_m': numeric(p.get('US_INVERT')),
            'downstream_invert_m': numeric(p.get('DS_INVERT')), 'invert_datum': 'THD_AS_LABELLED_BY_BMC',
            'geometry': feature.get('geometry'), 'asset_status': 'EXISTING',
            'roughness': None, 'outfall_boundary': None})
    missing = sorted({e[k] for e in edges for k in ['upstream', 'downstream']} - set(node_counts))
    invalid_dimensions = [e['id'] for e in edges if any(e[k] is None or e[k] <= 0
                           for k in ['width_m', 'height_m', 'length_m'])]
    missing_inverts = [e['id'] for e in edges if e['upstream_invert_m'] is None or e['downstream_invert_m'] is None]
    adverse = [e['id'] for e in edges if e['id'] not in missing_inverts
               and e['upstream_invert_m'] < e['downstream_invert_m']]
    flat = [e['id'] for e in edges if e['id'] not in missing_inverts
            and e['upstream_invert_m'] == e['downstream_invert_m']]
    elevations = [numeric(f['properties'].get('ELEVATION')) for f in contours['features']]
    valid_elevations = [v for v in elevations if v is not None]
    qa = {'status': 'REQUIRES_VALIDATION', 'operational_ready': False,
        'source': 'BMC public GIS', 'counts': {'manholes': len(nodes), 'drains_downloaded': len(drains['features']),
          'existing_drains': len(edges), 'excluded_drains': len(excluded), 'contours': len(elevations)},
        'asset_status_counts': dict(statuses), 'existing_shape_counts': dict(Counter(e['shape'] for e in edges)),
        'solver_supported_sections': ['circular', 'rectangular_closed', 'rectangular_open'],
        'shape_mapping_status': 'BMC section codes require confirmation; ARCH is not implemented.',
        'missing_node_ids': missing, 'duplicate_node_ids': sorted(k for k, v in node_counts.items() if v > 1),
        'invalid_dimension_edge_ids': invalid_dimensions, 'missing_invert_edge_ids': missing_inverts,
        'adverse_slope_edge_ids': adverse, 'flat_slope_edge_ids': flat,
        'contour_elevation_range_source_units': [min(valid_elevations), max(valid_elevations)] if valid_elevations else None,
        'missing_contour_elevations': len(elevations) - len(valid_elevations),
        'blockers': ['Confirm survey date, accuracy and current as-built status with BMC.',
            'Confirm THD benchmark relationship to manhole ground levels, contour heights and the terrain DTM.',
            'Obtain bare-earth terrain and independent checkpoints; contour interval alone does not prove vertical accuracy.',
            'Supply inlet capture/storage parameters, conduit roughness and outfall/tide boundary conditions.',
            'Complete the hydraulic catchment beyond the provisional AOI and validate topology.',
            'Confirm BMC section-code mapping to circular/open/closed rectangular sections; arch geometry still needs hydraulic support.',
            'Independent rainfall and flood observations are needed for validation.']}
    return {'source': 'BMC_PUBLIC_GIS_UNVALIDATED', 'nodes': nodes, 'edges': edges,
            'excluded_assets': excluded, 'qa': qa}
