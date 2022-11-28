import {
  ColorSprite,
  LogicComponent,
  RectEntity,
} from "react-simple-game-engine";

import { EntityPrepare } from "react-simple-game-engine/lib/export-types";

type Props = {};

const SIZE = 20;
export class BackgroundEntity extends RectEntity<Props> {
  private amountOfVerticalLine = 0;
  private amountOfHorizontalLine = 0;
  private t = 255;
  protected onPrepare(): EntityPrepare<this> {
    return {
      sprite: new LogicComponent([
        ColorSprite,
        {
          source: [245, 245, 245],
        },
      ]),
      transform: {
        x: 0,
        y: 0,
        width: 3000,
        height: 3000,
      },
      enabledPhysicBody: false,
    };
  }

  onActive() {
    this.amountOfVerticalLine = Math.ceil(this.sprite.width / SIZE);
    this.amountOfHorizontalLine = Math.ceil(this.sprite.height / SIZE);
    // this.scaleX = 0.5;
    // this.scaleY = 0.5;

    (window as any).hideBackground = () => {
      this.sprite.source = [0, 0, 0, 0];
      this.t = 0;
    };
    (window as any).showBackground = () => {
      this.sprite.source = [245, 245, 245];
      this.t = 255;
    };
  }

  onDraw() {
    const { left, top, right, bottom } = this.edge;

    this.renderer.drawHandle(this.position, () => {
      this.renderer.scale(this.scaleX, this.scaleY);
      this.renderer.stroke(31, 128, 232, this.t);
      Array.from({ length: this.amountOfVerticalLine }).forEach((_, i) => {
        if (i !== 0 && i !== this.amountOfVerticalLine - 1) {
          const x = left + i * SIZE;
          this.renderer.line(x, top, x, bottom);
        }
      });
      Array.from({ length: this.amountOfHorizontalLine }).forEach((_, i) => {
        if (i !== 0 && i !== this.amountOfHorizontalLine - 1) {
          const y = top + i * SIZE;
          this.renderer.line(left, y, right, y);
        }
      });
    });
  }
}