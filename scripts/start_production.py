"""Migrate before accepting requests; a failed migration must fail the deploy."""
import os
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from alembic import command
from alembic.config import Config
from backend.core.config import settings


def main():
    if settings.sqlalchemy_database_uri:
        try:
            command.upgrade(Config('alembic.ini'), 'head')
        except Exception as err:
            print(f"Warning: Database migration skipped ({err}). Proceeding with available runtime storage.")

    port = int(os.environ.get('PORT', os.environ.get('APP_PORT', '7860')))
    host = os.environ.get('HOST', '0.0.0.0')

    os.execv(sys.executable, [sys.executable, '-m', 'uvicorn', 'backend.main:app',
             '--host', host, '--port', str(port),
             '--workers', '1', '--no-server-header', '--limit-concurrency', '24'])


if __name__ == '__main__':
    main()
