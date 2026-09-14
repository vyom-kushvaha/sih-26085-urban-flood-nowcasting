# Map backend requirements — 14 September 2026

## Implemented

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

The following additional features have also been fully integrated:

1. **Saved Forecast Manifesto**: `GET /api/v1/forecasts/{run_id}/map` exposes
   persisted snapshots and layer URLs.
2. **Hotspots API**: Returns useful GeoJSON clusters (`GET /api/v1/forecasts/{run_id}/hotspots.geojson`).
3. **Route Exposure API**: Candidate routes are intersected with forecast cells
   (`POST /api/v1/forecasts/{run_id}/route-exposure`) for saved runs.
4. **Drainage Network Layer**: Node and edge exchange diagnostics are exposed.
5. **Municipal Dashboard**: Authenticated dashboards support private citizen reports review, 
   hotspot monitoring, and public notice dissemination.

## Remaining work

6. Integrate validated terrain, actual network capacities/outfall conditions,
   timed operational rainfall and event calibration before citywide operational
   flood-depth claims. Existing saved runs remain prototype model output.

This step does not turn the rainfall screening layer into a validated flood
forecast. No synthetic run was published as live Mumbai data.

## Demonstration mode

`GET /api/v1/roads/demo-exposure` provides a deterministic and explicitly
synthetic Mumbai monsoon demonstration for judging when live rainfall is low.
It returns individual road segments, four depth bands, sparse illustrative
hotspots and synchronized T+0 through T+3 states. Every response declares
`is_live: false`, `input_quality: SYNTHETIC` and `depth_validated: false`.

The map has **Demo Scenario** and **Live Data** tabs, with the demonstration tab
selected by default at T+2 and neighbourhood zoom 16 so all acquired drivable
road classes are visible during judging. The Greater Mumbai extract contains
59,582 OpenStreetMap ways, including 31,721 residential and 14,091 service ways.
Smaller road classes appear progressively while zooming to keep city-wide views
readable. Coverage depends on OpenStreetMap completeness.
The tabs switch only the road-depth presentation.
Road popups and the legend repeat that values are simulated, unvalidated and
not a safety certificate. Demo depth combines illustrative hotspot intensity
with a deterministic road surface/drainage exposure factor and background depth.
The route planner remains on live screening. Turning the control off restores
live rainfall without reloading the page.
