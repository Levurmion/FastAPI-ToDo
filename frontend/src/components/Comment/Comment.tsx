'use client'

import { useState } from "react"
import Button from "../Button/Button"
import CommentInput from "../CommentInput/CommentInput"
import { CommentProps } from "./Comment.types"

const Comment = ({ comment, username, postedOn, isUser }: CommentProps) => {

    const [isEditing, setIsEditing] = useState(false)
    const [currComment, setCurrComment] = useState(comment)

    const handlePrimaryButton = () => {
        if (!isEditing) {
            setIsEditing(true)
        }
    }

    const handleSecondaryButton = () => {
        if (isEditing) {
            setIsEditing(false)
            setCurrComment(comment)
        }
    }

    return (
        <div className="flex flex-col w-full min-h-[100px] p-4 shadow-md text-asphalt-50 bg-asphalt-700">
            <div className="flex justify-between w-full pb-4 text-xl">
                <p className="font-semibold text-primary-300">
                    {username}
                </p>
                <p className="font-light text-primary-200">
                    {postedOn?.toLocaleDateString()}
                </p>
            </div>
                {
                    isEditing ? (
                        <CommentInput value={comment} notifyChange={(val) => setCurrComment(val)}/>
                    ) : (
                        currComment
                    )
                }
                {
                    isUser && (
                        <div className="flex justify-end pt-4">
                            <div className="flex gap-2 w-1/5">
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