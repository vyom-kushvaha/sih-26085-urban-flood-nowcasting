# System Design Document
# Urban Flood Nowcasting System — SIH26085

---

## 1. System Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        SYSTEM ARCHITECTURE                               │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐              │
│   │   CITIZEN   │    │    ADMIN    │    │  RESEARCHER │              │
│   │  WEB PORTAL │    │  DASHBOARD  │    │    API      │              │
│   │  (React.js) │    │  (React.js) │    │   (REST)    │              │
│   └──────┬──────┘    └──────┬──────┘    └──────┬──────┘              │
│          │                  │                  │                        │
│          └──────────────────┼──────────────────┘                        │
│                             │                                          │
│                    ┌────────┴────────┐                                 │
│                    │   API GATEWAY   │                                 │
│                    │   (FastAPI)     │                                 │
│                    └────────┬────────┘                                 │
│                             │                                          │
│          ┌──────────────────┼──────────────────┐                      │
│          │                  │                  │                        │
│   ┌──────▼──────┐   ┌──────▼──────┐   ┌──────▼──────┐              │
│   │  LOCATION   │   │    RISK     │   │    ADMIN    │              │
│   │   SERVICE   │   │   SERVICE   │   │   SERVICE   │              │
│   │  /location  │   │   /risk     │   │   /admin    │              │
│   └──────┬──────┘   └──────┬──────┘   └──────┬──────┘              │
│          │                  │                  │                        │
│          └──────────────────┼──────────────────┘                      │
│                             │                                          │
│                    ┌────────┴────────┐                                 │
│                    │  CORE ENGINE    │                                 │
│                    │  (Python)       │                                 │
│                    │                 │                                 │
│                    │ ┌─────────────┐ │                                 │
│                    │ │  DIFFUSIVE  │ │                                 │
│                    │ │   WAVE      │ │                                 │
│                    │ │    MODEL    │ │                                 │
│                    │ └─────────────┘ │                                 │
│                    │ ┌─────────────┐ │                                 │
│                    │ │  ML LAYER   │ │                                 │
│                    │ │ (XGBoost)   │ │                                 │
│                    │ └─────────────┘ │                                 │
│                    └────────┬────────┘                                 │
│                             │                                          │
│          ┌──────────────────┼──────────────────┐                      │
│          │                  │                  │                        │
│   ┌──────▼──────┐   ┌──────▼──────┐   ┌──────▼──────┐              │
│   │   REALTIME  │   │    STATIC   │   │    CACHE    │              │
│   │    DATA     │   │    DATA     │   │   (Redis)   │              │
│   │             │   │             │   │             │              │
│   │ - IMD API   │   │ - DEM       │   │ - Risk scores│             │
│   │ - OpenWeather│  │ - Drainage  │   │ - Weather    │             │
│   │ - RainViewer│   │ - Flood zones│  │ - Sessions   │             │
│   │ - Sensors   │   │ - Soil type │   │             │              │
│   └─────────────┘   └─────────────┘   └─────────────┘              │
│                                                                         │
│   ┌─────────────────────────────────────────────────────────────┐      │
│   │              DATABASE (PostgreSQL + PostGIS)                │      │
│   │                                                             │      │
│   │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │      │
│   │  │  Users   │  │ Locations│  │  Risks   │  │  Reports │  │      │
│   │  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │      │
│   │                                                             │      │
│   │  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  │      │
│   │  │  Alerts  │  │  Wards   │  │  Sensors │  │  History │  │      │
│   │  └──────────┘  └──────────┘  └──────────┘  └──────────┘  │      │
│   │                                                             │      │
│   └─────────────────────────────────────────────────────────────┘      │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Component Design

### 2.1 API Gateway (FastAPI)

**Responsibilities:**
- Request routing
- Authentication (API keys)
- Rate limiting
- Request/Response validation
- Error handling

**Endpoints:**

```
# Location Service
GET  /api/v1/location/elevation
GET  /api/v1/location/slope
GET  /api/v1/location/terrain

# Risk Service  
GET  /api/v1/risk/current
GET  /api/v1/risk/forecast
POST /api/v1/risk/calculate

# Weather Service
GET  /api/v1/weather/current
GET  /api/v1/weather/forecast

# Admin Service
GET  /api/v1/admin/city-overview
GET  /api/v1/admin/ward/{ward_id}
POST /api/v1/admin/alert/broadcast
GET  /api/v1/admin/reports

# Citizen Service
POST /api/v1/citizen/report
GET  /api/v1/citizen/alerts
GET  /api/v1/citizen/shelters
```

### 2.2 Core Engine

#### Diffusive-Wave Model

```
class DiffusiveWaveModel:
    # Simplified 2D hydraulic model

    Input: DEM data, drainage network, rainfall
    Process: 
      1. Generate runoff from rainfall
      2. Calculate slope from DEM
      3. Route water using diffusive-wave approximation
      4. Check drainage capacity
    Output: Water depth grid, risk scores
```

#### ML Calibration Layer

```
class MLCalibrationModel:
    # XGBoost model to improve physics-based predictions

    Input: Physics prediction + weather + terrain features
    Process:
      1. Extract features (rainfall, elevation, slope, etc.)
      2. Physics prediction (60% weight)
      3. ML correction (40% weight)
    Output: Final risk score (0-100)
```

### 2.3 Data Pipeline

```
SCHEDULER (Every 15 min)
       |
  DATA COLLECTORS
  |-- IMD API
  |-- OpenWeatherMap API
  |-- IoT Sensors
       |
  DATA PROCESSOR
  |-- Validation
  |-- Normalization
  |-- Spatial interpolation
  |-- Missing data handling
       |
  DATA STORE
  |-- PostgreSQL (Persistent)
  |-- Redis (Cache)
       |
  MODEL TRIGGER
  |-- New data -> Recalculate risk
  |-- Update cache -> Push alerts
```

---

## 3. Database Design

### 3.1 Key Tables

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

---

## 4. Deployment Architecture

```
AWS Free Tier Setup:

Route 53 (DNS)
    |
CloudFront (CDN)
    |
VPC
|-- EC2 / ECS (FastAPI Backend)
|-- RDS PostgreSQL + PostGIS
|-- ElastiCache Redis
|-- S3 (Photos + DEM files)
|-- CloudWatch (Monitoring)
```

---

## 5. Security Design

| Component | Security |
|-----------|----------|
| Citizen Web Portal | Anonymous (session/device ID) or Web OTP |
| Admin Dashboard | JWT Token |
| Researcher API | API Key + Rate Limiting |
| Location Data | 24-hour retention, anonymized |
| Phone Numbers | Encrypted at rest |

---

## 6. Scalability Plan

| Phase | Scale | Infrastructure |
|-------|-------|---------------|
| MVP | 1 City, 1000 users | Single EC2 + RDS micro |
| Multi-City | 5 Cities, 10K users | ECS auto-scaling + RDS medium |
| National | 50+ Cities, 100K+ users | EKS + Multi-AZ + Read replicas |

---

*System Design Version 1.0 | SIH 2026*
