import json
import os
import sys

import numpy as np
import rasterio
from pyproj import Transformer
from rasterio.transform import from_origin

sys.path.insert(0, os.path.join(os.path.dirname(__file__), "..", "flood-engine"))

from terrain_dataset import TerrainDataset
from dem_processor import DEMProcessor


def make_dataset(tmp_path, *, terrain_type="DTM", rmse=0.2, approved=True):
    to_utm = Transformer.from_crs("EPSG:4326", "EPSG:32643", always_xy=True)
    centre_x, centre_y = to_utm.transform(72.84675, 19.0275)
    raster_path = tmp_path / "pilot_dtm.tif"
    transform = from_origin(centre_x - 1000, centre_y + 1500, 1.0, 1.0)
    data = np.full((3000, 2000), 7.25, dtype=np.float32)
    with rasterio.open(
        raster_path, "w", driver="GTiff", height=data.shape[0], width=data.shape[1],
        count=1, dtype="float32", crs="EPSG:32643", transform=transform, nodata=-9999.0,
    ) as dst:
        dst.write(data, 1)

    checkpoint_path = tmp_path / "checkpoints.csv"
    checkpoint_path.write_text(
        "id,observed_m,dtm_m,residual_m\n"
        "CP1,7.20,7.25,0.05\n"
        "CP2,7.30,7.25,-0.05\n"
        "CP3,7.24,7.25,0.01\n",
        encoding="utf-8",
    )
    manifest = {
        "schema_version": 1,
        "dataset_id": "synthetic-pilot-test",
        "raster_path": raster_path.name,
        "source_organization": "test survey",
        "license": "test only",
        "acquisition_date": "2026-09-11",
        "horizontal_crs": "EPSG:32643",
        "vertical_datum": "test orthometric datum",
        "terrain_type": terrain_type,
        "horizontal_resolution_m": 1.0,
        "claimed_vertical_rmse_m": rmse,
        "checkpoint_report": checkpoint_path.name,
        "processing_history": ["synthetic fixture"],
        "redistributable": True,
        "approved_for_operational_modelling": approved,
    }
    manifest_path = tmp_path / "manifest.json"
    manifest_path.write_text(json.dumps(manifest), encoding="utf-8")
    return manifest_path


def test_accepts_valid_projected_dtm_and_queries_elevation(tmp_path):
    terrain = TerrainDataset(make_dataset(tmp_path))
    result = terrain.validate("data/pilot/hindmata_dadar_aoi.geojson")
    assert result["accepted"] is True
    assert result["metadata"]["grid_spacing_m"] == {"x": 1.0, "y": 1.0}
    assert result["metadata"]["checkpoint_count"] == 3
    assert result["metadata"]["checkpoint_rmse_m"] < 0.1
    point = terrain.elevation_at(19.0275, 72.84675)
    assert point["elevation_m"] == 7.25
    assert point["slope_percent"] == 0.0
    assert point["provenance"] == "OBSERVED_DTM"

    processor = DEMProcessor(
        dem_dir=str(tmp_path / "empty-legacy-dir"),
        terrain_manifest_path=str(terrain.manifest_path),
        pilot_aoi_path="data/pilot/hindmata_dadar_aoi.geojson",
    )
    integrated = processor.get_elevation_and_slope(19.0275, 72.84675)
    assert integrated["dem_status"] == "VALIDATED_HIGH_RES_DTM"
    assert integrated["is_fallback"] is False


def test_rejects_surface_model_and_excess_vertical_error(tmp_path):
    terrain = TerrainDataset(make_dataset(tmp_path, terrain_type="DSM", rmse=5.0, approved=False))
    result = terrain.validate()
    assert result["accepted"] is False
    assert any("terrain_type must be DTM" in error for error in result["errors"])
    assert any("vertical RMSE" in error for error in result["errors"])
    assert any("not approved" in error for error in result["errors"])
