"""
Real-time Weather Data Ingestion & Forecast Service
Author: Vyom (Lead Architect & Flood Engine Lead)
Project: Urban Flood Nowcasting System (SIH26085)

This module handles:
1. Fetching live rainfall data (mm/hr) & 1h/3h/6h forecast timeline
2. OpenWeatherMap API integration with Open-Meteo fallback
3. 15-minute TTL In-memory Caching for API optimization
4. Simulated Mock Weather Fallback when no API keys are set or network fails
5. Strict Data Freshness & Quality Labels (source, timestamp, is_cached, is_mock)
"""

import sys
import os
import time
import requests
from typing import Dict, Any, Optional, List

# Cache TTL: 15 Minutes (900 Seconds)
CACHE_TTL_SECONDS = 900


class WeatherCacheEntry:
    """In-memory cache entry with timestamp TTL."""
    def __init__(self, data: Dict[str, Any]):
        self.data = data
        self.created_at = time.time()

    def is_expired(self, ttl: float = CACHE_TTL_SECONDS) -> bool:
        return (time.time() - self.created_at) > ttl


class WeatherService:
    """Weather Ingestion & Forecast Service with caching and fallback handling."""

    def __init__(self, owm_api_key: Optional[str] = None):
        self.owm_api_key = owm_api_key or os.getenv("OPENWEATHER_API_KEY")
        self._cache: Dict[str, WeatherCacheEntry] = {}
        self._forecast_cache: Dict[str, WeatherCacheEntry] = {}
        self._hourly_forecast_cache: Dict[str, WeatherCacheEntry] = {}

    def _get_cache_key(self, lat: float, lon: float) -> str:
        """Round coordinates to ~1km grid for effective caching."""
        return f"{round(lat, 2)},{round(lon, 2)}"

    def _fetch_open_meteo_free(self, lat: float, lon: float) -> Optional[Dict[str, Any]]:
        """
        Free secondary API fallback (Open-Meteo) requiring NO API KEY.
        """
        url = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current=precipitation,rain,showers&timezone=auto"
        try:
            res = requests.get(url, timeout=8)
            if res.status_code == 200:
                data = res.json()
                current = data.get("current", {})
                rain_mm_hr = float(current.get("precipitation", current.get("rain", 0.0)))
                timestamp = current.get("time", time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()))
                
                return {
                    "rainfall_mm_hr": round(rain_mm_hr, 2),
                    "temp_c": 28.0,
                    "condition": "Rainy" if rain_mm_hr > 0 else "Cloudy",
                    "humidity_pct": 85.0,
                    "source": "Open-Meteo API",
                    "timestamp": timestamp,
                    "is_mock": False
                }
        except Exception as e:
            print(f"[WeatherService] Open-Meteo fallback error: {e}")
        return None

    def _fetch_open_weather_map(self, lat: float, lon: float) -> Optional[Dict[str, Any]]:
        """
        Primary OpenWeatherMap API call.
        """
        if not self.owm_api_key:
            return None

        url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={self.owm_api_key}&units=metric"
        try:
            res = requests.get(url, timeout=6)
            if res.status_code == 200:
                data = res.json()
                rain_dict = data.get("rain", {})
                rain_1h = float(rain_dict.get("1h", 0.0))
                timestamp = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())

                return {
                    "rainfall_mm_hr": round(rain_1h, 2),
                    "temp_c": float(data.get("main", {}).get("temp", 28.0)),
                    "condition": data.get("weather", [{}])[0].get("main", "Clear"),
                    "humidity_pct": float(data.get("main", {}).get("humidity", 75.0)),
                    "source": "OpenWeatherMap API",
                    "timestamp": timestamp,
                    "is_mock": False
                }
        except Exception as e:
            print(f"[WeatherService] OpenWeatherMap API error: {e}")
        return None

    def _generate_mock_weather(self, lat: float, lon: float) -> Dict[str, Any]:
        """
        Simulated Weather Fallback Generator when APIs are unavailable or no API keys exist.
        """
        timestamp = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
        return {
            "rainfall_mm_hr": 35.0,
            "temp_c": 27.5,
            "condition": "Monsoon Heavy Showers",
            "humidity_pct": 90.0,
            "source": "SIMULATED_WEATHER_FALLBACK",
            "timestamp": timestamp,
            "is_mock": True,
            "disclaimer": "Simulated mock weather data used because live weather API key is not configured or network timed out."
        }

    def get_current_weather(self, lat: float, lon: float, force_refresh: bool = False) -> Dict[str, Any]:
        """
        Get current weather observation with caching, multi-source fallback, and freshness metadata.
        """
        cache_key = self._get_cache_key(lat, lon)
        
        # Check cache
        if not force_refresh and cache_key in self._cache:
            entry = self._cache[cache_key]
            if not entry.is_expired():
                result = dict(entry.data)
                result["is_cached"] = True
                result["cache_age_seconds"] = round(time.time() - entry.created_at, 1)
                return result

        # 1. Try Primary OpenWeatherMap API
        obs = self._fetch_open_weather_map(lat, lon)

        # 2. Try Free Open-Meteo API
        if not obs:
            obs = self._fetch_open_meteo_free(lat, lon)

        # 3. Use SIMULATED_WEATHER_FALLBACK
        if not obs:
            obs = self._generate_mock_weather(lat, lon)

        # Save to cache
        self._cache[cache_key] = WeatherCacheEntry(obs)
        
        result = dict(obs)
        result["is_cached"] = False
        result["cache_age_seconds"] = 0.0
        return result

    def get_weather_forecast(self, lat: float, lon: float, force_refresh: bool = False) -> Dict[str, Any]:
        """
        Get 1h, 3h, and 6h rainfall forecast timeline with caching and explicit forecast_method metadata.
        """
        cache_key = self._get_cache_key(lat, lon)
        
        if not force_refresh and cache_key in self._forecast_cache:
            entry = self._forecast_cache[cache_key]
            if not entry.is_expired():
                result = dict(entry.data)
                result["is_cached"] = True
                result["cache_age_seconds"] = round(time.time() - entry.created_at, 1)
                return result

        # Fetch current rainfall base
        current = self.get_current_weather(lat, lon, force_refresh=force_refresh)
        base_rain = current["rainfall_mm_hr"]
        timestamp = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())

        # Construct 1h, 3h, 6h forecast timeline
        timeline = [
            {"period": "1 Hour Nowcast", "hours_ahead": 1, "predicted_rainfall_mm_hr": round(base_rain, 1)},
            {"period": "3 Hour Forecast", "hours_ahead": 3, "predicted_rainfall_mm_hr": round(base_rain * 0.85, 1)},
            {"period": "6 Hour Forecast", "hours_ahead": 6, "predicted_rainfall_mm_hr": round(base_rain * 0.60, 1)},
        ]

        forecast_data = {
            "source": "HEURISTIC_NOWCAST_FALLBACK",
            "forecast_method": "HEURISTIC_NOWCAST_FALLBACK",
            "ingestion_source": current["source"],
            "timestamp": timestamp,
            "is_mock": current["is_mock"],
            "nowcast_timeline": timeline,
            "disclaimer": "3h and 6h values are artificially calculated with x0.85 and x0.60 decay multipliers based on current weather observation; not provider hourly forecast."
        }

        self._forecast_cache[cache_key] = WeatherCacheEntry(forecast_data)
        
        result = dict(forecast_data)
        result["is_cached"] = False
        result["cache_age_seconds"] = 0.0
        return result

    def _fetch_open_meteo_hourly_forecast(self, lat: float, lon: float, count: int = 4) -> Optional[List[Dict[str, Any]]]:
        """
        Fetch real meteorological hourly precipitation forecast from Open-Meteo API.
        Extracts up to `count` consecutive hours starting from current hour (T+0).
        """
        url = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&hourly=precipitation,rain&forecast_days=2&timezone=auto"
        try:
            res = requests.get(url, timeout=8)
            if res.status_code == 200:
                data = res.json()
                hourly = data.get("hourly", {})
                times = hourly.get("time", [])
                precip = hourly.get("precipitation", [])

                if not times or not precip:
                    return None

                import datetime
                now_prefix = datetime.datetime.now().strftime("%Y-%m-%dT%H:00")
                start_idx = 0
                for i, t in enumerate(times):
                    if t >= now_prefix:
                        start_idx = i
                        break

                forecast_items = []
                for h in range(count):
                    idx = start_idx + h
                    if idx < len(times):
                        timestamp = times[idx]
                        rain_val = float(precip[idx]) if idx < len(precip) else 0.0
                    else:
                        timestamp = f"T+{h}h"
                        rain_val = 0.0

                    forecast_items.append({
                        "hour": h,
                        "lead_time": "NOW" if h == 0 else f"+{h} HOUR" if h == 1 else f"+{h} HOURS",
                        "timestamp": timestamp,
                        "rainfall_mm_hr": max(0.0, round(rain_val, 2)),
                        "source": "Open-Meteo API (Numerical Weather Model)",
                        "is_mock": False
                    })
                return forecast_items
        except Exception as e:
            print(f"[WeatherService] Open-Meteo hourly forecast fetch error: {e}")
        return None

    def _generate_mock_hourly_forecast(self, lat: float, lon: float, count: int = 4) -> List[Dict[str, Any]]:
        """
        Simulated weather forecast fallback when live meteorological APIs are unreachable.
        """
        import datetime
        now_dt = datetime.datetime.now()
        base_pattern = [35.0, 45.0, 55.0, 30.0]
        items = []
        for h in range(count):
            hour_dt = now_dt + datetime.timedelta(hours=h)
            rain_val = base_pattern[h % len(base_pattern)]
            items.append({
                "hour": h,
                "lead_time": "NOW" if h == 0 else f"+{h} HOUR" if h == 1 else f"+{h} HOURS",
                "timestamp": hour_dt.strftime("%Y-%m-%dT%H:00:00Z"),
                "rainfall_mm_hr": rain_val,
                "source": "SIMULATED_WEATHER_FALLBACK",
                "is_mock": True,
                "disclaimer": "Simulated mock rainfall forecast used because live weather service is unreachable."
            })
        return items

    def get_hourly_rainfall_forecast(self, lat: float, lon: float, hours: int = 4, force_refresh: bool = False) -> List[Dict[str, Any]]:
        """
        Get 0 to (hours-1) lead-time hourly rainfall forecast.
        Distinguishes real numerical weather prediction vs simulated fallback.
        """
        cache_key = f"{self._get_cache_key(lat, lon)}_h{hours}"
        if not force_refresh and cache_key in self._hourly_forecast_cache:
            entry = self._hourly_forecast_cache[cache_key]
            if not entry.is_expired():
                return [dict(item) for item in entry.data]

        items = self._fetch_open_meteo_hourly_forecast(lat, lon, count=hours)
        if not items:
            items = self._generate_mock_hourly_forecast(lat, lon, count=hours)

        self._hourly_forecast_cache[cache_key] = WeatherCacheEntry(items)
        return [dict(item) for item in items]


# Singleton Instance
_global_weather_service = None

def get_weather_service(owm_api_key: Optional[str] = None) -> WeatherService:
    global _global_weather_service
    if _global_weather_service is None or owm_api_key is not None:
        _global_weather_service = WeatherService(owm_api_key=owm_api_key)
    return _global_weather_service

# Ensure consistent module registration whether imported as 'services.weather_service' or 'backend.services.weather_service'
if "backend.services.weather_service" in sys.modules and "services.weather_service" not in sys.modules:
    sys.modules["services.weather_service"] = sys.modules["backend.services.weather_service"]
elif "services.weather_service" in sys.modules and "backend.services.weather_service" not in sys.modules:
    sys.modules["backend.services.weather_service"] = sys.modules["services.weather_service"]
