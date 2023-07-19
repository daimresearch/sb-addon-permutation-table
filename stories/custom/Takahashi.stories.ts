import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import { Card } from "antd";
import { PermutationMeta } from "sb-addon-permutation-table";

const meta: PermutationMeta<typeof Button> = {
  title: "Example/ComponentName",
  component: Card,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    size: "default",
    title: "Card component",
    children:
      "This is a Card component. but in panel, it displayed as Takahashi",
  },
  parameters: {
    permutation: {
      componentName: "Takahashi",
    },
  },
};
