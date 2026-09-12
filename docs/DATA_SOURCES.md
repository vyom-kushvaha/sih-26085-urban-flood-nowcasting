# Data Sources Document

**R.A.K.S.H.A.K. — Real-time Assessment & Knowledge System for Hydrological Alerts**

# Urban Flood Nowcasting System — SIH26085

---

## 1. Real-Time Data Sources

### 1.1 Rainfall Data

| Source | URL | Data | Frequency | Cost | Status |
|--------|-----|------|-----------|------|--------|
| **OpenWeatherMap** | https://openweathermap.org/api | Current + forecast rain | 15 min | Free tier | ✅ Primary |
| **IMD Open Data** | https://mausam.imd.gov.in | Rainfall, radar | 1 hour | Free | ✅ Secondary |
| **RainViewer** | https://www.rainviewer.com/api.html | Radar imagery | 15 min | Free | ✅ Backup |
| **WeatherAPI** | https://www.weatherapi.com | Current + forecast | 15 min | Free tier | ✅ Backup |

#### OpenWeatherMap Setup
```
1. Go to: https://openweathermap.org/api
2. Sign up for free account
3. Get API key
4. Free tier: 60 calls/min, 1M calls/month
5. Endpoint: /data/2.5/weather?lat={lat}&lon={lon}&appid={key}
```

#### IMD Setup
```
1. Go to: https://mausam.imd.gov.in
2. Check for API access (may require registration)
3. Alternative: Scrape rainfall data from website
```

---

### 1.2 Weather Forecast

| Source | URL | Forecast Range | Resolution |
|--------|-----|---------------|------------|
| OpenWeatherMap | /data/2.5/forecast | 5 days | 3 hours |
| IMD GFS | https://www.imd.gov.in | 7 days | 3 hours |

---

## 2. Static Data Sources

### 2.1 Digital Elevation Model (DEM)

| Source | URL | Resolution | Coverage | Cost | Status |
|--------|-----|-----------|----------|------|--------|
| **SRTM (NASA)** | https://earthexplorer.usgs.gov | 30m | Global | Free | ✅ Primary |
| **ASTER (Japan)** | https://gdex.cr.usgs.gov | 30m | Global | Free | ✅ Backup |
| **Bhuvan (ISRO)** | https://bhuvan.nrsc.gov.in | 30m | India | Free | ✅ India-specific |
| **ALOS (Japan)** | https://www.eorc.jaxa.jp | 12.5m | Global | Free | ⚠️ High-res |

#### SRTM Download Steps
```
1. Go to: https://earthexplorer.usgs.gov
2. Sign in (free account)
3. Search: "Mumbai, India"
4. Dataset: "SRTM 1 Arc-Second Global"
5. Download: GeoTIFF format
6. File: srtm_mumbai.tif
```

#### Bhuvan Download Steps
```
1. Go to: https://bhuvan.nrsc.gov.in
2. Navigate to "Data Download"
3. Select: Cartosat-1 DEM or SRTM
4. Draw bounding box around Mumbai
5. Download GeoTIFF
```

---

### 2.2 Drainage Network

| Source | URL | Data | Cost | Status |
|--------|-----|------|------|--------|
| **OpenStreetMap** | https://openstreetmap.org | Rivers, drains, canals | Free | ✅ Primary |
| **Bhuvan** | https://bhuvan.nrsc.gov.in | Water bodies | Free | ✅ India-specific |
| **BMC (Mumbai)** | https://gis.mumbai.gov.in | Detailed drainage | Request | ⚠️ If accessible |

#### OSM Overpass API Query
```
https://overpass-api.de/api/interpreter?data=
[out:json];
area[name="Mumbai"]->.searchArea;
(
  way["waterway"~"river|stream|drain|canal"](area.searchArea);
  relation["waterway"](area.searchArea);
);
out body;
>;
out skel qt;
```

#### Overpass Turbo (Visual)
```
1. Go to: https://overpass-turbo.eu/
2. Search: "Mumbai"
3. Query: waterway=river/drain/canal
4. Export: GeoJSON
```

---

### 2.3 Administrative Boundaries

| Source | URL | Data | Cost | Status |
|--------|-----|------|------|--------|
| **GADM** | https://gadm.org | Country/state/district boundaries | Free | ✅ Primary |
| **Bhuvan** | https://bhuvan.nrsc.gov.in | Indian boundaries | Free | ✅ India-specific |
| **OSM** | https://openstreetmap.org | City/ward boundaries | Free | ✅ Backup |

---

### 2.4 Historical Flood Data

| Source | URL | Data | Cost | Status |
|--------|-----|------|------|--------|
| **News Archives** | Google News, Times of India | Flood events, dates, locations | Free | ✅ Primary |
| **Research Papers** | Google Scholar, ResearchGate | Academic studies | Free | ✅ Validation |
| **NDEM / NDMA** | https://ndma.gov.in | Official disaster reports | Free | ⚠️ Limited data |
| **Mumbai Flood Reports** | BMC, MCGM | Municipal flood records | Request | ⚠️ If accessible |

#### Mumbai Historical Floods

| Date | Event | Areas Affected | Rainfall |
|------|-------|---------------|----------|
| 26 July 2005 | Cloudburst | Entire Mumbai | 944mm in 24h |
| 29 Aug 2017 | Heavy rains | Mumbai, Thane | 300mm+ |
| 1 July 2019 | Monsoon floods | Mumbai, Pune | 200mm+ |
| 20 June 2021 | Urban flooding | Mumbai | 150mm+ |
| 5 July 2022 | Waterlogging | Mumbai | 100mm+ |

---

### 2.5 Land Use / Soil Type

| Source | URL | Data | Cost | Status |
|--------|-----|------|------|--------|
| **Bhuvan** | https://bhuvan.nrsc.gov.in | Land use, soil | Free | ✅ India-specific |
| **ESA WorldCover** | https://worldcover.esa.int | Global land cover | Free | ✅ Global |
| **USGS Land Cover** | https://www.usgs.gov | Land cover | Free | ✅ Backup |

---

## 3. Mumbai-Specific Data

### 3.1 Mumbai Wards

Mumbai has 24 administrative wards (A to T):

| Ward | Name | Known Flood Spots |
|------|------|-------------------|
| A | Colaba, Fort | Low-lying, coastal |
| B | Sandhurst Rd | Drainage issues |
| C | Marine Lines | Coastal flooding |
| D | Grant Rd | Moderate |
| E | Byculla | Frequent flooding |
| F/S | Parel | Frequent flooding |
| F/N | Dadar | Hindmata circle |
| G/S | Elphinstone | Moderate |
| G/N | Worli | Coastal |
| H/E | Khar | Moderate |
| H/W | Bandra | Moderate |
| K/E | Andheri E | Andheri subway |
| K/W | Andheri W | Moderate |
| P/S | Goregaon | Moderate |
| P/N | Malad | Moderate |
| R/S | Kandivali | Moderate |
| R/C | Dahisar | Low |
| R/N | Borivali | Low |
| S | Bhandup | Moderate |
| T | Mulund | Low |
| L | Kurla | Frequent flooding |
| M/E | Chembur | Moderate |
| M/W | Dadar-Mahim | Frequent |
| N | Dharavi | Very frequent |

### 3.2 Mumbai Flood Hotspots

| Location | Coordinates | Elevation | Why Prone |
|----------|-------------|-----------|-----------|
| Hindmata Circle, Dadar | 19.0176, 72.8421 | 8m | Low-lying, poor drainage |
| Dharavi | 19.0402, 72.8509 | 5m | Very low, dense |
| Andheri Subway | 19.1197, 72.8464 | 3m | Underpass, no outlet |
| Byculla | 18.9750, 72.8328 | 4m | Low-lying |
| Parel | 19.0085, 72.8382 | 6m | Poor drainage |
| Kurla | 19.0652, 72.8793 | 5m | Low-lying |
| King's Circle | 19.0269, 72.8536 | 7m | Drainage choke |
| Milan Subway | 19.0896, 72.8402 | 4m | Underpass |

---

## 4. Data Processing Tools

### 4.1 GDAL (Geospatial Data Abstraction Library)

```bash
# Install
sudo apt-get install gdal-bin python3-gdal

# Convert DEM format
gdal_translate -of GTiff input.asc output.tif

# Clip DEM to Mumbai boundary
gdalwarp -cutline mumbai_boundary.shp -crop_to_cutline input.tif output.tif

# Get elevation at point
gdallocationinfo -geoloc mumbai_dem.tif 72.8777 19.0760
```

### 4.2 Python Libraries

```python
# Rasterio - Read DEM
import rasterio
from rasterio.sample import sample_gen

with rasterio.open('mumbai_dem.tif') as src:
    elevation = list(src.sample([(72.8777, 19.0760)]))[0][0]
    print(f"Elevation: {elevation}m")

# GeoPandas - Process boundaries
import geopandas as gpd

wards = gpd.read_file('mumbai_wards.geojson')
print(wards[['name', 'population']])

# Shapely - Geometry operations
from shapely.geometry import Point

point = Point(72.8777, 19.0760)
ward = wards[wards.contains(point)]
print(ward['name'])
```

### 4.3 QGIS (Visual Tool)

```
1. Download QGIS: https://qgis.org
2. Load DEM layer
3. Load drainage layer
4. Load ward boundaries
5. Visualize flood risk
6. Export for web
```

---

## 5. Data Storage Plan

### 5.1 File Storage (S3 / Local)

| File | Size | Format | Purpose |
|------|------|--------|---------|
| mumbai_dem.tif | ~50MB | GeoTIFF | Elevation data |
| mumbai_wards.geojson | ~5MB | GeoJSON | Ward boundaries |
| mumbai_drainage.geojson | ~10MB | GeoJSON | Drainage network |
| flood_zones.geojson | ~2MB | GeoJSON | Historical flood areas |

### 5.2 Database Storage

| Table | Records | Size | Update Frequency |
|-------|---------|------|-----------------|
| elevation_grid | ~1M | ~100MB | Static |
| weather_data | ~100K/day | ~10MB/day | Every 15 min |
| risk_calculations | ~50K/day | ~5MB/day | Every 15 min |
| alerts | ~1K/day | ~1MB/day | On demand |
| citizen_reports | ~500/day | ~50MB/day (with photos) | On demand |

---

## 6. Data Quality Checks

### 6.1 Validation Rules

| Data | Validation | Action if Invalid |
|------|-----------|-------------------|
| Rainfall | 0-500 mm/hr | Clamp to range |
| Elevation | -10 to 1000m | Flag for review |
| Risk Score | 0-100 | Clamp to range |
| Coordinates | Valid lat/lon | Reject request |
| Timestamps | Not in future | Use current time |

### 6.2 Missing Data Handling

| Scenario | Fallback |
|----------|----------|
| Weather API down | Use cached data (max 1 hour old) |
| DEM missing for area | Use nearest neighbor interpolation |
| Drainage data missing | Use OSM data + default capacity |
| Historical data missing | Use physics model only (no ML) |

---

*Data Sources Version 1.0 | SIH 2026*
