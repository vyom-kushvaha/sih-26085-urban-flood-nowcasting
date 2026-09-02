"""
PostgreSQL + PostGIS Database Connection & Persistence Service
Author: Vyom (Lead Architect & Flood Engine Lead)
Project: Urban Flood Nowcasting System (SIH26085)

This module handles:
1. Environment configuration (.env driven) with password naming resolution (DB_PASSWORD / POSTGRES_PASSWORD)
2. Safe connection pooling with 3-second connection timeout
3. Graceful offline fallback (APIs don't crash if DB/driver is not running)
4. Schema initialization & Spatial PostGIS query helpers
5. Risk & Weather logging with persistence quality labels
"""

import os
import sys
from typing import Optional, Dict, Any, Tuple

# Try importing psycopg2 driver gracefully
try:
    import psycopg2
    from psycopg2 import pool, extras
    PSYCOPG2_INSTALLED = True
except ImportError:
    psycopg2 = None
    pool = None
    extras = None
    PSYCOPG2_INSTALLED = False

# Read Environment Configuration
DB_NAME = os.getenv("DB_NAME", "flood_nowcasting")
DB_USER = os.getenv("DB_USER", "postgres")
DB_HOST = os.getenv("DB_HOST", "localhost")
DB_PORT = int(os.getenv("DB_PORT", "5432"))


def get_db_password() -> Optional[str]:
    """
    Resolves password naming mismatch gracefully.
    Checks DB_PASSWORD first, then POSTGRES_PASSWORD.
    """
    return os.getenv("DB_PASSWORD") or os.getenv("POSTGRES_PASSWORD") or None


# Global Connection Pool Container
_db_pool: Any = None
_db_available: Optional[bool] = None


def init_db_pool() -> bool:
    """Initialize PostgreSQL connection pool if credentials and driver are available."""
    global _db_pool, _db_available
    if not PSYCOPG2_INSTALLED:
        _db_available = False
        return False

    password = get_db_password()
    if not password:
        _db_available = False
        return False

    try:
        _db_pool = pool.SimpleConnectionPool(
            minconn=1,
            maxconn=10,
            dbname=DB_NAME,
            user=DB_USER,
            password=password,
            host=DB_HOST,
            port=DB_PORT,
            connect_timeout=3
        )
        _db_available = True
        print(f"[Database] Connection pool initialized for '{DB_NAME}' on {DB_HOST}:{DB_PORT}")
        return True
    except Exception as e:
        _db_available = False
        print(f"[Database] DB connection pool init skipped ({e}). Operating in offline mode.")
        return False


def get_db_connection():
    """
    Gets a connection from the pool or opens a direct connection.
    Throws Exception if server or driver is unreachable.
    """
    if not PSYCOPG2_INSTALLED:
        raise RuntimeError("psycopg2 module is not installed.")

    password = get_db_password()
    if not password:
        raise ValueError("Database password (DB_PASSWORD or POSTGRES_PASSWORD) is not set.")

    global _db_pool
    if _db_pool is not None:
        return _db_pool.getconn()
    
    # Direct connection fallback with 3s timeout
    return psycopg2.connect(
        dbname=DB_NAME,
        user=DB_USER,
        password=password,
        host=DB_HOST,
        port=DB_PORT,
        connect_timeout=3
    )


def release_db_connection(conn):
    """Safely return connection to pool or close direct connection."""
    if conn is None or not PSYCOPG2_INSTALLED:
        return
    global _db_pool
    if _db_pool is not None:
        try:
            _db_pool.putconn(conn)
            return
        except Exception:
            pass
    try:
        conn.close()
    except Exception:
        pass


def check_db_health() -> Dict[str, Any]:
    """
    Tests live PostgreSQL + PostGIS server connection.
    Returns status dict with PostGIS version if available.
    """
    if not PSYCOPG2_INSTALLED:
        return {
            "status": "UNAVAILABLE",
            "reason": "psycopg2 Python driver is not installed in environment",
            "postgis_enabled": False
        }

    password = get_db_password()
    if not password:
        return {
            "status": "UNAVAILABLE",
            "reason": "Missing DB_PASSWORD / POSTGRES_PASSWORD environment variable",
            "postgis_enabled": False
        }

    conn = None
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # Test basic connection
        cursor.execute("SELECT 1;")
        cursor.fetchone()
        
        # Check PostGIS extension version
        postgis_version = None
        try:
            cursor.execute("SELECT PostGIS_Full_Version();")
            postgis_version = cursor.fetchone()[0]
        except Exception:
            conn.rollback()

        cursor.close()
        release_db_connection(conn)

        return {
            "status": "CONNECTED",
            "dbname": DB_NAME,
            "host": DB_HOST,
            "port": DB_PORT,
            "postgis_enabled": postgis_version is not None,
            "postgis_version": postgis_version
        }
    except Exception as e:
        release_db_connection(conn)
        return {
            "status": "UNAVAILABLE",
            "reason": str(e),
            "postgis_enabled": False
        }


def initialize_schema_sql(schema_path: str = "data/schema.sql") -> Dict[str, Any]:
    """Executes data/schema.sql to create tables and spatial indexes."""
    health = check_db_health()
    if health["status"] != "CONNECTED":
        return {"status": "SKIPPED", "reason": health["reason"]}

    if not os.path.exists(schema_path):
        return {"status": "ERROR", "reason": f"Schema file not found at {schema_path}"}

    conn = None
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        with open(schema_path, "r", encoding="utf-8") as f:
            sql_script = f.read()
        cursor.execute(sql_script)
        conn.commit()
        cursor.close()
        release_db_connection(conn)
        return {"status": "SUCCESS", "message": f"Applied schema from {schema_path}"}
    except Exception as e:
        if conn:
            conn.rollback()
        release_db_connection(conn)
        return {"status": "ERROR", "reason": str(e)}


def log_risk_calculation_db(risk_payload: Dict[str, Any]) -> str:
    """
    Safely log risk calculation to PostGIS database.
    Returns 'PERSISTED_POSTGIS' or 'SKIPPED_DB_UNAVAILABLE'.
    """
    health = check_db_health()
    if health["status"] != "CONNECTED":
        return "SKIPPED_DB_UNAVAILABLE"

    conn = None
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        lat = risk_payload["coordinates"]["lat"]
        lon = risk_payload["coordinates"]["lon"]
        rainfall = risk_payload["hydrology_metrics"]["rainfall_mm_hr"]
        blockage = risk_payload.get("blockage_pct", 0.0)
        score = risk_payload["risk_score"]
        level = risk_payload["risk_level"]
        depth = risk_payload["water_depth_cm"]
        nearest_name = risk_payload["drainage"]["nearest_drain_name"]
        distance_m = risk_payload["drainage"]["distance_meters"]
        quality_label = risk_payload["drainage"]["capacity_source"]

        query = """
        INSERT INTO risk_calculations 
        (latitude, longitude, rainfall_mm_hr, blockage_pct, risk_score, risk_level, water_depth_cm, 
         nearest_drain_name, nearest_drain_distance_m, data_quality_label, geom)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, ST_SetSRID(ST_MakePoint(%s, %s), 4326));
        """
        cursor.execute(query, (lat, lon, rainfall, blockage, score, level, depth, nearest_name, distance_m, quality_label, lon, lat))
        conn.commit()
        cursor.close()
        release_db_connection(conn)
        return "PERSISTED_POSTGIS"
    except Exception as e:
        print(f"[Database] Risk calculation log error: {e}")
        if conn:
            conn.rollback()
        release_db_connection(conn)
        return "SKIPPED_DB_UNAVAILABLE"
