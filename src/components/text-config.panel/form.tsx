import { TextEZ } from "classes/text.ez";
import { ColorPicker } from "components/color-picker";
import { NumericRange } from "components/numeric-range";
import { RadioGroup } from "components/radio-group";
import { SettingsProperty } from "components/settings-property";
import { Writer } from "components/writer";
import { useDrawerData } from "hooks/drawer.hook";
import { useCallback } from "react";

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

export function TextConfigForm() {
  const data = useDrawerData<{ selectedText: TextEZ }>();

  const handleChangeContent = useCallback(
    (text: string) => {
      data.selectedText.changeContent(text);
    },
    [data.selectedText]
  );

  const handleChangeColor = useCallback(
    (color: string) => {
      data.selectedText.fill(color);
    },
    [data.selectedText]
  );
  return (
    <div>
      <SettingsProperty label="Content">
        <Writer
          defaultValue={data.selectedText.text()}
          onSave={handleChangeContent}
        />
      </SettingsProperty>
      <SettingsProperty label="Font size">
        <NumericRange
          range={[13, 50]}
          defaultValue={data.selectedText.fontSize()}
          onChange={(size) => {
            data.selectedText.changeFontSize(size);
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
      <SettingsProperty label="Color">
        <ColorPicker
          defaultValue={data.selectedText.fill()}
          onSave={handleChangeColor}
        />
      </SettingsProperty>
    </div>
  );
}
