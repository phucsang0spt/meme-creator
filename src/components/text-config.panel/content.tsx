import { TextEZ } from "classes/text.ez";
import { NumericRange } from "components/numeric-range";
import { SettingsProperty } from "components/settings-property";
import { Writer } from "components/writer";
import { useDrawerData } from "hooks/drawer.hook";
import { useCallback } from "react";

export function TextConfigContent() {
  const data = useDrawerData<{ selectedText: TextEZ }>();

  const handleChangeContent = useCallback(
    (text: string) => {
      data.selectedText.changeContent(text);
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
    </div>
  );
}
