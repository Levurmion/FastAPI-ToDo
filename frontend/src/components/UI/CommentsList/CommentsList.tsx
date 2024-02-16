"use client";

import { useGetPostCommentsQuery } from "@/lib/redux/posts/postsApi";
import { CommentsListProps } from "./CommentsList.types";
import Comment from "../Comment/Comment";
import { useUserContext } from "@/lib/contexts/UserContext";
import { useEffect } from "react";

const CommentsList = ({ postId }: CommentsListProps) => {
    const user = useUserContext();
    const { data, isLoading, isError, isSuccess, isUninitialized, isFetching } =
        useGetPostCommentsQuery({
            pathParams: {
                post_id: postId,
            },
        });
        
    if (isLoading) {
        return (
            <div className="grid place-items-center rounded-md w-full p-10 shadow-md bg-asphalt-200 text-black">
                Loading...
            </div>
        );
    } else if (isError) {
        return (
            <div className="grid place-items-center rounded-md w-full p-10 shadow-md bg-asphalt-200">
                <span className="bg-danger-600 text-white py-2 px-4 rounded-full">
                    An Error Has Occurred!
                </span>
            </div>
        );
    } else if (data && isSuccess) {
        return (
            <div className="flex flex-col gap-2">
                {data.map((comment) => {
                    return (
                        <Comment
                            key={comment.id}
                            commentId={comment.id}
                            commenterId={comment.commenter_id}
                            comment={comment.content}
                            postId={comment.post_id}
                            username={comment.commenter}
                            postedOn={new Date(comment.posted_on)}
                            isEdited={comment.edited}
                            allowEdit={comment.commenter === user?.username}
                        />
                    );
                })}
            </div>
        );
    }
};

export default CommentsList;
