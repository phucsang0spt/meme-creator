import {
  ColorSprite,
  LogicComponent,
  RectEntity,
} from "react-simple-game-engine";
import { EntityPrepare } from "react-simple-game-engine/lib/export-types";

import { KonvaRenderer } from "classes/konva-renderer";

type Props = {};

export class KonvaManagerEntity extends RectEntity<Props> {
  private _konvaRenderer: KonvaRenderer;

  get konvaRenderer() {
    return this._konvaRenderer;
  }

  protected onPrepare(): EntityPrepare<this> {
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

  bootstrapCompleted() {
    setTimeout(() => {
      this._konvaRenderer = new KonvaRenderer(this.renderer);
    }, 0);
  }
}
