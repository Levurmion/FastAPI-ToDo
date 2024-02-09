from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from routers import authRouter, userRouter, postsRouter, commentsRouter, likesRouter
from data import schemas, database, crud
from sqlalchemy.orm import Session

app = FastAPI(
    title="FastAPI-Redux Posts App",
    summary="OpenAPI Specs for a FastAPI backend to serve a Redux-powered NextJS frontend for a simple Posts app."
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
app.include_router(authRouter)
app.include_router(userRouter)
app.include_router(postsRouter)
app.include_router(commentsRouter)
app.include_router(likesRouter)

@app.get("/")
def ping():
    return "PING"