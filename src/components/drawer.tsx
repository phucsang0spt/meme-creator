import {
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
export type DrawerFuncs = {
  open: () => void;
};

type DrawerProps = {
  header?: ReactNode;
  children: ReactNode;
};
const _Drawer = ({ header, children }: DrawerProps, ref: Ref<DrawerFuncs>) => {
  const [isOpen, setOpen] = useState(false);

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
        <Section>
          <div>{header}</div>
          <main>{children}</main>
        </Section>
      </div>
    </Root>
  );
};

export const Drawer = forwardRef(_Drawer);
