from typing import Annotated
from datetime import timedelta, datetime, timezone
from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends, HTTPException
from passlib.context import CryptContext
from .schemas import User, AuthTokenPayload
import os
from jose import JWTError, jwt


pwd_context = CryptContext(schemes=["bcrypt"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/sign-in")
JWT_SECRET = os.environ["JWT_SECRET"]

def hash_password(plain_password: str):
    return pwd_context.hash(plain_password)

def verify_password(plain_password: str, hashed_password: str):
    return pwd_context.verify(plain_password, hashed_password)

def generate_access_token(user: User, expiry_minutes: int = 15):
    payload = {
        "id": user.id,
        "username": user.username,
        "exp": datetime.now(timezone.utc) + timedelta(minutes=expiry_minutes)
    }
    return jwt.encode(payload, JWT_SECRET)

def validate_access_token(token: Annotated[str, Depends(oauth2_scheme)]):
    credentials_exception = HTTPException(
        status_code=401,
        detail="could not validate credentials",
        headers={
            "WWW-Authenticate": "Bearer"
        }
    )
    
    try:
        decoded_token = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        if decoded_token["username"] is None or decoded_token["id"] is None:
            raise credentials_exception
        return AuthTokenPayload(**decoded_token)
    except JWTError:
        raise credentials_exception

AuthToken = Annotated[User, Depends(validate_access_token)]