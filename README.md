# scotia-proj

A FastAPI backend that ingests public data from [JSONPlaceholder](https://jsonplaceholder.typicode.com) and a React frontend that renders aggregated analytics as a dashboard.

## Prerequisites

- Python 3.10+ (required by the pinned `fastapi`/`uvicorn` versions; a `.python-version` file is included for `pyenv`)
- Node 18+ and npm

## Running the backend

```
pip install -r requirements.txt
uvicorn backend.main:app --reload
```

Runs on `http://localhost:8000` by default.

## Running the frontend

```
cd frontend
npm install
npm run dev
```

Runs on `http://localhost:5173` and calls the backend at `http://localhost:8000`.

The backend's CORS config (`FRONTEND_ORIGINS` in `backend/config.py`) allows this origin by default.

## Data Ingestion Backend Setup

1) On each request, [`backend/data_fetch.py`](backend/data_fetch.py) fetches the four endpoints below concurrently (`asyncio.gather` over one `httpx.AsyncClient`)

2) then loads each response into typed Pydantic models (`backend/models/source_models.py`) and combines them into a single `SourceData` object. 

3) Routers receive that object via FastAPI's `Depends(fetch_source_data)`. 

4) If any upstream call fails, the exception is caught, logged, and raised as `HTTPException(502)`

# Endpoints

Endpoints hit:
- `GET /users`
- `GET /posts`
- `GET /comments`
- `GET /todos`

Note: Requests use a fixed timeout (`API_REQUEST_TIMEOUT_SECONDS` in `backend/config.py`).

## Suggested Endpoints

`GET /health` - Liveness check.

`GET /summary` - Totals across users, posts, comments, todos, plus completed vs. pending todo counts.

`GET /users/activity` - Per-user post count, comment count (comments on that user's posts), todo count, and todo completion rate. 

`GET /posts/top-commented?limit=10`- Posts ranked by comment count, most-commented first.

## Frontend Setup

The `frontend/` app is a Vite + React dashboard that consumes the four backend endpoints above.

- `src/theme.js` — brand color, spacing, radius, and font constants
- `src/api/` — `config.js` (base URL, endpoint paths) 
- `src/hooks/useApi.js` — small hook for loading/error/data state around a fetch call
- `src/components/` — reusable, presentation-only pieces (`Layout`, `Card`, `Table`, `Chart`, `Filter`, `Feedback`)
- `src/sections/` — one component per dashboard section, each wiring a hook + API call to the reusable components:
  - `SummarySection` — Users/Posts/Comments stat cards on the left, a completed-vs-pending todos donut chart on the right
  - `UserActivitySection` — table + a name search filter (client-side, over the already-fetched rows)
  - `TopPostsSection` — table of posts ranked by comment count

## Testing Notes

Manually tested:
- `GET /health` returns `{"status": "ok"}`
- `GET /summary`, `/users/activity`, `/posts/top-commented` verified against JSONPlaceholder data for correct counts
- Frontend verified against the backend: summary cards, donut chart, user table + name filter, and top-posts table all render correctly with data

No automated tests were included given the assessment's 4-6 hour scope.

The `processing.py` aggregation functions would be what I build unit tests for first, if given more time.