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
        PREFIX safionto: <http://example.org/safionto/> 
        
        SELECT ?monument ?name ?type ?year ?imageUrl ?lat ?lng
        WHERE {
          ?monument rdf:type ?type .
          ?type rdfs:subClassOf* safionto:Place .
          
          OPTIONAL { ?monument safionto:placeName ?name . }
          OPTIONAL { ?monument safionto:creationDate ?year . }
          OPTIONAL { ?monument safionto:imageURL ?imageUrl . }
          OPTIONAL { ?monument safionto:latitude ?lat . }
          OPTIONAL { ?monument safionto:longitude ?lng . }
        }
        """
        results = self.execute_query(query)
        markers = []
        for result in results:
            lat = result.get("lat", {}).get("value")
            lng = result.get("lng", {}).get("value")
            markers.append({
                "uri": result.get("monument", {}).get("value"),
                "name": result.get("name", {}).get("value", "Inconnu"),
                "type": result.get("type", {}).get("value", "").split("#")[-1].split("/")[-1],
                "year": result.get("year", {}).get("value", "Date inconnue"),
                "imageUrl": result.get("imageUrl", {}).get("value"),
                "lat": float(lat) if lat else None,
                "lng": float(lng) if lng else None
            })
        return markers

    def get_monument_details(self, uri: str):
        query = f"""
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX safionto: <http://example.org/safionto/> 
        
        SELECT ?name ?type ?year ?imageUrl ?desc WHERE {{
          <{uri}> rdf:type ?type .
          OPTIONAL {{ <{uri}> safionto:placeName ?name . }}
          OPTIONAL {{ <{uri}> safionto:imageURL ?imageUrl . }}
          OPTIONAL {{ <{uri}> safionto:description ?desc . }}
          OPTIONAL {{ <{uri}> safionto:creationDate ?year . }}
        }}
        """
        results = self.execute_query(query)
        if not results:
            return None
        result = results[0]
        return {
            "uri": uri,
            "name": result.get("name", {}).get("value", "Inconnu"),
            "type": result.get("type", {}).get("value", "").split("#")[-1].split("/")[-1],
            "year": result.get("year", {}).get("value", "Date inconnue"),
            "imageUrl": result.get("imageUrl", {}).get("value"),
            "description": result.get("desc", {}).get("value", "Aucune description")
        }

    def insert_monument(self, data: dict):
        uri_name = data['name'].replace(' ', '_').replace("'", "").replace('"', '')
        uri = f"http://example.org/safionto/{uri_name}"
        
        query = f"""
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
        PREFIX safionto: <http://example.org/safionto/> 
        
        INSERT DATA {{
          <{uri}> rdf:type safionto:{data['type']} ;
                  safionto:placeName "{data['name']}" ;
                  safionto:creationDate "{data['year']}" ;
                  safionto:description "{data['description']}" ;
                  safionto:imageURL "{data['imageUrl']}" ;
                  safionto:latitude {data['lat']} ;
                  safionto:longitude {data['lng']} .
        }}
        """
        sparql = SPARQLWrapper(settings.FUSEKI_URL)
        sparql.setQuery(query)
        sparql.method = 'POST'
        sparql.query()
        return {"uri": uri, "message": "Monument inserted successfully"}

sparql_service = SPARQLService()
