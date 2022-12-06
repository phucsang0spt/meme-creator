type ShapeInput = (
  | import("konva/lib/Shape").Shape<import("konva/lib/Shape").ShapeConfig>
  | import("konva/lib/Group").Group
) & {
  toolable?: boolean;
  canDuplicate?: boolean;
  onBeforeDestroy?: () => void;
};

interface WithUtilities {
  utilities: import("./shape-utilities").ShapeUtilities;
  getTransformTools?: (
    assets: Record<string, HTMLImageElement>
  ) => import("konva/lib/shapes/Image").Image[];
}

type ShapeWithUtilities = (
  | import("konva/lib/Shape").Shape<import("konva/lib/Shape").ShapeConfig>
  | import("konva/lib/Group").Group
) &
  WithUtilities;
