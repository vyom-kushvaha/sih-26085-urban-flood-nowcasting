from fastapi import APIRouter

router = APIRouter(prefix="/risk", tags=["Risk Analysis"])


@router.get("/")
async def get_risk_status():
    return {"message": "Risk analysis module is active"}
