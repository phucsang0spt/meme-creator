import styled from "styled-components";
import { GameBootstrap } from "react-simple-game-engine";

import { ImageModeScene } from "scenes/image-mode.scene";
import { MenuScene } from "scenes/menu.scene";

const Root = styled.div`
  width: 100%;
  height: 100vh;
`;

export function GameContainer() {
  return (
    <Root>
      <GameBootstrap
        scenes={[MenuScene, ImageModeScene]}
        height={1280}
        width={720}
      />
    </Root>
  );
}
