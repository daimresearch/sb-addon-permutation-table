import { Args, ArgTypes } from "@storybook/types";
import * as R from "ramda";
import { attrMatchingRegex, overOneSpaceRegex } from "../utils/regex";

export interface Property {
  prop: string;
  values: any[];
}

export interface Combination {
  [key: string]: any;
}
export const getConvertedList = (permutations: string[], argTypes: any) => {
  const convert = (elem: ArgTypes[0]) => {
    if (!permutations.includes(elem.name)) return;
    switch (elem.control.type) {
      case "select":
      case "radio":
        return { prop: elem.name, values: elem.options };
      case "boolean":
        return { prop: elem.name, values: [true, false] };
      default:
        return;
    }
  };

  return R.pipe(
    R.map(convert),
    R.values,
    R.reject(R.isNil),
  )(argTypes) as Property[];
};

export function cartesianProduct<T>(...arrs: T[][]): T[][] {
  if (arrs.length === 0) return [[]];
  const [head, ...tail] = arrs;
  const result = head.flatMap((x) =>
    cartesianProduct(...tail).map((xs) => [x, ...xs]),
  );
  return result;
}

export function injectArgsToCodeWithArgPermutations(
  code: string,
  argPermutations: Combination[],
) {
  const injected = argPermutations.map((arg) => injectArgPermToCode(code, arg));

  return injected;
}

export function injectArgPermToCode(code: string, args: Combination) {
  if (!code || !args) return "";

  const injected = R.toPairs(args).reduceRight((pre, [key, value]) => {
    // ** black list **
    if (key.startsWith("on")) return pre;
    if (key === "children") return pre;
    if (typeof value === "object") return pre;

    //remove matched props
    const regx = attrMatchingRegex(key);

    const addTempSpace = (match: string) => " " + match;

    const attReplaced = R.pipe(
      R.replace(regx, ``),
      R.replace(/\/?>/, addTempSpace),
    )(pre);

    switch (typeof value) {
      case "boolean":
        return value ? attReplaced.replace(" ", ` ${key} `) : attReplaced;
      case "string":
        return attReplaced.replace(" ", ` ${key}="${value}" `);
      default:
      case "object":
        return attReplaced.replace(" ", ` ${key}={${JSON.stringify(value)}} `);
    }
  }, code);

  const removeTempSpace = (match: string) => match.trim();
  return R.pipe(
    R.replace(overOneSpaceRegex, " "),
    R.replace(/\s\/?>/, removeTempSpace),
  )(injected);
}

export const convertArgTypeToArg = (argType: ArgTypes<Args>) => {
  const arg = Object.entries(argType).map((elem) => {
    // const [key, value] = elem;
    const [k, value] = elem;
    const key = value.name;

    switch (value.control?.type) {
      case "select":
      case "radio":
        return { prop: k, values: value.options };
      // return { prop: key, values: value.options };
      case "boolean":
        return { prop: k, values: [true, false] };
      // return { prop: key, values: [true, false] };
      case "object":
      default:
        return;
    }
  });

  return R.reject((e) => R.isNil(e))(arg) as Property[];
};

export const makePermutationsList = (
  data: Property[],
  permutations: string[],
) => {
  if (!data || permutations.length < 1) return [{}];

  const actived = R.filter((e: Property) => permutations.includes(e.prop))(
    data,
  );

  const combinationList: Combination[] = cartesianProduct(
    ...actived.map(({ values }) => values),
  ).map((values) =>
    actived.reduce(
      (obj, { prop }, i) => ({ ...obj, [prop]: values[i] }),
      {} as Combination,
    ),
  );

  return combinationList;
};

export const mergeArgWithPermutions = (
  arg: Args,
  permuations: Combination[],
) => {
  if (arg === undefined || Object.keys(arg).length === 0) return permuations;
  const argMerge = (elem: Combination) => R.mergeRight(arg, elem);
  return R.map(argMerge)(permuations);
};

export function getDataTarget(combination: Combination) {
  const fn = (pre: string, [key, value]: any[]) => {
    // ** black list **
    if (key.startsWith("on") || !value) return `${pre}`;
    if (key === "children") return `${pre}`;
    if (typeof value === "object") return `${pre}`;

    if (value === true) return `${pre} ${key}`;
    return `${pre} ${key}=${value}`;
  };
  return R.pipe(R.toPairs, R.reduce(fn, ""), R.trim)(combination);
}
