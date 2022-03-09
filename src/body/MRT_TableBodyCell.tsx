import React, { FC, MouseEvent } from 'react';
import { Skeleton, TableCell, TableCellProps } from '@mui/material';
import { useMRT } from '../useMRT';
import { MRT_EditCellTextField } from '../inputs/MRT_EditCellTextField';
import type { MRT_Cell } from '..';

export const commonTableBodyCellStyles = (densePadding: boolean) => ({
  p: densePadding ? '0.5rem' : '1rem',
  transition: 'all 0.2s ease-in-out',
  whiteSpace: densePadding ? 'nowrap' : 'normal',
});

export const commonTableBodyButtonCellStyles = (densePadding: boolean) => ({
  p: densePadding ? '1px' : '0.6rem',
  textAlign: 'center',
  transition: 'all 0.2s ease-in-out',
});

interface Props {
  cell: MRT_Cell;
}

export const MRT_TableBodyCell: FC<Props> = ({ cell }) => {
  const {
    isLoading,
    muiTableBodyCellProps,
    muiTableBodyCellSkeletonProps,
    onCellClick,
    tableInstance: {
      state: { currentEditingRow, densePadding },
    },
  } = useMRT();

  const mTableCellBodyProps =
    muiTableBodyCellProps instanceof Function
      ? muiTableBodyCellProps(cell)
      : muiTableBodyCellProps;

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
      ...mTableCellBodyProps?.style,
      ...mcTableCellBodyProps?.style,
    },
  };

  return (
    <TableCell
      onClick={(event: MouseEvent<HTMLTableCellElement>) =>
        onCellClick?.(event, cell)
      }
      {...tableCellProps}
      sx={
        {
          ...commonTableBodyCellStyles(densePadding),
          ...tableCellProps?.sx,
        } as TableCellProps['sx']
      }
    >
      {isLoading ? (
        <Skeleton
          animation="wave"
          height={20}
          width={Math.random() * (120 - 60) + 60}
          {...muiTableBodyCellSkeletonProps}
        />
      ) : currentEditingRow?.id === cell.row.id ? (
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
    </TableCell>
  );
};
