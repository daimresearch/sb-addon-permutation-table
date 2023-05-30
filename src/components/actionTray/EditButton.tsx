import React, { useRef, useState } from "react";
import { styled } from "@storybook/theming";
import * as R from "ramda";
import { Icons, IconButton, icons } from "@storybook/components";
import { addons, useArgs } from "@storybook/manager-api";

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
import { EVENTS } from "../../constants";
import { extractAttributeFromTag, getQuotelessAtt } from "../../tools";
import { Args } from "@storybook/types";
import { attrSplitRegex } from "src/utils/regex";

interface Props {
  hoverTitle?: string;
  clickTitle?: string;
  icon?: keyof typeof icons;
  onClick?: (...arg: any) => void;
  code: string;
}
const emptyandObjProps = (e: string) => R.includes("{", e) || R.isEmpty(e);

const getUpdatedArgs = (code: string) => {
  return R.pipe(
    R.apply(extractAttributeFromTag),
    R.match(attrSplitRegex),
    R.reject(emptyandObjProps),
    R.reduce((pre, cur) => {
      const [key, value] = cur.split("=");
      if (!value) return { ...pre, [key]: true };
      return { ...pre, [key]: value.replace(/"|'/g, "") };
    }, {})
  )([code]);
};

const defaultOnClick = (
  code: string,
  updateArgs: Function,
  defaultArgs: Args
) => {
  addons.getChannel().emit(EVENTS.SET_PERMUTATIONS, "", "clear");
  const updatedArgs = getUpdatedArgs(code);
  const clearArgs = R.mapObjIndexed((value, key) => {
    if (typeof value === "boolean") return false;
    return value;
  }, defaultArgs);

  const args = R.mergeRight(clearArgs, updatedArgs);
  updateArgs(args);
};

//default feature : update Args on click and clear permutations

export const EditButton = ({
  hoverTitle = "",
  clickTitle = "",
  icon = "edit",
  code,
  onClick,
}: Props) => {
  const [args, updateArgs, resetArgs] = useArgs();

  //floating tooltips
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

  const hover = useHover(context);
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
    onClick ? onClick(e) : defaultOnClick(code, updateArgs, args);

  return (
    <div
      ref={refs.setReference}
      {...getReferenceProps}
      onMouseLeave={() => setText(hoverTitle)}
    >
      <BaseButton title={hoverTitle} onClick={handleClick} icon={icon} />
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
