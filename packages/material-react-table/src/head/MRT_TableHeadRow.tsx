import { type VirtualItem } from '@tanstack/react-virtual';
import TableRow from '@mui/material/TableRow';
import { alpha, lighten } from '@mui/material/styles';
import { MRT_TableHeadCell } from './MRT_TableHeadCell';
import { parseFromValuesOrFunc } from '../column.utils';
import {
  type MRT_Header,
  type MRT_HeaderGroup,
  type MRT_TableInstance,
} from '../types';

interface Props<TData extends Record<string, any>> {
  headerGroup: MRT_HeaderGroup<TData>;
  table: MRT_TableInstance<TData>;
  virtualColumns?: VirtualItem[];
  virtualPaddingLeft?: number;
  virtualPaddingRight?: number;
}

export const MRT_TableHeadRow = <TData extends Record<string, any>>({
  headerGroup,
  table,
  virtualColumns,
  virtualPaddingLeft,
  virtualPaddingRight,
}: Props<TData>) => {
  const {
    options: { layoutMode, muiTableHeadRowProps },
  } = table;

  const tableRowProps = parseFromValuesOrFunc(muiTableHeadRowProps, {
    headerGroup,
    table,
  });

  return (
    <TableRow
      {...tableRowProps}
      sx={(theme) => ({
        backgroundColor: lighten(theme.palette.background.default, 0.04),
        boxShadow: `4px 0 8px ${alpha(theme.palette.common.black, 0.1)}`,
        display: layoutMode === 'grid' ? 'flex' : 'table-row',
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

        return (
          <MRT_TableHeadCell header={header} key={header.id} table={table} />
        );
      })}
      {virtualPaddingRight ? (
        <th style={{ display: 'flex', width: virtualPaddingRight }} />
      ) : null}
    </TableRow>
  );
};
