import { LocalUploadList } from "components/local-upload-list";
import { ShapeManagerEntity } from "entities/shape-manager.entity";
import {
  useFetchExtraImages,
  useWatchExtraImages,
} from "hooks/extra-image.hook";
import { useEffect } from "react";
import { useEntity } from "react-simple-game-engine/lib/utilities";
import styled from "styled-components";

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
`;
export function ImageList() {
  const [shapeManagerEntity] = useEntity(ShapeManagerEntity);
  const { fetch, save, remove } = useFetchExtraImages();
  const pictures = useWatchExtraImages();

  useEffect(() => {
    fetch();
  }, [fetch]);
  return (
    <Root>
      <Section>
        <LocalUploadList
          data={pictures}
          onAdd={(base64) => {
            save(base64);
          }}
          onSelect={(base64) => {
            shapeManagerEntity.addImage(base64);
          }}
          onRemove={(id) => {
            remove(id);
          }}
        />
      </Section>
    </Root>
  );
}
