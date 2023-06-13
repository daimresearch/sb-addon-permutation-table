import * as R from "ramda";
import { cartesianProduct, getConvertedList, Property } from "./permutations";
import { getQuotelessAtt } from "./common";
import { Args, ArgTypes } from "@storybook/types";

const indexMap = R.curry(R.addIndex(R.map));
const mapJoin = (fn: (...args: any) => any, list: any[], token = "") =>
  R.pipe(indexMap(fn), R.join(token))(list);

export function getPreviewCode(
  sourceList: string[],
  permutations: string[],
  argTypes: ArgTypes<any>[] = []
) {
  const convertedList = getConvertedList(permutations, argTypes);
  if (convertedList.length <= 1)
    return `<div>${mapJoin(
      (e, i) => `
    <div data-target='${getQuotelessAtt(e)}' key="${i}" ${
        permutations.length !== 0 ? 'role="component"' : ""
      }>
    ${e}
    </div>
    `,
      sourceList
    )}</div>`;

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
    .map((elem, index) => {
      const values = mapJoin(
        ([key, value], i) => `
          <td key="${key}-${i}">${value}</td>
        `,
        R.toPairs(elem)
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
        (e, i) => `<td role='component'
        data-target='${getQuotelessAtt(e)}'
        key="${getQuotelessAtt(e)}"
        >${e}</td>`,
        R.flatten(matched)
      );
      return ` 
    <tr key="${index}" className="${index === 0 ? "head" : ""}">
      <td style={{padding:"0px"}} colSpan="${
        verticals.length
      }" className="stickyCol">
        <table>
          <tbody>
            <tr>
                  ${values}
            </tr>
          </tbody>
        </table>
      </td>
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
          <th colSpan="${verticals.length}" className="stickyCol">
            <table>
              <thead>
                <tr>
                    ${mapJoin(
                      (e, i) =>
                        `
                          <th></th>
                          `,
                      verticals
                    )}
                </tr>
              </thead>
            </table>
          </th>
          <th colSpan="${horizen.values.length}">${horizen.prop}</th>
        </tr>
        <tr role='row' className="outpost">
        <td colSpan="${verticals.length}" className="stickyCol">
        <table>
          <thead>
            <tr>
                  ${mapJoin(
                    (e, i) => `<th key="${e.prop}">${e.prop}</th>`,
                    verticals
                  )}
            </tr>
          </thead>
        </table>
          </td>
            ${mapJoin((e, i) => `<th key="${e}">${e}</th>`, horizen.values)}
        </tr>
    </thead>
    `;
};
