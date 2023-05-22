import React from "react";
import { styled } from "@storybook/theming";
import { Icons, Placeholder } from "@storybook/components";
import { useStorybookState } from "@storybook/manager-api";
import { PACKAGE_NAME } from "../constants";
import { CodeEditor as Editor } from "react-live-runner";
import { componentNameFromPathRegex } from "../utils/regex";
import { CopyButton, Tray } from "./actionTray";

const Wrapper = styled.div`
  color: white;
  background: #2d2d2d;
  text-align: center;
  border-radius: 5px;
  padding: 10px;
  height: 100%;

  & h1 {
    margin: 1rem;
    font-weight: 600;
  }
  & p {
    text-align: start;
  }
`;

const CodeEditor = styled(Editor)`
  font-family: source-code-pro, Menlo, Monaco, Consolas, Courier New, monospace;
  white-space: pre;
  & > textarea,
  & > pre {
    outline: none;
    white-space: pre !important;
  }
  min-width: 100%;
  background-color: #5555554a !important;
  border-radius: 5px;
`;

export const NoSource = () => {
  const state = useStorybookState();
  const { storyId, index } = state;

  const currentStory = index[storyId];
  //@ts-ignore
  const importPath = (currentStory.importPath as string) ?? undefined;

  // XXX: below code have a expection for mdx, md file. find component name from path. only for components
  const componentName = !importPath.includes(".md")
    ? importPath.match(componentNameFromPathRegex)[0]
    : "Foo";

  const value = `\n\
// ${importPath}\n\
\n\
import React from 'react';\n\
import { PermutationMeta } from '${PACKAGE_NAME}';\n\
import { ${componentName} } from './${componentName}'; // modify here for your components.\n\
\n\
const meta: PermutationMeta<typeof ${componentName}> = {\n\
  //...\n\
  parameters:{\n\
    storySource: {\n\
      source: <${componentName}/>, // type what your component looks like\n\
      importPath : "import ${componentName} from 'your-package/component'" // import path of packaged component\n\
    },\n\
  permutation : {\n\
    scope: {\n\
      ${componentName}, // add component here\n\
      }\n\
    }\n\
  }\n\
}\n\
\n\
  `;

  return (
    <Wrapper>
      <div>
        <Icons icon="storybook" width={"100px"} height={"100px"} />
      </div>
      <h1>No storySource found</h1>
      <p>Try adding a storysource to your story file.</p>
      <div style={{ position: "relative" }}>
        <CodeEditor value={value} disabled={true} />
        <p>Now {PACKAGE_NAME} is ready to go. happy hacking!</p>
        <Tray style={{ right: "10px", top: "0px" }}>
          <CopyButton
            copyText={value}
            clickTitle="Copied to clipboard!"
            hoverTitle="Click to copy"
          />
        </Tray>
      </div>
    </Wrapper>
  );
};
