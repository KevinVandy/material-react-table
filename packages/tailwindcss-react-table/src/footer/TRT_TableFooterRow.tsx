import React from 'react';
import TableRow from '@mui/material/TableRow';
import { lighten } from '@mui/material/styles';
import { TRT_TableFooterCell } from './TRT_TableFooterCell';
import type { VirtualItem } from '@tanstack/react-virtual';
import type {
  TRT_Header,
  TRT_HeaderGroup,
  TRT_TableInstance,
} from '../TailwindCSSReactTable.d';

interface Props {
  footerGroup: TRT_HeaderGroup;
  table: TRT_TableInstance;
  virtualColumns?: VirtualItem[];
  virtualPaddingLeft?: number;
  virtualPaddingRight?: number;
}

export const TRT_TableFooterRow = ({
  footerGroup,
  table,
  virtualColumns,
  virtualPaddingLeft,
  virtualPaddingRight,
}: Props) => {
  const {
    options: { layoutMode, tableFooterRowProps },
  } = table;

  // if no content in row, skip row
  if (
    !footerGroup.headers?.some(
      (header) =>
        (typeof header.column.columnDef.footer === 'string' &&
          !!header.column.columnDef.footer) ||
        header.column.columnDef.Footer,
    )
  )
    return null;

  const tableRowProps =
    tableFooterRowProps instanceof Function
      ? tableFooterRowProps({ footerGroup, table })
      : tableFooterRowProps;

  return (
    <TableRow
      {...tableRowProps}
      sx={(theme) => ({
        backgroundColor: lighten(theme.palette.background.default, 0.04),
        display: layoutMode === 'grid' ? 'flex' : 'table-row',
        width: '100%',
        ...(tableRowProps?.sx instanceof Function
          ? tableRowProps?.sx(theme)
          : (tableRowProps?.sx as any)),
      })}
    >
      {virtualPaddingLeft ? (
        <th style={{ display: 'flex', width: virtualPaddingLeft }} />
      ) : null}
      {(virtualColumns ?? footerGroup.headers).map((footerOrVirtualFooter) => {
        const footer = virtualColumns
          ? footerGroup.headers[footerOrVirtualFooter.index]
          : (footerOrVirtualFooter as TRT_Header);

        return (
          <TRT_TableFooterCell footer={footer} key={footer.id} table={table} />
        );
      })}
      {virtualPaddingRight ? (
        <th style={{ display: 'flex', width: virtualPaddingRight }} />
      ) : null}
    </TableRow>
  );
};
