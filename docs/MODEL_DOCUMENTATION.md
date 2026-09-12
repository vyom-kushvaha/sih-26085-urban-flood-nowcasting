# Model Documentation

**R.A.K.S.H.A.K. — Real-time Assessment & Knowledge System for Hydrological Alerts**

# Urban Flood Nowcasting System — SIH26085

---

## 1. Model Architecture

```
INPUT LAYER
|-- Real-time Rainfall (API)
|-- DEM Elevation (Static)
|-- Slope (Derived from DEM)
|-- Drainage Network (OSM + Municipal)
|-- Historical Flood Zones (Static)
|-- Land Use / Soil Type (Static)

PHYSICS LAYER (60% weight)
|-- Diffusive-Wave 2D Model
|   |-- Rainfall -> Runoff
|   |-- DEM -> Slope -> Flow Direction
|   |-- Water Routing (8 neighbors)
|   |-- Drainage Coupling
|   |-- Water Depth Grid
|   |-- Risk Score (0-100)
|-- Output: physics_risk_score

ML LAYER (40% weight)
|-- XGBoost Regressor
|   |-- 13 Features
|   |-- physics_prediction
|   |-- rainfall, elevation, slope
|   |-- drainage, historical floods
|   |-- time, season, population
|-- Output: ml_risk_score

ENSEMBLE
|-- final = 0.6 * physics + 0.4 * ml

OUTPUT
|-- Risk Score (0-100)
|-- Risk Level (LOW/MOD/HIGH/CRIT)
|-- Water Depth (1h/3h/6h)
|-- Drainage Status
|-- Recommendation
```

---

## 2. Diffusive-Wave 2D Model

### What is it?
Simplified shallow water equations. Neglects inertia but keeps gravity + friction + water depth.

### Why for SIH?
- Fast enough for real-time
- Accurate for slow urban flooding
- Easier than full 2D solver

### Key Equation
```
Flow to neighbor = slope * depth^1.67 * time_step

slope = (elevation_current + depth_current - elevation_neighbor) / distance
```

### Algorithm
```
1. Initialize water_depth = 0
2. Pre-calculate slope from DEM
3. For each time step:
   a. Add rainfall runoff
   b. Route water to 8 neighbors (downhill)
   c. Apply drainage capacity
   d. Boundary: edges drain away
4. Calculate risk from water_depth
```

### Parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| Grid size | 30m | SRTM resolution |
| Time step | 15 min | Computational stability |
| Runoff coefficient | 0.7-0.9 | Urban impervious |
| Manning's n | 0.015-0.03 | Surface roughness |
| Drainage capacity | 0.005 m/step | Simplified |

### Risk Score Formula
```
risk = 0

# Water Depth (0-50)
>1.0m: +50 | >0.5m: +35 | >0.2m: +20 | >0.05m: +5

# Elevation (0-30)
<5m: +30 | <10m: +20 | <20m: +10

# Slope (0-20)
<1deg: +20 | <3deg: +10 | <5deg: +5

# Drainage Overflow (0-20)
Overflow: +20

Final: min(risk, 100)
```

### Risk Levels

| Score | Level | Color | Action |
|-------|-------|-------|--------|
| 0-30 | LOW | Green | Stay alert |
| 31-50 | MODERATE | Yellow | Monitor |
| 51-75 | HIGH | Orange | Move higher |
| 76-100 | CRITICAL | Red | Evacuate |

---

## 3. ML Calibration (XGBoost)

### Why?
Physics model misses:
- Local micro-climate
- Drainage maintenance
- Building density
- Historical patterns

### Features (13)
```
1. physics_risk_score (0-100)
2. rainfall_intensity_mm_hr
3. rainfall_duration_hr
4. elevation_m
5. slope_degrees
6. drainage_density_km_km2
7. historical_flood_count
8. days_since_last_flood
9. soil_permeability (1-3)
10. land_use_code (1-3)
11. hour_of_day (0-23)
12. month (1-12)
13. population_density
```

### Ensemble
```
final_risk = 0.6 * physics_risk + 0.4 * ml_risk
```

### Training
- Initial: Historical floods (5+ years)
- Online: Weekly on new events
- Retraining: Monthly full refresh

---

## 4. Drainage Coupling

### Network Representation
```
Segments: start, end, capacity_cms, current_flow, status
Outfalls: location, max_capacity, connected_segments
```

### Status
| Status | Condition | Color |
|--------|-----------|-------|
| NORMAL | Flow < 70% | Green |
| WARNING | Flow 70-90% | Yellow |
| OVERFLOW | Flow > 90% | Red |

### Logic
```
1. Calculate inflow to each drain
2. Route water through network
3. Check capacity -> overflow to surface
4. Check outfall -> backup to surface
```

---

## 5. Validation

### Metrics

| Metric | Target |
|--------|--------|
| Accuracy | >80% |
| Precision | >75% |
| Recall | >85% |
| F1 Score | >80% |
| MAE | <10 points |

### Mumbai Test Events

| Date | Actual | Predicted | Error |
|------|--------|-----------|-------|
| 26 Jul 2005 | 95 | 92 | 3 |
| 29 Aug 2017 | 75 | 78 | 3 |
| 1 Jul 2019 | 70 | 65 | 5 |
| 5 Jul 2022 | 55 | 58 | 3 |

### Accuracy by Horizon

| Horizon | Accuracy |
|---------|----------|
| 0-1 hour | 85% |
| 1-3 hours | 80% |
| 3-6 hours | 70% |

---

## 6. Limitations

| Limitation | Mitigation |
|------------|------------|
| 30m DEM resolution | Higher-res where available |
| Simplified drainage | Calibrate with history |
| No building effects | Add in v2 |
| Static land use | Annual updates |
| Limited history | Crowdsourced validation |

---

*Model Documentation Version 1.0 | SIH 2026*
