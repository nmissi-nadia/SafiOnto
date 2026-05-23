from fastapi import APIRouter, HTTPException
from ..services.sparql_service import sparql_service

router = APIRouter()

@router.get("/map")
def get_map_data():
    try:
        markers = sparql_service.get_map_markers()
        return {"status": "success", "data": markers}
    except Exception as e:
        return {"status": "error", "message": str(e)}
