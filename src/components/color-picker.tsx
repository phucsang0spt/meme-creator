import { useEffect, useState } from "react";
import styled from "styled-components";
import { useDebounce } from "use-debounce";

const Root = styled.label<{
  color: string;
}>`
  display: inline-block;

  > div {
    border-radius: 100%;
    border: 1px solid #fff;
    width: 30px;
    height: 30px;
    background-color: ${({ color }) => color};
  }

  input {
    display: inline-block;
    width: 1px;
    height: 1px;
    background-color: transparent;
  }
`;

type ColorPickerProps = {
  defaultValue?: string;
  onSave?: (value: string) => void;
};

export function ColorPicker({ onSave, defaultValue = "" }: ColorPickerProps) {
  const [value, setValue] = useState(defaultValue);
  const [bounceValue] = useDebounce(value, 200);

  useEffect(() => {
    if (defaultValue !== bounceValue) {
      onSave?.(bounceValue);
    }
  }, [bounceValue, onSave, defaultValue]);
  return (
    <Root color={value}>
      <div />
      <input
        type="color"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </Root>
  );
}
