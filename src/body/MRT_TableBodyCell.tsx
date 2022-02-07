import React, { FC, MouseEvent } from 'react';
import { TableCell } from '@mui/material';
import { Cell } from 'react-table';
import { useMaterialReactTable } from '../useMaterialReactTable';
import { MRT_EditCellTextbox } from '../inputs/MRT_EditCellTextbox';

interface Props {
  cell: Cell;
}

export const MRT_TableBodyCell: FC<Props> = ({ cell }) => {
  const {
    onCellClick,
    muiTableBodyCellProps,
    densePadding,
    currentEditingRow,
  } = useMaterialReactTable();

  const mTableCellBodyProps =
    muiTableBodyCellProps instanceof Function
      ? muiTableBodyCellProps(cell)
      : muiTableBodyCellProps;

  const tableCellProps = {
    ...mTableCellBodyProps,
    ...cell.getCellProps(),
    style: {
      padding: densePadding ? '0.5rem' : '1rem',
      transition: 'all 0.2s ease-in-out',
      ...cell.getCellProps().style,
      ...(mTableCellBodyProps?.style ?? {}),
    },
  };

  return (
    <TableCell
      onClick={(event: MouseEvent<HTMLTableCellElement>) =>
        onCellClick?.(event, cell)
      }
      {...tableCellProps}
    >
      {currentEditingRow?.id === cell.row.id ? (
        <MRT_EditCellTextbox cell={cell} />
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
