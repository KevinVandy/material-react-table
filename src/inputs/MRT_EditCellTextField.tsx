import React, { ChangeEvent, FC } from 'react';
import { TextField } from '@mui/material';
import { useMRT } from '../useMRT';
import type { MRT_Cell } from '..';

interface Props {
  cell: MRT_Cell;
}

export const MRT_EditCellTextField: FC<Props> = ({ cell }) => {
  const {
    muiTableBodyCellEditTextFieldProps,
    setCurrentEditingRow,
    tableInstance: {
      state: { currentEditingRow },
    },
  } = useMRT();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (currentEditingRow) {
      cell.row.values[cell.column.id] = event.target.value;
      setCurrentEditingRow({
        ...currentEditingRow,
      });
    }
    cell.column.onCellEditChange?.(event, cell);
  };

  const mTableBodyCellEditTextFieldProps =
    muiTableBodyCellEditTextFieldProps instanceof Function
      ? muiTableBodyCellEditTextFieldProps(cell)
      : muiTableBodyCellEditTextFieldProps;

  const mcTableBodyCellEditTextFieldProps =
    cell.column.muiTableBodyCellEditTextFieldProps instanceof Function
      ? cell.column.muiTableBodyCellEditTextFieldProps(cell)
      : cell.column.muiTableBodyCellEditTextFieldProps;

  const textFieldProps = {
    ...mTableBodyCellEditTextFieldProps,
    ...mcTableBodyCellEditTextFieldProps,
    style: {
      //@ts-ignore
      ...muiTableBodyCellEditTextFieldProps?.style,
      //@ts-ignore
      ...cell.column.muiTableBodyCellEditTextFieldProps?.style,
    },
  };

  if (!cell.column.disableEditing && cell.column.Edit) {
    return <>{cell.column.Edit({ ...textFieldProps, cell })}</>;
  }

  return (
    <TextField
      margin="dense"
      onChange={handleChange}
      onClick={(e) => e.stopPropagation()}
      placeholder={cell.column.Header as string}
      value={cell.value}
      variant="standard"
      {...textFieldProps}
    />
  );
};
