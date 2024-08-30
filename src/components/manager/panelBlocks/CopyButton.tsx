import React, { useRef, useState } from "react";
import {
  useFloating,
  autoUpdate,
  FloatingPortal,
  offset,
  flip,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  arrow,
} from "@floating-ui/react";

import { BaseButton, Tooltip, Arrow } from "./BaseButton";

//default feature :copy text to clipboard onclick
interface Props {
  hoverTitle?: string;
  clickTitle?: string;
  copyText: string;
  label?: string;
  onClick?: (...args: any) => void;
  style?: React.CSSProperties;
}

const defaultOnClick = (
  copyText: string,
  setText: React.Dispatch<string>,
  clickTitle: string,
) => {
  navigator.clipboard.writeText(copyText);
  setText(clickTitle);
};

export const CopyButton = ({
  hoverTitle = "",
  clickTitle = "",
  copyText,
  label,
  onClick,
  style,
}: Props) => {
  // floating tooltips
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState(hoverTitle);
  const arrowRef = useRef(null);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement: "left",
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(10),
      flip({ fallbackAxisSideDirection: "start" }),
      arrow({ element: arrowRef.current }),
    ],
  });

  const hover = useHover(context, { move: false });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "tooltip" });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);
  // handler
  const handleClick = (e: any) =>
    onClick ? onClick(e) : defaultOnClick(copyText, setText, clickTitle);

  return (
    <div
      ref={refs.setReference}
      {...getReferenceProps()}
      onMouseLeave={() => setText(hoverTitle)}
    >
      <BaseButton
        title={hoverTitle}
        onClick={handleClick}
        icon={"copy"}
        label={label}
        style={style}
      />
      <FloatingPortal>
        {isOpen && text && (
          <Tooltip
            ref={refs.setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
          >
            {text}
            <Arrow ref={arrowRef} x={-4} y={10} />
          </Tooltip>
        )}
      </FloatingPortal>
    </div>
  );
};
