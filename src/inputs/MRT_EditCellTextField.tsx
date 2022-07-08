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
  table: MRT_TableInstance;
}

export const MRT_EditCellTextField: FC<Props> = ({ cell, table }) => {
  const {
    getState,
    options: {
      tableId,
      enableEditing,
      muiTableBodyCellEditTextFieldProps,
      onCellEditBlur,
      onCellEditChange,
    },
    setCurrentEditingCell,
    setCurrentEditingRow,
  } = table;
  const { column, row } = cell;
  const { columnDef } = column;

  const [value, setValue] = useState(cell.getValue<string>());

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    columnDef.onCellEditChange?.({ event, cell, table });
    onCellEditChange?.({ event, cell, table });
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    if (getState().currentEditingRow) {
      if (!row._valuesCache) row._valuesCache = {};
      (row._valuesCache as Record<string, any>)[column.id] = value;
      setCurrentEditingRow({ ...getState().currentEditingRow } as MRT_Row);
    }
    setCurrentEditingCell(null);
    columnDef.onCellEditBlur?.({ event, cell, table });
    onCellEditBlur?.({ event, cell, table });
  };

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

  const textFieldProps = {
    ...mTableBodyCellEditTextFieldProps,
    ...mcTableBodyCellEditTextFieldProps,
  };

  if (enableEditing && columnDef.enableEditing !== false && columnDef.Edit) {
    return <>{columnDef.Edit?.({ cell, table })}</>;
  }

  return (
    <TextField
      id={`mrt-${tableId}-edit-cell-text-field-${cell.id}`}
      margin="dense"
      onBlur={handleBlur}
      onChange={handleChange}
      onClick={(e: MouseEvent<HTMLInputElement>) => e.stopPropagation()}
      placeholder={columnDef.header}
      value={value}
      variant="standard"
      {...textFieldProps}
    />
  );
};
