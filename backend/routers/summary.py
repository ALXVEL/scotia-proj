from fastapi import APIRouter, Depends

from ..data_fetch import SourceData, fetch_source_data
from ..models.response_models import SummaryResponse
from ..processing import build_summary

router = APIRouter()

@router.get("/summary", response_model=SummaryResponse)
async def summary(data: SourceData = Depends(fetch_source_data)) -> SummaryResponse:
    return build_summary(data)
