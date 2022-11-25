import {
  ColorSprite,
  LogicComponent,
  RectEntity,
} from "react-simple-game-engine";
import { EntityPrepare } from "react-simple-game-engine/lib/export-types";

import { InteractLayer } from "classes/interact-layer";
import { KonvaManagerEntity } from "./konva-manager.entity";
import { ViewPortEntity } from "./viewport.entity";
import { Rect } from "konva/lib/shapes/Rect";

type Props = {};

export class ShapeManagerEntity extends RectEntity<Props> {
  private interactLayer: InteractLayer;
  private viewportEntity: ViewPortEntity;
  protected onPrepare(): EntityPrepare<this> {
    return {
      sprite: new LogicComponent([
        ColorSprite,
        {
          source: [0, 0, 0, 0],
        },
      ]),
      transform: {
        x: 0,
        y: -90,
        width: 10,
        height: 10,
      },
      enabledPhysicBody: false,
    };
  }

  bootstrapCompleted() {
    const konvaManagerEntity =
      this.worldManagement.getEntity(KonvaManagerEntity);
    this.viewportEntity = this.worldManagement.getEntity(ViewPortEntity);
    setTimeout(() => {
      this.interactLayer = new InteractLayer();
      konvaManagerEntity.konvaRenderer.add(this.interactLayer);

      (window as any).export = () => {
        this.export();
      };

      (window as any).addRect = (pos: any = {}) => {
        this.addRect(pos);
      };
    }, 0);
  }

  export() {
    this.interactLayer.export(this.viewportEntity);
  }

  addRect(pos: any, color = "#39c") {
    const rect = new Rect({
      x: pos.x || 0,
      y: pos.y || this.viewportEntity.position.y,
      width: 100,
      height: 100,
      fill: color,
      draggable: true,
    });
    this.interactLayer.add(rect);
  }
}
