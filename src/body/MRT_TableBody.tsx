import React, { FC } from 'react';
import { TableBody } from '@mui/material';
import { MRT_TableBodyRow } from './MRT_TableBodyRow';
import { useMaterialReactTable } from '../useMaterialReactTable';

interface Props {}

export const MRT_TableBody: FC<Props> = () => {
  const { tableInstance, enablePagination, OverrideTableBodyComponent } = useMaterialReactTable();

  if (OverrideTableBodyComponent) {
    return <>{OverrideTableBodyComponent(tableInstance)}</>;
  }

  const rows = enablePagination ? tableInstance.page : tableInstance.rows;

  return (
    <TableBody {...tableInstance.getTableBodyProps()}>
      {rows.map((row, index) => {
        tableInstance.prepareRow(row);
        return <MRT_TableBodyRow key={`${index}-${row.id}`} row={row} />;
      })}
    </TableBody>
  );
};
