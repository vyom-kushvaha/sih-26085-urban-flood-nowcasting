"""SI-unit Manning full-flow reference capacity, not a pressure-flow solver."""
import math
from typing import Annotated

from pydantic import BaseModel, ConfigDict, Field
from backend.services.drainage_graph import DrainGraph, inspect_graph

Percentage = Annotated[float, Field(ge=0, le=100, allow_inf_nan=False)]
Discharge = Annotated[float, Field(ge=0, allow_inf_nan=False)]


class CapacityRequest(BaseModel):
    model_config = ConfigDict(extra='forbid')
    graph: DrainGraph
    blockage_pct: dict[str, Percentage] = Field(default_factory=dict)
    demand_m3_s: dict[str, Discharge] = Field(default_factory=dict)


def calculate_capacity(request: CapacityRequest) -> dict:
    qa = inspect_graph(request.graph)
    if not qa['valid']:
        raise ValueError('Invalid drainage graph: ' + '; '.join(qa['errors']))
    ids = {edge.id for edge in request.graph.edges}
    unknown = (request.blockage_pct.keys() | request.demand_m3_s.keys()) - ids
    if unknown:
        raise ValueError('Unknown edge IDs: ' + ', '.join(sorted(unknown)))
    results = []
    for edge in request.graph.edges:
        slope = qa['edge_slopes'][edge.id]
        try:
            if edge.shape == 'circular':
                area = math.pi * edge.diameter_m ** 2 / 4
                perimeter = math.pi * edge.diameter_m
                basis = 'FULL_CIRCULAR_SECTION'
            else:
                area = edge.width_m * edge.height_m
                perimeter = (2 * (edge.width_m + edge.height_m)
                             if edge.shape == 'rectangular_closed'
                             else edge.width_m + 2 * edge.height_m)
                basis = ('FULL_CLOSED_SECTION' if edge.shape == 'rectangular_closed'
                         else 'BANKFULL_OPEN_SECTION')
            radius = area / perimeter
            velocity = radius ** (2 / 3) * math.sqrt(slope) / edge.manning_n
            capacity = area * velocity
        except (OverflowError, ZeroDivisionError) as exc:
            raise ValueError(f'{edge.id}: hydraulic dimensions exceed numeric range') from exc
        if not all(math.isfinite(v) and v > 0 for v in [area, perimeter, radius, velocity, capacity]):
            raise ValueError(f'{edge.id}: hydraulic dimensions exceed numeric range')
        blockage = request.blockage_pct.get(edge.id, 0)
        effective = capacity * (1 - blockage / 100)
        demand = request.demand_m3_s.get(edge.id)
        ratio = demand / effective if demand is not None and effective > 0 else None
        if ratio is not None and not math.isfinite(ratio):
            raise ValueError(f'{edge.id}: demand ratio exceeds numeric range')
        results.append({
            'edge_id': edge.id, 'slope_m_m': slope, 'area_m2': area,
            'shape': edge.shape, 'wetted_perimeter_m': perimeter, 'capacity_basis': basis,
            'hydraulic_radius_m': radius, 'full_flow_velocity_m_s': velocity,
            'full_flow_capacity_m3_s': capacity, 'blockage_pct': blockage,
            'effective_capacity_m3_s': effective, 'demand_m3_s': demand,
            'demand_capacity_ratio': ratio,
            'excess_demand_m3_s': max(0, demand - effective) if demand is not None else None,
            'status': ('BLOCKED' if effective == 0 else 'NOT_EVALUATED' if demand is None
                       else 'OVER_CAPACITY' if demand > effective else 'WITHIN_CAPACITY'),
            'source': edge.source, 'input_quality': edge.quality,
        })
    return {'edges': results, 'output_quality': 'MODEL_OUTPUT',
            'method': 'Manning SI: Q = A R^(2/3) sqrt(S) / n; R = A / wetted perimeter',
            'assumptions': [
                'Uniform gravity reference at full closed section or bankfull open section; not a depth-dependent flow calculation.',
                'Bed slope approximates energy slope; backwater and pressurisation are not modelled.',
                'Blockage is an estimated linear capacity derating, not a sediment geometry calculation.',
                'Demand is independently supplied per pipe; it is not routed through the network.',
                'Excess demand is not computed surcharge or surface flood volume.'],
            'sources': qa['sources'], 'input_qualities': qa['qualities']}
