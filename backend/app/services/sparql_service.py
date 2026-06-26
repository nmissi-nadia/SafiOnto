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
        PREFIX safi: <http://ontologie.safi.ma/onto#> 
        PREFIX dc: <http://purl.org/dc/elements/1.1/>
        
        SELECT ?monument ?name ?type ?year ?lat ?lng ?desc
        WHERE {
          ?monument rdf:type ?type .
          ?type rdfs:subClassOf* safi:LieuGéographique .
          
          OPTIONAL { ?monument rdfs:label ?name . }
          OPTIONAL { ?monument safi:annéeConstruction ?year . }
          OPTIONAL { ?monument safi:latitude ?lat . }
          OPTIONAL { ?monument safi:longitude ?lng . }
          OPTIONAL { ?monument dc:description ?desc . }
        }
        """
        results = self.execute_query(query)
        markers = []
        for result in results:
            lat = result.get("lat", {}).get("value")
            lng = result.get("lng", {}).get("value")
            if lat and lng:
                markers.append({
                    "uri": result.get("monument", {}).get("value"),
                    "name": result.get("name", {}).get("value", "Inconnu"),
                    "type": result.get("type", {}).get("value", "").split("#")[-1].split("/")[-1],
                    "year": result.get("year", {}).get("value", "Date inconnue"),
                    "description": result.get("desc", {}).get("value", ""),
                    "lat": float(lat),
                    "lng": float(lng)
                })
        return markers

    def get_monument_details(self, uri: str):
        query = f"""
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX safi: <http://ontologie.safi.ma/onto#> 
        PREFIX dc: <http://purl.org/dc/elements/1.1/>
        
        SELECT ?name ?type ?year ?desc WHERE {{
          <{uri}> rdf:type ?type .
          OPTIONAL {{ <{uri}> rdfs:label ?name . }}
          OPTIONAL {{ <{uri}> dc:description ?desc . }}
          OPTIONAL {{ <{uri}> safi:annéeConstruction ?year . }}
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
            "description": result.get("desc", {}).get("value", "Aucune description")
        }

    def insert_monument(self, data: dict):
        uri_name = data['name'].replace(' ', '_').replace("'", "").replace('"', '')
        uri = f"http://ontologie.safi.ma/onto#{uri_name}"
        
        query = f"""
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
        PREFIX safi: <http://ontologie.safi.ma/onto#> 
        PREFIX dc: <http://purl.org/dc/elements/1.1/>
        PREFIX owl: <http://www.w3.org/2002/07/owl#>
        
        INSERT DATA {{
          <{uri}> rdf:type safi:{data['type']}, owl:NamedIndividual ;
                  rdfs:label "{data['name']}"@fr ;
                  safi:annéeConstruction "{data['year']}" ;
                  dc:description "{data['description']}"@fr ;
                  safi:latitude {data['lat']} ;
                  safi:longitude {data['lng']} .
        }}
        """
        sparql = SPARQLWrapper(settings.FUSEKI_URL)
        sparql.setQuery(query)
        sparql.method = 'POST'
        sparql.query()
        return {"uri": uri, "message": "Monument inserted successfully"}

    def update_monument(self, data: dict):
        uri = data['uri']
        
        # We delete all existing properties and insert new ones
        query = f"""
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
        PREFIX safi: <http://ontologie.safi.ma/onto#> 
        PREFIX dc: <http://purl.org/dc/elements/1.1/>
        PREFIX owl: <http://www.w3.org/2002/07/owl#>
        
        DELETE {{
          <{uri}> rdf:type ?type ;
                  rdfs:label ?label ;
                  safi:annéeConstruction ?year ;
                  dc:description ?desc ;
                  safi:latitude ?lat ;
                  safi:longitude ?lng .
        }}
        INSERT {{
          <{uri}> rdf:type safi:{data['type']}, owl:NamedIndividual ;
                  rdfs:label "{data['name']}"@fr ;
                  safi:annéeConstruction "{data['year']}" ;
                  dc:description "{data['description']}"@fr ;
                  safi:latitude {data['lat']} ;
                  safi:longitude {data['lng']} .
        }}
        WHERE {{
          <{uri}> rdf:type ?type .
          OPTIONAL {{ <{uri}> rdfs:label ?label . }}
          OPTIONAL {{ <{uri}> safi:annéeConstruction ?year . }}
          OPTIONAL {{ <{uri}> dc:description ?desc . }}
          OPTIONAL {{ <{uri}> safi:latitude ?lat . }}
          OPTIONAL {{ <{uri}> safi:longitude ?lng . }}
        }}
        """
        sparql = SPARQLWrapper(settings.FUSEKI_URL)
        sparql.setQuery(query)
        sparql.method = 'POST'
        sparql.query()
        return {"uri": uri, "message": "Monument updated successfully"}

sparql_service = SPARQLService()
