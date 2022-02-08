import React, { ChangeEvent, FC } from 'react';
import { TextField } from '@mui/material';
import { Cell } from 'react-table';
import { useMaterialReactTable } from '../useMaterialReactTable';

interface Props {
  cell: Cell;
}

export const MRT_EditCellTextField: FC<Props> = ({ cell }) => {
  const {
    currentEditingRow,
    localization,
    muiTableBodyCellEditTextFieldProps,
    setCurrentEditingRow,
  } = useMaterialReactTable();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (currentEditingRow) {
      cell.row.values[cell.column.id] = event.target.value;
      setCurrentEditingRow({
        ...currentEditingRow,
      });
    }
    cell.column.onCellEditChange?.(event, cell);
  };

  const textFieldProps = {
    ...muiTableBodyCellEditTextFieldProps,
    ...cell.column.muiTableBodyCellEditTextFieldProps,
    style: {
      //@ts-ignore
      ...muiTableBodyCellEditTextFieldProps?.style,
      //@ts-ignore
      ...cell.column.muiTableBodyCellEditTextFieldProps?.style,
    },
  };

  if (cell.column.editable && cell.column.Edit) {
    return <>{cell.column.Edit({ ...textFieldProps, cell })}</>;
  }

  return (
    <TextField
      margin="dense"
      onChange={handleChange}
      onClick={(e) => e.stopPropagation()}
      placeholder={localization?.filterTextFieldPlaceholder}
      value={currentEditingRow?.values?.[cell.column.id]}
      variant="standard"
      {...textFieldProps}
    />
  );
};
