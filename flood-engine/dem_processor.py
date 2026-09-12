"""
DEM Elevation & Slope Processing Module
Author: Vyom (Lead Architect & Flood Engine Lead)
Project: Urban Flood Nowcasting System (SIH26085)

This module handles:
1. Loading 30m GeoTIFF DEM tiles (Copernicus GLO-30 / CartoDEM) from data/raw/dem/
2. GeoTIFF metadata parsing & CRS inspection (EPSG:4326 WGS84 Geographic)
3. Spatial coordinate mapping (Lat/Lon -> Pixel Row/Col) with safe bounds checks
4. Real terrain elevation extraction (meters above Mean Sea Level)
5. Metric slope calculation (% and degrees) using local finite difference gradients
6. Transparent fallback & data provenance tracking (REAL_DEM vs FALLBACK)
7. In-memory raster caching across API requests
"""

import os
import math
import glob
from typing import Dict, Tuple, Optional, List, Any
import numpy as np
from PIL import Image

# 1 Arc-second in meters at equator (~30.87m)
METERS_PER_DEGREE_LAT = 111320.0

# Transparent Urban Baseline Fallback Values (Used strictly when DEM is unavailable)
DEFAULT_FALLBACK_ELEVATION_M = 15.0
DEFAULT_FALLBACK_SLOPE_DEG = 1.0
DEFAULT_FALLBACK_SLOPE_PCT = 1.75


class DEMTile:
    """Represents a single parsed 30m GeoTIFF DEM tile."""

    def __init__(self, filepath: str):
        self.filepath = os.path.abspath(filepath)
        self.filename = os.path.basename(filepath)

        # Check for Git LFS pointer files (e.g. 133-byte text files)
        file_size = os.path.getsize(self.filepath)
        if file_size < 10000:
            raise ValueError(
                f"File {self.filename} is only {file_size} bytes (likely an unresolved Git LFS pointer). "
                f"Run 'python scripts/download_dem.py' to download real GeoTIFF rasters."
            )

        # Load GeoTIFF raster using PIL
        try:
            img = Image.open(self.filepath)
        except Exception as e:
            raise ValueError(f"Failed to open GeoTIFF {self.filename} with PIL: {e}")

        self.width, self.height = img.size
        # Read as float32 array
        self.elevation_grid = np.array(img, dtype=np.float32)

        # Parse GeoTIFF Metadata Tags
        # Tag 33550: ModelPixelScaleTag (scale_x, scale_y, scale_z)
        # Tag 33922: ModelTiepointTag (I, J, K, X, Y, Z)
        # Tag 34735: GeoKeyDirectoryTag (CRS metadata)
        # Tag 34737: GeoAsciiParamsTag (Datum/CRS string)
        # Tag 42113: GDAL_NODATA
        tags = getattr(img, "tag_v2", {})
        if not tags and hasattr(img, "tag"):
            tags = img.tag

        scale = tags.get(33550, (0.0002777777777777778, 0.0002777777777777778, 0.0))
        tiepoint = tags.get(33922, (0.0, 0.0, 0.0, 72.0, 19.0, 0.0))

        self.pixel_scale_x = float(scale[0])
        self.pixel_scale_y = float(scale[1])

        # ModelTiepoint: tiepoint[3] is min_lon (or top-left X), tiepoint[4] is max_lat (or top-left Y)
        self.min_lon = float(tiepoint[3])
        self.max_lat = float(tiepoint[4])

        self.max_lon = self.min_lon + (self.width * self.pixel_scale_x)
        self.min_lat = self.max_lat - (self.height * self.pixel_scale_y)

        # Determine CRS / Spatial Reference
        self.crs = self._determine_crs(tags)

        # Detect NoData value if defined
        nodata_tag = tags.get(42113, None)
        self.nodata_value: Optional[float] = None
        if nodata_tag:
            try:
                self.nodata_value = float(str(nodata_tag).strip("\x00 \t\n\r"))
            except (ValueError, TypeError):
                pass

        # Cached slope grid (computed lazily only if full raster slope is explicitly requested)
        self._slope_grid: Optional[np.ndarray] = None
        self._slope_percent_grid: Optional[np.ndarray] = None

    def _determine_crs(self, tags: Any) -> str:
        """Inspect GeoTIFF tags to identify coordinate reference system."""
        # Check GeoKeyDirectoryTag (Tag 34735)
        geokeys = tags.get(34735, None)
        if geokeys and len(geokeys) >= 4:
            for i in range(4, len(geokeys) - 3, 4):
                key_id = geokeys[i]
                val_offset = geokeys[i + 3]
                if key_id == 2048:  # GeographicTypeGeoKey
                    return f"EPSG:{val_offset} (Geographic 2D WGS 84)"
                elif key_id == 3072:  # ProjectedCSTypeGeoKey
                    return f"EPSG:{val_offset} (Projected)"

        # Check GeoAsciiParamsTag (Tag 34737)
        ascii_params = tags.get(34737, "")
        if "WGS" in str(ascii_params) or "4326" in str(ascii_params):
            return "EPSG:4326 (WGS 84)"

        # Fallback inspection based on coordinate ranges
        if -180.0 <= self.min_lon <= 180.0 and -90.0 <= self.min_lat <= 90.0:
            return "EPSG:4326 (WGS 84 Geographic)"
        return "Unknown / Projected CRS"

    def contains(self, lat: float, lon: float) -> bool:
        """Check if a coordinate falls strictly within this DEM tile's geographic extent."""
        return (self.min_lat <= lat <= self.max_lat) and (self.min_lon <= lon <= self.max_lon)

    def latlon_to_pixel(self, lat: float, lon: float) -> Tuple[int, int]:
        """Convert Latitude and Longitude to pixel (row, col) indices."""
        col = int((lon - self.min_lon) / self.pixel_scale_x)
        row = int((self.max_lat - lat) / self.pixel_scale_y)

        # Clamp safely to raster boundaries
        col = max(0, min(col, self.width - 1))
        row = max(0, min(row, self.height - 1))
        return row, col

    def is_nodata(self, value: float) -> bool:
        """Check if elevation value represents void/nodata."""
        if np.isnan(value) or np.isinf(value):
            return True
        if self.nodata_value is not None and abs(value - self.nodata_value) < 1e-3:
            return True
        # Typical DEM void values (e.g. -32767, -9999, > 30000)
        if value <= -9000.0 or value > 30000.0:
            return True
        return False

    def get_elevation(self, lat: float, lon: float) -> Optional[float]:
        """
        Get elevation in meters for a given coordinate.
        Returns None if coordinate is nodata or ocean void.
        """
        row, col = self.latlon_to_pixel(lat, lon)
        raw_val = float(self.elevation_grid[row, col])

        if self.is_nodata(raw_val):
            return None

        return raw_val

    def get_slope_at_point(self, lat: float, lon: float) -> Tuple[float, float]:
        """
        Compute terrain slope (% and degrees) locally at (lat, lon) using
        a 3x3 finite-difference window.

        Geodesic metric formulas:
            dx = pixel_scale_x * 111320 * cos(lat)
            dy = pixel_scale_y * 111320
            dz_dx = (z[r, c+1] - z[r, c-1]) / (2 * dx)
            dz_dy = (z[r-1, c] - z[r+1, c]) / (2 * dy)
            slope_tan = sqrt(dz_dx^2 + dz_dy^2)
            slope_deg = arctan(slope_tan) * (180 / pi)
            slope_percent = slope_tan * 100
        """
        row, col = self.latlon_to_pixel(lat, lon)

        # Determine metric cell size adjusted for latitude
        dy = self.pixel_scale_y * METERS_PER_DEGREE_LAT
        dx = self.pixel_scale_x * METERS_PER_DEGREE_LAT * math.cos(math.radians(lat))
        dx = max(dx, 1.0)  # Safeguard against zero division at poles

        # Neighbor coordinates with boundary clamping
        r_north = max(0, row - 1)
        r_south = min(self.height - 1, row + 1)
        c_west = max(0, col - 1)
        c_east = min(self.width - 1, col + 1)

        z_north = float(self.elevation_grid[r_north, col])
        z_south = float(self.elevation_grid[r_south, col])
        z_west = float(self.elevation_grid[row, c_west])
        z_east = float(self.elevation_grid[row, c_east])
        z_center = float(self.elevation_grid[row, col])

        # Replace any void neighbors with center value to maintain stability
        if self.is_nodata(z_north):
            z_north = z_center
        if self.is_nodata(z_south):
            z_south = z_center
        if self.is_nodata(z_west):
            z_west = z_center
        if self.is_nodata(z_east):
            z_east = z_center

        # Finite difference gradient
        delta_col = max(1, c_east - c_west)
        delta_row = max(1, r_south - r_north)

        dz_dx = (z_east - z_west) / (delta_col * dx)
        # row index decreases northward, so (north - south) gives positive northward gradient
        dz_dy = (z_north - z_south) / (delta_row * dy)

        slope_tan = math.sqrt(dz_dx**2 + dz_dy**2)
        slope_deg = math.degrees(math.atan(slope_tan))
        slope_percent = slope_tan * 100.0

        return slope_deg, slope_percent

    def compute_full_slope_grids(self):
        """Precompute slope across entire raster lazily if needed for bulk export."""
        if self._slope_grid is not None:
            return

        center_lat = (self.min_lat + self.max_lat) / 2.0
        dy = self.pixel_scale_y * METERS_PER_DEGREE_LAT
        dx = self.pixel_scale_x * METERS_PER_DEGREE_LAT * math.cos(math.radians(center_lat))

        # Central difference finite gradients using NumPy
        dz_dy, dz_dx = np.gradient(self.elevation_grid, dy, dx)
        slope_tan = np.sqrt(dz_dx**2 + dz_dy**2)

        self._slope_grid = np.degrees(np.arctan(slope_tan))
        self._slope_percent_grid = slope_tan * 100.0


class DEMProcessor:
    """Manager class for loading, caching, and querying across multiple DEM tiles."""

    def __init__(
        self,
        dem_dir: Optional[str] = None,
        terrain_manifest_path: Optional[str] = None,
        pilot_aoi_path: Optional[str] = None,
    ):
        # Resolve dem_dir from parameter, environment variable, or default relative path
        if dem_dir is None:
            env_path = os.getenv("DEM_DIR") or os.getenv("DEM_PATH")
            if env_path:
                self.dem_dir = os.path.abspath(env_path)
            else:
                # Default relative to repository data directory
                module_dir = os.path.dirname(os.path.abspath(__file__))
                self.dem_dir = os.path.abspath(os.path.join(module_dir, "..", "data", "raw", "dem"))
        else:
            self.dem_dir = os.path.abspath(dem_dir)

        self.tiles: List[DEMTile] = []
        self.validated_terrain = None
        manifest_path = terrain_manifest_path or os.getenv("TERRAIN_MANIFEST_PATH")
        if manifest_path:
            try:
                from terrain_dataset import TerrainDataset

                dataset = TerrainDataset(manifest_path)
                validation = dataset.validate(pilot_aoi_path or os.getenv("PILOT_AOI_PATH"))
                if validation["accepted"]:
                    self.validated_terrain = dataset
                    print(f"[DEMProcessor] Loaded validated terrain: {validation['dataset_id']}")
                else:
                    print(f"[DEMProcessor] Rejected terrain manifest: {'; '.join(validation['errors'])}")
            except Exception as exc:
                print(f"[DEMProcessor] Rejected terrain manifest: {exc}")
        self._cache: Dict[Tuple[float, float], Dict[str, Any]] = {}
        self._load_tiles()

    def _load_tiles(self):
        """Find and load all valid .tif DEM tiles in dem_dir."""
        if not os.path.exists(self.dem_dir):
            print(f"[DEMProcessor] Notice: DEM directory not found: {self.dem_dir}. Running in fallback mode.")
            return

        search_path = os.path.join(self.dem_dir, "*.tif")
        tif_files = glob.glob(search_path)

        for filepath in tif_files:
            try:
                tile = DEMTile(filepath)
                self.tiles.append(tile)
                print(
                    f"[DEMProcessor] Loaded DEM Tile: {tile.filename} | "
                    f"Extent: [{tile.min_lon:.2f}E..{tile.max_lon:.2f}E, {tile.min_lat:.2f}N..{tile.max_lat:.2f}N] | "
                    f"CRS: {tile.crs} | Grid: {tile.width}x{tile.height}"
                )
            except Exception as e:
                print(f"[DEMProcessor] Warning: Skipping tile {os.path.basename(filepath)}: {e}")

        if not self.tiles:
            print(f"[DEMProcessor] Notice: No valid DEM rasters loaded from {self.dem_dir}. Running in fallback mode.")

    def get_tile_for_coord(self, lat: float, lon: float) -> Optional[DEMTile]:
        """Find matching tile containing the lat/lon coordinates."""
        for tile in self.tiles:
            if tile.contains(lat, lon):
                return tile
        return None

    def get_elevation_and_slope(self, lat: float, lon: float) -> Dict[str, Any]:
        """
        Query terrain elevation and slope for any coordinate.

        Returns structured dictionary:
            - elevation_m: Elevation in meters above MSL
            - slope_deg: Terrain slope angle in degrees
            - slope_percent: Terrain slope percentage (%)
            - in_dem_coverage: True if inside real DEM raster with valid data
            - dem_status: REAL_DEM | FALLBACK_OUT_OF_BOUNDS | FALLBACK_NODATA | DEM_UNAVAILABLE
            - data_source: Human-readable data source and CRS
            - tile_filename: Name of the active raster tile or None
            - is_fallback: Boolean flag identifying whether output is fallback
            - provenance: Audit dictionary breaking down REAL DATA vs MODEL OUTPUT vs FALLBACK
        """
        cache_key = (round(lat, 4), round(lon, 4))
        if cache_key in self._cache:
            return self._cache[cache_key]

        if self.validated_terrain is not None:
            try:
                point = self.validated_terrain.elevation_at(lat, lon)
                res = {
                    "elevation_m": round(point["elevation_m"], 3),
                    "slope_deg": round(point["slope_deg"], 3),
                    "slope_percent": round(point["slope_percent"], 3),
                    "in_dem_coverage": True,
                    "dem_status": "VALIDATED_HIGH_RES_DTM",
                    "data_source": f"{point['dataset_id']} ({point['horizontal_crs']}; {point['vertical_datum']})",
                    "tile_filename": os.path.basename(self.validated_terrain.raster_path),
                    "is_fallback": False,
                    "provenance": {
                        "elevation": "OBSERVED_DTM",
                        "slope": "MODEL_OUTPUT (Finite Difference Gradient)",
                        "reason": "Manifest and terrain acceptance gates passed",
                    },
                }
                self._save_cache(cache_key, res)
                return res
            except Exception:
                # Outside the accepted high-resolution pilot, retain legacy
                # regional lookup with explicit non-operational provenance.
                pass

        # Case 1: No DEM tiles loaded at all
        if not self.tiles:
            res = {
                "elevation_m": DEFAULT_FALLBACK_ELEVATION_M,
                "slope_deg": DEFAULT_FALLBACK_SLOPE_DEG,
                "slope_percent": DEFAULT_FALLBACK_SLOPE_PCT,
                "in_dem_coverage": False,
                "dem_status": "DEM_UNAVAILABLE",
                "data_source": "Default Urban Baseline (Fallback)",
                "tile_filename": None,
                "is_fallback": True,
                "provenance": {
                    "elevation": "FALLBACK",
                    "slope": "FALLBACK",
                    "reason": f"No DEM GeoTIFF rasters available in {self.dem_dir}"
                }
            }
            self._save_cache(cache_key, res)
            return res

        # Case 2: Coordinate falls outside all loaded tiles
        tile = self.get_tile_for_coord(lat, lon)
        if not tile:
            res = {
                "elevation_m": DEFAULT_FALLBACK_ELEVATION_M,
                "slope_deg": DEFAULT_FALLBACK_SLOPE_DEG,
                "slope_percent": DEFAULT_FALLBACK_SLOPE_PCT,
                "in_dem_coverage": False,
                "dem_status": "FALLBACK_OUT_OF_BOUNDS",
                "data_source": "Default Urban Baseline (Fallback)",
                "tile_filename": None,
                "is_fallback": True,
                "provenance": {
                    "elevation": "FALLBACK",
                    "slope": "FALLBACK",
                    "reason": f"Coordinate ({lat:.4f}, {lon:.4f}) is outside loaded DEM raster coverage"
                }
            }
            self._save_cache(cache_key, res)
            return res

        # Case 3: Coordinate is inside tile -> query elevation
        elevation = tile.get_elevation(lat, lon)

        # Detect NoData / ocean void
        if elevation is None:
            res = {
                "elevation_m": DEFAULT_FALLBACK_ELEVATION_M,
                "slope_deg": DEFAULT_FALLBACK_SLOPE_DEG,
                "slope_percent": DEFAULT_FALLBACK_SLOPE_PCT,
                "in_dem_coverage": False,
                "dem_status": "FALLBACK_NODATA",
                "data_source": "Default Urban Baseline (Fallback)",
                "tile_filename": tile.filename,
                "is_fallback": True,
                "provenance": {
                    "elevation": "FALLBACK",
                    "slope": "FALLBACK",
                    "reason": f"NoData or void pixel in DEM tile {tile.filename}"
                }
            }
            self._save_cache(cache_key, res)
            return res

        # Realistic coastal clamping: small negative values (-5m to 0m) near shore
        # represent tidal flats or bathymetric boundary; clamp safely to 0.0m for urban flood modeling.
        effective_elevation = max(0.0, float(elevation)) if elevation >= -15.0 else DEFAULT_FALLBACK_ELEVATION_M
        is_suspicious_negative = elevation < -15.0

        if is_suspicious_negative:
            res = {
                "elevation_m": DEFAULT_FALLBACK_ELEVATION_M,
                "slope_deg": DEFAULT_FALLBACK_SLOPE_DEG,
                "slope_percent": DEFAULT_FALLBACK_SLOPE_PCT,
                "in_dem_coverage": False,
                "dem_status": "FALLBACK_ANOMALOUS_ELEVATION",
                "data_source": "Default Urban Baseline (Fallback)",
                "tile_filename": tile.filename,
                "is_fallback": True,
                "provenance": {
                    "elevation": "FALLBACK",
                    "slope": "FALLBACK",
                    "reason": f"Anomalously low elevation ({elevation:.2f}m) in tile {tile.filename}"
                }
            }
            self._save_cache(cache_key, res)
            return res

        # Compute accurate local finite-difference slope
        slope_deg, slope_pct = tile.get_slope_at_point(lat, lon)

        if "Copernicus" in tile.filename:
            dataset_label = "Copernicus GLO-30 DEM 30m"
        elif "CartoDEM" in tile.filename or "P5_PAN" in tile.filename:
            dataset_label = "ISRO CartoDEM 30m"
        else:
            dataset_label = "GeoTIFF DEM 30m"
        res = {
            "elevation_m": round(effective_elevation, 2),
            "slope_deg": round(slope_deg, 2),
            "slope_percent": round(slope_pct, 2),
            "in_dem_coverage": True,
            "dem_status": "REAL_DEM",
            "data_source": f"{dataset_label} ({tile.crs})",
            "tile_filename": tile.filename,
            "is_fallback": False,
            "provenance": {
                "elevation": f"REAL_DATA ({dataset_label})",
                "slope": "MODEL_OUTPUT (Finite Difference Gradient)",
                "reason": "Observed DEM raster grid cell"
            }
        }
        self._save_cache(cache_key, res)
        return res

    def _save_cache(self, key: Tuple[float, float], val: Dict[str, Any]):
        """Store result in bounded memory cache."""
        if len(self._cache) < 8192:
            self._cache[key] = val


# Global singleton instance
_global_dem_processor: Optional[DEMProcessor] = None


def get_dem_processor(dem_dir: Optional[str] = None, force_reload: bool = False) -> DEMProcessor:
    """Return singleton DEMProcessor instance, caching loaded rasters in memory."""
    global _global_dem_processor
    req_dir = os.path.abspath(dem_dir) if dem_dir is not None else None
    if (
        _global_dem_processor is None
        or force_reload
        or (req_dir is not None and req_dir != _global_dem_processor.dem_dir)
    ):
        _global_dem_processor = DEMProcessor(dem_dir=dem_dir)
    return _global_dem_processor
