import React, { FC } from 'react';
import { TableBody } from '@mui/material';
import { MRT_TableBodyRow } from './MRT_TableBodyRow';
import { useMRT } from '../useMRT';
import type { MRT_Row } from '..';

interface Props {}

export const MRT_TableBody: FC<Props> = () => {
  const { disablePagination, muiTableBodyProps, tableInstance } = useMRT();

  const rows = disablePagination
    ? tableInstance.getRowModel().rows
    : tableInstance.getPaginationRowModel().rows;

  const mTableBodyProps =
    muiTableBodyProps instanceof Function
      ? muiTableBodyProps(tableInstance)
      : muiTableBodyProps;

  const tableBodyProps = {
    ...tableInstance.getTableBodyProps(),
    ...mTableBodyProps,
  };

  return (
    <TableBody {...tableBodyProps}>
      {rows.map((row) => (
        <MRT_TableBodyRow key={row.getRowProps().key} row={row as MRT_Row} />
      ))}
    </TableBody>
  );
};
