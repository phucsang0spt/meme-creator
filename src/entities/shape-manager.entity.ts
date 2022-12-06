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
import { createImage } from "utils";

type Props = {
  copyIcon: Avatar;
  trashIcon: Avatar;
  refreshIcon: Avatar;
  settingsIcon: Avatar;
  empty: Avatar;
};

export class ShapeManagerEntity extends RectEntity<Props> {
  public trimExport: boolean = true;
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
        copyIcon: this.props.copyIcon.domImg,
        trashIcon: this.props.trashIcon.domImg,
        refreshIcon: this.props.refreshIcon.domImg,
        settingsIcon: this.props.settingsIcon.domImg,
      });
      konvaManagerEntity.konvaRenderer.add(this.interactLayer);

      this.setBackground(this.props.empty.domImg.src);
    }, 0);
  }

  async export(
    events: { onStartExport?: () => void; onCompletedExport?: () => void } = {}
  ) {
    await permissionWriteFile();
    this.interactLayer.export(this.viewportEntity, this.trimExport, events);
  }

  async setBackground(src: string) {
    const image = await createImage(src);
    if (this.background) {
      const ratio = image.width / image.height;
      const size = {
        width: this.viewportEntity.fixedResolution.width,
        height: this.viewportEntity.fixedResolution.width / ratio,
      };
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
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        image,
        name: "empty",
      });
      (this.background as ShapeInput).canDuplicate = false;
      (this.background as ShapeInput).onBeforeDestroy = () => {
        this.background = null;
        this.setBackground(this.props.empty.domImg.src);
      };
      this.interactLayer.add(this.background);
    }

    this.background.moveToBottom();
  }

  addText() {
    const ez = new TextEZ({
      x: this.viewportEntity.basePosition.x,
      y: this.viewportEntity.basePosition.y,
      text: "Hello EZ!!!",
      fill: "rgb(52, 73, 94)",
      fontSize: 29,
      fontStyle: "bold",
      fontFamily: "Noto Sans",
    });
    this.interactLayer.add(ez);
    return ez;
  }

  async addImage(src: string) {
    const image = await createImage(src);
    const ratio = image.width / image.height;
    const size = {
      width: 120,
      height: 120 / ratio,
    };
    const ez = new ImageEZ({
      x: this.viewportEntity.basePosition.x,
      y: this.viewportEntity.basePosition.y,
      ...size,
      image,
    });
    this.interactLayer.add(ez);
    return ez;
  }
}
