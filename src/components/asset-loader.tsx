import styled, { keyframes } from "styled-components";
import icon from "assets/icon.png";
import { toCorrectPixel } from "px";
import { MdSettings } from "@react-icons/all-files/md/MdSettings";
import { FiPenTool } from "@react-icons/all-files/fi/FiPenTool";

const Root = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
`;
const IconWrap = styled.div`
  position: relative;
  width: ${toCorrectPixel(100)}px;
  height: ${toCorrectPixel(110)}px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Icon = styled.img`
  border-radius: 100%;
  border: 2px solid #39c;
  width: ${toCorrectPixel(80)}px;
  height: ${toCorrectPixel(80)}px;
`;

const CogSpin = keyframes`
   0% {
        transform: translate(-50%, -50%) rotateZ(0deg);
      };
      100% {
        transform: translate(-50%, -50%) rotateZ(360deg);
      }
`;

const CogWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: calc(100% + ${toCorrectPixel(50)}px);
  height: calc(100% + ${toCorrectPixel(50)}px);

  border: 1px solid #fff;
  border-radius: 100%;
  animation: ${CogSpin} 4s linear infinite;
`;

const Cog = styled(MdSettings)`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: ${CogSpin} 1s ease-in-out infinite;
`;

const Pen = styled(FiPenTool)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
export function AssetLoader() {
  return (
    <Root>
      <IconWrap>
        <CogWrap>
          <Cog size={toCorrectPixel(40)} />
        </CogWrap>
        <Icon src={icon} width={toCorrectPixel(80)} height="auto" alt="" />
        <Pen size={toCorrectPixel(30)} />
      </IconWrap>
    </Root>
  );
}
