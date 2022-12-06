import { useState } from "react";
import { FiPlus } from "@react-icons/all-files/fi/FiPlus";
import { FiTrash } from "@react-icons/all-files/fi/FiTrash";
import { MdDeleteForever } from "@react-icons/all-files/md/MdDeleteForever";
import styled, { css } from "styled-components";

import { fileToBase64 } from "utils";

import { GridPic } from "./grid-pic";

const Root = styled.div<{ deleteMode: boolean }>`
  width: 100%;
  color: #fff;

  > main {
    margin-top: 20px;

    ${({ deleteMode }) => deleteMode && css``}
  }
`;

const ChooseFileBtn = styled.div`
  color: whitesmoke;
  display: flex;
  align-items: center;
  justify-content: center;

  > label,
  > section {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 5px;

    span {
      margin-left: 5px;
      margin-top: -2px;
      font-size: 12px;
      line-height: 12px;
    }
  }

  div {
    height: 1px;
    background-color: #5e5e5e;
    flex: 1;

    &[data-role="side"] {
      flex: unset;
      width: 10px;
    }
  }

  input {
    display: none;
  }
`;

const DeleteBtn = styled.section<{
  deleteMode: boolean;
}>`
  ${({ deleteMode }) =>
    deleteMode &&
    css`
      svg,
      span {
        color: #ff4040;
      }
    `}
`;

type LocalUploadListProps = {
  data: Picture[];
  onAdd: (base64: string) => void;
  onRemove?: (id: Picture["id"]) => void;
  onSelect?: (base64: string) => void;
};

export function LocalUploadList({
  data,
  onAdd,
  onRemove,
  onSelect,
}: LocalUploadListProps) {
  const [deleteMode, setDeleteMode] = useState(false);

  const handleFileSelected = async (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await fileToBase64(file);
      onAdd(base64);
    }
    e.target.value = null;
  };

  const handleSelectTemplate = (pic: Picture) => {
    if (deleteMode) {
      onRemove?.(pic.id);
    } else {
      onSelect?.(pic.src);
    }
  };
  return (
    <Root deleteMode={deleteMode}>
      <ChooseFileBtn>
        <div data-role="side" />
        <label>
          <FiPlus size={20} />
          <input
            type="file"
            accept="image/png, image/gif, image/jpeg"
            onChange={handleFileSelected}
          />
          <span>Upload</span>
        </label>
        <div />
        <DeleteBtn
          deleteMode={deleteMode}
          onClick={() => setDeleteMode((prev) => !prev)}
        >
          {deleteMode ? (
            <MdDeleteForever size={16} style={{ marginTop: -3 }} />
          ) : (
            <FiTrash size={16} style={{ marginTop: -3 }} />
          )}

          <span> {deleteMode ? "Cancel" : "Delete"}</span>
        </DeleteBtn>
        <div data-role="side" />
      </ChooseFileBtn>
      <main>
        <GridPic
          shake={deleteMode}
          column={2}
          data={data}
          onSelect={handleSelectTemplate}
        />
      </main>
    </Root>
  );
}
