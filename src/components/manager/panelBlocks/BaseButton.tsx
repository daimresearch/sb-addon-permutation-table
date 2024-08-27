import React from "react";
import { styled } from "@storybook/theming";
import { IconButton, icons } from "@storybook/components";
import { CopyIcon, EditIcon, UndoIcon } from "@storybook/icons";

const BaseButton = ({ title, onClick, label, style, icon = "copy" }: Props) => {
  const IconsObj = {
    copy: CopyIcon,
    edit: EditIcon,
    undo: UndoIcon,
  };
  const Icon = IconsObj[icon];

  return (
    <IconButton title={title} onClick={onClick} style={style}>
      <span style={{ marginRight: "7px", fontSize: "90%" }}>{label}</span>{" "}
      <Icon />
    </IconButton>
  );
};
interface Props {
  title?: string;
  // icon?: keyof typeof icons;
  icon?: "copy" | "edit" | "undo";
  // icon?: Pick<typeof icons, "copy" | "edit">;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  label?: string;
  style?: React.CSSProperties;
}

export { BaseButton };
export type { Props as BaseButtonProps };

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
