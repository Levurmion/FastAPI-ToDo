import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button';

const meta = {
    title: "Components/Button",
    tags: ["autodocs"],
    component: Button,
    parameters: {
        layout: "centered"
    }
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        theme: "primary",
        children: <span>Button</span>
    }
}

export const Secondary: Story = {
    args: {
        theme: "secondary",
        children: <span>Button</span>
    }
}

export const Success: Story = {
    args: {
        theme: "success",
        children: <span>Button</span>
    }
}

export const Warning: Story = {
    args: {
        theme: "warning",
        children: <span>Button</span>
    }
}

export const Danger: Story = {
    args: {
        theme: "danger",
        children: <span>Button</span>
    }
}