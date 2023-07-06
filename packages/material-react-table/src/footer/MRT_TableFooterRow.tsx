import TableRow from '@mui/material/TableRow';
import { lighten } from '@mui/material/styles';
import { MRT_TableFooterCell } from './MRT_TableFooterCell';
import { type VirtualItem } from '@tanstack/react-virtual';
import {
  type MRT_Header,
  type MRT_HeaderGroup,
  type MRT_TableInstance,
} from '../types';

interface Props<TData extends Record<string, any>> {
  footerGroup: MRT_HeaderGroup<TData>;
  table: MRT_TableInstance<TData>;
  virtualColumns?: VirtualItem[];
  virtualPaddingLeft?: number;
  virtualPaddingRight?: number;
}

export const MRT_TableFooterRow = <TData extends Record<string, any>>({
  footerGroup,
  table,
  virtualColumns,
  virtualPaddingLeft,
  virtualPaddingRight,
}: Props<TData>) => {
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
          : (footerOrVirtualFooter as MRT_Header<TData>);

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
