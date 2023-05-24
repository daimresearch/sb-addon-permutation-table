import React, { useRef } from "react";
import * as R from "ramda";
import { styled } from "@storybook/theming";
import { addons, useArgs } from "@storybook/manager-api";
import { extractAttributeFromTag, getQuotelessAtt } from "../tools";
import { EVENTS } from "../constants";
import { CodeEditor } from "./CodeEditor";
import { IconButton, Icons } from "@storybook/components";
import { CopyButton, EditButton, Tray } from "./actionTray";

interface ShowcaseProps {
  sourceCode: string[];
}

const Wrapper = styled.div``;
const Source = styled.div`
  overflow: auto;
  position: relative;

  &.--active,
  & .--active {
    background-color: rgba(255, 240, 249, 0.4) !important;
    box-shadow: inset 0px 0px 1px 2px rgb(253, 43, 141);
  }
`;

export const Showcase = ({ sourceCode }: ShowcaseProps) => {
  return (
    <Wrapper>
      {sourceCode.map((item, index) => {
        const data = getQuotelessAtt(item);
        return (
          <Source data-value={data} key={index}>
            <CodeEditor
              key={item}
              disabled={true}
              defaultValue={item}
              onMouseEnter={(e) => {
                addons.getChannel().emit(EVENTS.SHOWCASE_ENTER, data);
                e.currentTarget.classList.add("--active");
              }}
              onMouseLeave={(e) => {
                addons.getChannel().emit(EVENTS.SHOWCASE_LEAVE, data);
                e.currentTarget.classList.remove("--active");
              }}
            />
            <Tray>
              <CopyButton
                hoverTitle="Click to copy"
                clickTitle="Copied on clipboard!"
                copyText={item}
              />
              <EditButton hoverTitle="Edit code" code={item} />
            </Tray>
          </Source>
        );
      })}
    </Wrapper>
  );
};
