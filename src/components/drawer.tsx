import {
  createContext,
  forwardRef,
  ReactNode,
  Ref,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import styled, { css } from "styled-components";
import { SpinnerCircular } from "spinners-react";

const TRANSITION_DURATION = 200;
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
  transition: left ${TRANSITION_DURATION}ms ease-in-out;

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

const SpinIndicator = styled.div`
  width: 100%;
  height: 70%;

  display: flex;
  align-items: center;
  justify-content: center;
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

export const Drawer = forwardRef(function Drawer(
  { header, children, defaultOpen = false }: DrawerProps,
  ref: Ref<DrawerFuncs>
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
  // const [mountContent, setMountContent] = useState(!!defaultOpen);

  useImperativeHandle(
    ref,
    () => ({
      open: (data: Record<string, any> = {}) => {
        setPresent({
          isOpen: true,
          data,
        });
        // setMountContent(true);
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
          // setMountContent(false);
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
        <Section>
          <div>{header}</div>
          {present.isOpen && (
            <ContentIndicator data={present.data}>{children}</ContentIndicator>
          )}
        </Section>
      </div>
    </Root>
  );
});

function ContentIndicator({
  children,
  data,
}: {
  children: ReactNode;
  data: DrawerData;
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // wait for transition completed to avoid lagging if content large
    const timer = setTimeout(() => {
      setLoading(false);
    }, TRANSITION_DURATION + 100);

    return () => {
      clearTimeout(timer);
    };
  }, []);
  return loading ? (
    <SpinIndicator>
      <SpinnerCircular color="#3399cc" size={30} />
    </SpinIndicator>
  ) : (
    <DrawerDataContext.Provider value={data}>
      <main>{children}</main>
    </DrawerDataContext.Provider>
  );
}
