import TableFooter from '@mui/material/TableFooter';
import { MRT_TableFooterRow } from './MRT_TableFooterRow';
import { type VirtualItem } from '@tanstack/react-virtual';
import { type MRT_TableInstance } from '../types';
import { parseFromValuesOrFunc } from '../column.utils';

interface Props<TData extends Record<string, any>> {
  table: MRT_TableInstance<TData>;
  virtualColumns?: VirtualItem[];
  virtualPaddingLeft?: number;
  virtualPaddingRight?: number;
}

export const MRT_TableFooter = <TData extends Record<string, any>>({
  table,
  virtualColumns,
  virtualPaddingLeft,
  virtualPaddingRight,
}: Props<TData>) => {
  const {
    getFooterGroups,
    getState,
    options: { enableStickyFooter, layoutMode, muiTableFooterProps },
    refs: { tableFooterRef },
  } = table;
  const { isFullScreen } = getState();

  const tableFooterProps = parseFromValuesOrFunc(muiTableFooterProps, {
    table,
  });

  const stickFooter =
    (isFullScreen || enableStickyFooter) && enableStickyFooter !== false;

  return (
    <TableFooter
      {...tableFooterProps}
      sx={(theme) => ({
        bottom: stickFooter ? 0 : undefined,
        display: layoutMode === 'grid' ? 'grid' : 'table-row-group',
        opacity: stickFooter ? 0.97 : undefined,
        outline: stickFooter
          ? theme.palette.mode === 'light'
            ? `1px solid ${theme.palette.grey[300]}`
            : `1px solid ${theme.palette.grey[700]}`
          : undefined,
        position: stickFooter ? 'sticky' : undefined,
        zIndex: stickFooter ? 1 : undefined,
        ...(parseFromValuesOrFunc(tableFooterProps?.sx, theme) as any),
      })}
      ref={(ref: HTMLTableSectionElement) => {
        tableFooterRef.current = ref;
        if (tableFooterProps?.ref) {
          // @ts-ignore
          tableFooterProps.ref.current = ref;
        }
      }}
    >
      {getFooterGroups().map((footerGroup) => (
        <MRT_TableFooterRow
          footerGroup={footerGroup as any}
          key={footerGroup.id}
          table={table}
          virtualColumns={virtualColumns}
          virtualPaddingLeft={virtualPaddingLeft}
          virtualPaddingRight={virtualPaddingRight}
        />
      ))}
    </TableFooter>
  );
};
