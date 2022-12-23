import React, { FC } from 'react';
import TableFooter from '@mui/material/TableFooter';
import { lighten } from '@mui/material/styles';
import { MRT_TableFooterRow } from './MRT_TableFooterRow';
import type { VirtualItem } from '@tanstack/react-virtual';
import type { MRT_TableInstance } from '..';

interface Props {
  table: MRT_TableInstance;
  virtualColumns?: VirtualItem[];
  virtualPaddingLeft?: number;
  virtualPaddingRight?: number;
}

export const MRT_TableFooter: FC<Props> = ({
  table,
  virtualColumns,
  virtualPaddingLeft,
  virtualPaddingRight,
}) => {
  const {
    getFooterGroups,
    getState,
    options: { enableStickyFooter, layoutMode, muiTableFooterProps },
  } = table;
  const { isFullScreen } = getState();

  const tableFooterProps =
    muiTableFooterProps instanceof Function
      ? muiTableFooterProps({ table })
      : muiTableFooterProps;

  const stickFooter =
    (isFullScreen || enableStickyFooter) && enableStickyFooter !== false;

  return (
    <TableFooter
      {...tableFooterProps}
      sx={(theme) => ({
        backgroundColor: lighten(theme.palette.background.default, 0.06),
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
