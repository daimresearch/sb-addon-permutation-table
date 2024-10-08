import React, { useState, SyntheticEvent, useEffect } from "react";
import {
  useArgs,
  useArgTypes,
  useChannel,
  useParameter,
  useStorybookApi,
  useStorybookState,
} from "@storybook/manager-api";
import { AddonPanel, Placeholder } from "@storybook/components";
import { ADDON_ID, EVENTS } from "../../constants";
import { CodeEditor } from "./panelBlocks/CodeEditor";
import styled from "@emotion/styled";
import { Permutation } from "../../types";
import { PERMUT_KEY } from "../../constants";
import { convertArgTypeToArg, sourceCodeWithArgPermutations } from "src/tools";
import { ArgTable } from "./panelBlocks/ArgTable";
import { Tray } from "./panelBlocks/Tray";
import { CopyButton } from "./panelBlocks/CopyButton";
import { Showcase } from "./panelBlocks/Showcase";
import { isStoryReady } from "../../utils/storybook";
import * as R from "ramda";

interface PanelProps {
  active: boolean;
}

export const Panel: React.FC<PanelProps> = (props) => {
  const api = useStorybookApi();
  const storyId = useStorybookState().storyId;
  const data = api.getData(storyId);
  const componentName = useParameter<Permutation | undefined>(
    PERMUT_KEY,
  )?.componentName;

  const children =
    useParameter<Permutation | undefined>(PERMUT_KEY)?.children ??
    "{{ children }}";
  const [args, updateArgs, resetArgs] = useArgs();
  const importPath = useParameter<Permutation | undefined>(
    PERMUT_KEY,
  )?.importPath;

  const [permutations, setPermutations] = useState<string[]>([]);

  // parameter for stories
  const parameter = useParameter<{
    deactivate?: string[];
    autoload?: "all" | string[];
  }>(PERMUT_KEY);
  const states = useStorybookState();
  const argTypes = useArgTypes();

  const autoload = parameter?.autoload; // undefined or string[]
  const deactivate = parameter?.deactivate;
  const argKeys = convertArgTypeToArg(argTypes);
  const title = data?.title.match(new RegExp(/(?<=\/)\w+$/g));
  const tagName = componentName || title;
  const source = args?.children
    ? `<${tagName}>${children}</${tagName}>`
    : `<${tagName}/>`;

  const sourceCode = sourceCodeWithArgPermutations(
    source,
    argTypes,
    args,
    permutations,
  );

  useChannel({
    [EVENTS.SET_PERMUTATIONS]: (newValue: string, command?: string) => {
      setPermutations((pre) => {
        if (command === "clear") return [];
        if (command === "remove")
          return pre.filter((item) => item !== newValue);
        if (pre.includes(newValue)) {
          return pre.filter((item) => item !== newValue);
        } else {
          return [...pre, newValue];
        }
      });
    },
    [EVENTS.TABLE_ENTER]: (target: string) => {
      const targetElem = document.querySelector(`[data-value="${target}"]`);
      targetElem.classList.add("--active");
      targetElem.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    },
    [EVENTS.TABLE_LEAVE]: (target: string) => {
      document
        .querySelector(`[data-value="${target}"]`)
        .classList.remove("--active");
    },
  });

  useEffect(() => {
    if (autoload) {
      const autoPermutation =
        autoload === "all" ? argKeys.map((key) => key.prop) : autoload;
      const filteredAutoPermutation = R.without(
        deactivate ?? [],
        autoPermutation,
      ) satisfies string[];
      setPermutations(filteredAutoPermutation);
    }

    return () => setPermutations(() => []);
  }, [autoload, states.path]);

  if (!data || !isStoryReady(data))
    return (
      <AddonPanel {...props} key={storyId}>
        <Placeholder>Initializing..</Placeholder>
      </AddonPanel>
    );

  return (
    <AddonPanel {...props} key={storyId}>
      <Container>
        <Nav>
          <Tray style={{ justifyContent: "flex-end" }}>
            <CopyButton
              copyText={importPath}
              clickTitle="Copied on clipboard!"
              label="Copy Import String"
            />
          </Tray>
        </Nav>
        <Display>
          {sourceCode.length <= 1 ? (
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <CodeEditor key={sourceCode[0]} value={sourceCode[0]} />
              <Tray>
                <CopyButton
                  hoverTitle="Click to copy"
                  clickTitle="Copied on clipboard!"
                  label=""
                  copyText={sourceCode[0]}
                />
              </Tray>
            </div>
          ) : (
            <Showcase sourceCode={sourceCode} />
          )}
        </Display>
        <ArgTable permutations={permutations} />
      </Container>
    </AddonPanel>
  );
};

const Container = styled.div`
  padding: 10px;
  min-width: fit-content;
  margin: 0 auto;
  height: 100%;
`;

const Nav = styled.div`
  border-bottom: 1px solid white;
  text-align: end;
  width: 100%;
  position: relative;
  height: 40px;
`;

const Display = styled.div`
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: transparent;
  }

  &::-webkit-scrollbar {
    width: 7px;
    background-color: #323232;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #555;
  }
  height: 200px;
  overflow: auto;
  background: #2d2d2d;
`;
