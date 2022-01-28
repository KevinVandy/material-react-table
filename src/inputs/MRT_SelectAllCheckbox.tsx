import React from 'react';
import { Checkbox, TableCell } from '@mui/material';
import { useMaterialReactTable } from '../useMaterialReactTable';

export const MRT_SelectAllCheckbox = () => {
  const { tableInstance, disableSelectAll, densePadding } =
    useMaterialReactTable();

  return (
    <TableCell
      style={{
        width: '2rem',
        padding: densePadding ? '0' : '0.6rem',
        transition: 'all 0.2s ease-in-out',
      }}
      variant="head"
    >
      {!disableSelectAll ? (
        <Checkbox
          aria-label=""
          {...tableInstance.getToggleAllPageRowsSelectedProps()}
        />
      ) : null}
    </TableCell>
  );
};
