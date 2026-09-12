"""Strict manifest-backed terrain dataset for operational flood modelling."""

from __future__ import annotations

import json
import math
import csv
from pathlib import Path
from typing import Any

import numpy as np
import rasterio
from pyproj import CRS, Transformer
from rasterio.transform import rowcol
from rasterio.warp import transform_bounds


class TerrainValidationError(ValueError):
    """Raised when terrain cannot satisfy the operational input contract."""


class TerrainDataset:
    MAX_GRID_SPACING_M = 2.0
    MAX_VERTICAL_RMSE_M = 0.30

    def __init__(self, manifest_path: str | Path):
        self.manifest_path = Path(manifest_path).resolve()
        self.manifest = json.loads(self.manifest_path.read_text(encoding="utf-8"))
        raster_path = Path(self.manifest["raster_path"])
        if not raster_path.is_absolute():
            raster_path = self.manifest_path.parent / raster_path
        self.raster_path = raster_path.resolve()
        self.errors: list[str] = []
        self.warnings: list[str] = []
        self.metadata: dict[str, Any] = {}
        self._validation_result: dict[str, Any] | None = None

    @staticmethod
    def _is_placeholder(value: Any) -> bool:
        text = str(value or "").strip().lower()
        return not text or "replace-with" in text or text in {"unknown", "tbd", "none"}

    @staticmethod
    def _grid_spacing_m(dataset: rasterio.io.DatasetReader) -> tuple[float, float]:
        x_size, y_size = abs(dataset.transform.a), abs(dataset.transform.e)
        crs = CRS.from_user_input(dataset.crs)
        if crs.is_projected:
            factors = [axis.unit_conversion_factor or 1.0 for axis in crs.axis_info[:2]]
            return x_size * factors[0], y_size * factors[1]
        centre_lat = (dataset.bounds.bottom + dataset.bounds.top) / 2.0
        return (
            x_size * 111_320.0 * math.cos(math.radians(centre_lat)),
            y_size * 111_320.0,
        )

    def validate(self, pilot_aoi_path: str | Path | None = None) -> dict[str, Any]:
        self.errors = []
        self.warnings = []

        required = (
            "dataset_id", "raster_path", "source_organization", "license",
            "acquisition_date", "horizontal_crs", "vertical_datum",
            "terrain_type", "claimed_vertical_rmse_m", "checkpoint_report",
        )
        for field in required:
            if self._is_placeholder(self.manifest.get(field)):
                self.errors.append(f"manifest field '{field}' is missing or a placeholder")

        if str(self.manifest.get("terrain_type", "")).upper() != "DTM":
            self.errors.append("terrain_type must be DTM (bare earth)")

        try:
            rmse = float(self.manifest.get("claimed_vertical_rmse_m"))
            if rmse > self.MAX_VERTICAL_RMSE_M:
                self.errors.append(
                    f"claimed vertical RMSE {rmse:.3f} m exceeds {self.MAX_VERTICAL_RMSE_M:.2f} m"
                )
        except (TypeError, ValueError):
            self.errors.append("claimed_vertical_rmse_m must be numeric")

        checkpoint_path = Path(str(self.manifest.get("checkpoint_report", "")))
        if not checkpoint_path.is_absolute():
            checkpoint_path = self.manifest_path.parent / checkpoint_path
        if not checkpoint_path.is_file():
            self.errors.append("independent checkpoint report is missing")
        else:
            residuals = []
            try:
                with checkpoint_path.open("r", encoding="utf-8-sig", newline="") as handle:
                    for row in csv.DictReader(handle):
                        if row.get("residual_m") not in (None, ""):
                            residuals.append(float(row["residual_m"]))
                        elif row.get("observed_m") not in (None, "") and row.get("dtm_m") not in (None, ""):
                            residuals.append(float(row["dtm_m"]) - float(row["observed_m"]))
                        elif row.get("observed_orthometric_m") not in (None, "") and row.get("dtm_orthometric_m") not in (None, ""):
                            residuals.append(
                                float(row["dtm_orthometric_m"]) - float(row["observed_orthometric_m"])
                            )
                if len(residuals) < 3:
                    self.errors.append("checkpoint report must contain at least three numeric residuals")
                else:
                    checkpoint_rmse = math.sqrt(sum(value * value for value in residuals) / len(residuals))
                    self.metadata["checkpoint_count"] = len(residuals)
                    self.metadata["checkpoint_rmse_m"] = round(checkpoint_rmse, 4)
                    if checkpoint_rmse > self.MAX_VERTICAL_RMSE_M:
                        self.errors.append(
                            f"checkpoint RMSE {checkpoint_rmse:.3f} m exceeds {self.MAX_VERTICAL_RMSE_M:.2f} m"
                        )
            except (OSError, TypeError, ValueError) as exc:
                self.errors.append(f"checkpoint report cannot be validated: {exc}")

        if not self.raster_path.is_file():
            self.errors.append(f"raster not found: {self.raster_path}")
            return self._result()

        with rasterio.open(self.raster_path) as dataset:
            if dataset.crs is None:
                self.errors.append("raster CRS is missing")
                return self._result()
            if dataset.count != 1:
                self.errors.append("terrain raster must contain exactly one elevation band")

            manifest_crs = self.manifest.get("horizontal_crs")
            if not self._is_placeholder(manifest_crs):
                try:
                    if CRS.from_user_input(manifest_crs) != CRS.from_user_input(dataset.crs):
                        self.errors.append("raster CRS does not match manifest horizontal_crs")
                except Exception:
                    self.errors.append("manifest horizontal_crs is invalid")

            x_m, y_m = self._grid_spacing_m(dataset)
            if max(x_m, y_m) > self.MAX_GRID_SPACING_M:
                self.errors.append(
                    f"grid spacing {x_m:.3f} x {y_m:.3f} m exceeds {self.MAX_GRID_SPACING_M:.1f} m"
                )

            sample = dataset.read(1, out_shape=(1, min(256, dataset.height), min(256, dataset.width)), masked=True)
            values = sample.compressed()
            if not values.size:
                self.errors.append("raster contains no valid elevation samples")

            if pilot_aoi_path is not None:
                aoi = json.loads(Path(pilot_aoi_path).read_text(encoding="utf-8"))
                polygon = next(
                    feature for feature in aoi["features"]
                    if feature["geometry"]["type"] in {"Polygon", "MultiPolygon"}
                )
                coords = polygon["geometry"]["coordinates"][0]
                xs, ys = zip(*coords)
                aoi_bounds = transform_bounds(
                    "EPSG:4326", dataset.crs, min(xs), min(ys), max(xs), max(ys), densify_pts=21
                )
                rb = dataset.bounds
                if not (
                    rb.left <= aoi_bounds[0] and rb.bottom <= aoi_bounds[1]
                    and rb.right >= aoi_bounds[2] and rb.top >= aoi_bounds[3]
                ):
                    self.errors.append("raster does not fully cover the pilot AOI")

            self.metadata.update({
                "crs": dataset.crs.to_string(),
                "width": dataset.width,
                "height": dataset.height,
                "bounds": list(dataset.bounds),
                "nodata": dataset.nodata,
                "grid_spacing_m": {"x": round(x_m, 4), "y": round(y_m, 4)},
                "sample_min_m": float(np.min(values)) if values.size else None,
                "sample_max_m": float(np.max(values)) if values.size else None,
            })

        if not self.manifest.get("approved_for_operational_modelling", False):
            self.errors.append("manifest is not approved_for_operational_modelling")
        self._validation_result = self._result()
        return self._validation_result

    def _result(self) -> dict[str, Any]:
        return {
            "dataset_id": self.manifest.get("dataset_id"),
            "raster_path": str(self.raster_path),
            "accepted": not self.errors,
            "errors": self.errors,
            "warnings": self.warnings,
            "metadata": self.metadata,
        }

    def elevation_at(self, lat: float, lon: float) -> dict[str, Any]:
        validation = self._validation_result or self.validate()
        if not validation["accepted"]:
            raise TerrainValidationError("; ".join(validation["errors"]))

        with rasterio.open(self.raster_path) as dataset:
            transformer = Transformer.from_crs("EPSG:4326", dataset.crs, always_xy=True)
            x, y = transformer.transform(lon, lat)
            if not (dataset.bounds.left <= x <= dataset.bounds.right and dataset.bounds.bottom <= y <= dataset.bounds.top):
                raise TerrainValidationError("coordinate is outside terrain coverage")
            row, col = rowcol(dataset.transform, x, y)
            value = dataset.read(1, window=((row, row + 1), (col, col + 1)), masked=True)[0, 0]
            if np.ma.is_masked(value) or not np.isfinite(float(value)):
                raise TerrainValidationError("terrain cell is nodata")
            window = dataset.read(
                1,
                window=((max(0, row - 1), min(dataset.height, row + 2)),
                        (max(0, col - 1), min(dataset.width, col + 2))),
                masked=True,
            )
            if window.count() < 4:
                raise TerrainValidationError("insufficient neighbouring cells for slope")
            filled = window.filled(float(value)).astype(float)
            x_m, y_m = self._grid_spacing_m(dataset)
            dz_dy, dz_dx = np.gradient(filled, y_m, x_m)
            slope_tan = math.sqrt(float(dz_dx[filled.shape[0] // 2, filled.shape[1] // 2]) ** 2
                                  + float(dz_dy[filled.shape[0] // 2, filled.shape[1] // 2]) ** 2)

        return {
            "elevation_m": float(value),
            "slope_percent": slope_tan * 100.0,
            "slope_deg": math.degrees(math.atan(slope_tan)),
            "horizontal_crs": self.manifest["horizontal_crs"],
            "vertical_datum": self.manifest["vertical_datum"],
            "dataset_id": self.manifest["dataset_id"],
            "provenance": "OBSERVED_DTM",
            "prediction_valid": True,
        }
