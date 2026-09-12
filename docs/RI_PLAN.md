# SIH26085 — Research, PPT & Q&A Master Document

**R.A.K.S.H.A.K. — Real-time Assessment & Knowledge System for Hydrological Alerts**

## Revised Working Document for Ri + PR + Entire Team

**Problem Statement:** SIH26085 — Urban Flood Nowcasting System  
**Working Project Name:** FloodGuard AI  
**Prepared for:** Ri, PR and Team  
**Date:** 2 September 2026  
**Primary priority:** SIH presentation + technical credibility + Q&A readiness

---

# 0. IMPORTANT REVISION FROM THE PREVIOUS DOCUMENT

The previous version was too ambitious in several places. It contained claims, performance numbers and implementation details that should not be presented as facts unless the team has actually verified them.

The revised version follows one rule:

> **If we have built it, measured it, or can defend it with a reliable source, present it as a fact. Otherwise present it as a proposed capability, assumption, target, or future phase.**

### Removed / corrected

- Removed the requirement for Ri to provide **team-information content**.
- Removed unsupported statements such as **"first in India"**.
- Removed guaranteed deployment claims such as **"any city in 2 weeks"**.
- Removed unsupported savings percentages and life-saving percentages.
- Removed the arbitrary **Physics 60% + ML 40%** claim.
- Removed arbitrary claims such as **75% confidence = alert** unless the team later calibrates and validates that threshold.
- Removed the claim that Mumbai 2005 can already be shown as a successful prediction unless the model is actually run retrospectively.
- Prototype status must be updated only from the team's real implementation.
- IoT, LoRaWAN, IVRS and large-scale government deployment are treated as **future/extension phases**, not mandatory SIH prototype components.
- The system is explicitly designed around **rainfall + terrain + drainage capacity + blockage/obstruction + road exposure**, because rainfall alone is not enough to explain urban flooding.

### New priority

**Q&A is now a first-class deliverable.**

Ri must not only collect references. Ri must prepare the team to answer:

1. Why is this problem different from existing flood-warning systems?
2. Why is drainage capacity important?
3. How will blocked drains be represented?
4. Where will data come from?
5. What happens when real-time drainage data is unavailable?
6. Why use physics + ML?
7. How will the model be validated?
8. What exactly is the dashboard showing?
9. What is actually implemented versus proposed?
10. What are the system's limitations?
11. Why should a municipality use this?
12. What happens when the prediction is wrong?
13. Can the system work in another city?
14. What is the minimum viable deployment?
15. What makes the solution technically feasible within SIH constraints?

---

# PART 1 — RI'S ACTUAL RESPONSIBILITY

## Ri is responsible for

### A. Research
- Problem understanding
- Existing-solution comparison
- Data-source verification
- Research papers
- Flood/drainage terminology
- Validation methodology
- References

### B. PPT content
Ri prepares content for Slides 2–6.

**Slide 1 team information is not Ri's research responsibility.**

### C. Detailed report
Minimum target: **15 pages of substantive content**, excluding cover page, table of contents and references if the final formatting separates them.

### D. Q&A
This is now the highest-priority deliverable after the PPT.

Ri should maintain a separate Q&A sheet containing:
- Question
- 20–30 second answer
- Technical explanation
- Evidence/source
- Possible follow-up question
- Safe response if the team has not implemented that feature

---

# PART 2 — REVISED 6-SLIDE PPT PLAN

## SLIDE 1 — Team Information

Ri only checks that no incorrect technical claim appears on this slide.

---

# SLIDE 2 — IDEA & PROPOSED SOLUTION

## Problem

Urban flooding can occur even when a city has rainfall warnings.

The critical question is not only:

> "How much rain is falling?"

It is also:

> "Can the local terrain and drainage network safely handle that rainfall?"

A road can flood because:
- rainfall intensity is high,
- the location is low-lying,
- runoff accumulates from surrounding areas,
- drainage capacity is insufficient,
- a drain is partially blocked,
- a road or outlet is unable to discharge water quickly enough.

## Proposed solution

**FloodGuard AI** is a proposed urban flood nowcasting platform that combines:

1. Rainfall / precipitation information
2. Terrain and elevation
3. Land characteristics
4. Drainage network
5. Estimated drainage capacity
6. Drain blockage / obstruction information where available
7. Road and infrastructure exposure
8. Historical/citizen observations for validation

The system produces a **location-level flood-risk estimate** and displays it on a map for citizens and municipal authorities.

## Core workflow

```text
Rainfall / Forecast
        +
Terrain / Elevation
        +
Drainage Network
        +
Drain Capacity
        +
Blockage / Obstruction
        +
Historical / Citizen Observations
        ↓
Data Processing
        ↓
Runoff + Drainage Analysis
        ↓
Flood Risk Estimation
        ↓
Risk Map + Timeline
        ↓
Municipal Dashboard + Citizen Alerts
```

## Main innovation

The key differentiator is not simply "AI for floods".

The differentiator is:

> **Coupling rainfall-driven surface runoff with local drainage constraints and blockage information to produce more actionable urban flood risk.**

The system should therefore answer not only **where water may accumulate**, but also provide an explanation such as:

> "High risk because intense rainfall is combined with low elevation and insufficient/blocked drainage capacity."

Do not call this "first in India" unless a proper literature/market review proves it.

---

# SLIDE 3 — TECHNICAL APPROACH

## Recommended prototype architecture

```text
                    DATA SOURCES
                        │
       ┌────────────────┼────────────────┐
       │                │                │
   Rainfall         Terrain          Drainage
   / Forecast       / DEM            Network
       │                │                │
       └────────────────┼────────────────┘
                        │
                 DATA PROCESSING
                        │
             ┌──────────┴──────────┐
             │                     │
       Surface Runoff       Drainage Analysis
             │                     │
             └──────────┬──────────┘
                        │
              Flood Risk Engine
                        │
             Optional ML Calibration
                        │
                 Risk + Explanation
                        │
        ┌───────────────┴──────────────┐
        │                              │
 Municipal Dashboard             Citizen Interface
```

## Technology stack

| Layer | Recommended technology |
|---|---|
| Frontend | React + TypeScript + Tailwind |
| Maps | Leaflet |
| Backend | Python FastAPI |
| Database | PostgreSQL + PostGIS |
| Data processing | Python, Pandas, NumPy |
| GIS/raster | Rasterio / GeoPandas |
| ML | scikit-learn / XGBoost if justified |
| API testing | Postman |
| Version control | Git + GitHub |
| Deployment | Vercel + suitable backend hosting |
| Containerization | Docker, if needed |

Do not add Flutter unless the team is actually building a mobile application.

## Model strategy

### Phase 1 — Explainable baseline

Use deterministic/rule-based hydrological and drainage logic:

- rainfall intensity
- accumulated rainfall
- elevation
- slope
- drainage capacity
- estimated blockage
- local accumulation

### Phase 2 — ML calibration

If enough historical/labelled data is available, train an ML model to improve risk estimation.

Possible models:
- XGBoost
- Random Forest
- Logistic Regression as baseline

The model should not blindly replace physical reasoning.

### Phase 3 — Validation

Compare predictions against:
- historical flood observations
- known waterlogging locations
- citizen reports
- municipal records where available

---

# SLIDE 4 — FEASIBILITY & CHALLENGES

## Technical feasibility

The prototype is feasible because it can start with publicly accessible or openly documented geospatial/weather datasets and a simulated drainage dataset where real municipal drainage information is unavailable.

However:

> **The prototype must clearly label simulated or assumed drainage values.**

## Major challenge: drainage data

Detailed pipe diameter, capacity, condition and blockage data may not be publicly available for every city.

### Fallback strategy

```text
Real municipal drainage data
          ↓ if available
Use actual capacity/condition

          ↓ otherwise

Open geospatial drainage network
          +
Estimated capacity classes
          +
Scenario-based blockage
          ↓
Prototype risk estimation
```

The dashboard must visibly distinguish:

- **Observed**
- **Estimated**
- **Simulated**

This prevents the judges from confusing demonstration data with real municipal data.

## Major challenge: blocked drains

A blocked drain should not simply be treated as a binary "blocked/not blocked" value.

Prototype representation:

```text
Drain segment
     ↓
Base Capacity
     ↓
Blockage Factor
     ↓
Effective Capacity
```

Example:

```text
Effective Capacity =
Base Capacity × (1 - Blockage Fraction)
```

This is a prototype modelling assumption, not a universal hydraulic law.

Possible scenario values:
- 0% obstruction
- 25%
- 50%
- 75%
- 100% / fully blocked

The exact factors must be calibrated if real data becomes available.

## Main risks

1. Incomplete drainage data
2. Coarse DEM resolution
3. Sparse flood labels
4. Rainfall forecast uncertainty
5. False positives
6. False negatives
7. Changing drainage conditions
8. Sensor/citizen-report reliability
9. Model generalization across cities

## Mitigation

- uncertainty-aware outputs
- source labels
- confidence/quality indicators
- historical validation
- scenario testing
- human/municipal verification
- gradual city-specific calibration

---

# SLIDE 5 — IMPACT & DASHBOARD

## Primary users

### Municipal authority

The dashboard should answer:

**Where?**
- Which ward/zone/road is at risk?

**When?**
- Current
- +1 hour
- +3 hours
- +6 hours, if the input forecast supports that horizon

**Why?**
- Heavy rainfall
- Low elevation
- drainage capacity limitation
- blockage/obstruction
- accumulation

**What should be checked?**
- roads
- drainage segments
- vulnerable locations
- reported flooding

## Recommended dashboard layout

### Top KPI cards

- Current rainfall
- Forecast rainfall
- High-risk zones
- Critical drainage segments
- Reported flooded roads
- Data quality / confidence indicator

### Main map

Layers:
- Flood-risk heatmap
- Roads
- Drainage network
- Blocked/at-risk drains
- Water accumulation points
- Flooded-road reports
- Critical infrastructure

### Right-side alert panel

Example:

```text
HIGH RISK — Ward 12

Expected cause:
Heavy rainfall + low elevation +
reduced drainage capacity

Expected window:
Next 1–3 hours

Recommended action:
Inspect drainage segment D-104
and monitor Road R-27.
```

### Timeline

```text
NOW ───── +1h ───── +3h ───── +6h
 LOW        MOD      HIGH       HIGH
```

The timeline should only show a future horizon that the underlying data/model actually supports.

## Citizen interface

Minimum prototype:
- current location
- risk level
- nearby risk zones
- flooded-road reports
- warning explanation
- safe/avoid-road indication if a routing layer is actually implemented

---

# SLIDE 6 — RESEARCH & REFERENCES

Use verified references only.

Recommended reference categories:

1. India Meteorological Department — rainfall, warnings and nowcast products
2. National Disaster Management Authority — disaster/urban flood preparedness
3. Central Water Commission — flood monitoring and forecasting
4. Google Flood Hub — existing AI flood forecasting system
5. NASA/USGS SRTM — elevation data
6. OpenStreetMap — geospatial road/drainage information where mapped
7. Peer-reviewed urban flood modelling literature
8. Peer-reviewed ML flood prediction literature

The purpose of Slide 6 is not to fill space with links.

Every reference should answer:

> **What did we learn from this source, and how did it influence our design?**

---

# PART 3 — MINIMUM 15-PAGE DETAILED REPORT

# PAGE 1 — EXECUTIVE SUMMARY

Urban flooding is a complex phenomenon in which rainfall interacts with terrain, land surface characteristics, drainage infrastructure and local obstructions. A rainfall warning by itself does not necessarily indicate which road, ward or drainage segment will experience flooding.

FloodGuard AI is proposed as an urban flood nowcasting and decision-support platform. Its objective is to combine rainfall information with geospatial and drainage-related information to estimate local flood risk and communicate the result through an interactive dashboard.

The system focuses on five practical questions:

1. Where is flooding likely?
2. When could the risk increase?
3. Why is that location at risk?
4. Is drainage capacity sufficient for the expected runoff?
5. Which locations should municipal authorities inspect or monitor first?

The proposed architecture uses a geospatial data layer, processing engine, flood-risk engine and visualization layer. The prototype can begin with open/public datasets and clearly labelled assumptions where municipal data is unavailable.

A major design principle is **explainability**. Instead of producing only a colour on a map, the system should provide contributing factors such as rainfall intensity, low elevation, drainage limitation and blockage scenario.

The system is not intended to replace official warnings or emergency authorities. It is a decision-support prototype that can complement existing information and help authorities prioritize local inspection and response.

---

# PAGE 2 — PROBLEM STATEMENT AND BACKGROUND

## 2.1 Urban flooding

Urban flooding occurs when rainfall-generated runoff cannot be adequately conveyed, stored or discharged. Rapid urbanization can increase impervious surfaces, reduce infiltration and place additional pressure on drainage systems.

Flooding can therefore occur because of several interacting factors:

- intense rainfall
- accumulated rainfall
- low-lying terrain
- insufficient drainage capacity
- blocked or obstructed drains
- poor outlet conditions
- surface flow concentration
- inadequate maintenance
- vulnerable road geometry

## 2.2 Why rainfall alone is insufficient

Consider two locations receiving the same rainfall.

Location A:
- higher elevation
- good drainage
- open drainage paths

Location B:
- lower elevation
- high runoff accumulation
- constrained drainage
- partially blocked outlet

The two locations can experience very different flood outcomes.

Therefore the proposed system uses rainfall as an important input, but not the only input.

## 2.3 Existing warning ecosystem

India already has official meteorological and flood-monitoring capabilities. IMD provides district/station-level nowcast and warning products, while the Central Water Commission operates flood monitoring and forecasting services. These systems demonstrate that forecasting and warning are already established capabilities.

The project should therefore **not claim to replace IMD/CWC/NDMA systems**.

Instead, the proposed contribution is an urban, hyperlocal decision-support layer that combines rainfall information with local terrain and drainage constraints.

---

# PAGE 3 — OBJECTIVES AND SCOPE

## 3.1 Primary objective

Develop a prototype that converts rainfall and geospatial/drainage information into an interpretable urban flood-risk map.

## 3.2 Secondary objectives

- identify high-risk locations
- estimate water accumulation risk
- incorporate drainage constraints
- represent blockage scenarios
- identify roads potentially affected by flooding
- provide a municipal dashboard
- support time-based risk visualization
- maintain an evidence trail for each prediction

## 3.3 Prototype scope

### Must have

- rainfall input
- terrain/elevation layer
- road layer
- drainage network layer
- drainage capacity representation
- blockage scenario representation
- risk calculation
- interactive map
- dashboard
- explanation of risk
- API/backend
- basic validation

### Good to have

- ML calibration
- citizen reporting
- historical event replay
- automated alerting
- route avoidance

### Future

- real IoT water-level sensors
- municipal SCADA integration
- LoRaWAN sensor network
- large-scale deployment
- automated emergency workflows

---

# PAGE 4 — EXISTING SYSTEMS AND GAP ANALYSIS

## 4.1 IMD

IMD provides weather warnings and nowcast products. These are essential upstream information sources.

### Gap relevant to this project

A meteorological warning does not automatically answer the municipal question:

> Which local road/drainage segment should we inspect first?

## 4.2 Central Water Commission

CWC provides flood forecasting and monitoring services, particularly relevant to riverine flooding.

### Gap relevant to this project

Urban waterlogging can be driven by local rainfall-runoff and drainage constraints, even without a major river crossing the city.

## 4.3 Google Flood Hub

Google Flood Hub provides AI-driven flood forecasts and has expanded its work toward urban flash-flood prediction. Its documentation also makes clear that different models and data sources are used for different flood contexts.

### Important lesson

Flood forecasting is already an active field. Therefore the project's novelty should not be stated as:

> "AI predicts floods."

Instead, the proposed differentiator is:

> **local urban drainage-aware risk reasoning and municipal decision support.**

## 4.4 Gap identified

The prototype focuses on the bridge between:

```text
Weather / rainfall information
            ↓
Urban physical environment
            ↓
Drainage constraints
            ↓
Road-level/ward-level decision support
```

---

# PAGE 5 — PROPOSED SYSTEM

## 5.1 High-level architecture

```text
Data Sources
    │
    ├── Rainfall / Forecast
    ├── DEM / Elevation
    ├── Roads
    ├── Drainage Network
    ├── Capacity Estimates
    ├── Blockage Information
    └── Observations
             │
             ▼
       Data Processing
             │
             ▼
   Hydrological / Runoff Logic
             │
             ▼
    Drainage Constraint Model
             │
             ▼
       Flood Risk Engine
             │
        ┌────┴────┐
        ▼         ▼
   Dashboard   Citizen UI
```

## 5.2 Data classification

Every data item should have a source-quality label:

### Observed
Directly measured or officially supplied.

### Derived
Calculated from another dataset.

### Estimated
Produced using an engineering assumption or proxy.

### Simulated
Artificially generated for prototype demonstration.

This classification is essential for technical honesty.

---

# PAGE 6 — DATA LAYER

## 6.1 Rainfall

Potential sources:
- IMD products
- weather APIs where appropriate
- historical rainfall datasets

Required variables:
- timestamp
- location
- rainfall amount/intensity
- forecast horizon if available

## 6.2 Elevation

A DEM can be used to derive:
- elevation
- slope
- flow direction
- low-lying areas

## 6.3 Drainage

Drainage information should ideally include:

- segment ID
- geometry
- upstream/downstream relationship
- estimated or measured capacity
- condition
- blockage status
- last inspection time

Where this data does not exist, the prototype must clearly use estimated/simulated values.

## 6.4 Roads

Road data supports:
- flood exposure
- affected-road display
- route avoidance
- emergency prioritization

## 6.5 Observations

Possible validation information:
- municipal records
- historical reports
- citizen reports
- field observations

Citizen reports should not be treated as perfect ground truth. They require quality control.

---

# PAGE 7 — DRAINAGE CAPACITY AND BLOCKAGE MODEL

This is a major component of the revised system.

## 7.1 Why drainage capacity matters

Suppose rainfall produces runoff at a rate greater than the local drainage system can convey.

Then:

```text
Runoff > Effective Drainage Capacity
                    ↓
          Water accumulation increases
                    ↓
             Flood risk increases
```

## 7.2 Effective capacity

For prototype scenario analysis:

```text
Effective Capacity =
Base Capacity × (1 - Blockage Fraction)
```

Example:

If estimated base capacity = 100 units and blockage scenario = 50%:

```text
Effective Capacity = 100 × (1 - 0.50)
                   = 50 units
```

This is a modelling assumption for the prototype and must not be presented as a universally valid hydraulic equation.

## 7.3 Blockage states

```text
OPEN
  ↓
LOW OBSTRUCTION
  ↓
MODERATE OBSTRUCTION
  ↓
HIGH OBSTRUCTION
  ↓
SEVERE / BLOCKED
```

## 7.4 Dashboard use

A municipality should be able to select:

> "Show locations where predicted runoff exceeds estimated effective drainage capacity."

This creates a direct operational use case.

---

# PAGE 8 — FLOOD-RISK ENGINE

## 8.1 Baseline risk

The baseline engine can combine normalized indicators:

```text
Rainfall Risk
+
Accumulation Risk
+
Terrain Risk
+
Drainage Stress
+
Blockage Stress
+
Exposure
        ↓
Composite Risk
```

The exact weights should not be invented without validation.

A configurable weighted model can be used initially, and weights can later be calibrated against historical observations.

## 8.2 Risk categories

A simple prototype can use:

- Low
- Moderate
- High
- Critical

The thresholds should be documented as prototype thresholds unless calibrated.

## 8.3 Explainability

Each high-risk area should expose contributing factors.

Example:

```text
Risk: HIGH

Contributors:
• Heavy forecast rainfall
• Low elevation
• High runoff accumulation
• Drainage stress
• 50% blockage scenario

Data quality:
Medium

Action:
Inspect drainage segment D-104
and monitor Road R-27.
```

---

# PAGE 9 — MACHINE LEARNING STRATEGY

## 9.1 Why not use ML for everything?

Pure ML can produce predictions without giving the operator an intuitive physical explanation.

For disaster-management applications, explainability and validation are important.

## 9.2 Proposed hybrid approach

### Baseline layer
Physics-inspired / rule-based calculations.

### ML layer
If sufficient labelled historical data exists, ML learns residual patterns or calibrates the baseline risk.

Possible inputs:
- rainfall
- rainfall accumulation
- elevation
- slope
- land-use characteristics
- drainage density
- effective drainage capacity
- blockage scenario
- historical flood indicator

## 9.3 Model candidates

Start with a simple baseline.

Then compare:
- Logistic Regression
- Random Forest
- XGBoost

The model should be selected based on validation performance, not popularity.

## 9.4 Avoiding overclaiming

Do not say:

> "Our XGBoost model is 95% accurate."

unless the team has actually measured it on a proper held-out test set.

---

# PAGE 10 — DASHBOARD AND USER EXPERIENCE

## 10.1 Municipal dashboard

### Header

- current rainfall
- forecast rainfall
- high-risk areas
- critical drainage points
- flooded-road reports

### Main map

```text
┌───────────────────────────────────────────┐
│                 MAP                       │
│                                           │
│  Flood Risk     Drainage      Roads       │
│  Heatmap        Network       Exposure    │
│                                           │
│  ● Blocked Drain     ● Flood Report      │
│                                           │
└───────────────────────────────────────────┘
```

### Timeline

```text
NOW       +1h       +3h       +6h
 │          │         │          │
 Risk       Risk      Risk       Risk
```

### Alert panel

```text
HIGH RISK
Ward 12

Cause:
Heavy rainfall + drainage stress

Critical segment:
D-104

Road exposure:
R-27

Data quality:
Medium
```

## 10.2 Key dashboard principle

The dashboard should help a municipal officer **take action**, not merely admire a map.

---

# PAGE 11 — VALIDATION AND TESTING

## 11.1 Validation philosophy

The project should separate:

### Model development
Building the risk engine.

### Validation
Testing against independent observations.

### Demonstration
Showing a scenario when sufficient real validation data is unavailable.

These must not be mixed.

## 11.2 Historical event replay

A historical rainfall event can be replayed using available rainfall/geospatial information.

The output can be compared with known flooded locations.

## 11.3 Metrics

Depending on the available labels:

- Precision
- Recall
- F1-score
- ROC-AUC
- spatial overlap
- false alarm rate
- missed-event rate
- response time

For continuous water-depth prediction, additional regression metrics may be used.

## 11.4 Important limitation

If the team lacks enough historical labels, it should not manufacture an accuracy number.

Instead:

> "The current prototype demonstrates the modelling pipeline; extensive historical validation requires additional labelled municipal flood observations."

That answer is much safer in Q&A than inventing accuracy.

---

# PAGE 12 — FEASIBILITY

## 12.1 Technical feasibility

High for a prototype because the architecture can be implemented using established open-source technologies.

## 12.2 Data feasibility

Mixed.

Rainfall and elevation information can be easier to obtain than detailed drainage condition/capacity information.

Therefore drainage data is the primary deployment bottleneck.

## 12.3 Operational feasibility

The system can be useful as a decision-support dashboard if municipal workflows are considered.

The recommended workflow is:

```text
System detects risk
       ↓
Officer reviews explanation
       ↓
Drain/road inspection priority
       ↓
Action
       ↓
Observation returned
       ↓
System validation
```

## 12.4 Economic feasibility

Do not state an exact city deployment cost unless a proper bill of materials, hosting estimate, sensor requirement and staffing model are prepared.

For SIH, present:

> "The software prototype is designed around open-source components and can be piloted before large-scale infrastructure investment."

---

# PAGE 13 — RISKS AND MITIGATION

| Risk | Effect | Mitigation |
|---|---|---|
| Missing drainage data | Lower precision | Estimated/simulated capacity with clear labels |
| Incorrect rainfall forecast | Wrong prediction | Show uncertainty/data quality |
| Coarse DEM | Incorrect local flow | Higher-resolution DEM in future |
| Unknown blockage | Missed flood risk | Scenario-based blockage modelling |
| False citizen report | Bad validation | Moderation + multiple reports |
| False positive | Alert fatigue | Risk thresholds + explanation |
| False negative | Safety risk | Conservative validation + official warnings |
| City transfer | Model degradation | City-specific calibration |
| API failure | Missing data | Cached/latest valid data + fallback |
| No historical labels | Cannot measure accuracy | Scenario demo + transparent limitation |

---

# PAGE 14 — FUTURE SCOPE AND DEPLOYMENT ROADMAP

## Phase 1 — SIH prototype

- one demonstration city/area
- rainfall input
- DEM
- drainage network
- capacity scenarios
- blockage scenarios
- risk map
- dashboard
- basic validation
- Q&A-ready architecture

## Phase 2 — Pilot

- municipal drainage data
- higher-resolution terrain
- historical flood labels
- field validation
- water-level sensors at critical points

## Phase 3 — Operational integration

- municipal APIs
- sensor network
- automated alerts
- maintenance workflows
- incident management

## Phase 4 — Multi-city expansion

The model should not simply be copied unchanged.

Each city should be calibrated using:
- local terrain
- drainage structure
- rainfall regime
- historical flood behaviour
- local infrastructure

Therefore the correct claim is:

> "The architecture is designed to be transferable, but each city requires local calibration and validation."

---

# PAGE 15 — CONCLUSION

FloodGuard AI proposes a practical urban flood decision-support architecture based on the principle that rainfall alone does not determine urban flooding.

The system combines:

```text
Rainfall
+
Terrain
+
Runoff
+
Drainage Capacity
+
Blockage
+
Road Exposure
+
Observations
```

to produce an interpretable local flood-risk estimate.

The most important contribution is not a claim that the project replaces existing national flood-warning systems. Instead, it aims to provide a bridge between large-scale weather/flood information and local municipal decisions.

The prototype should demonstrate:

1. ingestion of relevant data,
2. processing of terrain and drainage information,
3. drainage-capacity and blockage scenarios,
4. risk estimation,
5. map-based visualization,
6. actionable dashboard information,
7. validation methodology.

The system must remain transparent about data limitations and model uncertainty.

A successful SIH prototype should therefore prioritize **credible engineering, explainability, demonstrable functionality and strong technical defence** over exaggerated claims.

---

# PART 4 — HIGH-PRIORITY Q&A PREPARATION

## Q1. What exactly is the problem you are solving?

**Short answer:**

We are addressing the gap between rainfall/flood warnings and hyperlocal urban flood decision-making. Our system combines rainfall with terrain and drainage constraints to estimate which local areas and roads are more likely to experience water accumulation.

**If asked further:**

A rainfall warning tells us that heavy rain may occur, but a municipality also needs to know where drainage may be overwhelmed and which locations require attention first.

---

## Q2. What is new in your solution?

**Answer:**

Our focus is not simply AI-based flood prediction. We combine rainfall-driven runoff with local drainage constraints, including estimated drainage capacity and blockage scenarios, and present the result as an actionable municipal dashboard.

**Important:** Do not say "first in India."

---

## Q3. Why do you need drainage information?

**Answer:**

Because the same rainfall can produce different flooding outcomes depending on how quickly water can leave the area. If runoff exceeds effective drainage capacity, accumulation can increase.

---

## Q4. How do you model a blocked drain?

**Answer:**

We represent blockage as a reduction in effective drainage capacity. For the prototype, effective capacity can be calculated using a configurable blockage fraction. This is a scenario model and would be calibrated against real inspection data in a production deployment.

---

## Q5. What if you don't get real drainage data?

**Answer:**

We have a fallback architecture. We can use mapped drainage geometry where available and use clearly labelled estimated or simulated capacity values for prototype demonstration. The dashboard will distinguish observed, derived, estimated and simulated data.

---

## Q6. Isn't that fake data?

**Answer:**

If simulated data is presented as real data, that would be a problem. We do not propose doing that. Simulated values are only for demonstrating the pipeline and scenario analysis. For real deployment, municipal drainage and inspection data would be required.

---

## Q7. Why not just use Google Flood Hub?

**Answer:**

Google Flood Hub is an important existing flood-forecasting system. Our project is not trying to duplicate it. Our proposed focus is urban municipal decision support, especially the relationship between local rainfall, terrain, drainage constraints, blockage scenarios and road-level operational decisions.

---

## Q8. Why not just use IMD warnings?

**Answer:**

IMD provides essential meteorological warnings and nowcast products. We use such information as an upstream input rather than trying to replace it. Our proposed layer translates rainfall information into local urban flood-risk reasoning using terrain and drainage information.

---

## Q9. Why use AI/ML?

**Answer:**

The initial risk engine can work with explainable physical/rule-based logic. ML is proposed as a calibration layer when enough historical labelled data becomes available. We do not want ML to become an unexplained black box.

---

## Q10. Why XGBoost?

**Answer:**

XGBoost is a strong tabular-data baseline and can model nonlinear relationships between variables. But we would compare it with simpler baselines and select it only if validation shows an improvement.

---

## Q11. How will you calculate accuracy?

**Answer:**

We need labelled historical observations. Depending on the task, we can use precision, recall, F1-score, false-alarm rate and spatial overlap. We will not claim an accuracy percentage without an actual test dataset.

---

## Q12. What if there is no historical data?

**Answer:**

We can still demonstrate the system using scenario-based testing, but we must clearly distinguish demonstration from validation. Extensive performance claims require historical labelled data.

---

## Q13. Can your system predict six hours ahead?

**Answer:**

The horizon depends on the availability and quality of rainfall forecasts and the model design. We can demonstrate a multi-hour timeline only for horizons supported by the underlying input data. We should not promise six-hour accuracy independently of forecast quality.

---

## Q14. Why use DEM?

**Answer:**

Elevation and derived slope help identify low-lying areas and potential surface-flow pathways. Terrain is therefore an important factor in estimating where runoff may accumulate.

---

## Q15. What happens if the DEM is too coarse?

**Answer:**

Local road-level drainage features may not be captured accurately. We therefore treat DEM resolution as a limitation and would use higher-resolution elevation data for a production deployment.

---

## Q16. How does the dashboard help a municipal officer?

**Answer:**

It prioritizes locations. Instead of only showing rainfall, it can show high-risk zones, drainage stress, blockage scenarios, affected roads and the factors contributing to the risk.

---

## Q17. What is the most important dashboard feature?

**Answer:**

The risk map alone is not enough. The most important feature is the combination of **location + time + reason + recommended inspection priority**.

---

## Q18. What if a road is flooded but your system did not predict it?

**Answer:**

That is a false negative and an important validation case. We would record the observation, identify which input or model component failed, and use it for calibration. In production, the system should also complement official warnings and field reports rather than operate as the sole safety authority.

---

## Q19. What if your system gives too many alerts?

**Answer:**

That can create alert fatigue. We therefore need calibrated thresholds, severity levels and explanations. The system should prioritize actionable alerts rather than simply maximizing the number of warnings.

---

## Q20. Can this work in another city?

**Answer:**

The software architecture is transferable, but the model should not be assumed to transfer perfectly. Each city has different terrain, drainage infrastructure, rainfall characteristics and historical flood patterns, so local calibration and validation are required.

---

## Q21. Why use PostgreSQL + PostGIS?

**Answer:**

Because this system is heavily geospatial. PostGIS allows us to store and query geographic objects such as roads, drainage segments, boundaries and risk zones in the database.

---

## Q22. Why FastAPI?

**Answer:**

It provides a lightweight Python backend suitable for exposing data-processing and prediction functionality through APIs, while also fitting naturally with the Python-based geospatial and ML stack.

---

## Q23. Why React?

**Answer:**

The municipal dashboard is a map-heavy web interface. React provides component-based UI development and works well with mapping and visualization libraries.

---

## Q24. What if real-time data stops?

**Answer:**

The system should show data freshness and quality. It can fall back to the latest valid data or scenario mode, but it must clearly indicate that live data is unavailable rather than silently pretending it is current.

---

## Q25. What if the drainage is physically damaged rather than blocked?

**Answer:**

The same framework can represent reduced effective capacity. In a production system, condition information would ideally come from inspection records or sensors.

---

## Q26. Can you detect a blocked drain automatically?

**Answer:**

Not reliably from rainfall and DEM alone. Automatic blockage detection would require additional observations such as inspection data, sensors, CCTV/computer vision or citizen reports. Our prototype represents blockage as an input/scenario rather than falsely claiming automatic detection.

---

## Q27. What is your biggest technical challenge?

**Answer:**

Data quality, especially detailed and current drainage capacity and condition data. The modelling itself is manageable; obtaining reliable local infrastructure data is the harder deployment problem.

---

## Q28. What is your biggest weakness?

**Answer:**

The prototype may initially depend on estimated or simulated drainage information where real municipal data is unavailable. We address this by explicitly labelling the data and designing the system so that real municipal data can replace the assumptions later.

---

## Q29. What part is actually AI?

**Answer:**

The ML component is the optional calibration/prediction layer. The broader system also contains geospatial processing and physics-inspired/rule-based reasoning. We should not label every component as AI.

---

## Q30. What happens if the AI is wrong?

**Answer:**

The system is decision support, not an autonomous emergency authority. Predictions should include data-quality/uncertainty information and be combined with official warnings and human review for operational decisions.

---

## Q31. Why should a municipality trust your system?

**Answer:**

Not because we claim perfect accuracy. Trust should come from transparent inputs, explainable risk factors, measurable validation, data-quality indicators and an audit trail of why a risk was generated.

---

## Q32. What is your MVP?

**Answer:**

A working web dashboard that takes rainfall and geospatial/drainage inputs, calculates explainable local flood risk, displays the risk on a map and identifies drainage/road locations requiring attention.

---

## Q33. If you only have four days, what will you actually demonstrate?

**Answer:**

We should demonstrate one complete vertical flow rather than many incomplete modules:

```text
Input
 ↓
Processing
 ↓
Risk Calculation
 ↓
Map
 ↓
Dashboard
 ↓
Explanation
```

Additional features can be shown as future scope.

---

## Q34. Why not build IoT sensors immediately?

**Answer:**

Sensors improve real-world observability, but deploying a reliable sensor network requires hardware, calibration, power, connectivity and maintenance. For SIH, we can demonstrate the software architecture first and show sensor integration as the next phase.

---

## Q35. How will citizen reports help?

**Answer:**

They can provide local observations that may be useful for validation. However, citizen reports are noisy, so they should be quality-controlled and should not automatically become ground truth.

---

## Q36. How do you prevent fake citizen reports?

**Answer:**

Possible controls include location verification, timestamps, duplicate detection, multiple independent reports, moderation and confidence scoring. A report should be treated as an observation with uncertainty, not absolute truth.

---

## Q37. What is your fallback if ML doesn't work?

**Answer:**

The core system can operate with the explainable baseline risk engine. ML is a calibration layer, not a single point of failure.

---

## Q38. What makes this production-ready?

**Answer:**

The architecture is designed with production concerns such as data provenance, geospatial storage, API separation, validation, monitoring and modularity. However, the SIH prototype itself should not be described as production-ready until it has undergone real-world validation and operational testing.

---

## Q39. What would you do with government access?

**Answer:**

We would replace estimated infrastructure information with authoritative municipal data, integrate official weather/flood feeds, validate the model against historical incidents and conduct a controlled pilot.

---

## Q40. Give your solution in one sentence.

**Answer:**

> FloodGuard AI converts rainfall and urban geospatial/drainage conditions into explainable, location-specific flood-risk information so authorities can identify where flooding may occur, why it may occur and which locations need attention first.

---

# PART 5 — RAPID-FIRE Q&A

Team members should be able to answer these in under 15 seconds.

| Question | One-line answer |
|---|---|
| Problem? | Hyperlocal urban flood-risk decision support. |
| Main input? | Rainfall + terrain + drainage + exposure. |
| Main output? | Explainable location-level flood risk. |
| Why drainage? | Rainfall impact depends on drainage capacity. |
| Blockage? | Modelled as reduced effective drainage capacity. |
| AI? | Used mainly for calibration when labelled data exists. |
| Dashboard? | Risk map + timeline + causes + priority locations. |
| Database? | PostgreSQL + PostGIS. |
| Backend? | FastAPI. |
| Frontend? | React + TypeScript. |
| GIS? | Leaflet + geospatial Python tools. |
| Validation? | Historical/observed flood locations and scenario testing. |
| Biggest challenge? | Reliable local drainage data. |
| Biggest limitation? | Data quality and validation availability. |
| IoT? | Future/extension phase. |
| Production? | Requires municipal data and real-world validation. |
| Existing systems? | IMD, CWC and other flood-warning platforms exist. |
| Difference? | Local drainage-aware municipal decision support. |
| Accuracy? | Only claim measured metrics from real validation. |
| City transfer? | Architecture transfers; local calibration is required. |

---

# PART 6 — QUESTIONS THE TEAM SHOULD ASK THE JUDGES / MENTOR

These are useful if the discussion allows questions.

1. What level of spatial resolution would be considered operationally useful for the target municipality?
2. Which official rainfall data source should be preferred for the final prototype?
3. Is municipal drainage capacity data available for the selected demonstration city?
4. What historical flood labels are available for validation?
5. Should the prototype prioritize ward-level or road-level prediction?
6. Which authority would be the primary operational user?
7. What alert lead time is most useful for the target use case?
8. Which data source can be treated as authoritative for flood observations?
9. What deployment constraints should be considered for government infrastructure?
10. Which existing system should the prototype be benchmarked against?

---

# PART 7 — FINAL TEAM RULES FOR Q&A

## Rule 1 — Never invent an accuracy number.

If asked:

> "What is your accuracy?"

Say:

> "We are validating it against historical observations. We will report measured metrics rather than claim an unsupported accuracy."

## Rule 2 — Never call simulated data real.

Say:

> "This layer is simulated for prototype demonstration."

## Rule 3 — Never claim to replace IMD/CWC/NDMA.

Say:

> "We complement existing information with an urban, local decision-support layer."

## Rule 4 — Never overclaim AI.

Say:

> "The core system uses geospatial and runoff/drainage reasoning; ML is a calibration component where sufficient data exists."

## Rule 5 — Explain every red zone.

A judge should be able to ask:

> "Why is this location red?"

And the team should answer immediately:

> "Because the model is combining these specific factors..."

## Rule 6 — Know what is built.

Before the presentation, every feature must be marked:

- **BUILT**
- **PARTIALLY BUILT**
- **SIMULATED**
- **PROPOSED**

Never mix these categories.

---

# PART 8 — RESEARCH SOURCES TO VERIFY BEFORE FINAL PPT

## Official / high-value sources

### India Meteorological Department
Use for:
- rainfall
- warnings
- nowcast
- flash-flood guidance

### National Disaster Management Authority
Use for:
- disaster management context
- urban flood preparedness
- public safety guidance

### Central Water Commission
Use for:
- flood monitoring
- flood forecasting
- official flood information

### Google Flood Hub
Use for:
- existing AI flood forecasting comparison
- understanding current flood-model capabilities
- identifying what the proposed project should and should not claim

### USGS / NASA SRTM
Use for:
- DEM/elevation source information

### OpenStreetMap
Use for:
- mapped roads and available geospatial features

### Peer-reviewed research
Use for:
- 1D/2D urban flood modelling
- drainage modelling
- ML flood prediction
- hybrid modelling

---

# PART 9 — FINAL DELIVERABLE CHECKLIST

## PPT

- [ ] Slide 1 — Team information handled by PR/team
- [ ] Slide 2 — Problem + solution + differentiation
- [ ] Slide 3 — Technical approach
- [ ] Slide 4 — Feasibility + challenges
- [ ] Slide 5 — Impact + dashboard
- [ ] Slide 6 — Verified references

## Prototype

- [ ] Rainfall input
- [ ] DEM/elevation
- [ ] Drainage network
- [ ] Drain capacity representation
- [ ] Blockage scenario
- [ ] Risk engine
- [ ] Map
- [ ] Dashboard
- [ ] Risk explanation
- [ ] At least one validation/demo scenario
- [ ] Built/simulated/proposed labels

## Report

- [ ] Executive Summary
- [ ] Problem Background
- [ ] Objectives
- [ ] Existing Systems
- [ ] Gap Analysis
- [ ] Proposed Architecture
- [ ] Data Layer
- [ ] Drainage Capacity
- [ ] Blockage Model
- [ ] Flood Risk Engine
- [ ] ML Strategy
- [ ] Dashboard
- [ ] Validation
- [ ] Feasibility
- [ ] Risks
- [ ] Future Scope
- [ ] Conclusion
- [ ] References

## Q&A

- [ ] 40 core questions prepared
- [ ] Rapid-fire questions memorized
- [ ] Each member knows architecture
- [ ] Each member knows what is actually built
- [ ] No unsupported statistics
- [ ] No fake accuracy
- [ ] No "first in India" without evidence
- [ ] No claim that simulated data is real
- [ ] No claim that the system replaces official authorities

---

# FINAL PRIORITY ORDER

If time becomes short, work in this order:

**1. Working prototype**

**2. Slide 2–5 clarity**

**3. Q&A preparation**

**4. Technical architecture**

**5. Validation/demo**

**6. Slide 6 references**

**7. Detailed report formatting**

A technically defensible prototype with strong Q&A is more valuable for SIH than a 25-page report containing unsupported claims.
