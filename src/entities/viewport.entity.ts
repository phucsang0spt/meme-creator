import {
  ColorSprite,
  LogicComponent,
  RectEntity,
} from "react-simple-game-engine";
import {
  EntityPrepare,
  Point,
  Size,
} from "react-simple-game-engine/lib/export-types";

import { StaticLayer } from "classes/static-layer";
import { KonvaManagerEntity } from "entities/konva-manager.entity";
import { Resolutions } from "options";
import { Text, TextConfig } from "konva/lib/shapes/Text";
import { Line } from "konva/lib/shapes/Line";

type Props = {};

export class ViewPortEntity extends RectEntity<Props> {
  public readonly fixedResolution: Size = { width: 396, height: 704 };
  public readonly basePosition: Point = {
    x: 0,
    y: -90,
  };
  private description: Text;
  private staticLayer: StaticLayer;
  private _currentResolution: Size;

  set currentResolution(size: Size) {
    this._currentResolution = size;
    this.drawDescription();
  }

  get currentResolution() {
    return this._currentResolution;
  }

  protected onPrepare(): EntityPrepare<this> {
    this.currentResolution = Resolutions.HD;
    return {
      sprite: new LogicComponent([
        ColorSprite,
        {
          source: [0, 0, 0, 0],
        },
      ]),
      enabledPhysicBody: false,
    };
  }

  getBounding(scale = 1) {
    const fixedResolution = {
      width: this.fixedResolution.width * scale,
      height: this.fixedResolution.height * scale,
    };
    const rendererSize = {
      width: this.renderer.width * scale,
      height: this.renderer.height * scale,
    };
    const viewport = {
      width: fixedResolution.width,
      height: fixedResolution.height,
      left:
        this.basePosition.x * scale +
        rendererSize.width / 2 -
        fixedResolution.width / 2,
      top:
        rendererSize.height / 2 -
        fixedResolution.height / 2 +
        this.basePosition.y * scale,
      right: 0,
      bottom: 0,
    };
    viewport.right = viewport.left + viewport.width;
    viewport.bottom = viewport.top + viewport.height;
    return viewport;
  }

  bootstrapCompleted() {
    const konvaManager = this.worldManagement.getEntity(KonvaManagerEntity);
    setTimeout(() => {
      this.staticLayer = new StaticLayer();
      konvaManager.konvaRenderer.add(this.staticLayer);

      this.drawEdge();
      this.drawDescription();
    }, 0);
  }

  private drawEdge() {
    const fixedResolution = this.fixedResolution;

    const line = new Line({
      points: [
        // top left
        this.basePosition.x - fixedResolution.width / 2,
        this.basePosition.y - fixedResolution.height / 2,

        // top right
        this.basePosition.x + fixedResolution.width / 2,
        this.basePosition.y - fixedResolution.height / 2,

        // bottom right
        this.basePosition.x + fixedResolution.width / 2,
        this.basePosition.y + fixedResolution.height / 2,

        // bottom left
        this.basePosition.x - fixedResolution.width / 2,
        this.basePosition.y + fixedResolution.height / 2,

        // top left
        this.basePosition.x - fixedResolution.width / 2,
        this.basePosition.y - fixedResolution.height / 2,
      ],
      x: 0,
      y: 0,
      stroke: "rgb(52, 152, 219)",
      strokeWidth: 3,
    });
    this.staticLayer.add(line);
    line.offset({ x: 0, y: 0 });
  }

  private drawDescription() {
    if (!this.staticLayer) {
      return;
    }
    const config: TextConfig = {
      x: this.basePosition.x + this.fixedResolution.width / 2,
      y: this.basePosition.y - this.fixedResolution.height / 2,
      text: `Viewport:  ${this._currentResolution.width} x ${this._currentResolution.height}px`,
    };
    if (this.description) {
      this.description.setAttrs({
        ...config,
      });
      this.description.x(this.description.x() - this.description.width() / 2);
      this.description.y(
        this.description.y() - this.description.height() / 2 - 5
      );
      return;
    }
    const text = new Text({
      ...config,
      fill: "rgb(33, 140, 78)",
      fontSize: 16,
      fontFamily: "Noto Sans JP",
    });
    text.x(text.x() - text.width() / 2);
    text.y(text.y() - text.height() / 2 - 5);
    this.staticLayer.add(text);
    this.description = text;
  }
}
