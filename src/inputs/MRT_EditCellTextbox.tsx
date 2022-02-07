import { TextField } from '@mui/material';
import React, { ChangeEvent, FC } from 'react';
import { Cell } from 'react-table';
import { useMaterialReactTable } from '../useMaterialReactTable';

interface Props {
  cell: Cell;
}

export const MRT_EditCellTextbox: FC<Props> = ({ cell }) => {
  const { localization, currentEditingRow, setCurrentEditingRow } =
    useMaterialReactTable();

  //@ts-ignore
  if (cell.Edit) {
    //@ts-ignore
    return <>{column.Edit({ cell })}</>;
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (currentEditingRow) {
      setCurrentEditingRow({
        ...currentEditingRow,
        values: { ...cell.row.values, [cell.column.id]: event.target.value },
      });
    }
  };

  return (
    <TextField
      margin="dense"
      placeholder={localization?.filterTextFieldPlaceholder}
      onChange={handleChange}
      onClick={(e) => e.stopPropagation()}
      value={currentEditingRow?.values?.[cell.column.id]}
      variant="standard"
    />
  );
};
