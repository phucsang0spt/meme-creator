import styled from "styled-components";
import { GameBootstrap } from "react-simple-game-engine";

import { MainScene } from "scenes/main.scene";

const Root = styled.div`
  width: 100%;
  height: 100vh;
`;

export function GameContainer() {
  return (
    <Root>
      <GameBootstrap
        // logPopup={process.env.NODE_ENV !== "production"}
        scenes={[MainScene]}
        height={1280}
        width={720}
      />
    </Root>
  );
}
