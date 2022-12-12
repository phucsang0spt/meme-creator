import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useDebounce } from "use-debounce";

const Root = styled.input`
  width: 100%;
  font-family: "Noto Sans", sans-serif;
  color: #fff;
  background: #3e3e3e60;
  border-radius: 3px;
  border: 1px solid #5e5e5e;
  padding: 5px;
  font-size: 14px;
  line-height: 14px;

  &:focus {
    outline: none;
  }
`;

type WriterProps = {
  defaultValue?: string;
  placeholder?: string;
  onSave?: (value: string) => void;
};

export function SimpleWriter({
  placeholder,
  onSave,
  defaultValue = "",
}: WriterProps) {
  const [value, setValue] = useState(defaultValue);
  const [bounceValue] = useDebounce(value, 200);
  const refIsFirst = useRef(true);

  useEffect(() => {
    if (defaultValue !== bounceValue) {
      onSave?.(bounceValue);
    } else {
      if (!bounceValue && !refIsFirst.current) {
        onSave?.(bounceValue);
      }
    }
  }, [bounceValue, onSave, defaultValue]);

  useEffect(() => {
    refIsFirst.current = false;
  }, []);
  return (
    <Root
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
