import { forwardRef, Ref, useState } from "react";
import { MdPhotoSizeSelectActual } from "@react-icons/all-files/md/MdPhotoSizeSelectActual";
import { MdSettings } from "@react-icons/all-files/md/MdSettings";

import { Drawer, DrawerFuncs } from "components/drawer";
import { MenuTab } from "components/menu-tab";

import { BgTab } from "./bg.tab";
import { SettingsTab } from "./settings.tab";

enum SettingsMode {
  BG,
  SETTINGS,
}

function _BgSettingsPanel(_: any, ref: Ref<DrawerFuncs>) {
  const [settingsMode, setSettingsMode] = useState<SettingsMode>(
    SettingsMode.BG
  );
  return (
    <Drawer
      ref={ref}
      header={
        <MenuTab
          bottomDivider={false}
          styleTheme="red"
          selected={settingsMode}
          onChange={setSettingsMode}
          tabs={[
            { code: SettingsMode.BG, label: <MdPhotoSizeSelectActual /> },
            { code: SettingsMode.SETTINGS, label: <MdSettings /> },
          ]}
        />
      }
    >
      {settingsMode === SettingsMode.BG ? <BgTab /> : <SettingsTab />}
    </Drawer>
  );
}

export const BgSettingsPanel = forwardRef(_BgSettingsPanel);
