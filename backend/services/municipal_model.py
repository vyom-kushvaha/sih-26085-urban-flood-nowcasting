"""Compile reviewed municipal records into the hydraulic graph contract.

Unreviewed metadata is returned as actionable errors; no artificial outfalls,
section codes, ground offsets or roughness values are supplied automatically.
"""
from typing import Annotated, Literal
from pydantic import BaseModel, ConfigDict, Field, ValidationError
from backend.services.drainage_graph import DrainGraph, inspect_graph


class MunicipalModelConfig(BaseModel):
    model_config = ConfigDict(extra='forbid', allow_inf_nan=False)
    edge_ids: list[str] | None = Field(default=None, max_length=10000)
    vertical_datum: str = Field(default='', max_length=200)
    datum_evidence: str = Field(default='', max_length=2000)
    asset_evidence: str = Field(default='', max_length=2000)
    section_evidence: str = Field(default='', max_length=2000)
    parameter_evidence: str = Field(default='', max_length=2000)
    shape_mapping: dict[str, Literal['circular','rectangular_closed','rectangular_open']] = Field(default_factory=dict)
    roughness_by_shape: dict[str, Annotated[float, Field(gt=0, le=1)]] = Field(default_factory=dict)
    node_roles: dict[str, Literal['inlet','manhole','junction','outfall']] = Field(default_factory=dict)
    role_evidence: dict[str, str] = Field(default_factory=dict)
    node_bottom_m: dict[str, float] = Field(default_factory=dict)
    alignment_tolerance_m: float = Field(default=5, ge=.01, le=50)


class MunicipalCompileRequest(BaseModel):
    """A normalized municipal extract plus reviewed survey configuration."""
    model_config = ConfigDict(extra='forbid')
    data: dict
    config: MunicipalModelConfig


def compile_municipal(data, config: MunicipalModelConfig):
    issues = []
    def issue(code, asset_id=None):
        issues.append({'code': code, 'asset_id': asset_id})
    for field in ['vertical_datum','datum_evidence','asset_evidence','section_evidence','parameter_evidence']:
        if not getattr(config, field).strip():
            issue('MISSING_' + field.upper())
    all_edges = {e['id']:e for e in data['edges']}
    if len(all_edges) != len(data['edges']):
        issue('DUPLICATE_SOURCE_EDGE_IDS')
    selected = set(config.edge_ids) if config.edge_ids is not None else set(all_edges)
    if not selected:
        issue('EMPTY_EDGE_SELECTION')
    for key in sorted(selected - set(all_edges)):
        issue('UNKNOWN_EDGE', key)
    edges = [all_edges[k] for k in sorted(selected & set(all_edges))]
    used = {e[k] for e in edges for k in ['upstream','downstream']}
    source_nodes = {n['id']:n for n in data['nodes']}
    if len(source_nodes) != len(data['nodes']):
        issue('DUPLICATE_SOURCE_NODE_IDS')
    for key in sorted((set(config.node_roles) | set(config.node_bottom_m) | set(config.role_evidence)) - used):
        issue('CONFIG_NODE_NOT_IN_SELECTION', key)
    nodes_out, edges_out = [], []
    for key in sorted(used):
        n = source_nodes.get(key)
        if not n:
            issue('MISSING_NODE', key)
            continue
        role = config.node_roles.get(key, 'manhole')
        if role != 'manhole' and not config.role_evidence.get(key, '').strip():
            issue('MISSING_ROLE_EVIDENCE', key)
        bottom = config.node_bottom_m.get(key)
        if bottom is None:
            issue('MISSING_NODE_BOTTOM', key)
        geometry = n.get('geometry') or {}
        coords = geometry.get('coordinates', [])
        if geometry.get('type') != 'Point' or len(coords) != 2:
            issue('INVALID_NODE_GEOMETRY', key)
            continue
        nodes_out.append({'id':key, 'kind':role, 'lon':coords[0], 'lat':coords[1],
            'ground_m':n.get('ground_level_source_units'), 'invert_m':bottom,
            'source':'BMC public GIS; reviewed configuration', 'quality':'DERIVED'})
    if not any(n['kind'] == 'inlet' for n in nodes_out):
        issue('NO_CONFIRMED_INLET')
    if not any(n['kind'] == 'outfall' for n in nodes_out):
        issue('NO_CONFIRMED_OUTFALL')
    for e in edges:
        shape = config.shape_mapping.get(e['shape'])
        if not shape:
            issue('UNMAPPED_SECTION_' + str(e['shape']), e['id'])
            continue
        # Arch records cannot be converted into a fictitious supported section.
        if e['shape'] == 'ARCH':
            issue('UNSUPPORTED_ARCH_SECTION', e['id'])
            continue
        geometry = e.get('geometry') or {}
        if geometry.get('type') != 'LineString':
            issue('UNSUPPORTED_EDGE_GEOMETRY', e['id'])
            continue
        roughness = config.roughness_by_shape.get(e['shape'])
        if roughness is None:
            issue('MISSING_ROUGHNESS', e['id'])
        output = {k:e[k] for k in ['id','upstream','downstream','length_m','upstream_invert_m','downstream_invert_m']}
        output.update(shape=shape, manning_n=roughness, coordinates=geometry.get('coordinates'),
                      source='BMC public GIS; reviewed configuration', quality='DERIVED')
        if shape == 'circular':
            if e.get('width_m') != e.get('height_m'):
                issue('CIRCULAR_DIMENSIONS_DIFFER', e['id'])
            output['diameter_m'] = e.get('width_m')
        else:
            output.update(width_m=e.get('width_m'), height_m=e.get('height_m'))
        edges_out.append(output)
    result = {'status':'REVIEW_REQUIRED', 'operational_ready':False, 'issues':issues,
              'selected_edge_count':len(edges), 'selected_node_count':len(used), 'graph':None,
              'limitations':['Configuration evidence is caller-supplied, not independently certified.',
                  'Graph acceptance does not validate terrain, hydraulics or forecast accuracy.']}
    if issues:
        return result
    try:
        graph = DrainGraph(vertical_datum=config.vertical_datum, nodes=nodes_out, edges=edges_out,
                           alignment_tolerance_m=config.alignment_tolerance_m)
    except ValidationError as exc:
        issue('INVALID_GRAPH_DIMENSIONS_OR_LEVELS')
        result['validation_errors'] = exc.errors(include_url=False, include_context=False, include_input=False)
        return result
    qa = inspect_graph(graph)
    result['qa'] = qa
    if not qa['valid']:
        issue('GRAPH_QA_FAILED')
        return result
    result.update(status='GRAPH_VALIDATED_FOR_MODEL_REVIEW', graph=graph.model_dump(mode='json'))
    return result
