import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import { PermutationMeta } from "sb-addon-permutation-table";

const meta: PermutationMeta<typeof Button> = {
  title: "Frameworks/ANTD/Button",
  component: Button,
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
    label: "Button",
    type: "primary",
  },
  parameters: {
    storySource: {
      source: "<Button />",
      importPath: "import { Button } from 'antd",
    },
  },
};

export const NoStorySource: Story = {
  args: {
    label: "No Story Source",
    type: "primary",
  },
};

export const PermutationDisabled: Story = {
  args: {
    label: "Button",
  },
  parameters: {
    storySource: {
      source: "<Button />",
      importPath: "import { Button } from '@daim/component-library'",
    },
    permutation: {
      deactivate: ["block", "type", "danger"],
    },
  },
};
