import React, { FC } from 'react';
import { TableCell } from '@mui/material';
import { Cell } from 'react-table';
import { useMaterialReactTable } from '../useMaterialReactTable';

interface Props {
  cell: Cell;
}

export const MRT_TableBodyCell: FC<Props> = ({ cell }) => {
  const { tableInstance, OverrideTableBodyCellComponent } =
    useMaterialReactTable();

  if (OverrideTableBodyCellComponent) {
    return <>{OverrideTableBodyCellComponent(cell, tableInstance)}</>;
  }

  return (
    <TableCell variant="body" {...cell.getCellProps()}>
      {cell.render('Cell')}
    </TableCell>
  );
};
