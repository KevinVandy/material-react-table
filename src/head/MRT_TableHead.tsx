import React, { FC } from 'react';
import { TableHead } from '@mui/material';
import { MRT_TableHeadRow } from './MRT_TableHeadRow';
import { useMRT } from '../useMRT';
import type { MRT_HeaderGroup } from '..';

interface Props {
  pinned: 'left' | 'center' | 'right' | 'none';
}

export const MRT_TableHead: FC<Props> = ({ pinned }) => {
  const {
    muiTableHeadProps,
    tableInstance,
    tableInstance: {
      getCenterHeaderGroups,
      getHeaderGroups,
      getLeftHeaderGroups,
      getRightHeaderGroups,
    },
  } = useMRT();

  const getHeaderGroupsMap = {
    center: getCenterHeaderGroups,
    left: getLeftHeaderGroups,
    none: getHeaderGroups,
    right: getRightHeaderGroups,
  };

  const tableHeadProps =
    muiTableHeadProps instanceof Function
      ? muiTableHeadProps(tableInstance)
      : muiTableHeadProps;

  return (
    <TableHead {...tableHeadProps}>
      {getHeaderGroupsMap[pinned]().map((headerGroup) => (
        <MRT_TableHeadRow
          key={headerGroup.getHeaderGroupProps().key}
          headerGroup={headerGroup as MRT_HeaderGroup}
        />
      ))}
    </TableHead>
  );
};
