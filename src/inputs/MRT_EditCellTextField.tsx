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
    options: { muiTableBodyCellEditTextFieldProps },
  } = tableInstance;

  const { column, row } = cell;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (getState().currentEditingRow) {
      row.values[column.id] = event.target.value;
      // setCurrentEditingRow({
      //   ...getState().currentEditingRow,
      // });
    }
    column.onCellEditChange?.(event, cell);
  };

  const mTableBodyCellEditTextFieldProps =
    muiTableBodyCellEditTextFieldProps instanceof Function
      ? muiTableBodyCellEditTextFieldProps(cell)
      : muiTableBodyCellEditTextFieldProps;

  const mcTableBodyCellEditTextFieldProps =
    column.muiTableBodyCellEditTextFieldProps instanceof Function
      ? column.muiTableBodyCellEditTextFieldProps(cell)
      : column.muiTableBodyCellEditTextFieldProps;

  const textFieldProps = {
    ...mTableBodyCellEditTextFieldProps,
    ...mcTableBodyCellEditTextFieldProps,
  };

  // if (enableEditing && Edit) {
  //   return <>{Edit({ ...textFieldProps, cell })}</>;
  // }

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
