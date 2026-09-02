# Phase Plan — 4 Day Execution Timeline
# Urban Flood Nowcasting System — SIH26085

---

## Team Roles & Primary Responsibilities

| Member | Primary Role & Responsibility | Key Deliverables |
|--------|--------------------------------|------------------|
| **Vyom** | Lead Architect & Flood Engine Lead | Hydrological runoff & drainage logic, composite risk engine, system integration |
| **D** | Backend & Database Developer | FastAPI endpoints, PostgreSQL/PostGIS setup, elevation & weather data pipeline |
| **P + Ni** | Frontend Developers (Web Dashboard & Map) | React + TypeScript + Tailwind UI, Leaflet map, blockage scenario controls, alert panel |
| **Ri** | Lead Researcher & Q&A Lead | Data source verification, literature/reference review, Slides 2–6 technical content, 15-page detailed report, 40+20 Q&A sheet |
| **PR** | Presentation & Communications Lead | Slide 1 team info, PPT design & delivery, demo video script/recording, presentation rehearsal |

---

## Day 1: 2 September 2026 (Foundation Day)

### Morning (9 AM - 1 PM)

| Task | Owner | Deliverable |
|------|-------|-------------|
| GitHub repo setup + project structure | Vyom | Repo ready, README updated |
| FastAPI backend skeleton | D | `main.py` running on localhost |
| PostgreSQL + PostGIS setup | D | Database running, schema created |
| Elevation DEM & OpenRainfall pipeline setup | Vyom + D | DEM ingestion & slope calculation module |
| OpenStreetMap & drainage data processing | Vyom + D | Drainage network GeoJSON extraction |
| OpenWeatherMap / IMD API key configuration | D | Weather service integration |
| Dashboard UI wireframes & layout design | P + Ni | React component wireframes |
| Map library setup (Leaflet + React) | P | Interactive map component with base layers |
| Problem & Solution literature review | Ri | Verified data sources & reference catalog |
| PPT Slide 1 (Team Information) | PR | Slide 1 formatted with verified team details |

### Evening (2 PM - 10 PM)

| Task | Owner | Deliverable |
|------|-------|-------------|
| Elevation lookup API & raster processing | D | Elevation & slope endpoints operational |
| Weather API integration | D | `/weather/current` and forecast endpoints |
| Baseline Risk Engine logic (Rainfall + Slope) | Vyom + D | `/risk/current` returning explainable risk indicators |
| Web Dashboard layout (Header, Map, Side Panel) | P + Ni | Main dashboard shell rendering cleanly |
| Map overlay with risk zones | P + Ni | Color-coded risk polygons rendered |
| Slide 2 (Idea & Proposed Solution) content | Ri | Draft text & workflow for Slide 2 |
| Slide 2 & 3 PPT design | PR | Slides 2 & 3 formatted in master slide deck |

### Day 1 End Checklist
- [x] Backend running on `localhost:8000`
- [x] Database schema created (PostgreSQL + PostGIS)
- [x] DEM processing pipeline active
- [x] Weather API returning real-time / forecast rainfall
- [x] Basic explainable risk API returning data
- [x] React web dashboard displaying map & risk overlay
- [x] Slide 1 complete; Slides 2 & 3 content drafted

---

## Day 2: 3 September 2026 (Core Build Day)

### Morning (9 AM - 1 PM)

| Task | Owner | Deliverable |
|------|-------|-------------|
| Effective Drainage Capacity algorithm | Vyom + D | Effective Capacity = Base × (1 - Blockage) |
| Blockage scenario simulation engine | Vyom + D | Blockage factor endpoints (0%, 25%, 50%, 75%, 100%) |
| Road exposure & accumulation risk coupling | Vyom + D | Surface runoff vs drainage capacity calculation |
| Explainable Risk API endpoint | Vyom + D | `/risk/explain` returns contributing factors & data quality labels |
| Map controls (Blockage slider & layer toggles) | P + Ni | Interactive blockage scenario controls |
| Alert panel & timeline component | P + Ni | Right-side alert card & 1h/3h/6h timeline |
| Slide 3 & 4 technical & feasibility text | Ri | Technical approach & fallback strategy text |
| PPT Slides 4 & 5 design | PR | Slides 4 & 5 designed in presentation deck |

### Evening (2 PM - 10 PM)

| Task | Owner | Deliverable |
|------|-------|-------------|
| Optional ML calibration layer skeleton | Vyom + D | Baseline scikit-learn / XGBoost model pipeline |
| Observed / Derived / Simulated data labelling | Vyom + D | API response includes strict data quality tags |
| Municipal Dashboard detail views | P + Ni | Ward/zone level risk breakdown UI |
| Flooded road & drain inspection priority panel | P + Ni | Actionable inspection list UI |
| Frontend-backend API integration | Vyom + P | Full end-to-end data flow (Location → Risk → Map) |
| Simulated & default drainage fallback mode | Vyom + D | Fallback data loader for cities without open drainage |
| Slide 5 (Impact & Dashboard) text content | Ri | Key operational features & dashboard benefits |
| Draft 15-page Detailed Report (Sections 1-5) | Ri | Executive summary, problem, scope & architecture |

### Day 2 End Checklist
- [ ] Effective drainage capacity & blockage scenario engine working
- [ ] Risk explanation API returning contributing factors & data quality tags
- [ ] Web dashboard with blockage scenario sliders & alert panel
- [ ] ML calibration layer skeleton ready
- [ ] Fallback architecture for simulated drainage ready
- [ ] Draft 15-page report (50% complete)
- [ ] PPT Slides 1-5 formatted

---

## Day 3: 4 September 2026 (Integration, Report & Q&A Preparation Day)

### Morning (9 AM - 1 PM)

| Task | Owner | Deliverable |
|------|-------|-------------|
| Full system end-to-end integration | Vyom | Backend + Frontend + Risk Engine connected |
| Scenario replay & validation test | Ri + D | Replay rainfall scenario & compare with known flood zones |
| Data freshness & fallback handling | D | Quality indicator & graceful API degradation |
| UI polish, responsive checks & loading states | P + Ni | Clean, responsive UI with smooth transitions |
| Slide 6 (Research & References) content | Ri | Verified references & learning citations |
| PPT Deck Finalization (Slides 1–6) | PR | Complete 6-slide master presentation deck |
| Demo video script (3-minute flow) | PR | Finalized demo video script |
| Detailed Report Sections 6-12 | Ri | Data layer, blockage model, validation & feasibility pages |

### Evening (2 PM - 10 PM)

| Task | Owner | Deliverable |
|------|-------|-------------|
| System bug fixing & error handling | ALL | Critical bugs resolved, clean error messages |
| Deployment (Vercel / Cloud hosting) | D | Live web dashboard URL running |
| Code cleanup & documentation | Vyom | Documented code & clean repository |
| Q&A Master Sheet (40 Q&A + 20 Rapid-Fire) | Ri | Comprehensive Q&A preparation document |
| 15-Page Detailed Report completion | Ri | Complete 15-page report ready for review |
| Demo video screen recording | PR | 3-minute high-quality demo video recorded |
| Team Q&A Drill & Demo Rehearsal (5 rounds) | ALL | Team practiced answering 40 questions smoothly |

### Day 3 End Checklist
- [ ] Full system working end-to-end and deployed live
- [ ] Data quality indicators (Observed/Estimated/Simulated) visible on UI
- [ ] 6-slide PPT deck 100% complete
- [ ] 15-page Detailed Report complete
- [ ] 40-question Q&A master sheet finalized
- [ ] 5 rounds of Q&A and demo rehearsals completed

---

## Day 4: 5 September 2026 (Final Verification & SIH Submission Day)

### Morning (9 AM - 12 PM)

| Task | Owner | Deliverable |
|------|-------|-------------|
| Final demo rehearsal (3 rounds) | ALL | Perfect 10-minute presentation & Q&A defense |
| Live deployment & fallback URL verification | D | Live application verified |
| Final Q&A rapid-fire check | Ri + PR | Rapid-fire response readiness verified |
| Repository tagging & release check | Vyom | GitHub release tagged: `v1.0-sih-submission` |
| Backup preparation (USB + Offline cache) | ALL | Local offline demo mode ready |

### Afternoon (12 PM onwards)

| Task | Owner | Deliverable |
|------|-------|-------------|
| SIH portal submission | Vyom | Official submission form filled |
| GitHub repository link | Vyom | Public GitHub URL attached |
| PPT & 15-page Report upload | PR + Ri | Master PPT deck & 15-page report uploaded |
| Demo video upload | PR | Demo video link uploaded |
| Final team debrief | ALL | Completed submission & ready for defense |

### Day 4 End Checklist
- [ ] SIH portal submission complete
- [ ] Public GitHub repository tagged & ready
- [ ] Demo video, PPT deck, and 15-page report submitted
- [ ] Team fully prepared for judge Q&A with transparent, defensible technical claims

---

## Critical Path (Must Not Slip)

```text
Day 1: Backend API + Elevation/Weather Pipeline + Dashboard Map Shell
  ↓
Day 2: Effective Drainage & Blockage Scenario Engine + Alert Panel + Report Draft
  ↓
Day 3: Full System Integration + Live Deployment + 15-Page Report + 40 Q&As
  ↓
Day 4: Rehearsals + SIH Portal Submission
```

---

## Execution Principles & Non-Negotiables

1. **No Fake Accuracy**: Never claim an accuracy percentage unless calculated on a real, verified test set.
2. **Transparent Data Labels**: Every data element on the dashboard must be explicitly tagged as **Observed**, **Derived**, **Estimated**, or **Simulated**.
3. **No Overclaiming**: The system is an urban flood decision-support tool complementing existing meteorological warnings (IMD/CWC), not replacing national warning systems.
4. **Q&A First Priority**: Every team member must know what is built, what is simulated, and how to defend the technical architecture using the 40 Q&As.

---

*Phase Plan Version 2.0 (Revised) | SIH 2026*
