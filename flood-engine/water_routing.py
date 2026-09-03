import numpy as np


def route_water(elevation_grid, water_grid, routing_fraction=0.25):
    """
    Move water from higher cells toward lower neighbouring cells.

    Parameters:
        elevation_grid: 2D NumPy array containing elevation values (m)
        water_grid: 2D NumPy array containing water depth (m)
        routing_fraction: fraction of water allowed to move per step

    Returns:
        Updated water grid.
    """

    rows, cols = elevation_grid.shape
    new_water = water_grid.copy()

    for r in range(1, rows - 1):
        for c in range(1, cols - 1):

            current_level = elevation_grid[r, c] + water_grid[r, c]

            neighbours = [
                (r - 1, c),
                (r + 1, c),
                (r, c - 1),
                (r, c + 1),
            ]

            for nr, nc in neighbours:
                neighbour_level = (
                    elevation_grid[nr, nc] + water_grid[nr, nc]
                )

                if current_level > neighbour_level:
                    difference = current_level - neighbour_level

                    transfer = min(
                        water_grid[r, c] * routing_fraction,
                        difference * routing_fraction
                    )

                    new_water[r, c] -= transfer
                    new_water[nr, nc] += transfer

    return new_water
