# Map backend requirements — 14 September 2026

## Implemented in this step

`GET /api/v1/forecasts/{run_id}/roads.geojson?lead_minutes=60`
intersects the acquired Mumbai road centre lines with the exact saved forecast
grid. Each crossing is split at cell boundaries, so one road may have several
depth bands. Missing lead times return 404; they never reuse another time.
Road portions outside the grid have null depth and UNKNOWN risk.

Bands: LOW <5 cm; MODERATE 5–15 cm; HIGH >15–30 cm; CRITICAL >30 cm.
These are display bands, not validated passability thresholds. Road closure
status remains UNKNOWN and safe-route certification is false.

The saved forecast viewer loads depth, roads and drainage for the same lead,
with generation checks preventing old responses replacing a newer selection.
Street popups show model depth, risk band, lead and prototype qualification.

## Remaining work, in order

1. Connect the main NOW/+1/+2/+3 timeline and layer controls to an explicitly
   selected saved run; keep live rainfall and saved model times distinguishable.
2. Derive sparse hotspots and municipality priority areas from depth grids.
3. Expose network edges, node stress and calculated exchange diagnostics;
   preserve unknown capacity and avoid claiming causes without model evidence.
4. Intersect candidate routes with forecast cells, then implement graph detours
   and fast/balanced/lower-exposure ranking with coverage requirements.
5. Separate authenticated official closures/notices from predicted depth.
6. Integrate validated terrain, actual network capacities/outfall conditions,
   timed operational rainfall and event calibration before citywide operational
   flood-depth claims. Existing saved runs remain prototype model output.

This step does not turn the rainfall screening layer into a validated flood
forecast. No synthetic run was published as live Mumbai data. No Git push.
