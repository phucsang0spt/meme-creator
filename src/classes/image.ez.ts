import { Image, ImageConfig } from "konva/lib/shapes/Image";
import { ShapeUtilities } from "./shape-utilities";

export class ImageEZ extends Image implements WithUtilities {
  public readonly utilities = new ShapeUtilities(this);
  constructor(attrs?: ImageConfig) {
    super({ ...attrs, draggable: true });
  }

  clone() {
    const ez = new ImageEZ(this.getAttrs());
    ez.setAttrs({
      x: this.x() + this.width(),
      y: this.y() + this.height(),
    });
    return ez;
  }
}
