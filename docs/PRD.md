# Product Requirements Document (PRD)
# Urban Flood Nowcasting & Decision-Support System — SIH26085

---

## 1. Product Overview

### 1.1 Product Name
**FloodGuard AI** — Urban Flood Nowcasting & Municipal Decision-Support System

### 1.2 Product Vision
> Bridge the gap between meteorological rainfall warnings and hyperlocal urban flood decision-making by coupling rainfall with terrain elevation, drainage network capacity, and blockage scenarios.

### 1.3 Target Users

| User Type | Primary Need |
|-----------|--------------|
| **Municipal Officers & Disaster Management** | Ward & road-level risk overview, actionable inspection priorities, drainage stress alerts |
| **Citizens** | Hyperlocal flood risk awareness, nearby risk zone visualization, safety warnings |
| **Field Response Teams** | Targeted deployment to overwhelmed drainage segments and flooded roads |

---

## 2. Core Differentiator & Design Principles

### 2.1 Core Innovation
Rainfall alone does not explain urban flooding. FloodGuard AI couples rainfall-driven surface runoff with terrain slope, low-lying accumulation, estimated drainage capacity, and blockage/obstruction scenarios.

### 2.2 Truth in Data & Explainability
- **Explainable Risk Outputs**: Every high-risk zone provides contributing factors (Rainfall + Elevation + Drainage Stress + Blockage Scenario).
- **Explicit Data Quality Labels**:
  - **Observed**: Directly measured or official feeds.
  - **Derived**: Computed from static spatial datasets (e.g. slope from DEM).
  - **Estimated**: Calculated using engineering proxies when data is sparse.
  - **Simulated**: Artificially configured for scenario testing and prototype demonstration.

---

## 3. Functional Requirements

### 3.1 Municipal Web Dashboard

#### FR-A1: City & Ward Risk Heatmap
- **Priority:** P0 (Must Have)
- **Description:** Interactive map showing flood risk levels across wards, roads, and drainage segments.
- **Acceptance:** Leaflet map rendering color-coded risk polygons with zoom/pan capabilities.

#### FR-A2: Drainage Capacity & Blockage Scenario Controls
- **Priority:** P0
- **Description:** Allow municipal officers to simulate drain blockage levels (0%, 25%, 50%, 75%, 100%).
- **Formula:** `Effective Capacity = Base Capacity × (1 - Blockage Fraction)`
- **Acceptance:** Toggling blockage slider dynamically updates downstream risk score and affected road highlights.

#### FR-A3: Actionable Alert Panel
- **Priority:** P0
- **Description:** Right-side panel presenting high-risk zones, root cause, expected timeline (NOW, +1h, +3h, +6h), and recommended inspection priority.
- **Acceptance:** Displays top 5 critical drainage segments requiring field inspection.

#### FR-A4: Data Quality & Provenance Indicator
- **Priority:** P0
- **Description:** Clearly label whether current view relies on Observed, Estimated, or Simulated data.
- **Acceptance:** Data status badge visible in header/legend.

### 3.2 Citizen Interface

#### FR-C1: Location-Based Flood Risk Display
- **Priority:** P0
- **Description:** Display current risk score and risk level (Low, Moderate, High, Critical) for user location.

#### FR-C2: Interactive Flood Risk Map
- **Priority:** P0
- **Description:** 4-5 km radius map with color-coded risk zones and flooded road reports.

#### FR-C3: Crowdsourced Incident Reporting
- **Priority:** P1 (Should Have)
- **Description:** Citizens can report local waterlogging with GPS location and photo tag for validation.

### 3.3 Backend System & Risk Engine

#### FR-B1: Rainfall Data Ingestion
- **Priority:** P0
- **Description:** Fetch current and forecast rainfall from weather APIs (OpenWeatherMap / IMD feeds).

#### FR-B2: Hydrological & Drainage Risk Engine
- **Priority:** P0
- **Description:** Deterministic calculation combining surface runoff volume with effective drainage conveyance capacity.
- **Acceptance:** FastAPI response time <2 seconds per query.

#### FR-B3: Geospatial DEM & Network Processing
- **Priority:** P0
- **Description:** Extract elevation, slope, and flow accumulation from DEM grids and OpenStreetMap networks via PostGIS / GeoPandas.

#### FR-B4: Optional ML Calibration Layer
- **Priority:** P1
- **Description:** Scikit-learn / XGBoost model skeleton to calibrate baseline risk scores when historical flood observations exist.

---

## 4. Non-Functional Requirements

### 4.1 Performance & Scalability
- **API Latency:** <2 seconds for risk queries.
- **Map Load Time:** <3 seconds.
- **Architecture:** Containerized, city-agnostic backend ready for multi-tenant geospatial setup.

### 4.2 Technical Credibility & Defensability
- **No Manufactured Metrics:** Accuracy claims must only be stated when backed by empirical validation against historical datasets.
- **Fallback Capability:** Graceful fallback to estimated/simulated drainage properties if municipal GIS vector layers are missing.

---

## 5. Scope & Phased Roadmap

### Phase 1 — SIH Prototype (Current)
- Web Dashboard + Leaflet Map + FastAPI Backend + PostGIS
- Rainfall ingestion + DEM elevation lookup + Drainage capacity & blockage scenario engine
- Actionable alert panel + Explainable risk breakdown
- Transparent data quality indicators (Observed / Estimated / Simulated)
- Q&A-ready 40-question defense sheet + 6-Slide Presentation Deck + 15-Page Detailed Report

### Phase 2 — Pilot & Field Validation
- Official municipal drainage data integration
- High-resolution Cartosat / LiDAR elevation grids
- Historical flood incident validation & ML model calibration
- Water-level sensor stream integration

---

*PRD Version 2.0 (Revised) | SIH 2026*
