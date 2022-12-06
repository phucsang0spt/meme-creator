import styled from "styled-components";

const Root = styled.input`
  -webkit-appearance: none;
  margin-right: 15px;
  width: 100%;
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
  onChange?: (size: number) => void;
};

export function NumericRange({
  defaultValue = 0,
  range,
  step = 1,
  onChange,
}: NumericRangeProps) {
  return (
    <Root
      type="range"
      defaultValue={defaultValue}
      min={range[0]}
      max={range[1]}
      step={step}
      onChange={(e) => {
        onChange?.(+e.target.value);
      }}
    />
  );
}
