from .database import Base
from sqlalchemy import Column, Boolean, String, Integer, ForeignKey, UniqueConstraint, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    username = Column(String, unique=True, index=True)
    password_hash = Column(String)
    signed_up_on = Column(DateTime, server_default=func.now())
    
    posts = relationship("Post", back_populates="poster")
    comments = relationship("Comment", back_populates="commenter")
    likes = relationship("Like", back_populates="user")


class Post(Base):
    __tablename__ = "posts"
    
    id = Column(Integer, primary_key=True)
    content = Column(String)
    posted_on = Column(DateTime, server_default=func.now())
    poster_id = Column(Integer, ForeignKey("users.id", onupdate="CASCADE", ondelete="CASCADE"), index=True)
    edited = Column(Boolean, default=False) 
    
    poster = relationship("User", back_populates="posts")
    comments = relationship("Comment", back_populates="post")
    likes = relationship("Like", back_populates="post")


class Comment(Base):
    __tablename__ = "comments"
    
    id = Column(Integer, primary_key=True)
    content = Column(String(length=1000))
    posted_on = Column(DateTime, server_default=func.now())
    commenter_id = Column(Integer, ForeignKey("users.id", onupdate="CASCADE", ondelete="CASCADE"), index=True)
    post_id = Column(Integer, ForeignKey("posts.id", onupdate="CASCADE", ondelete="CASCADE"), index=True)
    edited = Column(Boolean, default=False)
    
    commenter = relationship("User", back_populates="comments")
    post = relationship("Post", back_populates="comments")


class Like(Base):
    __tablename__ = "likes"
    
    id = Column(Integer, primary_key=True)
    liked_on = Column(DateTime, server_default=func.now())
    user_id = Column(Integer, ForeignKey("users.id", onupdate="CASCADE", ondelete="CASCADE"), index=True)
    post_id = Column(Integer, ForeignKey("posts.id", onupdate="CASCADE", ondelete="CASCADE"), index=True)
    
    user = relationship("User", back_populates="likes")
    post = relationship("Post", back_populates="likes")
    
    __table_args__ = (
        UniqueConstraint("user_id", "post_id", name="likes_user_post_unique"),
    )