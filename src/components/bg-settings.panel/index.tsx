import { forwardRef, useImperativeHandle, useState } from "react";
import styled, { css } from "styled-components";

import { TabsPanel } from "./tabs-panel";

const Root = styled.div<{ isOpen: boolean }>`
  z-index: 4;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  color: #fff;

  > div {
    position: relative;
    width: 100%;
    height: 100%;
  }

  left: 100%;
  transition: left 200ms ease-in-out;

  ${({ isOpen }) =>
    isOpen &&
    css`
      left: 0%;
    `}
`;

const CloseSensor = styled.div`
  position: absolute;
  z-index: 1;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

export type BgSettingsPanelFuncs = {
  open: () => void;
};

function BgSettingsPanelRef(_: any, ref: any) {
  const [isOpen, setOpen] = useState(true);

  useImperativeHandle(
    ref,
    () => ({
      open: () => setOpen(true),
    }),
    []
  );

  return (
    <Root isOpen={isOpen}>
      <div>
        <CloseSensor
          onClick={() => {
            setOpen(false);
          }}
        />
        <TabsPanel />
      </div>
    </Root>
  );
}

export const BgSettingsPanel = forwardRef(BgSettingsPanelRef);
