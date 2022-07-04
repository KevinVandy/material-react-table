import React, { FC } from 'react';
import { TableFooter } from '@mui/material';
import { MRT_TableFooterRow } from './MRT_TableFooterRow';
import type { MRT_TableInstance } from '..';

interface Props {
  table: MRT_TableInstance;
}

export const MRT_TableFooter: FC<Props> = ({ table }) => {
  const {
    getFooterGroups,
    options: { muiTableFooterProps },
  } = table;

  const tableFooterProps =
    muiTableFooterProps instanceof Function
      ? muiTableFooterProps({ table })
      : muiTableFooterProps;

  return (
    <TableFooter {...tableFooterProps}>
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
