import React, { FC } from 'react';
import { LinearProgress, TableHead } from '@mui/material';
import { MRT_TableHeadRow } from './MRT_TableHeadRow';
import { useMaterialReactTable } from '../useMaterialReactTable';

interface Props {}

export const MRT_TableHead: FC<Props> = () => {
  const { tableInstance, muiTableHeadProps, isFetching } =
    useMaterialReactTable();

  const tableHeadProps =
    muiTableHeadProps instanceof Function
      ? muiTableHeadProps(tableInstance)
      : muiTableHeadProps;

  return (
    <TableHead {...tableHeadProps}>
      {isFetching && <LinearProgress />}
      {tableInstance.headerGroups.map((headerGroup, index) => (
        <MRT_TableHeadRow
          key={`${index}-${headerGroup.id}`}
          headerGroup={headerGroup}
        />
      ))}
    </TableHead>
  );
};
