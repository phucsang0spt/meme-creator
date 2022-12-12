import { useEffect, useState } from "react";
import styled from "styled-components";
import { useDebounce } from "use-debounce";
import { SketchPicker } from "react-color";

const Root = styled.div<{
  color: string;
}>`
  padding-bottom: 10px;
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
      <SketchPicker
        color={value}
        onChangeComplete={(color) => {
          setValue(color.hex);
        }}
      />
    </Root>
  );
}
