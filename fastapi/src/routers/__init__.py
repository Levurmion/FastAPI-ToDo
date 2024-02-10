from . import auth, users, posts, comments

authRouter = auth.router
userRouter = users.router
postsRouter = posts.router
commentsRouter = comments.router