import React, { FC } from 'react';
import { TableBody } from '@mui/material';
import { MuiTableBodyRow } from './MuiTableBodyRow';
import { useReactTableMui } from './useReactTableMui';

interface Props {}

export const MuiTableBody: FC<Props> = ({}) => {
  const { reactTable } = useReactTableMui();
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
