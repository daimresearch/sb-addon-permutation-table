import React from "react";
import { Button as AntdButton, ButtonProps as AndBtnProps } from "antd";

// type ButtonProps = Pick<
//   AndBtnProps,
//   "type" | "block" | "disabled" | "ghost" | "loading" | "shape" | "size"
// > & { label: string;};

interface ButtonProps {
  label?: string;
  block?: boolean;
  danger?: boolean;
  disabled?: boolean;
  loading?: boolean;
  shape?: "circle" | "round" | "default";
  size?: "large" | "middle" | "small";
  type: "primary" | "ghost" | "dashed" | "link" | "text" | "default";
}

export const Button = ({
  label,
  block = false,
  danger = false,
  disabled = false,
  loading = false,
  shape = "default",
  size = "middle",
  type = "default",
  ...rest
}: ButtonProps) => {
  const props = { block, danger, disabled, loading, shape, size, type };
  return (
    <AntdButton {...rest} {...props}>
      {label}
    </AntdButton>
  );
};
