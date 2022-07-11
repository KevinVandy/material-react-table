import React, { FC } from 'react';
import { TableHead } from '@mui/material';
import { MRT_TableHeadRow } from './MRT_TableHeadRow';
import type { MRT_TableInstance } from '..';

interface Props {
  table: MRT_TableInstance;
}

export const MRT_TableHead: FC<Props> = ({ table }) => {
  const {
    getHeaderGroups,
    options: { muiTableHeadProps },
  } = table;

  const tableHeadProps =
    muiTableHeadProps instanceof Function
      ? muiTableHeadProps({ table })
      : muiTableHeadProps;

  return (
    <TableHead {...tableHeadProps}>
      {getHeaderGroups().map((headerGroup) => (
        <MRT_TableHeadRow
          headerGroup={headerGroup as any}
          key={headerGroup.id}
          table={table}
        />
      ))}
    </TableHead>
  );
};
