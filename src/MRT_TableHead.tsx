import React, { FC } from 'react';
import { TableHead } from '@mui/material';
import { MRT_TableHeadRow } from './MRT_TableHeadRow';
import { useMaterialReactTable } from './useMaterialReactTable';
import { MRT_TablePagination } from './MRT_TablePagination';

interface Props {}

export const MRT_TableHead: FC<Props> = () => {
  const { tableInstance, tableHeadProps, options } = useMaterialReactTable();

  return (
    <TableHead {...tableHeadProps}>
      {['top', 'both'].includes(options.enablePagination.toString()) && (
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
