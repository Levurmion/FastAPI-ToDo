"use client";

import { useState } from "react";
import { PasswordInputProps } from "./PasswordInput.types";
import TextInput from "../TextInput/TextInput";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const PasswordInput = (props: PasswordInputProps) => {
    const { defaultVisible, ...inputProps } = props;
    const [isVisible, setIsVisible] = useState(defaultVisible ? true : false);

    return (
        <div className="relative flex h-fit">
            <TextInput
                {...inputProps}
                type={isVisible ? "text" : "password"}
            />
            <button
                className="appearance-none absolute right-0 top-[50%] -translate-y-[50%] px-2 text-asphalt-50 text-[125%] leading-none"
                onClick={() => setIsVisible((prev) => !prev)}
                aria-label="password-visibility-button"
                type="button"
            >
                {isVisible ? <VisibilityIcon fontSize="inherit" /> : <VisibilityOffIcon fontSize="inherit" />}
            </button>
        </div>
    );
};

export default PasswordInput;
