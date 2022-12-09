import styled from "styled-components";
import { FiType } from "@react-icons/all-files/fi/FiType";
import { FiImage } from "@react-icons/all-files/fi/FiImage";
import { FiMessageSquare } from "@react-icons/all-files/fi/FiMessageSquare";
import { FiSmile } from "@react-icons/all-files/fi/FiSmile";
import { FiSlash } from "@react-icons/all-files/fi/FiSlash";

import { Scroll } from "./scroll";
import { UtilitiesCode } from "enums";

const Root = styled.div`
  width: 100%;
  padding: 3px 5px;
`;

const ToolStack = styled.div`
  display: inline-flex;
  align-items: center;
  border: 1px solid #292929;
  color: #fff;

  > div {
    min-width: ${100 / 6}vw;
    height: 40px;

    &:not(:last-child) {
      border-right: 1px solid #292929;
    }

    &:not(:first-child) {
      border-left: 1px solid #5e5e5e;
    }

    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      font-size: 1rem;
      line-height: 1rem;
    }
  }
`;

type UtilitiesProps = {
  onSelect: (code: UtilitiesCode) => void;
};
export function Utilities({ onSelect }: UtilitiesProps) {
  return (
    <Root>
      <Scroll dir="hoz">
        <ToolStack>
          <div onClick={() => onSelect(UtilitiesCode.TEXT)}>
            <FiType />
          </div>
          <div onClick={() => onSelect(UtilitiesCode.IMAGE)}>
            <FiImage />
          </div>
          <div onClick={() => onSelect(UtilitiesCode.BOX)}>
            <FiMessageSquare />
          </div>
          <div onClick={() => onSelect(UtilitiesCode.TEXT)}>
            <FiSmile />
          </div>

          <div>
            <FiSlash color="grey" />
          </div>
          <div>
            <FiSlash color="grey" />
          </div>
        </ToolStack>
      </Scroll>
    </Root>
  );
}
