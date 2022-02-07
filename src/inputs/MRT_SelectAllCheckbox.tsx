import React from 'react';
import { Checkbox, TableCell as MuiTableCell, styled } from '@mui/material';
import { useMaterialReactTable } from '../useMaterialReactTable';

const TableCell = styled(MuiTableCell, {
  shouldForwardProp: (prop) => prop !== 'densePadding',
})<{ densePadding?: boolean }>(({ densePadding }) => ({
  padding: densePadding ? '0' : '0.6rem',
  transition: 'all 0.2s ease-in-out',
}));

export const MRT_SelectAllCheckbox = () => {
  const { tableInstance, disableSelectAll, densePadding, localization } =
    useMaterialReactTable();

  return (
    <TableCell densePadding={densePadding} variant="head">
      {!disableSelectAll ? (
        <Checkbox
          inputProps={{
            'aria-label': localization?.selectAllCheckboxTitle ?? '',
          }}
          {...tableInstance.getToggleAllPageRowsSelectedProps()}
        />
      ) : null}
    </TableCell>
  );
};
