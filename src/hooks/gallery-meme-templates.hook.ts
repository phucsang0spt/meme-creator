import { galleryMemeTemplates } from "loaders/gallery-meme-template-loader";
import { useCallback, useState } from "react";
import { tick } from "react-simple-game-engine/lib/utils";
import { useConnectRender } from "use-connect-render/lib";

function useGalleyMemeTemplatesState() {
  return useConnectRender("gallery-meme-templates", {
    data: [],
  });
}

export function useFetchGalleyMemeTemplates() {
  const [loading, setLoading] = useState(true);

  const { push } = useGalleyMemeTemplatesState();
  const fetch = useCallback(async () => {
    setLoading(true);
    await tick(100);
    push("data", galleryMemeTemplates);
    setLoading(false);
  }, [push]);

  return { loading, fetch };
}

export function useWatchGalleyMemeTemplates() {
  const { listen } = useGalleyMemeTemplatesState();
  return listen<[MemeTemplate[]]>("data")[0];
}
