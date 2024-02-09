import { Meta, StoryObj } from "@storybook/react";
import SignUpForm from "./SignUpForm";
import { within, fireEvent, userEvent } from "@storybook/testing-library"

const meta = {
    title: "Components/Sign Up Form",
    tags: ["autodocs"],
    component: SignUpForm,
    decorators: (story) => {
        return <div className="w-[30vw]">{story()}</div>;
    },
    parameters: {
        layout: "centered"
    },
} satisfies Meta<typeof SignUpForm>;

export default meta
type Story = StoryObj<typeof meta>

export const Success: Story = {
    args: {},
    parameters: {
        mockData: [
            {
                url: 'http://localhost:8000/auth/sign-up',
                method: 'POST',
                status: 200,
                response: {},
                delay: 3000
            }
        ]
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        const usernameInput = canvas.getByPlaceholderText("username")
        const passwordInput = canvas.getByPlaceholderText("password")
        const confirmPasswordInput = canvas.getByPlaceholderText("confirm password")
        const signUpButton = canvas.getByText("Sign Up")
        await userEvent.type(usernameInput, "Levurmion")
        await userEvent.type(passwordInput, "password")
        await userEvent.type(confirmPasswordInput, "password")
        await userEvent.click(signUpButton)
        await canvas.findByText("Signing Up...")
        await canvas.findByText("Complete!",{}, {timeout: 5000})
    }
}

export const Failure: Story = {
    args: {},
    parameters: {
        mockData: [
            {
                url: 'http://localhost:8000/auth/sign-up',
                method: 'POST',
                status: 409,
                response: {},
                delay: 3000
            }
        ]
    },
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)
        const usernameInput = canvas.getByPlaceholderText("username")
        const passwordInput = canvas.getByPlaceholderText("password")
        const confirmPasswordInput = canvas.getByPlaceholderText("confirm password")
        const signUpButton = canvas.getByText("Sign Up")
        await userEvent.type(usernameInput, "Levurmion")
        await userEvent.type(passwordInput, "password")
        await userEvent.type(confirmPasswordInput, "password")
        await userEvent.click(signUpButton)
        await canvas.findByText("Signing Up...")
        await canvas.findByText("Username Taken!",{}, {timeout: 5000})
    }
}