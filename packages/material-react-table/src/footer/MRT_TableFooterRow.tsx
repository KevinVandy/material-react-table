import TableRow, { type TableRowProps } from '@mui/material/TableRow';
import { MRT_TableFooterCell } from './MRT_TableFooterCell';
import { parseFromValuesOrFunc } from '../column.utils';
import { getMRTTheme } from '../style.utils';
import {
  type MRT_ColumnVirtualizer,
  type MRT_Header,
  type MRT_HeaderGroup,
  type MRT_RowData,
  type MRT_TableInstance,
} from '../types';

interface Props<TData extends MRT_RowData> extends TableRowProps {
  columnVirtualizer?: MRT_ColumnVirtualizer;
  footerGroup: MRT_HeaderGroup<TData>;
  table: MRT_TableInstance<TData>;
}

export const MRT_TableFooterRow = <TData extends MRT_RowData>({
  columnVirtualizer,
  footerGroup,
  table,
  ...rest
}: Props<TData>) => {
  const {
    options: { layoutMode, muiTableFooterRowProps },
  } = table;

  const { virtualColumns, virtualPaddingLeft, virtualPaddingRight } =
    columnVirtualizer ?? {};

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

  const tableRowProps = {
    ...parseFromValuesOrFunc(muiTableFooterRowProps, {
      footerGroup,
      table,
    }),
    ...rest,
  };

  return (
    <TableRow
      {...tableRowProps}
      sx={(theme) => ({
        backgroundColor: getMRTTheme(table, theme).baseBackgroundColor,
        display: layoutMode?.startsWith('grid') ? 'flex' : undefined,
        width: '100%',
        ...(parseFromValuesOrFunc(tableRowProps?.sx, theme) as any),
      })}
    >
      {virtualPaddingLeft ? (
        <th style={{ display: 'flex', width: virtualPaddingLeft }} />
      ) : null}
      {(virtualColumns ?? footerGroup.headers).map((footerOrVirtualFooter) => {
        const footer = virtualColumns
          ? footerGroup.headers[footerOrVirtualFooter.index]
          : (footerOrVirtualFooter as MRT_Header<TData>);

        return footer ? (
          <MRT_TableFooterCell footer={footer} key={footer.id} table={table} />
        ) : null;
      })}
      {virtualPaddingRight ? (
        <th style={{ display: 'flex', width: virtualPaddingRight }} />
      ) : null}
    </TableRow>
  );
};
