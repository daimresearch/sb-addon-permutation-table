import * as R from "ramda";
import { attrExtractRegex } from "src/utils/regex";

export const extractAttributeFromTag = (tag: string) =>
  R.pipe(
    R.match(attrExtractRegex),
    R.head,
    R.defaultTo(""),
    R.replace(/"/g, "")
  )(tag);
