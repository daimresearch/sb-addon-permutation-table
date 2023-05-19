import * as R from "ramda";
import { cartesianProduct, getConvertedList, Property } from "./permutations";
import { extractAttributeFromTag } from "./common";
import { Args, ArgTypes } from "@storybook/types";

const indexMap = R.curry(R.addIndex(R.map));
const mapJoin = (fn: (...args: any) => any, list: any[], token = "") =>
  R.pipe(indexMap(fn), R.join(token))(list);

const isLastElement = (i: number, list: any[]) =>
  i + 1 === list.length ? "--last" : undefined;

export function getPreviewCode(
  sourceList: string[],
  permutations: string[],
  argTypes: ArgTypes<any>[] = []
) {
  if (permutations.length <= 1)
    return `<div>${mapJoin(
      (e) => `
    <div data-target='${extractAttributeFromTag(e)}' ${
        permutations.length !== 0 ? 'role="component"' : ""
      }>
    ${e}
    </div>
    `,
      sourceList
    )}</div>`;

  const convertedList = getConvertedList(permutations, argTypes);

  const [horizen, ...verticals] = convertedList;

  return `
  <table>
    ${TableHead(horizen, verticals)}
    ${TableBody(horizen, verticals, sourceList)}
  </table>`;
}

const TableBody = (
  horizen: Property,
  verticals: Property[],
  sourceList: string[]
) => {
  if (horizen === undefined || verticals.length === 0) return ``;

  // 가로 열 곱집합
  const horizenCombinationList = horizen.values.map((elem) => ({
    [horizen.prop]: elem,
  }));

  // 세로 열 곱집합
  const verticalCombinationList: { [key: string]: any }[] = cartesianProduct(
    ...verticals.map(({ values }) => values)
  ).map((values) =>
    verticals.reduce(
      (obj, { prop }, i) => ({ ...obj, [prop]: values[i] }),
      {} as { [key: string]: any }
    )
  );

  const tcontents = verticalCombinationList
    .map((elem) => {
      const values = mapJoin(
        (e, i) =>
          `<td className="${isLastElement(i, R.values(elem))}">${e}</td>`,
        R.values(elem)
      );

      const horizenFinderList = R.map((e: { [x: string]: any }) =>
        R.mergeLeft(e, elem)
      )(horizenCombinationList);

      const finderFnList = horizenFinderList.map((elem) => {
        const fn = R.toPairs(elem).map(([key, value]) => {
          if (typeof value === "string" || typeof value === "number")
            return (str: string) => str.includes(`${key}="${value}"`);
          if (value === true) return (str: string) => str.includes(`${key}`);
          if (value === false) return (str: string) => !str.includes(`${key}`);
          return (str: string) => str.includes(`${key}="${value}"`); // XXX: change this to default?
        });
        return fn;
      });

      const matched = finderFnList.map((e) => {
        return sourceList.filter((str) => e.every((fn) => fn(str)));
      });

      const options = mapJoin(
        (e) => `<td role='component'
        data-target='${extractAttributeFromTag(e)}'
        >${e}</td>`,
        R.flatten(matched)
      );

      return `
    <tr>
        ${values}
        ${options}
    </tr>
    `;
    })
    .join("");

  return `
    <tbody>
        ${tcontents}
    </tbody>
`;
};

const TableHead = (horizen: Property, verticals: Property[]) => {
  if (horizen === undefined || verticals.length === 0) return ``;

  return `
      <thead>
      <tr role="row">
                ${mapJoin(
                  (e, i) =>
                    `<th className="${isLastElement(i, verticals)}"></th>`,
                  verticals
                )}
            <th colSpan="${horizen.values.length}">${horizen.prop}</th>
        </tr>
        <tr role='row' style={{boxShadow:'0px 1px #bbb'}}>
            ${mapJoin(
              (e, i) =>
                `<th className="${isLastElement(i, verticals)}">${e.prop}</th>`,
              verticals
            )}
            ${mapJoin((e) => `<th>${e}</th>`, horizen.values)}
        </tr>
    </thead>
    `;
};
