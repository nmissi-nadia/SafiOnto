from fastapi import APIRouter, HTTPException
from ..services.sparql_service import sparql_service

router = APIRouter()

@router.get("/")
def get_monuments():
    try:
        data = sparql_service.get_all_monuments()
        
        # Format the raw SPARQL bindings into a cleaner JSON list
        formatted_monuments = []
        for binding in data:
            formatted_monuments.append({
                "uri": binding.get("monument", {}).get("value"),
                "name": binding.get("name", {}).get("value", "Unknown"),
                "description": binding.get("description", {}).get("value", "")
            })
            
        return {"data": formatted_monuments}
    except Exception as e:
        raise HTTPException(status_code=503, detail=str(e))
