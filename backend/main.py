"""
FastAPI Backend Application Entrypoint
Urban Flood Nowcasting System (SIH26085)
"""

import os
from fastapi import FastAPI
<<<<<<< HEAD
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from backend.routers.risk import router as risk_router
from backend.routers.weather import router as weather_router

try:
    from backend.routes.weather import router as d_weather_router
except ImportError:
    from routes.weather import router as d_weather_router
=======
from dotenv import load_dotenv

load_dotenv()

try:
    from backend.routes.weather import router as weather_router
    from backend.routes.demo import router as demo_router
    from backend.routes.risk import router as risk_router
except ImportError:
    from routes.weather import router as weather_router
    from routes.demo import router as demo_router
    from routes.risk import router as risk_router
>>>>>>> 3525bed (Integrate live weather risk API and demo routes)

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

# Include Routers (Vyom + Devs combined)
app.include_router(risk_router)
app.include_router(weather_router)
<<<<<<< HEAD
app.include_router(d_weather_router)

# Mount Static Files from frontend
frontend_dir = os.path.join(os.path.dirname(__file__), "..", "frontend")
if os.path.exists(frontend_dir):
    app.mount("/static", StaticFiles(directory=frontend_dir), name="static")

data_dir = os.path.join(os.path.dirname(__file__), "..", "data", "processed")
if os.path.exists(data_dir):
    app.mount("/data-assets", StaticFiles(directory=data_dir), name="data-assets")


@app.get("/api/v1/health")
@app.get("/health")
async def health_check():
    return {
        "system": "Urban Flood Nowcasting System",
        "status": "OPERATIONAL",
        "version": "1.0.0",
        "docs_url": "/docs"
    }
=======
app.include_router(demo_router)
app.include_router(risk_router)
>>>>>>> 3525bed (Integrate live weather risk API and demo routes)


@app.get("/")
async def root():
<<<<<<< HEAD
    index_path = os.path.join(frontend_dir, "index.html")
    if os.path.exists(index_path):
        return FileResponse(index_path)
    return await health_check()



if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

=======
    return {"message": "Urban Flood Nowcasting API is running"}
>>>>>>> 3525bed (Integrate live weather risk API and demo routes)
