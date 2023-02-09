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
    const { width, height } = ez.getClientRect();
    ez.setAttrs({
      x: this.x() + width / 2,
      y: this.y() + height / 2,
    });
    ez.onShowSettings = this.onShowSettings;
    return ez;
  }

  changeFontStyle(style: string) {
    this.fontStyle(style);
    this.offset({ x: this.width() / 2, y: this.height() / 2 });
    return this;
  }

  changeFontSize(size: number) {
    this.fontSize(size);
    this.offset({ x: this.width() / 2, y: this.height() / 2 });
    return this;
  }

  changeStrokeWidth(size: number) {
    this.strokeWidth(size);
    this.offset({ x: this.width() / 2, y: this.height() / 2 });
    return this;
  }

  changeContent(text: string) {
    this.text(text);
    this.offset({ x: this.width() / 2, y: this.height() / 2 });
    return this;
  }

  getTransformTools(assets: Record<string, HTMLImageElement>): Image[] {
    const iconSize = ToolIconAttr.size;
    const settingsBtn = new Image({
      y: 0,
      width: iconSize,
      height: iconSize,
      offsetX: iconSize / 2,
      offsetY: iconSize / 2,
      image: assets.settingsIcon,
    });

    settingsBtn.on("click tap", () => {
      this.onShowSettings?.(this);
    });
    return [settingsBtn];
  }
}
