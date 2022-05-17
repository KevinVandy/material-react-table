import React, { FC } from 'react';
import { TableFooter } from '@mui/material';
import { MRT_TableFooterRow } from './MRT_TableFooterRow';
import type { MRT_TableInstance } from '..';

interface Props {
  tableInstance: MRT_TableInstance;
}

export const MRT_TableFooter: FC<Props> = ({ tableInstance }) => {
  const {
    getFooterGroups,

    options: { muiTableFooterProps },
  } = tableInstance;

  const tableFooterProps =
    muiTableFooterProps instanceof Function
      ? muiTableFooterProps({ tableInstance })
      : muiTableFooterProps;

  return (
    <TableFooter {...tableFooterProps}>
      {getFooterGroups().map((footerGroup) => (
        <MRT_TableFooterRow
          footerGroup={footerGroup as any}
          key={footerGroup.id}
          tableInstance={tableInstance}
        />
      ))}
    </TableFooter>
  );
};
