from pydantic import BaseModel

class HealthResponse(BaseModel):
    status: str

class SummaryResponse(BaseModel):
    total_users: int
    total_posts: int
    total_comments: int
    total_todos: int
    completed_todos: int
    pending_todos: int

class UserActivityResponse(BaseModel):
    user_id: int
    name: str
    post_count: int
    comment_count: int
    todo_count: int
    completion_rate: float

class TopCommentedPostResponse(BaseModel):
    post_id: int
    title: str
    comment_count: int