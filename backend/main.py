"""
FastAPI Backend Application Entrypoint
Urban Flood Nowcasting System (SIH26085)
"""

import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from dotenv import load_dotenv

load_dotenv()

from backend.core.config import settings

# Vyom's main API routers
from backend.routers.risk import router as risk_router
from backend.routers.weather import router as weather_router
from backend.routers.drainage import router as drainage_router
from backend.routers.forecasts import router as forecasts_router
from backend.routers.surface import router as surface_router
from backend.routers.data import router as data_router
from backend.routers.rainfall import router as rainfall_router

# Dev's demo router
try:
    from backend.routes.demo import router as demo_router
except ImportError:
    from routes.demo import router as demo_router


app = FastAPI(
    title="Urban Flood Nowcasting System API",
    description="Real-time 2D hydrological risk modeling & nowcasting API (SIH26085)",
    version="1.0.0"
)


# Enable CORS for React Web Dashboard & Citizen Web Portal
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Include API routers
app.include_router(risk_router)
app.include_router(weather_router)
app.include_router(drainage_router)
app.include_router(forecasts_router)
app.include_router(surface_router)
app.include_router(data_router)
app.include_router(rainfall_router)
app.include_router(demo_router)


# Mount Static Files from frontend
frontend_dir = os.path.join(
    os.path.dirname(__file__),
    "..",
    "frontend"
)

if os.path.exists(frontend_dir):
    app.mount(
        "/static",
        StaticFiles(directory=frontend_dir),
        name="static"
    )


# Mount processed data assets
data_dir = os.path.join(
    os.path.dirname(__file__),
    "..",
    "data",
    "processed"
)

if os.path.exists(data_dir):
    app.mount(
        "/data-assets",
        StaticFiles(directory=data_dir),
        name="data-assets"
    )


@app.get("/api/v1/health")
@app.get("/health")
async def health_check():
    return {
        "system": "Urban Flood Nowcasting System",
        "status": "OPERATIONAL",
        "version": "1.0.0",
        "docs_url": "/docs"
    }


@app.get("/api/v1/readiness")
@app.get("/readiness")
async def readiness_check():
    from backend.db.database import database_health

    database = database_health()
    ready = database["status"] == "CONNECTED" or settings.sqlite_fallback_allowed
    return {
        "status": "READY" if ready else "NOT_READY",
        "environment": settings.env,
        "database": database,
    }


@app.get("/")
async def root():
    index_path = os.path.join(frontend_dir, "index.html")

    if os.path.exists(index_path):
        return FileResponse(index_path)

    return await health_check()


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
