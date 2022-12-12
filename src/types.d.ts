declare interface Window {
  Renderer: import("react-simple-game-engine").P5;
}

declare var Renderer: Window["Renderer"];

type Picture = {
  id: string;
  src: string;
};

type MemeTemplate = Picture & {
  tags: string[];
};
