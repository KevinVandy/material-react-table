import React, { ChangeEvent, FC } from 'react';
import { Checkbox, TableCell } from '@mui/material';
import { Row } from 'react-table';
import { useMaterialReactTable } from '../useMaterialReactTable';

interface Props {
  row: Row<object>;
}

export const MRT_SelectCheckbox: FC<Props> = ({ row }) => {
  const {onRowSelectChange} = useMaterialReactTable()

  const onSelectChange = (event: ChangeEvent) => {
    row.getToggleRowSelectedProps()?.onChange?.(event);
    onRowSelectChange?.(event, row.state);
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
