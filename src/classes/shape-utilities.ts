import { Group } from "konva/lib/Group";
import { Image } from "konva/lib/shapes/Image";
import { Rect } from "konva/lib/shapes/Rect";
import { toCorrectPixel } from "px";
import { InteractLayer } from "./interact-layer";

export const ToolIconAttr = {
  size: toCorrectPixel(40, true),
  spacing: toCorrectPixel(20, true),
};

export class ShapeUtilities {
  constructor(public readonly shape: ShapeInput) {}

  destroy() {
    this.shape.onBeforeDestroy?.();
    this.shape.destroy();
  }

  generateTransformTools() {
    const iconSize = ToolIconAttr.size;
    const iconSpacing = ToolIconAttr.spacing;
    const shape = this.shape as ShapeWithUtilities;
    const layer = shape.getLayer() as InteractLayer;
    const viewportEntity = layer.viewportEntity;

    const moveUp = new Image({
      y: 0,
      offsetX: iconSize / 2,
      offsetY: iconSize / 2,
      width: iconSize,
      height: iconSize,
      image: layer.assets.layerUpIcon,
    });
    const moveDown = new Image({
      y: 0,
      offsetX: iconSize / 2,
      offsetY: iconSize / 2,
      width: iconSize,
      height: iconSize,
      image: layer.assets.layerDownIcon,
    });
    const deleteBtn = new Image({
      y: 0,
      offsetX: iconSize / 2,
      offsetY: iconSize / 2,
      image: layer.assets.trashIcon,
      width: iconSize,
      height: iconSize,
    });
    const refreshBtn = new Image({
      y: 0,
      offsetX: iconSize / 2,
      offsetY: iconSize / 2,
      image: layer.assets.refreshIcon,
      width: iconSize,
      height: iconSize,
    });

    refreshBtn.on("click tap", () => {
      shape.scale({ x: 1, y: 1 });
      shape.rotation(0);
    });

    deleteBtn.on("click tap", () => {
      // delete shape
      layer.removeTarget(shape);
    });

    moveDown.on("click tap", () => {
      shape.moveDown();
    });

    moveUp.on("click tap", () => {
      if (shape.getZIndex() < layer.maxZIndex) {
        shape.moveUp();
      }
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
        offsetX: iconSize / 2,
        offsetY: iconSize / 2,
        image: layer.assets.copyIcon,
        width: iconSize,
        height: iconSize,
      });

      duplicateBtn.on("click tap", () => {
        layer.add(shape.clone());
      });
      tools.push(duplicateBtn);
    }
    tools.push(moveUp, moveDown);

    const holderWidth = toCorrectPixel(10) + iconSize + toCorrectPixel(10);
    const holderHeight =
      iconSize * tools.length + (tools.length - 1) * iconSpacing;

    const holder = new Rect({
      x: 0,
      y: 0,
      offsetX: holderWidth / 2,
      offsetY: (25 + holderHeight + 25) / 2,
      width: holderWidth,
      height: 25 + holderHeight + 25,
      fill: "whitesmoke",
      stroke: "rgb(62, 62, 62)",
      strokeWidth: 1,
      cornerRadius: 5,
      name: "remover-holder",
    });

    const top = 0 - holderHeight / 2 + iconSize / 2;

    tools.forEach((tool, i) => {
      tool.y(top + i * (iconSize + iconSpacing));
    });

    const group = new Group({
      x:
        -viewportEntity.fixedResolution.width / 2 -
        holderWidth / 2 -
        toCorrectPixel(10),
      y: viewportEntity.basePosition.y,
      name: "group-tool",
    });
    (group as ShapeInput).toolable = false;

    group.add(holder);
    for (const tool of tools) {
      group.add(tool);
    }
    layer.add(group);
    return group;
  }
}
