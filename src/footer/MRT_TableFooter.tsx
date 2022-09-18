import React, { FC } from 'react';
import { lighten, TableFooter } from '@mui/material';
import { MRT_TableFooterRow } from './MRT_TableFooterRow';
import type { MRT_TableInstance } from '..';

interface Props {
  table: MRT_TableInstance;
}

export const MRT_TableFooter: FC<Props> = ({ table }) => {
  const {
    getFooterGroups,
    getState,
    options: { enableStickyFooter, muiTableFooterProps },
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
        opacity: stickFooter ? 0.97 : undefined,
        outline: stickFooter
          ? theme.palette.mode === 'light'
            ? `1px solid ${theme.palette.grey[300]}`
            : `1px solid ${theme.palette.grey[700]}`
          : undefined,
        position: stickFooter ? 'sticky' : undefined,
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
        />
      ))}
    </TableFooter>
  );
};
