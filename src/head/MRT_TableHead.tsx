import React, { FC } from 'react';
import { TableHead } from '@mui/material';
import { MRT_TableHeadRow } from './MRT_TableHeadRow';
import type { MRT_HeaderGroup, MRT_TableInstance } from '..';

interface Props {
  pinned: 'left' | 'center' | 'right' | 'none';
  tableInstance: MRT_TableInstance;
}

export const MRT_TableHead: FC<Props> = ({ pinned, tableInstance }) => {
  const {
    getCenterHeaderGroups,
    getHeaderGroups,
    getLeftHeaderGroups,
    getRightHeaderGroups,
    options: { muiTableHeadProps },
  } = tableInstance;

  const tableHeadProps =
    muiTableHeadProps instanceof Function
      ? muiTableHeadProps(tableInstance)
      : muiTableHeadProps;

  const getHeaderGroupsMap = {
    center: getCenterHeaderGroups,
    left: getLeftHeaderGroups,
    none: getHeaderGroups,
    right: getRightHeaderGroups,
  };

  return (
    <TableHead {...tableHeadProps}>
      {getHeaderGroupsMap[pinned]().map((headerGroup) => (
        <MRT_TableHeadRow
          headerGroup={headerGroup as MRT_HeaderGroup}
          key={headerGroup.getHeaderGroupProps().key}
          tableInstance={tableInstance}
        />
      ))}
    </TableHead>
  );
};
