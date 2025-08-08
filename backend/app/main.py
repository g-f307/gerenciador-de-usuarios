# backend/app/main.py
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List

from . import models, schemas
from .database import SessionLocal, engine, create_db_and_tables

create_db_and_tables()

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/api/usuarios", response_model=schemas.UsuarioListResponse)
def get_usuarios(db: Session = Depends(get_db)):
    """Lista todos os usuários."""
    usuarios = db.query(models.Usuario).order_by(models.Usuario.created_at.desc()).all()
    return {"success": True, "data": usuarios}

@app.post("/api/usuarios", response_model=schemas.UsuarioCreateResponse, status_code=status.HTTP_201_CREATED)
def create_usuario(usuario: schemas.UsuarioCreate, db: Session = Depends(get_db)):
    """Cadastra um novo usuário."""
    db_user_email = db.query(models.Usuario).filter(models.Usuario.email == usuario.email).first()
    if db_user_email:
        raise HTTPException(status_code=409, detail="Email já cadastrado")
    
    db_usuario = models.Usuario(**usuario.dict())
    db.add(db_usuario)
    db.commit()
    db.refresh(db_usuario)
    return {"success": True, "message": "Usuário criado com sucesso", "data": db_usuario}

@app.put("/api/usuarios/{usuario_id}", response_model=schemas.UsuarioCreateResponse)
def update_usuario(usuario_id: int, usuario_update: schemas.UsuarioUpdate, db: Session = Depends(get_db)):
    """Atualiza um usuário existente."""
    db_usuario = db.query(models.Usuario).filter(models.Usuario.id == usuario_id).first()
    if db_usuario is None:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")

    if usuario_update.email != db_usuario.email:
        existing_email = db.query(models.Usuario).filter(models.Usuario.email == usuario_update.email).first()
        if existing_email:
            raise HTTPException(status_code=409, detail="Email já cadastrado por outro usuário")

    for key, value in usuario_update.dict().items():
        setattr(db_usuario, key, value)
    
    db.commit()
    db.refresh(db_usuario)
    
    return {"success": True, "message": "Usuário atualizado com sucesso", "data": db_usuario}

@app.delete("/api/usuarios/{usuario_id}", response_model=schemas.UsuarioDeleteResponse)
def delete_usuario(usuario_id: int, db: Session = Depends(get_db)):
    """Deleta um usuário pelo ID."""
    db_usuario = db.query(models.Usuario).filter(models.Usuario.id == usuario_id).first()
    if db_usuario is None:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    
    db.delete(db_usuario)
    db.commit()
    return {"success": True, "message": "Usuário deletado com sucesso"}
