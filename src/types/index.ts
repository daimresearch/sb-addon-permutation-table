import type { Args, ArgTypes, Meta } from "@storybook/react";

export type Permutation = {
  componentName?: string;
  importPath?: string;
  children?: string;
  deactivate?: ArgTypes<any>[];
  autoload?: "all" | string[];
};

export type PermutationMeta<T> = Meta<T> & {
  parameters?: {
    [key: string]: any;
    permutation?: Permutation;
  };
};
