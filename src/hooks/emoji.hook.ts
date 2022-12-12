import { emojis } from "loaders/emoji-loader";
import { useCallback, useState } from "react";
import { tick } from "react-simple-game-engine/lib/utils";
import { useConnectRender } from "use-connect-render/lib";

function useEmojiState() {
  return useConnectRender("emojis", {
    data: [],
  });
}

export function useFetchEmojis() {
  const [loading, setLoading] = useState(true);

  const { push } = useEmojiState();
  const fetch = useCallback(async () => {
    setLoading(true);
    await tick(100);
    push("data", emojis);
    setLoading(false);
  }, [push]);

  return { loading, fetch };
}

export function useWatchEmojis() {
  const { listen } = useEmojiState();
  return listen<[Picture[]]>("data")[0];
}
