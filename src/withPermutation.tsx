import React from "react";
import {
  useState,
  useEffect,
  useChannel,
  addons,
  useRef,
} from "storybook/internal/preview-api";
import * as R from "ramda";
import { convertArgTypeToArg, storyCombinationGenerator } from "./tools";
import type {
  Renderer,
  StoryContext,
  PartialStoryFn as StoryFunction,
} from "storybook/internal/types";

import { EVENTS } from "./constants";

import {
  cartesianProduct,
  getConvertedList,
  Property,
  getDataTarget,
} from "./tools";

export const withPermutation = (
  StoryFn: StoryFunction<Renderer>,
  context: StoryContext<Renderer>,
) => {
  const { argTypes } = context;

  if (context.viewMode === "docs") return StoryFn(context);

  const autoload = context.parameters["permutation"]?.autoload ?? [];
  const deactivate = context.parameters.permutation?.deactivate ?? [];
  const argKeys = convertArgTypeToArg(context.argTypes);

  const autoPermutation =
    autoload === "all" ? argKeys.map((e) => e.prop) : autoload;

  const filteredAutoPermutation = R.without(
    deactivate,
    autoPermutation,
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
      permutations,
    );

    const convertedList = getConvertedList(permutations, context.argTypes);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const doms = ref.current?.querySelectorAll('[role="component"]');
      if (doms && doms.length > 1) {
        doms.forEach((d) =>
          d.addEventListener("mouseenter", (e) => {
            if (d instanceof HTMLElement) {
              const id = d.dataset.target;
              addons.getChannel().emit(EVENTS.TABLE_ENTER, id);
              d.classList.add("--active");
            }
          }),
        );
        doms.forEach((d) =>
          d.addEventListener("mouseleave", (e) => {
            if (d instanceof HTMLElement) {
              const id = d.dataset.target;
              addons.getChannel().emit(EVENTS.TABLE_LEAVE, id);
              d.classList.remove("--active");
            }
          }),
        );
      }
    }, [storyCombination]);

    const dataTarget = R.pipe(R.map(getDataTarget))(storyCombination);

    const [horizen, ...verticals] = convertedList;

    if (convertedList.length <= 1) {
      return (
        <div ref={ref}>
          {storyCombination.map((e, i) => {
            return (
              <div data-target={dataTarget[i]} role="component" key={i}>
                {StoryFn({ ...context, args: { ...e } })}
              </div>
            );
          })}
        </div>
      );
    }

    return (
      <div ref={ref}>
        <table id="permutation-table">
          {TableHead(horizen, verticals)}
          {TableBody(horizen, verticals, StoryFn, context)}
        </table>
      </div>
    );
  }

  return StoryFn(context);
};

// Table component
// NOTE: Got Missing initializer in const declaration error when import below code from other files

const TableHead = (horizen: Property, verticals: Property[]) => {
  if (horizen === undefined || verticals.length === 0) return <div></div>;

  return (
    <thead>
      <tr role="row">
        <th colSpan={verticals.length} className="stickyCol">
          <table className="permutation-inner-table">
            <thead>
              <tr>
                {verticals.map((e, i) => (
                  <th key={i}></th>
                ))}
              </tr>
            </thead>
          </table>
        </th>
        <th colSpan={horizen.values.length}>{horizen.prop}</th>
      </tr>
      <tr role="row" className="outpost">
        <td colSpan={verticals.length} className="stickyCol">
          <table className="permutation-inner-table">
            <thead>
              <tr>
                {verticals.map((e, i) => (
                  <th key={i}>{e.prop}</th>
                ))}
              </tr>
            </thead>
          </table>
        </td>
        {horizen.values.map((e) => (
          <th key={e}>{String(e)}</th>
        ))}
      </tr>
    </thead>
  );
};

const TableBody = (
  horizen: Property,
  verticals: Property[],
  storyFn: any,
  context: any,
) => {
  if (horizen === undefined || verticals.length === 0) return <div></div>;

  const horizenCombinationList = horizen.values.map((e: any) => ({
    [horizen.prop]: e,
  }));
  const verticalCombinationList: { [key: string]: any }[] = cartesianProduct(
    ...verticals.map(({ values }) => values),
  ).map((values) =>
    verticals.reduce(
      (obj, { prop }, i) => ({ ...obj, [prop]: values[i] }),
      {} as { [key: string]: any },
    ),
  );

  const tcontents = verticalCombinationList.map((elem, index) => {
    const values = R.toPairs(elem).map(([key, value], i) => (
      <td key={`${key}-${i}`}>{String(value)}</td>
    ));

    const horizenArgs = R.pipe(
      R.map((e: { [x: string]: any }) => R.mergeRight(e, elem)),
      R.map(R.mergeDeepRight(context.args)),
    )(horizenCombinationList);
    return (
      <tr>
        <td colSpan={verticals.length} className="stickyCol">
          <table className="permutation-inner-table">
            <tbody>
              <tr>{values}</tr>
            </tbody>
          </table>
        </td>
        {horizenArgs.map((e) => {
          return (
            <td
              key={getDataTarget(e)}
              data-target={getDataTarget(e)}
              role="component"
            >
              {storyFn({ ...context, args: e })}
            </td>
          );
        })}
      </tr>
    );
  });
  return <tbody>{tcontents}</tbody>;
};
