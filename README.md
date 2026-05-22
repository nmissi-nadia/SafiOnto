# SafiOnto

SafiOnto is a full-stack semantic web portal dedicated to the cultural heritage of Safi, Morocco. 
It uses a Triple Store to manage an OWL ontology based on CIDOC-CRM, GeoSPARQL, and FOAF.

## Tech Stack

- **Backend**: Python, FastAPI, SPARQLWrapper
- **Frontend**: React.js, Tailwind CSS, Leaflet.js (built with Vite)
- **Database**: Apache Jena Fuseki (Triple Store)
- **Infrastructure**: Docker Compose

## Setup Instructions

1. **Clone the repository** (or ensure you are in the project root).
2. **Start the services** using Docker Compose:
   ```bash
   docker-compose up -d --build
   ```
3. **Access the applications**:
   - Frontend UI: [http://localhost:3000](http://localhost:3000)
   - Backend API Docs: [http://localhost:8000/docs](http://localhost:8000/docs)
   - Fuseki Dashboard: [http://localhost:3030](http://localhost:3030) (credentials: admin / admin)

## Populating the Data
You can upload the sample data located in `ontology/data/sample_data.ttl` directly through the Fuseki web interface, or using a SPARQL update query!
