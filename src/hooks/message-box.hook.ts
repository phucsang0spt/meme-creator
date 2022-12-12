import { messageBoxes } from "loaders/message-box-loader";
import { useCallback, useState } from "react";
import { tick } from "react-simple-game-engine/lib/utils";
import { useConnectRender } from "use-connect-render/lib";

function useMessageBoxState() {
  return useConnectRender("message-boxes", {
    data: [],
  });
}

export function useFetchMessageBoxes() {
  const [loading, setLoading] = useState(true);

  const { push } = useMessageBoxState();
  const fetch = useCallback(async () => {
    setLoading(true);
    await tick(100);
    push("data", messageBoxes);
    setLoading(false);
  }, [push]);

  return { loading, fetch };
}

export function useWatchMessageBoxes() {
  const { listen } = useMessageBoxState();
  return listen<[Picture[]]>("data")[0];
}
