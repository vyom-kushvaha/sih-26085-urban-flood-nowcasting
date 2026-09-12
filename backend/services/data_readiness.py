"""Read-only municipal download integrity and readiness reporting."""
from datetime import datetime, timezone
import hashlib
import json
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parents[2]


def inspect_artifact(item, root):
    result = {'dataset': item.get('dataset', 'unknown'), 'status': 'INVALID_MANIFEST'}
    try:
        asset = item['artifact']
        path = (root / asset['path']).resolve()
        allowed = (root / 'data/raw/pilot_downloads').resolve()
        if not path.is_relative_to(allowed):
            return result
        if not path.is_file():
            return {**result, 'status': 'MISSING'}
        if path.stat().st_size != asset['bytes']:
            return {**result, 'status': 'SIZE_MISMATCH'}
        digest = hashlib.sha256()
        with path.open('rb') as handle:
            for block in iter(lambda: handle.read(1024 * 1024), b''):
                digest.update(block)
        result['status'] = 'VERIFIED' if digest.hexdigest() == asset['sha256'] else 'CHECKSUM_MISMATCH'
        result['feature_count'] = item.get('feature_count')
    except (KeyError, TypeError, ValueError):
        pass
    except OSError:
        result['status'] = 'UNREADABLE'
    return result


def data_readiness():
    report_path = PROJECT_ROOT / 'data/pilot/municipal_qa.json'
    base = {'checked_at': datetime.now(timezone.utc).isoformat(),
            'operational_ready': False, 'scope': 'MUNICIPAL_PILOT_DATA',
            'limitations': ['File integrity does not verify survey accuracy or present physical conditions.',
                            'Terrain, radar freshness and model calibration are not verified by this endpoint.']}
    try:
        report = json.loads(report_path.read_text(encoding='utf-8'))
        items = report['artifacts']
        if not isinstance(items, list) or not items:
            raise ValueError('Empty manifest')
        artifacts = [inspect_artifact(item, PROJECT_ROOT) for item in items]
        expected = {'storm_manholes', 'storm_drains', 'contours_20cm', 'supplementary_manholes'}
        complete = expected.issubset({a['dataset'] for a in artifacts if a['status'] == 'VERIFIED'})
        return {**base, 'status': 'REQUIRES_VALIDATION' if complete else 'DATA_INCOMPLETE',
                'download_integrity_ok': complete and all(a['status'] == 'VERIFIED' for a in artifacts),
                'retrieved_at': report.get('retrieved_at'), 'counts': report.get('counts', {}),
                'counts_basis': 'RECORDED_IMPORT_AUDIT', 'artifacts': artifacts,
                'topology': report.get('topology'),
                'blockers': report.get('blockers', []),
                'quality_issues': {k: len(report.get(k, [])) for k in [
                    'missing_node_ids', 'duplicate_node_ids', 'invalid_dimension_edge_ids',
                    'missing_invert_edge_ids', 'adverse_slope_edge_ids', 'flat_slope_edge_ids']}}
    except (OSError, ValueError, KeyError, TypeError, AttributeError):
        return {**base, 'status': 'AUDIT_UNAVAILABLE', 'download_integrity_ok': False,
                'blockers': ['Generate the municipal import audit and supply its source downloads.']}
