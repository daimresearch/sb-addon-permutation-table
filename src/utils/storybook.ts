import { API_LeafEntry } from "@storybook/types";
import type { ReactElement } from "react";

export const isStoryReady = (data: API_LeafEntry | undefined) => {
  if (!data) return false;
  return data?.type === "story" ? data.prepared : true;
};
