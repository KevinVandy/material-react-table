import React, { FC, MouseEvent } from 'react';
import { TableRow } from '@mui/material';
import { MRT_TableBodyCell } from './MRT_TableBodyCell';
import { useMRT } from '../useMRT';
import { MRT_TableDetailPanel } from './MRT_TableDetailPanel';
import type { MRT_Row } from '..';

interface Props<D extends Record<string, any> = {}> {
  pinned: 'left' | 'center' | 'right' | 'none';
  row: MRT_Row<D>;
}

export const MRT_TableBodyRow: FC<Props> = ({ pinned, row }) => {
  const {
    muiTableBodyRowProps,
    onRowClick,
    renderDetailPanel,
    tableInstance: { getState },
  } = useMRT();

  const {
    getCenterVisibleCells,
    getIsGrouped,
    getIsSelected,
    getLeftVisibleCells,
    getRightVisibleCells,
    getRowProps,
    getVisibleCells,
  } = row;

  const getVisibleCellsMap = {
    center: getCenterVisibleCells,
    left: getLeftVisibleCells,
    none: getVisibleCells,
    right: getRightVisibleCells,
  };

  const { columnPinning } = getState();

  const mTableBodyRowProps =
    muiTableBodyRowProps instanceof Function
      ? muiTableBodyRowProps(row)
      : muiTableBodyRowProps;

  const tableRowProps = {
    ...getRowProps(),
    ...mTableBodyRowProps,
  };

  return (
    <>
      <TableRow
        hover
        onClick={(event: MouseEvent<HTMLTableRowElement>) =>
          onRowClick?.(event, row)
        }
        selected={getIsSelected()}
        {...tableRowProps}
      >
        {getVisibleCellsMap[pinned]().map((cell) => (
          <MRT_TableBodyCell key={cell.getCellProps().key} cell={cell} />
        ))}
      </TableRow>
      {renderDetailPanel && !getIsGrouped() && (
        <MRT_TableDetailPanel row={row} />
      )}
    </>
  );
};
