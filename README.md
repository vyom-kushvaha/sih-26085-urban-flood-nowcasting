# SIH26085 — Urban Flood Nowcasting System

> **Smart India Hackathon 2026** | Software Track | Disaster Management Theme
> 
> Ministry of Earth Sciences (MoES) | Prize: ₹1,00,000

---

## 🎯 Problem Statement

**SIH26085 — Urban Flood Nowcasting System (Drainage and Rainfall Coupling)**

Build an AI/ML-based system for real-time urban flood prediction (0-6 hours) by coupling rainfall data with urban drainage network capacity.

---

## 🚀 Solution Overview

Our system combines:
- **Real-time rainfall data** (IMD, OpenWeatherMap APIs)
- **Digital Elevation Model (DEM)** for terrain analysis
- **Diffusive-wave 2D hydraulic model** for surface flow simulation
- **Drainage network coupling** for overflow prediction
- **ML calibration layer** for accuracy improvement
- **Citizen app + Admin dashboard** for alerts and resource management

---

## 📱 Features

### Citizen App
- Auto GPS location detection
- Real-time rainfall display
- 4-5 km radius interactive risk map
- Flood risk score (Low/Moderate/High)
- Push notifications for alerts
- Crowdsourced flood reporting
- Nearest shelter directions

### Admin Dashboard
- City-wide flood risk overview
- Ward-level risk heatmap
- Real-time sensor data (if available)
- Resource deployment panel
- Alert broadcast system
- Historical analysis

---

## 🏗️ Architecture

```
External APIs          Static Data
├─ OpenWeatherMap      ├─ DEM (SRTM/Bhuvan)
├─ IMD                 ├─ Drainage (OSM)
└─ RainViewer          └─ Flood Zones
       ↓                    ↓
  ┌─────────────────────────────┐
  │      BACKEND (FastAPI)      │
  │  ├─ Data Ingestion          │
  │  ├─ Diffusive-Wave Model   │
  │  ├─ Risk Calculator         │
  │  └─ API Endpoints           │
  └─────────────────────────────┘
              ↓
  ┌─────────────────────────────┐
  │      FRONTEND               │
  │  ├─ Flutter Mobile App     │
  │  ├─ React.js Dashboard     │
  │  └─ Mapbox/Leaflet Maps    │
  └─────────────────────────────┘
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Mobile App | Flutter |
| Web Dashboard | React.js + Tailwind CSS |
| Backend | Python FastAPI |
| Database | PostgreSQL + PostGIS |
| ML Model | Python (scikit-learn, XGBoost) |
| Maps | Mapbox GL JS |
| Cloud | AWS Free Tier |

---

## 📂 Project Structure

```
sih-26085-urban-flood-nowcasting/
├── docs/                      # Comprehensive project documentation
│   ├── RI_PLAN.md             # Research, PPT & Q&A Master Document
│   ├── PROBLEM_STATEMENT.md   # SIH26085 problem analysis
│   ├── PRD.md                 # Product Requirements Document
│   ├── SYSTEM_DESIGN.md       # Architecture & system design
│   ├── FRONTEND_DESIGN.md     # UI/UX design (Flutter + React)
│   ├── Frontend_Design_SIH26085_v2.md # Enhanced UI design spec
│   ├── BACKEND_DESIGN.md      # API + DB design
│   ├── API_DOCUMENTATION.md   # API documentation & endpoints
│   ├── MODEL_DOCUMENTATION.md # Hydrological & ML model design
│   ├── DATA_SOURCES.md        # Data sources & APIs
│   ├── JUDGE_QA.md            # Expected Q&A for evaluation
│   ├── PRESENTATION_SCRIPT.md # Demo & pitch presentation script
│   └── PHASE_PLAN.md          # 4-day team execution timeline
├── backend/                   # FastAPI backend services
├── frontend/                  # Web dashboard & Mobile App
├── flood-engine/              # Core flood modeling & nowcasting engine
├── data/                      # Raw, processed, and sample datasets
├── models/                    # Hydrological & ML models
├── scripts/                   # Data fetching, preprocessing & utility scripts
├── tests/                     # Test suites
└── .github/                   # CI/CD workflows & automation
```

---

## 👥 Team

| Member | Role |
|--------|------|
| Vyom | Architecture + Engine + Integration |
| D | Backend + Engine Implementation |
| P | Frontend |
| PR | Presentation |
| Ri | Research + Evaluator Preparation |
| Ni | Frontend Support + QA |

---

## 📅 Timeline

**2 Sep → 5 Sep 2026** (4 Days)

See [PHASE_PLAN.md](docs/PHASE_PLAN.md) for detailed day-by-day breakdown.

---

## 🏆 SIH 2026

- **Problem Code:** SIH26085
- **Theme:** Disaster Management
- **Category:** Software
- **Organization:** Ministry of Earth Sciences (MoES)

---

*Built with ❤️ for Smart India Hackathon 2026*
