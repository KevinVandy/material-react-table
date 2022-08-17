import React, { ChangeEvent, FocusEvent, MouseEvent, useState } from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import type { MRT_Cell, MRT_TableInstance } from '..';

interface Props<TData extends Record<string, any> = {}> {
  cell: MRT_Cell<TData>;
  table: MRT_TableInstance<TData>;
  showLabel?: boolean;
}

export const MRT_EditCellTextField = <TData extends Record<string, any> = {}>({
  cell,
  showLabel,
  table,
}: Props<TData>) => {
  const {
    getState,
    options: { muiTableBodyCellEditTextFieldProps },
    refs: { editInputRefs },
    setEditingCell,
    setEditingRow,
  } = table;
  const { column, row } = cell;
  const { columnDef } = column;
  const { editingRow } = getState();

  const [value, setValue] = useState(() => cell.getValue<string>());

  const mTableBodyCellEditTextFieldProps =
    muiTableBodyCellEditTextFieldProps instanceof Function
      ? muiTableBodyCellEditTextFieldProps({ cell, column, row, table })
      : muiTableBodyCellEditTextFieldProps;

  const mcTableBodyCellEditTextFieldProps =
    columnDef.muiTableBodyCellEditTextFieldProps instanceof Function
      ? columnDef.muiTableBodyCellEditTextFieldProps({
          cell,
          column,
          row,
          table,
        })
      : columnDef.muiTableBodyCellEditTextFieldProps;

  const textFieldProps: TextFieldProps = {
    ...mTableBodyCellEditTextFieldProps,
    ...mcTableBodyCellEditTextFieldProps,
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    textFieldProps.onChange?.(event);
    setValue(event.target.value);
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    textFieldProps.onBlur?.(event);
    if (editingRow) {
      setEditingRow({
        ...editingRow,
        _valuesCache: { ...editingRow._valuesCache, [column.id]: value },
      } as any);
    }
    setEditingCell(null);
  };

  if (columnDef.Edit) {
    return <>{columnDef.Edit?.({ cell, column, row, table })}</>;
  }

  return (
    <TextField
      disabled={columnDef.enableEditing === false}
      fullWidth
      label={showLabel ? column.columnDef.header : undefined}
      margin="none"
      name={cell.id}
      onClick={(e: MouseEvent<HTMLInputElement>) => e.stopPropagation()}
      placeholder={columnDef.header}
      value={value}
      variant="standard"
      {...textFieldProps}
      inputRef={(inputRef) => {
        if (inputRef) {
          editInputRefs.current[column.id] = inputRef;
          if (textFieldProps.inputRef) {
            textFieldProps.inputRef = inputRef;
          }
        }
      }}
      onBlur={handleBlur}
      onChange={handleChange}
    />
  );
};
