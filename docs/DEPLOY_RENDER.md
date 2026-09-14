# Deploy the Urban Flood Nowcasting website on Render

The repository includes a Render Blueprint in `render.yaml`. It deploys the FastAPI API and the frontend together as one web service using `gunicorn`/`uvicorn` behind the scenes.

## Production Requirements & Environment Variables

This deployment uses Render's Free Web Service for backend/frontend and Neon's Free PostgreSQL for the database.
**To ensure production readiness, the SQLite fallback is disabled.** 

You must define the following required environment variables for the Render service:

*   `ENV`: Set to `production`.
*   `DATABASE_URL`: Set to your Neon Postgres connection string (e.g., `postgresql+psycopg2://user:pass@ep-host.region.aws.neon.tech/dbname`).
*   `ALLOW_SQLITE_FALLBACK`: Set to `false`.
*   `MUNICIPAL_API_TOKEN`: A secure, random token (minimum 32 characters) for the Municipal Dashboard. 
*   `CORS_ORIGINS`: Set to your deployed site's origin (or leave empty if API and frontend share the same origin, as in this monolithic deployment).
*   `PYTHON_VERSION`: `3.12.14` (Set in `render.yaml` automatically).

## Before deployment

1. Push the deployment changes to the `main` branch on GitHub.
2. Sign in to your Neon account and create a free PostgreSQL database. Copy the connection string.
3. Sign in to Render and choose **New > Blueprint**.
4. Connect `vyom-kushvaha/sih-26085-urban-flood-nowcasting`.
5. Render will read `render.yaml`. The required environment variables like `DATABASE_URL` and `MUNICIPAL_API_TOKEN` will be requested or generated.
6. Provide your Neon Database URL and verify the service name, then choose **Apply**.

After the build completes, Alembic migrations will run automatically on the Neon database via the start script (`scripts/start_production.py`).

Verify these URLs using the hostname Render assigns:

- `/` — website
- `/health` — process health
- `/readiness` — database/readiness details
- `/docs` — API documentation

## Known Limitations and Free Hosting

- **Spin-down delay**: Render's free tier spins down web services after 15 minutes of inactivity. The next request might take up to 50 seconds to respond as the service wakes up.
- **Neon Compute**: The free Neon Postgres database automatically suspends compute when idle. Queries may take longer during cold starts.
- **Data Persistence**: Forecast runs, reports, and notices are now fully stored in the Neon database. The ephemeral `/tmp` directory is no longer used for core application states, meaning they persist across Render spins/deploys.
- **Operational claims**: The map does *not* claim official flood predictions. The current models act as prototypes for judging rainfall, without validated terrain capacities or official radar loops.

## Local production-style check

From the repository root (using PowerShell):

```powershell
$env:ENV = "production"
$env:ALLOW_SQLITE_FALLBACK = "false"
$env:MUNICIPAL_API_TOKEN = "your-secure-32-char-token-for-local-test"
$env:DATABASE_URL = "postgresql+psycopg2://user:pass@localhost:5432/dbname" 
# (Replace with your local Postgres URL or Neon DB URL)
.\.venv\Scripts\python.exe scripts/start_production.py
```

Open `http://127.0.0.1:8000/` and check `http://127.0.0.1:8000/health`.
