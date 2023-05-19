import { JSXElementConstructor, ReactElement } from "react";
import { Scope } from "react-runner";
import type { Args, ArgTypes, Meta, StoryObj } from "@storybook/react";

type Language =
  | "markup"
  | "bash"
  | "clike"
  | "c"
  | "cpp"
  | "css"
  | "javascript"
  | "jsx"
  | "coffeescript"
  | "actionscript"
  | "css-extr"
  | "diff"
  | "git"
  | "go"
  | "graphql"
  | "handlebars"
  | "json"
  | "less"
  | "makefile"
  | "markdown"
  | "objectivec"
  | "ocaml"
  | "python"
  | "reason"
  | "sass"
  | "scss"
  | "sql"
  | "stylus"
  | "tsx"
  | "typescript"
  | "wasm"
  | "yaml";

export type LiveProps = {
  code?: string;
  disabled?: boolean;
  enableTypeScript?: boolean;
  language?: Language;
  noInline?: boolean;
  scope?: Record<string, any>;
  theme?: PrismTheme;
  transformCode?(code: string): void;
};

type PrismThemeEntry = {
  color?: string;
  backgroundColor?: string;
  fontStyle?: "normal" | "italic";
  fontWeight?:
    | "normal"
    | "bold"
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900";
  textDecorationLine?:
    | "none"
    | "underline"
    | "line-through"
    | "underline line-through";
  opacity?: number;
  [styleKey: string]: string | number | void;
};

type PrismTheme = {
  plain: PrismThemeEntry;
  styles: Array<{
    types: string[];
    style: PrismThemeEntry;
    languages?: Language[];
  }>;
};

export type StorySource = {
  source: string;
  importPath?: string;
};

export type Options = {
  disable?: boolean;
  scope?: Scope;
  wrapper?: JSXElementConstructor<{ children: ReactElement }>;
  theme?: PrismTheme;
  language?: Language;
  readOnly?: boolean;
};

export type PermutationMeta<T> = Meta<T> & {
  parameters: {
    [key: string]: any;
    storySource?: StorySource;
    permutation?: {
      scope: Scope;
      deactivate?: ArgTypes<T>[];
    };
  };
};
