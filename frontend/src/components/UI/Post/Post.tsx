"use client";

import { useEffect, useRef, useState } from "react";
import Button from "../Button/Button";
import { PostProps } from "./Post.types";
import { useDeleteUserPostMutation, useEditUserPostMutation } from "@/lib/redux/posts/postsApi";
import TextAreaInput from "../TextAreaInput/TextAreaInput";
import CommentsList from "../CommentsList/CommentsList";
import withConfirm from "../../HOCs/withConfirm";

const PrimaryButton = withConfirm(Button);
const SecondaryButton = withConfirm(Button);

const Post = ({
    postId,
    content,
    posterId,
    postedOn,
    username,
    allowEdit,
    isEdited,
}: PostProps) => {
    const [editUserPost, editPostStatus] = useEditUserPostMutation();
    const [deleteUserPost, deletePostStatus] = useDeleteUserPostMutation();

    const [isEditing, setIsEditing] = useState(false);
    const [currentPost, setCurrentPost] = useState(content);
    const [showComments, setShowComments] = useState(false);

    const handlePrimaryButtonRequestConfirm = () => setIsEditing(true);
    const handlePrimaryButtonConfirm = () =>
        editUserPost({
            pathParams: { post_id: postId },
            requestBody: {
                contentType: "application/json",
                data: { content: currentPost, poster_id: posterId },
            },
        });

    const handleSecondaryButtonConfirm = () => deleteUserPost({ pathParams: { post_id: postId } });

    const handleToggleComments = () => setShowComments((prev) => !prev);

    const renderPrimaryButton = () => {
        if (editPostStatus.isLoading) {
            return <Button theme="primary">Submitting...</Button>;
        } else {
            return (
                <PrimaryButton
                    theme="primary"
                    confirmPrompt="Submit"
                    forceCancel={!isEditing}
                    onRequestConfirm={handlePrimaryButtonRequestConfirm}
                    onConfirm={handlePrimaryButtonConfirm}
                >
                    Edit
                </PrimaryButton>
            );
        }
    };

    const renderSecondaryButton = () => {
        if (deletePostStatus.isLoading) {
            return <Button theme="danger">Deleting...</Button>;
        } else if (isEditing) {
            return (
                <Button theme="danger" onClick={() => setIsEditing(false)}>
                    Cancel
                </Button>
            );
        } else {
            return (
                <SecondaryButton
                    theme="danger"
                    confirmPrompt="Are you sure?"
                    onConfirm={handleSecondaryButtonConfirm}
                    cancelOnBlur
                >
                    Delete
                </SecondaryButton>
            );
        }
    };

    useEffect(() => {
        if (!editPostStatus.isLoading && editPostStatus.isSuccess) setIsEditing(false);
    }, [editPostStatus.isLoading]);

    return (
        <div className="flex flex-col w-full items-center">
            <div className="flex flex-col gap-4 w-full p-4 bg-asphalt-50 shadow-lg rounded-md z-10">
                <div className="flex w-full justify-between items-center">
                    <span className="font-medium text-primary-800">{username}</span>
                    <span className="font-light text-primary-800">{postedOn.toDateString()}</span>
                </div>
                {isEditing ? (
                    <TextAreaInput
                        value={currentPost}
                        notifyChange={(val: string) => setCurrentPost(val)}
                    />
                ) : (
                    <p>{currentPost}</p>
                )}
                <div className="flex w-full justify-between items-center">
                    <button
                        className="appearance-none text-asphalt-700 font-medium"
                        type="button"
                        onClick={handleToggleComments}
                    >
                        {showComments ? "hide comments" : "show comments"}
                    </button>
                    {allowEdit && (
                        <div className="flex gap-2 w-fit">
                            {renderPrimaryButton()}
                            {renderSecondaryButton()}
                        </div>
                    )}
                </div>
            </div>
            {showComments && (
                <div className="w-[95%] overflow-y-scroll no-scrollbar max-h-[20vh] py-2">
                    <CommentsList postId={postId} />
                </div>
            )}
        </div>
    );
};

export default Post;
