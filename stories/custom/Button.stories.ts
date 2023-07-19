import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import { PermutationMeta } from "sb-addon-permutation-table";

const meta: PermutationMeta<typeof Button> = {
  title: "Example/Button",
  component: Button,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  args: {
    label: "Button",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
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
    size: "large",
  },
};

export const PermutationDisabled: Story = {
  args: {},
  parameters: {
    storySource: {
      source: "<Button />",
      importPath: "import { Button } from '@daim/component-library'",
    },
    permutation: {
      deactivate: ["primary", "size"],
    },
  },
};
