import React, { ChangeEvent, FC, MouseEvent } from 'react';
import { TextField } from '@mui/material';
import type { MRT_Cell, MRT_TableInstance } from '..';

interface Props {
  cell: MRT_Cell;
  tableInstance: MRT_TableInstance;
}

export const MRT_EditCellTextField: FC<Props> = ({ cell, tableInstance }) => {
  const {
    getState,
    options: { enableRowEditing, muiTableBodyCellEditTextFieldProps },
  } = tableInstance;

  const { column, row } = cell;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (getState().currentEditingRow) {
      row.values[column.id] = event.target.value;
      // setCurrentEditingRow({
      //   ...getState().currentEditingRow,
      // });
    }
    column.onCellEditChange?.({ event, cell, tableInstance });
  };

  const mTableBodyCellEditTextFieldProps =
    muiTableBodyCellEditTextFieldProps instanceof Function
      ? muiTableBodyCellEditTextFieldProps({ cell, tableInstance })
      : muiTableBodyCellEditTextFieldProps;

  const mcTableBodyCellEditTextFieldProps =
    column.muiTableBodyCellEditTextFieldProps instanceof Function
      ? column.muiTableBodyCellEditTextFieldProps({ cell, tableInstance })
      : column.muiTableBodyCellEditTextFieldProps;

  const textFieldProps = {
    ...mTableBodyCellEditTextFieldProps,
    ...mcTableBodyCellEditTextFieldProps,
  };

  if (enableRowEditing && column.enableEditing !== false && column.Edit) {
    return <>{column.Edit?.({ cell, tableInstance })}</>;
  }

  return (
    <TextField
      margin="dense"
      onChange={handleChange}
      onClick={(e: MouseEvent<HTMLInputElement>) => e.stopPropagation()}
      placeholder={column.header}
      value={cell.value}
      variant="standard"
      {...textFieldProps}
    />
  );
};
