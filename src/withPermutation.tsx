import React, { useEffect, useState } from "react";
import { makeDecorator, useChannel, useGlobals } from "@storybook/preview-api";
import * as R from "ramda";
import {
  convertArgTypeToArg,
  makePermutationsList,
  mergeArgWithPermutions,
  storyCombinationGenerator,
} from "./tools";
import { Addon_LegacyStoryFn } from "@storybook/types";
import { StoryTable } from "./components/StoryTable";
import { Permutation } from "./types";
import { EVENTS, PERMUT_KEY } from "./constants";
import { makeTheme, SBTheme } from "src/tools/theme";
import { styled } from "@storybook/theming";

const Wrapper = styled.div<{
  sbTheme: SBTheme;
}>`
  & .--active {
    background-color: rgb(255, 240, 249);
    box-shadow: inset 0px 0px 1px 2px rgb(253, 43, 141);
  }

  //  table#permutation-table td,
  //  th {
  //    width: auto;
  //    min-width: 50px;
  //    padding: 0.5em;
  //  }
  table#permutation-table {
    table-layout: fixed;
    text-align: center;
    border-collapse: collapse;
    color: ${(props) => props.sbTheme.color};
  }

  //added
  table#permutation-table .stickyCol {
    box-shadow: inset -1px 0px 0px ${(props) => props.sbTheme.border};
    position: sticky;
    left: 0;
    background-color: ${(props) => props.sbTheme.background};
    z-index: 2;
    transition: background-color 0.3s;
  }

  table#permutation-table thead tr.outpost {
    border-bottom: solid 1px ${(props) => props.sbTheme.border};
  }

  table#permutation-table .permutation-inner-table {
    position: relative;
    width: 100%;
  }
  table#permutation-table .permutation-inner-table td,
  th {
    width: auto;
    min-width: 50px;
    padding: 0.5em;
  }
`;

export const withPermutation = makeDecorator({
  name: "withPermutation",
  parameterName: PERMUT_KEY,
  wrapper: (storyFn: Addon_LegacyStoryFn<any>, context, setting) => {
    const { argTypes, args: defaultArgs } = context;
    const options: Permutation = context.parameters[PERMUT_KEY] || {};

    if (context.viewMode === "docs") {
      return storyFn(context);
    }
    // if (options.disable) return storyFn(context);

    const autoload = context.parameters.permutation?.autoload ?? [];
    const deactivate = context.parameters.permutation?.deactivate ?? [];
    const argKeys = convertArgTypeToArg(context.argTypes);

    const autoPermutation =
      autoload === "all" ? argKeys.map((e: any) => e.prop) : autoload;

    const filteredAutoPermutation = R.without(
      deactivate,
      autoPermutation
    ) as string[];

    const [permutations, setPermutations] = useState<string[]>([]);

    useEffect(() => {
      setPermutations(filteredAutoPermutation);
    }, []);
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
      [EVENTS.SHOWCASE_ENTER]: (target: string) => {
        document
          .querySelector(`[data-target="${target}"]`)
          .classList.add("--active");
      },
      [EVENTS.SHOWCASE_LEAVE]: (target: string) => {
        document
          .querySelector(`[data-target="${target}"]`)
          .classList.remove("--active");
      },
    });

    if (argTypes) {
      const storyCombination = storyCombinationGenerator(
        argTypes,
        context.args,
        permutations
      );

      const [global] = useGlobals();
      const theme = makeTheme(global.backgrounds?.value);

      return (
        <Wrapper sbTheme={theme}>
          <StoryTable
            permutations={permutations}
            storyFn={storyFn}
            context={context}
            storyCombination={storyCombination}
          />
        </Wrapper>
      );
    }
    return storyFn(context);
  },
});
