import { useState } from "react";
import { MdPhotoSizeSelectActual } from "@react-icons/all-files/md/MdPhotoSizeSelectActual";
import { MdSettings } from "@react-icons/all-files/md/MdSettings";
import styled from "styled-components";

import { MenuTab } from "components/menu-tab";
import { BgTab } from "./bg.tab";
import { SettingsTab } from "./settings.tab";

const Root = styled.div`
  z-index: 2;
  position: relative;
  width: 70%;
  height: calc(100% - var(--vh) * 0.2 - 20px);
  top: 0;
  left: 100%;
  transform: translateX(-100%);
  border-left: 2px solid #29292940;
  border-bottom: 2px solid #29292940;
  background-color: rgb(62, 62, 62);
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;
  display: flex;
  flex-direction: column;

  > div {
    width: 100%;
  }

  > main {
    flex: 1;
    min-height: 0;
    padding: 10px 5px;

    font-size: 1rem;
    line-height: 1rem;
  }
`;

enum SettingsMode {
  BG,
  SETTINGS,
}

export function TabsPanel() {
  const [settingsMode, setSettingsMode] = useState<SettingsMode>(
    SettingsMode.BG
  );
  return (
    <Root>
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
      <main>
        {settingsMode === SettingsMode.BG ? <BgTab /> : <SettingsTab />}
      </main>
    </Root>
  );
}
