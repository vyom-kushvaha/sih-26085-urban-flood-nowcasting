import numpy as np


def apply_drainage_coupling(
    water_grid,
    effective_capacity_mm_hr,
    time_step_hours=1.0,
):
    """
    Remove water according to effective drainage capacity.

    Returns:
        remaining_water: water depth after drainage
        overflow_grid: water remaining after drainage capacity is exceeded
    """

    water = np.maximum(water_grid.astype(float), 0.0)

    drainage_capacity_m = (
        effective_capacity_mm_hr / 1000.0
    ) * time_step_hours

    drained = np.minimum(water, drainage_capacity_m)

    remaining_water = water - drained

    overflow_grid = remaining_water.copy()

    return remaining_water, overflow_grid
