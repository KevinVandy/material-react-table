import React, { FC } from 'react';
import { TableRow } from '@mui/material';
import { HeaderGroup, TableInstance } from 'react-table';
import { MuiTableHeadCell } from './MuiTableHeadCell';

interface Props {
  // reactTable: TableInstance<object>;
  headerGroup: HeaderGroup<object>;
}

export const MuiTableHeadRow: FC<Props> = ({ headerGroup }) => {
  return (
    <TableRow {...headerGroup.getHeaderGroupProps()}>
      {headerGroup.headers.map((column) => (
        <MuiTableHeadCell  column={column} />
      ))}
    </TableRow>
  );
};
