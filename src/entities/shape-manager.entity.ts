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
  layerDownIcon: Avatar;
  layerUpIcon: Avatar;
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
        layerDownIcon: this.props.layerDownIcon.domImg,
        layerUpIcon: this.props.layerUpIcon.domImg,
      });
      konvaManagerEntity.konvaRenderer.add(this.interactLayer);
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
      });
    } else {
      this.background = new ImageEZ({
        x: this.viewportEntity.basePosition.x,
        y: this.viewportEntity.basePosition.y,
        ...size,
        image,
        name: "selectable-shape",
      });
      (this.background as ShapeInput).canDuplicate = false;
      (this.background as ShapeInput).onBeforeDestroy = () => {
        this.background = null;
      };
      this.interactLayer.add(this.background);
      this.background.moveToBottom();
    }
    this.background.offset({
      x: size.width / 2,
      y: size.height / 2,
    });
  }

  addText() {
    const ez = new TextEZ({
      x: this.viewportEntity.basePosition.x,
      y: this.viewportEntity.basePosition.y,
      text: "Hello EZ!!!",
      fill: "#fff",
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
