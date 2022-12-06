import styled from "styled-components";
import { Ticker } from "./ticker";

const Root = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  > label {
    + label {
      margin-left: 12px;
    }
  }
`;

type RadioGroupProps = {
  name: string;
  defaultValue?: string;
  options: {
    label: string;
    code: string;
  }[];
  onChange?: (code: string) => void;
};
export function RadioGroup({
  name,
  defaultValue,
  options,
  onChange,
}: RadioGroupProps) {
  return (
    <Root
      onChange={(e) => {
        e.persist();
        const target = e.target as HTMLInputElement;
        onChange?.(target.value);
      }}
    >
      {options.map((opt) => (
        <Ticker
          key={opt.code}
          name={name}
          type="radio"
          label={opt.label}
          value={opt.code}
          defaultChecked={opt.code === defaultValue}
        />
      ))}
    </Root>
  );
}
