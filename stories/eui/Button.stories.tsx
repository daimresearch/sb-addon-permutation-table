import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import "@elastic/eui/dist/eui_theme_light.css";
import { EuiProvider } from "@elastic/eui";

const meta: Meta<typeof Button> = {
  title: "Frameworks/EUI/Button",

  component: Button,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <EuiProvider>
        <Story />
      </EuiProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
