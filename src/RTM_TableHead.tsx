import React, { FC } from 'react';
import { TableHead } from '@mui/material';
import { RTM_TableHeadRow } from './RTM_TableHeadRow';
import { useReactTableMui } from './useReactTableMui';
import { RTM_TablePagination } from './RTM_TablePagination';

interface Props {}

export const RTM_TableHead: FC<Props> = () => {
  const { tableInstance, tableHeadProps, options } = useReactTableMui();

  return (
    <TableHead {...tableHeadProps}>
      {['top', 'both'].includes(options.enablePagination.toString()) && (
        <RTM_TablePagination />
      )}
      {tableInstance.headerGroups.map((headerGroup, index) => (
        <RTM_TableHeadRow
          key={`${index}-${headerGroup.id}`}
          headerGroup={headerGroup}
        />
      ))}
    </TableHead>
  );
};
