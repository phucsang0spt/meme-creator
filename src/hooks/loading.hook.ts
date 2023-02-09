import { useCallback } from "react";
import { useConnectRender } from "use-connect-render/lib";

export function useWatchLoading() {
  const { listen } = useConnectRender("loading");
  const isLoading = listen<[boolean]>("global")[0];

  return isLoading;
}

export function useSetLoading() {
  const { push } = useConnectRender("loading");

  return {
    set: useCallback(
      (isShow: boolean) => {
        push("global", isShow);
      },
      [push]
    ),
  };
}
