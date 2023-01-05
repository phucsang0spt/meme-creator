import { useImperativeHandle, forwardRef, useRef } from "react";
import styled, { css } from "styled-components";
import { FiAlertTriangle } from "@react-icons/all-files/fi/FiAlertTriangle";

import { Overlay, OverlayFuncs } from "./overlay";

const Root = styled.div`
  width: calc(100% - 30px);
  min-height: 70px;
  background-color: hsl(28, 80%, 62%);
  border-radius: 4px;
  padding: 20px 10px;

  top: -100px;
`;

const Content = styled.p`
  font-size: 0.9rem;
  line-height: 0.9rem;
  color: #fff;
  text-align: center;
`;

const ButtonWrap = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  & > div {
    & + div {
      margin-left: 10px;
    }
  }
`;

const Button = styled.div<{ negative?: boolean }>`
  height: 30px;
  background-color: #e74c3c;
  color: #fff;
  padding: 6px 20px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  line-height: 13px;

  ${({ negative }) =>
    negative &&
    css`
      background-color: #5e5e5e;
    `}
`;

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: hsl(28, 80%, 72%);

  width: 40px;
  height: 40px;
  margin-inline: auto;
  border-radius: 100%;

  margin-bottom: 5px;

  svg {
    font-size: 25px;
    line-height: 25px;
    margin-top: -1px;
    color: #e74c3c;
  }
`;

type ConfirmPopupProps = {
  children: string;
  onOK: () => void;
  onCancel?: () => void;
};

export const ConfirmPopup = forwardRef(function ConfirmPopup(
  { children, onOK, onCancel }: ConfirmPopupProps,
  ref
) {
  const refOverlay = useRef<OverlayFuncs>();

  const handleOK = () => {
    onOK();
    refOverlay.current!.close();
  };

  useImperativeHandle(
    ref,
    () =>
      ({
        open: refOverlay.current.open,
        close: refOverlay.current.close,
      } as OverlayFuncs),
    []
  );

  return (
    <Overlay wrapper={Root} ref={refOverlay} onClose={onCancel}>
      <div>
        <Header>
          <FiAlertTriangle />
        </Header>
        <Content>{children}</Content>
        <ButtonWrap>
          <Button onClick={handleOK}>Sure</Button>
          <Button onClick={() => refOverlay.current!.close()} negative>
            Cancel
          </Button>
        </ButtonWrap>
      </div>
    </Overlay>
  );
});
