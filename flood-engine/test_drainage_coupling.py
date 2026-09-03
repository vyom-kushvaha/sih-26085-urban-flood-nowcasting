import numpy as np
from drainage_coupling import apply_drainage_coupling

water = np.array([
    [0.02, 0.05],
    [0.10, 0.01]
])

remaining, overflow = apply_drainage_coupling(
    water,
    effective_capacity_mm_hr=40,
    time_step_hours=1
)

print("Remaining water:")
print(remaining)

print("Overflow:")
print(overflow)

assert np.isclose(remaining[0, 0], 0.00)
assert np.isclose(remaining[0, 1], 0.01)
assert np.isclose(remaining[1, 0], 0.06)
assert np.isclose(remaining[1, 1], 0.00)

print("Drainage coupling test passed")
