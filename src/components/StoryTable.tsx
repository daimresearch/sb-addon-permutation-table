import * as R from "ramda";
import React from "react";
import {
  cartesianProduct,
  getConvertedList,
  Property,
  getQuotelessAtt,
  getDataTarget,
  Combination,
} from "../tools";
import {
  Addon_LegacyStoryFn,
  Addon_StoryContext,
  Renderer,
} from "@storybook/types";
import { EVENTS } from "../constants";
import { addons, useGlobals } from "@storybook/preview-api";
interface Props {
  storyCombination: Combination[];
  permutations: string[];
  storyFn: Addon_LegacyStoryFn<any>;
  context: Addon_StoryContext<Renderer>;
}
export function StoryTable({
  storyCombination,
  permutations,
  storyFn,
  context,
}: Props) {
  const convertedList = getConvertedList(permutations, context.argTypes);

  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const doms = ref.current?.querySelectorAll('[role="component"]');
    if (doms && doms.length > 1) {
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
  }, [storyCombination]);

  const dataTarget = R.pipe(R.map(getDataTarget))(storyCombination);

  const [horizen, ...verticals] = convertedList;

  if (convertedList.length <= 1) {
    return (
      <div ref={ref}>
        {storyCombination.map((e, i) => {
          return (
            <div data-target={dataTarget[i]} role="component" key={i}>
              {storyFn({ ...context, args: { ...e } })}
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
        {TableBody(horizen, verticals, storyFn, context)}
      </table>
    </div>
  );
}

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
  context: any
) => {
  if (horizen === undefined || verticals.length === 0) return <div></div>;

  const horizenCombinationList = horizen.values.map((e: any) => ({
    [horizen.prop]: e,
  }));
  const verticalCombinationList: { [key: string]: any }[] = cartesianProduct(
    ...verticals.map(({ values }) => values)
  ).map((values) =>
    verticals.reduce(
      (obj, { prop }, i) => ({ ...obj, [prop]: values[i] }),
      {} as { [key: string]: any }
    )
  );

  const tcontents = verticalCombinationList.map((elem, index) => {
    const values = R.toPairs(elem).map(([key, value], i) => (
      <td key={`${key}-${i}`}>{String(value)}</td>
    ));

    const horizenArgs = R.pipe(
      R.map((e: { [x: string]: any }) => R.mergeRight(e, elem)),
      R.map(R.mergeDeepRight(context.args))
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
