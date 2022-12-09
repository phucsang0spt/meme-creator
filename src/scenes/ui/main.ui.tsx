import { useRef, useState } from "react";
import { useConnectRender } from "use-connect-render";
import styled from "styled-components";
import { MdFileDownload } from "@react-icons/all-files/md/MdFileDownload";
import { MdPictureInPictureAlt } from "@react-icons/all-files/md/MdPictureInPictureAlt";

import {
  Control,
  useEntity,
  useScaleContainer,
} from "react-simple-game-engine/lib/utilities";

import { ContextMode, UtilitiesCode } from "enums";
import { ContextModes } from "options";

import { ShapeManagerEntity } from "entities/shape-manager.entity";

import { DrawerFuncs } from "components/drawer";
import { MenuTab } from "components/menu-tab";
import { Loading } from "components/loading";
import { Utilities } from "components/utilities";

import { BgSettingsPanel } from "components/bg-settings.panel";
import { TextConfigPanel } from "components/text-config.panel";
import { ExtraImagePanel } from "components/extra-image.panel";
import { MessageBoxPanel } from "components/message-boxes.panel";

const FloatIconSize = 30;

const Root = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  box-shadow: 0 2px 5px 1px #00000077;
  position: relative;
  z-index: 3;
  width: 100%;
`;

const Footer = styled.footer`
  width: 100%;
  height: calc(var(--vh) * 0.3);
  max-height: 162px;
  background-color: rgb(62, 62, 62);
  box-shadow: 0 -2px 5px 0.5px #00000077;
  border-top: 3px solid #292929;
  position: relative;
  z-index: 3;
`;

const Main = styled.main`
  width: 100%;
  flex: 1;
  min-height: 0;
  z-index: 2;
  top: 0;
  left: 0;
`;

const ControlStack = styled.div`
  position: relative;
  z-index: 2;
`;

const CanvasRoot = styled.div`
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;

const FloatIcon = styled.span`
  border-radius: 100%;
  background-color: #e74c3c;
  width: ${FloatIconSize}px;
  height: ${FloatIconSize}px;

  display: flex;
  align-items: center;
  justify-content: center;

  > svg {
    font-size: ${FloatIconSize * 0.5}px;
    line-height: ${FloatIconSize * 0.5}px;
    color: #fff;
  }
`;

const AdsBanner = styled.section`
  width: 100%;
  border-top: 1px solid #5e5e5e;
  flex: 1;
  min-height: 40px;
`;

type MenuTabCode = typeof ContextModes[0]["code"] | "export";
export function MainUI() {
  const { push } = useConnectRender("loading");
  const refBgSettingsPanel = useRef<DrawerFuncs>();
  const refTextConfigPanel = useRef<DrawerFuncs>();
  const refExtraImagePanel = useRef<DrawerFuncs>();
  const refMessageBoxPanel = useRef<DrawerFuncs>();

  const [shapeManagerEntity] = useEntity(ShapeManagerEntity);

  const [contextMode, setContextMode] = useState<MenuTabCode>(
    ContextMode.IMAGE as MenuTabCode
  );
  const ScaleContainer = useScaleContainer();

  const handleSelectUtilities = (code: UtilitiesCode) => {
    if (code === UtilitiesCode.TEXT) {
      shapeManagerEntity.addText().onShowSettings = (text) => {
        refTextConfigPanel.current!.open({ selectedText: text });
      };
    } else if (code === UtilitiesCode.IMAGE) {
      refExtraImagePanel.current!.open();
    } else if (code === UtilitiesCode.BOX) {
      refMessageBoxPanel.current!.open();
    }
  };
  return (
    <Root>
      <Header>
        <MenuTab
          selected={contextMode}
          onChange={(code: MenuTabCode) => {
            if (code === "export") {
              shapeManagerEntity.export({
                onStartExport: () => {
                  push("global", true);
                },
                onCompletedExport: () => {
                  push("global", false);
                },
              });
            } else {
              setContextMode(code as ContextMode);
            }
          }}
          tabs={
            [
              ...ContextModes,
              { code: "export", label: <MdFileDownload /> },
            ] as {
              label: string;
              code: MenuTabCode;
            }[]
          }
        />
      </Header>
      <Main>
        <ControlStack>
          <Control top={10} left={10}>
            <FloatIcon onClick={() => refBgSettingsPanel.current!.open()}>
              <MdPictureInPictureAlt />
            </FloatIcon>
          </Control>
          {/* <Control top={10} right={10}>
            <ControlContainer>
              <Control top={0} right={0}>
                <FloatIcon>
                  <FiPlus onClick={() => frameManagerEntity.zoomIn()} />
                </FloatIcon>
              </Control>
              <Control top={FloatIconSize + 5} right={0}>
                <FloatIcon>
                  <FiMinus onClick={() => frameManagerEntity.zoomOut()} />
                </FloatIcon>
              </Control>
            </ControlContainer>
          </Control> */}
        </ControlStack>
        <CanvasRoot>
          <ScaleContainer>
            <div id="konva-layer" />
          </ScaleContainer>
        </CanvasRoot>
      </Main>
      <Footer>
        <Utilities onSelect={handleSelectUtilities} />
        <AdsBanner />
      </Footer>
      <BgSettingsPanel ref={refBgSettingsPanel} />
      <TextConfigPanel ref={refTextConfigPanel} />
      <ExtraImagePanel ref={refExtraImagePanel} />
      <MessageBoxPanel ref={refMessageBoxPanel} />
      <Loading />
    </Root>
  );
}
