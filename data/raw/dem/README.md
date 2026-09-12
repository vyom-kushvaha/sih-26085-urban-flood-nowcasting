# Digital Elevation Model (DEM) Directory

**R.A.K.S.H.A.K. — Real-time Assessment & Knowledge System for Hydrological Alerts**


This directory houses 30m Digital Elevation Model (DEM) GeoTIFF tiles covering the Mumbai Metropolitan Region for the R.A.K.S.H.A.K. Urban Flood Nowcasting System (SIH26085).

## Authoritative Dataset Specifications

- **Dataset**: Copernicus DEM GLO-30 (Global 30m Digital Surface Model)
- **Spatial Resolution**: 1.0 arc-second (~30 meters at equator / ~28m at Mumbai latitude)
- **Horizontal Datum / CRS**: WGS 84 (EPSG:4326 Geographic 2D Coordinates)
- **Vertical Datum**: EGM2008 Geoid (Elevation in meters above Mean Sea Level)
- **Format**: Cloud-Optimized GeoTIFF (COG), 32-bit Floating Point (`Float32`)
- **Distribution**: Public Open Access via European Space Agency (ESA) & AWS Open Data (`s3://copernicus-dem-30m`)

## Required Coverage Tiles for Mumbai

The Mumbai Metropolitan Region (18.88°N to 19.32°N, 72.75°E to 73.02°E) is covered by two tiles:

| Tile Key | Filename | Spatial Bounding Box | Area Covered |
| :--- | :--- | :--- | :--- |
| **N19_00_E072_00** | `Copernicus_DSM_COG_10_N19_00_E072_00_DEM.tif` | 19.0°N–20.0°N, 72.0°E–73.0°E | Central/North Mumbai, Dadar, Kurla, BKC, Andheri, Sanjay Gandhi National Park, Thane, Navi Mumbai |
| **N18_00_E072_00** | `Copernicus_DSM_COG_10_N18_00_E072_00_DEM.tif` | 18.0°N–19.0°N, 72.0°E–73.0°E | South Mumbai, Byculla, CSMT, Marine Drive, Colaba, Harbour |

## How to Download

Run the automated ingestion script:

```bash
python scripts/download_dem.py
```

This will automatically fetch both verified tiles directly from AWS Open Data into this directory.

## Git & Repository Policy

To keep the git repository lightweight and fast to clone, raw GeoTIFF tiles (`*.tif`) are ignored in `.gitignore`:
```
data/raw/dem/*.tif
```
Do **not** commit large `.tif` binaries to git. The system operates gracefully with transparent fallback when rasters are not present, and switches automatically to real DEM terrain processing once downloaded.
