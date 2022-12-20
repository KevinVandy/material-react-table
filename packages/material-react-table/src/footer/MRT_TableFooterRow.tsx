import React, { FC } from 'react';
import TableRow from '@mui/material/TableRow';
import { MRT_TableFooterCell } from './MRT_TableFooterCell';
import { VirtualItem } from '@tanstack/react-virtual';
import type { MRT_Header, MRT_HeaderGroup, MRT_TableInstance } from '..';

interface Props {
  footerGroup: MRT_HeaderGroup;
  table: MRT_TableInstance;
  virtualColumns?: VirtualItem[];
  virtualPaddingLeft?: number;
  virtualPaddingRight?: number;
}

export const MRT_TableFooterRow: FC<Props> = ({
  footerGroup,
  table,
  virtualColumns,
  virtualPaddingLeft,
  virtualPaddingRight,
}) => {
  const {
    options: { layoutMode, muiTableFooterRowProps },
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
    muiTableFooterRowProps instanceof Function
      ? muiTableFooterRowProps({ footerGroup, table })
      : muiTableFooterRowProps;

  return (
    <TableRow
      {...tableRowProps}
      sx={(theme) => ({
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
          : (footerOrVirtualFooter as MRT_Header);

        return (
          <MRT_TableFooterCell footer={footer} key={footer.id} table={table} />
        );
      })}
      {virtualPaddingRight ? (
        <th style={{ display: 'flex', width: virtualPaddingRight }} />
      ) : null}
    </TableRow>
  );
};
