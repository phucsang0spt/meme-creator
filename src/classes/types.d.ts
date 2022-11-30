type ShapeInput = (
  | import("konva/lib/Shape").Shape<import("konva/lib/Shape").ShapeConfig>
  | import("konva/lib/Group").Group
) & {
  toolable?: boolean;
  onBeforeDestroy?: () => void;
};
