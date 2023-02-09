import { useMemo } from "react";
import styled from "styled-components";
import { debounce } from "utils";

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

  text-decoration: none !important;
  box-shadow: none !important;
  outline: none !important;
  text-underline-position: auto;
`;

type WriterProps = {
  defaultValue?: string;
  onSave?: (value: string) => void;
};

export function Writer({ onSave, defaultValue = "" }: WriterProps) {
  const handleSaveChange = useMemo(() => {
    return debounce((value: string) => {
      onSave?.(value);
    });
  }, [onSave]);

  return (
    <Root
      defaultValue={defaultValue}
      onChange={(e) => handleSaveChange(e.target.value)}
    />
  );
}
