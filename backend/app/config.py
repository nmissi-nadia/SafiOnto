from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "SafiOnto API"
    # URL to the Fuseki SPARQL endpoint (defaults to the docker-compose service name)
    FUSEKI_URL: str = "http://fuseki:3030/safi/sparql"
    FUSEKI_UPDATE_URL: str = "http://fuseki:3030/safi/update"
    
    # Auth
    SECRET_KEY: str = "votre_cle_secrete_tres_securisee_ici_123"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 # 1 day
    
    # Admin Credentials
    ADMIN_USERNAME: str = "admin"
    ADMIN_PASSWORD: str = "admin"

    class Config:
        env_file = ".env"

settings = Settings()
