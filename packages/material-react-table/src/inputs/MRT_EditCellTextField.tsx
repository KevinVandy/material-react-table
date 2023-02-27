import React, { ChangeEvent, FocusEvent, KeyboardEvent, useState } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import type { TextFieldProps } from '@mui/material/TextField';
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

  const isSelectEdit = columnDef.editVariant === 'select';

  const saveRow = (newValue: string) => {
    if (editingRow) {
      setEditingRow({
        ...editingRow,
        _valuesCache: { ...editingRow._valuesCache, [column.id]: newValue },
      });
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    textFieldProps.onChange?.(event);
    setValue(event.target.value);
    if (textFieldProps?.select) {
      saveRow(event.target.value);
    }
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    textFieldProps.onBlur?.(event);
    saveRow(value);
    setEditingCell(null);
  };

  const handleEnterKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    textFieldProps.onKeyDown?.(event);
    if (event.key === 'Enter') {
      editInputRefs.current[column.id]?.blur();
    }
  };

  if (columnDef.Edit) {
    return <>{columnDef.Edit?.({ cell, column, row, table })}</>;
  }

  return (
    <TextField
      disabled={
        (columnDef.enableEditing instanceof Function
          ? columnDef.enableEditing(row)
          : columnDef.enableEditing) === false
      }
      fullWidth
      inputRef={(inputRef) => {
        if (inputRef) {
          editInputRefs.current[column.id] = inputRef;
          if (textFieldProps.inputRef) {
            textFieldProps.inputRef = inputRef;
          }
        }
      }}
      label={showLabel ? column.columnDef.header : undefined}
      margin="none"
      name={column.id}
      placeholder={columnDef.header}
      select={isSelectEdit}
      value={value}
      variant="standard"
      {...textFieldProps}
      onClick={(e) => {
        e.stopPropagation();
        textFieldProps?.onClick?.(e);
      }}
      onBlur={handleBlur}
      onChange={handleChange}
      onKeyDown={handleEnterKeyDown}
    >
      {textFieldProps.children ??
        columnDef?.editSelectOptions?.map(
          (option: string | { text: string; value: string }) => {
            let value: string;
            let text: string;
            if (typeof option !== 'object') {
              value = option;
              text = option;
            } else {
              value = option.value;
              text = option.text;
            }
            return (
              <MenuItem
                key={value}
                sx={{
                  display: 'flex',
                  m: 0,
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
                value={value}
              >
                {text}
              </MenuItem>
            );
          },
        )}
    </TextField>
  );
};
