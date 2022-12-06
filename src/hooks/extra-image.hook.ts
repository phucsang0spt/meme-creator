import { useCallback, useState } from "react";
import { useConnectRender } from "use-connect-render/lib";

import { useStorage } from "./storage.hook";
import { StorageKeys } from "../constants";
import { genId } from "utils";

function useExtraImagesState() {
  return useConnectRender("extra-images", {
    data: [],
  });
}

export function useFetchExtraImages() {
  const storage = useStorage();
  const [loading, setLoading] = useState(true);

  const { push, getCurrent } = useExtraImagesState();

  const fetch = useCallback(async () => {
    setLoading(true);
    const pictures: Picture[] = await storage.get(StorageKeys.EXTRA_IMAGE);
    push("data", pictures || []);
    setLoading(false);
  }, [push, storage]);

  const save = useCallback(
    async (src: string) => {
      let pictures = getCurrent<[Picture[]]>("data")[0];

      pictures = [
        ...pictures,
        {
          id: genId(),
          src,
        },
      ];
      await storage.set(StorageKeys.EXTRA_IMAGE, pictures);

      push("data", pictures);
    },
    [push, getCurrent, storage]
  );

  const remove = useCallback(
    async (id: Picture["id"]) => {
      let pictures = getCurrent<[Picture[]]>("data")[0];
      pictures = pictures.filter((picture) => picture.id !== id);
      await storage.set(StorageKeys.EXTRA_IMAGE, pictures);

      push("data", pictures);
    },
    [push, getCurrent, storage]
  );

  return { loading, fetch, save, remove };
}

export function useWatchExtraImages() {
  const { listen } = useExtraImagesState();
  return listen<[Picture[]]>("data")[0];
}
