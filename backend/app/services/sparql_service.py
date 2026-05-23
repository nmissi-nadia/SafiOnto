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

    def get_map_markers(self):
        query = """
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX curr: <http://erlangen-crm.org/current/>
        PREFIX geos: <http://www.opengis.net/ont/geosparql#>
        PREFIX safionto: <http://example.org/safionto/> 
        
        SELECT ?monument ?name ?type ?year ?imageUrl ?coords
        WHERE {
          ?monument rdf:type ?type .
          OPTIONAL { ?monument rdfs:label ?name . }
          OPTIONAL { ?monument safionto:has_image_url ?imageUrl . }
          OPTIONAL { 
             ?monument geos:hasGeometry ?geom .
             ?geom geos:hasSerialization ?coords .
          }
          OPTIONAL {
            ?monument curr:P108i_was_produced_by ?production .
            ?production curr:P4_has_time-span ?timespan .
            ?timespan curr:P82a_begin_of_the_begin ?year .
          }
        }
        """
        results = self.execute_query(query)
        markers = []
        for result in results:
            markers.append({
                "uri": result.get("monument", {}).get("value"),
                "name": result.get("name", {}).get("value", "Inconnu"),
                "type": result.get("type", {}).get("value", "").split("#")[-1].split("/")[-1],
                "year": result.get("year", {}).get("value", "Date inconnue"),
                "imageUrl": result.get("imageUrl", {}).get("value"),
                "coords": result.get("coords", {}).get("value")
            })
        return markers

sparql_service = SPARQLService()
