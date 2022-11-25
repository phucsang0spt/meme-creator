import { ViewPortEntity } from "entities/viewport.entity";
import Konva from "konva";
import { Shape, ShapeConfig } from "konva/lib/Shape";
import { Transformer } from "konva/lib/shapes/Transformer";
import { downloadFile } from "utils";
import { LayerEZ } from "./layer.ez";

export class InteractLayer extends LayerEZ {
  private tr!: Transformer;
  constructor() {
    super();
    this.onAddedToStage = () => {
      this.setupTransformer();
    };
  }

  export(viewportEntity: ViewPortEntity) {
    //reset camera
    this.renderer.simpleCamera.x = 0;
    this.renderer.simpleCamera.y = 0;
    this.clearTransformer();
    const exportRatio = 2;

    const canvas = document.createElement("canvas");
    canvas.width = viewportEntity.currentResolution.width;
    canvas.height = viewportEntity.currentResolution.height;

    const ctx = canvas.getContext("2d");
    document.body.appendChild(canvas);

    const rendererSize = {
      width: this.renderer.width * exportRatio,
      height: this.renderer.height * exportRatio,
    };
    const viewport = {
      width: viewportEntity.fixedResolution.width * exportRatio,
      height: viewportEntity.fixedResolution.height * exportRatio,
      left:
        viewportEntity.basePosition.x * exportRatio +
        rendererSize.width / 2 -
        (viewportEntity.fixedResolution.width * exportRatio) / 2,
      top:
        rendererSize.height / 2 -
        (viewportEntity.fixedResolution.height * exportRatio) / 2 +
        viewportEntity.basePosition.y * exportRatio,
    };
    const src = this.toDataURL({
      pixelRatio: exportRatio,
    });
    const img = new Image();
    img.onload = () => {
      ctx.drawImage(
        img,
        viewport.left,
        viewport.top,
        viewport.width,
        viewport.height,
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
