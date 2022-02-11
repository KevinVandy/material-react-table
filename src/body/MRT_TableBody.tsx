import React, { FC } from 'react';
import { styled, TableBody as MuiTableBody } from '@mui/material';
import { MRT_TableBodyRow } from './MRT_TableBodyRow';
import { useMRT } from '../useMRT';

const TableBody = styled(MuiTableBody)({
  overflowY: 'hidden',
});

interface Props {}

export const MRT_TableBody: FC<Props> = () => {
  const { tableInstance, muiTableBodyProps, manualPagination } = useMRT();

  const rows = manualPagination ? tableInstance.rows : tableInstance.page;

  const tableBodyProps = {
    ...muiTableBodyProps,
    ...tableInstance.getTableBodyProps(),
    style: {
      ...tableInstance.getTableBodyProps().style,
      ...(muiTableBodyProps?.style ?? {}),
    },
  };

  return (
    <TableBody {...tableBodyProps}>
      {rows.map((row) => {
        tableInstance.prepareRow(row);
        return <MRT_TableBodyRow key={row.getRowProps().key} row={row} />;
      })}
    </TableBody>
  );
};
