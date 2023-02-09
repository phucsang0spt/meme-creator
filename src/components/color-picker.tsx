import { useMemo, useState } from "react";
import styled from "styled-components";
import { ChromePicker } from "react-color";
import { debounce } from "utils";

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

  const handleSaveChange = useMemo(() => {
    return debounce((value: string) => {
      onSave?.(value);
    });
  }, [onSave]);

  return (
    <Root color={value}>
      <ChromePicker
        color={value}
        onChange={(color) => setValue(color.hex)}
        onChangeComplete={(color) => handleSaveChange(color.hex)}
      />
    </Root>
  );
}
