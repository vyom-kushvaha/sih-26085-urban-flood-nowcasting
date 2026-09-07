# FloodGuard AI — UI Generation Brief

## Objective

Create a polished, desktop-first React dashboard for **FloodGuard AI**, an urban flood nowcasting and drainage-intelligence system for Mumbai. The audience is municipal disaster-response officers. The interface must look like a credible emergency command centre: calm, clear, operational and data-transparent — never like a generic SaaS, crypto, or social-media product.

The first and primary screen is the **Mumbai Command Center dashboard**. Use React, TypeScript, Tailwind CSS, shadcn/ui, Lucide icons, Recharts, and React Leaflet where supported.

## Selected colour system

Use palette 4 as the visual foundation:

| Role | Colour | Hex | Usage |
|---|---:|---:|---|
| App background | White | `#F9F9F9` | Main page background |
| Primary brand / navigation | Blue | `#004E72` | Active navigation, primary buttons, links, map controls |
| Critical action / warning accent | Orange | `#FF6E42` | High-risk emphasis, urgent actions, warning icons |
| Header / sidebar / dark text | Navy Blue | `#092634` | Sidebar, header, prominent text, dark map overlays |

Add only these supporting semantic status colours. They are for flood-risk meaning, not brand decoration:

| State | Hex | Label |
|---|---:|---|
| Low risk | `#22C55E` | LOW |
| Moderate risk | `#EAB308` | MODERATE |
| High risk | `#FF6E42` | HIGH |
| Critical risk | `#DC2626` | CRITICAL |
| Unknown / missing | `#94A3B8` | NO DATA |

Implementation rules:

- Use `#092634` for the persistent left sidebar and key header areas; keep its text white or near-white.
- Use `#004E72` for primary actions, selected controls, and interactive map controls.
- Use `#FF6E42` only where urgency deserves attention: high-risk badges, critical calls to action, and current warnings. Do not use it as the default button colour.
- Use `#F9F9F9` as background and white cards with light cool-gray borders (`#E2E8F0`).
- Never communicate flood severity with colour alone; pair colour with a clear text label, icon, and numeric value where applicable.
- Avoid gradients, glassmorphism, neon effects and excessive shadows.

## Product identity

- Name: **FloodGuard AI**
- Descriptor: **Urban Flood Intelligence & Nowcasting**
- City: Mumbai, Maharashtra, India
- User role: Municipal Response Authority
- Tone: high-stakes but composed; decision-support, not panic-inducing.

## Required app shell

Create a fixed desktop sidebar and top header.

Sidebar:

- FloodGuard AI logo with a small shield/water icon.
- Subtitle: “Urban Flood Intelligence”.
- Navigation with icons: Dashboard, Live Map, Drainage, Hotspots, Alerts, Citizen Reports, Analytics, Settings.
- Active route: blue-tinted state plus a `#FF6E42` slim left indicator.
- Bottom status: green dot, “System operational”, then `v1.0.0`.

Top header:

- Page title: “Mumbai Command Center”.
- City selector set to Mumbai.
- Last updated: “Updated 2 min ago”.
- Compact source-health text: “Weather: Live · Drainage: Estimated”.
- Location search: “Search area, ward, landmark…”.
- Refresh button, notification bell with `3` badge, and “Municipal Admin” profile menu.

## Primary dashboard (`/dashboard`)

Build the following screen first. It must be visually complete, responsive, and demo-ready.

### 1. Executive KPI row

Create six compact KPI cards, each with icon, strong value, status/context text and subtle mini-trend:

1. City Risk Score — `78 / 100`, HIGH.
2. High / Critical Zones — `7`, “+2 since last hour”.
3. Current Rainfall — `45 mm/hr`, “Heavy rainfall”.
4. Overloaded Drains — `12`, “3 need immediate inspection”.
5. Blockage Scenario — `45%`, “Estimated network obstruction”.
6. Active Alerts — `14`, “5 awaiting acknowledgement”.

Cards should be clickable and visually suggest filtering or navigation.

### 2. Live Flood Intelligence Map

This is the primary focal point. Place it in the wide left/main column.

- Use React Leaflet centered at Mumbai: `19.0760, 72.8777`.
- Make the map large, professional and geographic rather than decorative.
- Render sample risk zones in low/moderate/high/critical colours.
- Render cyan/blue drainage lines, red blocked-drain markers, a selected-location marker near Dadar/BKC, and shelter markers.
- Add layer chips: Flood Risk, Rainfall, Drainage, Blocked Drains, Waterlogging, Shelters, Roads.
- Keep Flood Risk and Drainage enabled initially.
- Include zoom buttons, fullscreen control, clear map legend, and selected-location overlay.
- Selected popup content: `Dadar, Mumbai`, risk `78 / 100`, HIGH, rainfall `45 mm/hr`, estimated water depth `12.4 cm`, nearest drain `Mithi River · 160 m`, and button “Inspect risk details”.

### 3. Current Risk Assessment panel

Place in the right column:

- Title: “Current Risk Assessment”.
- Large risk gauge `78 / 100` and visible HIGH badge.
- Location: Dadar, Mumbai.
- “Estimated water accumulation: 12.4 cm”.
- “Calculated 2 min ago”.
- Explainable factors: heavy rainfall (45 mm/hr), partial drain blockage (45%), flat lowland terrain, nearest drain 160 m away.
- Data provenance rows:
  - Rainfall: LIVE · Open-Meteo API
  - Terrain: OBSERVED · Copernicus GLO-30 DEM 30m (Fallback: Default Urban Baseline)
  - Drainage: ESTIMATED · OSM proximity model
- Use an info tooltip and disclaimer: “Drainage capacity is estimated from OSM channel proximity and baseline hydrology; it is not official municipal telemetry.”

### 4. Blockage Scenario Simulator

Show below the map:

- Title: “Drainage Blockage Scenario Simulator”.
- Subtitle: “Model reduced drainage capacity at the selected location.”
- Slider from 0% to 100%, default 45%, with 0/25/50/75/100 checkpoints.
- Rainfall selector: 45 mm/hr.
- Duration selector: 1 hour, 3 hours, 6 hours.
- Primary CTA: “Run scenario”.
- Results: risk score, risk badge, estimated water depth, effective drainage capacity, and a compact risk-vs-blockage chart.
- Label results clearly as “MODELLED / ESTIMATED”.

### 5. Rainfall & Flood Nowcast

- Title: “Rainfall & Flood Nowcast”.
- Timeline cards: Now 45 mm/hr HIGH; +1 hour 45 mm/hr HIGH; +3 hours 38 mm/hr MODERATE; +6 hours 27 mm/hr MODERATE.
- Include a clean Recharts rainfall line chart.
- Footer: “3h and 6h values are heuristic nowcast estimates based on current weather conditions.”
- Do not invent confidence or probability metrics.

### 6. Priority Hotspots

Create a data table with “View all” action.

Columns: Priority, Location, Ward, Risk, Rainfall, Water depth, Drainage condition, Action.

Rows:

- Hindmata — Ward F/N — CRITICAL — 61 mm/hr — 24.1 cm — Critically clogged.
- Dharavi — Ward G/N — HIGH — 52 mm/hr — 16.8 cm — Severely clogged.
- Dadar — Ward F/N — HIGH — 45 mm/hr — 12.4 cm — Partially obstructed.
- Kurla — Ward L — MODERATE — 31 mm/hr — 6.2 cm — Near capacity.

Actions: “View on map” and “Create response task”.

### 7. Active alerts and response resources

Right-column cards:

- Active Alerts with count `14`, severity badges, ward, time, acknowledgement state, and a “Broadcast warning” CTA for critical alert.
- Field Response card: `8 / 12` pumps deployed, `6` field teams active, `14` shelters available, `4` emergency calls pending; button “Open response center”.

## Additional routes

Create working UI routes with consistent app shell:

- `/map`: full-screen interactive Mumbai map with layer controls, legend and detail drawer.
- `/drainage`: summary cards (Normal 43, Near Capacity 18, Overloaded 12, Blocked 7, Unknown 4); filters; drainage table; drain detail drawer; capacity disclaimer.
- `/hotspots`: ranked hotspot list plus map/list switch, filters, causes and recommended actions.
- `/alerts`: active/scheduled/history tabs and alert composer with target wards, severity, title, message, channel options, preview, confirmation modal.
- `/reports`: pending/verified/rejected citizen-report views, report cards, map/list switch, and verification detail drawer.
- `/analytics`: risk trend, rainfall vs estimated water depth, ward distribution, blockage comparison charts. Mark unavailable historical values as “Demo data / historical dataset required”.
- `/settings`: API URL, refresh interval, default city, map layers, notification options and theme preferences.
- `/citizen`: mobile-first public safety view with large risk card, map/report actions, short safety guidance, nearby shelter card and bottom navigation.

## Real FastAPI API contract

Prepare typed service functions and mock fallback adapters for these implemented routes:

- `POST /api/v1/risk/current`
- `POST /api/v1/risk/simulate`
- `GET /api/v1/elevation?lat={lat}&lon={lon}`
- `GET /api/v1/weather/current?lat={lat}&lon={lon}`
- `GET /api/v1/weather/forecast?lat={lat}&lon={lon}`

Use `VITE_API_BASE_URL=http://localhost:8000` in `.env.example`.

The risk API returns risk score, risk level, colour, water depth, rainfall/drainage/terrain metrics, nearest-drain information, contributing factors, data-quality labels and persistence status. The scenario endpoint returns results for 0%, 25%, 50%, 75% and 100% blockage. Weather responses explicitly include source, timestamp, cache state and `is_mock`.

## Data transparency — mandatory

- Never call OSM-estimated drainage capacity live telemetry.
- If weather `is_mock` is true, display “SIMULATED WEATHER FALLBACK” prominently.
- If data is unavailable, show a polished empty/error state with retry. Never replace missing values with unlabelled fake data.
- Admin alerts, citizen reports, shelters, ward-wide totals and resource availability do not yet have live backend endpoints. In the prototype, tag these as “Demo data” or “API integration pending”.
- Use labels: LIVE, ESTIMATED, SIMULATED, DELAYED and NO DATA.

## Reusable components

Create: `AppShell`, `Sidebar`, `Header`, `RiskBadge`, `StatusPill`, `DataFreshness`, `DataSourceTag`, `KpiCard`, `FloodMap`, `MapLayerControl`, `MapLegend`, `RiskAssessmentCard`, `RiskGauge`, `BlockageSimulator`, `NowcastTimeline`, `RainfallChart`, `HotspotTable`, `DrainageTable`, `AlertCard`, `AlertComposer`, `CitizenReportCard`, `ResourceStatusCard`, `LoadingSkeleton`, `EmptyState`, `ErrorState`, and `DisclaimerBanner`.

## UX and responsive requirements

- Desktop (>=1280px): full sidebar, two-column dashboard, map dominant.
- Tablet (768–1279px): collapsible sidebar, flexible columns.
- Mobile (<768px): navigation drawer, one-column content, simplified map controls, large touch targets.
- Include hover, focus, loading, disabled, empty and error states.
- Buttons must perform a visible prototype interaction—route, filter, drawer, modal, toast, or state update.
- Keep cards 12–16px rounded; use subtle, restrained shadows.
- Ensure all text and layout remain readable at 100% browser zoom.

## Final implementation request

Generate complete, runnable React + TypeScript + Tailwind code, not only a static design. Use a clean structure with `pages`, `components`, `services`, `types`, `data`, and `hooks`. Include realistic Mumbai mock data, typed API adapters, a concise README, and no unresolved imports or TypeScript errors.
