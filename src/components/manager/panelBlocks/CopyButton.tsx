import React, { useState } from "react";
import { WithTooltip, TooltipNote } from "storybook/internal/components";
import { BaseButton } from "./BaseButton";

interface Props {
  hoverTitle?: string;
  clickTitle?: string;
  copyText: string;
  label?: string;
  onClick?: (...args: any) => void;
  style?: React.CSSProperties;
}

export const CopyButton = ({
  hoverTitle = "",
  clickTitle = "",
  copyText,
  label,
  onClick,
  style,
}: Props) => {
  const [text, setText] = useState(hoverTitle);

  const handleClick = (e: any) => {
    if (onClick) {
      onClick(e);
    } else {
      navigator.clipboard.writeText(copyText);
      setText(clickTitle);
    }
  };

  return (
    <WithTooltip
      trigger="hover"
      placement="left"
      tooltip={text ? <TooltipNote note={text} /> : null}
    >
      <div onMouseLeave={() => setText(hoverTitle)}>
        <BaseButton
          title={hoverTitle}
          onClick={handleClick}
          icon="copy"
          label={label}
          style={style}
        />
      </div>
    </WithTooltip>
  );
};
