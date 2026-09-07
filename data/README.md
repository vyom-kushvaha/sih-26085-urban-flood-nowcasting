# Data Directory

Directory structure for raw, processed, and sample datasets used in urban flood nowcasting.

- `raw/`: Raw external datasets (Copernicus GLO-30 DEM 30m, rainfall, sensor data).
  - `raw/dem/`: 30m GeoTIFF rasters covering Mumbai (`N19_00_E072_00`, `N18_00_E072_00`). Run `python scripts/download_dem.py` to populate.
- `processed/`: Cleaned and transformed datasets ready for modeling (`mumbai_drainage.geojson`).
- `sample/`: Sample mock data for quick testing and demonstration.
- `historical_scenarios.json`: Authoritative Mumbai 2005 Deluge and 2017 Floods observation profiles.
