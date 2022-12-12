import { useCallback, useState } from "react";
import { useConnectRender } from "use-connect-render/lib";

import { useStorage } from "./storage.hook";
import { StorageKeys } from "../constants";
import { genId } from "utils";

function useLocalMemeTemplatesState() {
  return useConnectRender("local-meme-templates", {
    data: [],
  });
}

export function useFetchLocalMemeTemplates() {
  const storage = useStorage();
  const [loading, setLoading] = useState(true);

  const { push, getCurrent } = useLocalMemeTemplatesState();

  const fetch = useCallback(async () => {
    setLoading(true);
    const memes: Picture[] = await storage.get(StorageKeys.LOCAL_MEME_TEMPLATE);
    push("data", memes || []);
    setLoading(false);
  }, [push, storage]);

  const save = useCallback(
    async (src: string) => {
      let memes = getCurrent<[Picture[]]>("data")[0];

      memes = [
        ...memes,
        {
          id: genId(),
          src,
        },
      ];
      await storage.set(StorageKeys.LOCAL_MEME_TEMPLATE, memes);

      push("data", memes);
    },
    [push, getCurrent, storage]
  );

  const remove = useCallback(
    async (id: Picture["id"]) => {
      let memes = getCurrent<[Picture[]]>("data")[0];
      memes = memes.filter((meme) => meme.id !== id);
      await storage.set(StorageKeys.LOCAL_MEME_TEMPLATE, memes);

      push("data", memes);
    },
    [push, getCurrent, storage]
  );

  return { loading, fetch, save, remove };
}

export function useWatchLocalMemeTemplates() {
  const { listen } = useLocalMemeTemplatesState();
  return listen<[Picture[]]>("data")[0];
}
