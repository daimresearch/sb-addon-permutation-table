import React from "react";
import { styled } from "@storybook/theming";
import { Icons, IconButton, icons } from "@storybook/components";

interface Props {
  title?: string;
  icon?: keyof typeof icons;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  label?: string;
  style?: React.CSSProperties;
}

export const BaseButton = ({
  title,
  icon = "copy",
  onClick,
  label,
  style,
}: Props) => {
  return (
    <IconButton title={title} onClick={onClick} style={style}>
      <span style={{ marginRight: "7px", fontSize: "90%" }}>{label}</span>
      <Icons icon={icon} />
    </IconButton>
  );
};

export const Tooltip = styled.div`
  width: max-content;
  background-color: #444;
  color: white;
  padding: 4px 8px;
  border-radius: 5px;
  font-size: 90%;
`;

export const Arrow = styled.div<{ x: number; y: number }>`
  position: absolute;
  background: #444;
  width: 10px;
  height: 10px;
  transform: rotate(45deg);
  top: ${({ y }) => (y != null ? `${y}px` : "")};
  right: ${({ x }) => (x != null ? `${x}px` : "")};
`;
