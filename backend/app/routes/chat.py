from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from .monuments import sparql_service
from ..services.llm_service import llm_service

router = APIRouter()

class ChatRequest(BaseModel):
    message: str

@router.post("/")
def chat_with_safibot(request: ChatRequest):
    try:
        # 1. LLM traduit la question en SPARQL
        sparql_query = llm_service.translate_to_sparql(request.message)
        
        # 2. Exécuter la requête SPARQL sur Fuseki
        raw_results = sparql_service.execute_query(sparql_query)
        
        # Nettoyer les résultats pour le LLM
        cleaned_results = []
        for res in raw_results:
            cleaned = {}
            for key, value in res.items():
                cleaned[key] = value.get("value")
            cleaned_results.append(cleaned)
            
        # 3. LLM génère la réponse finale en lisant les résultats
        final_answer = llm_service.generate_rag_response(request.message, cleaned_results)
        
        return {
            "query_used": sparql_query,
            "results_found": len(cleaned_results),
            "answer": final_answer
        }
        
    except Exception as e:
        # En cas d'erreur (erreur de syntaxe SPARQL générée par l'IA, ou autre)
        # On demande au LLM de générer une réponse d'excuse sans contexte
        fallback_answer = "Désolé, je n'ai pas bien compris la question ou mes archives sont inaccessibles. Pourriez-vous reformuler ?"
        print(f"Chatbot Error: {str(e)}")
        return {
            "query_used": "",
            "results_found": 0,
            "answer": fallback_answer
        }
