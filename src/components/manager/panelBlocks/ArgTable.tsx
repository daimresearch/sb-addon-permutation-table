import React, { ChangeEvent, FC } from "react";
import { createRoot } from "react-dom/client"; // 나중에 교체해보자구
import * as R from "ramda";
import {
  useArgs,
  useGlobals,
  useArgTypes,
  useParameter,
  useStorybookState,
  addons,
  useAddonState,
} from "@storybook/manager-api";
import {
  PureArgsTable as ArgsTable,
  type PresetColor,
  type SortType,
} from "@storybook/blocks";
import type { ArgTypes } from "@storybook/types";
import { EVENTS, PANEL_ID, PERMUT_KEY } from "../../../constants";
import styled from "@emotion/styled";

import { LightningIcon, UndoIcon } from "@storybook/icons";

interface ControlsParameters {
  sort?: SortType;
  expanded?: boolean;
  presetColors?: Array<PresetColor>;
  hideNoControlsWarning?: boolean;
}
const PermutationCell = styled.span<any>`
  & {
    display: flex;
    align-items: center;
    justify-content: inherit;
  }

  &.body::before {
    content: "";
    display: block;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background-color: #fff;
    border: 1px solid #000;
  }

  &.--selected::before {
    background-color: #4aff4a;
  }

  & button.__permtation-table-button {
    cursor: pointer;
    margin: -4px -12px -4px 0;
    color: gray;
    border: none;
    background: transparent;
    display: flex;
    align-items: center;
    padding: 8px 7px;
    border-radius: 4px;
    transition: background 150ms ease-out;
    &:hover {
      background: rgba(2, 156, 253, 0.12);
      color: #029cfd;
    }
    &:focus {
      box-shadow: rgba(2, 156, 253, 1) 0 0 0 1px inset;
      outline: none;
    }
  }
  display: flex;
  justify-content: space-between;
  padding-left: 5px;
`;

const PermTableHead = () => {
  return (
    <div>
      <PermutationCell>
        Permutation
        <button
          className="__permtation-table-button"
          onClick={() => {
            addons.getChannel().emit(EVENTS.SET_PERMUTATIONS, "", "clear");
          }}
        >
          <UndoIcon />
        </button>
      </PermutationCell>
    </div>
  );
};

const PermTableBody = ({ rows, elem, theme, updateArgs, param }: any) => {
  const [name, control, permutation] = elem.querySelectorAll("td"); // node list

  // const key = name.querySelector("span").innerHTML;
  const displayKey = name.querySelector("span").innerHTML;
  const key = Object.entries(rows).find(
    ([_, value]) => value.name === displayKey,
  )[0];

  const controlHandlerFn = (key: string, value: any) => {
    addons.getChannel().emit(EVENTS.SET_PERMUTATIONS, key, "remove");
    updateArgs({ [key]: value });
  };

  const permutationHandlerFn = (e: Event, key: string) => {
    e.stopPropagation();
    addons.getChannel().emit(EVENTS.SET_PERMUTATIONS, key);
  };

  const getTypeofCell = (
    rows: Record<string, any>,
    key: string,
    deactivate: string,
  ) => {
    const test = Object.entries(rows).find(([_, value]) => value.name === key);
    const result = test[1];

    if (!result.control) return undefined;
    // if (result?.control) return undefined;
    if ((deactivate && deactivate.includes(key)) || !result) return false;
    return result.control.type;
  };

  // const cellType = getTypeofCell(rows, key, param?.deactivate);
  const cellType = getTypeofCell(rows, displayKey, param?.deactivate);

  switch (cellType) {
    case "radio":
      control.addEventListener("click", (e: any) =>
        controlHandlerFn(key, e.target.value),
      );

      return (
        <PermutationCell data-permutation={key} className="body">
          <button
            onClick={(e: any) => permutationHandlerFn(e, key)}
            //onClick={(e: any) => permutationHandlerFn(e, displayKey)}
            className="__permtation-table-button"
          >
            <LightningIcon />
          </button>
        </PermutationCell>
      );
    case "select":
      control.addEventListener("change", (e: ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation();
        controlHandlerFn(key, e.target.value);
      });
      return (
        <PermutationCell data-permutation={key} className="body">
          <button
            onClick={(e: any) => permutationHandlerFn(e, key)}
            className="__permtation-table-button"
          >
            <LightningIcon />
          </button>
        </PermutationCell>
      );
    case "boolean":
      control.addEventListener("change", (e: ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation();
        controlHandlerFn(key, e.target.checked ?? e.target.value);
      });
      return (
        <PermutationCell data-permutation={key} className="body">
          <button
            onClick={(e: any) => permutationHandlerFn(e, key)}
            //onClick={(e: any) => permutationHandlerFn(e, displayKey)}
            className="__permtation-table-button"
          >
            <LightningIcon />
          </button>
        </PermutationCell>
      );

    case false:
      return <div>Disabled</div>;

    default:
      return <div>-</div>;
  }
};
interface Props {
  permutations: string[];
}

export const ArgTable: FC<Props> = ({ permutations }) => {
  let [args, updateArgs, resetArgs] = useArgs();
  const [globals] = useGlobals();
  const rows = useArgTypes();
  const ref = React.useRef(null);
  const { presetColors, sort } = useParameter<ControlsParameters>(
    PERMUT_KEY,
    {},
  );
  const param = useParameter(PERMUT_KEY);

  const { path, selectedPanel } = useStorybookState();

  React.useEffect(() => {
    if (ref.current && selectedPanel === PANEL_ID) {
      const table = ref.current.querySelector("table") as Element;
      if (table) {
        const headtr = table.querySelector("thead tr");
        const bodytr = table.querySelectorAll("tbody tr");

        if (headtr) {
          const node = headtr.appendChild(document.createElement("th"));
          const newElem = React.createElement(PermTableHead, {});

          const root = createRoot(node);
          root.render(newElem);
        }
        if (bodytr) {
          bodytr.forEach(async (tr) => {
            const node = tr.appendChild(document.createElement("td"));
            const newElem = React.createElement(PermTableBody, {
              rows: rows,
              elem: tr,
              updateArgs,
              param,
            });

            const root = createRoot(node);
            root.render(newElem);

            permutations.forEach((e) => {
              const row = ref.current?.querySelector(
                `[data-permutation="${e}"]`,
              );
              if (row) row.classList.add("--selected");
            });
          });
        }
      }
    }
  }, [selectedPanel]);

  if (ref.current) {
    const rowKeys = R.keys(rows);
    rowKeys.forEach((e) => {
      const row = ref.current?.querySelector(`[data-permutation="${e}"]`);
      if (row) row.classList.remove("--selected");
    });
    permutations.forEach((e) => {
      const row = ref.current?.querySelector(`[data-permutation="${e}"]`);
      if (row) row.classList.add("--selected");
    });
  }
  // permutation button color change
  if (selectedPanel !== PANEL_ID) {
    // XXX:  don't provide updateArgs and resetArgs when not in addon panel
    //also, rendering Edited ArgsTable causing Permutation column to be in the middle
    // need more digging to find out why
    //  ref: https://github.com/storybookjs/storybook/blob/next/code/ui/blocks/src/blocks/ArgsTable.tsx (line 184)
    return <ArgsTable {...{ key: path, rows, args, tabs: {} }} />;
  }

  const withPresetColors = Object.entries(rows).reduce((acc, [key, arg]) => {
    if (arg?.control?.type !== "color" || arg?.control?.presetColors)
      acc[key] = arg;
    else acc[key] = { ...arg, control: { ...arg.control, presetColors } };
    return acc;
  }, {} as ArgTypes);

  return (
    <div ref={ref}>
      <ArgsTable
        {...{
          key: path,
          compact: true,
          rows: withPresetColors,
          args,
          globals,
          updateArgs,
          resetArgs,
          inAddonPanel: true,
          sort,
        }}
      />
    </div>
  );
};
