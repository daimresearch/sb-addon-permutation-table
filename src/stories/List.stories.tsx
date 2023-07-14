import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { List } from "./List";
import { PermutationMeta } from "../types";

const meta: PermutationMeta<typeof List> = {
  title: "Sample/List",
  component: List,
  parameters: {
    permutation: {
      importPath: 'import { List } from "@daim/component/List"',
    },
  },
};

export default meta;
type Story = StoryObj<typeof List>;

export const Default: Story = {
  args: {
    data: [
      { label: "foo", type: "default" },
      { label: "bar", type: "primary" },
      { label: "baz", type: "danger" },
    ],
    title: { title: "hello" },
  },
};

export const onProps: Story = {
  args: {
    title: { title: "Lorem, ipsum." },
    data: [{ label: "foo", type: "default" }],
  },
};
