import React from 'react';
import { Checkbox, TableCell } from '@mui/material';
import { useMaterialReactTable } from '../useMaterialReactTable';

export const MRT_SelectAllCheckbox = () => {
  const { tableInstance, enableSelectAll } = useMaterialReactTable();

  return (
    <TableCell style={{ width: '2rem', padding: '0.5rem' }} variant="head">
      {enableSelectAll ? (
        <Checkbox {...tableInstance.getToggleAllPageRowsSelectedProps()} />
      ) : null}
    </TableCell>
  );
};
