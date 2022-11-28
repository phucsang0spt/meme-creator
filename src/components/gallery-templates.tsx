import { ShapeManagerEntity } from "entities/shape-manager.entity";
import { useFetchGalleyTemplates } from "hooks/gallery-templates.hook";
import { galleryTemplates } from "loaders/gallery-template-loader";
import { useEffect } from "react";
import { useEntity } from "react-simple-game-engine/lib/utilities";
import { GridPic } from "./grid-pic";

export function GalleryTemplates() {
  const [shapeManagerEntity] = useEntity(ShapeManagerEntity);
  const { loading, fetch } = useFetchGalleyTemplates();

  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <GridPic
      loading={loading}
      column={2}
      data={galleryTemplates}
      onSelect={(template) => shapeManagerEntity.setBackground(template.src)}
    />
  );
}
