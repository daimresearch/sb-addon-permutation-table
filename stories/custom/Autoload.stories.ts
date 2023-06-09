import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import { PermutationMeta } from "sb-addon-permutation-table";

const meta: PermutationMeta<typeof Button> = {
  title: "Example/Autoload",
  component: Button,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  parameters: {
    storySource: {
      source: "<Button>Button</Button>",
      importPath: "import { Button } from 'antd",
    },
    permutation: {
      scope: {
        Button,
      },
    },
  },
  args: {
    label: "Button",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const loadAll: Story = {
  parameters: {
    permutation: {
      autoload: "all",
    },
  },
};

export const loadPartial: Story = {
  parameters: {
    permutation: {
      autoload: ["primary", "size"],
    },
  },
};

export const deactivate: Story = {
  parameters: {
    permutation: {
      autoload: "all",
      deactivate: ["size"],
    },
  },
};
