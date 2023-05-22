import React from "react";
import { EuiButton } from "@elastic/eui";

type ButtonProps = {
  label: string;
  color?:
    | "text"
    | "accent"
    | "primary"
    | "success"
    | "warning"
    | "danger"
    | "ghost";
  fullWidth?: boolean;
  isDisabled?: boolean;
  size?: "s" | "m";
};

export const Button = ({ label, ...props }: ButtonProps) => {
  return <EuiButton {...props}>{label}</EuiButton>;
};
