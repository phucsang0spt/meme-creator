import { forwardRef, Ref } from "react";
import { MdFace } from "@react-icons/all-files/md/MdFace";

import { Drawer, DrawerFuncs } from "../drawer";
import { MenuTab } from "../menu-tab";
import { EmojiList } from "./list";

export const EmojiPanel = forwardRef(function EmojiPanel(
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
          tabs={[{ code: "message-box", label: <MdFace /> }]}
        />
      }
    >
      <EmojiList />
    </Drawer>
  );
});
