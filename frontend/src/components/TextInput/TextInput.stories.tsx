import { Meta, StoryObj } from "@storybook/react";
import TextInput from "./TextInput";
import { Formik } from "formik";
import FormikForm from "@/lib/story-utilities/FormikForm";

const meta = {
    title: "Components/Text Input",
    tags: ["autodocs"],
    component: TextInput,
    decorators: (story) => {
        return (
            <FormikForm initialValues={{ username: "Levurmion" }} onSubmit={() => {}}>
                <div className="w-[25vw]">{story()}</div>
            </FormikForm>
        );
    },
    parameters: {
        layout: "centered",
    },
} satisfies Meta<typeof TextInput>;

export default meta
type Story = StoryObj<typeof meta>

export const WithoutText: Story = {
    args: {
        type: "text",
        name: "no text"
    }
}

export const WithText: Story = {
    args: {
        type: "text",
        name: "username"
    }
}

export const WithPlaceholder: Story = {
    args: {
        type: "text",
        placeholder: "username",
        name: "empty"
    }
}

export const Error: Story = {
    args: {
        type: "text",
        defaultValue: "Levurmion",
        name: "username",
        error: true
    }
}

export const Success: Story = {
    args: {
        type: "text",
        defaultValue: "Levurmion",
        name: "username",
        success: true
    }
}