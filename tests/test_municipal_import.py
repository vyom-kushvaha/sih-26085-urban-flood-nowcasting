from backend.services.municipal_import import prepare_municipal
from scripts.acquire_pilot_data import verify_feature_ids
import pytest


def collection(properties):
    return {'features': [{'properties': p, 'geometry': None} for p in properties]}


def test_proposed_assets_excluded_and_millimetres_converted():
    base = {'OBJECTID': 1, 'USER_TEXT2': 'Existing', 'US_NODE_ID': 'A', 'DS_NODE_ID': 'B',
            'CONDUIT_WI': 900, 'CONDUIT_HE': 1200, 'CONDUIT_LE': 20,
            'US_INVERT': 25, 'DS_INVERT': 24, 'SHAPE_1': 'ARCH'}
    result = prepare_municipal(collection([{'NODE_ID': 'A', 'GROUND_LEV': 26}]),
        collection([base, dict(base, OBJECTID=2, USER_TEXT2='Proposal')]), collection([]))
    assert len(result['edges']) == 1
    assert result['edges'][0]['width_m'] == .9
    assert result['edges'][0]['height_m'] == 1.2
    assert result['edges'][0]['shape'] == 'ARCH'
    assert result['edges'][0]['roughness'] is None
    assert result['qa']['missing_node_ids'] == ['B']
    assert result['qa']['operational_ready'] is False


def test_invalid_dimensions_and_inverts_are_reported():
    result = prepare_municipal(collection([]), collection([{'OBJECTID': 3,
        'USER_TEXT2': 'Existing', 'CONDUIT_WI': 0, 'CONDUIT_HE': None,
        'CONDUIT_LE': -1, 'US_INVERT': 'nan'}]), collection([{'ELEVATION': None}]))
    assert result['qa']['invalid_dimension_edge_ids'] == ['3']
    assert result['qa']['missing_invert_edge_ids'] == ['3']
    assert result['qa']['missing_contour_elevations'] == 1


@pytest.mark.parametrize('ids', [[1], [1, 1], [1, 3]])
def test_partial_duplicate_and_wrong_download_ids_rejected(ids):
    with pytest.raises(ValueError):
        verify_feature_ids(collection([{'ID': i} for i in ids])['features'], [1, 2], 'ID')
