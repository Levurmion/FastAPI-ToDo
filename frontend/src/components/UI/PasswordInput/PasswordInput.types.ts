import { InputHTMLAttributes } from "react";
import { TextInputProps } from "../TextInput/TextInput.types";


export interface PasswordInputProps extends TextInputProps {
    defaultVisible?: boolean
}