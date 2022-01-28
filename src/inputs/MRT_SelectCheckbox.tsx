import React, { ChangeEvent, FC } from 'react';
import { Checkbox, TableCell } from '@mui/material';
import { Row } from 'react-table';
import { useMaterialReactTable } from '../useMaterialReactTable';

interface Props {
  row: Row;
}

export const MRT_SelectCheckbox: FC<Props> = ({ row }) => {
  const { tableInstance, onRowSelectChange, densePadding } =
    useMaterialReactTable();

  const onSelectChange = (event: ChangeEvent) => {
    row.getToggleRowSelectedProps()?.onChange?.(event);
    onRowSelectChange?.(event, row, tableInstance.selectedFlatRows);
  };

  return (
    <TableCell
      style={{
        width: '2rem',
        padding: densePadding ? '0' : '0.6rem',
        transition: 'all 0.2s ease-in-out',
      }}
    >
      <Checkbox
        {...row.getToggleRowSelectedProps()}
        onChange={onSelectChange}
      />
    </TableCell>
  );
};
