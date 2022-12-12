import { useEffect } from "react";
import { useEntity } from "react-simple-game-engine/lib/utilities";
import styled from "styled-components";

import { GridPic } from "components/grid-pic";
import { Scroll } from "components/scroll";
import { ShapeManagerEntity } from "entities/shape-manager.entity";
import {
  useFetchMessageBoxes,
  useWatchMessageBoxes,
} from "hooks/message-box.hook";

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
export function BoxList() {
  const [shapeManagerEntity] = useEntity(ShapeManagerEntity);
  const { loading, fetch } = useFetchMessageBoxes();
  const boxes = useWatchMessageBoxes();

  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <Root>
      <Section>
        <Scroll>
          <GridPic
            loading={loading}
            column={2}
            data={boxes}
            onSelect={(pic) => {
              shapeManagerEntity.addImage(pic.src);
            }}
          />
        </Scroll>
      </Section>
    </Root>
  );
}
