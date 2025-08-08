from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "sqlite:///./db/database.db" 

engine = create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def create_db_and_tables():
    import os
    db_dir = os.path.dirname(DATABASE_URL.split("///")[-1])
    os.makedirs(db_dir, exist_ok=True)
    
    Base.metadata.create_all(bind=engine)
