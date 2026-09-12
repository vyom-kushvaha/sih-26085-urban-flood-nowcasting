"""Hydraulics-independent network tracing; terminal nodes are not assumed outfalls."""
from collections import deque
from typing import Annotated, Literal

from pydantic import BaseModel, ConfigDict, Field, model_validator

Identifier = Annotated[str, Field(min_length=1, max_length=100)]


class TopologyEdge(BaseModel):
    model_config = ConfigDict(extra='forbid')
    id: Identifier
    upstream: Identifier
    downstream: Identifier


class TopologyRequest(BaseModel):
    model_config = ConfigDict(extra='forbid')
    node_ids: list[Identifier] = Field(min_length=1, max_length=5000)
    edges: list[TopologyEdge] = Field(max_length=10000)
    confirmed_outfall_ids: list[Identifier] = Field(default_factory=list, max_length=5000)
    start_node: Identifier | None = None
    direction: Literal['upstream', 'downstream'] = 'downstream'

    @model_validator(mode='after')
    def references(self):
        nodes = set(self.node_ids)
        if len(nodes) != len(self.node_ids):
            raise ValueError('Duplicate node IDs')
        if len({e.id for e in self.edges}) != len(self.edges):
            raise ValueError('Duplicate edge IDs')
        if any(e.upstream not in nodes or e.downstream not in nodes for e in self.edges):
            raise ValueError('Edge endpoints must reference supplied nodes')
        if not set(self.confirmed_outfall_ids).issubset(nodes):
            raise ValueError('Confirmed outfalls must reference supplied nodes')
        if self.start_node is not None and self.start_node not in nodes:
            raise ValueError('Trace start node not found')
        return self


def inspect_topology(request: TopologyRequest):
    nodes = set(request.node_ids)
    outgoing = {n: [] for n in nodes}
    incoming = {n: [] for n in nodes}
    for edge in request.edges:
        outgoing[edge.upstream].append((edge.downstream, edge.id))
        incoming[edge.downstream].append((edge.upstream, edge.id))

    def walk(seeds, adjacency):
        visited, edge_ids = set(seeds), set()
        queue = deque(sorted(visited))
        while queue:
            for other, edge_id in adjacency[queue.popleft()]:
                edge_ids.add(edge_id)
                if other not in visited:
                    visited.add(other)
                    queue.append(other)
        return visited, edge_ids

    remaining = set(nodes)
    undirected = {n: outgoing[n] + incoming[n] for n in nodes}
    components = []
    while remaining:
        members, edges = walk([min(remaining)], undirected)
        remaining -= members
        components.append({'node_ids': sorted(members), 'edge_count': len(edges)})
    indegree = {n: len(incoming[n]) for n in nodes}
    queue = deque(sorted(n for n in nodes if not indegree[n]))
    while queue:
        for other, _ in outgoing[queue.popleft()]:
            indegree[other] -= 1
            if indegree[other] == 0:
                queue.append(other)
    unresolved_cycle = sorted(n for n in nodes if indegree[n] > 0)
    terminals = sorted(n for n in nodes if incoming[n] and not outgoing[n])
    reaches, _ = walk(request.confirmed_outfall_ids, incoming)
    outfall_conflicts = sorted(n for n in request.confirmed_outfall_ids if outgoing[n])
    trace = None
    if request.start_node is not None:
        traced_nodes, traced_edges = walk([request.start_node], outgoing if request.direction == 'downstream' else incoming)
        trace = {'start_node': request.start_node, 'direction': request.direction,
                 'node_ids': sorted(traced_nodes), 'edge_ids': sorted(traced_edges),
                 'confirmed_outfall_ids': sorted(traced_nodes & set(request.confirmed_outfall_ids)),
                 'terminal_node_ids': sorted(traced_nodes & set(terminals))}
    return {'component_count': len(components), 'components': components,
            'node_count': len(nodes), 'edge_count': len(request.edges),
            'isolated_node_ids': sorted(n for n in nodes if not outgoing[n] and not incoming[n]),
            'terminal_node_ids': terminals,
            'unconfirmed_terminal_node_ids': sorted(set(terminals) - set(request.confirmed_outfall_ids)),
            'branch_node_ids': sorted(n for n in nodes if len(outgoing[n]) > 1),
            'has_directed_cycle': bool(unresolved_cycle),
            'cycle_or_cycle_downstream_node_ids': unresolved_cycle,
            'nodes_without_confirmed_outfall_path': sorted(nodes - reaches),
            'outfalls_with_outgoing_edges': outfall_conflicts, 'trace': trace,
            'operational_ready': False,
            'limitations': ['Topology uses supplied IDs, not geometric snapping or surveyed flow verification.',
                'Terminals may be extract boundaries or missing links; they are not automatically outfalls.',
                'Outfall classification is caller-supplied; no datum, capacity or flood prediction validation.']}
