import type { Meta, StoryObj } from "@storybook/react";
import { List } from "./List";
import { PermutationMeta } from "sb-addon-permutation-table";

const meta: PermutationMeta<typeof List> = {
  title: "Example/ObjectProps",
  component: List,
  parameters: {
    permutation: {
      scope: {
        List,
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

const data = [{ title: "Mike" }, { title: "Lauriane" }];

export const Primary: Story = {
  parameters: {
    permutation: {
      importPath: 'import { List } from "./List"',
    },
  },
  args: {
    data,
    color: "black",
  },
};
