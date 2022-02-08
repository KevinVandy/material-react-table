import React, { ChangeEvent, FC, useState } from 'react';
import { TextField } from '@mui/material';
import { Cell } from 'react-table';
import { useMaterialReactTable } from '../useMaterialReactTable';

interface Props {
  cell: Cell;
}

export const MRT_EditCellTextField: FC<Props> = ({ cell }) => {
  const {
    localization,
    currentEditingRow,
    setCurrentEditingRow,
    muiTableBodyCellEditTextFieldProps,
  } = useMaterialReactTable();

  const [error, setError] = useState<boolean | string>(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (currentEditingRow) {
      setCurrentEditingRow({
        ...currentEditingRow,
        values: { ...cell.row.values, [cell.column.id]: event.target.value },
      });
      const err = cell.column.editValidator?.(event.target.value) ?? true;
      setError(err !== true && err);
    }
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
      error={!!error}
      helperText={error}
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
