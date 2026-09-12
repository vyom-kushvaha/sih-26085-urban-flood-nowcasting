"""Environment-backed application configuration."""

from functools import lru_cache
from typing import Literal
from urllib.parse import quote_plus

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    env: Literal["development", "test", "production"] = "development"
    database_url: str | None = None
    db_host: str = "localhost"
    db_port: int = 5432
    db_name: str = "urban_flood_db"
    db_user: str = "postgres"
    db_password: str | None = None
    db_connect_timeout_seconds: int = 3
    allow_sqlite_fallback: bool = True
    forecast_db_path: str | None = None
    forecast_assets_path: str | None = None
    rainfall_primary_provider: Literal["open_meteo", "official"] = "open_meteo"
    rainfall_official_feed_url: str | None = None
    rainfall_official_feed_token: str | None = None
    rainfall_store_path: str = "data/runtime/rainfall"
    rainfall_stale_after_minutes: int = 30
    rainfall_http_timeout_seconds: float = 8.0
    cors_origins: str = "http://127.0.0.1:8000,http://localhost:8000"

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
        case_sensitive=False,
    )

    @property
    def is_production(self) -> bool:
        return self.env == "production"

    @property
    def sqlite_fallback_allowed(self) -> bool:
        return self.allow_sqlite_fallback and not self.is_production

    @property
    def cors_origin_list(self) -> list[str]:
        return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]

    @property
    def sqlalchemy_database_uri(self) -> str | None:
        if self.database_url:
            return self.database_url
        if not self.db_password:
            return None
        return (
            f"postgresql+psycopg2://{quote_plus(self.db_user)}:"
            f"{quote_plus(self.db_password)}@{self.db_host}:{self.db_port}/{self.db_name}"
        )

    def validate_runtime(self) -> None:
        if self.is_production and not self.sqlalchemy_database_uri:
            raise RuntimeError("DATABASE_URL or DB_PASSWORD is required in production")
        if self.is_production and self.allow_sqlite_fallback:
            raise RuntimeError("ALLOW_SQLITE_FALLBACK must be false in production")


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
