import { useContext } from "react";
import { StorageContext } from "storage-provider";

export function useStorage() {
  const storage = useContext(StorageContext);
  return storage;
}
