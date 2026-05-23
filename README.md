# SafiOnto 🏺

Bienvenue dans **SafiOnto**, un portail web sémantique full-stack interactif dédié à la valorisation et à la préservation du patrimoine culturel de la ville de Safi, au Maroc.

Ce projet s'appuie sur les technologies du Web Sémantique en utilisant un **Triple Store** pour gérer une ontologie OWL robuste basée sur des standards internationaux tels que **CIDOC-CRM** (pour le patrimoine culturel), **GeoSPARQL** (pour les données spatiales) et **FOAF** (pour les entités et personnes).

---

## 🛠️ Architecture et Technologies

Le projet est divisé en plusieurs services modulaires orchestrés via Docker Compose :

- **Backend (API)** : Construit avec **Python** et **FastAPI**, il offre des performances exceptionnelles et une documentation interactive automatique. Il utilise **SPARQLWrapper** pour interroger et mettre à jour le Triple Store.
- **Frontend (Interface Utilisateur)** : Développé en **React.js** avec **Vite** pour un build ultra-rapide. L'interface utilise **Tailwind CSS** pour un design moderne (glassmorphism) et **Leaflet.js** pour la cartographie interactive.
- **Base de Données Sémantique (Triple Store)** : Propulsé par **Apache Jena Fuseki**, il stocke nos triplets RDF et expose les endpoints SPARQL.
- **Ontologie** : Le dossier `ontology/` contient le schéma OWL (`safionto.owl`), des jeux de données d'exemple (`sample_data.ttl`), et un catalogue de requêtes SPARQL prêtes à l'emploi.

---

## 🚀 Guide d'Installation (Docker)

L'ensemble de l'écosystème est conteneurisé. Vous n'avez besoin que de **Docker** et **Docker Compose** d'installés sur votre machine.

1. **Cloner ou ouvrir le projet** :
   Placez-vous à la racine du dossier `SafiOnto`.

2. **Lancer l'orchestration Docker** :
   Exécutez la commande suivante pour construire et démarrer tous les services en arrière-plan :
   ```bash
   docker-compose up -d --build
   ```

3. **Accéder aux Services** :
   Une fois les conteneurs démarrés, vous pouvez accéder aux différentes briques du projet :
   - 🌍 **Frontend (Application Web)** : [http://localhost:3000](http://localhost:3000)
   - ⚙️ **Backend (Documentation API Swagger)** : [http://localhost:8000/docs](http://localhost:8000/docs)
   - 🗄️ **Interface d'administration Fuseki** : [http://localhost:3030](http://localhost:3030) 
     *(Identifiants de connexion : admin / admin)*

---

## 📚 Injection des Données Sémantiques (Peuplement)

Au premier lancement, le Triple Store Fuseki est vide. Pour profiter pleinement de l'application, vous devez injecter les données d'exemple.

Deux méthodes s'offrent à vous :

**Méthode 1 : Via l'interface web de Fuseki (Recommandée)**
1. Rendez-vous sur [http://localhost:3030](http://localhost:3030) et connectez-vous.
2. Allez dans l'onglet **manage datasets** et cliquez sur **add new dataset**.
3. Nommez le dataset `safi`, choisissez le type "Persistent", et validez.
4. Sélectionnez ensuite votre nouveau dataset `/safi`, puis cliquez sur **Upload data**.
4. Sélectionnez le fichier `ontology/data/sample_data.ttl` et validez.

**Méthode 2 : Via des requêtes SPARQL**
Vous pouvez utiliser le dossier `ontology/queries/` pour lancer directement des requêtes `INSERT DATA` depuis l'interface web de Fuseki (onglet **Query**).

---

## 🏗️ Structure du Projet

```text
SafiOnto/
├── docker-compose.yml       # Orchestration des conteneurs
├── README.md                # Documentation du projet (ce fichier)
├── backend/                 # API FastAPI
│   ├── Dockerfile
│   ├── requirements.txt
│   └── app/                 # Logique métier, routes REST et service SPARQL
├── frontend/                # Application React + Vite + Tailwind
│   ├── Dockerfile
│   ├── package.json
│   └── src/                 # Composants (Map, MonumentCard, Form) et Services API
└── ontology/                # Architecture Sémantique
    ├── safionto.owl         # Schéma de l'ontologie
    ├── data/                # Fichiers RDF (.ttl) pour le peuplement
    └── queries/             # Exemples de requêtes SPARQL
```
