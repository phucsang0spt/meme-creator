import styled, { css, keyframes } from "styled-components";
import SquareDiv from "react-square-div";
import { SpinnerCircular } from "spinners-react";
import { CSSProperties } from "react";

const ShakeKF = keyframes`
   0% {
        transform: translateX(0%);
      };
      25% {
        transform: translateX(calc(var(--shake-amplitude) * -1%));
      }
      50% {
        transform: translateX(0%);
      };
      75% {
        transform: translateX(calc(var(--shake-amplitude) * 1%));
      };
      100% {
        transform: translateX(0%);
      }
`;

const Root = styled.div<{
  column: number;
  shake: boolean;
}>`
  display: grid;
  grid-template-columns: repeat(${({ column }) => column}, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  padding-right: 5px;
  max-width: 200px;

  transform: translateX(-50%);
  position: relative;
  left: 50%;
  top: 0;

  > div {
    /* width: 40px; */
    /* height: 40px; */
    border: 1px solid ${({ shake }) => (shake ? "#e74c3c" : "#5e5e5e")};
  }

  ${({ shake }) =>
    shake &&
    css`
      > div {
        transform-origin: center;
        animation: ${ShakeKF} 1s linear infinite;
      }
    `}
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const Loader = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

type GridPicProps = {
  shake?: boolean;
  column?: number;
  loading?: boolean;
  data: Picture[];
  onSelect?: (template: GridPicProps["data"][0]) => void;
};
export function GridPic({
  shake = false,
  loading = false,
  column = 3,
  data,
  onSelect,
}: GridPicProps) {
  return loading ? (
    <Loader>
      <SpinnerCircular color="#39c" size={30} />
    </Loader>
  ) : (
    <Root column={column} shake={shake}>
      {data.map((pic) => (
        <div
          style={
            {
              "--shake-amplitude": (Math.random() * (0.05 - 0.01) + 0.01) * 100,
            } as CSSProperties
          }
          key={pic.id}
          onClick={() => onSelect?.(pic)}
        >
          <SquareDiv>
            <Thumbnail src={pic.src} alt="" />
          </SquareDiv>
        </div>
      ))}
    </Root>
  );
}
