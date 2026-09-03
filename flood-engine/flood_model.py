import numpy as np


def diffusive_wave_step(
    elevation_grid,
    water_grid,
    rainfall_mm_hr,
    runoff_coefficient=0.85,
    time_step_hours=1.0,
    flow_fraction=0.25,
):
    """
    Perform one simplified diffusive-wave flood simulation step.

    Rainfall is converted to runoff, then water is moved
    according to the water-surface gradient.
    """

    rainfall_m = (rainfall_mm_hr / 1000.0) * time_step_hours

    runoff_depth = rainfall_m * runoff_coefficient

    water = water_grid.copy().astype(float)

    water += runoff_depth

    surface = elevation_grid + water

    rows, cols = elevation_grid.shape
    new_water = water.copy()

    for r in range(1, rows - 1):
        for c in range(1, cols - 1):

            current_surface = surface[r, c]

            neighbours = [
                (r - 1, c),
                (r + 1, c),
                (r, c - 1),
                (r, c + 1),
            ]

            for nr, nc in neighbours:

                neighbour_surface = surface[nr, nc]

                if current_surface > neighbour_surface:

                    difference = current_surface - neighbour_surface

                    transfer = min(
                        new_water[r, c] * flow_fraction,
                        difference * flow_fraction,
                    )

                    new_water[r, c] -= transfer
                    new_water[nr, nc] += transfer

    return new_water
