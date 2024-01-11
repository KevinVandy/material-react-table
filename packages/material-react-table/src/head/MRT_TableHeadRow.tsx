import TableRow, { type TableRowProps } from '@mui/material/TableRow';
import { alpha } from '@mui/material/styles';
import { MRT_TableHeadCell } from './MRT_TableHeadCell';
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
  headerGroup: MRT_HeaderGroup<TData>;
  table: MRT_TableInstance<TData>;
}

export const MRT_TableHeadRow = <TData extends MRT_RowData>({
  columnVirtualizer,
  headerGroup,
  table,
  ...rest
}: Props<TData>) => {
  const {
    options: { layoutMode, muiTableHeadRowProps },
  } = table;

  const { virtualColumns, virtualPaddingLeft, virtualPaddingRight } =
    columnVirtualizer ?? {};

  const tableRowProps = {
    ...parseFromValuesOrFunc(muiTableHeadRowProps, {
      headerGroup,
      table,
    }),
    ...rest,
  };

  return (
    <TableRow
      {...tableRowProps}
      sx={(theme) => ({
        backgroundColor: getMRTTheme(table, theme).baseBackgroundColor,
        boxShadow: `4px 0 8px ${alpha(theme.palette.common.black, 0.1)}`,
        display: layoutMode?.startsWith('grid') ? 'flex' : undefined,
        top: 0,
        ...(parseFromValuesOrFunc(tableRowProps?.sx, theme) as any),
      })}
    >
      {virtualPaddingLeft ? (
        <th style={{ display: 'flex', width: virtualPaddingLeft }} />
      ) : null}
      {(virtualColumns ?? headerGroup.headers).map((headerOrVirtualHeader) => {
        const header = virtualColumns
          ? headerGroup.headers[headerOrVirtualHeader.index]
          : (headerOrVirtualHeader as MRT_Header<TData>);

        return header ? (
          <MRT_TableHeadCell header={header} key={header.id} table={table} />
        ) : null;
      })}
      {virtualPaddingRight ? (
        <th style={{ display: 'flex', width: virtualPaddingRight }} />
      ) : null}
    </TableRow>
  );
};
