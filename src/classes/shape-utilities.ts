import { Group } from "konva/lib/Group";
import { Image } from "konva/lib/shapes/Image";
import { Rect } from "konva/lib/shapes/Rect";
import { InteractLayer } from "./interact-layer";

export const ToolIconAttr = {
  size: 12,
  spacing: 10,
};

export class ShapeUtilities {
  constructor(public readonly shape: ShapeInput) {}

  destroy() {
    this.shape.onBeforeDestroy?.();
    this.shape.destroy();
  }

  generateTransformTools() {
    const iconSize = Renderer.constrainMax(
      ToolIconAttr.size * Renderer.pixelDensity(),
      40
    );
    const iconSpacing = Renderer.constrainMax(
      ToolIconAttr.spacing * Renderer.pixelDensity(),
      45
    );
    const shape = this.shape as ShapeWithUtilities;
    const layer = shape.getLayer() as InteractLayer;
    const viewportEntity = layer.viewportEntity;
    const holderHeight = 10 + iconSize + 10;
    const group = new Group({
      x: viewportEntity.basePosition.x,
      y:
        viewportEntity.basePosition.y -
        viewportEntity.fixedResolution.height / 2 -
        holderHeight / 2 -
        viewportEntity.description.getClientRect().height -
        5 -
        10,
      name: "group-tool",
    });
    (group as ShapeInput).toolable = false;

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

    const holderWidth =
      iconSize * tools.length + (tools.length - 1) * iconSpacing;

    const left = 0 - holderWidth / 2 + iconSize / 2;

    tools.forEach((tool, i) => {
      tool.x(left + i * (iconSize + iconSpacing));
    });
    const holder = new Rect({
      x: 0,
      y: 0,
      offsetX: (25 + holderWidth + 25) / 2,
      offsetY: holderHeight / 2,
      width: 25 + holderWidth + 25,
      height: holderHeight,
      fill: "whitesmoke",
      stroke: "rgb(62, 62, 62)",
      strokeWidth: 1,
      cornerRadius: 5,
      name: "remover-holder",
    });
    group.add(holder);
    for (const tool of tools) {
      group.add(tool);
    }
    layer.add(group);
    return group;
  }
}
