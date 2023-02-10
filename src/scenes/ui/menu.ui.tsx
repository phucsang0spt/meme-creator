import styled, { keyframes } from "styled-components";
import SquareDiv from "react-square-div";
import { MdSettings } from "@react-icons/all-files/md/MdSettings";
import { MdBurstMode } from "@react-icons/all-files/md/MdBurstMode";
import { MdTheaters } from "@react-icons/all-files/md/MdTheaters";
import { FiImage } from "@react-icons/all-files/fi/FiImage";
// import { FiStar } from "@react-icons/all-files/fi/FiStar";
import { useScene } from "react-simple-game-engine/lib/utilities";
import { toCorrectPixel } from "px";

const Root = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgb(62, 62, 62);
  position: relative;
  color: #fff;
`;

const Floater = styled.main`
  background-color: #292929;
  width: 100%;
  height: calc(100% - 120px);
  position: absolute;
  left: 0;
  bottom: 0;
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
`;

const Body = styled.div`
  width: 100%;
  height: 100%;
  max-width: ${toCorrectPixel(250)}px;
  padding: 0 0 30px 0;
  margin-inline: auto;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const ModeList = styled.div`
  width: 100%;

  display: grid;

  grid-gap: 5px;

  > div {
    background-color: hsl(222, 59%, 60%);
    border-radius: 8px;
    position: relative;

    &:first-child {
      grid-column: 1 / span 2;
      background-color: hsl(6, 63%, 60%);
    }
  }
`;

const ModeItem = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  p {
    font-size: ${toCorrectPixel(13)}px;
    line-height: ${toCorrectPixel(13)}px;
  }

  &[aria-disabled="true"] {
    position: relative;

    &::before {
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: #00000075;
      content: "Coming soon!";
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;

      transform-origin: bottom center;
      transform: rotateX(-90deg);
      transition: transform 200ms ease-in-out;
    }

    &:hover {
      &::before {
        transform: rotateX(0deg);
      }
    }
  }
`;

const Footer = styled.footer`
  margin-top: 20px;

  width: 100%;
  border-radius: 4px;

  font-size: 2rem;
  line-height: 2rem;
  color: #e1e1e1;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoSpin = keyframes`
   0% {
        transform: rotateZ(0deg);
      };
      100% {
        transform: rotateZ(360deg);
      }
`;

const Logo = styled.div`
  display: flex;
  justify-content: center;
  margin-top: -50px;

  position: relative;

  &::before {
    position: absolute;
    content: "";
    width: 30%;
    height: 2px;
    background-color: whitesmoke;
    bottom: -4px;
  }

  svg {
    animation: ${LogoSpin} 4s ease-in-out infinite;
  }
`;

// const RateUs = styled.div`
//   display: flex;
//   justify-content: flex-end;

//   padding: 8px;

//   > p {
//     display: inline-flex;
//     align-items: center;
//     justify-content: flex-end;

//     font-size: 1.2rem;
//     line-height: 1.2rem;
//     color: hsl(28, 80%, 72%);

//     svg {
//       margin-left: 5px;
//     }

//     padding-bottom: 2px;
//     border-bottom: 1px solid currentColor;
//   }
// `;

export function MenuUI() {
  const scene = useScene();
  return (
    <Root>
      {/* <RateUs>
        <p>
          Rate Us
          <FiStar />
        </p>
      </RateUs> */}
      <Floater>
        <Logo>
          <MdSettings size={100} />
        </Logo>
        <Body>
          <ModeList>
            <div onClick={() => scene.switchToScene("image-mode")}>
              <SquareDiv>
                <ModeItem>
                  <FiImage size={100} />
                  <p>
                    <b>S</b>tatic
                  </p>
                </ModeItem>
              </SquareDiv>
            </div>
            <div>
              <SquareDiv>
                <ModeItem aria-disabled="true">
                  <MdBurstMode size={60} />
                  <p>
                    <b>G</b>if
                  </p>
                </ModeItem>
              </SquareDiv>
            </div>
            <div>
              <SquareDiv>
                <ModeItem aria-disabled="true">
                  <MdTheaters size={60} />
                  <p>
                    <b>C</b>lip
                  </p>
                </ModeItem>
              </SquareDiv>
            </div>
          </ModeList>
          <Footer>Meme EZ!!</Footer>
        </Body>
      </Floater>
    </Root>
  );
}
