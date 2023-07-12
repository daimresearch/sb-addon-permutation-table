import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "./Header";
import { PermutationMeta } from "../types/index";

const meta: PermutationMeta<typeof Header> = {
  title: "Example/Header",
  component: Header,
  tags: ["autodocs"],
  parameters: {},
};

export default meta;
type Story = StoryObj<typeof Header>;

export const LoggedIn: Story = {
  args: {
    user: {
      name: "Jane Doe",
    },
  },
};

export const LoggedOut: Story = {};
