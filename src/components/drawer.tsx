import {
  createContext,
  forwardRef,
  ReactNode,
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

const Section = styled.section`
  z-index: 2;
  position: relative;
  width: 70%;
  height: calc(100% - var(--vh) * 0.25 - 20px);
  top: 0;
  left: 100%;
  transform: translateX(-100%);
  border-left: 2px solid #29292940;
  border-bottom: 2px solid #29292940;
  background-color: rgb(62, 62, 62, 0.9);
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

type DrawerData = Record<string, any>;

export type DrawerFuncs = {
  open: (data?: DrawerData) => void;
};

export const DrawerDataContext = createContext<DrawerData>(undefined);

type DrawerProps = {
  header?: ReactNode;
  children: ReactNode;
  defaultOpen?: DrawerData | boolean;
};
const _Drawer = (
  { header, children, defaultOpen = false }: DrawerProps,
  ref: Ref<DrawerFuncs>
) => {
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

  useImperativeHandle(
    ref,
    () => ({
      open: (data: Record<string, any> = {}) => {
        setPresent({
          isOpen: true,
          data,
        });
        setMountContent(true);
      },
    }),
    []
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
        <CloseSensor
          onClick={() => {
            setPresent((prev) => ({ ...prev, isOpen: false }));
          }}
        />
        {mountContent && (
          <Section>
            <DrawerDataContext.Provider value={present.data}>
              <div>{header}</div>
              <main>{children}</main>
            </DrawerDataContext.Provider>
          </Section>
        )}
      </div>
    </Root>
  );
};

export const Drawer = forwardRef(_Drawer);
