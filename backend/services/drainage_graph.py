"""Directed gravity-drain graph contract and non-mutating inspection.

Elevations share the supplied vertical datum; all lengths are metres.
This validates an input network, not its hydraulic performance or survey accuracy.
"""
from collections import deque
from typing import Annotated, Literal
from pyproj import Geod

from pydantic import BaseModel, ConfigDict, Field, model_validator


class Asset(BaseModel):
    model_config = ConfigDict(extra='forbid', allow_inf_nan=False)
    id: str = Field(min_length=1, max_length=100)
    source: str = Field(min_length=1, max_length=500)
    quality: Literal['OBSERVED', 'DERIVED', 'ESTIMATED', 'SIMULATED']


class DrainNode(Asset):
    kind: Literal['inlet', 'manhole', 'junction', 'outfall']
    lat: float = Field(ge=-90, le=90)
    lon: float = Field(ge=-180, le=180)
    ground_m: float
    invert_m: float

    @model_validator(mode='after')
    def elevations(self):
        if self.invert_m > self.ground_m:
            raise ValueError('Node invert must not exceed ground elevation')
        return self


class DrainEdge(Asset):
    upstream: str
    downstream: str
    length_m: float = Field(gt=0)
    diameter_m: float | None = Field(default=None, gt=0)
    width_m: float | None = Field(default=None, gt=0)
    height_m: float | None = Field(default=None, gt=0)
    manning_n: float = Field(gt=0, le=1)
    shape: Literal['circular', 'rectangular_closed', 'rectangular_open'] = 'circular'
    upstream_invert_m: float | None = None
    downstream_invert_m: float | None = None
    coordinates: list[tuple[Annotated[float, Field(ge=-180, le=180)],
                            Annotated[float, Field(ge=-90, le=90)]]] | None = Field(default=None, min_length=2, max_length=10000)

    @model_validator(mode='after')
    def section_dimensions(self):
        if (self.upstream_invert_m is None) != (self.downstream_invert_m is None):
            raise ValueError('Supply both pipe endpoint inverts or neither')
        if self.shape == 'circular':
            if self.diameter_m is None or self.width_m is not None or self.height_m is not None:
                raise ValueError('Circular sections require diameter_m only')
        elif self.width_m is None or self.height_m is None or self.diameter_m is not None:
            raise ValueError('Rectangular sections require width_m and height_m only')
        return self


def edge_inverts(edge, nodes):
    """Legacy networks use node bottoms; surveyed networks preserve pipe offsets."""
    return (edge.upstream_invert_m if edge.upstream_invert_m is not None else nodes[edge.upstream].invert_m,
            edge.downstream_invert_m if edge.downstream_invert_m is not None else nodes[edge.downstream].invert_m)


class DrainGraph(BaseModel):
    model_config = ConfigDict(extra='forbid', allow_inf_nan=False)
    vertical_datum: str = Field(min_length=1, max_length=200)
    nodes: list[DrainNode] = Field(min_length=1, max_length=5000)
    edges: list[DrainEdge] = Field(max_length=10000)
    alignment_tolerance_m: float = Field(default=5, ge=.01, le=50)

    @model_validator(mode='after')
    def alignment_budget(self):
        if sum(len(e.coordinates or []) for e in self.edges) > 200000:
            raise ValueError('Graph exceeds 200000 alignment coordinates')
        return self


def inspect_graph(graph: DrainGraph) -> dict:
    errors = []
    nodes = {n.id: n for n in graph.nodes}
    if len(nodes) != len(graph.nodes):
        errors.append('Duplicate node IDs')
    if len({e.id for e in graph.edges}) != len(graph.edges):
        errors.append('Duplicate edge IDs')
    outgoing = {n: [] for n in nodes}
    reverse = {n: [] for n in nodes}
    indegree = {n: 0 for n in nodes}
    slopes = {}
    features = []
    alignment = {}
    geod = Geod(ellps='WGS84')
    for node in graph.nodes:
        features.append({'type': 'Feature', 'id': 'node:' + node.id,
                         'geometry': {'type': 'Point', 'coordinates': [node.lon, node.lat]},
                         'properties': {**node.model_dump(), 'asset_type': 'node'}})
    for edge in graph.edges:
        if edge.upstream not in nodes or edge.downstream not in nodes:
            errors.append(f'{edge.id}: missing endpoint reference')
            continue
        a, b = nodes[edge.upstream], nodes[edge.downstream]
        outgoing[a.id].append(b.id)
        reverse[b.id].append(a.id)
        indegree[b.id] += 1
        upstream_invert, downstream_invert = edge_inverts(edge, nodes)
        for node, level in [(a, upstream_invert), (b, downstream_invert)]:
            if not node.invert_m <= level <= node.ground_m:
                errors.append(f'{edge.id}: pipe invert outside node bottom/ground range at {node.id}')
        slope = (upstream_invert - downstream_invert) / edge.length_m
        slopes[edge.id] = slope
        if slope <= 0:
            errors.append(f'{edge.id}: non-positive gravity slope')
        if a.kind == 'outfall':
            errors.append(f'{edge.id}: outfall has outgoing conduit')
        coordinates = edge.coordinates or [(a.lon, a.lat), (b.lon, b.lat)]
        if edge.coordinates:
            residuals = [abs(geod.inv(node.lon, node.lat, *point)[2])
                         for node, point in [(a, coordinates[0]), (b, coordinates[-1])]]
            alignment[edge.id] = {'upstream_distance_m': residuals[0], 'downstream_distance_m': residuals[1]}
            if max(residuals) > graph.alignment_tolerance_m:
                errors.append(f'{edge.id}: provided alignment endpoints exceed node tolerance')
        features.append({'type': 'Feature', 'id': 'edge:' + edge.id,
                         'geometry': {'type': 'LineString', 'coordinates': coordinates},
                         'properties': {**edge.model_dump(), 'asset_type': 'edge', 'slope': slope,
                                        'invert_source': 'PIPE_ENDPOINTS' if edge.upstream_invert_m is not None else 'NODE_BOTTOMS',
                                        'geometry_quality': 'PROVIDED_ALIGNMENT' if edge.coordinates else 'DERIVED_ENDPOINT_CHORD'}})
    queue = deque(n for n, count in indegree.items() if count == 0)
    visited = 0
    while queue:
        n = queue.popleft()
        visited += 1
        for other in outgoing[n]:
            indegree[other] -= 1
            if indegree[other] == 0:
                queue.append(other)
    if visited != len(nodes):
        errors.append('Directed cycle detected; gravity DAG required')
    # Reverse traversal identifies every asset that can reach an outfall.
    reaches = {n.id for n in graph.nodes if n.kind == 'outfall'}
    queue = deque(reaches)
    while queue:
        for other in reverse[queue.popleft()]:
            if other not in reaches:
                reaches.add(other)
                queue.append(other)
    stranded = sorted(set(nodes) - reaches)
    if stranded:
        errors.append('Nodes without an outfall path: ' + ', '.join(stranded))
    remaining = set(nodes)
    components = 0
    while remaining:
        components += 1
        queue = deque([remaining.pop()])
        while queue:
            n = queue.popleft()
            for other in outgoing[n] + reverse[n]:
                if other in remaining:
                    remaining.remove(other)
                    queue.append(other)
    return {'valid': not errors, 'errors': errors, 'component_count': components,
            'node_count': len(graph.nodes), 'edge_count': len(graph.edges),
            'inlets_reaching_outfall': sorted(n.id for n in graph.nodes if n.kind == 'inlet' and n.id in reaches),
            'sources': sorted({a.source for a in [*graph.nodes, *graph.edges]}),
            'qualities': sorted({a.quality for a in [*graph.nodes, *graph.edges]}),
            'vertical_datum': graph.vertical_datum, 'edge_slopes': slopes,
            'alignment_checks': alignment, 'alignment_tolerance_m': graph.alignment_tolerance_m,
            'assumptions': ['Gravity-directed acyclic network; circular or explicitly open/closed rectangular sections.',
                            'Pipe endpoint inverts override node bottoms for slope; all levels share the declared datum.',
                            'Provided alignment is preserved and endpoint-checked; absent alignment uses a labelled endpoint chord.',
                            'Topology QA does not validate terrain, survey accuracy or flood safety.'],
            'geojson': {'type': 'FeatureCollection', 'features': features}}
