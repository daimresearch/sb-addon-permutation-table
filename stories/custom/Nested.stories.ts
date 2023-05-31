import type { Meta, StoryObj } from "@storybook/react";
import { Card, Button } from "antd";
import { PermutationMeta } from "sb-addon-permutation-table";

const meta: PermutationMeta<typeof Card> = {
  title: "Example/NestedComponent",
  component: Card,
  argTypes: {
    size: {
      options: ["default", "small"],
      control: { type: "radio" },
    },
    loading: {
      control: { type: "boolean" },
    },
    title: {
      control: { type: "text" },
    },
    bordered: {
      control: { type: "boolean" },
    },
  },
  parameters: {
    permutation: {
      scope: {
        Card,
        Button,
      },
    },
    storySource: {
      source: "<Card><Button>Nested</Button></Card>",
      importPath: "import { Button,Card } from 'antd'",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    size: "default",
    title: "Card Title",
  },
};
