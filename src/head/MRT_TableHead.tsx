import React, { FC } from 'react';
import { TableHead } from '@mui/material';
import { MRT_TableHeadRow } from './MRT_TableHeadRow';
import { useMRT } from '../useMRT';
import { MRT_HeaderGroup } from '..';

interface Props {}

export const MRT_TableHead: FC<Props> = () => {
  const { tableInstance, muiTableHeadProps } = useMRT();

  const tableHeadProps =
    muiTableHeadProps instanceof Function
      ? muiTableHeadProps(tableInstance)
      : muiTableHeadProps;

  return (
    <TableHead {...tableHeadProps}>
      {tableInstance.headerGroups.map((headerGroup: MRT_HeaderGroup) => (
        <MRT_TableHeadRow
          key={headerGroup.getHeaderGroupProps().key}
          headerGroup={headerGroup}
        />
      ))}
    </TableHead>
  );
};
