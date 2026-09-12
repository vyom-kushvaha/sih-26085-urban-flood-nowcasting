"""Prepare downloaded BMC data; outputs are survey inputs, not a runnable model."""
import argparse
import hashlib
import json
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
from backend.services.municipal_import import prepare_municipal
from backend.services.network_topology import TopologyRequest, inspect_topology


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('download_directory', type=Path)
    parser.add_argument('--report', type=Path, required=True)
    parser.add_argument('--supplement', type=Path)
    parser.add_argument('--downstream', type=Path,
                        help='Completed bmc-downstream acquisition to merge with the AOI network.')
    args = parser.parse_args()
    folder = args.download_directory
    manifest = json.loads((folder / 'manifest.json').read_text())
    contents = []
    for name in ['storm_manholes', 'storm_drains', 'contours_20cm']:
        item = next(d for d in manifest['datasets'] if d['dataset'] == name)
        if item['status'] != 'DOWNLOADED':
            raise ValueError(f'{name} is not a completed download')
        raw = (folder / f'{name}.geojson').read_bytes()
        if hashlib.sha256(raw).hexdigest() != item['artifact']['sha256']:
            raise ValueError(f'{name} checksum mismatch')
        contents.append(json.loads(raw))
    if args.supplement:
        supplement_manifest = json.loads((args.supplement / 'manifest.json').read_text())
        item = supplement_manifest['datasets'][0]
        raw = (args.supplement / 'supplementary_manholes.geojson').read_bytes()
        if hashlib.sha256(raw).hexdigest() != item['artifact']['sha256']:
            raise ValueError('Supplement checksum mismatch')
        contents[0]['features'].extend(json.loads(raw)['features'])
        manifest['datasets'].append(item)
    if args.downstream:
        downstream_manifest = json.loads((args.downstream / 'manifest.json').read_text())
        downstream = {item['dataset']: item for item in downstream_manifest['datasets']}
        required = {'downstream_drains', 'downstream_manholes'}
        if not required.issubset(downstream):
            raise ValueError('Downstream manifest is missing drainage or manhole artifacts')
        for dataset in sorted(required):
            item = downstream[dataset]
            if item['status'] != 'DOWNLOADED':
                raise ValueError(f'{dataset} is not a completed downstream download')
            raw = (args.downstream / (dataset + '.geojson')).read_bytes()
            if hashlib.sha256(raw).hexdigest() != item['artifact']['sha256']:
                raise ValueError(f'{dataset} checksum mismatch')
            target = 1 if dataset == 'downstream_drains' else 0
            merged = {feature['properties']['OBJECTID']: feature for feature in contents[target]['features']}
            for feature in json.loads(raw)['features']:
                identifier = feature['properties']['OBJECTID']
                if identifier in merged and merged[identifier] != feature:
                    raise ValueError(f'Conflicting {dataset} feature {identifier}')
                merged[identifier] = feature
            contents[target]['features'] = list(merged.values())
            manifest['datasets'].append(item)
    result = prepare_municipal(*contents)
    if args.downstream:
        result['qa']['downstream_extension'] = {
            'status': 'DOWNLOADED_NOT_OUTFALL_VALIDATED',
            'scope': 'Closure follows published existing links downstream from the provisional AOI; it is not a complete catchment or confirmed outfall network.',
            'drain_count': len(contents[1]['features']),
            'manhole_count': len(contents[0]['features']),
        }
    topology_input = {'node_ids': [n['id'] for n in result['nodes']],
        'edges': [{k:e[k] for k in ['id','upstream','downstream']} for e in result['edges']]}
    try:
        topology = inspect_topology(TopologyRequest(**topology_input))
        (folder / 'topology_request.json').write_text(json.dumps(topology_input, indent=2))
        (folder / 'topology_report.json').write_text(json.dumps(topology, indent=2))
        result['qa']['topology'] = {k:topology[k] for k in ['component_count', 'has_directed_cycle']}
        result['qa']['topology'].update({k:len(topology[k]) for k in [
            'isolated_node_ids', 'terminal_node_ids', 'unconfirmed_terminal_node_ids',
            'branch_node_ids', 'nodes_without_confirmed_outfall_path']})
    except ValueError as exc:
        result['qa']['topology'] = {'status': 'INVALID_REFERENCES', 'detail': str(exc)}
    (folder / 'normalized_existing_drainage.json').write_text(json.dumps(result, indent=2, allow_nan=False))
    report = {**result['qa'], 'retrieved_at': manifest['retrieved_at'],
              'artifacts': [{k: v for k, v in item.items() if k != 'field_coverage'} for item in manifest['datasets']]}
    args.report.write_text(json.dumps(report, indent=2, allow_nan=False))
    print(json.dumps({k: v for k, v in report.items() if k != 'artifacts'}, indent=2))


if __name__ == '__main__':
    main()
