"""Bounded conservative surface prototype on a square metre-based grid.

Closed boundary, four neighbours, explicit head-driven exchange. No claim of
validated shallow-water dynamics. Metadata is retained, not independently verified.
"""
import numpy as np
from pydantic import BaseModel, ConfigDict, Field, model_validator


class SurfaceRequest(BaseModel):
    model_config = ConfigDict(extra='forbid', allow_inf_nan=False)
    elevation_m: list[list[float]]
    initial_depth_m: list[list[float]]
    rainfall_mm_hr: list[list[float]]
    runoff_coefficient: list[list[float]]
    cell_size_m: float = Field(ge=.1, le=1000)
    roughness: float = Field(default=.04, ge=.005, le=1)
    duration_s: int = Field(default=60, ge=0, le=10800)
    step_s: float = Field(default=1, ge=.01, le=10)
    crs: str = Field(min_length=1)
    origin_x_m: float
    origin_y_m: float
    source: str = Field(min_length=1)

    @model_validator(mode='after')
    def grids(self):
        try:
            grids = [np.asarray(g, dtype=float) for g in [self.elevation_m,
                     self.initial_depth_m, self.rainfall_mm_hr, self.runoff_coefficient]]
        except ValueError as exc:
            raise ValueError('Grids must be rectangular numeric arrays') from exc
        shape = grids[0].shape
        if len(shape) != 2 or min(shape) < 1 or np.prod(shape) > 10000:
            raise ValueError('Grid must contain 1–10000 cells')
        if any(g.shape != shape or not np.isfinite(g).all() for g in grids):
            raise ValueError('Grids must share shape and contain finite values')
        if any((g < 0).any() for g in grids[1:]) or (grids[3] > 1).any():
            raise ValueError('Depth/rainfall must be nonnegative; runoff must be in [0,1]')
        if (abs(grids[0]) > 10000).any() or (grids[1] > 1000).any() or (grids[2] > 1000).any():
            raise ValueError('Prototype limits: elevation ±10000 m, depth 1000 m, rainfall 1000 mm/hr')
        if np.ceil(self.duration_s / self.step_s) * np.prod(shape) > 2_000_000:
            raise ValueError('Run exceeds 2 million cell-steps')
        return self


def surface_step(elevation, water, cell_size, roughness, dt):
    """Simultaneous edge flux, bounded by donor depth and head equalisation."""
    head = elevation + water
    delta = np.zeros_like(water)
    for axis in (0, 1):
        a = (slice(None, -1), slice(None)) if axis == 0 else (slice(None), slice(None, -1))
        b = (slice(1, None), slice(None)) if axis == 0 else (slice(None), slice(1, None))
        difference = head[a] - head[b]
        donor = np.where(difference > 0, water[a], water[b])
        # A donor has at most four neighbours: each receives <= one quarter.
        potential = dt / roughness * donor ** (5/3) * np.sqrt(abs(difference) / cell_size) / cell_size
        transfer = np.sign(difference) * np.minimum(potential, np.minimum(donor / 4, abs(difference) / 8))
        delta[a] -= transfer
        delta[b] += transfer
    return water + delta


def simulate_surface(request: SurfaceRequest):
    terrain = np.array(request.elevation_m)
    water = np.array(request.initial_depth_m)
    rate = np.array(request.rainfall_mm_hr) / 3_600_000
    runoff = rate * np.array(request.runoff_coefficient)
    area = request.cell_size_m ** 2
    initial = float(water.sum() * area)
    time = 0.0
    while time < request.duration_s:
        dt = min(request.step_s, request.duration_s - time)
        water = surface_step(terrain, water + runoff * dt, request.cell_size_m, request.roughness, dt)
        time += dt
    rainfall = float(rate.sum() * area * request.duration_s)
    added = float(runoff.sum() * area * request.duration_s)
    final = float(water.sum() * area)
    return {'depth_m': water.tolist(), 'time_s': time,
            'grid': {'crs': request.crs, 'origin_x_m': request.origin_x_m,
                     'origin_y_m': request.origin_y_m, 'cell_size_m': request.cell_size_m,
                     'row_direction': 'negative_y', 'shape': list(water.shape)},
            'source': request.source, 'output_quality': 'MODEL_OUTPUT',
            'model': 'CONSERVATIVE_SURFACE_PROTOTYPE', 'boundary': 'CLOSED',
            'balance': {'initial_m3': initial, 'rainfall_m3': rainfall,
                        'runoff_m3': added, 'rainfall_loss_m3': rainfall-added,
                        'final_storage_m3': final, 'boundary_discharge_m3': 0,
                        'residual_m3': initial + added - final}}
