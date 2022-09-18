import React, { FC } from 'react';
import { TableHead } from '@mui/material';
import { MRT_TableHeadRow } from './MRT_TableHeadRow';
import type { MRT_TableInstance } from '..';

interface Props {
  table: MRT_TableInstance;
}

export const MRT_TableHead: FC<Props> = ({ table }) => {
  const {
    getHeaderGroups,
    getState,
    options: { enableStickyHeader, muiTableHeadProps, enableRowVirtualization },
  } = table;
  const { isFullScreen } = getState();

  const tableHeadProps =
    muiTableHeadProps instanceof Function
      ? muiTableHeadProps({ table })
      : muiTableHeadProps;

  const stickyHeader =
    enableStickyHeader || enableRowVirtualization || isFullScreen;

  return (
    <TableHead
      {...tableHeadProps}
      sx={(theme) => ({
        opacity: 0.97,
        position: stickyHeader ? 'sticky' : undefined,
        zIndex: stickyHeader ? 2 : undefined,
        ...(tableHeadProps?.sx instanceof Function
          ? tableHeadProps?.sx(theme)
          : (tableHeadProps?.sx as any)),
      })}
    >
      {getHeaderGroups().map((headerGroup) => (
        <MRT_TableHeadRow
          headerGroup={headerGroup as any}
          key={headerGroup.id}
          table={table}
        />
      ))}
    </TableHead>
  );
};
