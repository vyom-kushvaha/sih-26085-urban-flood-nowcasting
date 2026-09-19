# R.A.K.S.H.A.K.

> **Real-time Assessment & Knowledge System for Hydrological Alerts**

[![Python 3.12](https://img.shields.io/badge/Python-3.12-3776AB?logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.141-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![SIH 2026](https://img.shields.io/badge/Smart%20India%20Hackathon-2026-orange)](https://www.sih.gov.in/)

R.A.K.S.H.A.K. is an urban flood nowcasting and civic-response platform built for **Smart India Hackathon 2026, problem statement SIH26085**. It combines rainfall, terrain, drainage capacity, surface-water routing, and road exposure to help citizens and municipal teams understand near-term flood risk across Mumbai.

![R.A.K.S.H.A.K. urban flood response platform](idea-proposed-solution-visual.png)

## The Problem

Weather forecasts indicate how much rain may fall, but they do not directly show where streets will flood, when drainage will surcharge, or which roads should be avoided. R.A.K.S.H.A.K. bridges that operational gap by coupling rainfall inputs with terrain and drainage behavior, then presenting the result through an interactive map and APIs.

The intended outcome is a street-level, 0-3 hour urban flood nowcast that supports:

- citizens choosing lower-risk routes and reporting local flooding;
- municipal control rooms inspecting hotspots and coordinating response;
- planners reviewing drainage constraints and historical scenarios;
- researchers integrating forecast, depth, hotspot, and road-exposure data.

## Key Features

- **Interactive flood map** with rainfall, forecast depth, hotspots, roads, drainage, and timeline layers.
- **Rainfall-drainage coupling** with directed drainage topology, hydraulic capacity, surcharge, and backflow prototypes.
- **Surface-water simulation** over terrain grids for configurable rainfall scenarios.
- **Flood-aware routing** using road geometry, forecast exposure, and external OSRM routing services.
- **Saved forecast runs** with map metadata, depth grids, hotspot GeoJSON, drainage state, and road exposure.
- **Civic operations** for citizen reports, municipal notices, shelters, administrative review, and audit history.
- **Weather and rainfall ingestion** with Open-Meteo support and an adapter for approved official feeds.
- **Data readiness checks** for terrain, drainage, rainfall, and database inputs.
- **Automatic API documentation** through FastAPI's Swagger UI and OpenAPI schema.

## Architecture

```text
Rainfall feeds       Terrain / DEM       Drainage network       Road network
      |                    |                    |                     |
      +--------------------+--------------------+---------------------+
                                   |
                    Coupled flood simulation engine
                                   |
             +---------------------+---------------------+
             |                                           |
      FastAPI REST API                         Forecast persistence
             |                                PostgreSQL / SQLite
             |
      Web GIS dashboard
      Leaflet + vanilla JavaScript
```

| Layer | Technology |
| --- | --- |
| Frontend | HTML, CSS, JavaScript, Leaflet |
| API | Python 3.12, FastAPI, Pydantic |
| Flood engine | NumPy, Rasterio, PyProj, Shapely |
| Persistence | PostgreSQL/PostGIS with a development SQLite fallback |
| Migrations | SQLAlchemy, Alembic, GeoAlchemy2 |
| External services | Open-Meteo, OSRM, optional official rainfall feed |
| Deployment | Docker, Render, Vercel serverless adapter |

For deeper technical context, see the [system design](docs/SYSTEM_DESIGN.md), [product requirements](docs/PRD.md), and [model documentation](docs/MODEL_DOCUMENTATION.md).

## Quick Start

### Prerequisites

- Python **3.11 or 3.12** (3.12 is the tested deployment version)
- Git
- Node.js (only required for frontend verification)
- PostgreSQL with PostGIS (optional locally; required for durable production use)

### 1. Clone the repository

```bash
git clone https://github.com/vyom-kushvaha/sih-26085-urban-flood-nowcasting.git
cd sih-26085-urban-flood-nowcasting
```

### 2. Create a virtual environment

Windows PowerShell:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install -r requirements-dev.txt
```

macOS or Linux:

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
pip install -r requirements-dev.txt
```

### 3. Configure the application

Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

macOS or Linux:

```bash
cp .env.example .env
```

The default configuration allows the local SQLite fallback, so PostgreSQL is not required for a first run. Add service credentials only for integrations you intend to use.

### 4. Start localhost

```bash
python -m uvicorn backend.main:app --reload --host 127.0.0.1 --port 8000
```

| Resource | URL |
| --- | --- |
| Web application | <http://127.0.0.1:8000> |
| Interactive API docs | <http://127.0.0.1:8000/docs> |
| Health check | <http://127.0.0.1:8000/health> |
| Readiness check | <http://127.0.0.1:8000/readiness> |

The frontend is served by FastAPI and should not be opened directly with a `file://` URL.

## Database Setup

SQLite is suitable for local exploration. For PostgreSQL/PostGIS, create a database, enable PostGIS, set `DATABASE_URL` in `.env`, and apply the migrations:

```env
DATABASE_URL=postgresql+psycopg2://postgres:password@localhost:5432/urban_flood_db
ALLOW_SQLITE_FALLBACK=false
```

```bash
alembic upgrade head
```

Production deployments should use persistent PostgreSQL/PostGIS storage and set `ALLOW_SQLITE_FALLBACK=false`.

## Configuration

The complete template is in [.env.example](.env.example). Important settings include:

| Variable | Purpose | Local default |
| --- | --- | --- |
| `ENV` | Runtime mode: `development`, `test`, or `production` | `development` |
| `DATABASE_URL` | PostgreSQL/PostGIS connection URL | empty |
| `ALLOW_SQLITE_FALLBACK` | Permit local SQLite storage | `true` |
| `CORS_ORIGINS` | Comma-separated allowed web origins | localhost origins |
| `RAINFALL_PRIMARY_PROVIDER` | `open_meteo` or an approved `official` feed | `open_meteo` |
| `OSRM_BASE_URLS` | Comma-separated routing endpoints | public OSRM endpoints |
| `TERRAIN_MANIFEST_PATH` | Validated high-resolution terrain manifest | empty |
| `MUNICIPAL_API_TOKEN` | Admin bearer token of at least 32 characters | empty |
| `FORECAST_ASSETS_PATH` | Saved forecast output directory | `data/runtime/runs` |
| `OPERATIONS_DB_PATH` | Local civic-operations database | `data/runtime/operations.sqlite3` |

Never commit `.env`, API keys, municipal tokens, or restricted datasets.

## API Overview

All principal APIs use the `/api/v1` prefix.

| Area | Representative endpoints |
| --- | --- |
| Risk and scenarios | `/risk/current`, `/risk/forecast`, `/risk/simulate`, `/scenarios` |
| Safe routing | `/routing/safe-route`, `/risk/safe-route` |
| Weather and rainfall | `/weather/current`, `/weather/forecast`, `/rainfall/current` |
| Drainage | `/drainage/topology`, `/drainage/capacity`, `/drainage/simulate` |
| Surface simulation | `/surface/forecast`, `/surface/coupled`, `/surface/simulate` |
| Forecast artifacts | `/forecasts`, `/forecasts/{run_id}/depth`, `/forecasts/{run_id}/roads.geojson` |
| Road exposure | `/roads/exposure`, `/roads/demo-exposure` |
| Civic operations | `/reports`, `/notices`, `/shelters`, `/admin/reports` |
| Data status | `/data/readiness` |

Example:

```bash
curl http://127.0.0.1:8000/api/v1/health
```

Use the running Swagger UI for authoritative request and response schemas. More notes are available in [API_DOCUMENTATION.md](docs/API_DOCUMENTATION.md).

## Testing

Run the full verification suite on Windows:

```powershell
powershell -ExecutionPolicy Bypass -File scripts\verify.ps1
```

Run Python tests directly on any platform:

```bash
python -m pytest -q
```

The verification script also runs JavaScript frontend checks and therefore requires Node.js.

## Data and Model Notes

Every map or API product should identify its provenance as `OBSERVED`, `MODELLED`, `ESTIMATED`, or `SIMULATED`. The repository includes public BMC pilot records, OSM-derived context, historical scenarios, and example data. Large or restricted terrain datasets must remain outside Git.

Validate a supplied high-resolution DTM before enabling it:

```bash
python scripts/validate_high_res_terrain.py --manifest path/to/terrain_manifest.json --lat 19.0182 --lon 72.8455
```

Read [DATA_SOURCES.md](docs/DATA_SOURCES.md), [PILOT_DATA_ACQUISITION.md](docs/PILOT_DATA_ACQUISITION.md), and [HIGH_RES_TERRAIN_PLAN.md](docs/HIGH_RES_TERRAIN_PLAN.md) before substituting operational datasets.

## Project Structure

```text
.
|-- api/                 # Vercel serverless entry point
|-- backend/             # FastAPI routers, services, configuration, and storage
|-- data/                # Schemas, public pilot inputs, and processed map assets
|-- docs/                # Product, API, model, data, and deployment documentation
|-- flood-engine/        # Terrain, drainage, runoff, and routing algorithms
|-- frontend/            # Web GIS application and static assets
|-- migrations/          # Alembic database migrations
|-- models/              # Model artifact guidance
|-- scripts/             # Acquisition, validation, startup, and verification tools
`-- tests/               # Python and JavaScript test suites
```

## Deployment

- **Docker:** `docker build -t rakshak .`, then `docker run --env-file .env -p 8000:7860 rakshak`.
- **Render:** use the included `render.yaml` and [deployment guide](docs/DEPLOY_RENDER.md).
- **Northflank:** follow [DEPLOY_NORTHFLANK.md](docs/DEPLOY_NORTHFLANK.md).
- **Vercel:** `vercel.json` and `api/index.py` provide a lightweight serverless path. Heavy geospatial workflows are better suited to the container deployment.

## Current Status and Limitations

This repository is a research and demonstration prototype, not a certified emergency-warning system. It contains bounded implementations of drainage inspection, rainfall remapping, coupled surface-drain exchange, saved forecasts, road exposure, and civic workflows. It does **not** yet provide validated production hydraulics.

Known gaps include independent event calibration, approved Doppler weather-radar ingestion, verified high-resolution terrain for street-level claims, hydraulic boundary validation, and production-grade alert delivery. The bundled 30 m CartoDEM is regional context and must not be treated as street-level elevation evidence. A route must not be represented as flood-safe when routing or forecast services are unavailable.

## Team

| Field | Details |
| --- | --- |
| Team name | **The OutThinkers** |
| Team ID | **132351** |
| Event | Smart India Hackathon 2026 |
| Problem statement | SIH26085 - Urban Flood Nowcasting System (Drainage and Rainfall Coupling) |
| Theme | Disaster Management |
| Organization | Ministry of Earth Sciences (MoES) / NCMRWF |

### Team Members

| Member | Role | Primary responsibilities |
| --- | --- | --- |
| [Vyom Kushvaha](https://github.com/vyom-kushvaha) | Team Lead and Systems Architect | Technical direction, backend architecture, flood-engine integration, project coordination, and system validation |
| Riddhi Katariya | Research and Documentation Lead | Domain research, analytical reporting, technical documentation, and video content development |
| Pranjal Pansara | Presentation and Impact Strategist | Presentation design, innovation and impact analysis, solution storytelling, and supporting documentation |
| Panth Jogani | Frontend Engineer | Web dashboard development, interface implementation, and frontend integration |
| Niyati Tilva | Frontend Engineer | User-interface development, dashboard components, and frontend experience improvements |
| Dev Shah | Simulation and Data Engineer | Core flood-engine development, backend support, and geospatial data discovery and preparation |

## Contributing

1. Create a branch from `main`.
2. Keep changes focused and add tests for changed behavior.
3. Run `python -m pytest -q` and the frontend checks before opening a pull request.
4. Document the provenance, license, resolution, and coordinate reference system of new datasets.
5. Do not describe simulated or estimated outputs as observations.

Use [GitHub Issues](https://github.com/vyom-kushvaha/sih-26085-urban-flood-nowcasting/issues) for bugs, feature proposals, and data-quality concerns.

## License

This project is available under the [MIT License](LICENSE).

## Acknowledgements

R.A.K.S.H.A.K. uses or evaluates public data and services from BMC/MCGM, OpenStreetMap contributors, Open-Meteo, OSRM, and Indian geospatial and meteorological sources documented in the data provenance notes. Their inclusion does not imply operational endorsement or validation of this prototype.
