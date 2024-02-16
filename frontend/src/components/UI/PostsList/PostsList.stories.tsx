import type { Meta, StoryObj } from "@storybook/react";
import PostsList from "./PostsList";
import StoreProvider from "@/lib/redux/StoreProvider";
import { UserContextProvider } from "@/lib/contexts/UserContext";

const meta = {
    title: "Components/Posts List",
    tags: ["autodocs"],
    component: PostsList,
    decorators: (story) => {
        return (
            <StoreProvider>
                <UserContextProvider>
                    <div className="w-[75ch]">{story()}</div>
                </UserContextProvider>
            </StoreProvider>
        );
    },
    parameters: {
        layout: "centered",
    },
} satisfies Meta<typeof PostsList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const UserPosts: Story = {
    args: {},
    parameters: {
        fetchMock: {
            mocks: [
                {
                    matcher: {
                        name: "deletePost",
                        url: /http:\/\/localhost:8000\/posts\/(\d+)/,
                        method: "DELETE",
                    },
                    response: {
                        status: 200,
                    },
                    options: {
                        delay: 1000
                    }
                },
                {
                    matcher: {
                        name: "getUserPosts",
                        url: /http:\/\/localhost:8000\/users\/(\d+)\/posts/,
                        method: "GET",
                    },
                    response: {
                        status: 200,
                        body: [
                            {
                                id: 11,
                                content: `This is a more detailed example of a post content, designed to provide a clearer insight into how an object adhering to the PostProps interface might look with a longer message. Whether it's a detailed analysis, a comprehensive report, or a captivating story, the 'post' property can accommodate extensive text. This flexibility allows for a wide range of communication possibilities, from sharing brief updates to engaging in deep discussions. The content might include paragraphs, bullet points, and even code snippets, depending on the context and the message that the poster wishes to convey.`,
                                poster_id: 101,
                                poster: "Levurmion",
                                posted_on: new Date().toString(), // Assuming this is the current date and time
                                edited: false,
                            },
                            {
                                id: 22,
                                content: `Exploring the nuances of system design principles, today's discussion focuses on the significance of scalability and performance. Scalability ensures that our application can handle growth, whether in data volume, traffic, or complexity. Performance optimization, on the other hand, is crucial for maintaining a seamless user experience, reducing latency, and improving resource efficiency. Both principles are foundational to building robust, efficient systems.`,
                                poster_id: 101,
                                poster: "Levurmion",
                                posted_on: new Date(
                                    new Date().setDate(new Date().getDate() - 1)
                                ).toString(), // One day earlier
                                allowEdit: false,
                                edited: true,
                            },
                            {
                                id: 33,
                                content: `Today's highlight is a deep dive into backend development with NodeJS. We'll explore the event-driven architecture that allows NodeJS to handle concurrent requests efficiently. This model, leveraging non-blocking I/O operations, enables the development of scalable network applications. Understanding the core concepts of NodeJS's runtime environment can significantly impact our approach to backend development.`,
                                poster_id: 101,
                                poster: "Levurmion",
                                posted_on: new Date(
                                    new Date().setDate(new Date().getDate() - 2)
                                ).toString(), // Two days earlier
                                edited: false,
                            },
                            {
                                id: 44,
                                content: `In today's post, we're breaking down the React lifecycle methods and their roles in managing component lifecycle events. From mounting to unmounting, these methods provide hooks that allow us to execute code at specific points in a component's life. Understanding these methods is crucial for optimizing our React applications and ensuring they react appropriately to state and props changes.`,
                                poster_id: 101,
                                poster: "Levurmion",
                                posted_on: new Date(
                                    new Date().setDate(new Date().getDate() - 3)
                                ).toString(), // Three days earlier
                                edited: true,
                            },
                            {
                                id: 55,
                                content: `Reflecting on the journey of learning Typescript, it's clear how type safety adds a robust layer to JavaScript development. Typescript's static typing helps in catching errors during development, enhancing code quality and maintainability. Its compatibility with JavaScript ensures a smooth transition for developers looking to adopt Typescript in their projects. This post aims to share insights and tips on integrating Typescript into existing JavaScript projects.`,
                                poster_id: 101,
                                poster: "Levurmion",
                                posted_on: new Date(
                                    new Date().setDate(new Date().getDate() - 4)
                                ).toString(), // Four days earlier
                                allowEdit: false,
                                edited: false,
                            },
                        ],
                    },
                },
            ],
        },
    },
};
