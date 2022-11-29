import * as CordovaSQLiteDriver from "localforage-cordovasqlitedriver";
import { Drivers, Storage } from "@ionic/storage";
import { createContext, ReactElement, useMemo } from "react";
import { useConnectRender } from "use-connect-render/lib";

const storage = new Storage({
  driverOrder: [
    CordovaSQLiteDriver._driver,
    Drivers.IndexedDB,
    Drivers.LocalStorage,
  ],
});

export const StorageContext = createContext<Storage>(storage);

export function StorageProvider({ children }: { children: ReactElement }) {
  const { push } = useConnectRender("loading", { global: true });

  useMemo(async () => {
    await storage.create().catch((err) => {
      console.warn("err", err);
      alert("Initial storage fail");
    });
    push("global", false);
  }, [push]);

  return (
    <StorageContext.Provider value={storage}>
      {children}
    </StorageContext.Provider>
  );
}
