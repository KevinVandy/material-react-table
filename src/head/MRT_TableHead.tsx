import React, { FC } from 'react';
import { TableHead } from '@mui/material';
import { MRT_TableHeadRow } from './MRT_TableHeadRow';
import { useMRT } from '../useMRT';
import type { MRT_HeaderGroup } from '..';

interface Props {}

export const MRT_TableHead: FC<Props> = () => {
  const {
    idPrefix,
    muiTableHeadProps,
    tableInstance,
    tableInstance: { getHeaderGroups },
  } = useMRT();

  const tableHeadProps =
    muiTableHeadProps instanceof Function
      ? muiTableHeadProps(tableInstance)
      : muiTableHeadProps;

  return (
    <TableHead id={`mrt-${idPrefix}-table-head`} {...tableHeadProps}>
      {getHeaderGroups().map((headerGroup) => (
        <MRT_TableHeadRow
          key={headerGroup.getHeaderGroupProps().key}
          headerGroup={headerGroup as MRT_HeaderGroup}
        />
      ))}
    </TableHead>
  );
};
