from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from data.tokens import AuthToken
from data.database import create_db
from data import crud, models, schemas

router = APIRouter(
    prefix="/likes",
    tags=["likes"]
)

post_not_found_exception = HTTPException(status_code=404, detail="post not found")
like_not_found_exception = HTTPException(status_code=404, detail="like does not exist on post")

@router.post("/post/{post_id}", response_model=schemas.Like)
def like_a_post(post_id: int, token: AuthToken, db: Session = Depends(create_db)):
    post_db = crud.get_post_by_id(db, post_id)
    if post_db is None:
        raise post_not_found_exception
    
    try:
        like_db = crud.create_like(db, schemas.LikeCreate(user_id=token.id, post_id=post_id))
        return like_db
    except IntegrityError as err:
        raise HTTPException(status_code=400, detail="only one like per post")

@router.delete("/post/{post_id}")
def remove_like_from_a_post(post_id: int, token: AuthToken, db: Session = Depends(create_db)):
    like_db = db.query(models.Like).filter(models.Like.post_id == post_id and models.Like.user_id == token.id).first()
    if like_db is None:
        raise like_not_found_exception
    db.delete(like_db)
    db.commit()