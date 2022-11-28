import { useEntity } from "react-simple-game-engine/lib/utilities";
import styled from "styled-components";

import { ShapeManagerEntity } from "entities/shape-manager.entity";
import { ViewPortEntity } from "entities/viewport.entity";
import { Resolutions } from "options";

const SettingsProperty = styled.div`
  > section {
    margin-top: 7px;
    padding-left: 5px;

    font-size: 0.8rem;
    line-height: 0.8rem;
  }
  + * {
    margin-top: 20px;
  }
`;

const Ticker = styled.label`
  display: inline-flex;
  align-items: center;

  > div {
    margin-left: 5px;
    margin-top: calc(0.4rem - 5px);
    width: 10px;
    height: 10px;
    border: 1px solid #e74c3c;
    position: relative;
    &::before {
      content: "";
      position: absolute;
      width: 0px;
      height: 0px;
      background-color: #e74c3c;
      top: 2px;
      left: 2px;
      transition: width 200ms ease-in-out, height 200ms ease-in-out;
    }
  }

  input {
    display: none;
  }

  input:checked + div {
    &::before {
      width: 4px;
      height: 4px;
    }
  }
`;

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
      <SettingsProperty>
        <p>Resolution</p>
        <section>
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
              <Ticker key={opt.code}>
                <span>{opt.label}</span>
                <input
                  type="radio"
                  name="resolution"
                  value={opt.code}
                  defaultChecked={opt.code === "hd"}
                />
                <div />
              </Ticker>
            ))}
          </RadioGroup>
        </section>
      </SettingsProperty>

      <SettingsProperty>
        <p>Trim</p>
        <section>
          <Ticker>
            <span>By transparent</span>
            <input
              type="checkbox"
              defaultChecked={shapeManagerEntity.trimExport}
              onChange={({ target }) => {
                shapeManagerEntity.trimExport = target.checked;
              }}
            />
            <div />
          </Ticker>
        </section>
      </SettingsProperty>
    </div>
  );
}
