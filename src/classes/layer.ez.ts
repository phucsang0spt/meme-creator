import { Layer } from "konva/lib/Layer";
import { Shape, ShapeConfig } from "konva/lib/Shape";
import { Transformer } from "konva/lib/shapes/Transformer";

export class LayerEZ extends Layer {
  private _renderer: Window["Renderer"];
  public onAddedToStage?: () => void;

  get renderer() {
    return this._renderer;
  }

  get maxZIndex() {
    const firstShape = this.getChildren()[0];
    if (!firstShape) {
      return null;
    }
    let max = firstShape.getZIndex();
    this.iterativeShapes((shape) => {
      if (shape.getZIndex() > max) {
        max = shape.getZIndex();
      }
    });
    return max;
  }

  set renderer(_renderer: Window["Renderer"]) {
    if (this._renderer) {
      console.warn("Cant change renderer");
      return;
    }
    this._renderer = _renderer;
  }

  iterativeShapes(on: (shape: Shape) => void) {
    const shapes: Shape[] = [];
    for (const shape of this.getChildren()) {
      if (shape instanceof Shape) {
        shapes.push(shape);
      }
    }
    for (const shape of shapes) {
      on(shape);
    }

    return shapes;
  }

  originAdd(shape: Shape<ShapeConfig> | Transformer) {
    return super.add(shape);
  }

  add(shape: ShapeInput) {
    shape.offset({ x: shape.width() / 2, y: shape.height() / 2 });
    return super.add(shape);
  }
}
