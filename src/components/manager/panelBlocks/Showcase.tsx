import React, { useRef } from "react";
import * as R from "ramda";
import { styled } from "@storybook/theming";
import { addons, useArgs } from "@storybook/manager-api";
import { getQuotelessAtt } from "../../../tools";
import { EVENTS } from "../../../constants";
import { CodeEditor } from "./CodeEditor";
import { Tray } from "./Tray";
import { EditButton } from "./EditButton";
import { CopyButton } from "./CopyButton";

interface ShowCaseProps {
  sourceCode: string[];
}

const Wrapper = styled.div``;
const Source = styled.div`
  /* overflow: auto; */
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &.--active,
  & .--active {
    background-color: rgba(255, 240, 249, 0.4) !important;
    box-shadow: inset 0px 0px 1px 2px rgb(253, 43, 141);
  }
`;

export const Showcase = ({ sourceCode }: ShowCaseProps) => {
  return (
    <Wrapper>
      {sourceCode.map((item, index) => {
        const data = getQuotelessAtt(item);
        return (
          <Source data-value={data} key={index}>
            <CodeEditor
              key={item}
              value={item}
              // defaultValue={item}
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
