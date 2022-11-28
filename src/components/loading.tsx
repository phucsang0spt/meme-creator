import { SpinnerCircular } from "spinners-react";
import styled from "styled-components";
import { useConnectRender } from "use-connect-render/lib";

const Root = styled.div`
  z-index: 99;
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;

  background-color: #00000045;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export function Loading() {
  const { listen } = useConnectRender("loading");
  const isLoading = listen<[boolean]>("global")[0];
  return isLoading ? (
    <Root>
      <SpinnerCircular color="#fff" size={60} />
    </Root>
  ) : null;
}
