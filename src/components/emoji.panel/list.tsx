import { useEffect } from "react";
import { useEntity } from "react-simple-game-engine/lib/utilities";
import styled from "styled-components";

import { GridPic } from "components/grid-pic";
import { Scroll } from "components/scroll";
import { ShapeManagerEntity } from "entities/shape-manager.entity";
import { Copyright } from "components/copyright";
import { useFetchEmojis, useWatchEmojis } from "hooks/emoji.hook";

const Root = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  > div {
    width: 100%;
  }
`;

const Section = styled.section`
  margin-top: 5px;
  padding-top: 5px;
  min-height: 0;
  flex: 1;
`;
export function EmojiList() {
  const [shapeManagerEntity] = useEntity(ShapeManagerEntity);
  const { loading, fetch } = useFetchEmojis();
  const data = useWatchEmojis();

  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <Root>
      <Section>
        <Scroll>
          <GridPic
            loading={loading}
            column={3}
            data={data}
            onSelect={(pic) => {
              shapeManagerEntity.addImage(pic.src, 100);
            }}
          />
        </Scroll>
      </Section>
      <div style={{ marginTop: 20 }} />
      <Copyright />
    </Root>
  );
}
