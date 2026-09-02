# Presentation Script
# Urban Flood Nowcasting System — SIH26085
# Duration: 10 Minutes

---

## Slide 1: Title (0:00 - 0:30)

**Visual:** Project logo + Team photo
**Script:**
"Good morning/afternoon judges. We are Team [Name] presenting our solution for SIH26085 — Urban Flood Nowcasting System.

Our product: **FloodGuard AI** — An AI-powered early warning system that predicts urban floods 0-6 hours in advance, saving lives and reducing property damage."

**Key Points:**
- Confident greeting
- Problem code mention karo
- Product name bold karo

---

## Slide 2: The Problem (0:30 - 1:30)

**Visual:** Mumbai flood photos, statistics
**Script:**
"Every year, urban floods claim over 1,000 lives in India alone. Mumbai 2005 — 944mm in 24 hours, 500+ deaths. Chennai 2015 — 400+ deaths. 

The core problem? **No early warning system.** People find out when water is already at their doorstep. By then, it's too late to evacuate.

Current IMD alerts are city-level, not street-level. They tell you 'Mumbai will get rain' — not 'Dadar will flood in 2 hours.'"

**Key Points:**
- Emotional connect — photos
- Specific numbers — 1,000 deaths, 944mm
- Gap identify karo — "No early warning"

---

## Slide 3: Our Solution (1:30 - 2:30)

**Visual:** System architecture diagram
**Script:**
"FloodGuard AI bridges this gap with **3 innovations:**

1. **Real-time rainfall + drainage coupling** — Not just how much rain, but can drains handle it?
2. **Physics + ML hybrid model** — Diffusive-wave 2D simulation + XGBoost calibration
3. **Hyperlocal alerts** — Ward-level, not city-level. 4-5 km radius.

**Result:** 0-6 hour flood prediction with 80%+ accuracy."

**Key Points:**
- 3 innovations ginke bolo
- "Coupling" concept explain karo
- Accuracy number bolo

---

## Slide 4: Citizen App Demo — Part 1 (2:30 - 4:00)

**Visual:** Screen recording of mobile app
**Script:**
"Let me show you our citizen app. [Open app]

**Auto-location detection** — User opens app, GPS se location milta hai. [Show location: Dadar, Mumbai]

**Real-time rainfall** — 45mm/hr, heavy rain. [Show rainfall card]

**Risk score** — 🔴 78/100, HIGH risk. [Show big risk score]
Why? Because:
- Elevation: 12 meters (low)
- Slope: 1.8 degrees (flat — water accumulates)
- Drainage: 75% capacity used

**Interactive map** — 4-5 km radius. [Show map with colors]
🟢 Green = Safe
🟡 Yellow = Moderate
🔴 Red = High
User can zoom, pan, explore."

**Key Points:**
- Live demo — smooth chalna chahiye
- Risk factors explain karo
- Map interaction dikhawo

---

## Slide 5: Citizen App Demo — Part 2 (4:00 - 5:00)

**Visual:** Alert + Report screens
**Script:**
"**Push notification** — Risk badhta hai toh automatic alert. [Show notification]
'Flood warning for Dadar area. Move to nearest shelter immediately.'

**Safe route** — User ko safest path dikhata hai, flood zones avoid karke. [Show route]

**Nearest shelter** — 500m north, Dadar Municipal School. Capacity: 200, Available: 155. [Show shelter card]

**Crowdsourced reporting** — Citizens flooding report kar sakte hain — photo + location. [Show report screen]
Yeh data model ko improve karta hai — community-driven accuracy."

**Key Points:**
- Alert urgency dikhawo
- Shelter details bolo
- Crowdsourcing ka benefit

---

## Slide 6: Admin Dashboard Demo (5:00 - 6:30)

**Visual:** Screen recording of admin dashboard
**Script:**
"Now the **admin dashboard** — for municipal officers and disaster managers.

**City-wide overview** — All 24 wards, color-coded. [Show heatmap]
12 safe, 8 moderate, 3 high, 1 critical.

**Click on ward** — Dadar ka detail. [Click ward 12]
- Risk score: 78, trending to 85 in 1 hour
- Water depth: 15cm now, 45cm predicted
- Drainage: WARNING, 75% capacity
- Resources: 5/8 pumps active, 2/4 rescue teams deployed

**Alert broadcast** — Officer alert bhej sakta hai. [Show broadcast form]
Target: Ward 12, 13, 14
Severity: CRITICAL
Channels: App + SMS
Message: Customizable

**Real-time delivery tracking** — 42,300 delivered, 2,700 failed. 94% delivery rate. [Show delivery stats]"

**Key Points:**
- Power dikhawo — control
- Resource management
- Delivery tracking

---

## Slide 7: Technical Architecture (6:30 - 7:30)

**Visual:** Architecture diagram
**Script:**
"**Technical architecture** — 4 layers:

1. **Data Layer** — IMD + OpenWeatherMap (real-time rainfall), SRTM DEM (elevation), OSM (drainage)

2. **Engine Layer** — 
   - Diffusive-wave 2D model: Water ka flow simulate karta hai terrain pe
   - ML calibration: XGBoost se historical patterns learn karta hai
   - Ensemble: 60% physics + 40% ML

3. **API Layer** — FastAPI, <2 second response, 10,000+ concurrent users

4. **Frontend Layer** — Flutter mobile app, React.js dashboard, Mapbox maps

**Deployment:** AWS free tier pe abhi, NIC cloud pe migrate kar sakte hain."

**Key Points:**
- Layer by layer explain karo
- Tech stack name bolo
- Scalability mention karo

---

## Slide 8: Model Deep Dive (7:30 - 8:15)

**Visual:** Model pipeline diagram
**Script:**
"**Diffusive-wave model** — Simplified shallow water equations.

Input: DEM + Rainfall + Drainage
Process:
- Step 1: Rainfall → Runoff (70-90% in urban areas)
- Step 2: DEM → Slope → Flow direction (8 neighbors)
- Step 3: Water routing — downhill, gravity-driven
- Step 4: Drainage coupling — overflow check
- Step 5: Risk score — depth + elevation + slope + drainage

**ML Calibration:** 13 features, XGBoost, weekly retraining.

**Validation:** Mumbai historical events — 80%+ accuracy, <20% false alarm."

**Key Points:**
- Steps ginke bolo
- ML features count bolo
- Validation numbers

---

## Slide 9: Impact & Scalability (8:15 - 9:00)

**Visual:** Impact metrics, roadmap
**Script:**
"**Impact:**
- Lives saved: Early warning se evacuation time milta hai
- Property protected: 45-minute warning = 30% damage reduction
- Resource optimization: Municipal ko pata chalta hai kahan deploy karna hai

**Scalability:**
- City-agnostic architecture
- New city: 2 weeks setup
- Phase 1: Mumbai, Chennai (ready)
- Phase 2: Delhi, Pune, Hyderabad (2 months)
- Phase 3: All 100 smart cities (1 year)

**Business model:** Government contracts + Insurance partnerships + Enterprise API"

**Key Points:**
- Numbers bolo — 30% damage reduction
- Roadmap dikhawo
- Revenue streams

---

## Slide 10: Team & Ask (9:00 - 10:00)

**Visual:** Team photos, roles, contact
**Script:**
"**Our team:**
- Vyom — Architecture + Engine
- D — Backend + Engine Implementation
- P — Frontend
- PR — Presentation
- Ri — Research + Validation
- Ni — Frontend Support + QA

Combined expertise: AI/ML, GIS, hydrology, full-stack development.

**We are asking for:**
- SIH platform to showcase our solution
- Mentorship for government integration
- Opportunity to pilot in Mumbai

**Thank you. We would be happy to answer any questions."

**Key Points:**
- Team introduce karo
- Specific ask bolo
- Thank you + open for questions

---

## Demo Mode Instructions

### If judge asks: "Delhi ka dikhawo"

1. Open app
2. Switch to "Demo Mode" (toggle in settings)
3. Select "Delhi" from dropdown
4. Show: Real rainfall (from API) + Basic risk (elevation only)
5. Say: "Sir, detailed drainage data Delhi ke liye abhi integrate nahi hua, lekin model same kaam karega. 2 hafte mein full integration."

### If API fails during demo

1. Say: "Sir, network thoda slow hai, let me switch to offline mode"
2. Show cached data
3. Say: "Offline mode mein last known risk score dikhata hai. Real-time pe wapas aa jayega."

### If app crashes

1. Say: "Sir, let me show the admin dashboard instead"
2. Open dashboard (backup tab)
3. Continue from there

---

## Timing Checkpoints

| Time | Checkpoint | Action if Behind |
|------|-----------|------------------|
| 2:30 | Problem + Solution done | Skip 1 slide |
| 5:00 | Citizen app demo done | Skip safe route |
| 6:30 | Admin dashboard done | Skip resource panel |
| 8:15 | Technical done | Skip ML deep dive |
| 10:00 | Team + Ask done | Must finish |

---

## Body Language Tips

1. **Stand straight** — Confidence
2. **Hand gestures** — Architecture explain karte time
3. **Eye contact** — Har judge se 2-2 second
4. **Smile** — Enthusiastic, not nervous
5. **Point at screen** — Demo pe focus
6. **Don't read slides** — Bullet points se expand karo

---

## Common Mistakes to Avoid

1. ❌ "Um, uh, like" — Practice until smooth
2. ❌ Reading slides verbatim — Expand on bullets
3. ❌ Going over time — Strict 10 minutes
4. ❌ Arguing with judges — "Excellent point, sir" bolke address karo
5. ❌ "I don't know" — "Let me research that and get back"
6. ❌ Demo without backup — Always have screenshots ready

---

*Presentation Script Version 1.0 | SIH 2026*
