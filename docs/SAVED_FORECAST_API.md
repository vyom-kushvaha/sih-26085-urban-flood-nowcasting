# Saved forecast prototype

Frontend integration: open **Explore a saved forecast** in the map sidebar,
paste the UUID returned by POST, and select a saved lead. The saved-run timeline
updates cell-depth polygons and drainage nodes together; it is separate from the
existing point forecast controls. Clearing the run removes both layers. Model
depth overlays do not change or certify route safety.

GET `/api/v1/forecasts/{uuid}/depth.geojson?lead_minutes=30` projects grid-cell
corners from the declared projected metre CRS into WGS84 polygons. Geographic or
non-metre grid CRSs are rejected. Correct georeferencing remains an input requirement.

- POST `/api/v1/forecasts`: same input as `/surface/forecast`; computes synchronously
  and atomically saves the normalized input and complete result. Returns 201 with
  UUID, creation time and COMPLETED status only after persistence succeeds.
- GET `/api/v1/forecasts/{uuid}`: reopens the saved input and result.
- GET `/api/v1/forecasts/{uuid}/depth?lead_minutes=30`: exact saved depth array
  with grid metadata, valid time, source and limitations.
- GET `/api/v1/forecasts/{uuid}/drainage?lead_minutes=30`: WGS84 node GeoJSON
  with saved node depth/head. Outfalls have null depth/head in this layer because
  they are fixed boundary nodes rather than storage nodes.

Unknown runs and unsaved lead times return 404; malformed inputs return 422;
storage failures return 503. Leads are never interpolated or silently substituted.
SQLite stores files at `data/runtime/forecasts.sqlite3`, excluded from Git. Override
with `FORECAST_DB_PATH` for a persistent disk or tests. This is separate from
existing optional PostGIS logging. Ephemeral deployment disks do not provide
restart-safe persistence; configure a persistent volume before deployment.

This local prototype has no background queue, run listing, failed-run registry,
retention policy, access control or street exposure layer yet. Depth is a grid
JSON product, not GeoJSON polygons; frontend rendering is pending. Inputs contain
source metadata, but solver versions are not yet pinned for exact recomputation
after code changes. Saved outputs themselves can be reopened unchanged.
