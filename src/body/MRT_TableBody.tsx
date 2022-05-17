import React, { FC } from 'react';
import { TableBody } from '@mui/material';
import { MRT_TableBodyRow } from './MRT_TableBodyRow';
import { MRT_TableInstance } from '..';

interface Props {
  tableInstance: MRT_TableInstance;
}

export const MRT_TableBody: FC<Props> = ({ tableInstance }) => {
  const {
    getPaginationRowModel,
    getPrePaginationRowModel,
    options: { enablePagination, muiTableBodyProps },
  } = tableInstance;

  const rows = enablePagination
    ? getPaginationRowModel().rows
    : getPrePaginationRowModel().rows;

  const tableBodyProps =
    muiTableBodyProps instanceof Function
      ? muiTableBodyProps({ tableInstance })
      : muiTableBodyProps;

  return (
    <TableBody {...tableBodyProps}>
      {rows.map((row) => (
        <MRT_TableBodyRow
          key={row.id}
          row={row}
          tableInstance={tableInstance}
        />
      ))}
    </TableBody>
  );
};
