from fastapi import FastAPI

app = FastAPI(title="Urban Flood Nowcasting API")


@app.get("/")
async def root():
    return {"message": "Urban Flood Nowcasting API is running"}
