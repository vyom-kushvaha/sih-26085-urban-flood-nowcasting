import json
import uuid
from datetime import datetime, timezone
from pathlib import Path
from typing import Dict, Any

from sqlalchemy.orm import Session
from sqlalchemy import select

from backend.db.models import ForecastRun, ForecastLayer, RainfallFrame, RiskAssessmentLog


from backend.core.config import settings


RUNTIME_DATA_DIR = Path(
    settings.forecast_assets_path
    or Path(__file__).resolve().parents[2] / 'data/runtime/runs'
)
RUNTIME_DATA_DIR.mkdir(parents=True, exist_ok=True)


class ForecastRepository:
    def __init__(self, session: Session):
        self.session = session

    def save_run(self, inputs: Dict[str, Any], result: Dict[str, Any]) -> Dict[str, Any]:
        run_id = uuid.uuid4()

        # We store the large result object as a file asset to avoid bloating the DB JSON column
        asset_filename = f"{run_id}_result.json"
        asset_path = RUNTIME_DATA_DIR / asset_filename

        temporary_path = asset_path.with_suffix('.tmp')
        with temporary_path.open('w', encoding='utf-8') as file_handle:
            json.dump(result, file_handle, allow_nan=False)
        temporary_path.replace(asset_path)

        # Create ForecastRun
        created_at = datetime.now(timezone.utc)
        db_run = ForecastRun(
            id=run_id,
            status='COMPLETED',
            input_parameters=inputs,
            created_at=created_at,
            completed_at=datetime.now(timezone.utc)
        )
        self.session.add(db_run)

        # Create ForecastLayers for each snapshot
        for snapshot_index, snapshot in enumerate(result.get('snapshots', [])):
            lead_mins = snapshot.get('lead_minutes', 0)
            valid_time_str = snapshot.get('valid_time')
            valid_time = datetime.fromisoformat(valid_time_str) if valid_time_str else datetime.now(timezone.utc)

            layer = ForecastLayer(
                run_id=run_id,
                lead_minutes=lead_mins,
                valid_time=valid_time,
                type='DEPTH',
                asset_path=str(asset_path),
                metadata_json={'snapshot_index': snapshot_index}
            )
            self.session.add(layer)

        return {
            'run_id': str(run_id),
            'created_at': created_at.isoformat(),
            'status': 'COMPLETED',
            'storage': 'POSTGRES_ASSET'
        }

    def get_run(self, run_id: str) -> Dict[str, Any]:
        stmt = select(ForecastRun).where(ForecastRun.id == uuid.UUID(run_id))
        db_run = self.session.execute(stmt).scalar_first()
        if not db_run:
            raise KeyError(str(run_id))
        layers = self.session.execute(
            select(ForecastLayer).where(ForecastLayer.run_id == uuid.UUID(run_id))
        ).scalars().all()
        if not layers:
            raise KeyError(f"No layers found for run {run_id}")
        asset_path = Path(layers[0].asset_path).resolve()
        asset_root = RUNTIME_DATA_DIR.resolve()
        if asset_root not in asset_path.parents:
            raise ValueError('Forecast asset path is outside the configured asset directory')
        if not asset_path.exists():
            raise FileNotFoundError(f"Forecast asset missing at {asset_path}")
        with asset_path.open('r', encoding='utf-8') as file_handle:
            result = json.load(file_handle)
        return {
            'run_id': str(run_id),
            'created_at': db_run.created_at.isoformat() if db_run.created_at else "",
            'status': db_run.status,
            'input': db_run.input_parameters,
            'result': result,
        }


class RainfallRepository:
    def __init__(self, session: Session):
        self.session = session

    def save_observation(self, observation: Dict[str, Any], asset_path: str) -> tuple[str, bool]:
        existing = self.session.execute(
            select(RainfallFrame).where(
                RainfallFrame.source == observation["provider"],
                RainfallFrame.source_identifier == observation["source_identifier"],
            )
        ).scalar_one_or_none()
        if existing:
            return str(existing.id), False
        frame = RainfallFrame(
            timestamp=observation["observed_at"],
            received_at=observation["received_at"],
            valid_until=observation["valid_until"],
            source=observation["provider"],
            source_identifier=observation["source_identifier"],
            freshness_state=observation["freshness"],
            is_forecast=observation["quality"] == "PROVIDER_FORECAST",
            asset_path=asset_path,
            metadata_json={
                "source_type": observation["source_type"],
                "quality": observation["quality"],
                "latitude": observation["latitude"],
                "longitude": observation["longitude"],
                "rainfall_mm_hr": observation["rainfall_mm_hr"],
                "units": observation["units"],
                "warnings": observation["warnings"],
            },
        )
        self.session.add(frame)
        self.session.flush()
        return str(frame.id), True

class RiskRepository:
    def __init__(self, session: Session):
        self.session = session

    def log_risk_calculation(self, risk_payload: Dict[str, Any]) -> str:
        try:
            lat = risk_payload["coordinates"]["lat"]
            lon = risk_payload["coordinates"]["lon"]

            log_entry = RiskAssessmentLog(
                geom=f"SRID=4326;POINT({lon} {lat})",
                rainfall_mm_hr=risk_payload["hydrology_metrics"].get("rainfall_mm_hr", 0.0),
                blockage_pct=risk_payload.get("blockage_pct", 0.0),
                risk_score=risk_payload.get("risk_score", 0.0),
                risk_level=risk_payload.get("risk_level", "LOW"),
                water_depth_cm=risk_payload.get("water_depth_cm", 0.0),
                nearest_drain_name=risk_payload.get("drainage", {}).get("nearest_drain_name", ""),
                nearest_drain_distance_m=risk_payload.get("drainage", {}).get("distance_meters", 0.0),
                data_quality_label=risk_payload.get("drainage", {}).get("capacity_source", "")
            )
            self.session.add(log_entry)
            self.session.flush() # Try to flush immediately to catch errors
            return "PERSISTED_POSTGIS"
        except Exception as exc:
            self.session.rollback()
            import logging
            logging.getLogger(__name__).warning(
                "Risk logging failed: %s", exc.__class__.__name__
            )
            return "SKIPPED_DB_UNAVAILABLE"
