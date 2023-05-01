import React from 'react';
import TableRow from '@mui/material/TableRow';
import { alpha, lighten } from '@mui/material/styles';
import { TRT_TableHeadCell } from './TRT_TableHeadCell';
import type { VirtualItem } from '@tanstack/react-virtual';
import type {
  TRT_Header,
  TRT_HeaderGroup,
  TRT_TableInstance,
} from '../TailwindCSSReactTable.types';

interface Props {
  headerGroup: TRT_HeaderGroup;
  table: TRT_TableInstance;
  virtualColumns?: VirtualItem[];
  virtualPaddingLeft?: number;
  virtualPaddingRight?: number;
}

export const TRT_TableHeadRow = ({
  headerGroup,
  table,
  virtualColumns,
  virtualPaddingLeft,
  virtualPaddingRight,
}: Props) => {
  const {
    options: { layoutMode, tableHeadRowProps },
  } = table;

  const tableRowProps =
    tableHeadRowProps instanceof Function
      ? tableHeadRowProps({ headerGroup, table })
      : tableHeadRowProps;

  return (
    <TableRow
      {...tableRowProps}
      sx={(theme) => ({
        backgroundColor: lighten(theme.palette.background.default, 0.04),
        boxShadow: `4px 0 8px ${alpha(theme.palette.common.black, 0.1)}`,
        display: layoutMode === 'grid' ? 'flex' : 'table-row',
        top: 0,
        ...(tableRowProps?.sx instanceof Function
          ? tableRowProps?.sx(theme)
          : (tableRowProps?.sx as any)),
      })}
    >
      {virtualPaddingLeft ? (
        <th style={{ display: 'flex', width: virtualPaddingLeft }} />
      ) : null}
      {(virtualColumns ?? headerGroup.headers).map((headerOrVirtualHeader) => {
        const header = virtualColumns
          ? headerGroup.headers[headerOrVirtualHeader.index]
          : (headerOrVirtualHeader as TRT_Header);

        return (
          <TRT_TableHeadCell header={header} key={header.id} table={table} />
        );
      })}
      {virtualPaddingRight ? (
        <th style={{ display: 'flex', width: virtualPaddingRight }} />
      ) : null}
    </TableRow>
  );
};
