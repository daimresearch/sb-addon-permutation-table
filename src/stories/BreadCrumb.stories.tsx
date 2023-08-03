import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { BreadCrumb } from "./BreadCrumb";
import { PermutationMeta } from "../types";
import { Button } from "./Button";

const meta: PermutationMeta<typeof BreadCrumb> = {
  title: "Sample/BreadCrumb",
  component: BreadCrumb,
  parameters: {
    permutation: {
      importPath: "import {BreadCrumb} from '@daim/component/BreadCrumb'",
      disablePanel: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof BreadCrumb>;

export const Primary: Story = {
  args: {
    children: (
      <div>
        Hello<Button label="World"></Button>
      </div>
    ),
  },
  parameters: {
    storySource: {
      children: `<div>Hello<Button label="World"></Button></div>`,
    },
  },
};
