import { ContextMode } from "enums";

export const ContextModes = [
  { label: "Image", code: ContextMode.IMAGE },
  { label: "Gif", code: ContextMode.GIF, disabled: true },
  { label: "Video", code: ContextMode.VIDEO, disabled: true },
];

export const Resolutions = {
  HD: {
    width: 740,
    height: 1280,
  },
  FULL_HD: {
    width: 1100,
    height: 1920,
  },
  TWO_K: {
    width: 1460,
    height: 2560,
  },
};
