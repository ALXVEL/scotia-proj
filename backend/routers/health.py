from fastapi import APIRouter

from ..models.response_models import HealthResponse

router = APIRouter()

# if this works then status is 'ok'
# otherwise, we will get an error
@router.get("/health", response_model=HealthResponse)
async def health() -> HealthResponse:
    return HealthResponse(status="ok")
