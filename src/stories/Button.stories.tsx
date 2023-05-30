import React from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./Button";
import { PermutationMeta } from "../types";

const meta: PermutationMeta<typeof Button> = {
  title: "Sample/Button",
  component: Button,
  // decorators,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
  tags: ["autodocs"],
  parameters: {
    storySource: {
      source: "<Button/>",
      importPath: 'import { Button } from "@daim/component/Button"', // component naming convertion이 결정되지 않는 한, 그냥 string을 유지하는 것이 최선
    },
    permutation: {
      scope: {
        Button,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Primary: Story = {
  // More on args: https://storybook.js.org/docs/react/writing-stories/args
  args: {
    primary: true,
    label: "Button",
  },
};

export const Secondary: Story = {
  args: {
    label: "Button",
  },
  parameters: {
    permutation: {
      scope: {
        Button,
      },
      deactivate: ["primary"],
    },
  },
};

export const Large: Story = {
  args: {
    size: "large",
    label: "Button",
  },
};

export const Small: Story = {
  args: {
    size: "small",
    label: "Button",
  },
};
