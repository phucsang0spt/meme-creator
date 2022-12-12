import { useEffect } from "react";
import { useEntity } from "react-simple-game-engine/lib/utilities";

import {
  useFetchLocalMemeTemplates,
  useWatchLocalMemeTemplates,
} from "hooks/local-meme-templates.hook";

import { ShapeManagerEntity } from "entities/shape-manager.entity";
import { LocalUploadList } from "./local-upload-list";
import { Scroll } from "./scroll";
import styled from "styled-components";

const Section = styled.section`
  flex: 1;
  min-height: 0;
  margin-top: 5px;
  padding-top: 5px;
`;

export function LocalMemeTemplates() {
  const [shapeManagerEntity] = useEntity(ShapeManagerEntity);
  const { fetch, save, remove } = useFetchLocalMemeTemplates();
  const templates = useWatchLocalMemeTemplates();

  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <Section>
      <Scroll>
        <LocalUploadList
          data={templates}
          onAdd={(base64) => {
            save(base64);
          }}
          onSelect={(base64) => {
            shapeManagerEntity.setBackground(base64);
          }}
          onRemove={(id) => {
            remove(id);
          }}
        />
      </Scroll>
    </Section>
  );
}
