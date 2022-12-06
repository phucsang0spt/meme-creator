import { Group } from "konva/lib/Group";
import { Image } from "konva/lib/shapes/Image";
import { Rect } from "konva/lib/shapes/Rect";
import { InteractLayer } from "./interact-layer";

export const ToolIconAttr = {
  size: 24,
  spacing: 20,
};

export class ShapeUtilities {
  constructor(public readonly shape: ShapeInput) {}

  destroy() {
    this.shape.onBeforeDestroy?.();
    this.shape.destroy();
  }

  generateTransformTools() {
    const shape = this.shape as ShapeWithUtilities;
    const layer = shape.getLayer() as InteractLayer;
    const holderHeight = 30;
    const holderMarginTop = 40;
    const group = new Group({
      x: shape.x(),
      y: shape.y() + shape.getClientRect().height / 2 + holderMarginTop,
    });

    const deleteBtn = new Image({
      y: 0,
      offsetX: ToolIconAttr.size / 2,
      offsetY: ToolIconAttr.size / 2,
      image: layer.assets.trashIcon,
    });
    const refreshBtn = new Image({
      y: 0,
      offsetX: ToolIconAttr.size / 2,
      offsetY: ToolIconAttr.size / 2,
      image: layer.assets.refreshIcon,
    });

    refreshBtn.on("click tap", () => {
      shape.scale({ x: 1, y: 1 });
      shape.rotation(0);
      group.setAttrs({
        x: shape.x(),
        y: shape.y() + shape.getClientRect().height / 2 + holderMarginTop,
      });
    });

    deleteBtn.on("click tap", () => {
      // delete shape
      layer.removeTarget(shape);
    });

    const tools = [
      deleteBtn,
      refreshBtn,
      ...(shape.getTransformTools?.(layer.assets) || []),
    ];
    if ((shape as ShapeInput).canDuplicate) {
      const duplicateBtn = new Image({
        y: 0,
        offsetX: ToolIconAttr.size / 2,
        offsetY: ToolIconAttr.size / 2,
        image: layer.assets.copyIcon,
      });

      duplicateBtn.on("click tap", () => {
        layer.add(shape.clone());
      });
      tools.push(duplicateBtn);
    }

    const holderWidth =
      ToolIconAttr.size * tools.length +
      (tools.length - 1) * ToolIconAttr.spacing;

    const left = 0 - holderWidth / 2 + ToolIconAttr.size / 2;

    tools.forEach((tool, i) => {
      tool.x(left + i * (ToolIconAttr.size + ToolIconAttr.spacing));
    });
    const holder = new Rect({
      x: 0,
      y: 0,
      offsetX: (25 + holderWidth + 25) / 2,
      offsetY: holderHeight / 2,
      width: 25 + holderWidth + 25,
      height: holderHeight,
      fill: "whitesmoke",
      stroke: "#39c",
      strokeWidth: 1,
      cornerRadius: 5,
      name: "remover-holder",
    });
    group.add(holder);
    for (const tool of tools) {
      group.add(tool);
    }
    layer.add(group);

    shape.on("transform", () => {
      // update tool position when move
      group.setAttrs({
        x: shape.x(),
        y: shape.y() + shape.getClientRect().height / 2 + holderMarginTop,
      });
    });
    shape.on("dragmove", () => {
      // update tool position when move
      group.setAttrs({
        x: shape.x(),
        y: shape.y() + shape.getClientRect().height / 2 + holderMarginTop,
      });
    });
    return group;
  }
}
