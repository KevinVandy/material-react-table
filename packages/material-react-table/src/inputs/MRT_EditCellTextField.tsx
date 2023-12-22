import {
  type ChangeEvent,
  type FocusEvent,
  type KeyboardEvent,
  useState,
} from 'react';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { type TextFieldProps } from '@mui/material/TextField';
import { getValueAndLabel, parseFromValuesOrFunc } from '../column.utils';
import {
  type MRT_Cell,
  type MRT_RowData,
  type MRT_TableInstance,
} from '../types';

interface Props<TData extends MRT_RowData> extends TextFieldProps<'standard'> {
  cell: MRT_Cell<TData>;
  table: MRT_TableInstance<TData>;
}

export const MRT_EditCellTextField = <TData extends MRT_RowData>({
  cell,
  table,
  ...rest
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
    ...rest,
  };

  const saveInputValueToRowCache = (newValue: string) => {
    //@ts-ignore
    row._valuesCache[column.id] = newValue;
    if (isCreating) {
      setCreatingRow(row);
    } else if (isEditing) {
      setEditingRow(row);
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
          ? columnDef.header
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
      size="small"
      value={value}
      variant="standard"
      {...textFieldProps}
      InputProps={{
        ...(textFieldProps.variant !== 'outlined'
          ? { disableUnderline: editDisplayMode === 'table' }
          : {}),
        ...textFieldProps.InputProps,
        sx: (theme) => ({
          mb: 0,
          ...(parseFromValuesOrFunc(
            textFieldProps?.InputProps?.sx,
            theme,
          ) as any),
        }),
      }}
      inputProps={{
        autoComplete: 'new-password', // disable autocomplete and autofill
        ...textFieldProps.inputProps,
      }}
      onBlur={handleBlur}
      onChange={handleChange}
      onClick={(e) => {
        e.stopPropagation();
        textFieldProps?.onClick?.(e);
      }}
      onKeyDown={handleEnterKeyDown}
    >
      {textFieldProps.children ??
        columnDef?.editSelectOptions?.map((option) => {
          const { label, value } = getValueAndLabel(option);
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
              {label}
            </MenuItem>
          );
        })}
    </TextField>
  );
};
