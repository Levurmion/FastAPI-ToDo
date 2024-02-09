from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import Annotated, List
from data import crud, schemas
from data.database import create_db
from data.tokens import AuthToken

router = APIRouter(
    prefix="/users",
    tags=["users"]
)

user_not_found_exception = HTTPException(status_code=404, detail="user not found")

@router.get("/", response_model=schemas.User)
def get_authenticated_user(token: AuthToken, db: Session = Depends(create_db)):
    user = crud.get_user_by_id(db, token.id)
    if user is None:
        raise user_not_found_exception
    return user

@router.get("/{user_id}/posts", response_model=List[schemas.Post])
def get_user_posts(user_id: int, token: AuthToken, db: Session = Depends(create_db)):
    user_posts = crud.get_user_posts(db, user_id)
    return user_posts

@router.delete("/")
def delete_authenticated_user(token: AuthToken, db: Session = Depends(create_db)):
    user = crud.get_user_by_id(db, token.id)
    if user is None:
        raise user_not_found_exception
    db.delete(user)
    db.commit()
    return