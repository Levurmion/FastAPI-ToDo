from __future__ import annotations
from typing import ForwardRef, TYPE_CHECKING, Optional
from pydantic import BaseModel, field_validator
from datetime import datetime
from data import models

# if TYPE_CHECKING:
#     from .user import User
#     from .post import Post

class LikeBase(BaseModel):
    user_id: int
    post_id: int

class LikeCreate(LikeBase):
    pass

class Like(LikeBase):
    id: int
    liked_on: datetime
    user: str
    
    class Config:
        orm_mode = True
        from_attributes = True
    
    @field_validator("user", mode="before")
    @classmethod
    def extract_username(cls, user_db: models.User) -> str:
        return user_db.username