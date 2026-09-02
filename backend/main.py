from fastapi import FastAPI

try:
    from backend.routes.weather import router as weather_router
except ImportError:
    from routes.weather import router as weather_router

app = FastAPI(title="Urban Flood Nowcasting API")

app.include_router(weather_router)


@app.get("/")
async def root():
    return {"message": "Urban Flood Nowcasting API is running"}

