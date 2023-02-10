import {
  ColorSprite,
  LogicComponent,
  RectEntity,
} from "react-simple-game-engine";
import {
  Avatar,
  EntityPrepare,
  Point,
} from "react-simple-game-engine/lib/export-types";

import { InteractLayer } from "classes/interact-layer";
import { ImageEZ } from "classes/image.ez";

import { KonvaManagerEntity } from "./konva-manager.entity";
import { ViewPortEntity } from "./viewport.entity";
import { openAppSettings, permissionWriteFile } from "download";
import { TextEZ } from "classes/text.ez";
import { createImage } from "utils";
import { toCorrectPixel } from "px";
import { StuffValue } from "../constants";

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
      this.interactLayer = new InteractLayer(this.viewportEntity, {
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
    const isOk = await permissionWriteFile();
    if (isOk) {
      this.interactLayer.export(this.trimExport, events);
    } else {
      openAppSettings();
    }
  }

  clearAll() {
    // remove all objects
    this.interactLayer.clearTransformer();
    this.interactLayer.iterativeShapes((shape) => {
      if (shape.name() !== "background") {
        (shape as ShapeWithUtilities).destroy();
      }
    });
  }

  async setBackground(src: string) {
    const image = await createImage(src);

    let ratio: number;
    let size: { width: number; height: number };
    const vpFixedResolution = this.viewportEntity.fixedResolution;
    if (image.width > image.height) {
      ratio = image.width / image.height;
      size = {
        width: vpFixedResolution.width,
        height: vpFixedResolution.width / ratio,
      };
      if (size.height > vpFixedResolution.height) {
        ratio = image.height / image.width;
        size = {
          width: vpFixedResolution.height / ratio,
          height: vpFixedResolution.height,
        };
      }
    } else {
      ratio = image.height / image.width;
      size = {
        width: vpFixedResolution.height / ratio,
        height: vpFixedResolution.height,
      };
      if (size.width > vpFixedResolution.width) {
        ratio = image.width / image.height;
        size = {
          width: vpFixedResolution.width,
          height: vpFixedResolution.width / ratio,
        };
      }
    }

    if (this.background) {
      this.background.image(image);
      this.background.setAttrs({
        ...size,
        draggable: false,
      });
    } else {
      this.background = new ImageEZ({
        x: this.viewportEntity.basePosition.x,
        y: this.viewportEntity.basePosition.y,
        ...size,
        image,
        name: "background",
      });
      this.background.setAttrs({
        draggable: false,
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

  randomPositionByAmplitude(point: Point) {
    const amplitude = 30;
    return {
      x: this.renderer.random(point.x - amplitude, point.x + amplitude),
      y: this.renderer.random(point.y - amplitude, point.y + amplitude),
    };
  }

  addText() {
    const ez = new TextEZ({
      ...this.randomPositionByAmplitude(this.viewportEntity.basePosition),
      text: StuffValue.DEFAULT_NEW_TEXT,
      fill: "#fff",
      stroke: "#000",
      strokeWidth: 2,
      fontSize: Math.floor(toCorrectPixel(60)),
      fontStyle: "bold",
      fontFamily: "Noto Sans",
    });
    this.interactLayer.add(ez);
    return ez;
  }

  async addImage(src: string, _size = 200) {
    const image = await createImage(src);
    const ratio = image.width / image.height;
    const size = {
      width: _size,
      height: _size / ratio,
    };
    const ez = new ImageEZ({
      ...this.randomPositionByAmplitude(this.viewportEntity.basePosition),
      ...size,
      image,
    });
    this.interactLayer.add(ez);
    return ez;
  }
}
