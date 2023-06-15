import React, { ReactNode, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import {
  makeDecorator,
  useChannel,
  useState,
  useMemo,
  useArgs,
  useGlobals,
} from "@storybook/preview-api";
import { ThemeProvider } from "@storybook/theming";
import { Preview } from "./components/Preview";
import { EVENTS, PERMUT_KEY, SOURCE_KEY } from "./constants";
import { StorySource, Options, LiveProps } from "./types";
import { Args } from "@storybook/types";
import { sourceCodeWithArgPermutations } from "./tools";
import { makeTheme } from "./tools/theme";
import * as R from "ramda";
import { convertArgTypeToArg } from "./tools";


export const withRunner = makeDecorator({
  name: "withRunner",
  parameterName: PERMUT_KEY,
  wrapper: (storyFn, context) => {
    const storySource: StorySource = context.parameters[SOURCE_KEY];
    const options: Options = context.parameters[PERMUT_KEY] || {};
    const ref = React.useRef<HTMLDivElement>(null);
    // context conditions
    if (context.viewMode === "docs") {
      return storyFn(context);
    }

    // story conditions
    if (options.disable || !storySource) {
      return storyFn(context);
    }

    const autoload = context.parameters.permutation.autoload ?? [];
    const deactivate = context.parameters.permutation.deactivate ?? [];
    const argKeys = convertArgTypeToArg(context.argTypes);

    const autoPermutation =
      autoload === "all" ? argKeys.map((e: any) => e.prop) : autoload;

    const filteredAutoPermutation = R.without(
      deactivate,
      autoPermutation
    ) as string[];

    const scope = useMemo(() => {
      return { ...options.scope, args: context.args };
    }, [options.scope, context.args]);

    const [permutations, setPermutations] = useState<string[]>([]);

    useEffect(() => {
      setPermutations(filteredAutoPermutation);
    }, []);

    const sourceList = sourceCodeWithArgPermutations(
      storySource.source,
      context.argTypes,
      context.args,
      permutations
    );

    useChannel({
      [EVENTS.SET_CODE]: (newValue: string) => {
        // setSourceListState((_) => [newValue]);
      },
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

    const [global] = useGlobals();
    const theme = makeTheme(global.backgrounds?.value);

    const preview = (
      <div ref={ref}>
        <Preview
          scope={scope}
          sourceList={sourceList}
          permutations={permutations}
          argTypes={context.argTypes}
          theme={theme}
        />
      </div>
    );

    const Wrapper = options.wrapper;
    if (Wrapper) return <Wrapper>{preview}</Wrapper>;
    return preview;
  },
});
