import { useEffect, useState } from "react";
import styled from "styled-components";
import { useDebounce } from "use-debounce";

const Root = styled.textarea`
  font-family: "Noto Sans", sans-serif;
  color: #fff;
  background: #3e3e3e60;
  border-radius: 3px;
  border: 1px solid #5e5e5e;
  padding: 5px;
  font-size: 14px;
  line-height: 14px;

  height: 100px;

  &:focus {
    outline: none;
  }
`;

type WriterProps = {
  defaultValue?: string;
  onSave?: (value: string) => void;
};

export function Writer({ onSave, defaultValue = "" }: WriterProps) {
  const [value, setValue] = useState(defaultValue);
  const [bounceValue] = useDebounce(value, 200);

  useEffect(() => {
    if (defaultValue !== bounceValue) {
      onSave?.(bounceValue);
    }
  }, [bounceValue, onSave, defaultValue]);
  return <Root value={value} onChange={(e) => setValue(e.target.value)} />;
}
