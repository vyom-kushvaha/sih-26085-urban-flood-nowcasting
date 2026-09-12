from fastapi.testclient import TestClient

from backend.main import app


def extract():
    return {
        'nodes': [
            {'id': 'A', 'geometry': {'type': 'Point', 'coordinates': [72.8, 19.0]}, 'ground_level_source_units': 6},
            {'id': 'B', 'geometry': {'type': 'Point', 'coordinates': [72.801, 19.0]}, 'ground_level_source_units': 5},
        ],
        'edges': [{
            'id': 'AB', 'upstream': 'A', 'downstream': 'B', 'shape': 'CIRC',
            'width_m': 1, 'height_m': 1, 'length_m': 100,
            'upstream_invert_m': 5, 'downstream_invert_m': 4,
            'geometry': {'type': 'LineString', 'coordinates': [[72.8, 19.0], [72.801, 19.0]]},
        }],
    }


def configuration():
    return {
        'vertical_datum': 'THD', 'datum_evidence': 'survey datum',
        'asset_evidence': 'as-built register', 'section_evidence': 'CIRC means circular',
        'parameter_evidence': 'design standard', 'shape_mapping': {'CIRC': 'circular'},
        'roughness_by_shape': {'CIRC': .013},
        'node_roles': {'A': 'inlet', 'B': 'outfall'},
        'role_evidence': {'A': 'survey', 'B': 'outfall survey'},
        'node_bottom_m': {'A': 5, 'B': 4},
    }


def test_compile_endpoint_requires_evidence_then_returns_review_graph():
    with TestClient(app) as client:
        incomplete = client.post('/api/v1/drainage/municipal-model/compile',
            json={'data': extract(), 'config': {}})
        assert incomplete.status_code == 200
        assert incomplete.json()['operational_ready'] is False

        response = client.post('/api/v1/drainage/municipal-model/compile',
            json={'data': extract(), 'config': configuration()})
    assert response.status_code == 200
    body = response.json()
    assert body['status'] == 'GRAPH_VALIDATED_FOR_MODEL_REVIEW'
    assert body['graph']['vertical_datum'] == 'THD'


def test_compile_endpoint_rejects_malformed_extract():
    with TestClient(app) as client:
        response = client.post('/api/v1/drainage/municipal-model/compile',
            json={'data': {}, 'config': configuration()})
    assert response.status_code == 422
