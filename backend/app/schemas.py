# backend/app/schemas.py
from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import List  # <--- ADICIONE ESTA LINHA

class UsuarioBase(BaseModel):
    nome: str = Field(..., min_length=2)
    email: EmailStr
    idade: int = Field(..., gt=0, le=120)

class UsuarioCreate(UsuarioBase):
    pass

class Usuario(UsuarioBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True # <--- ATUALIZE ESTA LINHA

# Adicionando os response_models faltantes em schemas.py
# (Isso é uma melhoria para consistência com o README)

class UsuarioListResponse(BaseModel):
    success: bool
    data: List[Usuario]

class UsuarioCreateResponse(BaseModel):
    success: bool
    message: str
    data: Usuario
    
class UsuarioDeleteResponse(BaseModel):
    success: bool
    message: str

class UsuarioUpdate(UsuarioBase):
    pass 