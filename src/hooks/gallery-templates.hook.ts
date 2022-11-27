import { galleryTemplates } from "loaders/gallery-template-loader";
import { useCallback, useState } from "react";
import { tick } from "react-simple-game-engine/lib/utils";
import { useConnectRender } from "use-connect-render/lib";

function useGalleyTemplatesState() {
  return useConnectRender("gallery-templates", {
    data: [],
  });
}

export function useFetchGalleyTemplates() {
  const [loading, setLoading] = useState(true);

  const { push } = useGalleyTemplatesState();
  const fetch = useCallback(async () => {
    setLoading(true);
    await tick(100);
    push("data", galleryTemplates);
    setLoading(false);
  }, [push]);

  return { loading, fetch };
}
