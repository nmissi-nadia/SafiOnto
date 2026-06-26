from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
from ..services.sparql_service import sparql_service

router = APIRouter()

class MonumentCreate(BaseModel):
    name: str
    type: str
    year: str
    description: str
    imageUrl: str
    lat: float
    lng: float

class MonumentUpdate(BaseModel):
    uri: str
    name: str
    type: str
    year: str
    description: str
    imageUrl: str
    lat: float
    lng: float

@router.get("/map")
def get_map_data():
    try:
        markers = sparql_service.get_map_markers()
        return {"status": "success", "data": markers}
    except Exception as e:
        return {"status": "error", "message": str(e)}

@router.get("/detail")
def get_monument_detail(uri: str):
    try:
        details = sparql_service.get_monument_details(uri)
        if not details:
            raise HTTPException(status_code=404, detail="Monument non trouvé")
        return {"status": "success", "data": details}
    except Exception as e:
        return {"status": "error", "message": str(e)}

@router.post("/")
def create_monument(monument: MonumentCreate):
    try:
        result = sparql_service.insert_monument(monument.dict())
        return {"status": "success", "data": result}
    except Exception as e:
        return {"status": "error", "message": str(e)}

@router.put("/")
def update_monument_endpoint(monument: MonumentUpdate):
    try:
        result = sparql_service.update_monument(monument.dict())
        return {"status": "success", "data": result}
    except Exception as e:
        return {"status": "error", "message": str(e)}
