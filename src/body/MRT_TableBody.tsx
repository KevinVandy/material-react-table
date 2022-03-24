import React, { FC } from 'react';
import { TableBody } from '@mui/material';
import { MRT_TableBodyRow } from './MRT_TableBodyRow';
import { useMRT } from '../useMRT';

interface Props {}

export const MRT_TableBody: FC<Props> = () => {
  const { tableInstance, muiTableBodyProps, manualPagination } = useMRT();

  const rows = tableInstance.getRows();

  const mTableBodyProps =
    muiTableBodyProps instanceof Function
      ? muiTableBodyProps(tableInstance)
      : muiTableBodyProps;

  const tableBodyProps = {
    ...tableInstance.getTableBodyProps(),
    ...mTableBodyProps,
  };

  return (
    <TableBody
      {...tableBodyProps}
      sx={{
        ...tableBodyProps?.sx,
      }}
    >
      {rows.map((row) => {
        return <MRT_TableBodyRow key={row.getRowProps().key} row={row} />;
      })}
    </TableBody>
  );
};
