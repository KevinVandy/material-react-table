import React, { FC } from 'react';
import { TableHead } from '@mui/material';
import { RTM_TableHeadRow } from './RTM_TableHeadRow';
import { useReactTableMui } from './useReactTableMui';

interface Props {}

export const RTM_TableHead: FC<Props> = () => {
  const { tableInstance, tableHeadProps } = useReactTableMui();

  return (
    <TableHead {...tableHeadProps}>
      {tableInstance.headerGroups.map((headerGroup, index) => (
        <RTM_TableHeadRow
          key={`${index}-${headerGroup.id}`}
          headerGroup={headerGroup}
        />
      ))}
    </TableHead>
  );
};
