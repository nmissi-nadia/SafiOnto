from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config import settings
from .routes import monuments

app = FastAPI(title=settings.PROJECT_NAME)

# Enable CORS for the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For dev only, restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# We will include routers later in Step 2
app.include_router(monuments.router, prefix="/api/monuments", tags=["monuments"])

@app.get("/")
def read_root():
    return {"message": f"Welcome to {settings.PROJECT_NAME}"}

@app.get("/health")
def health_check():
    return {"status": "ok", "fuseki_endpoint": settings.FUSEKI_URL}
