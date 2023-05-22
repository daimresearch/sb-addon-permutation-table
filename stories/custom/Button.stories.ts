import type { Meta, StoryObj } from "@storybook/react";
import { PermutationMeta } from "sb-addon-permutation-table";

import { Button } from "./Button";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "Example/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    backgroundColor: { control: "color" },
  },
  parameters: {
    storySource: {
      source: "<Button />",
      importPath: 'import { Button } from "@daim/component-library"',
    },
    permutation: {
      scope: {
        Button,
      },
    },
  },
} satisfies PermutationMeta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: "Button",
  },
};

export const Secondary: Story = {
  args: {
    label: "Button",
  },
};

export const Large: Story = {
  args: {
    size: "large",
    label: "Button",
  },
};

export const PermutationDisabled: Story = {
  args: {
    label: "Button",
  },
  parameters: {
    permutation: {
      scope: {
        Button,
      },
      deactivate: ["size", "primary"],
    },
  },
};
