import { InputHTMLAttributes } from "react";

export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    type?: "password" | "text"
    error?: boolean
    success?: boolean
}