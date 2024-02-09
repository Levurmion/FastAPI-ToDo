import { Meta, StoryObj } from "@storybook/react";
import SignInForm from "./SignInForm";

const meta = {
    title: "Components/Sign In Form",
    tags: ["autodocs"],
    component: SignInForm,
    decorators: (story) => {
        return <div className="w-[30vw]">{story()}</div>;
    },
    parameters: {
        layout: "centered"
    }
} satisfies Meta<typeof SignInForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
    args: {},
};
