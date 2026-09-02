# Frontend Design Document
# Urban Flood Nowcasting System — SIH 26085
## Production-Oriented Dashboard & Citizen Application

---

## 1. Design Goals

The frontend must make the system useful for two different users:

1. **Citizens** — understand their local flood risk quickly and take action.
2. **Emergency / Municipal Authorities** — monitor city-wide conditions, identify emerging hotspots, validate predictions, and coordinate response.

The dashboard is therefore designed as an **operational decision-support interface**, not only as a visualization dashboard.

### Core principles

- Risk must be immediately visible.
- Map is the primary spatial interface.
- Rainfall, drainage, blockage, waterlogging and prediction must be connected.
- Every critical condition should lead to an actionable response.
- Avoid displaying fabricated precision when data is unavailable.
- All risk values must show timestamp/source status where applicable.
- Color must never be the only indicator of severity.
- Responsive design: desktop-first for authorities, mobile-first for citizens.

---

# 2. Information Architecture

## 2.1 Authority Web Application

Primary navigation:

- Overview
- Live Map
- Flood Prediction
- Drainage Network
- Hotspots
- Alerts
- Citizen Reports
- Resources
- Analytics
- Settings

## 2.2 Citizen Application

Primary navigation:

- Home
- Map
- Alerts
- Report

---

# 3. Authority Dashboard — Overview

## 3.1 Header

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ FloodGuard AI   | City: Mumbai ▼ | Last Updated: 10:30 AM | ● System Healthy│
│                                                        Admin ▼   Notifications│
└──────────────────────────────────────────────────────────────────────────────┘
```

Header information:

- Product name
- Selected city
- Last data update
- System/data health
- Notifications
- User/account menu

---

## 3.2 KPI Row

```text
┌────────────┬────────────┬────────────┬────────────┬────────────┬────────────┐
│ CITY RISK  │ HIGH /     │ RAINFALL  │ OVERLOADED │ BLOCKED    │ ACTIVE     │
│   78       │ CRITICAL   │  8 Zones  │   12       │   7        │ ALERTS  14 │
│ HIGH       │   7 Zones  │           │   Drains   │   Drains   │            │
└────────────┴────────────┴────────────┴────────────┴────────────┴────────────┘
```

Recommended KPI cards:

1. Overall city risk
2. High/Critical zones
3. Heavy rainfall zones
4. Overloaded drains
5. Blocked drains
6. Active alerts
7. Unverified citizen reports
8. Resources currently deployed

Each KPI is clickable and filters the relevant screen/map layer.

---

# 4. Live Flood Intelligence Map

The map is the largest component of the dashboard.

```text
┌──────────────────────────────────────────────────────────────────────────────┐
│ LIVE FLOOD INTELLIGENCE                                                      │
│                                                                              │
│ [Flood Risk] [Rainfall] [Drainage] [Blocked Drains] [Waterlogging]           │
│ [Roads] [Shelters]                                                           │
│                                                                              │
│                         LIVE MAP                                             │
│                                                                              │
│              🟢        🟡             🟠                                     │
│                                      🔴                                     │
│                    ⚫                 📍                                     │
│                                                                              │
│ ──────────────────────────────────────────────────────────────────────────── │
│ Legend: Low | Moderate | High | Critical | Blocked | Waterlogged            │
└──────────────────────────────────────────────────────────────────────────────┘
```

### Map layers

#### Flood Risk

- Low
- Moderate
- High
- Critical

#### Rainfall

- Current rainfall intensity
- Rainfall accumulation where available
- Forecast rainfall where available

#### Drainage

- Drain locations
- Drain capacity
- Current utilization
- Overloaded status

#### Blocked Drains

- Reported/known blocked drains
- Blockage severity
- Verification status

#### Waterlogging

- Citizen reports
- Sensor observations where available
- Verified waterlogging zones

#### Roads

- Flood-affected roads
- Potentially unsafe roads
- Road closure status

#### Emergency infrastructure

- Shelters
- Pumps
- Response teams
- Other configured resources

### Map interactions

- Click zone → Zone details
- Click drain → Drain details
- Click report → Report details
- Click shelter → Shelter information
- Toggle layers
- Zoom/pan
- Time slider for prediction

---

# 5. Prediction Panel

Prediction must be connected to a selected area.

```text
┌─────────────────────────────────────┐
│ FLOOD PREDICTION                    │
│                                     │
│ Selected: Ward 12 - Dadar           │
│                                     │
│ NOW       🔴 HIGH                   │
│ +1 HOUR   🔴 HIGH                   │
│ +3 HOURS  🟠 HIGH/MODERATE          │
│ +6 HOURS  🟡 MODERATE               │
│                                     │
│ Probability: 87%                    │
│ Confidence: Medium                  │
│                                     │
│ [View Prediction Details]           │
└─────────────────────────────────────┘
```

### Prediction details

Show:

- Forecast horizon
- Risk level
- Probability, if model provides it
- Confidence/uncertainty
- Main contributing factors
- Last model update
- Data freshness

Do not display a probability or confidence value unless the backend/model actually provides it.

---

# 6. Drainage Intelligence

This is a core module.

## 6.1 Summary

```text
┌──────────────────────────────────────────────────────────┐
│ DRAINAGE STATUS                                          │
│                                                          │
│ Normal       43                                       🟢 │
│ Near Capacity 18                                      🟡 │
│ Overloaded    12                                      🟠 │
│ Blocked        7                                      🔴 │
│ Unknown        4                                      ⚪ │
└──────────────────────────────────────────────────────────┘
```

## 6.2 Drain table

| Drain ID | Location | Capacity | Current Load | Blockage | Status |
|----------|----------|----------|--------------|----------|--------|
| D-102 | Dadar | 80% | 92% | No | Overloaded |
| D-108 | Parel | 70% | 68% | No | Near Capacity |
| D-115 | Dharavi | 90% | 45% | No | Normal |
| D-121 | Dadar | 75% | Unknown | Yes | Blocked |

### Drain detail page

```text
┌──────────────────────────────────────────────┐
│ Drain D-102                                  │
│ Dadar                                        │
├──────────────────────────────────────────────┤
│ Design Capacity       80%                    │
│ Current Utilization   92%                    │
│ Blockage              No                     │
│ Current Status        OVERLOADED             │
│                                              │
│ Rainfall Contribution                         │
│ ████████████████                             │
│                                              │
│ Predicted Overflow: +45 min                  │
│                                              │
│ [View on Map] [Create Response Task]         │
└──────────────────────────────────────────────┘
```

The frontend must distinguish:

- Design capacity
- Current utilization
- Blockage
- Predicted overflow
- Actual waterlogging

These are different data points and must not be represented as one generic “drainage factor.”

---

# 7. Critical Hotspots

```text
┌─────────────────────────────────────────────────────────────────┐
│ CRITICAL HOTSPOTS                                               │
├──────────────┬────────┬──────────┬──────────────┬───────────────┤
│ Location     │ Risk   │ Rainfall │ Drain Status │ Prediction    │
├──────────────┼────────┼──────────┼──────────────┼───────────────┤
│ Dadar        │ 🔴 87  │ Heavy    │ Overloaded   │ < 1 hour      │
│ Parel        │ 🟠 71  │ Heavy    │ Near capacity│ 1–3 hours     │
│ Dharavi      │ 🔴 82  │ Heavy    │ Blocked      │ < 1 hour      │
└──────────────┴────────┴──────────┴──────────────┴───────────────┘
```

Clicking a hotspot opens its complete zone intelligence.

---

# 8. Zone Detail

```text
┌──────────────────────────────────────────────────────────────┐
│ ← Ward 12 — Dadar                                            │
├──────────────────────────────────────────────────────────────┤
│ CURRENT RISK: 🔴 HIGH                                        │
│ Risk Score: 78/100                                           │
│                                                              │
│ Rainfall             45 mm/hr                                │
│ Waterlogging         Reported                                │
│ Drainage             60% / overloaded                        │
│ Blocked Drains       2                                       │
│ Population           45,000                                  │
│                                                              │
│ PREDICTION                                                   │
│ Now        High                                               │
│ +1 hr      High                                               │
│ +3 hr      Moderate                                           │
│ +6 hr      Moderate                                           │
│                                                              │
│ CONTRIBUTING FACTORS                                         │
│ Rainfall       ████████████                                  │
│ Drainage       █████████                                     │
│ Elevation      ██████                                        │
│ Waterlogging   ███████                                       │
│                                                              │
│ [Broadcast Alert] [Deploy Resource] [View Reports]           │
└──────────────────────────────────────────────────────────────┘
```

---

# 9. Alert Center

## 9.1 Active Alerts

```text
┌──────────────────────────────────────────────────────────┐
│ ACTIVE ALERTS                                             │
├──────────────────────────────────────────────────────────┤
│ 🔴 CRITICAL                                              │
│ Dadar — Flood risk predicted within 1 hour              │
│ 10:30 AM | Unacknowledged                               │
│ [Open] [Broadcast]                                      │
├──────────────────────────────────────────────────────────┤
│ 🟠 HIGH                                                  │
│ Dharavi — Drain blockage + heavy rainfall               │
│ 10:15 AM | Acknowledged                                 │
└──────────────────────────────────────────────────────────┘
```

## 9.2 Alert Broadcast

```text
Target:
[✓] Ward 12
[✓] Ward 13
[ ] Ward 14

Severity:
[Critical] [High] [Moderate]

Message:
[________________________________________]

Channels:
[✓] App Push
[✓] SMS
[ ] Email

[Send Alert]
```

The system should also show:

- Alert delivery status
- Number of citizens reached
- Acknowledgement status
- Alert expiry
- Broadcast history

---

# 10. Citizen Reports

```text
┌──────────────────────────────────────────────────────────────┐
│ CITIZEN REPORTS                                              │
│                                                              │
│ New: 43     Verified: 28     Pending: 15     Rejected: 3    │
│                                                              │
│ [Map View] [List View]                                       │
├──────────────┬───────────┬───────────┬──────────┬────────────┤
│ Location     │ Type      │ Severity  │ Status   │ Time       │
├──────────────┼───────────┼───────────┼──────────┼────────────┤
│ Dadar        │ Waterlog  │ High      │ Verified │ 10:22 AM   │
│ Parel        │ Blocked   │ Moderate  │ Pending  │ 10:18 AM   │
└──────────────┴───────────┴───────────┴──────────┴────────────┘
```

Report detail:

- Photo
- Location
- Timestamp
- Report type
- Severity
- Description
- Verification status
- Relationship to model prediction

---

# 11. Resource & Response Center

```text
┌──────────────────────────────────────────────────────────────┐
│ RESPONSE RESOURCES                                           │
├───────────────────┬──────────┬───────────┬───────────────────┤
│ Resource          │ Total    │ Deployed  │ Available         │
├───────────────────┼──────────┼───────────┼───────────────────┤
│ Water Pumps       │ 12       │ 8         │ 4                 │
│ Response Teams    │ 7        │ 4         │ 3                 │
│ Emergency Vehicles│ 10       │ 6         │ 4                 │
│ Shelters          │ 15       │ 3 active  │ 12               │
└───────────────────┴──────────┴───────────┴───────────────────┘
```

Response workflow:

```text
Risk Detected
     ↓
Hotspot Identified
     ↓
Authority Alert
     ↓
Resource Assigned
     ↓
Dispatched
     ↓
Arrived
     ↓
Resolved
```

---

# 12. Analytics

## 12.1 Historical Risk

Charts:

- Risk over time
- Rainfall vs flood events
- Waterlogging frequency
- Drain overload frequency
- Alert frequency
- Citizen reports by area

## 12.2 Model Monitoring

Show:

- Prediction vs observed events
- False alerts
- Missed events
- Model update timestamp
- Data freshness
- Prediction confidence where available

This section is for system evaluation and should not be confused with the live operational dashboard.

---

# 13. Citizen Mobile Application

## 13.1 Home

```text
┌─────────────────┐
│ 📍 Your Location│
├─────────────────┤
│ 🌧 Rainfall     │
│ Heavy Rain      │
│                 │
│ 🔴 HIGH RISK    │
│ Flood risk      │
│ predicted soon  │
├─────────────────┤
│ [View Map]      │
│ [Safe Route]    │
│ [Report Flood]  │
├─────────────────┤
│ 🚨 Alerts (3)   │
└─────────────────┘
```

The citizen home screen should prioritize:

1. Current risk
2. Expected change
3. What the citizen should do
4. Nearby danger
5. Safe route/shelter
6. Reporting

---

# 14. Citizen Map

Layers:

- Current flood risk
- Predicted risk
- Rainfall
- Waterlogging
- Road closures
- Shelters

Interactions:

- Tap zone → risk details
- Tap shelter → directions
- Tap waterlogging report → report details
- Long press → report flooding

---

# 15. Citizen Risk Details

```text
┌─────────────────┐
│ ← Risk Details  │
├─────────────────┤
│ 🔴 HIGH RISK    │
│ 78 / 100        │
│                 │
│ Why?            │
│ Rainfall        │
│ Drainage        │
│ Waterlogging    │
│                 │
│ Prediction      │
│ Now: High       │
│ +1h: High       │
│ +3h: Moderate   │
│                 │
│ [Safe Route]    │
│ [Find Shelter]  │
└─────────────────┘
```

---

# 16. Citizen Alerts

Alert levels:

- Critical
- High
- Moderate
- Information

Every alert should contain:

- Area
- Time
- Reason
- Expected impact
- Recommended action
- Expiry/update time

---

# 17. Citizen Flood Report

```text
┌─────────────────┐
│ Report Flooding │
├─────────────────┤
│ [Take Photo]    │
│ [Gallery]       │
│                 │
│ Location        │
│ 📍 Auto detected│
│ [Change]        │
│                 │
│ Type            │
│ [Waterlogging]  │
│ [Blocked Drain] │
│ [Road Flooding] │
│                 │
│ Severity        │
│ [Low][Med][High]│
│                 │
│ Description     │
│ [_____________] │
│                 │
│ [Submit Report] │
└─────────────────┘
```

---

# 18. Shared Design System

## Risk levels

| Level | Meaning | Visual |
|---|---|---|
| Low | Normal conditions | Green + text/icon |
| Moderate | Increased monitoring | Yellow + text/icon |
| High | Significant flood risk | Orange + text/icon |
| Critical | Immediate danger | Red + text/icon |
| Unknown | Insufficient data | Neutral/gray |

Never rely only on color. Use:

- Label
- Icon
- Pattern where appropriate
- Numeric value when meaningful

---

# 19. Reusable Components

| Component | Purpose |
|---|---|
| RiskBadge | Risk level/score |
| RiskKpiCard | Dashboard KPI |
| RainfallCard | Rainfall information |
| DrainStatusCard | Drain condition |
| DrainTable | Drainage monitoring |
| FloodMap | Main map |
| MapLayerControl | Map layers |
| PredictionTimeline | Future risk |
| HotspotTable | Critical zones |
| AlertCard | Alerts |
| AlertComposer | Broadcast alerts |
| CitizenReportCard | Citizen reports |
| ResourceStatus | Resource monitoring |
| ResponseTimeline | Response lifecycle |
| DataFreshness | Timestamp/source health |
| EmptyState | Missing data |
| LoadingSkeleton | Loading state |
| ErrorState | API/data errors |

---

# 20. Important Frontend Rules

### Data integrity

The frontend must not invent values.

If data is unavailable:

```text
Drain capacity: Unknown
Prediction confidence: Not available
Water level: No data
```

Do not replace missing data with fake numbers.

### Timestamp

Every live data section should support:

```text
Updated 2 min ago
```

or:

```text
Last updated: 10:30 AM
```

### Data-source state

Use:

- Live
- Delayed
- Estimated
- Missing

This is especially important for a disaster-management system.

---

# 21. Responsive Behaviour

### Desktop

Authority dashboard:

- Full sidebar
- Large map
- Multiple analytical panels
- Tables and charts

### Tablet

- Collapsible sidebar
- Two-column cards
- Full map

### Mobile

Citizen app:

- Bottom navigation
- Single-column content
- Large risk status
- Large action buttons
- Minimal technical information

---

# 22. Performance Targets

| Metric | Target |
|---|---|
| Initial app load | < 3 sec |
| Map initial load | < 3 sec |
| API response | < 2 sec where backend permits |
| Risk refresh | < 5 sec where live data is available |
| Alert UI update | Near real-time |
| Mobile interaction | Smooth 60 FPS target |

These are frontend targets, not guarantees about external data-provider latency.

---

# 23. Final Dashboard Priority

The visual hierarchy should be:

```text
                 CITY RISK
                     ↓
               LIVE FLOOD MAP
                     ↓
          PREDICTION + HOTSPOTS
                     ↓
       DRAINAGE + BLOCKAGE STATUS
                     ↓
          ALERTS + CITIZEN REPORTS
                     ↓
             RESOURCE RESPONSE
                     ↓
                ANALYTICS
```

The key concept is:

**Observe → Predict → Identify → Alert → Respond → Verify**

This should be reflected throughout the UI.

---

## Document Version

Frontend Design Version 2.0
SIH Problem Statement: 26085
Focus: Urban Flood Nowcasting + Drainage Intelligence + Operational Response
