import React, {
  ChangeEvent,
  FC,
  FocusEvent,
  MouseEvent,
  useState,
} from 'react';
import { TextField } from '@mui/material';
import type { MRT_Cell, MRT_Row, MRT_TableInstance } from '..';

interface Props {
  cell: MRT_Cell;
  tableInstance: MRT_TableInstance;
}

export const MRT_EditCellTextField: FC<Props> = ({ cell, tableInstance }) => {
  const {
    getState,
    options: {
      idPrefix,
      enableEditing,
      muiTableBodyCellEditTextFieldProps,
      onCellEditBlur,
      onCellEditChange,
    },
    setCurrentEditingCell,
    setCurrentEditingRow,
  } = tableInstance;

  const [value, setValue] = useState(cell.getValue());

  const { column, row } = cell;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    column.onCellEditChange?.({ event, cell, tableInstance });
    onCellEditChange?.({ event, cell, tableInstance });
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    if (getState().currentEditingRow) {
      row._valuesCache[column.id] = value;
      setCurrentEditingRow({ ...getState().currentEditingRow } as MRT_Row);
    }
    setCurrentEditingCell(null);
    column.onCellEditBlur?.({ event, cell, tableInstance });
    onCellEditBlur?.({ event, cell, tableInstance });
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

  if (enableEditing && column.enableEditing !== false && column.Edit) {
    return <>{column.Edit?.({ cell, tableInstance })}</>;
  }

  return (
    <TextField
      id={`mrt-${idPrefix}-edit-cell-text-field-${cell.id}`}
      margin="dense"
      onBlur={handleBlur}
      onChange={handleChange}
      onClick={(e: MouseEvent<HTMLInputElement>) => e.stopPropagation()}
      placeholder={column.header}
      value={value}
      variant="standard"
      {...textFieldProps}
    />
  );
};
