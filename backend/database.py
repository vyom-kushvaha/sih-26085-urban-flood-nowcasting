"""Compatibility facade for the original database module.

New code should import from :mod:`backend.db.database` and
:mod:`backend.db.repositories` directly.
"""

import os
from typing import Any

from backend.db.database import database_health, get_db_session, is_db_available
from backend.db.repositories import RiskRepository


def get_db_password() -> str | None:
    return os.getenv("DB_PASSWORD") or os.getenv("POSTGRES_PASSWORD")


def check_db_health() -> dict[str, Any]:
    return database_health()


def log_risk_calculation_db(risk_payload: dict[str, Any]) -> str:
    if not is_db_available():
        return "SKIPPED_DB_UNAVAILABLE"
    with get_db_session() as session:
        return RiskRepository(session).log_risk_calculation(risk_payload)


def initialize_schema_sql(schema_path: str = "data/schema.sql") -> dict[str, Any]:
    return {
        "status": "DEPRECATED",
        "reason": "Use `alembic upgrade head`; raw schema initialization is disabled.",
        "schema_path": schema_path,
    }
