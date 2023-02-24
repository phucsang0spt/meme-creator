import styled from "styled-components";
import { Browser } from "@capacitor/browser";

const Root = styled.section`
  width: 100%;
  padding: 10px 0;

  h5 {
    font-size: 15px;
    line-height: 15px;
    color: whitesmoke;
    margin-bottom: 10px;
  }

  span {
    text-decoration: none;
    cursor: default;
    display: block;
    color: #b6b6b6;
    font-size: 13px;
    line-height: 13px;

    + span {
      margin-top: 10px;
    }
  }
`;
export function Copyright() {
  return (
    <Root>
      <h5>Thank for: </h5>
      <span
        onClick={(e) => {
          Browser.open({
            url: "https://iconscout.com/icon-pack/emoji-45",
          });
        }}
      >
        - Emoji Icon Pack by IconScout Store
      </span>
    </Root>
  );
}
