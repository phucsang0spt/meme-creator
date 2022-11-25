import { ContextMode } from "enums";

export const ContextModes = [
  { label: "Image", code: ContextMode.IMAGE },
  { label: "Gif", code: ContextMode.GIF, disabled: true },
  { label: "Video", code: ContextMode.VIDEO, disabled: true },
];

export const Resolutions = {
  HD: {
    width: 720,
    height: 1280,
  },
  FULL_HD: {
    width: 1080,
    height: 1920,
  },
  TWO_K: {
    width: 1440,
    height: 2560,
  },
};
