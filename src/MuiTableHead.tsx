import React, { FC } from 'react';
import { TableHead } from '@mui/material';
import { MuiTableHeadRow } from './MuiTableHeadRow';
import { TableInstance } from 'react-table';

interface Props {
  reactTable: TableInstance<object>;
}

export const MuiTableHead: FC<Props> = ({ reactTable }) => {
  const { headerGroups } = reactTable;

  return (
    <TableHead>
      {headerGroups.map((headerGroup) => (
        <MuiTableHeadRow headerGroup={headerGroup} />
      ))}
    </TableHead>
  );
};
