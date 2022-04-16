import React, { FC } from 'react';
import { TableBody } from '@mui/material';
import { MRT_TableBodyRow } from './MRT_TableBodyRow';
import { MRT_TableInstance } from '..';

interface Props {
  pinned: 'left' | 'center' | 'right' | 'none';
  tableInstance: MRT_TableInstance;
}

export const MRT_TableBody: FC<Props> = ({ pinned, tableInstance }) => {
  const {
    getPaginationRowModel,
    getPrePaginationRowModel,
    getTableBodyProps,
    options: { enablePagination, muiTableBodyProps },
  } = tableInstance;

  const rows = enablePagination
    ? getPaginationRowModel().rows
    : getPrePaginationRowModel().rows;

  const mTableBodyProps =
    muiTableBodyProps instanceof Function
      ? muiTableBodyProps({ tableInstance })
      : muiTableBodyProps;

  const tableBodyProps = {
    ...getTableBodyProps(),
    ...mTableBodyProps,
  };

  return (
    <TableBody {...tableBodyProps}>
      {rows.map((row) => (
        <MRT_TableBodyRow
          key={row.getRowProps().key}
          pinned={pinned}
          row={row}
          tableInstance={tableInstance}
        />
      ))}
    </TableBody>
  );
};
