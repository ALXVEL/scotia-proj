API_REQUEST_TIMEOUT_SECONDS = 5

FRONTEND_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

JSONPLACEHOLDER_BASE_URL = "https://jsonplaceholder.typicode.com"

JSONPLACEHOLDER_ENDPOINTS = {
    "users": f"{JSONPLACEHOLDER_BASE_URL}/users",
    "posts": f"{JSONPLACEHOLDER_BASE_URL}/posts",
    "comments": f"{JSONPLACEHOLDER_BASE_URL}/comments",
    "todos": f"{JSONPLACEHOLDER_BASE_URL}/todos",
}