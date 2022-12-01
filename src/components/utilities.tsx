import styled from "styled-components";
import { FiType } from "@react-icons/all-files/fi/FiType";
import { FiImage } from "@react-icons/all-files/fi/FiImage";
import { FiMessageSquare } from "@react-icons/all-files/fi/FiMessageSquare";
import { FiSmile } from "@react-icons/all-files/fi/FiSmile";
import { FiSlash } from "@react-icons/all-files/fi/FiSlash";

import { Scroll } from "./scroll";

const Root = styled.div`
  width: 100%;
  padding: 3px 5px;
`;

const ToolStack = styled.div`
  display: inline-flex;
  align-items: center;
  border: 1px solid #292929;

  > div {
    cursor: pointer;
    min-width: 50px;
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
export function Utilities() {
  return (
    <Root>
      <Scroll dir="hoz">
        <ToolStack>
          <div>
            <FiType />
          </div>
          <div>
            <FiImage />
          </div>
          <div>
            <FiMessageSquare />
          </div>
          <div>
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
