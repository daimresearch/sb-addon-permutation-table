import { Args, ArgTypes } from "@storybook/types";
import {
  makePermutationsList,
  mergeArgWithPermutions,
  injectArgsToCodeWithArgPermutations,
  convertArgTypeToArg,
} from "./index";

// sourceCode genenator for Panel. display code
export const sourceCodeWithArgPermutations = (
  source: string,
  args: ArgTypes<Args>,
  arg: Args,
  permutations: string[],
) => {
  const propertys = convertArgTypeToArg(args);
  const activedPermutations = makePermutationsList(propertys, permutations);
  const mergedArgs = mergeArgWithPermutions(arg, activedPermutations);
  const sourceCodes = injectArgsToCodeWithArgPermutations(source, mergedArgs);
  return sourceCodes;
};

// story args Generator for Preview area
export const storyCombinationGenerator = (
  argTypes: ArgTypes<Args>,
  args: Args,
  permutations: string[],
) => {
  const convertedArg = convertArgTypeToArg(argTypes);
  const activedPermutations = makePermutationsList(convertedArg, permutations);
  const mergedArgs = mergeArgWithPermutions(args, activedPermutations);
  return mergedArgs;
};
