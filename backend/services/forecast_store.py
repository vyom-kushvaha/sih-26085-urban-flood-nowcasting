import json
import sqlite3
import os
from pathlib import Path
from uuid import uuid4
from contextlib import contextmanager
from datetime import datetime, timezone

from backend.core.config import settings
from backend.db.database import get_db_session, is_db_available
from backend.db.repositories import ForecastRepository

@contextmanager
def sqlite_connection():
    configured_path = settings.forecast_db_path or os.getenv('FORECAST_DB_PATH')
    path = Path(configured_path or Path(__file__).resolve().parents[2] / 'data/runtime/forecasts.sqlite3')
    path.parent.mkdir(parents=True, exist_ok=True)
    db = sqlite3.connect(path, timeout=5)
    try:
        db.execute('CREATE TABLE IF NOT EXISTS runs (id TEXT PRIMARY KEY, created TEXT NOT NULL, input TEXT NOT NULL, result TEXT NOT NULL)')
        with db:
            yield db
    finally:
        db.close()


def save_run(inputs, result):
    if not is_db_available():
        if not settings.sqlite_fallback_allowed:
            raise RuntimeError('PostgreSQL is required and no development fallback is allowed')
        run_id = str(uuid4())
        created = datetime.now(timezone.utc).isoformat()
        with sqlite_connection() as db:
            db.execute('INSERT INTO runs VALUES (?, ?, ?, ?)', (run_id, created,
                       json.dumps(inputs, allow_nan=False), json.dumps(result, allow_nan=False)))
        return {'run_id':run_id, 'created_at':created, 'status':'COMPLETED', 'storage':'LOCAL_SQLITE'}

    with get_db_session() as session:
        repo = ForecastRepository(session)
        return repo.save_run(inputs, result)


def get_run(run_id):
    if not is_db_available():
        if not settings.sqlite_fallback_allowed:
            raise RuntimeError('PostgreSQL is required and no development fallback is allowed')
        with sqlite_connection() as db:
            row = db.execute('SELECT created, input, result FROM runs WHERE id=?', (str(run_id),)).fetchone()
        if row is None:
            raise KeyError(str(run_id))
        return {'run_id':str(run_id), 'created_at':row[0], 'status':'COMPLETED',
                'input':json.loads(row[1]), 'result':json.loads(row[2])}

    with get_db_session() as session:
        repo = ForecastRepository(session)
        return repo.get_run(str(run_id))
