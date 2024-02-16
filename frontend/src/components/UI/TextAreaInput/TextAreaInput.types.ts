import { TextareaHTMLAttributes } from "react";


export interface TextAreaInputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    notifyChange?: (currValue: string) => void
}