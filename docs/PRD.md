# Product Requirements Document (PRD)
# Urban Flood Nowcasting System — SIH26085

---

## 1. Product Overview

### 1.1 Product Name
**FloodGuard AI** — Urban Flood Nowcasting & Early Warning System

### 1.2 Product Vision
> Empower cities with real-time flood prediction and citizen-centric early warnings, saving lives and reducing property damage through AI-powered nowcasting.

### 1.3 Target Users

| User Type | Count | Primary Need |
|-----------|-------|-------------|
| **Citizens** | Millions | Personal safety, route planning |
| **Municipal Officials** | 100s | Resource deployment, coordination |
| **Disaster Response Teams** | 1000s | Rescue planning, shelter management |
| **Researchers** | 100s | Data analysis, model improvement |

---

## 2. User Personas

### 2.1 Citizen — Rajesh (Auto-rickshaw driver, Dharavi)

- **Age:** 35
- **Device:** Android phone (₹8,000 range)
- **Connectivity:** 4G, sometimes patchy
- **Needs:**
  - Simple flood alert (yes/no)
  - Safe route to home
  - Works on low data
  - Voice/SMS backup

### 2.2 Municipal Officer — Mrs. Sharma (BMC, Disaster Cell)

- **Age:** 45
- **Device:** Laptop + Tablet
- **Needs:**
  - City-wide risk overview
  - Ward-level heatmap
  - Resource deployment tools
  - Alert broadcast system
  - Historical data for planning

### 2.3 Researcher — Dr. Kumar (IIT Bombay)

- **Age:** 38
- **Needs:**
  - Raw data access
  - Model performance metrics
  - API for custom analysis
  - Export functionality

---

## 3. Functional Requirements

### 3.1 Citizen Mobile App

#### FR-C1: Location Detection
- **Priority:** P0 (Must have)
- **Description:** Auto-detect user location via GPS
- **Acceptance:** Accuracy within 50 meters, <3 seconds

#### FR-C2: Real-time Rainfall Display
- **Priority:** P0
- **Description:** Show current rainfall intensity (mm/hr)
- **Acceptance:** Update every 15 minutes, data from IMD/OpenWeatherMap

#### FR-C3: Flood Risk Score
- **Priority:** P0
- **Description:** Display risk level (Low/Moderate/High/Critical)
- **Acceptance:** Based on rainfall + elevation + drainage + historical data

#### FR-C4: Interactive Risk Map
- **Priority:** P0
- **Description:** 4-5 km radius map with color-coded risk zones
- **Acceptance:** 
  - Zoom in/out
  - Pan
  - User location marker
  - Risk zone polygons
  - Rainfall overlay

#### FR-C5: Push Notifications
- **Priority:** P0
- **Description:** Alert when risk level changes
- **Acceptance:** <5 minute latency, customizable thresholds

#### FR-C6: Safe Route Suggestion
- **Priority:** P1 (Should have)
- **Description:** Suggest safest route to destination
- **Acceptance:** Avoids high-risk zones, considers real-time data

#### FR-C7: Nearest Shelter
- **Priority:** P1
- **Description:** Show nearest flood shelter with directions
- **Acceptance:** Distance, capacity, route

#### FR-C8: Crowdsourced Reporting
- **Priority:** P1
- **Description:** Citizens can report flooding with photo + location
- **Acceptance:** Photo upload, GPS tag, verification queue

#### FR-C9: Offline Mode
- **Priority:** P2 (Nice to have)
- **Description:** Basic functionality without internet
- **Acceptance:** Cached risk maps, last known rainfall

#### FR-C10: Multi-language Support
- **Priority:** P1
- **Description:** Hindi, Marathi, English
- **Acceptance:** All critical alerts in local language

### 3.2 Admin Dashboard

#### FR-A1: City-wide Risk Overview
- **Priority:** P0
- **Description:** Heatmap of all wards with risk levels
- **Acceptance:** Real-time update, color-coded, clickable wards

#### FR-A2: Ward-level Detail
- **Priority:** P0
- **Description:** Click ward → detailed risk analysis
- **Acceptance:** Rainfall, elevation, drainage, prediction timeline

#### FR-A3: Prediction Timeline
- **Priority:** P0
- **Description:** 1hr / 3hr / 6hr forecast
- **Acceptance:** Graph + map visualization

#### FR-A4: Resource Deployment Panel
- **Priority:** P1
- **Description:** Manage pumps, rescue teams, shelters
- **Acceptance:** Status, location, dispatch functionality

#### FR-A5: Alert Broadcast
- **Priority:** P0
- **Description:** Send alerts to citizens via SMS/App/Email
- **Acceptance:** Target by area, customizable message

#### FR-A6: Citizen Reports Management
- **Priority:** P1
- **Description:** View, verify, act on citizen reports
- **Acceptance:** Photo view, location map, verification status

#### FR-A7: Historical Analysis
- **Priority:** P2
- **Description:** Past flood events, model accuracy
- **Acceptance:** Date range, compare prediction vs actual

#### FR-A8: API Management
- **Priority:** P2
- **Description:** API keys, rate limits, usage analytics
- **Acceptance:** For third-party integrations

### 3.3 Backend System

#### FR-B1: Data Ingestion Pipeline
- **Priority:** P0
- **Description:** Fetch data from multiple sources
- **Sources:** IMD, OpenWeatherMap, sensors (if available)
- **Frequency:** Every 15 minutes

#### FR-B2: Flood Risk Calculation Engine
- **Priority:** P0
- **Description:** Physics-based + ML model
- **Acceptance:** <2 second response time per location

#### FR-B3: DEM Processing
- **Priority:** P0
- **Description:** Read, process, query elevation data
- **Acceptance:** SRTM 30m resolution, slope calculation

#### FR-B4: Drainage Network Integration
- **Priority:** P0
- **Description:** Model drainage capacity and overflow
- **Acceptance:** OSM data + municipal data (if available)

#### FR-B5: ML Model Training
- **Priority:** P1
- **Description:** Calibrate predictions using historical data
- **Acceptance:** Weekly retraining, accuracy tracking

#### FR-B6: Alert Engine
- **Priority:** P0
- **Description:** Trigger alerts based on risk thresholds
- **Acceptance:** Configurable thresholds, multi-channel delivery

---

## 4. Non-Functional Requirements

### 4.1 Performance

| Metric | Target |
|--------|--------|
| API Response Time | <2 seconds |
| Map Load Time | <3 seconds |
| App Launch Time | <5 seconds |
| Alert Latency | <5 minutes |
| Concurrent Users | 10,000+ |

### 4.2 Reliability

| Metric | Target |
|--------|--------|
| System Uptime | 99.5% |
| Data Accuracy | >80% |
| False Alarm Rate | <20% |
| Missed Detection Rate | <10% |

### 4.3 Security

- HTTPS everywhere
- API key authentication
- Rate limiting
- Data encryption at rest
- GDPR-like privacy for citizen data

### 4.4 Scalability

- Horizontal scaling via containers
- City-agnostic architecture
- Multi-tenant support

---

## 5. Data Requirements

### 5.1 External Data Sources

| Data | Source | Frequency | Cost |
|------|--------|-----------|------|
| Rainfall (current) | OpenWeatherMap | 15 min | Free tier |
| Rainfall (forecast) | IMD | 1 hour | Free |
| Radar imagery | RainViewer | 15 min | Free |
| DEM | SRTM / Bhuvan | Static | Free |
| Drainage | OSM | Static | Free |
| Flood history | News/Research | Static | Free |

### 5.2 Internal Data

| Data | Storage | Retention |
|------|---------|-----------|
| User locations | PostgreSQL | 24 hours |
| Risk calculations | PostgreSQL | 7 days |
| Citizen reports | PostgreSQL + S3 | 1 year |
| Model predictions | PostgreSQL | 90 days |
| Alert logs | PostgreSQL | 1 year |

---

## 6. User Interface Requirements

### 6.1 Mobile App (Citizen)

```
┌─────────────────┐
│  🌧️ 45 mm/hr   │  ← Header: Rainfall
│  🔴 HIGH RISK   │  ← Risk Score
├─────────────────┤
│                 │
│   [MAP VIEW]    │  ← 4-5km radius
│   🟢 🟡 🔴      │     Color-coded zones
│      📍         │     User location
│                 │
├─────────────────┤
│  🚨 Alert: Move │  ← Action card
│     to shelter  │
├─────────────────┤
│  [Report] [Route]│  ← Action buttons
└─────────────────┘
```

### 6.2 Web Dashboard (Admin)

```
┌─────────────────────────────────────┐
│  FloodGuard AI | Mumbai | Admin    │
├──────────┬──────────────────────────┤
│          │                          │
│ WARD LIST│    [CITY HEATMAP]        │
│ ├─ Ward 1│    🟢🟡🟡🔴🔴           │
│ ├─ Ward 2│    🟢🟢🟡🟡🔴           │
│ ├─ Ward 3│    🟢🟢🟢🟡🟡           │
│ ...      │                          │
│          │                          │
├──────────┴──────────────────────────┤
│  Timeline: [1hr] [3hr] [6hr]      │
├─────────────────────────────────────┤
│  Resources: Pumps: 5/8 | Teams: 3/5 │
└─────────────────────────────────────┘
```

---

## 7. Release Criteria

### MVP (SIH Submission)
- [ ] Citizen app: Location + Rainfall + Risk + Map
- [ ] Admin dashboard: City overview + Ward detail
- [ ] Backend: 5 APIs working
- [ ] Mumbai data integrated
- [ ] Demo mode for 2-3 cities
- [ ] PPT + Demo video ready

### V1 (Post-SIH)
- [ ] Multi-city deployment
- [ ] IoT sensor integration
- [ ] ML model trained on historical data
- [ ] SMS/IVRS alerts
- [ ] Municipal corporation partnerships

---

*PRD Version 1.0 | SIH 2026*
