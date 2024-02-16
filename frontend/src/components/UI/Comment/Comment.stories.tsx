import type { Meta, StoryObj } from "@storybook/react";
import Comment from "./Comment";
import StoreProvider from "@/lib/redux/StoreProvider";

const meta = {
    title: "Components/Comment",
    tags: ["autodocs"],
    component: Comment,
    decorators: (story) => {
        return (
            <StoreProvider>
                <div className="w-[75vw]">{story()}</div>
            </StoreProvider>
        );
    },
    parameters: {
        layout: "centered",
    },
} satisfies Meta<typeof Comment>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Blank: Story = {
    args: {
        commentId: 1,
        commenterId: 1,
        postId: 1,
        comment: "",
    },
};

export const WithText: Story = {
    args: {
        commentId: 1,
        commenterId: 1,
        postId: 1,
        comment:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        username: "Levurmion",
        postedOn: new Date(),
    },
};

export const UserComment: Story = {
    args: {
        commentId: 1,
        commenterId: 1,
        postId: 1,
        comment:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        username: "Levurmion",
        postedOn: new Date(),
        allowEdit: true,
    },
};
