import { ReactNode } from "react";
import styled from "styled-components";

const Root = styled.div`
  color: #fff;
  > section {
    margin-top: 7px;
    padding-left: 5px;

    font-size: 0.8rem;
    line-height: 0.8rem;
  }
  + * {
    margin-top: 20px;
  }
`;

type SettingsPropertyProps = {
  label: string;
  children: ReactNode;
};

export function SettingsProperty({ label, children }: SettingsPropertyProps) {
  return (
    <Root>
      <p>{label}</p>
      <section>{children}</section>
    </Root>
  );
}
