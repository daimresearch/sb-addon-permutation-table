import React from "react";
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from "@mui/material";

type ButtonProps = Pick<
  MuiButtonProps,
  "variant" | "size" | "disabled" | "color"
>;

export function Button({ ...props }: ButtonProps) {
  return <MuiButton {...props}>Hello World</MuiButton>;
}
