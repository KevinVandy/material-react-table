import { TableBody } from '@mui/material';
import React, { FC } from 'react';
import { TableInstance } from 'react-table';
import { MuiTableBodyRow } from './MuiTableBodyRow';

interface Props {
  reactTable: TableInstance<object>;
}

export const MuiTableBody: FC<Props> = ({ reactTable }) => {
  const { getTableBodyProps, rows, prepareRow } = reactTable;

  return (
    <TableBody {...getTableBodyProps()}>
      {rows.map((row) => {
        prepareRow(row);
        return <MuiTableBodyRow key={row.id} row={row} />;
      })}
    </TableBody>
  );
};
