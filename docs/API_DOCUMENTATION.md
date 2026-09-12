# API Documentation

**R.A.K.S.H.A.K. — Real-time Assessment & Knowledge System for Hydrological Alerts**

# Urban Flood Nowcasting System — SIH26085

---

## Base URL

```
Production:  https://api.floodguard.ai/v1
Development: http://localhost:8000/api/v1
```

---

## Authentication

| Role | Header | Example |
|------|--------|---------|
| Citizen | `X-Device-ID` | `X-Device-ID: dev_abc123` |
| Admin | `Authorization` | `Authorization: Bearer eyJhbG...` |
| Researcher | `X-API-Key` | `X-API-Key: key_xyz789` |

---

## Rate Limits

| Role | Requests/Min | Requests/Hour |
|------|-------------|---------------|
| Citizen | 60 | 1000 |
| Admin | 120 | 5000 |
| Researcher | 30 | 500 |

---

## Endpoints

### 1. Risk Service

#### GET /risk/current
Get current flood risk for a location.

**Request:**
```http
GET /api/v1/risk/current?lat=19.0760&lon=72.8777
X-Device-ID: dev_abc123
```

**Response:**
```json
{
  "status": "success",
  "location": {
    "lat": 19.0760,
    "lon": 72.8777,
    "name": "Dadar, Mumbai",
    "ward": "Ward F/N",
    "city": "Mumbai"
  },
  "timestamp": "2026-09-02T10:30:00+05:30",
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
  "rainfall": {
    "current_mm_hr": 45.0,
    "intensity": "HEAVY",
    "trend": "INCREASING",
    "total_today_mm": 120.0
  },
  "drainage": {
    "status": "WARNING",
    "capacity_used_percent": 75,
    "overflow_risk": true
  },
  "terrain": {
    "elevation_m": 12.5,
    "slope_degrees": 1.8,
    "flood_zone": true
  },
  "recommendation": "Move to higher ground. Nearest shelter: 500m north.",
  "model_version": "1.0.0",
  "next_update": "2026-09-02T10:45:00+05:30"
}
```

**Error Response:**
```json
{
  "status": "error",
  "error": {
    "code": "INVALID_COORDINATES",
    "message": "Latitude must be between -90 and 90",
    "details": {
      "provided_lat": 199.0760,
      "valid_range": "-90 to 90"
    }
  }
}
```

---

#### GET /risk/forecast
Get flood risk forecast for a location.

**Request:**
```http
GET /api/v1/risk/forecast?lat=19.0760&lon=72.8777&hours=6
X-Device-ID: dev_abc123
```

**Parameters:**
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| lat | float | Yes | - | Latitude |
| lon | float | Yes | - | Longitude |
| hours | int | No | 6 | Forecast horizon (1, 3, or 6) |

**Response:**
```json
{
  "status": "success",
  "location": {
    "lat": 19.0760,
    "lon": 72.8777,
    "name": "Dadar, Mumbai"
  },
  "forecast": [
    {
      "timestamp": "2026-09-02T11:00:00+05:30",
      "hours_ahead": 1,
      "risk_score": 85,
      "risk_level": "CRITICAL",
      "water_depth_m": 0.55,
      "rainfall_mm_hr": 55.0,
      "drainage_status": "OVERFLOW",
      "confidence": 0.75
    },
    {
      "timestamp": "2026-09-02T13:00:00+05:30",
      "hours_ahead": 3,
      "risk_score": 55,
      "risk_level": "MODERATE",
      "water_depth_m": 0.25,
      "rainfall_mm_hr": 20.0,
      "drainage_status": "WARNING",
      "confidence": 0.60
    },
    {
      "timestamp": "2026-09-02T16:00:00+05:30",
      "hours_ahead": 6,
      "risk_score": 25,
      "risk_level": "LOW",
      "water_depth_m": 0.05,
      "rainfall_mm_hr": 5.0,
      "drainage_status": "NORMAL",
      "confidence": 0.50
    }
  ],
  "model_version": "1.0.0"
}
```

---

#### POST /risk/calculate
Calculate risk for multiple locations with custom rainfall scenario.

**Request:**
```http
POST /api/v1/risk/calculate
X-Device-ID: dev_abc123
Content-Type: application/json

{
  "locations": [
    {"lat": 19.0760, "lon": 72.8777, "name": "Dadar"},
    {"lat": 19.0402, "lon": 72.8509, "name": "Dharavi"},
    {"lat": 19.1197, "lon": 72.8464, "name": "Andheri"}
  ],
  "rainfall_scenario": {
    "mm_hr": 50.0,
    "duration_hr": 2
  }
}
```

**Response:**
```json
{
  "status": "success",
  "scenario": {
    "rainfall_mm_hr": 50.0,
    "duration_hr": 2
  },
  "results": [
    {
      "location": {"lat": 19.0760, "lon": 72.8777, "name": "Dadar"},
      "risk_score": 78,
      "risk_level": "HIGH",
      "water_depth_m": 0.45,
      "time_to_flood_min": 45,
      "drainage_overflow": true
    },
    {
      "location": {"lat": 19.0402, "lon": 72.8509, "name": "Dharavi"},
      "risk_score": 92,
      "risk_level": "CRITICAL",
      "water_depth_m": 0.75,
      "time_to_flood_min": 20,
      "drainage_overflow": true
    },
    {
      "location": {"lat": 19.1197, "lon": 72.8464, "name": "Andheri"},
      "risk_score": 55,
      "risk_level": "MODERATE",
      "water_depth_m": 0.25,
      "time_to_flood_min": 90,
      "drainage_overflow": false
    }
  ]
}
```

---

### 2. Weather Service

#### GET /weather/current
Get current weather for a location.

**Request:**
```http
GET /api/v1/weather/current?lat=19.0760&lon=72.8777
X-Device-ID: dev_abc123
```

**Response:**
```json
{
  "status": "success",
  "location": {
    "lat": 19.0760,
    "lon": 72.8777,
    "name": "Dadar, Mumbai"
  },
  "timestamp": "2026-09-02T10:30:00+05:30",
  "weather": {
    "rainfall": {
      "current_mm_hr": 45.0,
      "intensity": "HEAVY",
      "total_today_mm": 120.0,
      "trend": "INCREASING"
    },
    "temperature": {
      "current_c": 28.5,
      "feels_like_c": 32.0
    },
    "humidity_percent": 85,
    "wind_speed_kmh": 15.2,
    "wind_direction": "SW",
    "pressure_hpa": 1008.5,
    "visibility_km": 3.5
  },
  "source": "IMD",
  "next_update": "2026-09-02T10:45:00+05:30"
}
```

---

#### GET /weather/forecast
Get weather forecast for a location.

**Request:**
```http
GET /api/v1/weather/forecast?lat=19.0760&lon=72.8777&hours=6
X-Device-ID: dev_abc123
```

**Response:**
```json
{
  "status": "success",
  "location": {
    "lat": 19.0760,
    "lon": 72.8777
  },
  "forecast": [
    {
      "timestamp": "2026-09-02T11:00:00+05:30",
      "hours_ahead": 1,
      "rainfall_mm_hr": 55.0,
      "intensity": "EXTREME",
      "temperature_c": 27.5,
      "humidity_percent": 90,
      "confidence": 0.75
    },
    {
      "timestamp": "2026-09-02T12:00:00+05:30",
      "hours_ahead": 2,
      "rainfall_mm_hr": 40.0,
      "intensity": "HEAVY",
      "temperature_c": 27.0,
      "humidity_percent": 88,
      "confidence": 0.70
    },
    {
      "timestamp": "2026-09-02T13:00:00+05:30",
      "hours_ahead": 3,
      "rainfall_mm_hr": 25.0,
      "intensity": "HEAVY",
      "temperature_c": 26.5,
      "humidity_percent": 85,
      "confidence": 0.65
    }
  ],
  "source": "IMD + OpenWeatherMap ensemble"
}
```

---

### 3. Location Service

#### GET /location/elevation
Get elevation and terrain data for a location.

**Request:**
```http
GET /api/v1/location/elevation?lat=19.0760&lon=72.8777
X-Device-ID: dev_abc123
```

**Response:**
```json
{
  "status": "success",
  "location": {
    "lat": 19.0760,
    "lon": 72.8777
  },
  "elevation": {
    "value_m": 12.5,
    "level": "LOW",
    "description": "Low-lying area, flood prone"
  },
  "slope": {
    "value_degrees": 1.8,
    "level": "FLAT",
    "description": "Flat terrain, water accumulation risk"
  },
  "drainage": {
    "density_km_per_sqkm": 1.2,
    "network_length_m": 4500,
    "nearest_drain_m": 150
  },
  "flood_zone": {
    "is_flood_zone": true,
    "historical_events": 5,
    "last_flood_date": "2022-07-05"
  },
  "city": "Mumbai",
  "ward": "Ward F/N - Dadar"
}
```

---

#### GET /location/terrain
Get terrain data for an area (grid).

**Request:**
```http
GET /api/v1/location/terrain?lat=19.0760&lon=72.8777&radius=5000
X-Device-ID: dev_abc123
```

**Parameters:**
| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| lat | float | Yes | - | Center latitude |
| lon | float | Yes | - | Center longitude |
| radius | int | No | 5000 | Radius in meters (max 10000) |

**Response:**
```json
{
  "status": "success",
  "center": {
    "lat": 19.0760,
    "lon": 72.8777
  },
  "radius_m": 5000,
  "grid": {
    "cell_size_m": 30,
    "total_cells": 27889,
    "bounds": {
      "north": 19.0985,
      "south": 19.0535,
      "east": 72.9002,
      "west": 72.8552
    }
  },
  "elevation": {
    "min_m": 2.0,
    "max_m": 55.0,
    "avg_m": 15.3,
    "median_m": 12.0
  },
  "slope": {
    "min_degrees": 0.1,
    "max_degrees": 8.5,
    "avg_degrees": 2.1
  },
  "flood_zones": [
    {
      "zone_id": 1,
      "risk_level": "HIGH",
      "area_sqkm": 2.5,
      "boundary": {...}
    }
  ]
}
```

---

### 4. Citizen Service

#### POST /citizen/report
Report flooding at a location.

**Request:**
```http
POST /api/v1/citizen/report
X-Device-ID: dev_abc123
Content-Type: multipart/form-data

lat: 19.0760
lon: 72.8777
severity: HIGH
description: "Water level rising rapidly near Hindmata circle"
photo: [binary file]
```

**Response:**
```json
{
  "status": "success",
  "report": {
    "id": "rep_67890",
    "status": "RECEIVED",
    "location": {
      "lat": 19.0760,
      "lon": 72.8777
    },
    "severity": "HIGH",
    "photo_url": "https://cdn.floodguard.ai/reports/rep_67890.jpg",
    "submitted_at": "2026-09-02T10:35:00+05:30",
    "points_earned": 10,
    "message": "Thank you for your report. Our team will verify it within 30 minutes."
  }
}
```

---

#### GET /citizen/alerts
Get alerts for the citizen.

**Request:**
```http
GET /api/v1/citizen/alerts?unread_only=true&limit=10
X-Device-ID: dev_abc123
```

**Response:**
```json
{
  "status": "success",
  "alerts": [
    {
      "id": "alert_12345",
      "severity": "CRITICAL",
      "title": "Flood Warning",
      "message": "Flood warning for Dadar area. Move to nearest shelter immediately.",
      "location": {
        "lat": 19.0760,
        "lon": 72.8777,
        "name": "Dadar, Mumbai"
      },
      "sent_at": "2026-09-02T10:30:00+05:30",
      "expires_at": "2026-09-02T14:00:00+05:30",
      "read": false,
      "action_required": true,
      "shelters": [
        {
          "id": 1,
          "name": "Dadar Municipal School",
          "distance_m": 500,
          "directions_url": "https://maps.google.com/..."
        }
      ]
    },
    {
      "id": "alert_12344",
      "severity": "HIGH",
      "title": "Heavy Rain Alert",
      "message": "Heavy rainfall expected for next 2 hours. Stay indoors if possible.",
      "sent_at": "2026-09-02T09:15:00+05:30",
      "read": true,
      "action_required": false
    }
  ],
  "unread_count": 1,
  "total_count": 15
}
```

---

#### GET /citizen/shelters
Get nearest flood shelters.

**Request:**
```http
GET /api/v1/citizen/shelters?lat=19.0760&lon=72.8777&radius=2000
X-Device-ID: dev_abc123
```

**Response:**
```json
{
  "status": "success",
  "location": {
    "lat": 19.0760,
    "lon": 72.8777
  },
  "radius_m": 2000,
  "shelters": [
    {
      "id": 1,
      "name": "Dadar Municipal School",
      "address": "Dadar West, Mumbai 400028",
      "lat": 19.0780,
      "lon": 72.8790,
      "distance_m": 500,
      "walking_time_min": 7,
      "capacity": 200,
      "current_occupancy": 45,
      "available_spots": 155,
      "facilities": ["water", "food", "medical", "toilets"],
      "contact": "+91-22-24101234",
      "directions_url": "https://maps.google.com/dir/?api=1&destination=19.0780,72.8790",
      "status": "OPEN"
    },
    {
      "id": 2,
      "name": "Shivaji Park Gymkhana",
      "address": "Shivaji Park, Dadar",
      "lat": 19.0250,
      "lon": 72.8380,
      "distance_m": 1200,
      "walking_time_min": 15,
      "capacity": 500,
      "current_occupancy": 120,
      "available_spots": 380,
      "facilities": ["water", "food", "medical"],
      "contact": "+91-22-24451234",
      "directions_url": "https://maps.google.com/dir/?api=1&destination=19.0250,72.8380",
      "status": "OPEN"
    }
  ],
  "total_shelters": 2
}
```

---

### 5. Admin Service

#### GET /admin/city-overview
Get city-wide flood risk overview. (Admin only)

**Request:**
```http
GET /api/v1/admin/city-overview?city=Mumbai
Authorization: Bearer eyJhbG...
```

**Response:**
```json
{
  "status": "success",
  "city": "Mumbai",
  "timestamp": "2026-09-02T10:30:00+05:30",
  "summary": {
    "total_wards": 24,
    "total_population": 12478447,
    "safe_wards": 12,
    "moderate_wards": 8,
    "high_wards": 3,
    "critical_wards": 1,
    "active_alerts": 5,
    "citizens_reached": 125000
  },
  "wards": [
    {
      "id": 12,
      "name": "Dadar",
      "code": "F/N",
      "risk_score": 78,
      "risk_level": "HIGH",
      "population": 45000,
      "area_sqkm": 2.5,
      "rainfall_mm_hr": 45.0,
      "water_depth_m": 0.15,
      "drainage_status": "WARNING",
      "active_alerts": 2,
      "recent_reports": 5
    },
    {
      "id": 14,
      "name": "Dharavi",
      "code": "N",
      "risk_score": 92,
      "risk_level": "CRITICAL",
      "population": 850000,
      "area_sqkm": 2.1,
      "rainfall_mm_hr": 45.0,
      "water_depth_m": 0.35,
      "drainage_status": "OVERFLOW",
      "active_alerts": 3,
      "recent_reports": 12
    }
  ],
  "weather": {
    "city_avg_rainfall_mm_hr": 35.0,
    "max_rainfall_ward": "Dadar",
    "forecast_trend": "INCREASING"
  }
}
```

---

#### GET /admin/ward/{ward_id}
Get detailed information for a specific ward. (Admin only)

**Request:**
```http
GET /api/v1/admin/ward/12
Authorization: Bearer eyJhbG...
```

**Response:**
```json
{
  "status": "success",
  "ward": {
    "id": 12,
    "name": "Dadar",
    "code": "F/N",
    "boundary": {
      "type": "Polygon",
      "coordinates": [...]
    },
    "population": 45000,
    "area_sqkm": 2.5,
    "density_per_sqkm": 18000
  },
  "current_risk": {
    "score": 78,
    "level": "HIGH",
    "water_depth_m": 0.15,
    "drainage_status": "WARNING",
    "updated_at": "2026-09-02T10:30:00+05:30"
  },
  "prediction": {
    "1h": {
      "risk_score": 85,
      "risk_level": "CRITICAL",
      "water_depth_m": 0.45,
      "drainage_status": "OVERFLOW"
    },
    "3h": {
      "risk_score": 55,
      "risk_level": "MODERATE",
      "water_depth_m": 0.25,
      "drainage_status": "WARNING"
    },
    "6h": {
      "risk_score": 25,
      "risk_level": "LOW",
      "water_depth_m": 0.05,
      "drainage_status": "NORMAL"
    }
  },
  "resources": {
    "pumps": {
      "total": 8,
      "active": 5,
      "available": 3,
      "deployed_locations": [...]
    },
    "rescue_teams": {
      "total": 4,
      "deployed": 2,
      "available": 2,
      "on_standby": 0
    },
    "shelters": {
      "total": 6,
      "active": 3,
      "total_capacity": 800,
      "current_occupancy": 145,
      "available_capacity": 655
    }
  },
  "recent_reports": [
    {
      "id": "rep_67890",
      "lat": 19.0760,
      "lon": 72.8777,
      "severity": "HIGH",
      "photo_url": "https://cdn.floodguard.ai/reports/rep_67890.jpg",
      "description": "Water level rising rapidly",
      "created_at": "2026-09-02T10:15:00+05:30",
      "verified": false
    }
  ],
  "historical_floods": [
    {
      "date": "2022-07-05",
      "max_rainfall_mm": 150.0,
      "max_water_depth_m": 1.2,
      "affected_population": 25000
    }
  ]
}
```

---

#### POST /admin/alert/broadcast
Send alert to citizens in target wards. (Admin only)

**Request:**
```http
POST /api/v1/admin/alert/broadcast
Authorization: Bearer eyJhbG...
Content-Type: application/json

{
  "target_wards": [12, 13, 14],
  "target_area": {
    "type": "circle",
    "center": {"lat": 19.0760, "lon": 72.8777},
    "radius_m": 5000
  },
  "severity": "CRITICAL",
  "title": "Flood Warning",
  "message": "Flood warning for Dadar, Dharavi, and Parel areas. Move to nearest shelter immediately. Do not attempt to cross flooded roads.",
  "channels": ["APP", "SMS", "EMAIL"],
  "action_required": true,
  "shelters_to_highlight": [1, 2, 3],
  "expires_at": "2026-09-02T14:00:00+05:30"
}
```

**Response:**
```json
{
  "status": "success",
  "alert": {
    "id": "alert_12345",
    "status": "SENT",
    "sent_at": "2026-09-02T10:30:00+05:30",
    "target": {
      "wards": [12, 13, 14],
      "estimated_recipients": 45000
    },
    "delivery": {
      "app_push": {
        "sent": 35000,
        "delivered": 32800,
        "failed": 2200,
        "pending": 0
      },
      "sms": {
        "sent": 10000,
        "delivered": 9500,
        "failed": 500,
        "pending": 0
      },
      "email": {
        "sent": 0,
        "delivered": 0,
        "failed": 0,
        "pending": 0
      }
    },
    "total_delivered": 42300,
    "total_failed": 2700,
    "delivery_rate": 0.94
  }
}
```

---

## Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `INVALID_COORDINATES` | 400 | Lat/lon out of valid range |
| `MISSING_PARAMETER` | 400 | Required parameter not provided |
| `INVALID_API_KEY` | 401 | API key missing or invalid |
| `INVALID_TOKEN` | 401 | JWT token missing or expired |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `LOCATION_NOT_FOUND` | 404 | No data available for location |
| `RATE_LIMIT_EXCEEDED` | 429 | Too many requests |
| `WEATHER_API_UNAVAILABLE` | 503 | External weather API down |
| `INTERNAL_ERROR` | 500 | Server error |

---

*API Documentation Version 1.0 | SIH 2026*
