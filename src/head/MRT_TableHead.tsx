import React, { FC } from 'react';
import { TableHead } from '@mui/material';
import { MRT_TableHeadRow } from './MRT_TableHeadRow';
import type { MRT_TableInstance } from '..';

interface Props {
  instance: MRT_TableInstance;
}

export const MRT_TableHead: FC<Props> = ({ instance }) => {
  const {
    getHeaderGroups,
    options: { muiTableHeadProps },
  } = instance;

  const tableHeadProps =
    muiTableHeadProps instanceof Function
      ? muiTableHeadProps({ instance })
      : muiTableHeadProps;

  return (
    <TableHead {...tableHeadProps}>
      {getHeaderGroups().map((headerGroup) => (
        <MRT_TableHeadRow
          headerGroup={headerGroup as any}
          key={headerGroup.id}
          instance={instance}
        />
      ))}
    </TableHead>
  );
};
