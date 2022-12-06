import { Image } from "konva/lib/shapes/Image";
import { Text, TextConfig } from "konva/lib/shapes/Text";
import { ShapeUtilities, ToolIconAttr } from "./shape-utilities";

export class TextEZ extends Text implements WithUtilities {
  public readonly utilities = new ShapeUtilities(this);
  public onShowSettings?: (text: TextEZ) => void;
  constructor(attrs?: TextConfig) {
    super({ ...attrs, draggable: true });

    this.on("dblclick dbltap", () => {
      this.onShowSettings?.(this);
    });
  }

  clone() {
    const ez = new TextEZ(this.getAttrs());
    ez.setAttrs({
      x: this.x() + this.width(),
      y: this.y() + this.height(),
    });
    ez.onShowSettings = this.onShowSettings;
    return ez;
  }

  changeFontSize(size: number) {
    this.fontSize(size);
    this.offset({ x: this.width() / 2, y: this.height() / 2 });
    return this;
  }

  changeContent(text: string) {
    this.text(text);
    this.offset({ x: this.width() / 2, y: this.height() / 2 });
    return this;
  }

  getTransformTools(assets: Record<string, HTMLImageElement>): Image[] {
    const settingsBtn = new Image({
      y: 0,
      width: ToolIconAttr.size,
      height: ToolIconAttr.size,
      offsetX: ToolIconAttr.size / 2,
      offsetY: ToolIconAttr.size / 2,
      image: assets.settingsIcon,
    });

    settingsBtn.on("click tap", () => {
      this.onShowSettings?.(this);
    });
    return [settingsBtn];
  }
}
