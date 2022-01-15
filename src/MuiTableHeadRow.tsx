import React, { FC } from 'react';
import { TableRow } from '@mui/material';
import { HeaderGroup } from 'react-table';
import { MuiTableHeadCell } from './MuiTableHeadCell';

interface Props {
  headerGroup: HeaderGroup<object>;
}

export const MuiTableHeadRow: FC<Props> = ({ headerGroup }) => {
  return (
    <TableRow {...headerGroup.getHeaderGroupProps()}>
      {headerGroup.headers.map((column, index) => (
        <MuiTableHeadCell key={`${index}-${column.id}`} column={column} />
      ))}
    </TableRow>
  );
};
