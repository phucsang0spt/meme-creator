import { forwardRef, Ref } from "react";
import { MdChatBubble } from "@react-icons/all-files/md/MdChatBubble";

import { Drawer, DrawerFuncs } from "../drawer";
import { MenuTab } from "../menu-tab";
import { BoxList } from "./list";

export const MessageBoxPanel = forwardRef(function MessageBoxPanel(
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
          tabs={[{ code: "message-box", label: <MdChatBubble /> }]}
        />
      }
    >
      <BoxList />
    </Drawer>
  );
});
