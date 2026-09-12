# Deploy the Urban Flood Nowcasting website on Render

The repository includes a Render Blueprint in `render.yaml`. It deploys the FastAPI API and the frontend together as one web service.

## Before deployment

1. Push the deployment changes to the `main` branch on GitHub.
2. Sign in to Render and choose **New > Blueprint**.
3. Connect `vyom-kushvaha/sih-26085-urban-flood-nowcasting`.
4. Render will read `render.yaml`. Review the service name and choose **Apply**.
5. `OPENWEATHER_API_KEY` is optional for the current UI. Add it later under the service's **Environment** settings only if you have a valid key.

After the build completes, verify these URLs using the hostname Render assigns:

- `/` — website
- `/health` — process health
- `/readiness` — database/readiness details
- `/docs` — API documentation

## Current deployment profile

The Blueprint uses Render's free web service and development fallback storage so the current demo can be published without provisioning a database. Forecast and rainfall records are written under `/tmp` and can disappear whenever the service restarts, redeploys, or spins down.

For persistent live data, provision PostgreSQL with PostGIS, set `DATABASE_URL`, set `ENV=production`, and set `ALLOW_SQLITE_FALLBACK=false`. Run `alembic upgrade head` during deployment before relying on database-backed endpoints.

## Local production-style check

From the repository root:

```powershell
$env:ENV = "development"
$env:ALLOW_SQLITE_FALLBACK = "true"
$env:FORECAST_DB_PATH = "$env:TEMP\urban-flood\forecasts.sqlite3"
$env:RAINFALL_STORE_PATH = "$env:TEMP\urban-flood\rainfall"
.\.venv\Scripts\python.exe -m uvicorn backend.main:app --host 127.0.0.1 --port 8000
```

Open `http://127.0.0.1:8000/` and check `http://127.0.0.1:8000/health`.
