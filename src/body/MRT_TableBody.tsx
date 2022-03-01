import React, { FC } from 'react';
import { TableBody } from '@mui/material';
import { MRT_TableBodyRow } from './MRT_TableBodyRow';
import { useMRT } from '../useMRT';
import { MRT_Row } from '..';

interface Props {}

export const MRT_TableBody: FC<Props> = () => {
  const { tableInstance, muiTableBodyProps, manualPagination } = useMRT();

  const rows = manualPagination ? tableInstance.rows : tableInstance.page;

  const tableBodyProps = {
    ...muiTableBodyProps,
    ...tableInstance.getTableBodyProps(),
    style: {
      ...tableInstance.getTableBodyProps().style,
      ...muiTableBodyProps?.style,
    },
  };

  return (
    <TableBody
      {...tableBodyProps}
      sx={{ overflowY: 'hidden', ...tableBodyProps?.sx }}
    >
      {rows.map((row: MRT_Row) => {
        tableInstance.prepareRow(row);
        return <MRT_TableBodyRow key={row.getRowProps().key} row={row} />;
      })}
    </TableBody>
  );
};
