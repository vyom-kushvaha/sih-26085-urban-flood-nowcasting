import os
from datetime import datetime, timezone
from fastapi import APIRouter, HTTPException
import httpx

router = APIRouter(prefix="/weather", tags=["weather"])


@router.get("/current")
async def get_current_weather(
    lat: float = 19.0760,
    lon: float = 72.8777,
):
    api_key = os.getenv("OPENWEATHER_API_KEY")
    if not api_key:
        raise HTTPException(
            status_code=500,
            detail="OPENWEATHER_API_KEY environment variable is not configured.",
        )

    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            response = await client.get(
                "https://api.openweathermap.org/data/2.5/weather",
                params={
                    "lat": lat,
                    "lon": lon,
                    "appid": api_key,
                    "units": "metric",
                },
            )
    except httpx.RequestError:
        raise HTTPException(
            status_code=502,
            detail="Failed to communicate with OpenWeather API service.",
        )

    if response.status_code != 200:
        raise HTTPException(
            status_code=502,
            detail=f"OpenWeather API returned an error (status code: {response.status_code}).",
        )

    data = response.json()

    # Extract 1-hour rainfall if available, default to 0
    rain_data = data.get("rain") or {}
    rainfall_1h = rain_data.get("1h", 0)
    if rainfall_1h is None:
        rainfall_1h = 0

    # Extract weather description
    weather_entries = data.get("weather") or []
    weather_desc = (
        weather_entries[0].get("description", "") if weather_entries else ""
    )

    # Format observation timestamp
    dt_val = data.get("dt")
    if dt_val:
        observed_at = datetime.fromtimestamp(dt_val, tz=timezone.utc).isoformat()
    else:
        observed_at = datetime.now(timezone.utc).isoformat()

    return {
        "latitude": data.get("coord", {}).get("lat", lat),
        "longitude": data.get("coord", {}).get("lon", lon),
        "temperature": data.get("main", {}).get("temp"),
        "humidity": data.get("main", {}).get("humidity"),
        "rainfall_1h": rainfall_1h,
        "wind_speed": data.get("wind", {}).get("speed"),
        "weather_description": weather_desc,
        "observed_at": observed_at,
    }
