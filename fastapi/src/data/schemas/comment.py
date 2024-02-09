from __future__ import annotations
from pydantic import BaseModel, field_validator
from typing import ForwardRef, List, Optional
from data import models
from datetime import datetime
from fastapi import Query


class CommentBase(BaseModel):
    content: str
    commenter_id: int
    post_id: int

class CommentCreate(CommentBase):
    pass

class Comment(CommentBase):
    id: int
    posted_on: datetime
    edited: bool
    commenter: str
    
    class Config:
        orm_mode = True
        from_attributes = True
    
    @field_validator("commenter", mode="before")
    @classmethod
    def extract_username(cls, user_db: models.User) -> str:
        return user_db.username