import TableHead from '@mui/material/TableHead';
import { MRT_TableHeadRow } from './MRT_TableHeadRow';
import { type VirtualItem } from '@tanstack/react-virtual';
import { type MRT_TableInstance } from '../types';
import { parseFromValuesOrFunc } from '../column.utils';

interface Props<TData extends Record<string, any>> {
  table: MRT_TableInstance<TData>;
  virtualColumns?: VirtualItem[];
  virtualPaddingLeft?: number;
  virtualPaddingRight?: number;
}

export const MRT_TableHead = <TData extends Record<string, any>>({
  table,
  virtualColumns,
  virtualPaddingLeft,
  virtualPaddingRight,
}: Props<TData>) => {
  const {
    getHeaderGroups,
    getState,
    options: { enableStickyHeader, layoutMode, muiTableHeadProps },
    refs: { tableHeadRef },
  } = table;
  const { isFullScreen } = getState();

  const tableHeadProps = parseFromValuesOrFunc(muiTableHeadProps, { table });

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
        ...(parseFromValuesOrFunc(tableHeadProps?.sx, theme) as any),
      })}
      ref={(ref: HTMLTableSectionElement) => {
        tableHeadRef.current = ref;
        if (tableHeadProps?.ref) {
          // @ts-ignore
          tableHeadProps.ref.current = ref;
        }
      }}
    >
      {getHeaderGroups().map((headerGroup) => (
        <MRT_TableHeadRow
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
