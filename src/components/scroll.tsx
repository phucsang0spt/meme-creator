import { ReactNode } from "react";
import styled, { css } from "styled-components";

const Root = styled.div<{
  dir: "hoz" | "ver";
}>`
  overflow: scroll;
  ${({ dir }) =>
    dir === "ver"
      ? css`
          width: 100%;
          min-height: 100%;
          max-height: 100%;
          overflow-x: hidden;
          padding-left: 2px;
          /* width */
          ::-webkit-scrollbar {
            width: 8px;
          }
        `
      : css`
          min-width: 100%;
          max-width: 100%;
          height: 100%;
          overflow-y: hidden;
          padding-bottom: 2px;
          /* width */
          ::-webkit-scrollbar {
            height: 8px;
          }
        `}

  /* Track */
  ::-webkit-scrollbar-track {
    background: transparent;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #4b4b4b;
    border-radius: 3px;
    box-shadow: 0 0 3px 0.1px #0000007a inset;
  }
`;

type ScrollProps = {
  children: ReactNode;
  dir?: "hoz" | "ver";
};
export function Scroll({ dir = "ver", children }: ScrollProps) {
  return <Root dir={dir}>{children}</Root>;
}
