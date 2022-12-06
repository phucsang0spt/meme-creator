import { useEffect } from "react";
import { useEntity } from "react-simple-game-engine/lib/utilities";

import {
  useFetchLocalMemeTemplates,
  useWatchLocalMemeTemplates,
} from "hooks/local-meme-templates.hook";

import { ShapeManagerEntity } from "entities/shape-manager.entity";
import { LocalUploadList } from "./local-upload-list";

export function LocalMemeTemplates() {
  const [shapeManagerEntity] = useEntity(ShapeManagerEntity);
  const { fetch, save, remove } = useFetchLocalMemeTemplates();
  const templates = useWatchLocalMemeTemplates();

  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <LocalUploadList
      data={templates}
      onAdd={(base64) => {
        save(base64);
      }}
      onSelect={(base64) => {
        shapeManagerEntity.setBackground(base64);
      }}
      onRemove={(id) => {
        remove(id);
      }}
    />
  );
}
