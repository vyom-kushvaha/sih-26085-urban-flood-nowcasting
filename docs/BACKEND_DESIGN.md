# Backend Design Document

**R.A.K.S.H.A.K. — Real-time Assessment & Knowledge System for Hydrological Alerts**

# Urban Flood Nowcasting System — SIH26085

---

## 1. API Design

### 1.1 Base URL
```
Production: https://api.floodguard.ai/v1
Development: http://localhost:8000/api/v1
```

### 1.2 Authentication
```
Citizen: Device ID (header: X-Device-ID)
Admin: JWT Token (header: Authorization: Bearer <token>)
Researcher: API Key (header: X-API-Key)
```

### 1.3 Key Endpoints

#### GET /risk/current
```
Request: ?lat=19.0760&lon=72.8777

Response:
{
  "location": {"lat": 19.0760, "lon": 72.8777, "name": "Dadar, Mumbai"},
  "timestamp": "2026-09-02T10:30:00Z",
  "risk": {
    "score": 78,
    "level": "HIGH",
    "confidence": 0.82,
    "factors": {
      "rainfall_contribution": 35,
      "elevation_contribution": 20,
      "drainage_contribution": 15,
      "historical_contribution": 8
    }
  },
  "water_depth": {
    "current_m": 0.15,
    "predicted_1h_m": 0.45,
    "predicted_3h_m": 0.25,
    "predicted_6h_m": 0.05
  },
  "drainage": {
    "status": "WARNING",
    "capacity_used_percent": 75,
    "overflow_risk": true
  },
  "recommendation": "Move to higher ground. Nearest shelter: 500m north.",
  "model_version": "1.0.0"
}
```

#### GET /admin/city-overview
```
Headers: Authorization: Bearer <jwt>

Response:
{
  "city": "Mumbai",
  "timestamp": "2026-09-02T10:30:00Z",
  "summary": {
    "total_wards": 24,
    "safe_wards": 12,
    "moderate_wards": 8,
    "high_wards": 3,
    "critical_wards": 1
  },
  "wards": [
    {
      "id": 12,
      "name": "Dadar",
      "risk_score": 78,
      "risk_level": "HIGH",
      "population": 45000,
      "rainfall_mm_hr": 45.0,
      "active_alerts": 2
    }
  ],
  "active_alerts_count": 5,
  "citizens_reached": 125000
}
```

#### POST /admin/alert/broadcast
```
Request:
{
  "target_wards": [12, 13, 14],
  "severity": "CRITICAL",
  "message": "Flood warning: Move to nearest shelter immediately.",
  "channels": ["APP", "SMS"],
  "expires_at": "2026-09-02T14:00:00Z"
}

Response:
{
  "alert_id": "alert_12345",
  "status": "SENT",
  "target_count": 45000,
  "delivered_count": 42300,
  "failed_count": 2700,
  "sent_at": "2026-09-02T10:30:00Z"
}
```

---

## 2. Database Schema

### Key Tables

```sql
-- Cities
cities(id, name, state, boundary, dem_resolution)

-- Wards
wards(id, city_id, name, boundary, population, flood_prone)

-- Elevation Grid (DEM)
elevation_grid(id, city_id, lat, lon, elevation, slope, 
               drainage_density, flood_zone, geom)

-- Weather Data
weather_data(id, city_id, timestamp, rainfall_mm, 
             rainfall_intensity, temperature, humidity, 
             wind_speed, source)

-- Risk Calculations
risk_calculations(id, ward_id, timestamp, risk_score, 
                  risk_level, water_depth, rainfall_mm,
                  drainage_status, prediction_horizon)

-- Alerts
alerts(id, ward_id, risk_calculation_id, message, 
       severity, channel, sent_at, delivered)

-- Citizen Reports
citizen_reports(id, user_id, lat, lon, photo_url, 
                description, severity, verified, created_at)

-- Users
users(id, phone, name, role, preferred_language, 
      notification_enabled, created_at)
```

### Indexes
```sql
CREATE INDEX idx_elevation_geom ON elevation_grid USING GIST(geom);
CREATE INDEX idx_weather_timestamp ON weather_data(timestamp);
CREATE INDEX idx_risk_ward_time ON risk_calculations(ward_id, timestamp);
CREATE INDEX idx_reports_geom ON citizen_reports USING GIST(geom);
```

---

## 3. Core Engine Logic

### 3.1 Diffusive-Wave Model

```python
class DiffusiveWaveModel:
    # Simplified 2D hydraulic model

    Input: DEM grid, drainage network, rainfall
    Process:
      1. Calculate slope from DEM (Sobel operator)
      2. Convert rainfall to runoff (runoff coefficient)
      3. Route water using diffusive-wave approximation
      4. Check drainage capacity
      5. Calculate risk score (0-100)
    Output: Water depth grid, risk score grid

    Key Formula:
      Flow rate = slope * depth^1.67 (simplified Manning's)
      Risk = f(water_depth, elevation, slope, drainage)
```

### 3.2 ML Calibration Layer

```python
class FloodRiskMLModel:
    # XGBoost model

    Features:
      - physics_prediction (60% weight)
      - rainfall_intensity
      - elevation, slope
      - drainage_density
      - historical_flood_freq
      - time_of_day, season

    Output: Calibrated risk score (0-100)

    Formula: final = 0.6 * physics + 0.4 * ml
```

---

## 4. External API Integrations

| API | Data | Frequency | Fallback |
|-----|------|-----------|----------|
| OpenWeatherMap | Rainfall, temp | 15 min | Cached data |
| IMD | Radar, forecast | 1 hour | OpenWeatherMap |
| RainViewer | Radar imagery | 15 min | None |
| Bhuvan | DEM, land use | Static | SRTM |
| OSM | Drainage network | Static | Municipal data |

---

## 5. Error Handling

| Code | When Used |
|------|-----------|
| 200 | Success |
| 400 | Invalid parameters |
| 401 | Missing auth |
| 429 | Rate limit |
| 500 | Server error |
| 503 | External API down (use fallback) |

---

## 6. Performance Targets

| Metric | Target |
|--------|--------|
| API Response | <2 seconds |
| Risk Calculation | <2 seconds per location |
| Alert Delivery | <1 minute |
| Concurrent Users | 10,000+ |

---

*Backend Design Version 1.0 | SIH 2026*
