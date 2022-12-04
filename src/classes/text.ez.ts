import { Image } from "konva/lib/shapes/Image";
import { Text, TextConfig } from "konva/lib/shapes/Text";
import { ShapeUtilities, ToolIconAttr } from "./shape-utilities";

export class TextEZ extends Text implements WithUtilities {
  public readonly utilities = new ShapeUtilities(this);
  constructor(attrs?: TextConfig) {
    super({ ...attrs, draggable: true });
  }

  getTransformTools(assets: Record<string, HTMLImageElement>): Image[] {
    const changeColorBtn = new Image({
      y: 0,
      width: ToolIconAttr.size,
      height: ToolIconAttr.size,
      offsetX: ToolIconAttr.size / 2,
      offsetY: ToolIconAttr.size / 2,
      image: assets.colorIcon,
    });

    changeColorBtn.on("click tap", () => {
      this.fill("red");
    });
    return [changeColorBtn];
  }
}
