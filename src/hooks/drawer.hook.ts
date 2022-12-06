import { DrawerDataContext } from "components/drawer";
import { useContext } from "react";

export function useDrawerData<
  D extends Record<string, any> = Record<string, any>
>() {
  const data: D = useContext(DrawerDataContext) as any;
  return data;
}
