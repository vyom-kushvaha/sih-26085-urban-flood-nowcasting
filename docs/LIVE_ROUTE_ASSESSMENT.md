# Live route calculation and map delivery

Implemented 13 September 2026. Run the app with:

```powershell
.venv\Scripts\python.exe -m uvicorn backend.main:app --host 127.0.0.1 --port 8010
```

Open http://127.0.0.1:8010 and submit the journey planner. The existing GET and
POST `/api/v1/routing/safe-route` APIs now use spatial rainfall screening when
no controlled rainfall or historical scenario is supplied.

The map calls `GET /api/v1/roads/exposure` automatically after the viewport
settles. It calculates the visible arterial OSM ways without requiring the route
button. The endpoint accepts `west`, `south`, `east`, `north`, and `zoom`, rejects
invalid/out-of-domain bounds, and returns GeoJSON with weather/model coverage and
category counts. Canvas rendering and zoom-dependent road classes replace the old
1,200-road failure: zoom 11 shows motorway/trunk/primary roads, zoom 12–13 adds
secondary roads, and zoom 14+ adds tertiary roads.

Current local arterial coverage is 18.89–19.30 N and 72.77–72.99 E: 11,944 OSM
ways acquired on 13 September 2026. It covers Greater Mumbai's major corridors,
not every residential lane. Pan and zoom refresh the visible overlay. Blue means
live rainfall below 5 mm/h
where depth modelling is unavailable, orange means 5–20 mm/h, red means above
20 mm/h, and grey means missing live data. When every required model input is
valid, green/orange/red instead represent the 0–100% blockage depth-sensitivity
upper bound (<5, 5–15, >15 cm). Every feature keeps `safe_route_certified=false`.

Fresh citizen water-depth reports enter the overlay only after municipal
verification. For three hours, a verified observation overrides rainfall
screening on roads within 120 metres. Road popups keep verified observed depth,
modelled one-hour depth and live rainfall as separate values; unreviewed reports
never affect colours.

## Calculation

1. Resolve origin/destination and obtain complete OSM/OSRM road geometries.
2. Split each geometry edge into sections no longer than 100 m, preserving bends.
3. Group sample locations into approximately 2 km weather query cells and fetch
   Open-Meteo current precipitation in batches. Provider grid coordinates are
   returned; query spacing does not imply equivalent weather resolution.
4. Validate UTC timestamps, finite nonnegative amounts and mm units. Reject data
   older than 30 minutes or more than 5 minutes in the future. Cache for 5 minutes.
5. Convert the interval total into mm/hour using `amount * 3600 / interval`.
   See the [provider interval contract](https://open-meteo.com/en/docs).
   When Open-Meteo is unreachable, the service queries MET Norway
   Locationforecast using bounded ~8 km backup cells and its required identified
   User-Agent. The one-hour numerical forecast remains labelled with its provider;
   it is never presented as measured rainfall or radar nowcast.
6. Calculate distance-weighted mean and peak rainfall per route. Exposure index:
   `0.65 * peak + 0.35 * distance-weighted mean`, in mm/hour. These weights are
   prototype comparison weights, not calibrated flood probabilities.
7. Evaluate the existing local runoff model at each sample with 0% and 100%
   blockage as sensitivity endpoints. A depth range is returned only when every
   sample has terrain available; it remains an uncalibrated one-hour scenario.
8. Return completed calculations before drawing route options on the map.

Blue/orange compare lower/higher modeled exposure when every section has model
coverage, otherwise they compare rainfall exposure. Equal exposure is grey; one
candidate is not a comparison. Selected routes render section depth estimates in
blue (<5 cm), orange (5–15 cm), red (>15 cm), and grey where terrain or weather is
missing. Green and numerical depth require `VALIDATED_HIGH_RES_DTM`; ordinary
30 m DEM values never enable them. Route cards disclose weather and terrain-model
coverage separately.

## Limits

This implements live rainfall exposure, **not operational safest-route detection**.
`prediction_valid` and `safe_route_available` remain false. Actual flood depth,
initial water storage, tides, surveyed drainage, validated high-resolution terrain,
road closures and independent event calibration are still missing. No green SAFE
classification is inferred from dry weather. Legacy `safe_route`/`danger_route`
objects remain geometry-only compatibility aliases with UNAVAILABLE status.

Public road providers may return only one alternative. The live Hindmata–Kurla
check returned one 9.848 km route and 287 sections with full rainfall coverage;
mean rainfall 1.3 and peak 1.6 mm/hour at that check. These values are a test
snapshot, not fixed app data. No radar, SMS or municipal delivery is implied.

## Civic work started before routing was prioritized

The working tree also contains report intake, authenticated municipal moderation,
draft/published/withdrawn notices, shelters and transactional audit APIs. Admin
access requires `MUNICIPAL_API_TOKEN` of at least 32 characters in the server
environment, sent as a Bearer token. This is a deployment credential, not a
multi-user login system. UI integration remains pending.

Local development uses `OPERATIONS_DB_PATH`; production uses PostgreSQL and the
`20260913_0002` migration. Apply with `alembic upgrade head`. Migration has not
been tested against a live PostGIS instance. Citizen reports are text/location
only, private to the admin list, and unverified until moderated. Media uploads,
per-user roles, intake abuse controls and external alert delivery remain pending.
