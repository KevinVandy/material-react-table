import React from 'react';
import TableHead from '@mui/material/TableHead';
import { TRT_TableHeadRow } from './TRT_TableHeadRow';
import type { VirtualItem } from '@tanstack/react-virtual';
import type { TRT_TableInstance } from '../TailwindCSSReactTable.types';

interface Props {
  table: TRT_TableInstance;
  virtualColumns?: VirtualItem[];
  virtualPaddingLeft?: number;
  virtualPaddingRight?: number;
}

export const TRT_TableHead = ({
  table,
  virtualColumns,
  virtualPaddingLeft,
  virtualPaddingRight,
}: Props) => {
  const {
    getHeaderGroups,
    getState,
    options: { enableStickyHeader, layoutMode },
  } = table;
  const { isFullScreen } = getState();

  let {
    options: { tableHeadProps },
  } = table;
  tableHeadProps =
    tableHeadProps instanceof Function
      ? tableHeadProps({ table })
      : tableHeadProps;

  const stickyHeader = enableStickyHeader || isFullScreen;

  return (
    <TableHead
      {...tableHeadProps}
      sx={(theme) => ({
        display: layoutMode === 'grid' ? 'grid' : 'table-row-group',
        opacity: 0.97,
        position: stickyHeader ? 'sticky' : 'relative',
        top: stickyHeader && layoutMode === 'grid' ? 0 : undefined,
        zIndex: stickyHeader ? 2 : undefined,
        ...(tableHeadProps?.sx instanceof Function
          ? tableHeadProps?.sx(theme)
          : (tableHeadProps?.sx as any)),
      })}
    >
      {getHeaderGroups().map((headerGroup) => (
        <TRT_TableHeadRow
          headerGroup={headerGroup as any}
          key={headerGroup.id}
          table={table}
          virtualColumns={virtualColumns}
          virtualPaddingLeft={virtualPaddingLeft}
          virtualPaddingRight={virtualPaddingRight}
        />
      ))}
    </TableHead>
  );
};
