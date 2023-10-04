import {
  type ChangeEvent,
  type FocusEvent,
  type KeyboardEvent,
  useState,
} from 'react';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { type TextFieldProps } from '@mui/material/TextField';
import { parseFromValuesOrFunc } from '../column.utils';
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
    setCreatingRow,
    setEditingCell,
    setEditingRow,
  } = table;
  const { column, row } = cell;
  const { columnDef } = column;
  const { creatingRow, editingRow } = getState();

  const isCreating = creatingRow?.id === row.id;
  const isEditing = editingRow?.id === row.id;
  const isSelectEdit = columnDef.editVariant === 'select';

  const [value, setValue] = useState(() => cell.getValue<string>());

  const textFieldProps: TextFieldProps = {
    ...parseFromValuesOrFunc(muiEditTextFieldProps, {
      cell,
      column,
      row,
      table,
    }),
    ...parseFromValuesOrFunc(columnDef.muiEditTextFieldProps, {
      cell,
      column,
      row,
      table,
    }),
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
      disabled={parseFromValuesOrFunc(columnDef.enableEditing, row) === false}
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
        ['custom', 'modal'].includes(
          (isCreating ? createDisplayMode : editDisplayMode) as string,
        )
          ? column.columnDef.header
          : undefined
      }
      margin="none"
      name={column.id}
      placeholder={
        !['custom', 'modal'].includes(
          (isCreating ? createDisplayMode : editDisplayMode) as string,
        )
          ? columnDef.header
          : undefined
      }
      select={isSelectEdit}
      value={value}
      variant="standard"
      {...textFieldProps}
      onBlur={handleBlur}
      onChange={handleChange}
      onClick={(e) => {
        e.stopPropagation();
        textFieldProps?.onClick?.(e);
      }}
      onKeyDown={handleEnterKeyDown}
    >
      {textFieldProps.children ??
        columnDef?.editSelectOptions?.map(
          (option: { text: string; value: string } | string) => {
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
                  alignItems: 'center',
                  display: 'flex',
                  gap: '0.5rem',
                  m: 0,
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
