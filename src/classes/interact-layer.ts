import { downloadFile } from "download";
import { ViewPortEntity } from "entities/viewport.entity";
import Konva from "konva";
import { Shape, ShapeConfig } from "konva/lib/Shape";
import { Transformer } from "konva/lib/shapes/Transformer";
import { LayerEZ } from "./layer.ez";

export class InteractLayer extends LayerEZ {
  private tr!: Transformer;
  constructor() {
    super();
    this.onAddedToStage = () => {
      this.setupTransformer();
    };
  }

  iterativeShapes(on: (shape: Shape) => void) {
    const shapes: Shape[] = [];
    for (const shape of this.getChildren()) {
      if (shape instanceof Shape && shape.name() !== "holder") {
        on(shape);
        shapes.push(shape);
      }
    }
    return shapes;
  }

  private getShapesBounding() {
    let left: number, right: number;
    let top: number, bottom: number;
    const shapes = this.iterativeShapes((shape) => {
      const shapeX = shape.x();
      const shapeY = shape.y();
      const shapeWidth = shape.width();
      const shapeHeight = shape.height();

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

  export(viewportEntity: ViewPortEntity, trim: boolean) {
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
    const img = new Image();
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
      downloadFile("meme.png", output);

      document.body.removeChild(canvas);
    };
    img.src = src;
  }

  private clearTransformer() {
    this.tr.nodes([]);
  }

  private setupTransformer() {
    const stage = this.getStage();
    this.tr = new Konva.Transformer();
    this.originAdd(this.tr);
    // add a new feature, lets add ability to draw selection rectangle
    const selectionRectangle = new Konva.Rect({
      fill: "rgba(0,0,255,0.5)",
      visible: false,
      name: "holder",
    });
    this.originAdd(selectionRectangle);

    let x1: number, y1: number, x2: number, y2: number;
    stage.on("mousedown touchstart", (e) => {
      // do nothing if we mousedown on any shape
      if (e.target !== stage) {
        return;
      }
      e.evt.preventDefault();
      x1 = stage.getPointerPosition().x;
      y1 = stage.getPointerPosition().y;
      x2 = stage.getPointerPosition().x;
      y2 = stage.getPointerPosition().y;

      selectionRectangle.visible(true);
      selectionRectangle.width(0);
      selectionRectangle.height(0);
    });

    stage.on("mousemove touchmove", (e) => {
      // do nothing if we didn't start selection
      if (!selectionRectangle.visible()) {
        return;
      }
      e.evt.preventDefault();
      x2 = stage.getPointerPosition().x;
      y2 = stage.getPointerPosition().y;

      selectionRectangle.setAttrs({
        x: Math.min(x1, x2),
        y: Math.min(y1, y2),
        width: Math.abs(x2 - x1),
        height: Math.abs(y2 - y1),
      });
    });

    stage.on("mouseup touchend", (e) => {
      // do nothing if we didn't start selection
      if (!selectionRectangle.visible()) {
        return;
      }
      e.evt.preventDefault();
      // update visibility in timeout, so we can check it in click event
      setTimeout(() => {
        selectionRectangle.visible(false);
      });

      var shapes = stage.find(".selectable-shape");
      var box = selectionRectangle.getClientRect();
      var selected = shapes.filter((shape) =>
        Konva.Util.haveIntersection(box, shape.getClientRect())
      );
      this.tr.nodes(selected);
    });

    // clicks should select/deselect shapes
    stage.on("click tap", (e) => {
      // if we are selecting with rect, do nothing
      if (selectionRectangle.visible()) {
        return;
      }
      const target = e.target;

      // if click on empty area - remove all selections
      if (target === stage) {
        this.tr.nodes([]);
        return;
      }

      // do nothing if clicked NOT on our rectangles
      if (!target.hasName("selectable-shape")) {
        return;
      }

      // do we pressed shift or ctrl?
      const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;
      const isSelected = this.tr.nodes().indexOf(target) >= 0;

      if (!metaPressed && !isSelected) {
        // if no key pressed and the node is not selected
        // select just one
        this.tr.nodes([target]);
      } else if (metaPressed && isSelected) {
        // if we pressed keys and node was selected
        // we need to remove it from selection:
        const nodes = this.tr.nodes().slice(); // use slice to have new copy of array
        // remove node from array
        nodes.splice(nodes.indexOf(target), 1);
        this.tr.nodes(nodes);
      } else if (metaPressed && !isSelected) {
        // add the node into selection
        const nodes = this.tr.nodes().concat([target]);
        this.tr.nodes(nodes);
      }
    });
  }

  add(shape: Shape<ShapeConfig>) {
    shape.name("selectable-shape");
    return super.add(shape);
  }
}
