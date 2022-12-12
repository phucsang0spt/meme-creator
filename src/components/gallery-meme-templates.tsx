import { ShapeManagerEntity } from "entities/shape-manager.entity";
import {
  useFetchGalleyMemeTemplates,
  useWatchGalleyMemeTemplates,
} from "hooks/gallery-meme-templates.hook";
import { useCallback, useEffect } from "react";
import { useEntity } from "react-simple-game-engine/lib/utilities";
import styled from "styled-components";
import { GridPic } from "./grid-pic";
import { Scroll } from "./scroll";
import { SimpleWriter } from "./simple-writer";

const Root = styled.section`
  flex: 1;
  min-height: 0;

  display: flex;
  flex-direction: column;
`;

const Section = styled.section`
  flex: 1;
  min-height: 0;
  padding-top: 5px;
`;

export function GalleyMemeTemplates() {
  const [shapeManagerEntity] = useEntity(ShapeManagerEntity);
  const { loading, fetch } = useFetchGalleyMemeTemplates();
  const templates = useWatchGalleyMemeTemplates();

  useEffect(() => {
    fetch();
  }, [fetch]);

  const handleSearch = useCallback(
    (keyword) => {
      fetch(keyword);
    },
    [fetch]
  );

  return (
    <Root>
      <SimpleWriter placeholder="Search..." onSave={handleSearch} />
      <div style={{ marginTop: 5 }} />
      <Section>
        <Scroll>
          <GridPic
            loading={loading}
            column={2}
            data={templates}
            onSelect={(template) =>
              shapeManagerEntity.setBackground(template.src)
            }
          />
        </Scroll>
      </Section>
    </Root>
  );
}
