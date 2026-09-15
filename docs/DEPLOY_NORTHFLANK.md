# No-sleep free deployment: Northflank Sandbox

This is the preferred first deployment target for the current requirement: the backend must stay online even when the site is idle. Northflank's Sandbox tier currently advertises always-on compute with no sleeping, two free services, one free database, and two free cron jobs.

Use the Dockerfile deployment path. The app serves the FastAPI API and the frontend from the same service.

## Target Architecture

```text
GitHub repository
  -> Northflank service built from Dockerfile
  -> Northflank public HTTPS URL
  -> PostgreSQL/PostGIS database
```

For the database, use either:

- Northflank free PostgreSQL database/addon if PostGIS is available in the account.
- Neon Free PostgreSQL if Northflank's free database does not expose PostGIS.

## Required Runtime Variables

Set these on the Northflank service:

```text
ENV=production
ALLOW_SQLITE_FALLBACK=false
DATABASE_URL=<postgresql+psycopg2 connection URL>
MUNICIPAL_API_TOKEN=<random 32+ character secret>
CORS_ORIGINS=
FORECAST_ASSETS_PATH=/tmp/urban-flood/runs
RAINFALL_STORE_PATH=/tmp/urban-flood/rainfall
PYTHONUNBUFFERED=1
```

Leave `CORS_ORIGINS` empty for the single-service deployment because frontend and API share the same origin.

Do not paste secrets into chat. Add them directly in the Northflank dashboard.

## Northflank Service Settings

Create one service from the GitHub repository:

```text
Repository: vyom-kushvaha/sih-26085-urban-flood-nowcasting
Branch: main
Build type: Dockerfile
Dockerfile path: Dockerfile
Build context: .
Public port: 8000
Health check path: /health
Start command: use Dockerfile CMD
```

The app also reads a provider-supplied `PORT` environment variable. If Northflank requires a different public port, set `PORT` to that value and expose the same port.

## Database Steps

1. Create PostgreSQL database.
2. Enable PostGIS:

```sql
CREATE EXTENSION IF NOT EXISTS postgis;
```

3. Copy the connection string.
4. Convert it to SQLAlchemy/psycopg2 form if needed:

```text
postgresql+psycopg2://USER:PASSWORD@HOST:PORT/DBNAME?sslmode=require
```

5. Add it as `DATABASE_URL`.

The production launcher runs `alembic upgrade head` before accepting requests.

## Verify After Deploy

Open these URLs on the Northflank domain:

```text
/
/health
/readiness
/docs
```

Expected:

- `/health` returns `OPERATIONAL`.
- `/readiness` returns `READY`.
- `/` loads the web app.
- Forecast/report data persists after redeploy.

## Fallback: Oracle Always Free

If Northflank signup, quota, or PostGIS blocks the deployment, use Oracle Cloud Always Free with Docker Compose, Nginx, and PostgreSQL/PostGIS on one VM. It is stronger but slower to set up and Oracle may reclaim idle Always Free compute if it remains under their idle thresholds for a sustained period.
