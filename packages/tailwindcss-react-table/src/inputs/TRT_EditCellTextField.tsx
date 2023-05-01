import React, { ChangeEvent, FocusEvent, KeyboardEvent, useState } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import type { TextFieldProps } from '@mui/material/TextField';
import type {
  TRT_Cell,
  TRT_TableInstance,
} from '../TailwindCSSReactTable.types';

interface Props<TData extends Record<string, any> = {}> {
  cell: TRT_Cell<TData>;
  table: TRT_TableInstance<TData>;
  showLabel?: boolean;
}

export const TRT_EditCellTextField = <TData extends Record<string, any> = {}>({
  cell,
  showLabel,
  table,
}: Props<TData>) => {
  const {
    getState,
    options: { tableBodyCellEditTextFieldProps },
    refs: { editInputRefs },
    setEditingCell,
    setEditingRow,
  } = table;
  const { column, row } = cell;
  const { columnDef } = column;
  const { editingRow } = getState();

  const [value, setValue] = useState(() => cell.getValue<string>());

  const mTableBodyCellEditTextFieldProps =
    tableBodyCellEditTextFieldProps instanceof Function
      ? tableBodyCellEditTextFieldProps({ cell, column, row, table })
      : tableBodyCellEditTextFieldProps;

  const mcTableBodyCellEditTextFieldProps =
    columnDef.tableBodyCellEditTextFieldProps instanceof Function
      ? columnDef.tableBodyCellEditTextFieldProps({
          cell,
          column,
          row,
          table,
        })
      : columnDef.tableBodyCellEditTextFieldProps;

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
