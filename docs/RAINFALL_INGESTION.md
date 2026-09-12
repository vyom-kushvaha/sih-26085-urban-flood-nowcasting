# Rainfall ingestion

`GET /api/v1/rainfall/current?lat=19.0182&lon=72.8455` fetches one
provider observation, validates it and stores an immutable JSON asset. When
PostGIS is configured, matching metadata is stored in `rainfall_frames`.

The default provider is Open-Meteo and is labelled `NWP_POINT` and
`PROVIDER_FORECAST`; it is not described as radar or an observed street-level
rain gauge. Set `RAINFALL_PRIMARY_PROVIDER=official` and configure
`RAINFALL_OFFICIAL_FEED_URL` only for a provider-approved JSON feed. The
official adapter expects `observed_at`, `rainfall_mm_hr` and optional
`valid_until`, `provider`, `source_type`, `quality` and `source_identifier`
fields.

Every response exposes observation/receipt/validity times, units, provider,
quality, freshness, cache status and warnings. A stale frame is returned as
`STALE` with `is_live=false`. If no provider returns a valid frame, the endpoint
returns HTTP 503; it does not manufacture rainfall.

Run one ingestion from the repository root:

```powershell
.\.venv\Scripts\python.exe scripts\ingest_rainfall.py --lat 19.0182 --lon 72.8455
```

Provider credentials stay in `.env` and must never be committed.
