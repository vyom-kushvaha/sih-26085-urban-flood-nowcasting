"""Connected model-cell priority areas, with one peak marker per flooded cluster."""
import math
from collections import deque

try:
    from rasterio.crs import CRS
    from rasterio.warp import transform
except ImportError:
    CRS = None       # type: ignore[assignment,misc]
    transform = None # type: ignore[assignment]

from backend.services.forecast_roads import classify_depth


def forecast_hotspots(result, snapshot, threshold_cm=5, limit=100):
    grid, depths = result['grid'], snapshot['depth_m']
    crs = CRS.from_user_input(grid['crs'])
    size = grid['cell_size_m']
    if not crs.is_projected or crs.linear_units != 'metre' or size <= 0:
        raise ValueError('Priority areas require a projected metre-based grid')
    width = len(depths[0]) if depths else 0
    if not width or any(len(row) != width for row in depths):
        raise ValueError('Depth grid must be nonempty and rectangular')
    valid = {(r, c): float(d) for r, row in enumerate(depths) for c, d in enumerate(row)
             if d is not None and math.isfinite(d) and d >= 0}
    remaining = {p for p, depth in valid.items() if depth * 100 >= threshold_cm}
    clusters = []
    while remaining:
        start = min(remaining)
        remaining.remove(start)
        queue, cells = deque([start]), []
        while queue:
            r, c = queue.popleft()
            cells.append((r, c))
            for p in ((r-1, c), (r+1, c), (r, c-1), (r, c+1)):
                if p in remaining:
                    remaining.remove(p)
                    queue.append(p)
        peak = min(cells, key=lambda p: (-valid[p], p))
        clusters.append((peak, sorted(cells)))
    clusters.sort(key=lambda item: (-valid[item[0]], -len(item[1]), item[0]))

    def coordinates(points):
        x = [grid['origin_x_m'] + c * size for r, c in points]
        y = [grid['origin_y_m'] - r * size for r, c in points]
        lon, lat = transform(crs, 'EPSG:4326', x, y)
        if not all(math.isfinite(v) for v in lon + lat):
            raise ValueError('Invalid transformed model coordinates')
        return list(map(list, zip(lon, lat)))

    features, areas = [], []
    for rank, (peak, cells) in enumerate(clusters[:limit], 1):
        risk, color = classify_depth(valid[peak] * 100)
        props = {'id': f'cell-{peak[0]}-{peak[1]}', 'rank': rank,
                 'name': f'Model priority area {rank}', 'risk': risk, 'color': color,
                 'max_depth_cm': valid[peak] * 100,
                 'mean_depth_cm': sum(valid[p] for p in cells) / len(cells) * 100,
                 'area_m2': len(cells) * size ** 2, 'cell_count': len(cells),
                 'water_volume_m3': sum(valid[p] for p in cells) * size ** 2,
                 'basis': 'MODEL_OUTPUT', 'ward': None,
                 'lead_minutes': snapshot['lead_minutes'], 'valid_time': snapshot['valid_time']}
        features.append({'type': 'Feature', 'id': props['id'], 'properties': props,
                         'geometry': {'type': 'Point', 'coordinates': coordinates([(peak[0]+.5, peak[1]+.5)])[0]}})
        # Individual cell polygons preserve holes and unknown gaps exactly.
        polygons = [[coordinates([(r,c), (r,c+1), (r+1,c+1), (r+1,c), (r,c)])]
                    for r,c in cells]
        areas.append({'type': 'Feature', 'id': props['id'], 'properties': props,
                      'geometry': {'type': 'MultiPolygon', 'coordinates': polygons}})
    return {'type': 'FeatureCollection', 'features': features,
            'priority_areas': {'type': 'FeatureCollection', 'features': areas},
            'lead_minutes': snapshot['lead_minutes'], 'valid_time': snapshot['valid_time'],
            'output_quality': result['output_quality'], 'safe_route_certified': False,
            'summary': {'total_clusters': len(clusters), 'returned_clusters': len(features),
                        'truncated': len(clusters) > limit, 'threshold_cm': threshold_cm,
                        'covered_area_m2': len(valid) * size ** 2,
                        'unknown_cells': len(depths) * width - len(valid),
                        'affected_area_m2': sum(len(c) for _, c in clusters) * size ** 2,
                        'high_risk_clusters': sum(valid[p]*100 > 15 for p,_ in clusters)},
            'limitations': result['limitations'] + [
                'Four-neighbour cell clusters ranked by peak depth then affected area; not official wards or verified incident reports.',
                'Display thresholds are not validated passability limits.']}
