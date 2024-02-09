from . import models
from typing import List
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from .tokens import hash_password
from . import schemas


# GET
def get_user_by_id(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def get_post_by_id(db: Session, post_id: int):
    return db.query(models.Post).filter(models.Post.id == post_id).first()

def get_user_posts(db: Session, user_id: int):
    return db.query(models.Post).filter(models.Post.poster_id == user_id).all()

def get_likes_on_post(db: Session, post_id):
    return db.query(models.Like).filter(models.Like.post_id == post_id).all()

def get_number_of_likes_on_post(db: Session, post_id: int):
    return db.query(models.Like).filter(models.Like.post_id == post_id).count()

def get_comments_on_post(db: Session, post_id: int):
    return db.query(models.Comment).filter(models.Comment.post_id == post_id).all()

def get_comment_by_id(db: Session, comment_id: int):
    return db.query(models.Comment).filter(models.Comment.id == comment_id).first()




# CREATE
def create_user(db: Session, user: schemas.UserCreate):
    password_hash = hash_password(user.password)
    user_db = models.User(
        username=user.username,
        password_hash=password_hash
    )
    db.add(user_db)
    db.commit()
    db.refresh(user_db)
    return user_db

def create_post(db: Session, post: schemas.PostCreate):
    post_db = models.Post(**post.model_dump())
    db.add(post_db)
    db.commit()
    db.refresh(post_db)
    return post_db

def create_comment(db: Session, comment: schemas.CommentCreate):
    comment_db = models.Comment(**comment.model_dump())
    db.add(comment_db)
    db.commit()
    db.refresh(comment_db)
    return comment_db

def create_like(db: Session, like: schemas.LikeCreate):
    like_db = models.Like(**like.model_dump())
    db.add(like_db)
    db.commit()
    db.refresh(like_db)
    return like_db


# UPDATE
def edit_post(db: Session, post_id: int, updated_post: schemas.PostCreate):
    post_db = db.query(models.Post).filter(models.Post.id == post_id).first()
    if post_db is None:
        return None
    post_db.content = updated_post.content
    post_db.edited = True
    db.commit()
    db.refresh(post_db)
    return post_db

def edit_comment(db: Session, comment_id: int, updated_comment: schemas.CommentCreate):
    comment_db = db.query(models.Comment).filter(models.Comment.id == comment_id).first()
    if comment_db is None:
        return None
    comment_db.content = updated_comment.content
    comment_db.edited = True
    db.commit()
    db.refresh(comment_db)
    return comment_db