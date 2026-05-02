import React, { useState } from "react";
import * as R from "ramda";
import { addons, useArgs } from "storybook/manager-api";
import { WithTooltip, TooltipNote } from "storybook/internal/components";

import { BaseButton } from "./BaseButton";
import { EVENTS } from "../../../constants";
import { extractAttributeFromTag, getQuotelessAtt } from "../../../tools";
import { Args } from "storybook/internal/types";
import { attrSplitRegex } from "../../../utils/regex";

interface Props {
  hoverTitle?: string;
  clickTitle?: string;
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
    }, {}),
  )([code]);
};

const defaultOnClick = (
  code: string,
  updateArgs: Function,
  defaultArgs: Args,
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

export const EditButton = ({
  hoverTitle = "",
  clickTitle = "",
  code,
  onClick,
}: Props) => {
  const [args, updateArgs, resetArgs] = useArgs();
  const [text, setText] = useState(hoverTitle);

  const handleClick = (e: any) =>
    onClick ? onClick(e) : defaultOnClick(code, updateArgs, args);

  return (
    <WithTooltip
      trigger="hover"
      placement="left"
      tooltip={text ? <TooltipNote note={text} /> : null}
    >
      <div onMouseLeave={() => setText(hoverTitle)}>
        <BaseButton title={hoverTitle} onClick={handleClick} icon="edit" />
      </div>
    </WithTooltip>
  );
};
