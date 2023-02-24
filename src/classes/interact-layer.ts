import Konva from "konva";
import { Group } from "konva/lib/Group";
import { Shape } from "konva/lib/Shape";
import { Transformer } from "konva/lib/shapes/Transformer";

import { ViewPortEntity } from "entities/viewport.entity";

import { downloadFile } from "download";

import { LayerEZ } from "./layer.ez";
import { toCorrectPixel } from "px";

export class InteractLayer extends LayerEZ {
  private tr!: Transformer;
  private readonly toolStack: Record<string, Group> = {};
  private selectedShape: ShapeInput;
  constructor(
    public readonly viewportEntity: ViewPortEntity,
    public readonly assets: {
      copyIcon: HTMLImageElement;
      trashIcon: HTMLImageElement;
      refreshIcon: HTMLImageElement;
      settingsIcon: HTMLImageElement;
      layerDownIcon: HTMLImageElement;
      layerUpIcon: HTMLImageElement;
    }
  ) {
    super();
    this.onAddedToStage = () => {
      this.setupTransformer();
    };
  }

  private getShapesBounding() {
    let left: number, right: number;
    let top: number, bottom: number;
    const shapes = this.iterativeShapes((shape) => {
      const { width: shapeWidth, height: shapeHeight } = shape.getClientRect();
      const shapeX = shape.x();
      const shapeY = shape.y();

      const shapeLeft = shapeX - shapeWidth / 2;
      const shapeRight = shapeX + shapeWidth / 2;

      const shapeTop = shapeY - shapeHeight / 2;
      const shapeBottom = shapeY + shapeHeight / 2;

      if (left != null) {
        if (shapeLeft < left) {
          left = shapeLeft;
        }
      } else {
        left = shapeLeft;
      }

      if (right != null) {
        if (shapeRight > right) {
          right = shapeRight;
        }
      } else {
        right = shapeRight;
      }

      if (top != null) {
        if (shapeTop < top) {
          top = shapeTop;
        }
      } else {
        top = shapeTop;
      }
      if (bottom != null) {
        if (shapeBottom > bottom) {
          bottom = shapeBottom;
        }
      } else {
        bottom = shapeBottom;
      }
    });

    if (shapes.length) {
      return {
        left: left + this.renderer.width / 2,
        top: top + this.renderer.height / 2,
        right: right + this.renderer.width / 2,
        bottom: bottom + this.renderer.height / 2,
      };
    }
    return undefined;
  }

  public clearTransformer() {
    this.tr.nodes([]);
    this.setSelectedTools(null);
  }

  public removeTarget(target: ShapeWithUtilities) {
    this.unTransformTarget(target as Shape);
    target.utilities.destroy();
  }

  private unTransformTarget(target: Shape) {
    const nodes = this.tr.nodes().slice(); // use slice to have new copy of array
    nodes.splice(nodes.indexOf(target), 1);
    this.tr.nodes(nodes);
    this.setSelectedTools(null);
  }

  private setSelectedTools(target: ShapeInput | null) {
    if (this.selectedShape) {
      if (
        !target ||
        target._id.toString() !== this.selectedShape._id.toString()
      ) {
        // destroy previous shape
        const id = this.selectedShape._id.toString();
        this.toolStack[id].destroy();
        delete this.toolStack[id];
      }
    }

    if (!target || !target.toolable) {
      this.selectedShape = null;
      return;
    }
    this.selectedShape = target;

    // show tool when selected
    const id = this.selectedShape._id.toString();
    if (!this.toolStack[id]) {
      this.toolStack[id] = (
        this.selectedShape as ShapeWithUtilities
      ).utilities.generateTransformTools();
    }
  }

  private setupTransformer() {
    const stage = this.getStage();
    this.tr = new Konva.Transformer({
      anchorSize: toCorrectPixel(16, true),
      anchorStrokeWidth: 0,
      keepRatio: true,
      rotateEnabled: false,
    });
    this.originAdd(this.tr);
    stage.on("click tap", (e) => {
      const target = e.target;

      // if click on empty area - remove all selections
      if (target === stage) {
        this.clearTransformer();
        return;
      }

      // do nothing if clicked NOT on our rectangles
      if (
        !(target instanceof Shape) ||
        !(target.parent instanceof InteractLayer)
      ) {
        return;
      }
      const allowTransform = !!target.draggable(); //only allow transform when draggable = true

      // do we pressed shift or ctrl?
      const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;
      const isSelected = this.tr.nodes().indexOf(target) >= 0;

      if (!metaPressed && !isSelected) {
        // if no key pressed and the node is not selected
        // select just one
        if (allowTransform) {
          this.tr.nodes([target]);
        } else {
          this.tr.nodes([]);
        }
        this.setSelectedTools(target);
      } else if (metaPressed && isSelected) {
        // if we pressed keys and node was selected
        // we need to remove it from selection:
        this.unTransformTarget(target as Shape);
      } else if (metaPressed && !isSelected) {
        // add the node into selection
        if (allowTransform) {
          const nodes = this.tr.nodes().concat([target]);
          this.tr.nodes(nodes);
        } else {
          this.tr.nodes([]);
        }
        this.setSelectedTools(target);
      }
    });
  }

  export(
    trim: boolean,
    events: { onStartExport?: () => void; onCompletedExport?: () => void } = {}
  ) {
    const viewportEntity = this.viewportEntity;
    const exportScale = 2;
    const resolutionRatio =
      viewportEntity.fixedResolution.width /
      viewportEntity.currentResolution.width;

    //reset camera
    this.renderer.simpleCamera.x = 0;
    this.renderer.simpleCamera.y = 0;
    this.clearTransformer();

    const canvas = document.createElement("canvas");
    canvas.width = viewportEntity.currentResolution.width;
    canvas.height = viewportEntity.currentResolution.height;

    const ctx = canvas.getContext("2d");
    document.body.appendChild(canvas);

    let cropZone: {
      left: number;
      top: number;
      width: number;
      height: number;
      right: number;
      bottom: number;
    };

    const viewportBounding = viewportEntity.getBounding(exportScale);
    const shapesBounding = this.getShapesBounding();
    if (shapesBounding && trim) {
      // trim by shapes bounding but can not overflow viewport
      cropZone = {
        left: shapesBounding.left * exportScale,
        right: shapesBounding.right * exportScale,
        top: shapesBounding.top * exportScale,
        bottom: shapesBounding.bottom * exportScale,
        width: 0,
        height: 0,
      };
      cropZone.left = this.renderer.constrainMin(
        cropZone.left,
        viewportBounding.left
      );
      cropZone.right = this.renderer.constrainMax(
        cropZone.right,
        viewportBounding.right
      );
      cropZone.top = this.renderer.constrainMin(
        cropZone.top,
        viewportBounding.top
      );
      cropZone.bottom = this.renderer.constrainMax(
        cropZone.bottom,
        viewportBounding.bottom
      );
      cropZone.width = cropZone.right - cropZone.left;
      cropZone.height = cropZone.bottom - cropZone.top;
    } else {
      cropZone = viewportBounding;
    }
    const src = this.toDataURL({
      pixelRatio: exportScale,
    });
    const img = new window.Image();
    img.onload = () => {
      const nonScaleCrop = {
        width: cropZone.width / exportScale,
        height: cropZone.height / exportScale,
      };

      // convert crop size to resolution ratio
      canvas.width = nonScaleCrop.width / resolutionRatio;
      canvas.height = nonScaleCrop.height / resolutionRatio;
      ctx.drawImage(
        img,
        cropZone.left,
        cropZone.top,
        cropZone.width,
        cropZone.height,
        0,
        0,
        canvas.width,
        canvas.height
      );

      const output = canvas.toDataURL("img/png");

      events.onStartExport?.();
      downloadFile("meme.png", output).then((isSuccess) => {
        events.onCompletedExport?.();
        if (isSuccess) {
          alert("Save meme successfully");
        }
      });

      document.body.removeChild(canvas);
    };
    img.src = src;
  }

  getPointerPosition() {
    const { x, y } = this.getStage().getPointerPosition();
    const { width, height, simpleCamera } = this.renderer;
    return {
      x: x - width / 2 + simpleCamera.x,
      y: y - height / 2 + simpleCamera.y,
    };
  }

  add(shape: ShapeInput) {
    if (shape.toolable == null) {
      shape.toolable = true;
    }
    if (shape.canDuplicate == null) {
      shape.canDuplicate = true;
    }
    if (shape.canRefresh == null) {
      shape.canRefresh = true;
    }
    if (shape.canUpDown == null) {
      shape.canUpDown = true;
    }
    const addedShape = super.add(shape);

    this.tr.moveToTop();
    return addedShape;
  }
}
