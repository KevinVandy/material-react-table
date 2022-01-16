import React, { FC } from 'react';
import { TableBody } from '@mui/material';
import { MRT_TableBodyRow } from './MRT_TableBodyRow';
import { useMaterialReactTable } from '../useMaterialReactTable';

interface Props {}

export const MRT_TableBody: FC<Props> = () => {
  const { tableInstance } = useMaterialReactTable();

  return (
    <TableBody {...tableInstance.getTableBodyProps()}>
      {tableInstance.page.map((row, index) => {
        tableInstance.prepareRow(row);
        return <MRT_TableBodyRow key={`${index}-${row.id}`} row={row} />;
      })}
    </TableBody>
  );
};
