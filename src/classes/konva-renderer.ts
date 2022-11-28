import { Stage } from "konva/lib/Stage";
import { LayerEZ } from "./layer.ez";

export class KonvaRenderer extends Stage {
  constructor(private readonly renderer: Window["Renderer"]) {
    super({
      container: "konva-layer",
      width: renderer.width,
      height: renderer.height,
      offsetX: -renderer.width / 2 + renderer.simpleCamera.x,
      offsetY: -renderer.height / 2 + renderer.simpleCamera.y,
    });
    this.renderer.addSizeChangeListener((width, height) => {
      this.size({ width, height });
      this.centerStage();
    });
    this.renderer.simpleCamera.addPositionChangeListener(() => {
      this.centerStage();
    });
    this.centerStage();
  }

  add(layer: LayerEZ) {
    layer.renderer = this.renderer;
    const context = super.add(layer);
    layer.onAddedToStage?.();
    return context;
  }

  private centerStage() {
    const renderer = this.renderer;
    this.offsetX(-renderer.width / 2 + renderer.simpleCamera.x);
    this.offsetY(-renderer.height / 2 + renderer.simpleCamera.y);
  }


  // scaleStage(value: number) {
  //   this.clearTransformer();

  //   const width = this.stage.width();
  //   const height = this.stage.height();

  //   this.stage.scale({ x: value, y: value });

  //   const scaledRect = this.stage.getClientRect();

  //   this.stage.move({
  //     x: width / 2 - (scaledRect.x + scaledRect.width / 2),
  //     y: height / 2 - (scaledRect.y + scaledRect.height / 2),
  //   });
  // }
}
