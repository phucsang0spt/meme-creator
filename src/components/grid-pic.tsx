import styled from "styled-components";
import SquareDiv from "react-square-div";
import { SpinnerCircular } from "spinners-react";

const Root = styled.div<{
  column: number;
}>`
  display: grid;
  grid-template-columns: repeat(${({ column }) => column}, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  padding-right: 5px;
  max-width: 190px;

  transform: translateX(-50%);
  position: relative;
  left: 50%;
  top: 0;

  > div {
    /* width: 40px; */
    /* height: 40px; */
    border: 1px solid #5e5e5e;
  }
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
  column?: number;
  loading?: boolean;
  data: {
    id: string;
    src: string;
  }[];
  onSelect?: (template: GridPicProps["data"][0]) => void;
};
export function GridPic({
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
    <Root column={column}>
      {data.map((pic) => (
        <div key={pic.id} onClick={() => onSelect?.(pic)}>
          <SquareDiv>
            <Thumbnail src={pic.src} alt="" />
          </SquareDiv>
        </div>
      ))}
    </Root>
  );
}
