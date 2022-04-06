import React, { FC, MouseEvent, useMemo } from 'react';
import { Skeleton, TableCell } from '@mui/material';
import { useMRT } from '../useMRT';
import { MRT_EditCellTextField } from '../inputs/MRT_EditCellTextField';
import type { MRT_Cell } from '..';
import { MRT_CopyButton } from '../buttons/MRT_CopyButton';

interface Props {
  cell: MRT_Cell;
}

export const MRT_TableBodyCell: FC<Props> = ({ cell }) => {
  const {
    enableClickToCopy,
    enableColumnPinning,
    isLoading,
    muiTableBodyCellProps,
    muiTableBodyCellSkeletonProps,
    onCellClick,
    tableInstance,
    tableInstance: { getState },
  } = useMRT();

  const { columnPinning, currentEditingRow, isDensePadding } = getState();

  const skeletonWidth = useMemo(
    () =>
      Math.random() * (cell.column.getWidth() - cell.column.getWidth() / 3) +
      cell.column.getWidth() / 3,
    [cell.column.getWidth()],
  );

  const getIsSomeColumnPinned = useMemo(
    () => !!columnPinning.left?.length || !!columnPinning.right?.length,
    [columnPinning.left, columnPinning.right],
  );

  const mTableCellBodyProps =
    muiTableBodyCellProps instanceof Function
      ? muiTableBodyCellProps(cell)
      : muiTableBodyCellProps;

  const mcTableCellBodyProps =
    cell.column.muiTableBodyCellProps instanceof Function
      ? cell.column.muiTableBodyCellProps(cell)
      : cell.column.muiTableBodyCellProps;

  const tableCellProps = {
    ...cell.getCellProps(),
    ...mTableCellBodyProps,
    ...mcTableCellBodyProps,
  };

  return (
    <TableCell
      onClick={(event: MouseEvent<HTMLTableCellElement>) =>
        onCellClick?.(event, cell)
      }
      {...tableCellProps}
      sx={{
        p: isDensePadding
          ? cell.column.isDisplayColumn
            ? '0 0.5rem'
            : '0.5rem'
          : cell.column.isDisplayColumn
          ? '0.5rem 0.75rem'
          : '1rem',
        pl:
          cell.column.id === 'mrt-expand'
            ? `${cell.row.depth + (isDensePadding ? 0.5 : 0.75)}rem`
            : undefined,
        transition: 'all 0.2s ease-in-out',
        whiteSpace:
          isDensePadding || (enableColumnPinning && getIsSomeColumnPinned)
            ? 'nowrap'
            : 'normal',
        //@ts-ignore
        ...tableCellProps?.sx,
      }}
    >
      {cell.column.isDisplayColumn ? (
        cell.column.Cell?.({ cell, tableInstance })
      ) : isLoading ? (
        <Skeleton
          animation="wave"
          height={20}
          width={skeletonWidth}
          {...muiTableBodyCellSkeletonProps}
        />
      ) : cell.column.enableEditing && currentEditingRow?.id === cell.row.id ? (
        <MRT_EditCellTextField cell={cell} />
      ) : (enableClickToCopy || cell.column.enableClickToCopy) &&
        cell.column.enableClickToCopy !== false ? (
        <MRT_CopyButton cell={cell}>{cell.renderCell()}</MRT_CopyButton>
      ) : (
        cell.renderCell()
      )}
    </TableCell>
  );
};
