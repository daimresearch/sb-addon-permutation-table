export const attrExtractRegex = new RegExp(/(?<=<\w*\s).*(?=\s\/?>)/, "g");

export const attrMatchingRegex = (attr: string) =>
  new RegExp(`${attr}(=".*")?(?=\\s?)`, "g");

export const overOneSpaceRegex = new RegExp(/\s+/, "g");

export const componentNameFromPathRegex = new RegExp(
  /\w*(?=.stories.(ts|js|tsx|jsx))/,
  "g"
);
