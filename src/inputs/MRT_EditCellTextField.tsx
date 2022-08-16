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
    options: { tableId, muiTableBodyCellEditTextFieldProps },
    setEditingCell,
    setEditingRow,
  } = table;
  const { column } = cell;
  const { columnDef } = column;
  const { editingRow } = getState();

  const [value, setValue] = useState(() => cell.getValue<string>());

  const mTableBodyCellEditTextFieldProps =
    muiTableBodyCellEditTextFieldProps instanceof Function
      ? muiTableBodyCellEditTextFieldProps({ cell, table })
      : muiTableBodyCellEditTextFieldProps;

  const mcTableBodyCellEditTextFieldProps =
    columnDef.muiTableBodyCellEditTextFieldProps instanceof Function
      ? columnDef.muiTableBodyCellEditTextFieldProps({
          cell,
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
    return <>{columnDef.Edit?.({ cell, column, table })}</>;
  }

  return (
    <TextField
      disabled={columnDef.enableEditing === false}
      fullWidth
      id={`mrt-${tableId}-edit-cell-text-field-${cell.id}`}
      label={showLabel ? column.columnDef.header : undefined}
      margin="none"
      onClick={(e: MouseEvent<HTMLInputElement>) => e.stopPropagation()}
      placeholder={columnDef.header}
      value={value}
      variant="standard"
      {...textFieldProps}
      onBlur={handleBlur}
      onChange={handleChange}
    />
  );
};
