import React, { FC } from 'react';
import { TableFooter } from '@mui/material';
import { MRT_TableFooterRow } from './MRT_TableFooterRow';
import { useMaterialReactTable } from '../useMaterialReactTable';
import { MRT_TablePagination } from './MRT_TablePagination';

interface Props {}

export const MRT_TableFooter: FC<Props> = () => {
  const {
    enablePagination,
    positionPagination,
    muiTableFooterProps,
    tableInstance,
  } = useMaterialReactTable();

  return (
    <TableFooter {...muiTableFooterProps}>
      {tableInstance.footerGroups.map((footerGroup, index) => (
        <MRT_TableFooterRow
          key={`${index}-${footerGroup.id}`}
          footerGroup={footerGroup}
        />
      ))}
      {enablePagination &&
        ['bottom', 'both'].includes(positionPagination ?? '') && (
          <MRT_TablePagination />
        )}
    </TableFooter>
  );
};
