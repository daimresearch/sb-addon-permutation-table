export const attrExtractRegex = new RegExp(/(?<=<\w*\s)[^>/]*/, "g");

export const attrMatchingRegex = (attr: string) =>
  new RegExp(`${attr}(=({{)?("|').*("|')(}})?)?`, "g");

export const overOneSpaceRegex = new RegExp(/\s+/, "g");

export const componentNameFromPathRegex = new RegExp(
  /\w*(?=.stories.(ts|js|tsx|jsx))/,
  "g"
);

// export const attrSplitRegex = new RegExp(/[^ ]+=("|')[^("|')]+("|')|\w*/, "g");
// export const attrSplitRegex = new RegExp(/[^ ]+=("|')[^("|')]+("|')|\w* /, "g"); // 이친구가 빈칸을 안잡도록처리하면 되는데

// 있는거 {{}} 포함하고 나중에 식에서 삭제
export const attrSplitRegex = new RegExp(
  /[^ ]+=(({{|"|')?[^ ]*(}}|"|'))|\w*/,
  "g"
);
