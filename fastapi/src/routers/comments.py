from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from data import schemas, crud
from data.tokens import AuthToken
from data.database import create_db

router = APIRouter(
    prefix="/comments",
    tags=["comments"]
)

post_not_found_exception = HTTPException(status_code=400, detail="post not found")
comment_not_found_exception = HTTPException(status_code=404, detail="comment not found")

@router.post("", response_model=schemas.Comment)
def create_comment(comment: schemas.CommentCreate, token: AuthToken, db: Session = Depends(create_db)):
    post = crud.get_post_by_id(db, comment.post_id)
    if post is None:
        raise post_not_found_exception
    comment_db = crud.create_comment(db, comment)
    return comment_db

@router.put("/{comment_id}", response_model=schemas.Comment)
def edit_comment(comment_id: int, new_comment: schemas.CommentCreate, token: AuthToken, db: Session = Depends(create_db)):
    comment = crud.get_comment_by_id(db, comment_id)
    if comment is None:
        raise comment_not_found_exception
    if comment.commenter_id != token.id:
        raise HTTPException(status_code=401, detail="cannot edit comment of other users")
    edited_comment = crud.edit_comment(db, comment_id, new_comment)
    return edited_comment