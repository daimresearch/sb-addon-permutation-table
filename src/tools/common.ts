import * as R from "ramda";
import { attrExtractRegex } from "src/utils/regex";

export const extractAttributeFromTag = (tag: string) =>
  R.pipe(R.match(attrExtractRegex), R.head, R.defaultTo(""))(tag);

export const getQuotelessAtt = (tag: string) => {
  return R.pipe(extractAttributeFromTag, R.replace(/"/g, ""))(tag);
};
