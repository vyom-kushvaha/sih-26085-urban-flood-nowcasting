"""Area-overlap rainfall remapping for north-up grids in one projected CRS."""
import numpy as np
from pyproj import CRS
from pyproj.exceptions import CRSError
from pydantic import BaseModel, ConfigDict, Field


class RainGrid(BaseModel):
    model_config = ConfigDict(extra='forbid', allow_inf_nan=False)
    crs: str
    origin_x_m: float
    origin_y_m: float
    cell_size_m: float = Field(gt=0)


def remap_rainfall(values, grid: RainGrid, surface):
    """Return area-weighted rates and volumes over the model footprint only."""
    source = np.asarray(values, dtype=float)
    if source.ndim != 2 or min(source.shape) < 1 or source.size > 10000:
        raise ValueError('Rainfall source grid must contain 1-10000 cells')
    try:
        source_crs, target_crs = CRS.from_user_input(grid.crs), CRS.from_user_input(surface.crs)
    except CRSError as exc:
        raise ValueError('Invalid rainfall or surface CRS') from exc
    if source_crs != target_crs or not source_crs.is_projected or any(
        axis.unit_conversion_factor != 1 for axis in source_crs.axis_info[:2]
    ):
        raise ValueError('Rainfall remapping requires the same projected metre-based CRS')
    rows, cols = np.asarray(surface.elevation_m).shape
    sr, sc = source.shape
    # Limit dense overlap matrices before allocation for very thin grids.
    if rows * sr + cols * sc > 2_000_000:
        raise ValueError('Rainfall overlap calculation exceeds prototype work limit')
    size, target_size = grid.cell_size_m, surface.cell_size_m
    sx = grid.origin_x_m + np.arange(sc) * size
    sy = grid.origin_y_m - np.arange(sr) * size
    tx = surface.origin_x_m + np.arange(cols) * target_size
    ty = surface.origin_y_m - np.arange(rows) * target_size
    ox = np.maximum(0, np.minimum(tx[:, None] + target_size, sx + size)
                    - np.maximum(tx[:, None], sx))
    oy = np.maximum(0, np.minimum(ty[:, None], sy)
                    - np.maximum(ty[:, None] - target_size, sy - size))
    if not (np.allclose(ox.sum(axis=1), target_size, rtol=1e-9, atol=1e-9)
            and np.allclose(oy.sum(axis=1), target_size, rtol=1e-9, atol=1e-9)):
        raise ValueError('Rainfall source grid must fully cover the model domain')
    mapped = oy @ source @ ox.T / target_size ** 2
    source_volume = float(np.sum(source * oy.sum(axis=0)[:, None] * ox.sum(axis=0)[None, :]) / 1000)
    target_volume = float(mapped.sum() * target_size ** 2 / 1000)
    return mapped, {'method': 'AREA_OVERLAP', 'source_shape': list(source.shape),
                    'source_footprint_rate_m3_hr': source_volume,
                    'target_rate_m3_hr': target_volume,
                    'residual_rate_m3_hr': source_volume - target_volume}
