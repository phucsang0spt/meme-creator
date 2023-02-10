import { TextEZ } from "classes/text.ez";
import { ColorPicker } from "components/color-picker";
import { NumericRange } from "components/numeric-range";
import { RadioGroup } from "components/radio-group";
import { Scroll } from "components/scroll";
import { SettingsProperty } from "components/settings-property";
import { Writer } from "components/writer";
import { StuffValue } from "../../constants";
import { useDrawerData } from "hooks/drawer.hook";
import styled from "styled-components";

const fontStyleOptions = [
  {
    label: "Normal",
    code: "normal",
  },
  {
    label: "Italic",
    code: "italic",
  },
  {
    label: "Bold",
    code: "bold",
  },
];

const Root = styled.div`
  height: 100%;
`;

export function TextConfigForm() {
  const data = useDrawerData<{ selectedText: TextEZ }>();

  const selectedTextContent = data.selectedText.text();
  return (
    <Root>
      <Scroll>
        <SettingsProperty label="Content">
          <Writer
            defaultValue={
              selectedTextContent === StuffValue.DEFAULT_NEW_TEXT
                ? ""
                : selectedTextContent
            }
            onSave={(text) => {
              data.selectedText.changeContent(text);
            }}
          />
        </SettingsProperty>
        <SettingsProperty label="Font style">
          <RadioGroup
            defaultValue={data.selectedText.fontStyle()}
            name="font-style"
            options={fontStyleOptions}
            onChange={(style: string) => {
              data.selectedText.changeFontStyle(style);
            }}
          />
        </SettingsProperty>
        <SettingsProperty label="Font size">
          <NumericRange
            range={[13, 120]}
            getLabel={(value) => `${value}px`}
            defaultValue={data.selectedText.fontSize()}
            onSave={(size) => {
              data.selectedText.changeFontSize(size);
            }}
          />
        </SettingsProperty>
        <SettingsProperty label="Color">
          <ColorPicker
            defaultValue={data.selectedText.fill()}
            onSave={(color) => {
              data.selectedText.fill(color);
            }}
          />
        </SettingsProperty>

        <SettingsProperty label="Stroke width">
          <NumericRange
            range={[0, 10]}
            getLabel={(value) => `${value}px`}
            defaultValue={data.selectedText.strokeWidth()}
            onSave={(size) => {
              data.selectedText.changeStrokeWidth(size);
            }}
          />
        </SettingsProperty>
        <SettingsProperty label="Stroke color">
          <ColorPicker
            defaultValue={data.selectedText.stroke()}
            onSave={(color) => {
              data.selectedText.stroke(color);
            }}
          />
        </SettingsProperty>
      </Scroll>
    </Root>
  );
}
