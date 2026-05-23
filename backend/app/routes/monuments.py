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

@router.get("/detail")
def get_monument_detail(uri: str):
    try:
        details = sparql_service.get_monument_details(uri)
        if not details:
            raise HTTPException(status_code=404, detail="Monument non trouvé")
        return {"status": "success", "data": details}
    except Exception as e:
        return {"status": "error", "message": str(e)}
