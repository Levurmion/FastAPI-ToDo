from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from data import crud
from data import schemas, models
from data.database import create_db
from data.tokens import AuthToken
from typing import List

router = APIRouter(
    prefix="/posts",
    tags=["posts"]
)

post_not_found_exception = HTTPException(status_code=404, detail="post not found")
post_not_found_exception = HTTPException(status_code=404, detail="post not found")
like_not_found_exception = HTTPException(status_code=404, detail="like does not exist on post")


@router.get("/{post_id}", response_model=schemas.Post)
def get_post(post_id: int, token: AuthToken, db: Session = Depends(create_db)):
    post = crud.get_post_by_id(db, post_id)
    if post is None:
        raise post_not_found_exception
    return post

@router.get("/{post_id}/likes", response_model=List[schemas.Like])
def get_likes_on_post(post_id: int, token: AuthToken, db: Session = Depends(create_db)):
    likes = crud.get_likes_on_post(db, post_id)
    return likes

@router.get("/{post_id}/comments", response_model=List[schemas.Comment])
def get_comments_on_post(post_id: int, token: AuthToken, db: Session = Depends(create_db)):
    comments = crud.get_comments_on_post(db, post_id)
    return comments

@router.post("", response_model=schemas.Post)
def create_post(post: schemas.PostCreate, token: AuthToken, db: Session = Depends(create_db)):
    if post.poster_id != token.id:
        raise HTTPException(status_code=401, detail="cannot create post for other users")
    user = crud.get_user_by_id(db, post.poster_id)
    if user is None:
        raise HTTPException(status_code=400, detail="invalid user id")
    post = crud.create_post(db, post)
    return post

@router.put("/{post_id}", response_model=schemas.Post)
def edit_post(post_id: int, updated_post: schemas.PostCreate, token: AuthToken, db: Session = Depends(create_db)):
    old_post = crud.get_post_by_id(db, post_id)
    if old_post is None:
        raise post_not_found_exception
    if updated_post.poster_id != token.id:
        raise HTTPException(status_code=401, detail="cannot edit posts of other users")
    new_post = crud.edit_post(db, post_id, updated_post)
    return new_post

@router.delete("/{post_id}")
def delete_post(post_id: int, token: AuthToken, db: Session = Depends(create_db)):
    post_db = crud.get_post_by_id(db, post_id)
    if post_db is None:
        raise post_not_found_exception
    if post_db.poster_id != token.id:
        raise HTTPException(status_code=401, detail="cannot delete post of other users")
    db.delete(post_db)
    db.commit()
    return

@router.post("/{post_id}/like", response_model=schemas.Like)
def like_a_post(post_id: int, token: AuthToken, db: Session = Depends(create_db)):
    post_db = crud.get_post_by_id(db, post_id)
    if post_db is None:
        raise post_not_found_exception
    
    try:
        like_db = crud.create_like(db, schemas.LikeCreate(user_id=token.id, post_id=post_id))
        return like_db
    except IntegrityError as err:
        raise HTTPException(status_code=400, detail="only one like per post")

@router.delete("/{post_id}/like")
def remove_like_from_a_post(post_id: int, token: AuthToken, db: Session = Depends(create_db)):
    like_db = db.query(models.Like).filter(models.Like.post_id == post_id and models.Like.user_id == token.id).first()
    if like_db is None:
        raise like_not_found_exception
    db.delete(like_db)
    db.commit()