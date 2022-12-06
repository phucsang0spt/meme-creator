import { forwardRef, Ref } from "react";
import { MdImage } from "@react-icons/all-files/md/MdImage";

import { Drawer, DrawerFuncs } from "../drawer";
import { MenuTab } from "../menu-tab";
import { ImageList } from "./list";

export const ExtraImagePanel = forwardRef(function ExtraImagePanelPanel(
  _: any,
  ref: Ref<DrawerFuncs>
) {
  return (
    <Drawer
      ref={ref}
      header={
        <MenuTab
          bottomDivider={false}
          styleTheme="red"
          selected={""}
          tabs={[{ code: "text", label: <MdImage /> }]}
        />
      }
    >
      <ImageList />
    </Drawer>
  );
});
