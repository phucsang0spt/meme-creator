import { useEntity } from "react-simple-game-engine/lib/utilities";
import styled from "styled-components";

import { ShapeManagerEntity } from "entities/shape-manager.entity";
import { ViewPortEntity } from "entities/viewport.entity";
import { Resolutions } from "options";
import { Ticker } from "components/ticker";
import { SettingsProperty } from "components/settings-property";

const RadioGroup = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  > label {
    + label {
      margin-left: 12px;
    }
  }
`;

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
          onChange={(e) => {
            e.persist();
            const target = e.target as HTMLInputElement;
            if (target.value === "hd") {
              viewportEntity.currentResolution = Resolutions.HD;
            } else if (target.value === "full-hd") {
              viewportEntity.currentResolution = Resolutions.FULL_HD;
            } else if (target.value === "2k") {
              viewportEntity.currentResolution = Resolutions.TWO_K;
            }
          }}
        >
          {resolutionOptions.map((opt) => (
            <Ticker
              key={opt.code}
              name="resolution"
              type="radio"
              label={opt.label}
              value={opt.code}
              defaultChecked={opt.code === "hd"}
            />
          ))}
        </RadioGroup>
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
