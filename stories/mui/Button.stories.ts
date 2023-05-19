import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "MUI/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: {
        type: "radio",
      },
      options: ["primary", "secondary", "success", "error", "info", "warning"],
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    color: "primary",
  },
};
