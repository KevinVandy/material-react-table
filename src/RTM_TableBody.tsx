import React, { FC } from 'react';
import { TableBody } from '@mui/material';
import { RTM_TableBodyRow } from './RTM_TableBodyRow';
import { useReactTableMui } from './useReactTableMui';

interface Props {}

export const RTM_TableBody: FC<Props> = () => {
  const { tableInstance } = useReactTableMui();
  const { getTableBodyProps, rows, prepareRow } = tableInstance;

  return (
    <TableBody {...getTableBodyProps()}>
      {rows.map((row, index) => {
        prepareRow(row);
        return <RTM_TableBodyRow key={`${index}-${row.id}`} row={row} />;
      })}
    </TableBody>
  );
};
