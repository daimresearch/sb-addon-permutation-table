import React, { useEffect } from "react";
import { useRunner, UseRunnerProps } from "react-runner";
import { background, styled } from "@storybook/theming";
import { addons, useGlobals } from "@storybook/preview-api";
import { EVENTS } from "../constants";
import { getPreviewCode } from "../tools";
import { SBTheme } from "src/tools/theme";

interface Props extends Omit<UseRunnerProps, "code"> {
  sourceList: string[];
  permutations?: string[];
  argTypes: any;
  theme?: SBTheme;
}

const Error = styled.pre`
  background: #fcc;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0;
  padding: 1rem;
  color: #f00;
  white-space: pre-wrap;
`;

const Wrapper = styled.div<{
  sbTheme: SBTheme;
}>`
  & .--active {
    background-color: rgb(255, 240, 249);
    box-shadow: inset 0px 0px 1px 2px rgb(253, 43, 141);
  }

  table td,
  th {
    width: auto;
    min-width: 50px;
    padding: 0.5em;
  }
  table {
    /* table-layout: auto; */
    table-layout: fixed;
    text-align: center;
    //xx added
    border-collapse: collapse;
    color: ${(props) => props.sbTheme.color};
  }

  //added
  table .stickyCol {
    box-shadow: inset -1px 0px 0px ${(props) => props.sbTheme.border};
    position: sticky;
    left: 0;
    background-color: ${(props) => props.sbTheme.background};
    z-index: 2;
    transition: background-color 0.3s;
  }

  table thead tr.outpost {
    border-bottom: solid 1px ${(props) => props.sbTheme.border};
  }

  table thead tr th {
    position: relative;
  }
  table tbody tr td {
    position: relative;
  }
`;

export const Preview = ({
  scope,
  disableCache,
  permutations,
  sourceList,
  argTypes,
  theme,
}: Props) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const previewCode = getPreviewCode(sourceList, permutations, argTypes);

  const { element, error } = useRunner({
    code: previewCode,
    scope,
    disableCache,
  });

  useEffect(() => {
    const doms = ref.current.querySelectorAll('[role="component"]');
    if (doms) {
      doms.forEach((d) =>
        d.addEventListener("mouseenter", (e) => {
          if (d instanceof HTMLElement) {
            const id = d.dataset.target;
            addons.getChannel().emit(EVENTS.TABLE_ENTER, id);
            d.classList.add("--active");
          }
        })
      );
      doms.forEach((d) =>
        d.addEventListener("mouseleave", (e) => {
          if (d instanceof HTMLElement) {
            const id = d.dataset.target;
            addons.getChannel().emit(EVENTS.TABLE_LEAVE, id);
            d.classList.remove("--active");
          }
        })
      );
    }
  }, [element]);

  return (
    <Wrapper sbTheme={theme}>
      <div ref={ref}>
        {element}
        {error && <Error>{error}</Error>}
      </div>
    </Wrapper>
  );
};
