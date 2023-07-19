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
    label: "Button",
    variant: "outlined",
  },
  parameters: {
    permutation: {
      importPath: 'import { Button } from "@mui/material"',
    },
  },
};

export const PermutationDisabled: Story = {
  args: {
    label: "Button",
  },
  parameters: {
    permutation: {
      importPath: 'import { Button } from "@mui/material"',
      deactivate: ["disabled", "size", "color", "variant"],
    },
  },
};
