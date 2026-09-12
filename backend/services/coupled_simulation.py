"""One-second operator-split surface/drain exchange prototype."""
import numpy as np
from pydantic import BaseModel, ConfigDict, Field
from backend.services.surface_routing import SurfaceRequest, surface_step
from backend.services.drainage_simulation import SimulationRequest, simulate


class Exchange(BaseModel):
    model_config = ConfigDict(extra='forbid', allow_inf_nan=False)
    row: int = Field(ge=0)
    col: int = Field(ge=0)
    intake_m3_s: float = Field(ge=0, le=100)


class CoupledRequest(BaseModel):
    model_config = ConfigDict(extra='forbid')
    surface: SurfaceRequest
    drainage: SimulationRequest
    exchange: dict[str, Exchange]


def simulate_coupled(request: CoupledRequest):
    s, d = request.surface, request.drainage
    if s.step_s != 1 or d.step_s != 1 or s.duration_s != d.duration_s:
        raise ValueError('Coupled prototype requires matching durations and one-second steps')
    if d.inflow_m3_s or d.demand_m3_s:
        raise ValueError('Coupled inflow comes from surface exchange; external demands/inflows are unsupported')
    # Validate topology, storage and boundary inputs even at T+0.
    initial_drain = simulate(d.model_copy(update={'duration_s': 0}))
    nodes = {n.id: n for n in d.graph.nodes if n.kind != 'outfall'}
    if set(request.exchange) != set(nodes):
        raise ValueError('Map every storage node to a surface cell for surcharge return')
    terrain = np.array(s.elevation_m, dtype=float)
    water = np.array(s.initial_depth_m, dtype=float)
    if s.duration_s * (water.size + len(d.graph.nodes) + len(d.graph.edges)) > 200000:
        raise ValueError('Coupled prototype exceeds 200000 cell/asset-steps')
    cells = []
    for key, link in request.exchange.items():
        if link.row >= water.shape[0] or link.col >= water.shape[1]:
            raise ValueError(f'{key}: exchange cell outside domain')
        if abs(terrain[link.row, link.col] - nodes[key].ground_m) > .01:
            raise ValueError(f'{key}: node ground and surface elevation must agree within 1 cm')
        cells.append((link.row, link.col))
    if len(set(cells)) != len(cells):
        raise ValueError('This prototype supports only one exchange node per cell')
    area = s.cell_size_m ** 2
    runoff = np.array(s.rainfall_mm_hr) / 3600000 * np.array(s.runoff_coefficient)
    depths = {key: d.initial_depth_m.get(key, 0) for key in nodes}
    intake_total = dict.fromkeys(nodes, 0.0)
    return_total = dict.fromkeys(nodes, 0.0)
    initial = float(water.sum() * area) + initial_drain['balance']['initial_m3']
    outflow = 0.0
    history = []
    for second in range(s.duration_s):
        water = surface_step(terrain, water + runoff, s.cell_size_m, s.roughness, 1)
        intake = {}
        for key, link in request.exchange.items():
            cell = (link.row, link.col)
            head_difference = max(0, terrain[cell] + water[cell] - nodes[key].invert_m - depths[key])
            amount = min(water[cell] * area, link.intake_m3_s,
                         head_difference / (1/area + 1/d.storage_area_m2[key]))
            water[cell] -= amount / area
            intake[key] = amount  # one-second interval: m³ numerically equals m³/s
            intake_total[key] += amount
        result = simulate(d.model_copy(update={'duration_s':1, 'initial_depth_m':depths, 'inflow_m3_s':intake}))
        state = result['frames'][-1]['nodes']
        outflow += result['balance']['outfall_m3']
        for key, link in request.exchange.items():
            returned = state[key]['surcharge_total_m3']
            water[link.row, link.col] += returned / area
            return_total[key] += returned
            depths[key] = min(nodes[key].ground_m - nodes[key].invert_m,
                              state[key]['storage_m3'] / d.storage_area_m2[key])
        if second == 0 or second == s.duration_s-1 or (second+1) % max(1,s.duration_s//60) == 0:
            history.append({'time_s':second+1, 'intake_m3':dict(intake_total),
                            'surcharge_returned_m3':dict(return_total)})
    final_surface = float(water.sum() * area)
    final_drain = sum(depths[k] * d.storage_area_m2[k] for k in nodes)
    added = float(runoff.sum() * area * s.duration_s)
    return {'model':'COUPLED_STORAGE_SURFACE_PROTOTYPE', 'output_quality':'MODEL_OUTPUT',
            'depth_m':water.tolist(), 'node_depth_m':depths, 'exchange_history':history,
            'grid':{'crs':s.crs, 'origin_x_m':s.origin_x_m, 'origin_y_m':s.origin_y_m,
                    'cell_size_m':s.cell_size_m, 'row_direction':'negative_y'},
            'source':s.source, 'drainage_input_qualities':initial_drain['input_qualities'],
            'balance':{'initial_m3':initial, 'runoff_m3':added, 'surface_storage_m3':final_surface,
                       'drainage_storage_m3':final_drain, 'outfall_m3':outflow,
                       'residual_m3':initial+added-final_surface-final_drain-outflow},
            'limitations':['Explicit one-second split; convergence/calibration pending.',
                           'Manual cell mapping; CRS and common vertical datum are caller responsibilities.',
                           'Closed surface boundary and fixed outfall heads; no reverse outfall flow.',
                           'Lumped node storage, not a dynamic-wave pressure solver.']}
