"""
Deterministic Unit Tests for Weather Ingestion Service & Forecast API
Author: Vyom (Lead Architect & Flood Engine Lead)
Project: Urban Flood Nowcasting System (SIH26085)
"""

import sys
import os
import asyncio
from unittest.mock import patch, MagicMock

# Add project subdirectories to sys.path
sys.path.append(os.path.join(os.path.dirname(__file__), "..", "backend"))
sys.path.append(os.path.join(os.path.dirname(__file__), ".."))

from services.weather_service import WeatherService, get_weather_service
from routers.weather import get_current_weather_endpoint, get_weather_forecast_endpoint


@patch("requests.get")
def test_open_weather_map_mocked(mock_get):
    """Test 1: Deterministic test for primary OpenWeatherMap API using HTTP mock."""
    mock_resp = MagicMock()
    mock_resp.status_code = 200
    mock_resp.json.return_value = {
        "rain": {"1h": 42.5},
        "main": {"temp": 29.0, "humidity": 80.0},
        "weather": [{"main": "Thunderstorm"}]
    }
    mock_get.return_value = mock_resp

    service = WeatherService(owm_api_key="mock_test_key_123")
    res = service.get_current_weather(lat=19.0760, lon=72.8777, force_refresh=True)

    assert res["rainfall_mm_hr"] == 42.5
    assert res["source"] == "OpenWeatherMap API"
    assert res["is_mock"] is False
    assert res["temp_c"] == 29.0
    print("  [PASS] Test 1: OpenWeatherMap Deterministic HTTP Mocking")


@patch("requests.get")
def test_open_meteo_fallback_mocked(mock_get):
    """Test 2: Deterministic test for secondary Open-Meteo fallback using HTTP mock."""
    mock_resp = MagicMock()
    mock_resp.status_code = 200
    mock_resp.json.return_value = {
        "current": {"precipitation": 18.2, "time": "2026-09-02T21:00:00Z"}
    }
    mock_get.return_value = mock_resp

    service = WeatherService(owm_api_key=None)
    res = service.get_current_weather(lat=19.0760, lon=72.8777, force_refresh=True)

    assert res["rainfall_mm_hr"] == 18.2
    assert res["source"] == "Open-Meteo API"
    assert res["is_mock"] is False
    print("  [PASS] Test 2: Open-Meteo Secondary Fallback HTTP Mocking")


@patch("requests.get")
def test_simulated_weather_fallback(mock_get):
    """Test 3: Deterministic test for SIMULATED_WEATHER_FALLBACK when all HTTP requests fail/timeout."""
    mock_get.side_effect = Exception("Connection Timeout")

    service = WeatherService(owm_api_key=None)
    res = service.get_current_weather(lat=19.0760, lon=72.8777, force_refresh=True)

    assert res["is_mock"] is True
    assert res["source"] == "SIMULATED_WEATHER_FALLBACK"
    assert res["rainfall_mm_hr"] == 35.0
    assert "disclaimer" in res
    print("  [PASS] Test 3: Simulated Weather Fallback on Network Exception")


@patch("requests.get")
def test_weather_forecast_endpoint_mocked(mock_get):
    """Test 4: Verify /weather/forecast endpoint handler with explicit HEURISTIC_NOWCAST_FALLBACK metadata."""
    mock_resp = MagicMock()
    mock_resp.status_code = 200
    mock_resp.json.return_value = {
        "current": {"precipitation": 20.0, "time": "2026-09-02T21:00:00Z"}
    }
    mock_get.return_value = mock_resp

    res = asyncio.run(get_weather_forecast_endpoint(lat=19.0760, lon=72.8777, force_refresh=True))

    assert "coordinates" in res
    assert "forecast" in res
    forecast = res["forecast"]
    assert forecast["forecast_method"] == "HEURISTIC_NOWCAST_FALLBACK"
    assert forecast["source"] == "HEURISTIC_NOWCAST_FALLBACK"
    assert "artificially calculated" in forecast["disclaimer"]
    assert len(forecast["nowcast_timeline"]) == 3
    print("  [PASS] Test 4: Weather Forecast Timeline Endpoint & Forecast Method Verification")


if __name__ == "__main__":
    print("=== RUNNING DETERMINISTIC WEATHER SERVICE UNIT TESTS ===")
    test_open_weather_map_mocked()
    test_open_meteo_fallback_mocked()
    test_simulated_weather_fallback()
    test_weather_forecast_endpoint_mocked()
    print("\n[SUCCESS] ALL DETERMINISTIC WEATHER UNIT TESTS PASSED SUCCESSFULLY!")
