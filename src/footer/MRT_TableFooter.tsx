import React, { FC } from 'react';
import { TableFooter } from '@mui/material';
import { MRT_TableFooterRow } from './MRT_TableFooterRow';
import type { MRT_TableInstance } from '..';

interface Props {
  instance: MRT_TableInstance;
}

export const MRT_TableFooter: FC<Props> = ({ instance }) => {
  const {
    getFooterGroups,

    options: { muiTableFooterProps },
  } = instance;

  const tableFooterProps =
    muiTableFooterProps instanceof Function
      ? muiTableFooterProps({ instance })
      : muiTableFooterProps;

  return (
    <TableFooter {...tableFooterProps}>
      {getFooterGroups().map((footerGroup) => (
        <MRT_TableFooterRow
          footerGroup={footerGroup as any}
          key={footerGroup.id}
          instance={instance}
        />
      ))}
    </TableFooter>
  );
};
