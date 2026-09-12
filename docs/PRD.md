# Product Requirements Document (PRD)

**R.A.K.S.H.A.K. — Real-time Assessment & Knowledge System for Hydrological Alerts**


# Urban Flood Nowcasting System — SIH26085

**Version:** 3.0  
**Target city for the SIH prototype:** Mumbai  
**Problem owner:** Ministry of Earth Sciences (MoES), NCMRWF  
**Category:** Software — Disaster Management

## 1. Problem to Solve

Weather forecasts say how much rain may fall, but municipal teams and citizens need to know which road or intersection will flood, how deep the water may become, when it will happen, and which route remains usable.

The product must convert a 0–3 hour rainfall nowcast into street-level inundation predictions by coupling:

1. spatial rainfall from Doppler Weather Radar (DWR),
2. a high-resolution terrain and urban surface model,
3. rainfall-to-runoff generation,
4. a directed graph of inlets, manholes, pipes, canals and outfalls,
5. hydraulic capacity, blockage, surcharge and surface backflow, and
6. a web GIS and routing API for operational decisions.

## 2. What the Problem Statement Requires

| ID | Required capability | Minimum demonstrable result |
|---|---|---|
| PS-01 | Real-time high-resolution rainfall nowcast | Spatial rainfall grids for T+0 to T+3 hours, with source time and quality metadata |
| PS-02 | DWR-derived rainfall | Radar ingestion or a clearly labelled adapter that accepts radar-derived rainfall grids |
| PS-03 | High-resolution DEM | Validated elevation grid covering the prototype area |
| PS-04 | 2D urban surface model | Water moves between terrain cells through time; output is water depth per cell |
| PS-05 | Urban runoff | Rainfall is converted to runoff using spatial imperviousness/land-cover parameters |
| PS-06 | Directed drainage graph | Typed inlet/manhole/outfall nodes and pipe/canal edges with connectivity and direction |
| PS-07 | Drainage hydraulics | Capacity and flow calculated from geometry, slope, roughness and hydraulic state |
| PS-08 | Blockage and overcapacity | Asset-specific blockage scenarios affect downstream and upstream state |
| PS-09 | Surcharge and backflow | Full downstream drainage can raise node head and return water to the surface |
| PS-10 | Surface–drainage coupling | Conservative exchange of water through inlets/manholes at every timestep |
| PS-11 | Street-level 0–3 hour output | T+0, T+30, T+60, T+120 and T+180 depth/risk layers |
| PS-12 | Dynamic web GIS | Time-controlled depth, drainage-state, alert and provenance layers |
| PS-13 | Flood-safe routing API | Origin/destination route calculated on a road graph with flooded edges penalized or closed |
| PS-14 | Operational users | Outputs usable by emergency services, public transit, municipalities and commuters |
| PS-15 | Validation and explainability | Predictions compared with observations; causes, inputs and uncertainty are shown |

## 3. Product Goal

For a selected Mumbai pilot catchment, produce a defensible 0–3 hour forecast that answers:

- Which grid cells, streets and intersections are expected to flood?
- What is the estimated water depth in centimetres at each forecast time?
- Which drain nodes or pipes are overloaded, blocked or surcharging?
- Where does underground water return to the road surface?
- Which route is safest for a specified vehicle or user type?
- Which inputs are observed, derived, estimated or simulated?

## 4. Target Users and Decisions

| User | Decision supported |
|---|---|
| Municipal control room | Dispatch pumps and inspection teams; close roads; prioritize drainage assets |
| Emergency services | Select an accessible route with vehicle-specific depth constraints |
| Public transit operator | Identify unsafe road segments and temporary diversions |
| Commuter/citizen | Avoid flooded routes and understand local forecast risk |
| Model operator/researcher | Inspect data quality, model state, validation results and forecast provenance |

## 5. Current Repository Compared with the Required Product

This table records the baseline as of this PRD revision. A related filename or UI label is not counted as a complete implementation.

| Area | Existing repository | Required end state | Gap |
|---|---|---|---|
| Rainfall | OpenWeatherMap/Open-Meteo point observations and hourly forecasts; synthetic fallback | DWR-derived spatial rainfall grids for the entire pilot catchment | Major |
| Terrain | Four local 30 m CartoDEM rasters and slope calculation | Correctly georeferenced and validated urban terrain; main hotspot queries must not fall back | Major |
| Runoff | Uniform coefficient of 0.85 | Spatial imperviousness/land-cover runoff parameters and losses | Major |
| Surface model | Detached four-neighbour grid routines | Integrated, timestep-controlled, conservative 2D routing producing forecast depth grids | Major |
| Drainage data | 1,317 OSM waterway LineStrings and nearest-feature lookup | Typed, connected, directed inlet/manhole/pipe/canal/outfall network | Critical |
| Drainage capacity | Empirical 15–55 mm/hr proximity estimate | Geometry- and state-based hydraulic flow/capacity calculation | Critical |
| Coupling | One-way subtraction of an estimated capacity | Bidirectional inlet exchange, surcharge and backflow | Critical |
| Forecast output | Point risk/depth timeline | Time-indexed flood-depth maps and street/intersection predictions | Critical |
| ML | Untrained five-feature inference hook | Trained/calibrated model only if independent observations support it | Major |
| Routing | Hand-authored corridors or ordinary OSRM alternatives scored at sample points | Flood-aware shortest path on road edges using forecast depth and vehicle constraints | Major |
| GIS | Leaflet map with drainage and route layers; several hardcoded hotspots | Synchronized dynamic forecast, drainage state and alert layers | Major |
| Persistence | PostGIS schema and optional risk-result log | Persisted inputs, model runs, forecasts, assets, reports and alerts | Moderate |
| Alerts | In-memory demonstration advisories | Rule-driven, persistent alerts with acknowledgement and delivery status | Major |
| Validation | Software tests and historical rainfall replay | Independent water-depth/extent/timing evaluation | Critical |

## 6. Product Scope

### 6.1 SIH Core Demonstration Scope — P0

The prototype will focus on one bounded Mumbai pilot catchment or corridor where terrain, drainage and roads can be validated. It must demonstrate:

- one spatial rainfall-grid adapter with a DWR-compatible input contract;
- corrected and validated terrain preprocessing;
- a working directed drainage graph with representative inlets, manholes, pipes/canals and an outfall;
- geometry-based pipe capacity and timestep-based node continuity;
- blockage, downstream overcapacity, surcharge and backflow;
- coupled surface and drainage simulation;
- time-indexed water-depth results through T+180;
- street-edge flood exposure and a safer alternative route;
- GIS layers driven by backend model output;
- transparent data provenance and an observed-event validation report.

### 6.2 Strong SIH Enhancements — P1

- live radar provider integration when access is available;
- spatial imperviousness from land-cover data;
- multiple rainfall ensembles and uncertainty bands;
- persistent citizen reports and municipal alert workflows;
- emergency vehicle profiles and public-transit route modes;
- trained residual-correction ML model using independent observations;
- scheduled nowcast cycles and operational monitoring.

### 6.3 Later/Pilot Scope — P2

- full Mumbai drainage inventory;
- live municipal sensors and pump telemetry;
- LiDAR or surveyed road/invert elevations;
- multi-city configuration;
- SMS/WhatsApp/IVRS delivery;
- high-availability production infrastructure.

## 7. Functional Requirements

### FR-01 — Rainfall Grid Ingestion (P0)

The system shall accept a sequence of georeferenced rainfall rasters for T+0 through T+3 hours.

Acceptance criteria:

- each frame contains valid time, issue time, units, CRS, resolution and source;
- rates or accumulations are explicitly distinguished and correctly converted;
- missing or stale frames are rejected or clearly marked;
- observed, forecast and simulated inputs are never visually confused;
- the same contract can accept future DWR-derived grids without changing the flood engine.

### FR-02 — Terrain and Surface Preprocessing (P0)

The system shall create a simulation-ready terrain grid from the DEM.

Acceptance criteria:

- CRS, horizontal datum, vertical datum, nodata and units are validated;
- known pilot-area control points pass elevation sanity checks;
- depressions and drainage paths are handled using a documented method;
- every output cell retains its spatial coordinates and resolution;
- fallback constants are not used inside the official demonstration area.

### FR-03 — Spatial Runoff Generation (P0)

The system shall convert rainfall into cell-wise surface runoff.

Acceptance criteria:

- runoff coefficient or loss model varies by land cover/imperviousness where data exists;
- rainfall volume and runoff volume are reported per timestep;
- a uniform fallback is clearly labelled as estimated;
- zero rainfall creates no new runoff.

### FR-04 — Directed Drainage Graph (P0)

The system shall represent the pilot drainage system as a directed graph.

Required node fields:

- stable ID, type, coordinates, ground elevation, invert elevation and storage/area;
- node type must include inlet, manhole/junction and outfall.

Required edge fields:

- stable ID, upstream node, downstream node, type, length, diameter/shape, slope, roughness and blockage state.

Acceptance criteria:

- all edges reference valid nodes;
- direction and downstream traversal are testable;
- disconnected and cyclic components are reported;
- the demo can trace `inlet → manhole → pipe → manhole → main drain → outfall`.

### FR-05 — Drainage Hydraulic Solver (P0)

The system shall calculate flow and hydraulic state through the drainage graph.

Acceptance criteria:

- capacity is derived from edge geometry, slope and roughness using a documented equation;
- node continuity conserves inflow, outflow, storage and overflow;
- downstream boundary condition is explicit;
- each timestep reports edge discharge/capacity ratio and node water level/head;
- blockage reduces capacity at a specified asset rather than globally.

### FR-06 — Surface Routing (P0)

The system shall route surface water between neighbouring terrain cells over time.

Acceptance criteria:

- routing responds to surface elevation, water depth, cell distance, roughness and timestep;
- routing stops when timestep is zero;
- boundary behaviour is explicit;
- rainfall input, surface storage, drainage exchange, boundary discharge and numerical error close the water balance within an agreed tolerance;
- output is a georeferenced water-depth grid for every required forecast time.

### FR-07 — Bidirectional Coupling (P0)

The system shall exchange water between surface cells and drainage nodes.

Acceptance criteria:

- a surface cell can send water through an inlet when receiving capacity exists;
- downstream filling reduces inlet acceptance;
- node head above road/inlet level produces surcharge onto the corresponding surface cell;
- the canonical downstream-overload scenario has an automated test;
- exchange volume is included in both surface and network mass balances exactly once.

### FR-08 — Forecast Products (P0)

The system shall generate T+0, T+30, T+60, T+120 and T+180 outputs.

Each forecast shall provide:

- water depth in centimetres;
- risk category and confidence/data-quality class;
- flooded streets/intersections;
- overloaded edges and surcharging nodes;
- rainfall issue/valid time and model-run identifier;
- explanatory factors and input provenance.

### FR-09 — Dynamic Web GIS (P0)

Acceptance criteria:

- a time control updates flood-depth, road risk and drainage-state layers together;
- the map renders backend-produced rasters/polygons/road segments;
- clicking a street or asset shows depth, peak time, drainage cause and provenance;
- simulated/demo data has a persistent visible label;
- UI never presents fixed demo values as live observations.

### FR-10 — Flood-Aware Routing API (P0)

The API shall receive origin, destination, forecast time and user/vehicle profile.

Acceptance criteria:

- road edges intersecting forecast depth are penalized or closed by configured thresholds;
- the returned path is calculated after flood costs are applied;
- response includes geometry, ETA, maximum depth, affected segments, forecast valid time and reason for the detour;
- when every route violates safety limits, the API returns “no safe route” instead of certifying a least-bad route as safe;
- deterministic tests cover dry, partially flooded and no-safe-route conditions.

### FR-11 — Alerts and Decision Support (P1)

The system shall create persistent warnings from forecast thresholds and identify affected roads, assets and response priorities. Alert creation, acknowledgement, expiry and delivery status shall be auditable.

### FR-12 — Validation and Model Calibration (P0)

Acceptance criteria:

- at least one historical or controlled event has observed flood depth, extent, road closure or timestamp evidence;
- rainfall input validation is reported separately from flood-output validation;
- depth MAE/RMSE, wet/dry classification scores, spatial overlap and onset/peak timing error are reported where applicable;
- results include sample count and limitations;
- no accuracy percentage is shown without reproducible calculations.

### FR-13 — Optional ML Residual Correction (P1)

ML may correct systematic error after the physics model and validation dataset exist.

Acceptance criteria:

- training data, features, target, split strategy and artifact version are recorded;
- leakage from physics outputs or the test event is prevented;
- inference loads a real serialized artifact;
- ML must outperform the physics baseline on held-out observations;
- physics-only fallback remains available and is labelled.

## 8. Data Requirements

| Dataset | Required fields | Prototype source strategy |
|---|---|---|
| Rainfall | raster value, units, issue time, valid time, CRS | DWR-compatible adapter; live source where permitted; archived/sample grid for repeatable demo |
| DEM | elevation, CRS, vertical reference, nodata | Current CartoDEM only after validation; replace/augment if unusable |
| Land cover | class or impervious fraction | Open land-cover dataset or documented pilot-area classification |
| Drainage nodes | ID, type, coordinates, ground/invert levels | Municipal data if available; otherwise a clearly labelled, engineering-consistent pilot network |
| Drainage edges | endpoints, geometry, dimensions, slope, roughness | Municipal data if available; otherwise documented pilot assumptions |
| Roads | directed geometry, type, access and speed | OSM road network |
| Observations | location/time plus depth, extent or closure state | Municipal reports, published records, field observations or a controlled physical test |

Every record or raster must be classified as `OBSERVED`, `DERIVED`, `ESTIMATED`, `SIMULATED`, or `MODEL_OUTPUT`.

## 9. Core Data Flow

```text
DWR-compatible rainfall grids + validated DEM + imperviousness
                              + directed drainage graph
                                    ↓
                       timestep-based coupled solver
                    surface routing ↔ drainage hydraulics
                                    ↓
             depth grids + surcharging nodes + overloaded pipes
                                    ↓
                     PostGIS/model-run object storage
                          ↓                     ↓
                 dynamic web GIS       flood-aware road graph
                                                ↓
                                      safe route / no-safe-route
```

## 10. API Product Contract

Minimum endpoints:

- `POST /api/v1/model-runs` — create a forecast run from a rainfall-grid series;
- `GET /api/v1/model-runs/{id}` — status, input provenance and water balance;
- `GET /api/v1/forecasts/{id}/depth?lead_minutes=...` — depth raster/vector product;
- `GET /api/v1/forecasts/{id}/streets?lead_minutes=...` — street/intersection exposure;
- `GET /api/v1/forecasts/{id}/drainage?lead_minutes=...` — node/edge hydraulic state;
- `POST /api/v1/routes/safe` — flood-aware route or explicit no-safe-route response;
- `GET /api/v1/validation/{run_id}` — reproducible evaluation metrics;
- `GET /api/v1/health` — application and dependency status.

## 11. Non-Functional Requirements

| Area | Requirement |
|---|---|
| Reproducibility | A saved input bundle and configuration recreate the same model output |
| Performance | One pilot catchment 0–3 hour run completes within the agreed nowcast cycle; target under five minutes for SIH |
| API responsiveness | Cached map/query endpoints return within two seconds at p95 on demo hardware |
| Numerical integrity | Water balance and stability tests pass for every supported timestep |
| Reliability | External feed failure preserves the last valid forecast and clearly marks staleness |
| Security | Municipal actions use server-side authentication; secrets stay outside source code |
| Privacy | Citizen location/report retention is explicit and minimized |
| Accessibility | Keyboard-accessible controls, sufficient contrast and non-colour risk labels |
| Observability | Each run records timing, failures, data freshness and solver warnings |
| Honesty | Product labels and presentation claims match the active code and dataset provenance |

## 12. Success Metrics

Targets must be finalized after the validation dataset is chosen.

| Metric | Measurement |
|---|---|
| Forecast coverage | Percentage of pilot area receiving valid output at every required lead time |
| Depth error | MAE and RMSE against observed depths |
| Flood extent | Intersection-over-union and precision/recall for wet cells/roads |
| Timing | Error in flood onset and peak time |
| Hydraulic integrity | Relative water-balance error per run |
| Routing safety | Unsafe road edges included in the recommended route |
| Latency | Input arrival to published forecast time |
| Availability | Successful scheduled runs divided by expected runs |

No target metric is a result until it has been calculated from held-out observations.

## 13. Explicit Non-Goals for the SIH Core Build

- complete operational coverage of every Indian metro;
- claiming official municipal drainage telemetry when it is unavailable;
- claiming a trained AI model before a suitable dataset and evaluation exist;
- certifying public safety solely from synthetic or heuristic depths;
- reproducing a full commercial CFD package for the entire city;
- presenting design documents or mock UI as implementation evidence.

## 14. Definition of Done for the SIH Core

The core product is complete only when a repeatable pilot demonstration shows:

1. a rainfall-grid series entering the model;
2. runoff routed over validated terrain;
3. water entering a directed drain network;
4. a downstream restriction causing upstream surcharge and surface backflow;
5. time-indexed depth maps and drainage states;
6. flooded road edges changing the calculated route;
7. an explicit no-safe-route result under extreme conditions;
8. provenance and water balance for the run; and
9. comparison with at least one independent observed or controlled reference.

Until all nine conditions pass, the product must be described as a prototype with the remaining limitations stated explicitly.
