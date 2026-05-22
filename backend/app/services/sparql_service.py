from SPARQLWrapper import SPARQLWrapper, JSON
from ..config import settings

class SPARQLService:
    def __init__(self):
        self.sparql = SPARQLWrapper(settings.FUSEKI_URL)
        self.sparql.setReturnFormat(JSON)

    def execute_query(self, query: str):
        self.sparql.setQuery(query)
        try:
            response = self.sparql.queryAndConvert()
            return response["results"]["bindings"]
        except Exception as e:
            # Here we could raise a custom exception that our FastAPI middleware intercepts
            raise Exception(f"Failed to execute SPARQL query: {str(e)}")

    def get_all_monuments(self):
        # A simple query to get monuments based on our future ontology
        query = """
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX safi: <http://example.org/safionto/>
        PREFIX crm: <http://www.cidoc-crm.org/cidoc-crm/>
        
        SELECT ?monument ?name ?description WHERE {
            ?monument rdf:type crm:E24_Physical_Human_Made_Thing .
            OPTIONAL { ?monument rdfs:label ?name }
            OPTIONAL { ?monument safi:hasDescription ?description }
        }
        """
        return self.execute_query(query)

sparql_service = SPARQLService()
