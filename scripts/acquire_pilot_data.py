"""Download bounded public pilot datasets with provenance and completeness checks.

Run from the repository root. Downloads remain local, outside version control.
No credentials, synthetic fallback, or writes to external services are used.
"""
import argparse
from datetime import datetime, timezone
import hashlib
import json
from pathlib import Path
import sys

import requests

ROOT = Path(__file__).resolve().parents[1]
BMC = 'https://prsrvgisapp.mcgm.gov.in/server/rest/services/mcgm/MCGMGIS_Departments_Master_All_Layers/MapServer'
OVERPASS = ['https://overpass-api.de/api/interpreter',
            'https://overpass.private.coffee/api/interpreter']
LAYERS = {6: 'storm_manholes', 7: 'storm_drains', 301: 'contours_20cm'}


def request_json(url, params=None):
    response = requests.get(url, params=params, timeout=(10, 45),
                            headers={'User-Agent': 'RAKSHAK-SIH26085-pilot-data/1.0'})
    response.raise_for_status()
    result = response.json()
    if 'error' in result or result.get('remark'):
        raise ValueError(f'Source returned an error: {result.get("error", result.get("remark"))}')
    return result


def save_json(folder, name, value):
    content = json.dumps(value, indent=2, allow_nan=False).encode('utf-8')
    path = folder / name
    path.write_bytes(content)
    return {'path': str(path.relative_to(ROOT)), 'bytes': len(content),
            'sha256': hashlib.sha256(content).hexdigest()}


def pilot_bounds():
    aoi = json.loads((ROOT / 'data/pilot/hindmata_dadar_aoi.geojson').read_text())
    ring = next(f['geometry']['coordinates'][0] for f in aoi['features']
                if f['geometry']['type'] == 'Polygon')
    xs, ys = zip(*ring)
    return min(xs), min(ys), max(xs), max(ys)


def verify_feature_ids(features, expected, id_field):
    ids = [f['properties'][id_field] for f in features]
    if len(ids) != len(set(ids)) or set(ids) != set(expected):
        raise ValueError('Incomplete or duplicate feature extraction; source IDs do not match')


def field_coverage(features):
    keys = sorted({k for f in features for k in f.get('properties', {})})
    return {k: {'present': sum(f.get('properties', {}).get(k) not in (None, '') for f in features),
                'total': len(features)} for k in keys}


def download_bmc(folder, bounds):
    catalogue = request_json(BMC, {'f': 'json'})
    save_json(folder, 'bmc_catalogue.json', catalogue)
    output = []
    for layer_id, label in LAYERS.items():
        url = f'{BMC}/{layer_id}'
        item = {'dataset': label, 'source_url': url, 'license': 'BMC copyright; redistribution terms unconfirmed',
                'operationally_validated': False}
        try:
            metadata = request_json(url, {'f': 'json'})
            save_json(folder, f'{label}_schema.json', metadata)
            ids_result = request_json(url + '/query', {
                'f': 'json', 'where': '1=1', 'geometry': ','.join(map(str, bounds)),
                'geometryType': 'esriGeometryEnvelope', 'inSR': 4326,
                'spatialRel': 'esriSpatialRelIntersects', 'returnIdsOnly': 'true'})
            if 'objectIds' not in ids_result:
                raise ValueError('Source did not return an object ID list')
            ids = sorted(ids_result['objectIds'] or [])
            if len(ids) > 20000:
                raise ValueError('Pilot extract exceeds 20000 feature limit')
            field = ids_result.get('objectIdFieldName')
            if not field:
                raise ValueError('Source did not identify its object ID field')
            features = []
            for offset in range(0, len(ids), 300):
                batch = request_json(url + '/query', {'f': 'geojson',
                    'objectIds': ','.join(map(str, ids[offset:offset+300])),
                    'outFields': '*', 'outSR': 4326, 'returnGeometry': 'true'})
                if batch.get('exceededTransferLimit'):
                    raise ValueError('Source truncated the requested batch')
                features.extend(batch['features'])
            verify_feature_ids(features, ids, field)
            item.update(status='DOWNLOADED' if features else 'EMPTY_IN_AOI',
                feature_count=len(features), field_coverage=field_coverage(features),
                artifact=save_json(folder, f'{label}.geojson',
                    {'type': 'FeatureCollection', 'features': features}),
                note='Complete for IDs intersecting the provisional AOI at query time; full hydraulic catchment coverage is not established.')
        except (requests.RequestException, ValueError, KeyError) as exc:
            item.update(status='FAILED', error=str(exc))
        output.append(item)
        print(json.dumps({k: v for k, v in item.items() if k != 'field_coverage'}), flush=True)
    return output


def download_osm(folder, bounds):
    west, south, east, north = bounds
    query = (f'[out:json][timeout:25];('
             f'way["highway"]({south},{west},{north},{east});'
             f'way["waterway"]({south},{west},{north},{east}););out body;>;out skel qt;')
    failures = []
    for server in OVERPASS:
        try:
            result = request_json(server, {'data': query})
            if not isinstance(result.get('elements'), list) or not result['elements']:
                raise ValueError('No OSM elements returned')
            nodes = {e['id'] for e in result['elements'] if e['type'] == 'node'}
            ways = [e for e in result['elements'] if e['type'] == 'way']
            if any(not set(w['nodes']).issubset(nodes) for w in ways):
                raise ValueError('Missing OSM way nodes')
            return [{'dataset': 'osm_roads_waterways', 'status': 'DOWNLOADED',
                'source_url': server, 'license': 'ODbL 1.0; OpenStreetMap contributors',
                'way_count': len(ways), 'node_count': len(nodes),
                'artifact': save_json(folder, 'osm_roads_waterways.json', result),
                'operationally_validated': False,
                'limitations': ['Mapping may be incomplete; route restrictions and surveyed hydraulic attributes require separate validation.']}]
        except (requests.RequestException, ValueError, KeyError) as exc:
            failures.append(str(exc))
    raise ValueError('; '.join(failures))


def download_weather(folder, bounds):
    west, south, east, north = bounds
    url = 'https://api.open-meteo.com/v1/forecast'
    result = request_json(url, {'latitude': (south+north)/2, 'longitude': (west+east)/2,
        'hourly': 'precipitation', 'timezone': 'UTC', 'forecast_days': 2})
    hourly = result['hourly']
    values = hourly['precipitation']
    if len(hourly['time']) != len(values) or not values or any(v is None for v in values):
        raise ValueError('Incomplete hourly precipitation response')
    return [{'dataset': 'nwp_point_rainfall', 'status': 'DOWNLOADED', 'source_url': url,
        'license': 'Open-Meteo attribution and service terms apply',
        'artifact': save_json(folder, 'open_meteo_forecast.json', result),
        'quality': 'FORECAST', 'source_type': 'NWP', 'hours': len(values),
        'valid_end_times_utc': [hourly['time'][0], hourly['time'][-1]],
        'operationally_validated': False,
        'limitations': ['Point NWP fallback, not radar; each timestamp ends the preceding precipitation hour.',
                        'Download time is not model issue time; freshness must be rechecked before use.']}]


def download_node_references(folder, input_directory):
    prepared = json.loads((input_directory / 'normalized_existing_drainage.json').read_text())
    wanted = prepared['qa']['missing_node_ids']
    if len(wanted) > 500:
        raise ValueError('Node supplement exceeds 500 requested IDs')
    features = []
    for start in range(0, len(wanted), 50):
        quoted = ','.join("'" + key.replace("'", "''") + "'" for key in wanted[start:start+50])
        result = request_json(BMC + '/6/query', {'f': 'geojson',
            'where': f'NODE_ID IN ({quoted})', 'outFields': '*', 'outSR': 4326,
            'returnGeometry': 'true'})
        if result.get('exceededTransferLimit'):
            raise ValueError('Supplemental node response was truncated')
        features.extend(result['features'])
    found = {f['properties']['NODE_ID'] for f in features}
    unresolved = sorted(set(wanted) - found)
    if found - set(wanted):
        raise ValueError('Supplement returned unrequested node IDs')
    return [{'dataset': 'supplementary_manholes', 'status': 'PARTIAL' if unresolved else 'DOWNLOADED',
        'source_url': BMC + '/6', 'requested_count': len(wanted), 'feature_count': len(features),
        'unresolved_node_ids': unresolved, 'license': 'BMC copyright; redistribution terms unconfirmed',
        'artifact': save_json(folder, 'supplementary_manholes.geojson',
            {'type': 'FeatureCollection', 'features': features})}]


def query_bmc_features(layer, where):
    url = f'{BMC}/{layer}/query'
    ids_result = request_json(url, {'f': 'json', 'where': where, 'returnIdsOnly': 'true'})
    if 'objectIds' not in ids_result:
        raise ValueError('Missing object ID list')
    ids = sorted(ids_result['objectIds'] or [])
    if len(ids) > 5000:
        raise ValueError('Query exceeds 5000 feature limit')
    features = []
    for offset in range(0, len(ids), 250):
        result = request_json(url, {'f': 'geojson', 'objectIds': ','.join(map(str, ids[offset:offset+250])),
            'outFields': '*', 'outSR': 4326, 'returnGeometry': 'true'})
        if result.get('exceededTransferLimit'):
            raise ValueError('Truncated source response')
        features.extend(result['features'])
    verify_feature_ids(features, ids, ids_result['objectIdFieldName'])
    return features


def sql_ids(keys):
    return ','.join("'" + key.replace("'", "''") + "'" for key in sorted(keys))


def download_downstream(folder, input_directory):
    if (input_directory / 'downstream_drains.geojson').is_file():
        manifest = json.loads((input_directory / 'manifest.json').read_text())
        item = next(d for d in manifest['datasets'] if d['dataset'] == 'downstream_drains')
        raw = (input_directory / 'downstream_drains.geojson').read_bytes()
        if hashlib.sha256(raw).hexdigest() != item['artifact']['sha256']:
            raise ValueError('Resume source checksum mismatch')
        edges = {f['properties']['OBJECTID']: f for f in json.loads(raw)['features']}
        frontier = set(item['unqueried_node_ids'])
        queried = {f['properties'][k] for f in edges.values() for k in ['US_NODE_ID', 'DS_NODE_ID']} - frontier
        original = {str(i) for i in edges}
    else:
        source = json.loads((input_directory / 'normalized_existing_drainage.json').read_text())
        frontier = {e[k] for e in source['edges'] for k in ['upstream', 'downstream']}
        queried, edges = set(), {}
        original = {str(e['id']) for e in source['edges']}
    # Every outgoing edge is queried, including extra branches of nonterminal nodes.
    for hop in range(32):
        current = sorted(frontier - queried)
        if not current:
            break
        for start in range(0, len(current), 50):
            batch = current[start:start+50]
            for feature in query_bmc_features(7, f"US_NODE_ID IN ({sql_ids(batch)}) AND USER_TEXT2 = 'Existing'"):
                edges[feature['properties']['OBJECTID']] = feature
            queried.update(batch)
            if len(edges) > 5000:
                raise ValueError('Downstream extension exceeds 5000 edges')
        frontier = {f['properties']['DS_NODE_ID'] for f in edges.values()} - queried
        print(f'Downstream hop {hop+1}: {len(edges)} edges; {len(frontier)} unqueried nodes', flush=True)
    node_ids = {f['properties'][k] for f in edges.values() for k in ['US_NODE_ID', 'DS_NODE_ID']}
    if len(node_ids) > 5000:
        raise ValueError('Downstream extension exceeds 5000 nodes')
    nodes = []
    ordered = sorted(node_ids)
    for start in range(0, len(ordered), 50):
        nodes.extend(query_bmc_features(6, f'NODE_ID IN ({sql_ids(ordered[start:start+50])})'))
    missing = sorted(node_ids - {n['properties']['NODE_ID'] for n in nodes})
    if not original.issubset({str(i) for i in edges}):
        raise ValueError('Source changed or original existing edge IDs were not recovered')
    items = []
    for name, features in [('downstream_drains', list(edges.values())), ('downstream_manholes', nodes)]:
        items.append({'dataset': name, 'status': 'PARTIAL' if frontier or missing else 'DOWNLOADED',
            'source_url': BMC, 'feature_count': len(features), 'unqueried_node_ids': sorted(frontier),
            'missing_node_ids': missing, 'queried_node_count': len(queried),
            'parent_directory': str(input_directory),
            'scope': 'Existing downstream closure from pilot edges; not a complete upstream catchment or verified outfall network.',
            'license': 'BMC copyright; redistribution terms unconfirmed',
            'artifact': save_json(folder, name + '.geojson', {'type':'FeatureCollection','features':features})})
    return items


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--source', choices=['bmc', 'osm', 'weather', 'bmc-node-references', 'bmc-downstream'], required=True)
    parser.add_argument('--input-directory', type=Path)
    args = parser.parse_args()
    now = datetime.now(timezone.utc)
    folder = ROOT / 'data/raw/pilot_downloads' / (now.strftime('%Y%m%dT%H%M%S%fZ') + '_' + args.source)
    folder.mkdir(parents=True, exist_ok=False)
    bounds = pilot_bounds()
    try:
        if args.source in ['bmc-node-references', 'bmc-downstream']:
            if args.input_directory is None:
                raise ValueError('--input-directory is required for node references')
            function = download_downstream if args.source == 'bmc-downstream' else download_node_references
            items = function(folder, args.input_directory)
        else:
            items = {'bmc': download_bmc, 'osm': download_osm, 'weather': download_weather}[args.source](folder, bounds)
    except (requests.RequestException, ValueError, KeyError) as exc:
        items = [{'dataset': args.source, 'status': 'FAILED', 'error': str(exc)}]
    report = {'retrieved_at': now.isoformat(), 'bbox_wgs84': bounds, 'datasets': items}
    save_json(folder, 'manifest.json', report)
    print(json.dumps(report, indent=2), flush=True)
    return 1 if any(i['status'] == 'FAILED' for i in items) else 0


if __name__ == '__main__':
    sys.exit(main())
