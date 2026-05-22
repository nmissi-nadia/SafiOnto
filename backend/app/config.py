from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "SafiOnto API"
    # URL to the Fuseki SPARQL endpoint (defaults to the docker-compose service name)
    FUSEKI_URL: str = "http://fuseki:3030/safi/sparql"
    FUSEKI_UPDATE_URL: str = "http://fuseki:3030/safi/update"

    class Config:
        env_file = ".env"

settings = Settings()
