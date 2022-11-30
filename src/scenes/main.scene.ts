import {
  LogicComponent,
  Scene,
  SceneTag,
  SceneUI,
  SimpleCamera,
  SpriteFrom,
} from "react-simple-game-engine";
import { MainUI } from "./ui/main.ui";

import { BackgroundEntity } from "entities/background.entity";
import { ViewPortEntity } from "entities/viewport.entity";
import { ShapeManagerEntity } from "entities/shape-manager.entity";
import { KonvaManagerEntity } from "entities/konva-manager.entity";

import trashIcon from "assets/icons/trash.svg";
import { type Avatar } from "react-simple-game-engine/lib/export-types";

@SceneTag("main")
@SceneUI(MainUI)
export class MainScene extends Scene<{}> {
  @SpriteFrom(trashIcon)
  trashIcon: Avatar;

  protected onBootstrapDone(simpleCamera: SimpleCamera) {
    (window as any).simpleCamera = simpleCamera;
    // simpleCamera.x += 90;
  }

  getComponents() {
    return [
      new LogicComponent([BackgroundEntity, {}]),
      new LogicComponent([KonvaManagerEntity, {}]),
      new LogicComponent([
        ShapeManagerEntity,
        {
          props: {
            trashIcon: this.trashIcon,
          },
        },
      ]),
      new LogicComponent([ViewPortEntity, {}]),
    ];
  }
}
