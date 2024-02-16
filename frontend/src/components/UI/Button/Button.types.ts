import { ThemeBgColor, ThemeTextColor } from "@/lib/color-palette/color-palette.types";
import { ButtonHTMLAttributes, DOMAttributes, ReactNode } from "react";
import { PropsWithChildren } from "react";

export type ButtonThemes = "primary" | "secondary" | "warning" | "danger" | "success"

export type ButtonColorMap = {
    primary: string,
    secondary: string,
    warning: string,
    danger: string,
    success: string
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    theme: ButtonThemes,
    children?: ReactNode
}