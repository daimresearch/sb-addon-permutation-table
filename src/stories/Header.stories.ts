import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "./Header";
import { PermutationMeta } from "../types/index";

// const meta: Meta<typeof Header> = {
//   title: "Example/Header",
//   component: Header,
//   parameters: {
//     // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
//     layout: "fullscreen",
//   },
// };
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
