import { TextField } from '@mui/material';
import React, { ChangeEvent, FC } from 'react';
import { Cell } from 'react-table';
import { useMaterialReactTable } from '../useMaterialReactTable';

interface Props {
  cell: Cell;
}

export const MRT_EditCellTextfield: FC<Props> = ({ cell }) => {
  const {
    localization,
    currentEditingRow,
    setCurrentEditingRow,
    muiTableBodyCellEditTextFieldProps,
  } = useMaterialReactTable();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (currentEditingRow) {
      setCurrentEditingRow({
        ...currentEditingRow,
        values: { ...cell.row.values, [cell.column.id]: event.target.value },
      });
    }
  };

  const textFieldProps = {
    ...muiTableBodyCellEditTextFieldProps,
    ...cell.column.muiTableBodyCellEditTextFieldProps,
    style: {
      //@ts-ignore
      ...muiTableBodyCellEditTextFieldProps?.style,
      ...cell.column.muiTableBodyCellEditTextFieldProps?.style,
    },
  };

  if (cell.column.editable && cell.column.Edit) {
    return (
      <>
        {cell.column.Edit({ ...textFieldProps, cell, onChange: handleChange })}
      </>
    );
  }

  return (
    <TextField
      margin="dense"
      placeholder={localization?.filterTextFieldPlaceholder}
      onChange={handleChange}
      onClick={(e) => e.stopPropagation()}
      value={currentEditingRow?.values?.[cell.column.id]}
      variant="standard"
      {...textFieldProps}
    />
  );
};
