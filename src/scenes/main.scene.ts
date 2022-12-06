import {
  LogicComponent,
  Scene,
  SceneTag,
  SceneUI,
  SpriteFrom,
} from "react-simple-game-engine";
import { type Avatar } from "react-simple-game-engine/lib/export-types";

import { MainUI } from "./ui/main.ui";

import { BackgroundEntity } from "entities/background.entity";
import { ViewPortEntity } from "entities/viewport.entity";
import { ShapeManagerEntity } from "entities/shape-manager.entity";
import { KonvaManagerEntity } from "entities/konva-manager.entity";

import trashIcon from "assets/icons/trash.svg";
import refreshIcon from "assets/icons/refresh.svg";
import settingsIcon from "assets/icons/settings.svg";
import copyIcon from "assets/icons/copy.svg";

import empty from "assets/empty.png";

@SceneTag("main")
@SceneUI(MainUI)
export class MainScene extends Scene<{}> {
  @SpriteFrom(empty)
  empty: Avatar;

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
          },
        },
      ]),
      new LogicComponent([ViewPortEntity, {}]),
    ];
  }
}
