import styled, { css } from "styled-components";

const Root = styled.label<{
  shape: "circle" | "rect";
}>`
  display: inline-flex;
  align-items: center;

  > div {
    margin-left: 5px;
    margin-top: calc(0.4rem - 5px);
    width: 10px;
    height: 10px;
    border: 1px solid #e74c3c;
    position: relative;
    &::before {
      content: "";
      position: absolute;
      width: 0px;
      height: 0px;
      background-color: #e74c3c;
      top: 2px;
      left: 2px;
      transition: width 200ms ease-in-out, height 200ms ease-in-out;
    }

    ${({ shape }) =>
      shape === "circle" &&
      css`
        border-radius: 100%;
      `}
  }

  input {
    display: none;
  }

  input:checked + div {
    &::before {
      width: 4px;
      height: 4px;

      ${({ shape }) =>
        shape === "circle" &&
        css`
          border-radius: 100%;
        `}
    }
  }
`;

type TickerProps = {
  name: string;
  label: string;
  value?: string | number;
  defaultChecked?: boolean;
  type: "radio" | "checkbox";
  onChange?: (checked: boolean) => void;
};

export function Ticker({
  name,
  type,
  defaultChecked,
  label,
  value,
  onChange,
}: TickerProps) {
  return (
    <Root shape={type === "radio" ? "circle" : "rect"}>
      <span>{label}</span>
      <input
        type={type}
        name={name}
        value={value}
        defaultChecked={defaultChecked}
        onChange={({ target }) => {
          onChange?.(target.checked);
        }}
      />
      <div />
    </Root>
  );
}
