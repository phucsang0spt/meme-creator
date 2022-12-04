import { Image, ImageConfig } from "konva/lib/shapes/Image";
import { ShapeUtilities } from "./shape-utilities";

export class ImageEZ extends Image implements WithUtilities {
  public readonly utilities = new ShapeUtilities(this);
  constructor(attrs?: ImageConfig) {
    super({ ...attrs, draggable: true });
  }
}
