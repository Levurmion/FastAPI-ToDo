import type { StorybookConfig } from "@storybook/nextjs";
import path from "path";
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const config: StorybookConfig = {
    stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-onboarding",
        "@storybook/addon-interactions",
        "@storybook/addon-a11y",
        "@storybook/addon-actions",
        "storybook-addon-mock",
    ],
    framework: {
        name: "@storybook/nextjs",
        options: {},
    },
    docs: {
        autodocs: "tag",
    },
    webpackFinal: async (config) => {
        if (config.resolve) {
            config.resolve.plugins = config.resolve.plugins || [];
            config.resolve.plugins.push(
                new TsconfigPathsPlugin({
                    configFile: path.resolve(__dirname, "../tsconfig.json"),
                })
            );
        }
        return config;
    },
};
export default config;
