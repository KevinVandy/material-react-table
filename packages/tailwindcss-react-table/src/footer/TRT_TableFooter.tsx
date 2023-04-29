import React from 'react';
import TableFooter from '@mui/material/TableFooter';
import { TRT_TableFooterRow } from './TRT_TableFooterRow';
import type { VirtualItem } from '@tanstack/react-virtual';
import type { TRT_TableInstance } from '../TailwindCSSReactTable.d';

interface Props {
  table: TRT_TableInstance;
  virtualColumns?: VirtualItem[];
  virtualPaddingLeft?: number;
  virtualPaddingRight?: number;
}

export const TRT_TableFooter = ({
  table,
  virtualColumns,
  virtualPaddingLeft,
  virtualPaddingRight,
}: Props) => {
  const {
    getFooterGroups,
    getState,
    options: { enableStickyFooter, layoutMode },
  } = table;
  const { isFullScreen } = getState();

  let {
    options: { tableFooterProps },
  } = table;
  tableFooterProps =
    tableFooterProps instanceof Function
      ? tableFooterProps({ table })
      : tableFooterProps;

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
        ...(tableFooterProps?.sx instanceof Function
          ? tableFooterProps?.sx(theme)
          : (tableFooterProps?.sx as any)),
      })}
    >
      {getFooterGroups().map((footerGroup) => (
        <TRT_TableFooterRow
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
