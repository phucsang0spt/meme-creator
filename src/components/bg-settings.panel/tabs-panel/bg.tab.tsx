import { useState } from "react";
import styled from "styled-components";

const Root = styled.div``;

const HeaderTab = styled.ul`
  display: flex;
  align-items: center;
  height: 30px;

  list-style-type: none;
  font-size: 0.7rem;
  line-height: 0.7rem;
  color: #5e5e5e;

  > li {
    position: relative;

    width: 50%;
    height: 100%;

    &::after {
      background-color: rgb(62, 62, 62);
      content: attr(data-text);
      position: absolute;
      z-index: 2;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &::before {
      content: "";
      position: absolute;
      z-index: 1;
      width: 90%;
      height: 70%;
      bottom: 0px;
      left: 50%;
      border-radius: 2px;
      transform: translateX(-50%);
      box-shadow: 0px 3px 10px 0.1px #00000041;
    }

    &[data-active="true"] {
      &::before {
        box-shadow: 0px 2px 4px 0.1px #00000021;
        width: 100%;
      }
      color: #fff;
    }

    + li {
      border-left: 1px solid #5e5e5e;
    }

    &:not(:last-child) {
      border-right: 1px solid #292929;
    }
  }
`;

enum BgMode {
  GALLERY,
  LOCAL,
}
export function BgTab() {
  const [bgMode, setBgMode] = useState<BgMode>(BgMode.GALLERY);
  return (
    <Root>
      <HeaderTab>
        <li
          data-text="Gallery"
          data-active={bgMode === BgMode.GALLERY}
          onClick={() => setBgMode(BgMode.GALLERY)}
        />
        <li
          data-text="Local"
          data-active={bgMode === BgMode.LOCAL}
          onClick={() => setBgMode(BgMode.LOCAL)}
        />
      </HeaderTab>
    </Root>
  );
}
