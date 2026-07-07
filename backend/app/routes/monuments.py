from fastapi import APIRouter, HTTPException, Depends, UploadFile, File
import os
import shutil
import uuid
from pydantic import BaseModel
from typing import List, Optional
from ..services.sparql_service import sparql_service
from ..services.llm_service import llm_service
from ..auth import get_current_user

router = APIRouter()

class MonumentCreate(BaseModel):
    name: str
    type: str
    year: str
    description: str
    imageUrl: Optional[str] = None
    lat: float
    lng: float

class MonumentUpdate(BaseModel):
    uri: str
    name: str
    type: str
    year: str
    description: str
    imageUrl: Optional[str] = None
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

@router.get("/narrative")
def get_monument_narrative(uri: str):
    # Fetch raw data
    details = sparql_service.get_monument_details(uri)
    if not details:
        raise HTTPException(status_code=404, detail="Monument not found")
    
    # Generate narrative with LLM
    try:
        narrative = llm_service.generate_monument_narrative(details)
        return {"narrative": narrative}
    except Exception as e:
        print(f"Error generating narrative: {e}")
        raise HTTPException(status_code=500, detail="Error generating narrative")

@router.post("/")
def create_monument(monument: MonumentCreate, current_user: str = Depends(get_current_user)):
    try:
        result = sparql_service.insert_monument(monument.dict())
        return {"status": "success", "data": result}
    except Exception as e:
        return {"status": "error", "message": str(e)}

@router.put("/")
def update_monument_endpoint(monument: MonumentUpdate, current_user: str = Depends(get_current_user)):
    try:
        result = sparql_service.update_monument(monument.dict())
        return {"status": "success", "data": result}
    except Exception as e:
        return {"status": "error", "message": str(e)}

@router.delete("/")
def delete_monument_endpoint(uri: str, current_user: str = Depends(get_current_user)):
    try:
        result = sparql_service.delete_monument(uri)
        return {"status": "success", "data": result}
    except Exception as e:
        return {"status": "error", "message": str(e)}

@router.post("/upload")
async def upload_image(file: UploadFile = File(...), current_user: str = Depends(get_current_user)):
    try:
        # Create images directory if it doesn't exist
        os.makedirs("/code/images", exist_ok=True)
        
        # Generate a unique filename to avoid overwrites, or just use the original
        file_extension = os.path.splitext(file.filename)[1]
        filename = f"{uuid.uuid4().hex}{file_extension}"
        file_path = f"/code/images/{filename}"
        
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        return {"status": "success", "imageUrl": f"image/{filename}"}
    except Exception as e:
        return {"status": "error", "message": str(e)}
