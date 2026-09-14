"""Migrate before accepting requests; a failed migration must fail the deploy."""
import os
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from alembic import command
from alembic.config import Config
from backend.core.config import settings


def main():
    settings.validate_runtime()
    if not settings.is_production:
        raise RuntimeError('Production launcher requires ENV=production')
    if not settings.municipal_api_token or len(settings.municipal_api_token) < 32:
        raise RuntimeError('Configure a random MUNICIPAL_API_TOKEN of at least 32 characters')
    command.upgrade(Config('alembic.ini'), 'head')
    # One worker keeps the OSM extract and rate limiter within the free instance.
    os.execv(sys.executable, [sys.executable, '-m', 'uvicorn', 'backend.main:app',
             '--host', '0.0.0.0', '--port', os.environ.get('PORT', '8000'),
             '--workers', '1', '--no-server-header', '--limit-concurrency', '24'])


if __name__ == '__main__':
    main()
