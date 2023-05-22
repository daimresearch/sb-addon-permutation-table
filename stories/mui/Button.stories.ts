import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import { PermutationMeta } from "sb-addon-permutation-table";

const meta: PermutationMeta<typeof Button> = {
  title: "Frameworks/MUI/Button",
  component: Button,
  argTypes: {
    color: {
      control: {
        type: "radio",
      },
      options: ["primary", "secondary", "success", "error", "info", "warning"],
    },
  },
  parameters: {
    permutation: {
      scope: {
        Button,
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    color: "primary",
    label: "Hello World",
    variant: "outlined",
  },
  parameters: {
    storySource: {
      source: "<Button />",
      importPath: 'import { Button } from "@mui/material"',
    },
  },
};

export const NoStorySource: Story = {
  args: {
    label: "No Story Source",
    color: "primary",
  },
};

export const PermutationDisabled: Story = {
  args: {
    label: "Button",
  },
  parameters: {
    storySource: {
      source: '<Button label="Hello World" />',
      importPath: 'import { Button } from "@mui/material"',
    },
    permutation: {
      deactivate: ["disabled", "size", "color", "variant"],
    },
  },
};
