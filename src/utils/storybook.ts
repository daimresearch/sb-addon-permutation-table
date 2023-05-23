import { API_LeafEntry } from "@storybook/types";

export const isStoryReady = (data: API_LeafEntry | undefined) => {
  if (!data) return false;
  return data.type === "story" ? data.prepared : true;
};
