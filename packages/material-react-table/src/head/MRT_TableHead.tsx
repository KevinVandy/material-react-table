import { type VirtualItem } from '@tanstack/react-virtual';
import TableHead, { type TableHeadProps } from '@mui/material/TableHead';
import { MRT_TableHeadRow } from './MRT_TableHeadRow';
import { parseFromValuesOrFunc } from '../column.utils';
import { MRT_ToolbarAlertBanner } from '../toolbar';
import { type MRT_RowData, type MRT_TableInstance } from '../types';

interface Props<TData extends MRT_RowData> extends TableHeadProps {
  table: MRT_TableInstance<TData>;
  virtualColumns?: VirtualItem[];
  virtualPaddingLeft?: number;
  virtualPaddingRight?: number;
}

export const MRT_TableHead = <TData extends MRT_RowData>({
  table,
  virtualColumns,
  virtualPaddingLeft,
  virtualPaddingRight,
  ...rest
}: Props<TData>) => {
  const {
    getHeaderGroups,
    getSelectedRowModel,
    getState,
    options: {
      enableStickyHeader,
      layoutMode,
      muiTableHeadProps,
      positionToolbarAlertBanner,
    },
    refs: { tableHeadRef },
  } = table;
  const { isFullScreen, showAlertBanner } = getState();

  const tableHeadProps = {
    ...parseFromValuesOrFunc(muiTableHeadProps, { table }),
    ...rest,
  };

  const stickyHeader = enableStickyHeader || isFullScreen;

  return (
    <TableHead
      {...tableHeadProps}
      ref={(ref: HTMLTableSectionElement) => {
        tableHeadRef.current = ref;
        if (tableHeadProps?.ref) {
          // @ts-ignore
          tableHeadProps.ref.current = ref;
        }
      }}
      sx={(theme) => ({
        display: layoutMode?.startsWith('grid') ? 'grid' : undefined,
        opacity: 0.97,
        position: stickyHeader ? 'sticky' : 'relative',
        top: stickyHeader && layoutMode?.startsWith('grid') ? 0 : undefined,
        zIndex: stickyHeader ? 2 : undefined,
        ...(parseFromValuesOrFunc(tableHeadProps?.sx, theme) as any),
      })}
    >
      {positionToolbarAlertBanner === 'head-overlay' &&
      (showAlertBanner || getSelectedRowModel().rows.length > 0) ? (
        <tr
          style={{
            display: layoutMode?.startsWith('grid') ? 'grid' : undefined,
          }}
        >
          <th
            colSpan={table.getVisibleLeafColumns().length}
            style={{
              display: layoutMode?.startsWith('grid') ? 'grid' : undefined,
              padding: 0,
            }}
          >
            <MRT_ToolbarAlertBanner table={table} />
          </th>
        </tr>
      ) : (
        getHeaderGroups().map((headerGroup) => (
          <MRT_TableHeadRow
            headerGroup={headerGroup as any}
            key={headerGroup.id}
            table={table}
            virtualColumns={virtualColumns}
            virtualPaddingLeft={virtualPaddingLeft}
            virtualPaddingRight={virtualPaddingRight}
          />
        ))
      )}
    </TableHead>
  );
};
