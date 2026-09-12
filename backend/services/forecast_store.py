"""Local durable prototype run storage, separate from optional PostGIS logs."""
import json
import os
import sqlite3
from contextlib import contextmanager
from datetime import datetime, timezone
from pathlib import Path
from uuid import uuid4


@contextmanager
def connection():
    path = Path(os.getenv('FORECAST_DB_PATH', str(Path(__file__).resolve().parents[2] / 'data/runtime/forecasts.sqlite3')))
    path.parent.mkdir(parents=True, exist_ok=True)
    db = sqlite3.connect(path, timeout=5)
    try:
        db.execute('CREATE TABLE IF NOT EXISTS runs (id TEXT PRIMARY KEY, created TEXT NOT NULL, input TEXT NOT NULL, result TEXT NOT NULL)')
        with db:
            yield db
    finally:
        db.close()


def save_run(inputs, result):
    run_id = str(uuid4())
    created = datetime.now(timezone.utc).isoformat()
    with connection() as db:
        db.execute('INSERT INTO runs VALUES (?, ?, ?, ?)', (run_id, created,
                   json.dumps(inputs, allow_nan=False), json.dumps(result, allow_nan=False)))
    return {'run_id':run_id, 'created_at':created, 'status':'COMPLETED', 'storage':'LOCAL_SQLITE'}


def get_run(run_id):
    with connection() as db:
        row = db.execute('SELECT created, input, result FROM runs WHERE id=?', (str(run_id),)).fetchone()
    if row is None:
        raise KeyError(str(run_id))
    return {'run_id':str(run_id), 'created_at':row[0], 'status':'COMPLETED',
            'input':json.loads(row[1]), 'result':json.loads(row[2])}
