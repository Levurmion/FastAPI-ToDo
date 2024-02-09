import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import CommentInput from "./CommentInput";

const meta = {
    title: "Components/Comment Input",
    tags: ["autodocs"],
    component: CommentInput,
    decorators: (story) => {
        return <div className="w-[50vw]">{story()}</div>;
    },
    parameters: {
        layout: "centered",
    },
} satisfies Meta<typeof CommentInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EmptyInput: Story = {
    args: {},
};

export const InputWithShortText: Story = {
    args: {
        value: "This is a comment to be edited.",
        "aria-label": "edit-comment",
        name: "edit-comment-input"
    },
};

export const InputWithLongText: Story = {
    args: {
        value: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "aria-label": "edit-comment",
        name: "edit-comment-input"
    },
};
