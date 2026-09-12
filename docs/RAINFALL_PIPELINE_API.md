# Spatial rainfall frame pipeline

POST `/api/v1/surface/forecast` accepts `issue_time` with timezone, `domain`
(the coupled request), `frames`, and `output_minutes` (default 0,30,60,120,180).
Frames contain `start_minute`, `end_minute`, `values`, `units` (`mm/hr` or `mm`),
`source`, `quality` (OBSERVED/FORECAST/SIMULATED), `source_type`
(RADAR/NWP/ARCHIVED/SYNTHETIC). Intervals must be ordered and contiguous from
zero, covering all requested outputs, with a maximum horizon of 180 minutes.

Without `grid`, values must match the surface grid and use its CRS, extent and cell size.
Frames may instead include `grid` with `crs`, `origin_x_m`, `origin_y_m` (upper-left
corner), and `cell_size_m`. Rows advance southward. These north-up square grids
are remapped by cell-overlap area averaging, supporting different resolutions
and offsets in the same projected metre-based CRS. The source must fully cover
the domain; missing coverage and incompatible CRS return 422. Source grids are
capped at 10000 cells and overlap matrices at two million combined entries.
No radar download or cross-CRS reprojection is implemented.
Accumulated millimetres are spread uniformly over their own interval; hourly
rates are held constant for the interval. The domain rainfall and duration are
superseded by frames; initial water, geometry, exchange and other parameters remain.
Both nested steps must be one second. The whole run is capped at 200000
cell/asset-steps, so three-hour runs currently support only tiny domains.

T+0 always contains initial state. Initial/final endpoints are always returned;
requested intermediate leads contain carried-forward surface and drain state.
Outputs retain grid metadata, frame provenance and a cumulative runoff/outfall/
storage balance. Source labels are caller declarations, not independent validation.

`rainfall_remapping` reports source-footprint and target rainfall volume rates,
their residual, and integrated rainfall volume before runoff losses for each
remapped frame. Source volume is measured only over the model footprint, excluding
rain outside it. Original frame values and metadata remain in saved runs.

The same contract works with POST `/api/v1/forecasts` for durable local storage
and the existing saved depth/drainage layers.

Remaining: live DWR integration, cross-CRS remapping, archived storm bundles,
production-scale execution and full GIS integration. Tests cover rate vs
accumulation, spatial forcing, timezone requirements, invalid intervals/arrays,
volume conservation and a complete dry T+180 run on a synthetic domain.
