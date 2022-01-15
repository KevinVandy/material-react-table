import React, { FC } from 'react';
import { TableRow } from '@mui/material';
import { Row } from 'react-table';
import { MuiTableBodyCell } from './MuiTableBodyCell';

interface Props {
  row: Row<object>;
}

export const MuiTableBodyRow: FC<Props> = ({ row }) => {
  return (
    <TableRow {...row.getRowProps()}>
      {row.cells.map((cell, index) => (
        <MuiTableBodyCell key={`${index}-${cell.value}`} cell={cell} />
      ))}
    </TableRow>
  );
};
