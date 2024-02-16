import type { Meta, StoryObj } from "@storybook/react";
import Post from "./Post";
import StoreProvider from "@/lib/redux/StoreProvider";

const meta = {
    title: "Components/Post",
    tags: ["autodocs"],
    component: Post,
    decorators: (story) => {
        return (
            <StoreProvider>
                <div className="w-[75ch]">{story()}</div>
            </StoreProvider>
        );
    },
    parameters: {
        layout: "centered",
    },
} satisfies Meta<typeof Post>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithTextAllowEdit: Story = {
    args: {
        postId: 101,
        content: `This is a more detailed example of a post content, designed to provide a clearer insight into how an object adhering to the PostProps interface might look with a longer message. Whether it's a detailed analysis, a comprehensive report, or a captivating story, the 'post' property can accommodate extensive text. This flexibility allows for a wide range of communication possibilities, from sharing brief updates to engaging in deep discussions. The content might include paragraphs, bullet points, and even code snippets, depending on the context and the message that the poster wishes to convey.`,
        posterId: 123,
        username: "exampleUser",
        postedOn: new Date(), // This will use the current date and time
        allowEdit: true,
        isEdited: false,
    },
    parameters: {
        fetchMock: {
            mocks: [
                {
                    matcher: {
                        url: "http://localhost:8000/posts/101",
                        name: "PUTMock",
                        method: "PUT",
                    },
                    response: {
                        status: 200,
                        body: {},
                        headers: { "Content-Type": "application/json" },
                    },
                    options: {
                        delay: 3000,
                        sendAsJson: true,
                        includeContentLength: true,
                    },
                },
                {
                    matcher: {
                        url: "http://localhost:8000/posts/101",
                        name: "DELETEMock",
                        method: "DELETE",
                    },
                    response: {
                        status: 200,
                        body: {},
                        headers: { "Content-Type": "application/json" },
                    },
                    options: {
                        delay: 3000,
                        sendAsJson: true,
                        includeContentLength: true,
                    },
                },
                {
                    matcher: {
                        url: "http://localhost:8000/posts/101/comments",
                        name: "GETMock",
                        method: "GET",
                    },
                    response: {
                        status: 200,
                        body: [
                            // Array of comment objects as provided
                        ],
                        headers: { "Content-Type": "application/json" },
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

export const WithTextNoEdit: Story = {
    args: {
        postId: 1,
        content: `This is a more detailed example of a post content, designed to provide a clearer insight into how an object adhering to the PostProps interface might look with a longer message. Whether it's a detailed analysis, a comprehensive report, or a captivating story, the 'post' property can accommodate extensive text. This flexibility allows for a wide range of communication possibilities, from sharing brief updates to engaging in deep discussions. The content might include paragraphs, bullet points, and even code snippets, depending on the context and the message that the poster wishes to convey.`,
        posterId: 123,
        username: "exampleUser",
        postedOn: new Date(), // This will use the current date and time
        allowEdit: false,
        isEdited: false,
    },
    parameters: {
        fetchMock: {
            mocks: []
        }
    }
};
