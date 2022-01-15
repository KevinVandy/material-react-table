import React, { FC } from 'react';
import { TableHead } from '@mui/material';
import { MuiTableHeadRow } from './MuiTableHeadRow';
import { useReactTableMui } from './useReactTableMui';

interface Props {}

export const MuiTableHead: FC<Props> = () => {
  const { tableInstance } = useReactTableMui();

  return (
    <TableHead>
      {tableInstance.headerGroups.map((headerGroup, index) => (
        <MuiTableHeadRow
          key={`${index}-${headerGroup.id}`}
          headerGroup={headerGroup}
        />
      ))}
    </TableHead>
  );
};
