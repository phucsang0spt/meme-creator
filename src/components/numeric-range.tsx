import { useMemo, useState } from "react";
import styled from "styled-components";
import { debounce } from "utils";

const Root = styled.div`
  position: relative;
  width: 100%;

  > p {
    font-size: 1.2rem;
    line-height: 1.2rem;
    color: #fff;
    text-align: center;
    padding-bottom: 10px;
  }
`;
const Slider = styled.input`
  -webkit-appearance: none;
  margin-inline: auto;
  width: calc(100% - 20px);
  height: 7px;
  background: #3e3e3e;
  border-radius: 5px;
  background-size: 70% 100%;
  background-repeat: no-repeat;
  border: 1px solid #5e5e5e;

  /* Input Thumb */
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 15px;
    width: 15px;
    border-radius: 50%;
    background: #fff;
    cursor: ew-resize;
    box-shadow: 0 0 2px 0 #555;
    transition: background 0.3s ease-in-out;
  }

  &::-moz-range-thumb {
    -webkit-appearance: none;
    height: 15px;
    width: 15px;
    border-radius: 50%;
    background: #fff;
    cursor: ew-resize;
    box-shadow: 0 0 2px 0 #555;
    transition: background 0.3s ease-in-out;
  }

  &::-ms-thumb {
    -webkit-appearance: none;
    height: 15px;
    width: 15px;
    border-radius: 50%;
    background: #fff;
    cursor: ew-resize;
    box-shadow: 0 0 2px 0 #555;
    transition: background 0.3s ease-in-out;
  }

  &::-webkit-slider-thumb:hover {
    background: #fff;
  }

  &::-moz-range-thumb:hover {
    background: #fff;
  }

  &::-ms-thumb:hover {
    background: #fff;
  }

  /* Input Track */
  &::-webkit-slider-runnable-track {
    -webkit-appearance: none;
    box-shadow: none;
    border: none;
    background: transparent;
  }

  &::-moz-range-track {
    -webkit-appearance: none;
    box-shadow: none;
    border: none;
    background: transparent;
  }

  &::-ms-track {
    -webkit-appearance: none;
    box-shadow: none;
    border: none;
    background: transparent;
  }
`;

type NumericRangeProps = {
  defaultValue?: number;
  range: [number, number];
  step?: number;
  onSave?: (size: number) => void;
  getLabel?: (value: number) => number | string;
};

export function NumericRange({
  defaultValue = 0,
  range,
  step = 1,
  onSave,
  getLabel = (value: number) => value,
}: NumericRangeProps) {
  const [value, setValue] = useState(defaultValue);

  const handleSaveChange = useMemo(() => {
    return debounce((value: number) => {
      onSave?.(value);
    });
  }, [onSave]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = +e.target.value;
    setValue(val);
    handleSaveChange(val);
  };

  return (
    <Root>
      <p>{getLabel(value)}</p>
      <Slider
        type="range"
        min={range[0]}
        max={range[1]}
        step={step}
        value={value}
        onChange={handleChange}
      />
    </Root>
  );
}
