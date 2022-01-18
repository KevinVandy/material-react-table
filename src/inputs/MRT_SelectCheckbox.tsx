import React, { ChangeEvent, FC } from 'react';
import { Checkbox, TableCell } from '@mui/material';
import { Row } from 'react-table';
import { useMaterialReactTable } from '../useMaterialReactTable';

interface Props {
  row: Row;
}

export const MRT_SelectCheckbox: FC<Props> = ({ row }) => {
  const { tableInstance, onRowSelectChange } = useMaterialReactTable();

  const onSelectChange = (event: ChangeEvent) => {
    row.getToggleRowSelectedProps()?.onChange?.(event);
    onRowSelectChange?.(event, row.state, tableInstance.selectedFlatRows);
  };

  return (
    <TableCell style={{ width: '2rem' }}>
      <Checkbox
        {...row.getToggleRowSelectedProps()}
        onChange={onSelectChange}
      />
    </TableCell>
  );
};
