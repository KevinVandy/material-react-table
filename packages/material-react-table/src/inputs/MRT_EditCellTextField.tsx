import {
  type ChangeEvent,
  type FocusEvent,
  type KeyboardEvent,
  useState,
} from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { type TextFieldProps } from '@mui/material/TextField';
import { type MRT_Cell, type MRT_TableInstance } from '../types';

interface Props<TData extends Record<string, any>> {
  cell: MRT_Cell<TData>;
  table: MRT_TableInstance<TData>;
}

export const MRT_EditCellTextField = <TData extends Record<string, any>>({
  cell,
  table,
}: Props<TData>) => {
  const {
    getState,
    options: { createDisplayMode, editDisplayMode, muiEditTextFieldProps },
    refs: { editInputRefs },
    setEditingCell,
    setEditingRow,
    setCreatingRow,
  } = table;
  const { column, row } = cell;
  const { columnDef } = column;
  const { creatingRow, editingRow } = getState();

  const isCreating = creatingRow?.id === row.id;
  const isEditing = editingRow?.id === row.id;
  const isSelectEdit = columnDef.editVariant === 'select';

  const [value, setValue] = useState(() => cell.getValue<string>());

  const mTableBodyCellEditTextFieldProps =
    muiEditTextFieldProps instanceof Function
      ? muiEditTextFieldProps({ cell, column, row, table })
      : muiEditTextFieldProps;

  const mcTableBodyCellEditTextFieldProps =
    columnDef.muiEditTextFieldProps instanceof Function
      ? columnDef.muiEditTextFieldProps({
          cell,
          column,
          row,
          table,
        })
      : columnDef.muiEditTextFieldProps;

  const textFieldProps: TextFieldProps = {
    ...mTableBodyCellEditTextFieldProps,
    ...mcTableBodyCellEditTextFieldProps,
  };

  const saveInputValueToRowCache = (newValue: string) => {
    //@ts-ignore
    row._valuesCache[column.id] = newValue;
    if (isCreating) {
      setCreatingRow({ ...row });
    } else if (isEditing) {
      setEditingRow({ ...row });
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    textFieldProps.onChange?.(event);
    setValue(event.target.value);
    if (textFieldProps?.select) {
      saveInputValueToRowCache(event.target.value);
    }
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    textFieldProps.onBlur?.(event);
    saveInputValueToRowCache(value);
    setEditingCell(null);
  };

  const handleEnterKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    textFieldProps.onKeyDown?.(event);
    if (event.key === 'Enter' && !event.shiftKey) {
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
      label={
        ['modal', 'custom'].includes(
          (isCreating ? createDisplayMode : editDisplayMode) as string,
        )
          ? column.columnDef.header
          : undefined
      }
      margin="none"
      name={column.id}
      placeholder={
        !['modal', 'custom'].includes(
          (isCreating ? createDisplayMode : editDisplayMode) as string,
        )
          ? columnDef.header
          : undefined
      }
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
