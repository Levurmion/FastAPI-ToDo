import type { Preview } from "@storybook/react";
import { AppRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import "../src/app/globals.css";
import { mockToken } from "../src/lib/story-utilities/utils";

const preview: Preview = {
    decorators: [
        (story) => {
            mockToken();
            return story();
        },
    ],
    parameters: {
        actions: { argTypesRegex: "^on[A-Z].*" },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        nextjs: {
            appDirectory: true,
        },
        fetchMock: {
            mocks: []
        }
    },
};

export default preview;
