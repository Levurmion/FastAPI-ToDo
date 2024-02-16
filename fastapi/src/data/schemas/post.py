from __future__ import annotations
from typing import List, ForwardRef, TYPE_CHECKING, Optional
from pydantic import BaseModel, ValidationError, field_validator
from datetime import datetime
from data import models

# if TYPE_CHECKING:
#     from .user import User
#     from .comment import Comment
#     from .like import Like

class PostBase(BaseModel):
    content: str
    poster_id: int

class PostCreate(PostBase):
    pass

class Post(PostBase):
    id: int
    posted_on: datetime
    edited: bool
    poster: str
    
    comments: Optional[List[ForwardRef("Comment")]] = None
    likes: Optional[List[ForwardRef("Like")]] = None
    
    class Config:
        orm_mode = True
        from_attributes = True
    
    @field_validator("poster", mode="before")
    @classmethod
    def extract_username(cls, user_db: models.User) -> str:
        return user_db.username