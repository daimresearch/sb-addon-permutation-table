import React, { ReactNode, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
//useChannel까지는 필요 없을수 있다
import {
  makeDecorator,
  useChannel,
  useState,
  useMemo,
  useArgs,
} from "@storybook/preview-api";

import { Preview } from "./components/Preview";
import { EVENTS, PARAM_KEY, SOURCE_KEY } from "./constants";
import { StorySource, Options, LiveProps } from "./types";
import { Args } from "@storybook/types";
import { sourceCodeWithArgPermutations } from "./tools";
import {
  useArgTypes,
  useStorybookApi,
  useStorybookState,
  useAddonState,
} from "@storybook/manager-api";

export const withRunner = makeDecorator({
  name: "withRunner",
  parameterName: PARAM_KEY,
  wrapper: (storyFn, context) => {
    const storySource: StorySource = context.parameters[SOURCE_KEY];
    const options: Options = context.parameters[PARAM_KEY] || {};
    const ref = React.useRef<HTMLDivElement>(null);

    const scope = useMemo(() => {
      return { ...options.scope, args: context.args };
    }, [options.scope, context.args]);

    if (options.disable || !storySource) {
      return storyFn(context);
    }

    // context.component.name으로 이름 뽑을 수 있다.

    // sourceListState를 arg 따라가게 하면 되지 않나?

    const [permutations, setPermutations] = useState<string[]>([]);

    // control.color의 경우 렉이 생긴다.
    const sourceList = sourceCodeWithArgPermutations(
      storySource.source,
      context.argTypes,
      context.args,
      permutations
    );

    // 여기서는 코드가 통으로 박히니까 setCode가 있긴 해야한다.

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

    const preview = (
      <div ref={ref}>
        <Preview
          scope={scope}
          sourceList={sourceList}
          permutations={permutations}
          argTypes={context.argTypes}
        />
      </div>
    );

    const Wrapper = options.wrapper;
    if (Wrapper) return <Wrapper>{preview}</Wrapper>;
    return preview;
  },
});
