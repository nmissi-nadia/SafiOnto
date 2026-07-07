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
        # --- MODE DÉMO (MOCK) POUR LA CAPTURE D'ÉCRAN ---
        # On évite d'appeler l'API Gemini pour contourner l'Erreur 429 (Quota Exceeded)
        
        msg_lower = request.message.lower()
        if "ksar" in msg_lower or "bahar" in msg_lower:
            final_answer = "Le Ksar El Bahar, ou 'Château de la Mer', est une impressionnante forteresse portugaise construite au XVIe siècle. Située face à l'océan, elle servait autrefois à protéger le port de Safi et reste l'un des monuments emblématiques de la ville."
        elif "potiers" in msg_lower or "poterie" in msg_lower:
            final_answer = "La Colline des Potiers est le cœur historique de l'artisanat safiot. Vous y trouverez des maîtres artisans perpétuant un savoir-faire ancestral, faisant de Safi la capitale incontestée de la céramique marocaine."
        elif "musée" in msg_lower:
            final_answer = "Le Musée National de la Céramique de Safi est un joyau culturel. Il abrite de magnifiques collections historiques mettant en valeur le patrimoine potier traditionnel et contemporain de la région."
        elif "plage" in msg_lower or "surf" in msg_lower:
            final_answer = "Pour les amateurs de surf et de nature, la Plage Lalla Fatna et le spot de Sidi Bouzid sont incontournables. Ils offrent des vagues exceptionnelles prisées par les surfeurs du monde entier."
        else:
            final_answer = "Safi est une ville fascinante qui allie un riche héritage architectural (almohade et portugais) à une tradition artisanale millénaire. Que souhaitez-vous explorer exactement ?"
            
        return {
            "query_used": "SELECT * WHERE { ... } (Mode Démo)",
            "results_found": 1,
            "answer": final_answer
        }
        
    except Exception as e:
        error_msg = str(e)
        print(f"Chatbot Error: {error_msg}")
        
        fallback_answer = "Désolé, je n'ai pas bien compris la question ou mes archives sont inaccessibles. Pourriez-vous reformuler ?"
        
        if "429" in error_msg or "Quota" in error_msg:
            fallback_answer = "Je suis désolé, mais la limite d'utilisation gratuite de l'API d'Intelligence Artificielle (Google Gemini) a été atteinte pour le moment. Veuillez patienter environ une minute avant de poser une nouvelle question."
            
        return {
            "query_used": "",
            "results_found": 0,
            "answer": fallback_answer
        }
