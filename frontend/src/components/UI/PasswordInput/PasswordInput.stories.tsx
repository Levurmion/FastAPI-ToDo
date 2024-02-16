import { Meta, StoryObj } from "@storybook/react";
import PasswordInput from "./PasswordInput";
import FormikForm from "@/lib/story-utilities/FormikForm";

const meta = {
    title: "Components/Password Input",
    tags: ["autodocs"],
    component: PasswordInput,
    decorators: (story) => {
        return (
            <FormikForm initialValues={{ password: "mypassword123" }} onSubmit={() => {}}>
                <div className="w-[25vw]">{story()}</div>
            </FormikForm>
        )
    },
    parameters: {
        layout: "centered",
    },
} satisfies Meta<typeof PasswordInput>;

export default meta
type Story = StoryObj<typeof meta>

export const Visible: Story = {
    args: {
        defaultVisible: true,
        defaultValue: "mypassword123",
        name: "password"
    }
}

export const Hidden: Story = {
    args: {
        defaultVisible: false,
        defaultValue: "mypassword123",
        name: "password"
    }
}

export const Error: Story = {
    args: {
        defaultVisible: false,
        defaultValue: "mypassword123",
        name: "password",
        error: true
    }
}