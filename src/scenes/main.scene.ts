import {
  LogicComponent,
  Scene,
  SceneTag,
  SceneUI,
  SimpleCamera,
} from "react-simple-game-engine";
import { MainUI } from "./ui/main.ui";
import { BackgroundEntity } from "../entities/background.entity";
import { ViewPortEntity } from "entities/viewport.entity";
import { ShapeManagerEntity } from "entities/shape-manager.entity";
import { KonvaManagerEntity } from "entities/konva-manager.entity";

@SceneTag("main")
@SceneUI(MainUI)
export class MainScene extends Scene<{}> {
  protected onBootstrapDone(simpleCamera: SimpleCamera) {
    (window as any).simpleCamera = simpleCamera;
    // simpleCamera.x += 90;
  }

  getComponents() {
    return [
      new LogicComponent([BackgroundEntity, {}]),
      new LogicComponent([KonvaManagerEntity, {}]),
      new LogicComponent([ShapeManagerEntity, {}]),
      new LogicComponent([ViewPortEntity, {}]),
    ];
  }
}
