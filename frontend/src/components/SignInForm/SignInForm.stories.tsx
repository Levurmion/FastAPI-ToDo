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
        mockData: [
            {
                url: "http://localhost:8000/auth/sign-in",
                method: "POST",
                status: 200,
                response: {
                    access_token: "token",
                    token_type: "bearer",
                },
                delay: 1000,
            },
        ],
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement);
        const usernameInput = canvas.getByPlaceholderText("username");
        const passwordInput = canvas.getByPlaceholderText("password");
        const signInButton = canvas.getByText("Sign In");
        await userEvent.type(usernameInput, "string");
        await userEvent.type(passwordInput, "string");
        await userEvent.click(signInButton);
        await canvas.findByText("Signing In...");
        await canvas.findByText("Sign In Successful!", {}, { timeout: 5000 });
    },
};

export const Failure: Story = {
    args: {},
    parameters: {
        mockData: [
            {
                url: "http://localhost:8000/auth/sign-in",
                method: "POST",
                status: 401,
                response: {
                    access_token: "token",
                    token_type: "bearer",
                },
                delay: 1000,
            },
        ],
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
