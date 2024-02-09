"use client";

import { ChangeEvent, useState } from "react";
import { CommentInputProps } from "./CommentInput.types";

const CommentInput = (props: CommentInputProps) => {
    const [comment, setComment] = useState(props.value);
    const { notifyChange } = props

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setComment(e.target.value)
        notifyChange?.(e.target.value)
    }

    return (
        <div className="grid w-full">
            <div className="col-start-1 col-end-2 row-start-1 row-end-2 p-2 h-fit text-wrap">
                {comment}
            </div>
            <textarea
                className="col-start-1 col-end-2 row-start-1 row-end-2 appearance-none outline-none resize-none overflow-hidden w-full h-full p-2 bg-asphalt-900 rounded-md text-asphalt-100"
                {...props}
                rows={1}
                value={comment}
                onChange={handleChange}
            ></textarea>
        </div>
    );
};

export default CommentInput;
