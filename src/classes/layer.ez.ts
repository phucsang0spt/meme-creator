import { Layer } from "konva/lib/Layer";
import { Shape, ShapeConfig } from "konva/lib/Shape";
import { Transformer } from "konva/lib/shapes/Transformer";

export class LayerEZ extends Layer {
  private _renderer: Window["Renderer"];
  public onAddedToStage?: () => void;

  get renderer() {
    return this._renderer;
  }

  set renderer(_renderer: Window["Renderer"]) {
    if (this._renderer) {
      console.warn("Cant change renderer");
      return;
    }
    this._renderer = _renderer;
  }

  originAdd(shape: Shape<ShapeConfig> | Transformer) {
    return super.add(shape);
  }

  add(shape: Shape<ShapeConfig>) {
    shape.offset({ x: shape.width() / 2, y: shape.height() / 2 });
    return super.add(shape);
  }
}
