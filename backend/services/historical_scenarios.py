"""
Historical Flood Scenarios Service & Provenance Registry
Author: Vyom (Lead Architect & Flood Engine Lead)
Project: Urban Flood Nowcasting System (SIH26085)

Authoritative historical scenario data derived strictly from:
1. IMD MAUSAM (Diamond Jubilee Vol. 60, 2009, pp. 33-58, Table 7, p. 52): 26 July 2005 3-hourly observations (Santacruz 944.2mm).
2. Ministry of Home Affairs (MHA) GoI Annual Report 2005–2006 (Sec 7.44): 944mm 24-hr record.
3. National Institute of Disaster Management (NIDM) Annual Report: Historical flood disaster context.
4. MOSDAC / SAC / ISRO Report (August 2017): AWS Thane observed burst rates (50-100 mm/hr), satellite nowcasting alerts.
5. IMD Mumbai Extreme Weather Records: August 2017 24-hour maximum (331.4 mm), monthly total (950.3 mm).
6. Press Information Bureau (PIB) GoI Release (PRID=1630928): IFLOWS-Mumbai benchmark events.

Strict Data Integrity Rules:
- NO fabricated values.
- OBSERVED vs MODELLED vs FORECAST strictly distinguished.
- Authoritative flood-depth ground truth is reported as NOT AVAILABLE.
- Validation status: "Historical rainfall replay implemented; historical flood-depth validation dataset unavailable."
"""

import os
import json
from typing import Dict, Any, List, Optional

_SCENARIOS_CACHE: Optional[Dict[str, Any]] = None
_SCENARIOS_FILE = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "data", "historical_scenarios.json"))


def load_historical_scenarios() -> Dict[str, Any]:
    """Load and cache historical scenarios from authoritative JSON registry."""
    global _SCENARIOS_CACHE
    if _SCENARIOS_CACHE is None:
        if not os.path.exists(_SCENARIOS_FILE):
            raise FileNotFoundError(f"Historical scenarios registry not found at {_SCENARIOS_FILE}")
        with open(_SCENARIOS_FILE, "r", encoding="utf-8") as f:
            _SCENARIOS_CACHE = json.load(f)
    return _SCENARIOS_CACHE


def get_historical_scenarios() -> List[Dict[str, Any]]:
    """Return list of all registered historical flood scenarios with provenance metadata."""
    data = load_historical_scenarios()
    return data.get("scenarios", [])


def get_historical_scenario(scenario_id: str) -> Optional[Dict[str, Any]]:
    """Return single scenario by ID (e.g. '2005_deluge' or '2017_flood')."""
    scenarios = get_historical_scenarios()
    for sc in scenarios:
        if sc.get("scenario_id") == scenario_id:
            return sc
    return None


def get_scenario_replay_rainfall(scenario_id: str, timestep: Optional[str] = None) -> Dict[str, Any]:
    """
    Extract source-derived rainfall rate (mm/hr) for replaying through the physical flood engine.
    
    Parameters:
    - scenario_id: '2005_deluge' or '2017_flood'
    - timestep: 'peak_burst' (default), 'daily_average', 'sustained_deluge', or specific timestamp.
    
    Returns:
    Dict containing:
    - rainfall_mm_hr: float
    - scenario_id: str
    - event_name: str
    - source_label: str
    - data_type: str ('OBSERVED', 'MODELLED', etc.)
    - validation_status: str
    - historical_flood_depth_ground_truth: str ('NOT AVAILABLE')
    """
    sc = get_historical_scenario(scenario_id)
    if not sc:
        raise ValueError(f"Unknown scenario ID: {scenario_id}. Available: ['2005_deluge', '2017_flood']")

    inputs = sc.get("scenario_inputs", {})
    mode = (timestep or "peak_burst").lower()

    if scenario_id == "2005_deluge":
        if mode in ["daily_average", "24h_average", "average"]:
            rain_rate = inputs.get("daily_average_mm_hr", 39.34)
            label = "24-Hour Average (944.2 mm / 24h = 39.3 mm/hr)"
        elif mode in ["sustained_deluge", "post_burst"]:
            rain_rate = inputs.get("sustained_deluge_mm_hr", 72.53)
            label = "1200-1500 UTC Continuation (72.5 mm/hr)"
        else: # default peak_burst
            rain_rate = inputs.get("peak_burst_mm_hr", 143.9)
            label = "IMD Observed Peak Cloudburst Burst (143.9 mm/hr, 0900-1200 UTC)"
        source_label = "IMD MAUSAM Vol. 60 Table 7 / MHA Annual Report 2005-06"
        data_type = "OBSERVED"

    elif scenario_id == "2017_flood":
        if mode in ["daily_average", "24h_average", "average"]:
            rain_rate = inputs.get("daily_average_mm_hr", 13.81)
            label = "24-Hour Average (331.4 mm / 24h = 13.8 mm/hr)"
        elif mode in ["moderate_burst"]:
            rain_rate = inputs.get("moderate_burst_mm_hr", 65.0)
            label = "IMD AWS Thane Moderate Burst (65.0 mm/hr)"
        else: # default peak_burst
            rain_rate = inputs.get("peak_burst_mm_hr", 100.0)
            label = "IMD AWS Thane Peak Observed Burst (100.0 mm/hr)"
        source_label = "MOSDAC/ISRO AWS Thane / IMD Mumbai Extreme Record"
        data_type = "OBSERVED"
    else:
        rain_rate = 50.0
        label = "Custom Scenario"
        source_label = "Generic Input"
        data_type = "SCENARIO INPUT"

    return {
        "scenario_id": scenario_id,
        "event_name": sc.get("event_name"),
        "rainfall_mm_hr": float(rain_rate),
        "timestep": mode,
        "timestep_label": label,
        "source_label": source_label,
        "data_type": data_type,
        "recommended_blockage_pct": inputs.get("recommended_blockage_pct", 40.0),
        "historical_flood_depth_ground_truth": sc.get("validation", {}).get("historical_flood_depth_ground_truth", "NOT AVAILABLE"),
        "validation_status": sc.get("validation", {}).get("validation_status", "Historical rainfall replay implemented; historical flood-depth validation dataset unavailable."),
        "accuracy_percentage": sc.get("validation", {}).get("accuracy_percentage", None),
        "sources": [s.get("url") for s in sc.get("data_sources", [])]
    }
