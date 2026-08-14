from fastapi import APIRouter, Depends, HTTPException

from ..data_fetch import SourceData, fetch_source_data
from ..models.response_models import TopCommentedPostResponse
from ..processing import build_top_commented_posts

router = APIRouter()

@router.get("/posts/top-commented", response_model=list[TopCommentedPostResponse])
async def posts_top_commented(limit: int = 10, data: SourceData = Depends(fetch_source_data)) -> list[TopCommentedPostResponse]:
    if limit < 1:
        raise HTTPException(status_code=400, detail="limit must be at least 1")

    return build_top_commented_posts(data, limit)
