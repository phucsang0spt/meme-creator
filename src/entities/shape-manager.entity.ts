import {
  ColorSprite,
  LogicComponent,
  RectEntity,
} from "react-simple-game-engine";
import {
  Avatar,
  EntityPrepare,
} from "react-simple-game-engine/lib/export-types";

import { InteractLayer } from "classes/interact-layer";
import { ImageEZ } from "classes/image.ez";

import { KonvaManagerEntity } from "./konva-manager.entity";
import { ViewPortEntity } from "./viewport.entity";
import { permissionWriteFile } from "download";
import { TextEZ } from "classes/text.ez";

type Props = {
  trashIcon: Avatar;
  refreshIcon: Avatar;
  colorIcon: Avatar;
  empty: Avatar;
};

export class ShapeManagerEntity extends RectEntity<Props> {
  public trimExport: boolean = false;
  private interactLayer: InteractLayer;
  private viewportEntity: ViewPortEntity;
  private background: ImageEZ;

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
      this.interactLayer = new InteractLayer({
        trashIcon: this.props.trashIcon.domImg,
        refreshIcon: this.props.refreshIcon.domImg,
        colorIcon: this.props.colorIcon.domImg,
      });
      konvaManagerEntity.konvaRenderer.add(this.interactLayer);

      this.setBackground(this.props.empty.domImg.src);
      (window as any).addText = () => {
        this.addText();
      };
    }, 0);
  }

  async export(
    events: { onStartExport?: () => void; onCompletedExport?: () => void } = {}
  ) {
    await permissionWriteFile();
    this.interactLayer.export(this.viewportEntity, this.trimExport, events);
  }

  async setBackground(src: string) {
    return new Promise((res) => {
      const image = new Image();
      image.onload = () => {
        const ratio = image.width / image.height;
        const size = {
          width: this.viewportEntity.fixedResolution.width,
          height: this.viewportEntity.fixedResolution.width / ratio,
        };
        if (this.background) {
          this.background.image(image);
          this.background.setAttrs({
            ...size,
            draggable: true,
            name: "selectable-shape",
            x: this.viewportEntity.basePosition.x,
            y: this.viewportEntity.basePosition.y,
          });
          this.background.offset({
            x: size.width / 2,
            y: size.height / 2,
          });
        } else {
          this.background = new ImageEZ({
            width: 0,
            height: 0,
            image,
            name: "empty",
          });
          (this.background as ShapeInput).onBeforeDestroy = () => {
            this.background = null;
          };
          this.background.setAttrs({ ...size });
          this.interactLayer.add(this.background);
        }

        res(null);
      };
      image.src = src;
    });
  }

  addText() {
    const text = new TextEZ({
      x: this.viewportEntity.basePosition.x,
      y: this.viewportEntity.basePosition.y,
      text: "Hello EZ!!!",
      fill: "rgb(52, 73, 94)",
      fontSize: 19,
      fontFamily: "Noto Sans JP",
    });
    this.interactLayer.add(text);
  }
}
