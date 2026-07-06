# pyrefly: ignore [missing-import]
import google.generativeai as genai
from ..config import settings
import re
import json

class LLMService:
    def __init__(self):
        genai.configure(api_key=settings.GEMINI_API_KEY)
        self.model = genai.GenerativeModel('gemini-flash-latest')

    def translate_to_sparql(self, question: str) -> str:
        prompt = f"""
Tu es un expert du Web Sémantique et de l'ontologie de la ville de Safi (Maroc).
Ton rôle est de convertir une question en langage naturel en requête SPARQL stricte pour interroger Apache Jena Fuseki.

L'ontologie utilise les préfixes suivants :
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX safi: <http://ontologie.safi.ma/onto#>
PREFIX dc: <http://purl.org/dc/elements/1.1/>

Les entités ont comme classes : safi:Forteresse, safi:Mosquée, safi:Palais, safi:Musée, safi:SiteArchéologique, etc.
Les propriétés courantes sont :
- rdfs:label ?nom
- dc:description ?desc
- safi:annéeConstruction ?annee

Question de l'utilisateur : "{question}"

Génère UNIQUEMENT le code SPARQL valide sans aucun texte d'explication. La requête doit renvoyer ?name, ?type, ?year, ?desc. Utilise la clause OPTIONAL pour les champs descriptifs afin d'éviter les résultats vides. 
"""
        response = self.model.generate_content(prompt)
        text = response.text
        # Nettoyer les balises de code Markdown si l'IA en ajoute
        text = text.replace("```sparql", "").replace("```", "").strip()
        return text

    def generate_rag_response(self, question: str, sparql_results: list) -> str:
        context = json.dumps(sparql_results, indent=2, ensure_ascii=False)
        prompt = f"""
Tu es SafiBot, un guide touristique expert et passionnant pour la ville de Safi au Maroc.
Un utilisateur te pose une question.
Tu as interrogé une base de données sémantique et obtenu ces résultats bruts (au format JSON) :
{context}

Question de l'utilisateur : "{question}"

Instructions :
1. Si les résultats sont vides, réponds poliment que tu n'as pas trouvé cette information dans la base de connaissances. Ne l'invente pas.
2. Si tu as des résultats, rédige une belle réponse naturelle, fluide et intéressante en te basant UNIQUEMENT sur les faits fournis dans le JSON.
3. Ne mentionne pas que tu as lu un fichier JSON ou fait une requête SPARQL. Parle naturellement comme un historien.
4. Reste concis (2-3 phrases maximum).
"""
        response = self.model.generate_content(prompt)
        return response.text.strip()

llm_service = LLMService()
