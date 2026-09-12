from fastapi import APIRouter, Response
from backend.services.data_readiness import data_readiness

router = APIRouter(prefix='/api/v1/data', tags=['Data readiness'])


@router.get('/readiness')
def readiness(response: Response):
    response.headers['Cache-Control'] = 'no-store'
    return data_readiness()
