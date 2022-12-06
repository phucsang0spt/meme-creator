import { forwardRef, Ref } from "react";
import { MdFormatColorText } from "@react-icons/all-files/md/MdFormatColorText";

import { Drawer, DrawerFuncs } from "../drawer";
import { MenuTab } from "../menu-tab";
import { TextConfigContent } from "./content";

export const TextConfigPanel = forwardRef(function TextConfigPanel(
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
          tabs={[{ code: "text", label: <MdFormatColorText /> }]}
        />
      }
    >
      <TextConfigContent />
    </Drawer>
  );
});
