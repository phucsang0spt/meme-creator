import { Scene, SceneTag, SceneUI } from "react-simple-game-engine";
import { MenuUI } from "./ui/menu.ui";

@SceneTag("menu")
@SceneUI(MenuUI)
export class MenuScene extends Scene<{}> {}
