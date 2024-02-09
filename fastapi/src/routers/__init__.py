from . import auth, users, posts, comments, likes

authRouter = auth.router
userRouter = users.router
postsRouter = posts.router
commentsRouter = comments.router
likesRouter = likes.router