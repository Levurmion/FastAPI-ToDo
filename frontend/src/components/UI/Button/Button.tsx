"use client";

import { ThemeBgColor } from "@/lib/color-palette/color-palette.types";
import { ButtonColorMap, ButtonProps } from "./Button.types";
import { forwardRef } from "react";

const backgroundColorMap: ButtonColorMap = {
    primary: "bg-primary-600",
    secondary: "bg-secondary-500",
    success: "bg-success",
    warning: "bg-warning-400",
    danger: "bg-danger",
};

const hoverBackgroundColorMap: ButtonColorMap = {
    primary: "bg-primary-500",
    secondary: "bg-secondary-600",
    success: "bg-success-700",
    warning: "bg-warning-500",
    danger: "bg-danger-700",
};

const textColorMap: ButtonColorMap = {
    primary: "text-white",
    secondary: "text-white",
    success: "text-white",
    warning: "text-black",
    danger: "text-white",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    const { theme, children, ...buttonProps } = props;
    const backgroundColor = backgroundColorMap[theme];
    const hoverBackgroundColor = hoverBackgroundColorMap[theme];
    const textColor = textColorMap[theme];

    return (
        <button
            ref={ref}
            className={`flex items-center justify-center w-full px-4 py-1.5 rounded-sm whitespace-nowrap ${backgroundColor} hover:${hoverBackgroundColor} ${textColor}`}
            {...buttonProps}
        >
            {children}
        </button>
    );
});

Button.displayName = "Button"
export default Button;
