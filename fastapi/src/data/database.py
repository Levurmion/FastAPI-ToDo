from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import os

SQLMODEL_DB_URL = os.environ["POSTGRES_URL"]

engine = create_engine(SQLMODEL_DB_URL)
SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)

Base = declarative_base()

def create_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()