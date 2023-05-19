import { Args, ArgTypes } from "@storybook/types";
import {
  makePermutationsList,
  mergeArgWithPermutions,
  injectArgsToCodeWithArgPermutations,
  convertArgTypeToArg,
} from "./index";

export const sourceCodeWithArgPermutations = (
  source: string,
  args: ArgTypes<Args>,
  arg: Args,
  permutations: string[]
) => {
  const propertys = convertArgTypeToArg(args);
  const activedPermutations = makePermutationsList(propertys, permutations);
  const mergedArgs = mergeArgWithPermutions(arg, activedPermutations);
  const sourceCodes = injectArgsToCodeWithArgPermutations(source, mergedArgs);
  return sourceCodes;
};
