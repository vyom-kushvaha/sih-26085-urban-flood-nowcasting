# Surface routing prototype

POST `/api/v1/surface/simulate` accepts rectangular arrays `elevation_m`,
`initial_depth_m`, `rainfall_mm_hr`, `runoff_coefficient`, with identical shapes.
Supply `cell_size_m`, `crs`, `origin_x_m`, `origin_y_m`, and `source`.
Coordinates describe the upper-left grid corner; rows proceed toward negative y.
The CRS must be metre-based and projected; this initial adapter retains the
caller metadata and does not transform or independently validate it.

`duration_s` defaults to 60, `step_s` to 1, Manning-style `roughness` to .04.
Up to 10000 cells and 2 million cell-steps are supported. Raster import, masks,
open boundaries and multi-frame radar rainfall are pending.

Four-neighbour simultaneous flux uses depth, head gradient, cell distance,
roughness and elapsed time. Donor and head-difference limiters prevent negative
storage. This is a conservative prototype, not a validated shallow-water solver;
limiter activation can affect timing and needs convergence testing/calibration.
Runoff coefficient losses are reported separately from storage. All boundaries
are closed and the response provides the final depth grid and volume ledger.

No existing forecast/routing output is switched to this experimental endpoint.
Drainage exchange and surcharge reinjection are the next integration step.

## Coupled prototype (implemented)

POST `/api/v1/surface/coupled` accepts `surface` (SurfaceRequest), `drainage`
(SimulationRequest) and `exchange`, keyed by storage-node ID with `row`, `col`
and `intake_m3_s`. Every storage node needs a unique cell, including nodes with
zero intake. Ground and cell elevations must agree within 1 cm. Durations must
match and both steps must be one second. External node/pipe demands are rejected.
The combined workload is limited to 200000 cell/asset-steps.

Each interval routes runoff, transfers available surface water subject to intake
and head limits, advances node storage, then returns surcharge to its mapped cell.
The global ledger counts exchanged water internally, so it is neither an external
loss nor new input. Initial/final surface and drainage storage, runoff and outfall
discharge close the combined balance. Cumulative exchange histories are sampled.

This is manual spatial mapping with caller-supplied CRS and datum, constant rain,
closed surface boundaries and fixed outfall heads. It does not add live forecasts
to the UI or constitute a calibrated dynamic-wave hydraulic solver. The automated
blocked-vs-clean case verifies reinjection and conservation; real-data acceptance,
time-convergence studies and the full phase exit gates remain pending.

Verification: `pytest tests/test_surface_routing.py -q` covers zero timestep,
downhill routing, bowl accumulation, conservation and runoff accounting.
