"use server";

import {
    PrefixVariant,
    TailwindColorGenerator,
    TailwindShades,
    ThemeBgColor,
    ThemeBorderColor,
    ThemeColorLiterals,
    ThemeColorMap,
    Themes,
    ThemeTextColor,
} from "./color-palette.types";

import config from "../../../tailwind.config";

export const themeColorMap: ThemeColorMap = {
    primary: "ultra_violet",
    secondary: "skobeloff",
    warning: "bittersweet",
    highlight: "vanilla",
    background: "eerie_black",
};

export const getBackgroundColor = <T extends Themes, S extends TailwindShades>(theme: T, shade: S): ThemeBgColor<T, S> => {
    return `bg-${themeColorMap[theme]}-${shade}`;
};

export const getTextColor = <T extends Themes, S extends TailwindShades>(theme: T, shade: S): ThemeTextColor<T, S> => {
    return `text-${themeColorMap[theme]}-${shade}`;
};

export const getBorderColor = <T extends Themes, S extends TailwindShades>(theme: T, shade: S): ThemeBorderColor<T, S> => {
    return `border-${themeColorMap[theme]}-${shade}`;
};

export const getPrefixVariant = (variant: PrefixVariant, colorGeneratorCb: () => ThemeColorLiterals) => {
    return variant + ":" + colorGeneratorCb();
};

const themeColors = Object.keys(config.theme?.extend?.colors as object);
const tailwindShades: TailwindShades[] = ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"];
