import React, { FC } from 'react';
import { LinearProgress, TableHead } from '@mui/material';
import { MRT_TableHeadRow } from './MRT_TableHeadRow';
import { useMaterialReactTable } from '../useMaterialReactTable';
import { MRT_TablePagination } from '../footer/MRT_TablePagination';

interface Props {}

export const MRT_TableHead: FC<Props> = () => {
  const {
    overrideTableHeadComponent,
    tableInstance,
    tableHeadProps,
    enablePagination,
    isFetching,
    positionPagination,
  } = useMaterialReactTable();

  if (overrideTableHeadComponent) {
    return <>{overrideTableHeadComponent(tableInstance)}</>;
  }

  return (
    <TableHead {...tableHeadProps}>
      {isFetching && <LinearProgress />}
      {enablePagination &&
        ['top', 'both'].includes(positionPagination ?? '') && (
          <MRT_TablePagination />
        )}
      {tableInstance.headerGroups.map((headerGroup, index) => (
        <MRT_TableHeadRow
          key={`${index}-${headerGroup.id}`}
          headerGroup={headerGroup}
        />
      ))}
    </TableHead>
  );
};
