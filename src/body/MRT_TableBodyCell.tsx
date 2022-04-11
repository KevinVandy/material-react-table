import React, { FC, MouseEvent, useMemo } from 'react';
import { Skeleton, TableCell } from '@mui/material';
import { MRT_EditCellTextField } from '../inputs/MRT_EditCellTextField';
import type { MRT_Cell, MRT_TableInstance } from '..';
import { MRT_CopyButton } from '../buttons/MRT_CopyButton';

interface Props {
  cell: MRT_Cell;
  tableInstance: MRT_TableInstance;
}

export const MRT_TableBodyCell: FC<Props> = ({ cell, tableInstance }) => {
  const {
    getIsSomeColumnsPinned,
    getState,
    options: {
      enableClickToCopy,
      enableColumnPinning,
      isLoading,
      muiTableBodyCellProps,
      muiTableBodyCellSkeletonProps,
      onCellClick,
    },
  } = tableInstance;

  const { currentEditingRow, isDensePadding } = getState();

  const { column, row } = cell;

  const mTableCellBodyProps =
    muiTableBodyCellProps instanceof Function
      ? muiTableBodyCellProps(cell)
      : muiTableBodyCellProps;

  const mcTableCellBodyProps =
    column.muiTableBodyCellProps instanceof Function
      ? column.muiTableBodyCellProps(cell)
      : column.muiTableBodyCellProps;

  const tableCellProps = {
    ...cell.getCellProps(),
    ...mTableCellBodyProps,
    ...mcTableCellBodyProps,
  };

  const skeletonWidth = useMemo(
    () =>
      column.columnDefType === 'display'
        ? column.getWidth() / 2
        : Math.random() * (column.getWidth() - column.getWidth() / 3) +
          column.getWidth() / 3,
    [column.columnDefType, column.getWidth()],
  );

  return (
    <TableCell
      onClick={(event: MouseEvent<HTMLTableCellElement>) =>
        onCellClick?.(event, cell)
      }
      {...tableCellProps}
      sx={{
        p: isDensePadding
          ? column.columnDefType === 'display'
            ? '0 0.5rem'
            : '0.5rem'
          : column.columnDefType === 'display'
          ? '0.5rem 0.75rem'
          : '1rem',
        pl:
          column.id === 'mrt-expand'
            ? `${row.depth + (isDensePadding ? 0.5 : 0.75)}rem`
            : undefined,
        transition: 'all 0.2s ease-in-out',
        whiteSpace:
          isDensePadding || (enableColumnPinning && getIsSomeColumnsPinned())
            ? 'nowrap'
            : 'normal',
        //@ts-ignore
        ...tableCellProps?.sx,
      }}
    >
      {isLoading ? (
        <Skeleton
          animation="wave"
          height={20}
          width={skeletonWidth}
          {...muiTableBodyCellSkeletonProps}
        />
      ) : column.columnDefType === 'display' ? (
        column.Cell?.({ cell, tableInstance })
      ) : cell.getIsPlaceholder() ||
        (row.getIsGrouped() &&
          column.id !==
            row.groupingColumnId) ? null : cell.getIsAggregated() ? (
        cell.renderAggregatedCell()
      ) : column.enableEditing && currentEditingRow?.id === row.id ? (
        <MRT_EditCellTextField cell={cell} tableInstance={tableInstance} />
      ) : (enableClickToCopy || column.enableClickToCopy) &&
        column.enableClickToCopy !== false ? (
        <>
          <MRT_CopyButton cell={cell} tableInstance={tableInstance}>
            {cell.renderCell()}
          </MRT_CopyButton>
          {row.getIsGrouped() && <> ({row.subRows?.length})</>}
        </>
      ) : (
        <>
          {cell.renderCell()}
          {row.getIsGrouped() && <> ({row.subRows?.length})</>}
        </>
      )}
    </TableCell>
  );
};
