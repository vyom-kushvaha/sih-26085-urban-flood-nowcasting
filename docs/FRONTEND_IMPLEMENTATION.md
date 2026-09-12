# Frontend implementation status

**R.A.K.S.H.A.K. — Real-time Assessment & Knowledge System for Hydrological Alerts**

## Files and behavior

- `frontend/index.html`: five-page navigation, map shell, discrete forecast controls, route form and product identity.
- `frontend/platform.css` and `frontend/brand.css`: responsive GIS layout and full product-name styling.
- `frontend/platform.js`: navigation, point forecasts, route options, selected geometry, GPS/follow controls, city selectors, report drafts and explicit unavailable states.
- `frontend/mumbai-boundary.geojson`: dissolved BMC boundary used for colour clipping and the dark 3 px outline. See `MUMBAI_BOUNDARY.md` for attribution and rebuild instructions.
- README and project documents: consistent product name and full expansion. Backend descriptive labels and API title also use the agreed name; hydraulic calculations are unchanged.
- `scripts/check_frontend.js`: checks external application JavaScript as well as inline scripts.
- Tests: current asset/navigation assertions, six isolated JS handler tests, and geographic boundary inclusion/exclusion checks. Boundary rebuilding/testing uses Shapely in `requirements-dev.txt`.

## Existing APIs reused

- `GET /api/v1/risk/forecast`: selected-point forecast and source metadata.
- `GET /api/v1/routing/safe-route`: road options, coordinates, distance and estimated duration.
- Existing FastAPI `/` and `/static` serving. The application uses its deployed origin, with optional `window.RAKSHAK_API_BASE` configuration.

## Pending backend capabilities

Validated hourly road-segment depths, spatial hotspots and city counts are not available. No per-segment depths or future-hour route risk are invented. Existing route corridors include prototype geometry and estimated durations; they are not verified navigation recommendations.

Municipal authentication, reports, report-status updates, notices, official closures and ward drill-down services are not connected. Login, report submission and notice publication remain disabled. The municipality page is explicitly an interface preview. Text reports can be saved locally; photographs are not persisted in drafts.

## Verification and limits

88 Python tests and six Node tests pass. JavaScript syntax checks pass. Desktop and 390 px mobile layouts were visually checked. Browser checks covered route search, alternate route selection, the +2 hour unavailable-risk state, dashboard city selection and return to map, report problem selection and missing-location validation, About identity, and municipality preview navigation.

Physical GPS movement, real device camera capture, report submission and successful authentication were not end-to-end verified. Hotspot-to-map cannot be verified without a spatial hotspot feed. Basemap tiles and Leaflet currently require internet access.

The previous UI used legacy inline handlers and controls that conflicted with the requested page structure. Those assertions were updated for the current frontend; backend API tests remain. The previous hand-drawn Mumbai mask included offshore areas; the replacement follows source ward geometry. Colour clipping and map zoom animation were synchronized by disabling zoom animation.
