import React, { useEffect } from "react";
import { useRunner, UseRunnerProps } from "react-runner";
import { styled } from "@storybook/theming";
import { addons } from "@storybook/preview-api";
import { EVENTS } from "../constants";
import { getPreviewCode } from "../tools";

interface Props extends Omit<UseRunnerProps, "code"> {
  sourceList: string[];
  permutations?: string[];
  argTypes: any;
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

const Wrapper = styled.div`
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
  }
  table thead tr th {
    position: relative;
  }
  table tbody tr td {
    position: relative;
  }

  table thead tr th.--last::after {
    position: absolute;
    content: "";
    width: 1px;
    height: 105%;
    background-color: #bbbbbb;
    top: 0;
    right: 0;
  }
  table tbody tr td.--last::after {
    position: absolute;
    content: "";
    width: 1px;
    height: 105%;
    background-color: #bbbbbb;
    top: 0;
    right: 0;
  }
`;

export const Preview = ({
  scope,
  disableCache,
  permutations,
  sourceList,
  argTypes,
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
    <Wrapper>
      <div ref={ref}>
        {element}
        {error && <Error>{error}</Error>}
      </div>
    </Wrapper>
  );
};
