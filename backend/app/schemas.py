from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import List 

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
        from_attributes = True 

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
