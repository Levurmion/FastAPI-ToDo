'use client'

import { useUserContext } from "@/lib/contexts/UserContext"
import { useGetUserPostsQuery } from "@/lib/redux/posts/postsApi"
import { User } from "@/lib/tokens/tokens.types"
import Post from "../Post/Post"

const PostsList = () => {
    const user = useUserContext() as User
    const { data, isFetching, isError, isSuccess } = useGetUserPostsQuery({ pathParams: { user_id: user.id } })

    return (
        <div className="flex flex-col gap-4 w-full">
            {
                data?.map(post => (
                <Post
                    key={post.id}
                    postId={post.id} 
                    content={post.content}
                    postedOn={new Date(post.posted_on)}
                    posterId={post.poster_id}
                    username={post.poster}
                    isEdited={post.edited}
                    allowEdit={user.id === post.poster_id}
                />
                ))
            }
        </div>
    )
}

export default PostsList