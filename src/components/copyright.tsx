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
            url: "https://www.freepik.com/free-vector/various-emoji-faces-flat-icons-big-set_13683727.htm#query=emoji%20icons&position=0&from_view=search&track=sph",
          });
        }}
      >
        - Image by pch.vector on Freepik
      </span>
    </Root>
  );
}
