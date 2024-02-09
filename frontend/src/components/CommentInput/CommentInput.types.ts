import { TextareaHTMLAttributes } from "react";


export interface CommentInputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    notifyChange?: (currValue: string) => void
}