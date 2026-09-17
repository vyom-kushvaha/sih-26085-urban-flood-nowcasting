"""Measure candidate road geometry against one exact saved depth snapshot."""
try:
    from pyproj import Geod
    GEOD = Geod(ellps='WGS84')
except ImportError:
    Geod = None  # type: ignore[assignment,misc]
    GEOD = None  # type: ignore[assignment]

from backend.services.forecast_roads import forecast_roads

def route_exposure(result, snapshot, candidates):
    assessed = []
    for candidate in candidates:
        coords = candidate['coordinates']
        length = abs(GEOD.line_length([p[1] for p in coords], [p[0] for p in coords]))
        layer = forecast_roads(result, snapshot, [{'id': candidate['id'], 'coordinates': coords}])
        covered = weighted = 0.0
        maximum = None
        for feature in layer['features']:
            depth = feature['properties']['depth_cm']
            a, b = feature['geometry']['coordinates']
            distance = abs(GEOD.inv(a[0], a[1], b[0], b[1])[2])
            if depth is not None:
                covered += distance
                weighted += depth * distance
                maximum = depth if maximum is None else max(maximum, depth)
        coverage = min(1, covered / length) if length else 0
        complete = length > 0 and coverage >= .999999
        assessed.append({'id': candidate['id'], 'coordinates': coords,
                         'distance_km': length / 1000, 'coverage_pct': coverage * 100,
                         'assessment_complete': complete, 'max_depth_cm': maximum,
                         'mean_depth_cm': weighted / covered if covered else None,
                         'segments': layer['features'], 'safe_route_certified': False,
                         'rank': None})
    eligible = sorted([r for r in assessed if r['assessment_complete']],
                      key=lambda r: (r['max_depth_cm'], r['mean_depth_cm'], r['distance_km'], r['id']))
    for rank, route in enumerate(eligible, 1):
        route['rank'] = rank
    return {'routes': assessed, 'lead_minutes': snapshot['lead_minutes'],
            'valid_time': snapshot['valid_time'], 'output_quality': result['output_quality'],
            'safe_route_certified': False, 'ranking_basis': 'Peak depth, mean depth, then distance; full model coverage required.',
            'limitations': result['limitations'] + ['Candidate comparison only; no new graph detour is generated.',
                'No calibrated vehicle thresholds or official closure intersection; ranking is not a safety certificate.']}
