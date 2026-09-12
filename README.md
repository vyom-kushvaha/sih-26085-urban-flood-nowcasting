# R.A.K.S.H.A.K.

**R.A.K.S.H.A.K. — Real-time Assessment & Knowledge System for Hydrological Alerts**


Smart India Hackathon 2026 software project for the Ministry of Earth Sciences / NCMRWF disaster-management problem statement.

## Required outcome

The problem asks for a 0–3 hour street-level urban flood nowcast that couples:

- spatial rainfall nowcasts, ultimately from Doppler Weather Radar;
- a high-resolution terrain model;
- a directed storm-drain graph with hydraulic capacities;
- 2D surface routing with drainage surcharge and backflow;
- a web GIS showing forecast water depth through time;
- an API for flood-aware navigation routes.

## Current state

This repository is a prototype. It contains a FastAPI backend, a vanilla HTML/JavaScript Leaflet dashboard, point-weather integrations, a local runoff/risk estimator, OSM waterway context and route demonstrations.

It implements bounded prototypes for directed drainage inspection/capacity, surface routing, bidirectional surface-drain exchange, rainfall remapping and saved forecast layers. These are not validated production hydraulics. Doppler radar acquisition and independent model calibration remain pending. The current 30 m CartoDEM data is regional context and is not sufficient for street or society-road elevation claims.

Public BMC pilot data has now been acquired: 990 manholes (including boundary references), 575 existing drain records plus 442 excluded proposals, and 1,152 contour features. OSM road/waterway topology and a numerical weather snapshot were also downloaded. See the [acquisition report and remaining data requirements](docs/PILOT_DATA_ACQUISITION.md). Terrain accuracy, datum compatibility, hydraulic boundaries and event validation still require evidence before operational predictions can be enabled.

See the project requirements and implementation sequence:

- [Product requirements](docs/PRD.md)
- [Phase plan](docs/PHASE_PLAN.md)
- [High-resolution terrain plan](docs/HIGH_RES_TERRAIN_PLAN.md)

## Run locally

Python 3.11 or 3.12 is recommended.

```powershell
python -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements-dev.txt

# Database Setup
# 1. Install PostgreSQL and PostGIS.
# 2. Copy .env.example to .env and configure DATABASE_URL.
# 3. Apply database migrations:
.\.venv\Scripts\alembic upgrade head

# Start the server
.\.venv\Scripts\python.exe -m uvicorn backend.main:app --reload
```

Open `http://127.0.0.1:8000`. The frontend uses the same backend origin. Serve it through FastAPI; do not open the HTML directly as a file. Set `window.RAKSHAK_API_BASE` only when intentionally using a separate backend.

## Verify

From the repository root:

```powershell
powershell -ExecutionPolicy Bypass -File scripts\verify.ps1
```

The verified baseline recorded on 11 September 2026 is **87 passed**. Warnings concern upstream library deprecations and do not fail the suite.

## Data provenance

Every map or API product should identify itself as `OBSERVED`, `MODELLED`, `ESTIMATED` or `SIMULATED`. Hardcoded map hotspots are illustrative UI scenarios. A route must not be presented as flood-safe when the routing or flood service is unavailable.

Large or restricted terrain datasets should remain outside Git. Store their metadata and checksums in the repository and configure their local path through the environment.

Validate a supplied high-resolution DTM before enabling it:

```powershell
.\.venv\Scripts\python.exe scripts\validate_high_res_terrain.py --manifest path\to\terrain_manifest.json --lat 19.0182 --lon 72.8455
```
