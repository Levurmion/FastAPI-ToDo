from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordRequestForm
from typing import Annotated
from sqlalchemy.orm import Session
from data import crud
from data import schemas
from data.database import create_db
from data.tokens import verify_password, generate_access_token

router = APIRouter(
    prefix="/auth",
    tags=["auth"]
)

@router.post("/sign-up", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(create_db)) -> schemas.User:
    username_exists = crud.get_user_by_username(db, user.username)
    if username_exists:
        raise HTTPException(status_code=409, detail="username already exists")
    return crud.create_user(db, user)

@router.post("/sign-in", response_model=schemas.AuthToken)
def authenticate_user(form_data: Annotated[OAuth2PasswordRequestForm, Depends()], db: Session = Depends(create_db)):
    user = crud.get_user_by_username(db, form_data.username)
    
    if user is None:
        raise HTTPException(status_code=401, detail="username does not exist")
    if not verify_password(form_data.password, user.password_hash):
        raise HTTPException(status_code=401, detail="wrong password")
    
    access_token = generate_access_token(user, 15)
    
    return {
        "access_token": access_token,
        "token_type": "bearer"
    }