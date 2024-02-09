
export interface ThemeColorMap {
    primary: "ultra_violet",
    secondary: "skobeloff",
    warning: "bittersweet",
    highlight: "vanilla",
    background: "eerie_black"
}

export type TailwindShades = "50" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900" | "950"
export type Themes = keyof ThemeColorMap

export type ThemeTextColor<T extends Themes = Themes, S extends TailwindShades = TailwindShades> = `text-${ThemeColorMap[T]}-${S}`
export type ThemeBgColor<T extends Themes = Themes, S extends TailwindShades = TailwindShades> = `bg-${ThemeColorMap[T]}-${S}`
export type ThemeBorderColor<T extends Themes = Themes, S extends TailwindShades = TailwindShades> = `border-${ThemeColorMap[T]}-${S}`

export type ThemeColorLiterals = ThemeTextColor | ThemeBgColor | ThemeBorderColor

export type TailwindColorGenerator = <T extends Themes, S extends TailwindShades>(theme: T, shade: S) => ThemeColorLiterals
export type PrefixVariant = "hover" | "active"