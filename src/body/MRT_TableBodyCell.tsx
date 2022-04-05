import React, { FC, MouseEvent } from 'react';
import { Skeleton, SxProps, TableCell } from '@mui/material';
import { useMRT } from '../useMRT';
import { MRT_EditCellTextField } from '../inputs/MRT_EditCellTextField';
import type { MRT_Cell } from '..';
import { MRT_CopyButton } from '../buttons/MRT_CopyButton';

export const commonTableBodyCellStyles = ({
  isDensePadding,
  isDisplayColumn,
}: {
  isDensePadding: boolean;
  isDisplayColumn?: boolean;
}): SxProps => ({
  p: isDensePadding
    ? isDisplayColumn
      ? '0 0.5rem'
      : '0.5rem'
    : isDisplayColumn
    ? '0.5rem 0.75rem'
    : '1rem',
  transition: 'all 0.2s ease-in-out',
  whiteSpace: isDensePadding ? 'nowrap' : 'normal',
});

export const commonTableBodyButtonCellStyles = ({
  isDensePadding,
}: {
  isDensePadding: boolean;
}) => ({
  p: isDensePadding ? '1px' : '0.5rem',
  textAlign: 'center',
  transition: 'all 0.2s ease-in-out',
});

interface Props {
  cell: MRT_Cell;
}

export const MRT_TableBodyCell: FC<Props> = ({ cell }) => {
  const {
    enableClickToCopy,
    isLoading,
    muiTableBodyCellProps,
    muiTableBodyCellSkeletonProps,
    onCellClick,
    tableInstance,
    tableInstance: { getState },
  } = useMRT();

  const { currentEditingRow, isDensePadding } = getState();

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
        ...commonTableBodyCellStyles({
          isDensePadding,
          isDisplayColumn: cell.column.isDisplayColumn,
        }),
        //@ts-ignore
        pl:
          cell.column.id === 'mrt-expand'
            ? `${cell.row.depth + 0.75}rem`
            : undefined,
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
          width={Math.random() * (120 - 60) + 60}
          {...muiTableBodyCellSkeletonProps}
        />
      ) : cell.column.enableEditing && currentEditingRow?.id === cell.row.id ? (
        <MRT_EditCellTextField cell={cell} />
      ) : enableClickToCopy || cell.column.enableClickToCopy ? (
        <MRT_CopyButton cell={cell}>{cell.renderCell()}</MRT_CopyButton>
      ) : (
        cell.renderCell()
      )}
    </TableCell>
  );
};
