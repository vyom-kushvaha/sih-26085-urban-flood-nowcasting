# Frontend Design Document
# Urban Flood Nowcasting System — SIH26085

---

## 1. Design Philosophy

### Principles
- **Simplicity First:** Citizen ko 3 second mein samajhna chahiye
- **Visual Hierarchy:** Risk level sabse prominent
- **Accessibility:** Color-blind friendly, font size 16px+
- **Performance:** <3 second load time
- **Offline Ready:** Basic info cached

### Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| **Safe Green** | `#22C55E` | Low risk, safe routes |
| **Warning Yellow** | `#EAB308` | Moderate risk |
| **Danger Orange** | `#F97316` | High risk |
| **Critical Red** | `#EF4444` | Critical risk, alerts |
| **Primary Blue** | `#3B82F6` | Brand color, buttons |
| **Dark Navy** | `#1E293B` | Headers, text |
| **Light Gray** | `#F1F5F9` | Backgrounds |
| **White** | `#FFFFFF` | Cards, surfaces |

---

## 2. Citizen Mobile App

### 2.1 App Flow

```
[Splash Screen] -> [Location Permission] -> [Home Screen]
                                              |
                    ┌---------------------------┼---------------------------┐
                    |                           |                           |
              [Map View]                  [Alerts]                  [Report]
                    |                           |                           |
              [Risk Details]              [Alert History]           [Camera]
                    |                                                   |
              [Safe Route]                                        [Submit]
                    |
              [Navigation]
```

### 2.2 Screen Designs

#### Screen 1: Splash Screen

```
┌─────────────────┐
│                 │
│                 │
│    🌊🛡️        │
│                 │
│   FloodGuard    │
│      AI         │
│                 │
│  Urban Flood    │
│  Nowcasting     │
│                 │
│                 │
│    [Get Started]│
│                 │
└─────────────────┘
```

**Elements:**
- Logo: Wave + Shield icon
- Tagline: "Urban Flood Nowcasting"
- CTA Button: "Get Started" (Primary Blue)
- Background: Gradient (Light Blue to White)

---

#### Screen 2: Location Permission

```
┌─────────────────┐
│                 │
│    📍           │
│                 │
│  Enable Location│
│                 │
│  We need your   │
│  location to    │
│  provide        │
│  accurate flood │
│  risk alerts    │
│                 │
│  [Allow Location]│
│  [Enter Manually]│
│                 │
└─────────────────┘
```

**Elements:**
- Icon: Large location pin
- Title: "Enable Location"
- Description: Clear, friendly text
- Primary CTA: "Allow Location"
- Secondary CTA: "Enter Manually" (for privacy-conscious users)

---

#### Screen 3: Home Screen (Main)

```
┌─────────────────┐
│ 📍 Dadar, Mumbai│  ← Location bar
├─────────────────┤
│                 │
│  🌧️ 45 mm/hr   │  ← Rainfall card
│  Heavy Rain     │
│                 │
├─────────────────┤
│                 │
│   🔴            │
│  HIGH RISK      │  ← Risk score (BIG)
│                 │
│  Flood likely   │
│  in 2 hours     │
│                 │
├─────────────────┤
│                 │
│  [View Map]     │  ← CTA buttons
│  [Safe Routes]  │
│  [Report]       │
│                 │
├─────────────────┤
│  📢 Alerts (3)  │  ← Alert summary
│                 │
└─────────────────┘
```

**Elements:**
- **Location Bar:** Tap to change, shows current area
- **Rainfall Card:** Current intensity + description
- **Risk Score:** Largest element, color-coded circle
  - Green: 0-30 (Low)
  - Yellow: 31-50 (Moderate)
  - Orange: 51-75 (High)
  - Red: 76-100 (Critical)
- **Action Buttons:** 3 primary actions
- **Alert Summary:** Badge with unread count

---

#### Screen 4: Map View

```
┌─────────────────┐
│ ← Map           │  ← Back button
├─────────────────┤
│                 │
│    [MAP]        │
│                 │
│  🟢  🟡  🔴     │  ← Risk zones
│                 │
│      📍         │  ← User location
│                 │
│  🟡 500m N      │
│  🔴 1km S       │  ← Nearby risks
│                 │
├─────────────────┤
│  Legend:        │
│  🟢 Safe 🟡 Mod │
│  🔴 High ⚫ Flood│
└─────────────────┘
```

**Map Features:**
- **Base Map:** OpenStreetMap / Mapbox
- **Risk Zones:** Color-coded polygons
- **User Location:** Pulsing blue dot
- **Rainfall Overlay:** Semi-transparent blue circles
- **Shelters:** Green house icons
- **Zoom:** Pinch to zoom, +/- buttons
- **Pan:** Drag to explore

**Interactions:**
- Tap on risk zone → Details popup
- Tap on shelter → Directions
- Long press → Report flooding

---

#### Screen 5: Risk Details

```
┌─────────────────┐
│ ← Risk Details  │
├─────────────────┤
│                 │
│   🔴 78/100     │
│  HIGH RISK      │
│                 │
├─────────────────┤
│  Why this risk? │
│                 │
│  🌧️ Rainfall    │
│     45 mm/hr    │
│     [=======]   │
│                 │
│  📊 Elevation     │
│     12 meters   │
│     [===    ]   │
│                 │
│  🏗️ Drainage    │
│     60% capacity│
│     [====  ]    │
│                 │
│  📈 Prediction  │
│     1hr: 🔴 High│
│     3hr: 🟡 Mod │
│     6hr: 🟢 Low │
│                 │
├─────────────────┤
│  [Find Shelter] │
│  [Safe Route]   │
└─────────────────┘
```

**Elements:**
- Risk score with breakdown
- Factor bars (visual representation)
- Timeline prediction
- Action buttons

---

#### Screen 6: Alert Screen

```
┌─────────────────┐
│ ← Alerts        │
├─────────────────┤
│                 │
│  🚨 CRITICAL    │
│  10:30 AM       │
│  Flood warning  │
│  for Dadar area │
│  Move to shelter│
│  immediately    │
│                 │
├─────────────────┤
│  ⚠️ HIGH        │
│  9:15 AM        │
│  Heavy rainfall │
│  expected       │
│                 │
├─────────────────┤
│  ℹ️ INFO        │
│  8:00 AM        │
│  Stay alert     │
│                 │
└─────────────────┘
```

**Elements:**
- Alert cards with severity colors
- Timestamp
- Expandable details
- Swipe to dismiss

---

#### Screen 7: Report Flooding

```
┌─────────────────┐
│ ← Report        │
├─────────────────┤
│                 │
│  [📷 Take Photo]│
│  or             │
│  [📁 Gallery]   │
│                 │
├─────────────────┤
│  Location:      │
│  📍 Auto-detected│
│  [Change]       │
│                 │
├─────────────────┤
│  Severity:      │
│  [Low] [Mod] [High]│
│                 │
├─────────────────┤
│  Description:   │
│  [__________]   │
│                 │
├─────────────────┤
│  [Submit Report]│
│                 │
└─────────────────┘
```

**Elements:**
- Photo capture/gallery
- Location (auto + manual override)
- Severity selector
- Description text area
- Submit button

---

### 2.3 Navigation Bar

```
┌─────────────────┐
│                 │
│    [Content]    │
│                 │
├─────────────────┤
│ 🏠   🗺️   🚨   📤  │
│Home  Map  Alert Report│
└─────────────────┘
```

- **Home:** Risk score + summary
- **Map:** Interactive risk map
- **Alerts:** Notification center
- **Report:** Crowdsourcing

---

## 3. Admin Dashboard (Web)

### 3.1 Dashboard Layout

```
┌─────────────────────────────────────────────────────────────┐
│  🌊 FloodGuard AI    Mumbai    Admin    [Logout]           │
├────────────┬──────────────────────────────────────────────┤
│            │                                              │
│  NAVIGATION│              MAIN CONTENT                    │
│            │                                              │
│  Dashboard │  ┌──────────────────────────────────────┐   │
│  Map View  │  │      CITY RISK OVERVIEW              │   │
│  Wards     │  │                                      │   │
│  Alerts    │  │   🟢 12  🟡 8   🔴 5   ⚫ 2        │   │
│  Reports   │  │   Safe   Mod   High  Critical       │   │
│  Resources │  │                                      │   │
│  Analytics │  └──────────────────────────────────────┘   │
│  Settings  │                                              │
│            │  ┌──────────────────┬──────────────────┐   │
│            │  │   [RISK MAP]     │  [PREDICTION]    │   │
│            │  │                  │                  │   │
│            │  │   🟢🟡🔴⚫      │  1hr: 🔴 High    │   │
│            │  │   Color-coded    │  3hr: 🟡 Mod     │   │
│            │  │   ward map       │  6hr: 🟢 Low     │   │
│            │  │                  │                  │   │
│            │  └──────────────────┴──────────────────┘   │
│            │                                              │
│            │  ┌──────────────────────────────────────┐   │
│            │  │      RECENT ALERTS                   │   │
│            │  │  🚨 Critical - Dadar (10:30 AM)     │   │
│            │  │  ⚠️ High - Dharavi (9:15 AM)        │   │
│            │  └──────────────────────────────────────┘   │
│            │                                              │
└────────────┴──────────────────────────────────────────────┘
```

### 3.2 Key Screens

#### Dashboard Home
- **KPI Cards:** Total wards, active alerts, citizens reached
- **Risk Map:** Interactive, clickable wards
- **Prediction Timeline:** 1hr/3hr/6hr toggle
- **Recent Alerts:** Scrollable list

#### Ward Detail (Click on ward)
```
┌─────────────────────────────────────────┐
│  ← Ward 12 - Dadar                     │
├─────────────────────────────────────────┤
│                                         │
│  Risk Score: 🔴 78/100 (HIGH)          │
│                                         │
│  ┌─────────────┐  ┌─────────────┐     │
│  │  Rainfall   │  │  Elevation  │     │
│  │   45 mm/hr  │  │   12 meters │     │
│  └─────────────┘  └─────────────┘     │
│                                         │
│  ┌─────────────┐  ┌─────────────┐     │
│  │  Drainage   │  │  Population │     │
│  │   60% cap   │  │   45,000    │     │
│  └─────────────┘  └─────────────┘     │
│                                         │
│  [Send Alert]  [Deploy Resources]      │
│                                         │
└─────────────────────────────────────────┘
```

#### Alert Broadcast
```
┌─────────────────────────────────────────┐
│  ← Broadcast Alert                     │
├─────────────────────────────────────────┤
│                                         │
│  Target:                               │
│  [✓] Ward 12 - Dadar                  │
│  [✓] Ward 13 - Parel                  │
│  [ ] Ward 14 - Byculla                │
│                                         │
│  Severity: [Critical] [High] [Moderate]│
│                                         │
│  Message:                              │
│  [Flood warning: Move to              │
│   nearest shelter immediately]        │
│                                         │
│  Channels:                             │
│  [✓] App Push  [✓] SMS  [ ] Email    │
│                                         │
│  [Send Alert]                          │
│                                         │
└─────────────────────────────────────────┘
```

---

## 4. Component Library

### 4.1 Reusable Components

| Component | Usage | Props |
|-----------|-------|-------|
| **RiskBadge** | Risk score display | score, size, showLabel |
| **RainfallCard** | Rainfall info | amount, intensity, trend |
| **AlertCard** | Alert notification | severity, message, timestamp |
| **MapView** | Interactive map | center, zoom, overlays |
| **WardCard** | Ward summary | name, risk, population |
| **ResourceStatus** | Resource panel | type, available, deployed |
| **TimelineChart** | Prediction graph | data, timeRange |

### 4.2 Responsive Breakpoints

| Breakpoint | Width | Target |
|------------|-------|--------|
| Mobile | < 480px | Citizen app |
| Tablet | 480-768px | Admin tablet view |
| Desktop | > 768px | Admin dashboard |

---

## 5. Animation & Interactions

### 5.1 Micro-interactions

| Interaction | Animation | Duration |
|-------------|-----------|----------|
| Risk score change | Color transition + pulse | 500ms |
| Alert arrival | Slide down + vibrate | 300ms |
| Map zoom | Smooth zoom | 200ms |
| Button press | Scale 0.95 | 100ms |
| Loading | Skeleton shimmer | Infinite |

### 5.2 Map Interactions

- **Zoom:** Pinch (mobile), scroll (desktop)
- **Pan:** Drag
- **Tap marker:** Info popup
- **Long press:** Context menu (report)
- **Layer toggle:** Rainfall on/off, risk zones on/off

---

## 6. Accessibility

### 6.1 Color Blind Support

| Risk | Color | Pattern |
|------|-------|---------|
| Low | Green | Solid circle |
| Moderate | Yellow | Striped circle |
| High | Orange | Dotted circle |
| Critical | Red | Crossed circle |

### 6.2 Screen Reader Support

- All icons have aria-labels
- Risk scores read as "High risk, 78 out of 100"
- Map regions described with coordinates

---

## 7. Performance Targets

| Metric | Target |
|--------|--------|
| App launch | < 3 seconds |
| Map load | < 3 seconds |
| API response | < 2 seconds |
| Risk update | < 5 seconds |
| Alert delivery | < 1 minute |

---

*Frontend Design Version 1.0 | SIH 2026*
