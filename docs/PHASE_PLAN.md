# SIH26085 Implementation Phase Plan

**R.A.K.S.H.A.K. — Real-time Assessment & Knowledge System for Hydrological Alerts**


**Plan version:** 3.0  
**Current progress:** See [the eight remaining delivery milestones](REMAINING_MILESTONES.md).
The phase descriptions below retain historical progress notes; they are not the
current completion ledger.
**Execution rule:** Complete and verify one phase before starting dependent work.  
**Current starting point:** Existing UI/API prototype with point rainfall, DEM loading, OSM drainage proximity, heuristic ponding and route comparison.

## Priority Rules

- **P0:** Required to demonstrate the core problem statement.
- **P1:** Strong SIH improvement after the P0 scientific chain works.
- **P2:** Pilot/production extension.
- A phase is complete only when its exit gate passes. A file, endpoint or UI screen alone is not completion.
- Every phase must keep `OBSERVED`, `DERIVED`, `ESTIMATED`, `SIMULATED` and `MODEL_OUTPUT` provenance distinct.

## Phase Overview

| Phase | Outcome | Priority | Depends on | Initial status |
|---|---|---:|---|---|
| 0 | Reproducible baseline and honest demo labels | P0 | None | Next |
| 1 | Validated pilot area, DEM and spatial grid | P0 | 0 | Pending |
| 2 | Directed drainage graph and hydraulic attributes | P0 | 1 | Pending |
| 3 | Drainage hydraulic state, blockage and surcharge | P0 | 2 | Pending |
| 4 | Conservative 2D surface runoff and routing | P0 | 1 | Pending |
| 5 | Bidirectional surface–drainage coupling | P0 | 3, 4 | Pending |
| 6 | Spatial rainfall/DWR-compatible 0–3 hour pipeline | P0 | 1, 4 | Pending |
| 7 | Forecast products, persistence and web GIS | P0 | 5, 6 | Pending |
| 8 | Flood-aware routing | P0 | 7 | Pending |
| 9 | Validation, calibration and optional ML | P0/P1 | 5–8 | Pending |
| 10 | Operational alerts, hardening and SIH presentation | P1 | 7–9 | Pending |

## Phase 0 — Baseline, Reproducibility and Claim Control

**Goal:** Establish a reliable baseline before changing scientific behaviour.

**Progress recorded 11 September 2026:** Complete. The project-local verification command reports 85 passed. Hosted API origin handling, unsafe client-side route fallback, illustrative hotspot labelling, explicit runtime data modes, historical replay UI, same-location routing and test isolation are corrected. Hardcoded/demo inputs are inventoried. Invalid terrain now makes flood-routing output unavailable instead of safe.

Tasks:

- record the exact runnable Python environment and dependency installation path;
- make the existing test suite runnable without hidden local assumptions;
- add a single command for syntax/unit/integration checks;
- separate live, historical, simulated and offline-demo modes in configuration;
- inventory hardcoded hotspot, route, alert and report data;
- remove safety/accuracy/live labels that are unsupported by current runtime data;
- correct frontend API-base behaviour and document the supported launch command;
- capture representative current API responses as regression fixtures where useful.

Exit gate:

- application starts through one documented command;
- full existing automated suite runs with a recorded result;
- hosted and local frontend use the correct backend origin;
- no offline fallback calls a route “safe” without model evidence;
- `git diff` contains only reviewed Phase 0 scope.

Primary modules:

- `requirements.txt`, `backend/requirements.txt`, `backend/main.py`
- `frontend/index.html`
- `tests/`, deployment configuration and READMEs

## Phase 1 — Pilot Domain and Terrain Validation

**Goal:** Produce trustworthy terrain for one bounded Mumbai pilot catchment.

**Progress recorded 11 September 2026:** Software preparation complete; real-data acceptance pending. A provisional 2.6 km² Hindmata pilot AOI, strict manifest, projected-CRS DTM loader, AOI/RMSE/checkpoint gates, query integration and automated synthetic-raster tests are implemented. The supplied 30 m CartoDEM is rejected for street-level use. Phase exit remains blocked until an authoritative 0.5–2 m bare-earth DTM and independent checkpoints are supplied and pass QA.

Tasks:

- select and document a pilot boundary that contains the canonical inlet-to-outfall chain and road alternatives;
- inspect CartoDEM CRS, horizontal/vertical datum, nodata and elevation units;
- diagnose the negative values at Hindmata, Kurla, Sion and Andheri;
- compare multiple known control points with an independent authoritative reference;
- clip/resample the DEM to a georeferenced simulation grid;
- define cell size, mask, boundary cells and surface roughness inputs;
- preprocess depression/flow-path handling using a documented method;
- add terrain QA output and automated sanity tests.

Exit gate:

- every control point passes agreed elevation tolerances or is explicitly masked;
- no fallback terrain occurs inside the pilot boundary;
- grid CRS, extent, cell size, nodata and vertical reference are stored with the artifact;
- a rendered elevation/slope QA map is reviewed.

Primary modules:

- `flood-engine/dem_processor.py`
- `scripts/download_dem.py`
- `data/raw/dem/`, new processed terrain artifacts
- `tests/test_dem_processor.py`

## Phase 2 — Directed Drainage Graph

**Progress recorded 11 September 2026:** First backend slice implemented: typed
node/circular-conduit input, gravity slope and topology QA, outfall reachability,
component count, asset provenance and GeoJSON inspection through
`POST /api/v1/drainage/inspect`. Seven automated checks pass. Real pilot network
import, surveyed alignments, topology snapping, canal cross sections and GIS
click integration remain pending. Phase 1 real terrain acceptance remains open;
this independent schema work does not pass either phase's full exit gate.

**Goal:** Represent a real or engineering-consistent pilot drainage network.

Tasks:

- define node and edge schemas;
- create/import inlet, manhole/junction and outfall nodes;
- create pipes/canals with upstream/downstream references;
- store ground/invert elevations, length, shape/diameter, slope, roughness and source quality;
- snap and validate topology;
- detect missing references, disconnected components, impossible slopes and cycles;
- expose graph inspection endpoints and a GIS debug layer;
- retain OSM waterways as contextual open-channel data without calling proximity a graph.

Exit gate:

- automated trace succeeds from at least one inlet through manholes/main drain to an outfall;
- every edge has valid endpoints and direction;
- graph QA report lists component count, sources and assumptions;
- map click can display the complete attributes of any pilot node/edge.

Primary modules:

- `flood-engine/drainage_processor.py`
- `data/schema.sql`
- `scripts/fetch_osm_drainage.py`
- new graph loader/validation module and tests

## Phase 3 — Drainage Hydraulics, Blockage and Surcharge

**Progress recorded 11 September 2026:** Independent static circular-pipe capacity
slice implemented at `POST /api/v1/drainage/capacity`: SI Manning reference flow,
asset-specific linear blockage derating, supplied demand/capacity checks and
provenance. Graph and capacity suite: 11 passed. This is preparatory work while
Phase 2 real-network acceptance remains pending. Time-varying node continuity,
downstream head, storage, surcharge and coupled mass balance remain unimplemented;
the Phase 3 exit gate is not complete.

**Goal:** Calculate time-varying flow and hydraulic state through the graph.

Tasks:

- implement documented conduit capacity from geometry, slope and roughness;
- implement node continuity and storage;
- define outfall/downstream boundary conditions;
- advance flow and node water level through stable timesteps;
- implement asset-level blockage and overcapacity state;
- calculate surcharge when node head exceeds ground/inlet level;
- expose edge discharge, velocity/capacity ratio and node water level;
- add mass-balance and canonical network tests.

Exit gate:

- dry, steady-flow, blocked-pipe and full-downstream tests match analytical expectations within tolerance;
- node and network mass balances close;
- increasing downstream restriction produces increasing upstream head and surcharge;
- blockage is attached to a specific graph asset.

Primary modules:

- new `flood-engine/drainage_hydraulics.py`
- drainage graph module and schema
- API schemas and hydraulic tests

## Phase 4 — 2D Surface Runoff and Routing

**Goal:** Generate georeferenced, time-varying water-depth grids.

Tasks:

- replace the detached routing prototype with a domain-aware solver controller;
- convert rainfall grids to spatial runoff using imperviousness/land cover;
- include cell distance, surface roughness, depth and timestep in flux calculations;
- define open/closed boundaries and initial surface-water state;
- enforce non-negative depths and numerical stability;
- record rainfall, storage, boundary discharge and residual error;
- export depth grids at required lead times;
- benchmark on flat, sloped, bowl and conservation test surfaces.

Exit gate:

- zero timestep produces zero water movement;
- zero rainfall and zero initial water remain dry;
- water moves downhill and accumulates in a depression as expected;
- volume balance closes within the documented tolerance;
- outputs retain georeferencing and can be rendered on the map.

Primary modules:

- `flood-engine/flood_model.py`
- `flood-engine/water_routing.py`
- new runoff/domain/output modules and tests

## Phase 5 — Bidirectional Surface–Drainage Coupling

**Goal:** Complete the central SIH requirement.

Tasks:

- map each inlet/manhole to its surface cell;
- calculate surface-to-inlet inflow from local depth and inlet capacity;
- limit intake using downstream node/network hydraulic state;
- return surcharge volume to the correct surface cell;
- coordinate surface and network substeps without double counting volume;
- report exchange volume and cause for each node and timestep;
- implement the canonical downstream-overload scenario.

Canonical test:

```text
Rain reaches an upstream inlet
→ inlet initially accepts water
→ downstream main pipe reaches capacity
→ upstream node water level rises
→ surcharge threshold is exceeded
→ water returns to the road surface
→ reported total volume remains conserved
```

Exit gate:

- the canonical test passes and demonstrates all six state transitions;
- surface and drainage mass balances reconcile;
- disabling a blockage reduces surcharge in the expected direction;
- the API returns the responsible downstream restriction for an affected street.

Primary modules:

- `flood-engine/drainage_coupling.py`
- surface solver, hydraulic solver and integration tests

## Phase 6 — Spatial Rainfall and 0–3 Hour Nowcast Pipeline

**Goal:** Drive the coupled solver with correctly timed spatial rainfall.

Tasks:

- define a DWR-compatible raster/array input contract;
- ingest issue time, valid interval, accumulation/rate semantics, CRS and quality flags;
- build T+0 through T+180 frame handling;
- add regridding to the surface-model domain;
- maintain a repeatable archived/sample rainfall bundle for offline judging;
- integrate a live DWR/radar source when access and licensing permit;
- retain numerical weather forecast as a labelled fallback;
- fix timezone and interval interpretation.

Exit gate:

- a multi-frame spatial storm moves through the pilot domain and produces different cell-wise results over time;
- T+0 does not incorrectly add an unlabelled future hour;
- rainfall volume after regridding is checked;
- all frames expose issue time, valid time, source and quality;
- live-source failure cleanly selects the archived or forecast fallback without relabelling it.

Primary modules:

- `backend/services/weather_service.py`
- new rainfall-grid adapter and scheduler modules
- forecast API and rainfall tests

## Phase 7 — Forecast Products, Persistence and Dynamic GIS

**Goal:** Publish model results as inspectable geospatial forecast products.

Tasks:

- create model-run records with configuration, status, timings and provenance;
- store/reference rainfall frames, depth grids, street exposure and hydraulic state;
- build APIs for depth, road and drainage layers at each lead time;
- generate street/intersection summaries from model depth grids;
- replace fixed hotspot circles and cards with backend output;
- use one frontend map lifecycle and one API base strategy;
- synchronize time controls across surface, road and drainage layers;
- show stale/fallback/uncertainty labels persistently.

Exit gate:

- selecting T+0/T+30/T+60/T+120/T+180 updates all map layers consistently;
- clicking a road or drainage asset shows values from the selected run/time;
- a saved run can be reopened and produces the same displayed results;
- no hardcoded flood depth is presented as live/model output.

Primary modules:

- `backend/database.py`, `data/schema.sql`, `backend/routers/`
- `frontend/index.html` or a deliberate frontend replacement
- new forecast-product services and tests

## Phase 8 — Flood-Aware Routing

**Goal:** Calculate routes on a road graph after applying forecast flood costs.

Tasks:

- load a directed road graph for the pilot area;
- intersect road edges with time-indexed flood depths;
- define pedestrian, commuter, bus and emergency-vehicle thresholds;
- close unsafe edges and penalize degraded edges;
- run shortest-path calculation on the modified graph;
- return route geometry, edge risks, maximum depth, ETA and detour explanation;
- return explicit no-safe-route when all candidates violate thresholds;
- remove fixed geometry/depth/safety fallbacks.

Exit gate:

- dry conditions reproduce the normal shortest route;
- a flooded edge forces a computed detour;
- an isolated destination produces no-safe-route;
- every route coordinate follows valid road edges;
- the response references one forecast run and lead time.

Primary modules:

- routing section of `backend/routers/risk.py`
- new road-graph/routing service
- frontend route UI and routing tests

## Phase 9 — Validation, Calibration and Optional ML

**Goal:** Quantify what the model can and cannot predict.

Tasks:

- assemble independent event observations and document their licenses/sources;
- validate rainfall input separately from flood output;
- calculate depth, wet/dry extent, road impact and timing metrics;
- compare the coupled model against simple baselines;
- perform parameter sensitivity and uncertainty analysis;
- calibrate only on training events/locations;
- if data volume supports it, train a residual-correction model;
- version model artifacts and publish held-out results.

Exit gate:

- validation can be reproduced from one command and immutable input metadata;
- metrics include sample count and confidence/limitations;
- no test event is used for calibration;
- optional ML is retained only if held-out performance improves;
- all presentation accuracy claims match generated evaluation output.

Primary modules:

- `ml_model.py`, `hybrid_model.py`, `models/`
- `backend/services/historical_scenarios.py`
- new validation dataset registry, scripts, reports and tests

## Phase 10 — Alerts, Operations and SIH Delivery

**Goal:** Turn verified forecasts into a robust demonstration and defensible submission.

Tasks:

- generate persistent alerts from forecast thresholds;
- implement server-side municipal authentication and audit trail;
- add scheduled runs, stale-data monitoring and last-valid-run behaviour;
- test deployment with realistic raster/model artifacts;
- run failure drills for weather, database and routing dependencies;
- update README, system design, model documentation, presentation and judge Q&A from actual implementation;
- create a scripted online demo and an offline repeatable demonstration;
- rehearse the canonical surcharge and flood-routing stories.

Exit gate:

- fresh and fallback runs are visibly distinguishable;
- deployment health exposes database/data/model readiness;
- online and offline demos complete without fabricated live states;
- presentation claims have direct code, data or validation evidence;
- final P0 checklist below is fully green.

## Final P0 SIH Checklist

- [ ] DWR-compatible spatial rainfall input
- [ ] Validated DEM for the pilot domain
- [ ] Spatial imperviousness/runoff generation
- [ ] Directed inlet/manhole/pipe/outfall graph
- [ ] Geometry-based drainage hydraulics
- [ ] Asset-level blockage and overcapacity
- [ ] Node surcharge and surface backflow
- [ ] Conservative 2D surface routing
- [ ] Bidirectional coupled simulation
- [ ] T+0 to T+180 depth products
- [ ] Street/intersection exposure layers
- [ ] Dynamic synchronized web GIS
- [ ] Flood-constrained route calculation
- [ ] Explicit no-safe-route behaviour
- [ ] Independent validation report
- [ ] Honest provenance and limitations throughout UI/docs

## Recommended Working Rhythm for Every Phase

1. Agree on the phase input and acceptance criteria.
2. Inspect the affected current code and data.
3. Implement only that phase’s smallest complete vertical slice.
4. Run unit, conservation and integration checks appropriate to the phase.
5. Review model output visually where spatial results are involved.
6. Update documentation with actual behaviour and remaining limitations.
7. Mark the phase complete only after its exit gate passes.

The active implementation work is **real municipal network integration and topology tracing**.
See REMAINING_MILESTONES.md for current delivery gates and external dependencies.
