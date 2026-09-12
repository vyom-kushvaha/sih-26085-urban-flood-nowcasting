import numpy as np
import pytest
from backend.services.surface_routing import SurfaceRequest, simulate_surface, surface_step


def test_zero_timestep_and_downhill_conservation():
    terrain = np.array([[2., 1., 0.]])
    water = np.array([[.2, 0., 0.]])
    assert np.array_equal(surface_step(terrain, water, 2, .04, 0), water)
    result = surface_step(terrain, water, 2, .04, 1)
    assert result[0, 1] > 0
    assert result.sum() == pytest.approx(.2)
    assert result.min() >= 0


def test_rainfall_balance_and_georeference():
    req = SurfaceRequest(elevation_m=[[0,0]], initial_depth_m=[[0,0]],
        rainfall_mm_hr=[[36,36]], runoff_coefficient=[[1,.5]], cell_size_m=2,
        duration_s=100, crs='EPSG:32643', origin_x_m=300000, origin_y_m=2100000,
        source='SIMULATED test')
    result = simulate_surface(req)
    assert result['balance']['runoff_m3'] == pytest.approx(.006)
    assert result['balance']['residual_m3'] == pytest.approx(0, abs=1e-12)
    assert result['grid']['crs'] == req.crs


def test_bowl_collects_water_without_negative_depth():
    terrain = np.ones((3,3))
    terrain[1,1] = 0
    water = np.full((3,3), .1)
    for _ in range(100):
        water = surface_step(terrain, water, 1, .04, 1)
    assert water[1,1] > .1
    assert water.min() >= 0
    assert water.sum() == pytest.approx(.9)
