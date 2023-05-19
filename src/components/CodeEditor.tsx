import { styled } from "@storybook/theming";
import { CodeEditor as Editor } from "react-live-runner";

// @ts-ignore
export const CodeEditor = styled(Editor)`
  font-family: source-code-pro, Menlo, Monaco, Consolas, Courier New, monospace;
  white-space: pre;
  caret-color: #fff;
  min-width: 100%;
  min-height: 100%;
  float: left;
  height: fit-content;
  background-color: transparent !important;

  & > textarea,
  & > pre {
    outline: none;
    white-space: pre !important;
  }
` as typeof Editor;
