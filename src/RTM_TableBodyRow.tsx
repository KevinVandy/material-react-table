import React, { FC } from 'react';
import { TableRow } from '@mui/material';
import { Row } from 'react-table';
import { RTM_TableBodyCell } from './RTM_TableBodyCell';

interface Props {
  row: Row<object>;
}

export const RTM_TableBodyRow: FC<Props> = ({ row }) => {
  return (
    <TableRow {...row.getRowProps()}>
      {row.cells.map((cell, index) => (
        <RTM_TableBodyCell key={`${index}-${cell.value}`} cell={cell} />
      ))}
    </TableRow>
  );
};
