import { useFetchGalleyTemplates } from "hooks/gallery-templates.hook";
import { galleryTemplates } from "loaders/gallery-template-loader";
import { useEffect } from "react";
import { GridPic } from "./grid-pic";

export function GalleryTemplates() {
  const { loading, fetch } = useFetchGalleyTemplates();

  useEffect(() => {
    fetch();
  }, [fetch]);

  return <GridPic loading={loading} column={2} data={galleryTemplates} />;
}
