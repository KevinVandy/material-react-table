import React, { FC } from 'react';
import { TableBody } from '@mui/material';
import { RTM_TableBodyRow } from './RTM_TableBodyRow';
import { useReactTableMui } from './useReactTableMui';

interface Props {}

export const RTM_TableBody: FC<Props> = () => {
  const { tableInstance } = useReactTableMui();

  return (
    <TableBody {...tableInstance.getTableBodyProps()}>
      {tableInstance.page.map((row, index) => {
        tableInstance.prepareRow(row);
        return <RTM_TableBodyRow key={`${index}-${row.id}`} row={row} />;
      })}
    </TableBody>
  );
};
