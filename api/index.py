"""
Vercel Serverless Entry Point for RAKSHAK FastAPI Backend
"""
import sys
import os
from pathlib import Path

# Add project root to Python path
root = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(root))

# Set SQLite fallback so no PostgreSQL needed
os.environ.setdefault("SQLITE_FALLBACK_ALLOWED", "true")
os.environ.setdefault("ENV", "production")

from backend.main import app
