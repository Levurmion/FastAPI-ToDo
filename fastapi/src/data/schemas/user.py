from __future__ import annotations
from typing import List, ForwardRef, Optional
from pydantic import BaseModel
from datetime import datetime


class UserBase(BaseModel):
    username: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    signed_up_on: Optional[datetime] = None
    
    posts: Optional[List[ForwardRef("Post")]] = None
    comments: Optional[List[ForwardRef("Comment")]] = None
    likes: Optional[List[ForwardRef("Like")]] = None
    
    class Config:
        orm_mode = True
        from_attributes = True