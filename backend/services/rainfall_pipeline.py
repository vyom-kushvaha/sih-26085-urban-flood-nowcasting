"""Rainfall-frame driver with optional conservative same-CRS grid remapping."""
from datetime import timedelta
from typing import Literal
import numpy as np
from pydantic import AwareDatetime, BaseModel, ConfigDict, Field, model_validator
from backend.services.coupled_simulation import CoupledRequest, simulate_coupled
from backend.services.rainfall_grid import RainGrid, remap_rainfall


class RainFrame(BaseModel):
    model_config = ConfigDict(extra='forbid')
    start_minute: int = Field(ge=0, lt=180)
    end_minute: int = Field(gt=0, le=180)
    values: list[list[float]]
    units: Literal['mm/hr', 'mm']
    source: str = Field(min_length=1)
    quality: Literal['OBSERVED', 'FORECAST', 'SIMULATED']
    source_type: Literal['RADAR', 'NWP', 'ARCHIVED', 'SYNTHETIC']
    grid: RainGrid | None = None


class RainfallRun(BaseModel):
    model_config = ConfigDict(extra='forbid')
    issue_time: AwareDatetime
    domain: CoupledRequest
    frames: list[RainFrame] = Field(min_length=1, max_length=180)
    output_minutes: list[int] = Field(default_factory=lambda: [0,30,60,120,180], max_length=181)

    @model_validator(mode='after')
    def check_frames(self):
        end = 0
        shape = np.asarray(self.domain.surface.elevation_m).shape
        for frame in self.frames:
            if frame.start_minute != end or frame.end_minute <= frame.start_minute:
                raise ValueError('Rainfall frames must be ordered, contiguous and begin at T+0')
            try:
                values = np.asarray(frame.values, dtype=float)
            except ValueError as exc:
                raise ValueError('Rainfall frame must be rectangular') from exc
            rate = values if frame.units == 'mm/hr' else values * 60 / (frame.end_minute-frame.start_minute)
            if not np.isfinite(rate).all() or (rate < 0).any() or (rate > 1000).any():
                raise ValueError('Frame must match domain and have finite rates in [0,1000] mm/hr')
            if frame.grid is not None:
                remap_rainfall(rate, frame.grid, self.domain.surface)
            elif values.shape != shape:
                raise ValueError('Frame without grid metadata must match domain shape')
            end = frame.end_minute
        if len(set(self.output_minutes)) != len(self.output_minutes) or any(m < 0 or m > end for m in self.output_minutes):
            raise ValueError('Output minutes must be unique and within rainfall coverage')
        work = np.prod(shape) + len(self.domain.drainage.graph.nodes) + len(self.domain.drainage.graph.edges)
        if end * 60 * work > 200000:
            raise ValueError('Forecast exceeds 200000 cell/asset-steps')
        return self


def run_rainfall(request: RainfallRun):
    domain = request.domain
    # Durations come from frame intervals, not the nested single-run defaults.
    current = domain.model_copy(update={
        'surface':domain.surface.model_copy(update={'duration_s':0}),
        'drainage':domain.drainage.model_copy(update={'duration_s':0})})
    state = simulate_coupled(current)
    outputs = []
    initial = state['balance']['initial_m3']
    runoff = outfall = 0.0
    remapping = []

    def snapshot(minute):
        outputs.append({'lead_minutes':minute, 'valid_time':(request.issue_time+timedelta(minutes=minute)).isoformat(),
                        'depth_m':state['depth_m'], 'node_depth_m':state['node_depth_m']})

    snapshot(0)
    for frame in request.frames:
        rate = np.asarray(frame.values, dtype=float)
        if frame.units == 'mm':
            rate = rate * 60 / (frame.end_minute-frame.start_minute)
        if frame.grid is not None:
            rate, report = remap_rainfall(rate, frame.grid, domain.surface)
            hours = (frame.end_minute-frame.start_minute) / 60
            remapping.append({'start_minute': frame.start_minute, 'end_minute': frame.end_minute,
                              **report, 'rainfall_volume_m3': report['target_rate_m3_hr'] * hours})
        breaks = sorted({frame.end_minute, *(m for m in request.output_minutes if frame.start_minute < m < frame.end_minute)})
        start = frame.start_minute
        for end in breaks:
            duration = (end-start)*60
            current = domain.model_copy(update={
                'surface':domain.surface.model_copy(update={'duration_s':duration,
                    'initial_depth_m':state['depth_m'], 'rainfall_mm_hr':rate.tolist()}),
                'drainage':domain.drainage.model_copy(update={'duration_s':duration,
                    'initial_depth_m':state['node_depth_m']})})
            state = simulate_coupled(current)
            runoff += state['balance']['runoff_m3']
            outfall += state['balance']['outfall_m3']
            if end in request.output_minutes or end == request.frames[-1].end_minute:
                snapshot(end)
            start = end
    final = state['balance']['surface_storage_m3'] + state['balance']['drainage_storage_m3']
    return {'issue_time':request.issue_time.isoformat(), 'output_quality':'MODEL_OUTPUT',
            'model':state['model'], 'grid':state['grid'], 'snapshots':outputs,
            'rainfall_frames':[f.model_dump() for f in request.frames],
            'rainfall_remapping':remapping,
            'terrain_source':domain.surface.source,
            'drainage_input_qualities':state['drainage_input_qualities'],
            'balance':{'initial_m3':initial, 'runoff_m3':runoff, 'outfall_m3':outfall,
                       'final_storage_m3':final, 'residual_m3':initial+runoff-outfall-final},
            'limitations':state['limitations']+['No radar acquisition; remapping supports north-up grids in the same projected metre-based CRS only.',
                'Frame source labels are caller-supplied; no independent radar provenance verification.']}
