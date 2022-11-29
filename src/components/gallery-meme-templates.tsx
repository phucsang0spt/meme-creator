import { ShapeManagerEntity } from "entities/shape-manager.entity";
import {
  useFetchGalleyMemeTemplates,
  useWatchGalleyMemeTemplates,
} from "hooks/gallery-meme-templates.hook";
import { useEffect } from "react";
import { useEntity } from "react-simple-game-engine/lib/utilities";
import { GridPic } from "./grid-pic";

export function GalleyMemeTemplates() {
  const [shapeManagerEntity] = useEntity(ShapeManagerEntity);
  const { loading, fetch } = useFetchGalleyMemeTemplates();
  const templates = useWatchGalleyMemeTemplates();
  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <GridPic
      loading={loading}
      column={2}
      data={templates}
      onSelect={(template) => shapeManagerEntity.setBackground(template.src)}
    />
  );
}
