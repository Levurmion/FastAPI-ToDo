import { Meta, StoryObj } from "@storybook/react";
import CommentsList from "./CommentsList";
import { userEvent, within } from "@storybook/testing-library";
import StoreProvider from "@/lib/redux/StoreProvider";
import { UserContextProvider } from "@/lib/contexts/UserContext";

const meta = {
    title: "Components/Comments List",
    tags: ["autodocs"],
    component: CommentsList,
    decorators: (story) => {
        return (
            <StoreProvider>
                <UserContextProvider>
                    <div className="w-[75vw]">{story()}</div>
                </UserContextProvider>
            </StoreProvider>
        );
    },
    parameters: {
        layout: "centered",
    },
} satisfies Meta<typeof CommentsList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Loading: Story = {
    args: {
        postId: 1,
    },
    parameters: {
        fetchMock: {
            mocks: [
                {
                    matcher: {
                        url: "http://localhost:8000/posts/1/comments",
                        name: "GETMockLoadingComments",
                        method: "GET",
                    },
                    response: {
                        status: 200,
                        body: {},
                        headers: {
                            "Content-Type": "application/json",
                        },
                    },
                    options: {
                        delay: 0, // As Infinity delay might not be practical, setting it to 0 for immediate response or adjust as needed
                        sendAsJson: true,
                        includeContentLength: true,
                    },
                },
            ],
        },
    },
};

export const Error: Story = {
    args: {
        postId: 2,
    },
    parameters: {
        fetchMock: {
            mocks: [
                {
                    matcher: {
                        url: "http://localhost:8000/posts/2/comments",
                        name: "GETMockErrorComments",
                        method: "GET",
                    },
                    response: {
                        status: 404,
                        body: {},
                        headers: {
                            "Content-Type": "application/json",
                        },
                    },
                    options: {
                        delay: 100, // Default delay, adjust as necessary
                        sendAsJson: true,
                        includeContentLength: true,
                    },
                },
            ],
        },
    },
};

export const WithComments: Story = {
    args: {
        postId: 3,
    },
    parameters: {
        fetchMock: {
            mocks: [
                {
                    matcher: {
                        url: "http://localhost:8000/posts/3/comments",
                        name: "GETMockWithComments",
                        method: "GET",
                    },
                    response: {
                        status: 200,
                        body: [
                            {
                                content: "This is a great post! Thanks for sharing.",
                                commenter_id: 1,
                                post_id: 3,
                                id: 1,
                                posted_on: "2024-02-10T12:00:00Z",
                                edited: false,
                                commenter: "User1",
                            },
                            {
                                content: "I totally agree with the points made here.",
                                commenter_id: 2,
                                post_id: 3,
                                id: 2,
                                posted_on: "2024-02-10T12:05:00Z",
                                edited: false,
                                commenter: "User2",
                            },
                            {
                                content: "Could you provide more details on the second topic?",
                                commenter_id: 3,
                                post_id: 3,
                                id: 3,
                                posted_on: "2024-02-10T12:10:00Z",
                                edited: false,
                                commenter: "User3",
                            },
                            {
                                content: "Here's a link to a related topic that might be helpful.",
                                commenter_id: 4,
                                post_id: 3,
                                id: 4,
                                posted_on: "2024-02-10T12:15:00Z",
                                edited: true,
                                commenter: "User4",
                            },
                            {
                                content: "Thanks everyone for your insights!",
                                commenter_id: 5,
                                post_id: 3,
                                id: 5,
                                posted_on: "2024-02-10T12:20:00Z",
                                edited: false,
                                commenter: "User5",
                            },
                        ],
                        headers: {
                            "Content-Type": "application/json",
                        },
                    },
                    options: {
                        delay: 2000,
                        sendAsJson: true,
                        includeContentLength: true,
                    },
                },
            ],
        },
    },
};

export const RealAPI: Story = {
    args: {
        postId: 18,
    },
};
