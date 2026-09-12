# Hardcoded and Simulated Data Inventory

**R.A.K.S.H.A.K. — Real-time Assessment & Knowledge System for Hydrological Alerts**


This inventory prevents prototype fixtures from being presented as observations or operational model products.

| Location | Data | Runtime use | Required label or action |
|---|---|---|---|
| `frontend/index.html` `CITY_DATA` | Area rainfall, depth, severity and drainage text | Visible dashboard cards | `SIMULATED`; replace with backend forecast products in Phase 7. |
| `frontend/index.html` `ILLUSTRATIVE_MUMBAI_HOTSPOTS` | Five Mumbai hotspot depths and descriptions | Visible map circles | `ILLUSTRATIVE SCENARIO`; already labelled in map and popup. |
| `frontend/index.html` `fallbackRouteCalculation` | Fixed route geometries and safety values | No longer called | Delete after backend route UI migration; never restore as safety fallback. |
| `frontend/index.html` municipal credentials | Fixed admin login | Demo authentication | `DEMO ONLY`; replace with server authentication before deployment. |
| `frontend/index.html` officer/resource/report/alert collections | Staff, incidents and operational records | Admin/citizen demo screens | `DEMO ONLY`; move to persistent APIs in Phase 10. |
| `flood-engine/demo_data.py` | City and area cards | `/demo` API | `SIMULATED`; keep isolated from operational endpoints. |
| `backend/services/weather_service.py` mock generators | Synthetic current/hourly rainfall | Used when providers fail | `SIMULATED_WEATHER_FALLBACK`; never label live. |
| `backend/services/historical_scenarios.py` | Published-event rainfall replay inputs | Historical replay | `HISTORICAL_REPLAY`; flood depth remains modelled and unvalidated. |
| `backend/routers/risk.py` fixed corridor definitions | Named Mumbai route geometries | Common demo origin/destination pairs | `MODELLED/PROTOTYPE`; replace with road graph candidates in Phase 8. |
| `backend/routers/risk.py` base hotspot coordinates | Locations used for route comparison | Route response | `ILLUSTRATIVE`; replace with forecast raster/road intersections. |
| `flood-engine/drainage_processor.py` capacity rules | Capacity inferred from OSM proximity/type | Risk estimator | `MODELLED_PARAMETER`; replace with surveyed pipe attributes and hydraulics in Phases 2–3. |
| `flood-engine/dem_processor.py` 15 m/1.75% fallback | Numeric terrain baseline | Prototype calculations when DEM is invalid | `FALLBACK`; downstream prediction must be invalid and routing must fail closed. |
| `ml_model.py` untrained model state | No fitted calibration model | Returns no ML score | `UNTRAINED`; do not call output ML-calibrated. |

## Runtime mode contract

Routing responses expose one of these `data_mode` values:

- `LIVE_WEATHER`: provider weather was retrieved; terrain/hydraulic validity remains separately required;
- `SIMULATED_WEATHER_FALLBACK`: provider weather failed and synthetic rainfall was used;
- `WEATHER_UNAVAILABLE`: the weather service raised an error;
- `CONTROLLED_SIMULATION`: rainfall was supplied by a user/demo scenario;
- `HISTORICAL_REPLAY`: a documented historical rainfall scenario was selected.

`data_mode` does not certify prediction quality. `prediction_valid`, terrain provenance and hydraulic validation determine whether an operational flood or route-safety claim is allowed.
