import asyncio
import logging
from dataclasses import dataclass

import httpx
from fastapi import HTTPException

from .config import API_REQUEST_TIMEOUT_SECONDS, JSONPLACEHOLDER_ENDPOINTS
from .models.source_models import Comment, Post, Todo, User

logger = logging.getLogger("backend")

@dataclass
class SourceData:
    users: list[User]
    posts: list[Post]
    comments: list[Comment]
    todos: list[Todo]

async def fetch_users(client: httpx.AsyncClient) -> list[User]:
    response = await client.get(JSONPLACEHOLDER_ENDPOINTS["users"])
    response.raise_for_status()
    return [User(**item) for item in response.json()]


async def fetch_posts(client: httpx.AsyncClient) -> list[Post]:
    response = await client.get(JSONPLACEHOLDER_ENDPOINTS["posts"])
    response.raise_for_status()
    return [Post(**item) for item in response.json()]


async def fetch_comments(client: httpx.AsyncClient) -> list[Comment]:
    response = await client.get(JSONPLACEHOLDER_ENDPOINTS["comments"])
    response.raise_for_status()
    return [Comment(**item) for item in response.json()]


async def fetch_todos(client: httpx.AsyncClient) -> list[Todo]:
    response = await client.get(JSONPLACEHOLDER_ENDPOINTS["todos"])
    response.raise_for_status()
    return [Todo(**item) for item in response.json()]


async def fetch_source_data() -> SourceData:
    try:
        # gather runs all four requests concurrently instead of one after another
        async with httpx.AsyncClient(timeout=API_REQUEST_TIMEOUT_SECONDS) as client:
            users, posts, comments, todos = await asyncio.gather(
                fetch_users(client), fetch_posts(client),
                fetch_comments(client), fetch_todos(client),
            )
        return SourceData(users=users, posts=posts, comments=comments, todos=todos)
    except Exception as exc:
        # any single failed/slow endpoint fails the whole request, no partial data
        logger.error("Failed to fetch data from JSONPlaceholder: %s", exc)
        raise HTTPException(status_code=502, detail="Failed to fetch data from upstream API")