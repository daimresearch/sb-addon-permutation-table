/**
 * to load the built addon in this test Storybook
 */
import { fileURLToPath } from "url";

const previewPath = fileURLToPath(
  new URL("../dist/preview.js", import.meta.url),
);
const managerPath = fileURLToPath(
  new URL("../dist/manager.js", import.meta.url),
);

export function previewAnnotations(entry = []) {
  return [...entry, previewPath];
}

export function managerEntries(entry = []) {
  return [...entry, managerPath];
}
