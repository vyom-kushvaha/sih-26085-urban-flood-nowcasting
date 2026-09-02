"""
FastAPI Backend Application Entrypoint
Urban Flood Nowcasting System (SIH26085)
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routers.risk import router as risk_router
from backend.routers.weather import router as weather_router

try:
    from backend.routes.weather import router as d_weather_router
except ImportError:
    from routes.weather import router as d_weather_router

app = FastAPI(
    title="Urban Flood Nowcasting System API",
    description="Real-time 2D hydrological risk modeling & nowcasting API (SIH26085)",
    version="1.0.0"
)

# Enable CORS for React Web Dashboard & Citizen Web Portal
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers (Vyom + D combined)
app.include_router(risk_router)
app.include_router(weather_router)
app.include_router(d_weather_router)


@app.get("/")
async def root():
    return {
        "system": "Urban Flood Nowcasting System",
        "status": "OPERATIONAL",
        "version": "1.0.0",
        "docs_url": "/docs"
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
