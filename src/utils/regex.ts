export const attrExtractRegex = new RegExp(/(?<=<\w*\s)[^>/]*/, "g");

export const attrMatchingRegex = (attr: string) =>
  // new RegExp(`${attr}(=({{)?("|').*("|')(}})?)?`, "g");
  // regex fix -> add word boundary,
  new RegExp(`${attr}\\b(=({{)?("|').*("|')(}})?)?`, "g");

export const overOneSpaceRegex = new RegExp(/\s+/, "g");

export const componentNameFromPathRegex = new RegExp(
  /\w*(?=.stories.(ts|js|tsx|jsx))/,
  "g"
);

export const attrSplitRegex = new RegExp(
  /\w+=("|')[^("|')]+("|')|\w*(?!\w)(?!=)(?!\{*[^{}]+\}+)/,
  "g"
);
