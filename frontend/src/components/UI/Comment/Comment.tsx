'use client'

import { useEffect, useState } from "react"
import Button from "../Button/Button"
import TextAreaInput from "../TextAreaInput/TextAreaInput"
import { CommentProps } from "./Comment.types"
import { useEditPostCommentMutation } from "@/lib/redux/posts/postsApi"

const Comment = ({ commentId, comment, commenterId, username, postedOn, allowEdit, postId, isEdited }: CommentProps) => {

    const [isEditing, setIsEditing] = useState(false)
    const [currComment, setCurrComment] = useState(comment)
    const [editComment, { data, isLoading, isError, isSuccess }] = useEditPostCommentMutation()

    const handlePrimaryButton = () => {
        if (!isEditing) {
            setIsEditing(true)
        } else if (isEditing) {
            editComment({
                pathParams: {
                    comment_id: commentId
                },
                requestBody: {
                    contentType: 'application/json',
                    data: {
                        content: currComment,
                        commenter_id: commenterId,
                        post_id: postId
                    }
                }
            })
        }
    }

    const handleSecondaryButton = () => {
        if (isEditing) {
            setIsEditing(false)
            setCurrComment(comment)
        }
    }

    useEffect(() => {
        setIsEditing(false)
    }, [isSuccess])

    return (
        <div className="flex flex-col w-full min-h-[100px] p-4 shadow-md text-black bg-asphalt-200 rounded-md">
            <div className="flex justify-between w-full pb-4">
                <p className="font-semibold text-primary-800">
                    {username}
                </p>
                <p className="font-light text-primary-800">
                    {postedOn?.toLocaleDateString()}
                </p>
            </div>
                {
                    isEditing ? (
                        <TextAreaInput value={comment} notifyChange={(val) => setCurrComment(val)}/>
                    ) : (
                        currComment
                    )
                }
                {
                    allowEdit && (
                        <div className="flex justify-between w-full pt-4">
                            {isEdited ? <span className="font-light text-primary-800">edited</span> : <div></div>}
                            <div className="flex gap-2">
                                <Button theme="primary" type={isEditing ? "submit" : "button"} onClick={handlePrimaryButton}>
                                    <span>{isEditing ? "Submit" : "Edit"}</span>
                                </Button>
                                <Button theme="danger" type="button" onClick={handleSecondaryButton}>
                                    <span>{isEditing ? "Cancel" : "Delete"}</span>
                                </Button>
                            </div>
                        </div>
                    )
                }
        </div>
    )
}

export default Comment