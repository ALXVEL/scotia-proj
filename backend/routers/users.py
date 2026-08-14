from fastapi import APIRouter, Depends

from ..data_fetch import SourceData, fetch_source_data
from ..models.response_models import UserActivityResponse
from ..processing import build_users_activity

router = APIRouter()

@router.get("/users/activity", response_model=list[UserActivityResponse])
async def users_activity(data: SourceData = Depends(fetch_source_data)) -> list[UserActivityResponse]:
    return build_users_activity(data)
