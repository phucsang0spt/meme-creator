import { useEntity } from "react-simple-game-engine/lib/utilities";

import { ShapeManagerEntity } from "entities/shape-manager.entity";
import { ViewPortEntity } from "entities/viewport.entity";
import { Resolutions } from "options";
import { Ticker } from "components/ticker";
import { SettingsProperty } from "components/settings-property";
import { RadioGroup } from "components/radio-group";

const resolutionOptions = [
  { label: "HD", code: "hd" },
  { label: "Full HD", code: "full-hd" },
  { label: "2K", code: "2k" },
];

export function SettingsTab() {
  const [viewportEntity] = useEntity(ViewPortEntity);
  const [shapeManagerEntity] = useEntity(ShapeManagerEntity);

  return (
    <div>
      <SettingsProperty label="Resolution">
        <RadioGroup
          defaultValue="hd"
          name="resolution"
          options={resolutionOptions}
          onChange={(value: string) => {
            if (value === "hd") {
              viewportEntity.currentResolution = Resolutions.HD;
            } else if (value === "full-hd") {
              viewportEntity.currentResolution = Resolutions.FULL_HD;
            } else if (value === "2k") {
              viewportEntity.currentResolution = Resolutions.TWO_K;
            }
          }}
        />
      </SettingsProperty>

      <SettingsProperty label="Trim">
        <Ticker
          type="checkbox"
          defaultChecked={shapeManagerEntity.trimExport}
          name="trim"
          label="Trim avoid"
          onChange={(checked) => {
            shapeManagerEntity.trimExport = checked;
          }}
        />
      </SettingsProperty>
    </div>
  );
}
