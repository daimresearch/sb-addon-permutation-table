import React from "react";
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from "@mui/material";

type ButtonProps = Pick<
  MuiButtonProps,
  "variant" | "size" | "disabled" | "color"
> & { label: string };

export function Button({ label, ...props }: ButtonProps) {
  return <MuiButton {...props}>{label}</MuiButton>;
}
