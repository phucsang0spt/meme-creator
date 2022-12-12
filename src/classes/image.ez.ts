import { Image, ImageConfig } from "konva/lib/shapes/Image";
import { ShapeUtilities } from "./shape-utilities";

export class ImageEZ extends Image implements WithUtilities {
  public readonly utilities = new ShapeUtilities(this);
  constructor(attrs?: ImageConfig) {
    super({ ...attrs, draggable: true });
  }

  clone() {
    const ez = new ImageEZ(this.getAttrs());
    const { width, height } = ez.getClientRect();
    ez.setAttrs({
      x: this.x() + width / 2,
      y: this.y() + height / 2,
    });
    return ez;
  }
}
