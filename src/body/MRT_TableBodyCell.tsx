import React, { FC, MouseEvent } from 'react';
import { Skeleton, TableCell } from '@mui/material';
import { useMRT } from '../useMRT';
import { MRT_EditCellTextField } from '../inputs/MRT_EditCellTextField';
import type { MRT_Cell } from '..';
import { MRT_CopyButton } from '../buttons/MRT_CopyButton';

export const commonTableBodyCellStyles = ({
  isDensePadding,
}: {
  isDensePadding: boolean;
}) => ({
  p: isDensePadding ? '0.5rem' : '1rem',
  transition: 'all 0.2s ease-in-out',
  whiteSpace: isDensePadding ? 'nowrap' : 'normal',
});

export const commonTableBodyButtonCellStyles = ({
  isDensePadding,
}: {
  isDensePadding: boolean;
}) => ({
  p: isDensePadding ? '1px' : '0.6rem',
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
      //@ts-ignore
      sx={{
        ...commonTableBodyCellStyles({
          isDensePadding,
        }),
        //@ts-ignore
        ...tableCellProps?.sx,
      }}
    >
      {isLoading ? (
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
