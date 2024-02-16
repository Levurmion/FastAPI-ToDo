import { Meta, StoryObj } from "@storybook/react";
import SignInForm from "./SignInForm";
import { userEvent, within } from "@storybook/testing-library";
import StoreProvider from "@/lib/redux/StoreProvider";

const meta = {
    title: "Components/Sign In Form",
    tags: ["autodocs"],
    component: SignInForm,
    decorators: (story) => {
        return (
            <StoreProvider>
                <div className="w-[30vw]">{story()}</div>
            </StoreProvider>
        );
    },
    parameters: {
        layout: "centered",
    },
} satisfies Meta<typeof SignInForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
    args: {},
    parameters: {
        fetchMock: {
            mocks: [
                {
                    matcher: {
                        url: "http://localhost:8000/auth/sign-in",
                        name: "POSTMockSignIn",
                        method: "POST",
                    },
                    response: {
                        status: 200,
                        body: {
                            access_token:
                                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTgsInVzZXJuYW1lIjoiVXNlcjEiLCJleHAiOjE3MDc1OTI5MDh9.VpNg0Eupw70oz8d_GXVU6VTIOZPodUzUcRye2cOD2m0",
                            token_type: "bearer",
                        },
                        headers: {
                            "Content-Type": "application/json",
                        },
                    },
                    options: {
                        delay: 1000,
                        sendAsJson: true,
                        includeContentLength: true,
                    },
                },
            ],
        },
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const usernameInput = canvas.getByPlaceholderText("username");
        const passwordInput = canvas.getByPlaceholderText("password");
        const signInButton = canvas.getByText("Sign In");
        await userEvent.type(usernameInput, "User1");
        await userEvent.type(passwordInput, "password");
        await userEvent.click(signInButton);
        await canvas.findByText("Signing In...");
        await canvas.findByText("Sign In Successful!", {}, { timeout: 5000 });
    },
};

export const Failure: Story = {
    args: {},
    parameters: {
        fetchMock: {
            mocks: [
                {
                    matcher: {
                        url: "http://localhost:8000/auth/sign-in",
                        name: "POSTMockSignIn",
                        method: "POST",
                    },
                    response: {
                        status: 401,
                    },
                    options: {
                        delay: 1000,
                        sendAsJson: true,
                        includeContentLength: true,
                    },
                },
            ],
        },
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const usernameInput = canvas.getByPlaceholderText("username");
        const passwordInput = canvas.getByPlaceholderText("password");
        const signInButton = canvas.getByText("Sign In");
        await userEvent.type(usernameInput, "Levurmion");
        await userEvent.type(passwordInput, "string");
        await userEvent.click(signInButton);
        await canvas.findByText("Signing In...");
        await canvas.findByText("Invalid Credentials", {}, { timeout: 5000 });
    },
};
