"use client";

import { InputHTMLAttributes, useState } from "react";
import { TextInputProps } from "./TextInput.types";
import { Field } from "formik";

const TextInput = ({ type = "text", error, success, ...inputProps }: TextInputProps) => {
    const defaultStyle = "border border-asphalt-400";
    const errorStyle = "border border-danger-500";
    const successStyle = "border border-success-500";

    const defineStyle = () => {
        if (!error && success) return successStyle;
        if (error && !success) return errorStyle;
        return defaultStyle;
    };

    return (
        <Field
            className={`appearance-none outline-none w-full px-2 py-1 rounded-sm bg-asphalt-900 text-white placeholder:text-asphalt-100 placeholder:italic font-light shadow-md ${defineStyle()}`}
            {...inputProps}
            type={type}
        ></Field>
    );
};

export default TextInput;
