import React, { FC, MouseEvent } from 'react';
import { TableRow } from '@mui/material';
import { MRT_TableBodyCell } from './MRT_TableBodyCell';
import { MRT_TableDetailPanel } from './MRT_TableDetailPanel';
import type { MRT_Row, MRT_TableInstance } from '..';

interface Props {
  pinned: 'left' | 'center' | 'right' | 'none';
  row: MRT_Row;
  tableInstance: MRT_TableInstance;
}

export const MRT_TableBodyRow: FC<Props> = ({ pinned, row, tableInstance }) => {
  const {
    options: { muiTableBodyRowProps, onRowClick, renderDetailPanel },
  } = tableInstance;

  const {
    getCenterVisibleCells,
    getIsGrouped,
    getIsSelected,
    getLeftVisibleCells,
    getRightVisibleCells,
    getRowProps,
    getVisibleCells,
  } = row;

  const mTableBodyRowProps =
    muiTableBodyRowProps instanceof Function
      ? muiTableBodyRowProps({ row, tableInstance })
      : muiTableBodyRowProps;

  const tableRowProps = {
    ...getRowProps(),
    ...mTableBodyRowProps,
  };

  const getVisibleCellsMap = {
    center: getCenterVisibleCells,
    left: getLeftVisibleCells,
    none: getVisibleCells,
    right: getRightVisibleCells,
  };

  return (
    <>
      <TableRow
        hover
        onClick={(event: MouseEvent<HTMLTableRowElement>) =>
          onRowClick?.({ event, row, tableInstance })
        }
        selected={getIsSelected()}
        {...tableRowProps}
      >
        {getVisibleCellsMap[pinned]().map((cell) => (
          <MRT_TableBodyCell
            cell={cell}
            key={cell.getCellProps().key}
            tableInstance={tableInstance}
          />
        ))}
      </TableRow>
      {renderDetailPanel && !getIsGrouped() && (
        <MRT_TableDetailPanel row={row} tableInstance={tableInstance} />
      )}
    </>
  );
};
