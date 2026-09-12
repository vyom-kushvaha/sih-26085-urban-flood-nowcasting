"""Conservative lumped-storage prototype, not a dynamic-wave pipe solver."""
import math
from typing import Annotated
from pydantic import BaseModel, ConfigDict, Field
from backend.services.drainage_capacity import CapacityRequest, Discharge, calculate_capacity
from backend.services.drainage_graph import edge_inverts

Positive = Annotated[float, Field(gt=0, le=1e6, allow_inf_nan=False)]
Level = Annotated[float, Field(ge=-10000, le=10000, allow_inf_nan=False)]


class SimulationRequest(CapacityRequest):
    model_config = ConfigDict(extra='forbid')
    duration_s: int = Field(default=300, ge=0, le=10800)
    step_s: float = Field(default=1, gt=0, le=10, allow_inf_nan=False)
    storage_area_m2: dict[str, Positive]
    initial_depth_m: dict[str, Annotated[float, Field(ge=0, le=1000, allow_inf_nan=False)]] = Field(default_factory=dict)
    inflow_m3_s: dict[str, Discharge] = Field(default_factory=dict)
    outfall_head_m: dict[str, Level]


def simulate(request: SimulationRequest) -> dict:
    capacity = calculate_capacity(request)
    nodes = {n.id: n for n in request.graph.nodes}
    stores = {key for key, n in nodes.items() if n.kind != 'outfall'}
    outfalls = set(nodes) - stores
    if set(request.storage_area_m2) != stores or set(request.outfall_head_m) != outfalls:
        raise ValueError('Supply storage area for every non-outfall and head for every outfall, exactly')
    if (request.initial_depth_m.keys() | request.inflow_m3_s.keys()) - stores:
        raise ValueError('Initial depths and inflows must reference storage nodes')
    if request.demand_m3_s:
        raise ValueError('Simulation uses node inflow_m3_s, not independent pipe demand_m3_s')
    steps = math.ceil(request.duration_s / request.step_s)
    if steps * max(1, len(nodes) + len(request.graph.edges)) > 2_000_000:
        raise ValueError('Simulation exceeds 2 million asset-steps; reduce domain or duration')
    area = request.storage_area_m2
    volume = {n: area[n] * request.initial_depth_m.get(n, 0) for n in stores}
    limits = {n: area[n] * (nodes[n].ground_m - nodes[n].invert_m) for n in stores}
    if any(volume[n] > limits[n] for n in stores):
        raise ValueError('Initial depth exceeds ground; supply surface water through a future coupling model')
    caps = {e['edge_id']: e['effective_capacity_m3_s'] for e in capacity['edges']}
    degree = dict.fromkeys(nodes, 0)
    for edge in request.graph.edges:
        degree[edge.upstream] += 1
        degree[edge.downstream] += 1
    spill = dict.fromkeys(stores, 0.0)
    routed = dict.fromkeys(caps, 0.0)
    initial = sum(volume.values())
    supplied = discharged = elapsed = 0.0
    frames = []

    def snapshot():
        return {'time_s': elapsed, 'nodes': {n: {'storage_m3': volume[n],
                'head_m': nodes[n].invert_m + volume[n] / area[n],
                'surcharge_total_m3': spill[n]} for n in sorted(stores)}}

    frames.append(snapshot())
    for step in range(steps):
        dt = min(request.step_s, request.duration_s - elapsed)
        for n in stores:
            addition = request.inflow_m3_s.get(n, 0) * dt
            volume[n] += addition
            supplied += addition
        head = {n: nodes[n].invert_m + volume[n] / area[n] for n in stores}
        head.update(request.outfall_head_m)
        proposals = {}
        outgoing = dict.fromkeys(stores, 0.0)
        for edge in request.graph.edges:
            a, b = edge.upstream, edge.downstream
            upstream_invert, downstream_invert = edge_inverts(edge, nodes)
            difference = max(0, head[a] - max(head[b], downstream_invert))
            above_inlet = max(0, head[a] - upstream_invert) * area[a]
            # Limit transfer to head equalisation as well as nominal gravity capacity.
            compliance = 1 / area[a] + (1 / area[b] if b in stores else 0)
            amount = min(caps[edge.id] * dt, above_inlet / max(1, degree[a]),
                         difference / compliance / max(degree[a], degree[b]))
            proposals[edge.id] = amount
            outgoing[a] += amount
        # Shared donor/receiver scaling avoids negative storage and branch overshoot.
        available = volume.copy()
        changes = dict.fromkeys(stores, 0.0)
        for edge in request.graph.edges:
            a, b = edge.upstream, edge.downstream
            scale = min(1, available[a] / outgoing[a]) if outgoing[a] else 1
            amount = proposals[edge.id] * scale
            changes[a] -= amount
            if b in stores:
                changes[b] += amount
            else:
                discharged += amount
            routed[edge.id] += amount
        for n in stores:
            volume[n] += changes[n]
            excess = max(0, volume[n] - limits[n])
            volume[n] -= excess
            spill[n] += excess
        elapsed = min(request.duration_s, elapsed + dt)
        if (step + 1) % max(1, math.ceil(steps / 120)) == 0 or step == steps - 1:
            frames.append(snapshot())
    residual = initial + supplied - sum(volume.values()) - discharged - sum(spill.values())
    return {'model': 'LUMPED_STORAGE_PROTOTYPE', 'output_quality': 'MODEL_OUTPUT',
            'input_qualities': capacity['input_qualities'], 'frames': frames,
            'edge_transferred_m3': routed,
            'balance': {'initial_m3': initial, 'inflow_m3': supplied,
                        'final_storage_m3': sum(volume.values()), 'outfall_m3': discharged,
                        'surcharge_m3': sum(spill.values()), 'residual_m3': residual},
            'limitations': ['Fixed outfall head; reverse inflow excluded.',
                            'Endpoint offsets gate available water; entrance losses and partial-depth conduit flow are not resolved.',
                            'Lumped node storage; pipe storage and momentum excluded.',
                            'Surcharge retained in an accounting bucket, not yet returned to terrain.',
                            'Constant node inflows and linear blockage derating; no live forecast certification.']}
