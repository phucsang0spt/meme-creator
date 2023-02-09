import { useCallback } from "react";
import {
  createContext,
  CSSProperties,
  forwardRef,
  Ref,
  useImperativeHandle,
  useState,
} from "react";
import styled, { css } from "styled-components";

const Root = styled.div<{
  isOpen: boolean;
}>`
  z-index: 4;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  color: #fff;

  transform-origin: bottom center;
  transform: rotateX(-90deg);
  transition: transform 200ms ease-in-out;

  ${({ isOpen }) =>
    isOpen &&
    css`
      transform: rotateX(0deg);
    `}

  > div {
    position: relative;
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const CloseSensor = styled.div`
  position: absolute;
  z-index: 1;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

const Section = styled.section``;

type OverlayData = Record<string, any>;

export type OverlayFuncs = {
  open: (data?: OverlayData) => void;
  close: () => void;
};

export const OverlayDataContext = createContext<OverlayData>(undefined);

type OverlayProps = {
  children: React.ReactNode;
  defaultOpen?: OverlayData | boolean;
  wrapper?: React.FC<{ style?: CSSProperties }>;
  onClose?: () => void;
};

export const Overlay = forwardRef(function Overlay(
  {
    children,
    defaultOpen = false,
    wrapper: Wrapper = Section,
    onClose,
  }: OverlayProps,
  ref: Ref<OverlayFuncs>
) {
  const [present, setPresent] = useState({
    isOpen: !!defaultOpen,
    data:
      typeof defaultOpen === "boolean"
        ? defaultOpen
          ? {}
          : undefined
        : defaultOpen,
  });
  const [mountContent, setMountContent] = useState(!!defaultOpen);

  const handleClose = useCallback(() => {
    setPresent((prev) => ({ ...prev, isOpen: false }));
    onClose?.();
  }, [onClose]);

  const handleOpen = useCallback((data: Record<string, any> = {}) => {
    setPresent({
      isOpen: true,
      data,
    });
    setMountContent(true);
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      open: handleOpen,
      close: handleClose,
    }),
    [handleClose, handleOpen]
  );

  return (
    <Root
      isOpen={present.isOpen}
      onTransitionEnd={() => {
        // closed after transition
        if (!present.isOpen) {
          setMountContent(false);
          setPresent((prev) => ({ ...prev, data: undefined }));
        }
      }}
    >
      <div>
        <CloseSensor onClick={handleClose} />
        {mountContent && (
          <Wrapper style={{ zIndex: 2, position: "relative" }}>
            <OverlayDataContext.Provider value={present.data}>
              {children}
            </OverlayDataContext.Provider>
          </Wrapper>
        )}
      </div>
    </Root>
  );
});
