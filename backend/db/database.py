"""SQLAlchemy session and PostgreSQL/PostGIS health helpers."""

from contextlib import contextmanager
from typing import Generator

from sqlalchemy import create_engine, text
from sqlalchemy.engine import Engine
from sqlalchemy.orm import DeclarativeBase, Session, sessionmaker

from backend.core.config import Settings, settings


class Base(DeclarativeBase):
    pass


def create_db_engine(config: Settings | None = None) -> Engine | None:
    config = config or settings
    config.validate_runtime()
    url = config.sqlalchemy_database_uri
    if not url:
        return None
    return create_engine(
        url,
        pool_pre_ping=True,
        pool_size=10,
        max_overflow=20,
        connect_args={"connect_timeout": config.db_connect_timeout_seconds},
    )


engine = create_db_engine()
SessionLocal = sessionmaker(bind=engine, expire_on_commit=False) if engine else None


def require_engine() -> Engine:
    if engine is None:
        raise RuntimeError("PostgreSQL is not configured")
    return engine


@contextmanager
def get_db_session() -> Generator[Session, None, None]:
    if SessionLocal is None:
        raise RuntimeError("PostgreSQL is not configured")
    session = SessionLocal()
    try:
        yield session
        session.commit()
    except Exception:
        session.rollback()
        raise
    finally:
        session.close()


def get_db() -> Generator[Session, None, None]:
    if SessionLocal is None:
        raise RuntimeError("PostgreSQL is not configured")
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()


def database_health() -> dict:
    if engine is None:
        return {
            "status": "UNCONFIGURED",
            "postgis_enabled": False,
            "fallback_allowed": settings.sqlite_fallback_allowed,
        }
    try:
        with engine.connect() as connection:
            connection.execute(text("SELECT 1"))
            postgis_version = connection.execute(
                text("SELECT PostGIS_Lib_Version()")
            ).scalar_one()
        return {
            "status": "CONNECTED",
            "postgis_enabled": True,
            "postgis_version": postgis_version,
            "fallback_allowed": settings.sqlite_fallback_allowed,
        }
    except Exception as exc:
        return {
            "status": "UNAVAILABLE",
            "postgis_enabled": False,
            "fallback_allowed": settings.sqlite_fallback_allowed,
            "reason": exc.__class__.__name__,
        }


def is_db_available() -> bool:
    return database_health()["status"] == "CONNECTED"
