import { ChangeEvent, FC } from "react";
import React from "react";
import { render } from "react-dom";
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
import { EVENTS, PANEL_ID, PERMUT_KEY } from "../constants";
import { styled, useTheme } from "@storybook/theming";
import { Icons, IconButton } from "@storybook/components";

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

  & button {
    margin: -4px -12px -4px 0;
  }
  display: flex;
  justify-content: space-between;
  padding-left: 5px;
`;

const PermTableHead = ({ theme }: any) => {
  return (
    <>
      <PermutationCell>
        Permutation
        <IconButton
          theme={theme}
          onClick={() => {
            addons.getChannel().emit(EVENTS.SET_PERMUTATIONS, "", "clear");
          }}
          title="reset permutations"
        >
          <Icons icon="undo" />
        </IconButton>
      </PermutationCell>
    </>
  );
};

const PermTableBody = ({ rows, elem, theme, updateArgs, param }: any) => {
  const [name, control, permutation] = elem.querySelectorAll("td"); // node list

  const key = name.querySelector("span").innerHTML;

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
    deactivate: string
  ) => {
    if (!rows[key]?.control) return undefined;
    if ((deactivate && deactivate.includes(key)) || !rows[key]) return false;
    return rows[key].control.type;
  };

  const cellType = getTypeofCell(rows, key, param?.deactivate);

  switch (cellType) {
    case "radio":
      control.addEventListener("click", (e: any) =>
        controlHandlerFn(key, e.target.value)
      );

      return (
        <PermutationCell data-permutation={key} className="body">
          <IconButton
            theme={theme}
            onClick={(e: any) => {
              permutationHandlerFn(e, key);
            }}
          >
            <Icons icon="lightning" />
          </IconButton>
        </PermutationCell>
      );
    case "select":
      control.addEventListener("change", (e: ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation();
        controlHandlerFn(key, e.target.value);
      });
      return (
        <PermutationCell data-permutation={key} className="body">
          <IconButton
            theme={theme}
            onClick={(e: any) => permutationHandlerFn(e, key)}
          >
            <Icons icon="lightning" />
          </IconButton>
        </PermutationCell>
      );
    case "boolean":
      control.addEventListener("change", (e: ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation();
        controlHandlerFn(key, e.target.checked ?? e.target.value);
      });
      return (
        <PermutationCell data-permutation={key} className="body">
          <IconButton
            theme={theme}
            onClick={(e: any) => permutationHandlerFn(e, key)}
          >
            <Icons icon="lightning" />
          </IconButton>
        </PermutationCell>
      );

    case false:
      return <div>Deactivated</div>;

    default:
      return <div />;
  }
};
interface Props {
  permutations: string[];
}

export const ArgTable: FC<Props> = ({ permutations }: Props) => {
  let [args, updateArgs, resetArgs] = useArgs();
  const [globals] = useGlobals();
  const rows = useArgTypes();
  const ref = React.useRef(null);
  const { presetColors, sort } = useParameter<ControlsParameters>(
    PERMUT_KEY,
    {}
  );

  const { path, selectedPanel } = useStorybookState();

  React.useEffect(() => {
    if (ref.current && selectedPanel === PANEL_ID) {
      const table = ref.current.querySelector("table") as Element;
      if (table) {
        const headtr = table.querySelector("thead tr");
        const bodytr = table.querySelectorAll("tbody tr");

        if (headtr) {
          const node = headtr.appendChild(document.createElement("th"));
          const newElem = React.createElement(PermTableHead, {
            theme,
            bodytr,
          });
          render(newElem, node);
        }
        if (bodytr) {
          bodytr.forEach(async (tr) => {
            const node = tr.appendChild(document.createElement("td"));
            const newElem = React.createElement(PermTableBody, {
              rows: rows,
              elem: tr,
              theme,
              updateArgs,
              param,
            });

            render(newElem, node, () => {
              permutations.forEach((e) => {
                const row = ref.current?.querySelector(
                  `[data-permutation="${e}"]`
                );
                if (row) row.classList.add("--selected");
              });
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

  // if (selectedPanel !== PANEL_ID) {
  //   // 그냥 상태만 갱신하면 .... Permutation column이 중간으로 끼어들어진다
  //   updateArgs = null;
  //   resetArgs = null;
  //   args = null;
  // }
  const theme = useTheme();
  const param = useParameter(PERMUT_KEY);

  const withPresetColors = Object.entries(rows).reduce((acc, [key, arg]) => {
    if (arg?.control?.type !== "color" || arg?.control?.presetColors)
      acc[key] = arg;
    else acc[key] = { ...arg, control: { ...arg.control, presetColors } };
    return acc;
  }, {} as ArgTypes);

  // render another column on arg Table
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
