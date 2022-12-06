import { ReactNode } from "react";
import styled, { css } from "styled-components";

const Root = styled.div<{
  bottomDivider: boolean;
}>`
  height: 10vw;
  width: 100%;
  min-height: 50px;
  max-height: 70px;

  background-color: rgb(62, 62, 62);
  border-bottom: 3px solid
    ${({ bottomDivider }) => (bottomDivider ? "#292929" : "#00000000")};
`;

const Stack = styled.ul<{
  styleTheme: "red" | "blue";
  bottomDivider: boolean;
}>`
  ${({ styleTheme }) =>
    styleTheme === "red"
      ? css`
          --main-color: #e74c3c;
        `
      : css`
          --main-color: #39c;
        `}

  width: 100%;
  height: 100%;
  display: flex;
  list-style-type: none;

  font-size: 1rem;
  line-height: 1rem;

  li:not(:last-child) {
    width: 25vw;
    max-width: 120px;
    border-right: 1px solid #292929;
  }

  li:not(:first-child) {
    border-left: 1px solid #5e5e5e;
  }

  li {
    svg {
      font-size: 1.5rem;
      line-height: 1.5rem;
    }

    color: #fff;

    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    &::before {
      content: "";
      height: 0px;
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 0;
      border-radius: 2px;
      background-color: var(--main-color);
      transition: height 200ms ease-in-out;
    }

    ${({ bottomDivider }) =>
      bottomDivider
        ? css`
            &[data-state="active"] {
              box-shadow: 0 -4px 6px 0.5px #0000003e inset;
              &::before {
                height: 3px;
              }
            }
          `
        : css`
            &::before {
              height: 3px;
            }
            &[data-state="active"] {
              &::before {
                height: 0px;
              }
            }
          `}

    &[data-disabled="true"] {
      &:hover {
        color: #292929;
        position: relative;
        &::after {
          width: 100%;
          height: 100%;
          background-color: #0000002e;
          position: absolute;
          content: "Coming soon!";
          font-size: 0.6em;
          line-height: 0.6em;
          top: 0;
          left: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #e67e22;
          font-weight: bold;
        }
      }
    }
  }

  li:last-child {
    flex: 1;
  }
`;

type Tab<C> = {
  label: ReactNode;
  code: C;
  disabled?: boolean;
};

type MenuTabProps<C> = {
  bottomDivider?: boolean;
  styleTheme?: "red" | "blue";
  tabs: Tab<C>[];
  selected: C;
  onChange?: (code: Tab<C>["code"]) => void;
};
export function MenuTab<C extends any = string | number>({
  bottomDivider = true,
  styleTheme = "blue",
  tabs,
  selected,
  onChange,
}: MenuTabProps<C>) {
  return (
    <Root bottomDivider={bottomDivider}>
      <Stack styleTheme={styleTheme} bottomDivider={bottomDivider}>
        {tabs.map(({ code, label, disabled = false }) => (
          <li
            key={code as string}
            onClick={() => !disabled && onChange?.(code)}
            data-disabled={disabled}
            data-state={selected === code && "active"}
          >
            <span>{label}</span>
          </li>
        ))}
      </Stack>
    </Root>
  );
}
