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
        "success",
        "primary",
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

// TODO: fix the error on EUI Button.
// export const Primary: Story = {
//   parameters: {
//     permutation: {
//       importPath: 'import { Button } from "@elastic/eui"',
//     },
//   },
//   args: {
//     label: "Button",
//   },
// };
// export const PermutationDisabled: Story = {
//   parameters: {
//     permutation: {
//       importPath: 'import { Button } from "@elastic/eui"',
//       deactivate: ["color", "fullWidth", "isDisabled", "size"],
//     },
//   },
//   args: {
//     label: "Button",
//   },
// };
