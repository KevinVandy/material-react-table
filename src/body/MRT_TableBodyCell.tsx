import React, { FC, MouseEvent } from 'react';
import { styled, TableCell as MuiTableCell } from '@mui/material';
import { Cell } from 'react-table';
import { useMaterialReactTable } from '../useMaterialReactTable';
import { MRT_EditCellTextField } from '../inputs/MRT_EditCellTextField2';

const TableCell = styled(MuiTableCell, {
  shouldForwardProp: (prop) => prop !== 'densePadding',
})<{ densePadding?: boolean }>(({ densePadding }) => ({
  padding: densePadding ? '0.5rem' : '1rem',
  transition: 'all 0.2s ease-in-out',
}));

interface Props {
  cell: Cell;
}

export const MRT_TableBodyCell: FC<Props> = ({ cell }) => {
  const { onCellClick, muiTableBodyCellProps, densePadding, currentEditingRow } =
    useMaterialReactTable();

  const mTableCellBodyProps =
    muiTableBodyCellProps instanceof Function ? muiTableBodyCellProps(cell) : muiTableBodyCellProps;

  const mcTableCellBodyProps =
    cell.column.muiTableBodyCellProps instanceof Function
      ? cell.column.muiTableBodyCellProps(cell)
      : cell.column.muiTableBodyCellProps;

  const tableCellProps = {
    ...mTableCellBodyProps,
    ...mcTableCellBodyProps,
    ...cell.getCellProps(),
    style: {
      ...cell.getCellProps().style,
      ...(mTableCellBodyProps?.style ?? {}),
      ...(mcTableCellBodyProps?.style ?? {}),
    },
  };

  return (
    <TableCell
      densePadding={densePadding}
      onClick={(event: MouseEvent<HTMLTableCellElement>) => onCellClick?.(event, cell)}
      {...tableCellProps}
    >
      {currentEditingRow?.id === cell.row.id ? (
        <MRT_EditCellTextField cell={cell} />
      ) : cell.isPlaceholder ? null : cell.isAggregated ? (
        cell.render('Aggregated')
      ) : cell.isGrouped ? (
        <span>
          {cell.render('Cell')} ({cell.row.subRows.length})
        </span>
      ) : (
        cell.render('Cell')
      )}
      {}
    </TableCell>
  );
};
