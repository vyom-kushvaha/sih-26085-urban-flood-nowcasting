from pydantic import BaseModel


class RiskAssessmentRequest(BaseModel):
    latitude: float
    longitude: float


class RiskAssessmentResponse(BaseModel):
    risk_level: str
    description: str
