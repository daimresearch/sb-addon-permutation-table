import tinycolor from "tinycolor2";

export interface SBTheme {
  background: string;
  color: string;
  border: string;
}
export const makeTheme = (sbBackground?: string): SBTheme => {
  if (!sbBackground || sbBackground === "transparent")
    return {
      background: "#FFFFFF",
      color: "#000000",
      border: "#000000",
    };
  const color = tinycolor(sbBackground);

  return {
    background: color.toHexString(),
    color: tinycolor.mostReadable(color, ["#000", "#fff"]).toHexString(),
    border: color.isDark() ? "#fff" : "#000",
  };
};
