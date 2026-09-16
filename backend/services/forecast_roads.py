"""Intersect road centre lines with saved model cells; never infer depth from rain."""
import math
from rasterio.warp import transform, transform_bounds
from backend.services.road_exposure import road_ways


def classify_depth(cm):
    if cm is None:
        return 'UNKNOWN', '#64748b'
    if cm <= 10:
        return 'LOW', '#16a34a'
    if cm <= 30:
        return 'MODERATE', '#f59e0b'
    return 'CRITICAL', '#dc2626'


def forecast_roads(result, snapshot, ways=None):
    grid, depths = result['grid'], snapshot['depth_m']
    size = grid['cell_size_m']
    height, width = len(depths), len(depths[0])
    west, south, east, north = transform_bounds(grid['crs'], 'EPSG:4326',
        grid['origin_x_m'], grid['origin_y_m'] - height * size,
        grid['origin_x_m'] + width * size, grid['origin_y_m'], densify_pts=21)
    features = []
    for way in road_ways()[0] if ways is None else ways:
        coords = way.get('coordinates', [])
        if len(coords) < 2:
            continue
        # Reject disjoint ways before expensive per-way CRS transformations.
        if (max(p[1] for p in coords) < west or min(p[1] for p in coords) > east
                or max(p[0] for p in coords) < south or min(p[0] for p in coords) > north):
            continue
        xs, ys = transform('EPSG:4326', grid['crs'],
                           [p[1] for p in coords], [p[0] for p in coords])
        points = [((x-grid['origin_x_m'])/size, (grid['origin_y_m']-y)/size)
                  for x, y in zip(xs, ys)]
        if not all(math.isfinite(v) for p in points for v in p):
            continue
        if (max(p[0] for p in points) < 0 or min(p[0] for p in points) > width
                or max(p[1] for p in points) < 0 or min(p[1] for p in points) > height):
            continue
        for index, (a, b) in enumerate(zip(points, points[1:])):
            if a == b:
                continue
            cuts = {0., 1.}
            for axis, limit in ((0, width), (1, height)):
                delta = b[axis]-a[axis]
                if delta:
                    for boundary in range(max(0, math.ceil(min(a[axis], b[axis]))),
                                          min(limit, math.floor(max(a[axis], b[axis])))+1):
                        t = (boundary-a[axis])/delta
                        if 0 < t < 1:
                            cuts.add(t)
            cuts = sorted(cuts)
            for part, (start, end) in enumerate(zip(cuts, cuts[1:])):
                mid = (start+end)/2
                col = math.floor(a[0]+mid*(b[0]-a[0]))
                row = math.floor(a[1]+mid*(b[1]-a[1]))
                depth = depths[row][col] if 0 <= col < width and 0 <= row < height else None
                cm = depth*100 if depth is not None and math.isfinite(depth) and depth >= 0 else None
                risk, color = classify_depth(cm)
                px = [grid['origin_x_m']+(a[0]+t*(b[0]-a[0]))*size for t in (start,end)]
                py = [grid['origin_y_m']-(a[1]+t*(b[1]-a[1]))*size for t in (start,end)]
                lon, lat = transform(grid['crs'], 'EPSG:4326', px, py)
                features.append({'type':'Feature', 'id':f"{way['id']}:{index}:{part}",
                    'geometry':{'type':'LineString','coordinates':list(map(list,zip(lon,lat)))},
                    'properties':{'road_id':str(way['id']), 'name':way.get('name') or 'Unnamed road',
                        'depth_cm':cm, 'risk':risk, 'color':color,
                        'basis':'MODEL_OUTPUT' if cm is not None else 'OUTSIDE_MODEL_COVERAGE',
                        'lead_minutes':snapshot['lead_minutes'], 'valid_time':snapshot['valid_time'],
                        'safe_route_certified':False, 'closure_status':'UNKNOWN'}})
    return {'type':'FeatureCollection', 'features':features,
        'lead_minutes':snapshot['lead_minutes'], 'valid_time':snapshot['valid_time'],
        'output_quality':result.get('output_quality', 'UNKNOWN'),
        'terrain_source':result.get('terrain_source', 'UNKNOWN'),
        'limitations':result.get('limitations', []) + ['Centre-line cell intersections; depth bands are not vehicle passability or official closures.'],
        'legend':[{'risk':risk,'color':color} for risk,color in
                  [classify_depth(v) for v in (0,20,40,None)]]}
