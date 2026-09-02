# Phase Plan — 4 Day Execution Timeline
# Urban Flood Nowcasting System — SIH26085

---

## Day 1: 2 September 2026 (Foundation Day)

### Morning (9 AM - 1 PM)

| Task | Owner | Deliverable |
|------|-------|-------------|
| GitHub repo setup + project structure | Vyom | Repo ready, README updated |
| FastAPI backend skeleton | D | `main.py` running on localhost |
| PostgreSQL + PostGIS setup | D | Database running, schema created |
| Mumbai DEM download (SRTM 30m) | Ri | `mumbai_dem.tif` in `/data` |
| Mumbai boundary + ward data | Ri | GeoJSON files ready |
| OSM drainage data extraction | Ri | `mumbai_drainage.geojson` |
| OpenWeatherMap API key | Ri | API key in `.env` |
| App screen sketches (Figma/pen-paper) | P + Ni | 7 screens designed |
| Map library integration (Mapbox) | P | Basic map displaying |


### Evening (2 PM - 10 PM)

| Task | Owner | Deliverable |
|------|-------|-------------|
| DEM processing script | Vyom + D | Elevation lookup API working |
| Rainfall API integration | D | `/weather/current` endpoint working |
| Basic risk calculation | Vyom + D | `/risk/current` returns mock data |
| Home screen UI | P + Ni | Rainfall + Risk score UI ready |
| Map component with risk zones | P + Ni | Color-coded polygons on map |
| Problem statement Idea slide | PR | Slide 1-2 ready || Data sources validation | Ri | All sources verified, working |

### Day 1 End Checklist
- [ ] Backend running on `localhost:8000`
- [ ] Database schema created
- [ ] DEM data downloaded and processed
- [ ] Weather API integration working
- [ ] Basic risk API returning data
- [ ] Flutter app showing home screen
- [ ] Map with basic overlay
- [ ] Idea Title page complete 

---

## Day 2: 3 September 2026 (Core Build Day)

### Morning (9 AM - 1 PM)

| Task | Owner | Deliverable |
|------|-------|-------------|
| Diffusive-wave model implementation | Vyom + D | `flood_model.py` working |
| Slope calculation from DEM | D | Slope grid generated |
| Water routing algorithm | Vyom + D | Water depth grid calculated |
| Drainage coupling logic | Vyom + D | Overflow detection working |
| Risk score calculation | Vyom + D | 0-100 score generated |
| Alert screen UI | P + Ni | Alert list + detail screen |
| Report flooding screen | P + Ni | Photo + location + submit |
| Admin dashboard layout | P + Ni | Sidebar + main content area |
| City overview screen | P + Ni | KPI cards + risk summary |
| Technical architecture slide | PR | Slide 5-6 ready |
| flexibility and visibility slide | PR | Slide 7 ready |

### Evening (2 PM - 10 PM)

| Task | Owner | Deliverable |
|------|-------|-------------|
| ML model skeleton (XGBoost) | Vyom + D | `ml_model.py` created |
| Physics + ML hybrid logic | Vyom + D | Combined risk score working |
| Admin ward detail screen | P + Ni | Ward-specific risk + resources |
| Alert broadcast screen | P + Ni | Form + preview + send |
| Citizen reports management | P + Ni | Verify + act on reports |
| Frontend-backend integration | Vyom + P | API calls from app working |
| End-to-end flow test | Vyom + P | Location → Risk → Map → Alert |
| Demo mode implementation | Vyom + D | 2-3 cities pre-loaded |
| Impact + scalability slide | PR | Slide 10-11 ready |

### Day 2 End Checklist
- [ ] Diffusive-wave model calculating risk
- [ ] Water depth prediction working
- [ ] ML layer skeleton ready
- [ ] All app screens built
- [ ] Admin dashboard functional
- [ ] Frontend-backend integrated
- [ ] Demo mode with 2-3 cities
- [ ] PPT 80% complete

---

## Day 3: 4 September 2026 (Integration + Polish Day)

### Morning (9 AM - 1 PM)

| Task | Owner | Deliverable |
|------|-------|-------------|
| Full system integration | Vyom | All components wired together |
| Mumbai real data integration | D | Actual Mumbai data in system |
| Historical flood event test | Ri + D | 2005/2017 flood simulation |
| Accuracy validation | Ri | Compare prediction vs actual |
| UI polish + animations | P + Ni | Smooth transitions, loading states |
| Error handling | P + Ni | Graceful failure messages |
| Offline mode (cached data) | P + Ni | Last known risk displayed |
| Responsive design check | Ni | Works on different screen sizes |
| Demo video script | PR | 3-minute script finalized |
| Demo video recording | PR | Screen recording done |

### Evening (2 PM - 10 PM)

| Task | Owner | Deliverable |
|------|-------|-------------|
| Bug fixing | ALL | All critical bugs resolved |
| Performance optimization | D | API <2s, map <3s load |
| Code cleanup + comments | Vyom | Clean, documented code |
| GitHub final push | Vyom | All code committed |
| Deployment (Render/Railway) | D | Live URL working |
| PPT finalization | PR | All slides complete |
| Speaker notes | PR | Notes for each slide |
| Judge Q&A preparation | Ri + PR | 20 questions + answers ready |
| Demo rehearsal (5 times) | ALL | Smooth 10-minute demo |
| Backup plan | ALL | Mock data ready if live fails |

### Day 3 End Checklist
- [ ] Full system working end-to-end
- [ ] Mumbai data integrated
- [ ] UI polished, no critical bugs
- [ ] Deployed and live
- [ ] Demo video recorded
- [ ] PPT 100% complete
- [ ] 5 demo rehearsals done
- [ ] Judge Q&A prepared

---

## Day 4: 5 September 2026 (Final Day)

### Morning (9 AM - 12 PM)

| Task | Owner | Deliverable |
|------|-------|-------------|
| Final demo rehearsal (3 times) | ALL | Perfect 10-minute demo |
| Deployment verification | D | Live URL working, no downtime |
| Backup deployment | D | Secondary URL ready |
| PPT print (backup) | PR | Physical copies |
| Code backup (USB + Cloud) | Vyom | Multiple backups |
| Device check | ALL | Laptop, charger, internet, hotspot |
| Final GitHub push | Vyom | Tag: `v1.0-sih-submission` |

### Afternoon (12 PM onwards)

| Task | Owner | Deliverable |
|------|-------|-------------|
| SIH portal submission | Vyom | All files uploaded |
| GitHub link | Vyom | Repo link in submission |
| Demo video upload | PR | Video link in submission |
| PPT upload | PR | PPT in submission |
| Documentation check | Ri | All docs complete |
| Final relaxation | ALL | Confidence + rest |

### Day 4 End Checklist
- [ ] SIH portal submission complete
- [ ] GitHub repo public + tagged
- [ ] Demo video uploaded
- [ ] PPT uploaded
- [ ] All documentation complete
- [ ] Team ready for presentation

---

## Daily Standup Schedule

**Time:** Every night at 11:00 PM
**Duration:** 30 minutes max
**Format:**

```
1. What did you complete today? (2 min each)
2. What is blocking you? (Vyom helps resolve)
3. What is tomorrow's target? (Vyom assigns)
4. Any team-level decisions needed?
```

---

## Critical Path (Must Not Slip)

```
Day 1: Backend API + DEM data
  ↓
Day 2: Flood model + Frontend screens
  ↓
Day 3: Integration + Deployment
  ↓
Day 4: Submission
```

**If behind schedule:**
- Cut ML layer (use rule-based only)
- Cut admin dashboard (basic version)
- Cut crowdsourcing (basic report only)
- **NEVER cut:** Risk calculation + Map + Alert

---

## Risk Mitigation

| Risk | Mitigation |
|------|-----------|
| API fails during demo | Demo mode with pre-loaded data |
| Deployment fails | Localhost demo as backup |
| Team member unavailable | Cross-train on critical tasks |
| Scope creep | Strict MVP adherence |
| Burnout | Mandatory 5-hour sleep |

---

*Phase Plan Version 1.0 | SIH 2026*
