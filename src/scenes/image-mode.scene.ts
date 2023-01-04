import {
  LogicComponent,
  Scene,
  SceneTag,
  SceneUI,
  SpriteFrom,
} from "react-simple-game-engine";
import { type Avatar } from "react-simple-game-engine/lib/export-types";

import { ImageModeUI } from "./ui/image-mode.ui";

import { BackgroundEntity } from "entities/background.entity";
import { ViewPortEntity } from "entities/viewport.entity";
import { ShapeManagerEntity } from "entities/shape-manager.entity";
import { KonvaManagerEntity } from "entities/konva-manager.entity";

import trashIcon from "assets/icons/trash.svg";
import refreshIcon from "assets/icons/refresh.svg";
import settingsIcon from "assets/icons/settings.svg";
import copyIcon from "assets/icons/copy.svg";
import layerDownIcon from "assets/icons/layer-down.svg";
import layerUpIcon from "assets/icons/layer-up.svg";

import empty from "assets/empty.png";

@SceneTag("image-mode")
@SceneUI(ImageModeUI)
export class ImageModeScene extends Scene<{}> {
  @SpriteFrom(empty)
  empty: Avatar;

  @SpriteFrom(layerDownIcon)
  layerDownIcon: Avatar;

  @SpriteFrom(layerUpIcon)
  layerUpIcon: Avatar;

  @SpriteFrom(settingsIcon)
  settingsIcon: Avatar;

  @SpriteFrom(trashIcon)
  trashIcon: Avatar;

  @SpriteFrom(copyIcon)
  copyIcon: Avatar;

  @SpriteFrom(refreshIcon)
  refreshIcon: Avatar;

  // protected onBootstrapDone(simpleCamera: SimpleCamera) {
  //   (window as any).simpleCamera = simpleCamera;
  //   // simpleCamera.x += 90;
  // }

  getComponents() {
    return [
      new LogicComponent([BackgroundEntity, {}]),
      new LogicComponent([KonvaManagerEntity, {}]),
      new LogicComponent([
        ShapeManagerEntity,
        {
          props: {
            empty: this.empty,
            copyIcon: this.copyIcon,
            settingsIcon: this.settingsIcon,
            trashIcon: this.trashIcon,
            refreshIcon: this.refreshIcon,
            layerDownIcon: this.layerDownIcon,
            layerUpIcon: this.layerUpIcon,
          },
        },
      ]),
      new LogicComponent([ViewPortEntity, {}]),
    ];
  }
}
