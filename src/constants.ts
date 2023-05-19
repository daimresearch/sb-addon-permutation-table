export const ADDON_ID = "storybook/permutation-viewer";
export const PANEL_ID = `${ADDON_ID}/panel`;
// story의 parameter의 키로 들어가는 값
export const PARAM_KEY = `permutation`;
// 상동, story의 parameter의 키로 들어가는 값.
// 둘은 용도에 따라 구분된다.
export const SOURCE_KEY = "storySource";
export const PER_STATE = "permutation-state";

export const PACKAGE_NAME = "sb-addon-permutation";

export const EVENTS = {
  SET_CODE: `${ADDON_ID}/set-code`,
  SET_PERMUTATIONS: `${ADDON_ID}/set-permutation`,
  TABLE_ENTER: `${ADDON_ID}/table-enter`,
  TABLE_LEAVE: `${ADDON_ID}/table-leave`,
  SHOWCASE_ENTER: `${ADDON_ID}/showcase-enter`,
  SHOWCASE_LEAVE: `${ADDON_ID}/showcase-leave`,
};
