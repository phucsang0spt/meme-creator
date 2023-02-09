import { useRef } from "react";
import styled from "styled-components";
import { MdPictureInPictureAlt } from "@react-icons/all-files/md/MdPictureInPictureAlt";
import { MdArrowBack } from "@react-icons/all-files/md/MdArrowBack";
import { FiRefreshCcw } from "@react-icons/all-files/fi/FiRefreshCcw";
import { MdFileDownload } from "@react-icons/all-files/md/MdFileDownload";

import {
  Control,
  ControlContainer,
  useEntity,
  useScaleContainer,
  useScene,
} from "react-simple-game-engine/lib/utilities";

import { UtilitiesCode } from "enums";

import { ShapeManagerEntity } from "entities/shape-manager.entity";

import { DrawerFuncs } from "components/drawer";
import { Loading } from "components/loading";
import { Utilities } from "components/utilities";

import { BgSettingsPanel } from "components/bg-settings.panel";
import { TextConfigPanel } from "components/text-config.panel";
import { ExtraImagePanel } from "components/extra-image.panel";
import { MessageBoxPanel } from "components/message-box.panel";
import { EmojiPanel } from "components/emoji.panel";
import { ConfirmPopup } from "components/confirm-popup";
import { OverlayFuncs } from "components/overlay";
import { useSetLoading } from "hooks/loading.hook";
import { toCorrectPixel } from "px";

export const FloatIconSize = toCorrectPixel(35, true);

const Root = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
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

const FloatOutlineIcon = styled.span`
  border-radius: 100%;
  width: ${FloatIconSize}px;
  height: ${FloatIconSize}px;

  display: flex;
  align-items: center;
  justify-content: center;

  > svg {
    font-size: ${FloatIconSize * 0.9}px;
    line-height: ${FloatIconSize * 0.9}px;
    color: #fff;
  }
`;

const AdsBanner = styled.section`
  width: 100%;
  border-top: 1px solid #5e5e5e;
  flex: 1;
  min-height: 40px;
`;

export function ImageModeUI() {
  const { set } = useSetLoading();
  const scene = useScene();
  const refBgSettingsPanel = useRef<DrawerFuncs>();
  const refTextConfigPanel = useRef<DrawerFuncs>();
  const refExtraImagePanel = useRef<DrawerFuncs>();
  const refMessageBoxPanel = useRef<DrawerFuncs>();
  const refEmojiPanel = useRef<DrawerFuncs>();
  const refConfirmClearObjects = useRef<OverlayFuncs>();

  const [shapeManagerEntity] = useEntity(ShapeManagerEntity);

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
    } else if (code === UtilitiesCode.EMOJI) {
      refEmojiPanel.current!.open();
    }
  };

  const handleSureClearObjects = () => {
    shapeManagerEntity.clearAll();
  };

  const handleExport = () => {
    shapeManagerEntity.export({
      onStartExport: () => {
        set(true);
      },
      onCompletedExport: () => {
        set(false);
      },
    });
  };

  return (
    <Root>
      <Main>
        <ControlStack>
          <Control top={10} left={10}>
            <FloatOutlineIcon onClick={() => scene.switchToScene("menu")}>
              <MdArrowBack />
            </FloatOutlineIcon>
          </Control>

          <Control top={10} right={10}>
            <ControlContainer>
              <Control top={0} right={FloatIconSize + 40}>
                <ControlContainer>
                  <Control top={0} right={FloatIconSize + 10}>
                    <FloatIcon
                      onClick={() => refConfirmClearObjects.current!.open()}
                    >
                      <FiRefreshCcw />
                    </FloatIcon>
                  </Control>
                  <Control top={0} right={0}>
                    <FloatIcon
                      onClick={() => refBgSettingsPanel.current!.open()}
                    >
                      <MdPictureInPictureAlt />
                    </FloatIcon>
                  </Control>
                </ControlContainer>
              </Control>
              {/* // */}
              <Control top={0} right={0}>
                <FloatIcon onClick={handleExport}>
                  <MdFileDownload />
                </FloatIcon>
              </Control>
            </ControlContainer>
          </Control>
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
      <EmojiPanel ref={refEmojiPanel} />
      <ConfirmPopup ref={refConfirmClearObjects} onOK={handleSureClearObjects}>
        Are you certain want to delete all objects ?
      </ConfirmPopup>
      <Loading />
    </Root>
  );
}
