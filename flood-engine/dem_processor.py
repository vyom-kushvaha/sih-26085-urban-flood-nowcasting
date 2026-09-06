"""
DEM Elevation & Slope Processing Module
Author: Vyom (Lead Architect & Flood Engine Lead)
Project: Urban Flood Nowcasting System (SIH26085)

This module handles:
1. Loading CartoDEM 30m GeoTIFF tiles from data/raw/dem/
2. Spatial coordinate transformation (Lat/Lon -> Pixel Row/Col)
3. Terrain Elevation lookup (meters)
4. Spatial Gradient & Slope calculation (% and degrees)
"""

import os
import math
import glob
from typing import Dict, Tuple, Optional, List, Any
import numpy as np
from PIL import Image

# 1 Arc-second approx in meters at equator (~30.87m)
METERS_PER_DEGREE_LAT = 111320.0


class DEMTile:
    """Represents a single parsed 30m GeoTIFF DEM tile."""

    def __init__(self, filepath: str):
        self.filepath = filepath
        self.filename = os.path.basename(filepath)
        
        # Load GeoTIFF raster using PIL
        img = Image.open(filepath)
        self.width, self.height = img.size
        grid = np.array(img, dtype=np.float32)
        
        # Parse GeoTIFF Metadata (Tag 33550: Pixel Scale, Tag 33922: Model Tiepoint)
        tags = img.tag_v2
        scale = tags.get(33550, (0.0002777778, 0.0002777778, 0.0))
        tiepoint = tags.get(33922, (0.0, 0.0, 0.0, 72.0, 19.0, 0.0))
        
        self.pixel_scale_x = scale[0]
        self.pixel_scale_y = scale[1]
        
        self.min_lon = tiepoint[3]
        self.max_lat = tiepoint[4]
        
        self.max_lon = self.min_lon + (self.width * self.pixel_scale_x)
        self.min_lat = self.max_lat - (self.height * self.pixel_scale_y)
        
        self.elevation_grid = grid
        
        # Compute Slope Grid lazily
        self._slope_grid: Optional[np.ndarray] = None
        self._slope_percent_grid: Optional[np.ndarray] = None

    def contains(self, lat: float, lon: float) -> bool:
        """Check if a coordinate falls within this DEM tile boundary."""
        return (self.min_lat <= lat <= self.max_lat) and (self.min_lon <= lon <= self.max_lon)

    def latlon_to_pixel(self, lat: float, lon: float) -> Tuple[int, int]:
        """Convert Latitude and Longitude to pixel (row, col) indices."""
        col = int((lon - self.min_lon) / self.pixel_scale_x)
        row = int((self.max_lat - lat) / self.pixel_scale_y)
        
        # Clamp to bounds
        col = max(0, min(col, self.width - 1))
        row = max(0, min(row, self.height - 1))
        return row, col

    def get_elevation(self, lat: float, lon: float) -> float:
        """Get elevation in meters for a given coordinate."""
        row, col = self.latlon_to_pixel(lat, lon)
        return float(self.elevation_grid[row, col])

    def compute_slope_grids(self):
        """
        Compute Terrain Slope using 2D finite difference gradients.
        Formula:
            dx = pixel_scale_x * 111320 * cos(center_lat)
            dy = pixel_scale_y * 111320
            dz_dx = d(elevation)/dx
            dz_dy = d(elevation)/dy
            slope_tan = sqrt(dz_dx^2 + dz_dy^2)
            slope_deg = arctan(slope_tan) * (180 / pi)
            slope_percent = slope_tan * 100
        """
        if self._slope_grid is not None:
            return

        center_lat = (self.min_lat + self.max_lat) / 2.0
        dy = self.pixel_scale_y * METERS_PER_DEGREE_LAT
        dx = self.pixel_scale_x * METERS_PER_DEGREE_LAT * math.cos(math.radians(center_lat))
        
        # Gradient using central difference (NumPy)
        dz_dy, dz_dx = np.gradient(self.elevation_grid, dy, dx)
        
        slope_tan = np.sqrt(dz_dx**2 + dz_dy**2)
        self._slope_grid = np.degrees(np.arctan(slope_tan))
        self._slope_percent_grid = slope_tan * 100.0

    def get_slope(self, lat: float, lon: float) -> Tuple[float, float]:
        """Returns (slope_degrees, slope_percentage) for a coordinate."""
        if self._slope_grid is None:
            self.compute_slope_grids()
            
        row, col = self.latlon_to_pixel(lat, lon)
        return float(self._slope_grid[row, col]), float(self._slope_percent_grid[row, col])


class DEMProcessor:
    """Manager class for loading and querying across multiple DEM tiles."""

    def __init__(self, dem_dir: str = "data/raw/dem"):
        self.dem_dir = dem_dir
        self.tiles: List[DEMTile] = []
        self._cache: Dict[Tuple[float, float], Dict[str, Any]] = {}
        self._load_tiles()

    def _load_tiles(self):
        """Find and load all .tif DEM tiles in dem_dir."""
        search_path = os.path.join(self.dem_dir, "*.tif")
        tif_files = glob.glob(search_path)
        
        for filepath in tif_files:
            try:
                tile = DEMTile(filepath)
                self.tiles.append(tile)
                print(f"[DEMProcessor] Loaded tile: {tile.filename} (Bounds: {tile.min_lon:.2f}E..{tile.max_lon:.2f}E, {tile.min_lat:.2f}N..{tile.max_lat:.2f}N)")
            except Exception as e:
                print(f"[DEMProcessor] Failed to load tile {filepath}: {e}")

    def get_tile_for_coord(self, lat: float, lon: float) -> Optional[DEMTile]:
        """Find matching tile containing the lat/lon."""
        for tile in self.tiles:
            if tile.contains(lat, lon):
                return tile
        return None

    def get_elevation_and_slope(self, lat: float, lon: float) -> Dict[str, Any]:
        """
        Query elevation and slope for any coordinate.
        Returns dict with elevation_m, slope_deg, slope_percent.
        Optimized with in-memory coordinate cache.
        """
        cache_key = (round(lat, 4), round(lon, 4))
        if cache_key in self._cache:
            return self._cache[cache_key]

        tile = self.get_tile_for_coord(lat, lon)
        if not tile:
            # Fallback if coordinate is outside current DEM tiles
            res = {
                "elevation_m": 15.0,  # Default urban flat elevation
                "slope_deg": 1.0,     # Default flat slope (1 deg)
                "slope_percent": 1.75,
                "in_dem_coverage": False
            }
            if len(self._cache) < 4096:
                self._cache[cache_key] = res
            return res
            
        elevation = tile.get_elevation(lat, lon)

        if elevation < 0.0:
            res = {
                "elevation_m": 15.0,
                "slope_deg": 1.0,
                "slope_percent": 1.75,
                "in_dem_coverage": False
            }
            if len(self._cache) < 4096:
                self._cache[cache_key] = res
            return res

        slope_deg, slope_pct = tile.get_slope(lat, lon)

        res = {
            "elevation_m": round(elevation, 2),
            "slope_deg": round(slope_deg, 2),
            "slope_percent": round(slope_pct, 2),
            "in_dem_coverage": True
        }
        if len(self._cache) < 4096:
            self._cache[cache_key] = res
        return res



# Singleton instance for quick importing
_global_dem_processor = None

def get_dem_processor(dem_dir: str = "data/raw/dem") -> DEMProcessor:
    global _global_dem_processor
    if _global_dem_processor is None:
        _global_dem_processor = DEMProcessor(dem_dir=dem_dir)
    return _global_dem_processor
