import React, { FC } from 'react';
import { TableHead } from '@mui/material';
import { MRT_TableHeadRow } from './MRT_TableHeadRow';
import type { MRT_HeaderGroup, MRT_TableInstance } from '..';

interface Props {
  tableInstance: MRT_TableInstance;
}

export const MRT_TableHead: FC<Props> = ({ tableInstance }) => {
  const {
    getHeaderGroups,
    options: { muiTableHeadProps },
  } = tableInstance;

  const tableHeadProps =
    muiTableHeadProps instanceof Function
      ? muiTableHeadProps({ tableInstance })
      : muiTableHeadProps;

  return (
    <TableHead {...tableHeadProps}>
      {getHeaderGroups().map((headerGroup) => (
        <MRT_TableHeadRow
          headerGroup={headerGroup as MRT_HeaderGroup}
          key={headerGroup.getHeaderGroupProps().key}
          tableInstance={tableInstance}
        />
      ))}
    </TableHead>
  );
};
