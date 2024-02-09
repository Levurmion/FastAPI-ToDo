from pydantic import BaseModel
from datetime import datetime

class AuthToken(BaseModel):
    access_token: str
    token_type: str = "bearer"

class AuthTokenPayload(BaseModel):
    id: int
    username: str
    exp: datetime