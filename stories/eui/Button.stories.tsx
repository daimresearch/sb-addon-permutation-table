import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import "@elastic/eui/dist/eui_theme_light.css";
import { EuiProvider } from "@elastic/eui";
import { PermutationMeta } from "sb-addon-permutation-table";

const meta: PermutationMeta<typeof Button> = {
  title: "Frameworks/EUI/Button",
  component: Button,
  argTypes: {
    color: {
      control: {
        type: "radio",
      },
      options: [
        "text",
        "accent",
        "primary",
        "success",
        "warning",
        "danger",
        "ghost",
      ],
    },
  },
  decorators: [
    (Story) => (
      <EuiProvider>
        <Story />
      </EuiProvider>
    ),
  ],
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
  parameters: {
    storySource: {
      source: "<Button />",
      importPath: 'import { Button } from "@elastic/eui"',
    },
  },
  args: {
    label: "Hello World",
  },
};
export const NoStorySource: Story = {
  args: {
    label: "No Story Source",
  },
};

export const PermutationDisabled: Story = {
  parameters: {
    storySource: {
      source: "<Button />",
      importPath: 'import { Button } from "@elastic/eui"',
    },
    permutation: {
      deactivate: ["color", "fullWidth", "isDisabled", "size"],
    },
  },
  args: {
    label: "Hello World",
  },
};
