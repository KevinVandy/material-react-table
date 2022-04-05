import React, { FC, MouseEvent } from 'react';
import { TableRow } from '@mui/material';
import { MRT_TableBodyCell } from './MRT_TableBodyCell';
import { useMRT } from '../useMRT';
import { MRT_TableDetailPanel } from './MRT_TableDetailPanel';
import type { MRT_Row } from '..';

interface Props<D extends Record<string, any> = {}> {
  row: MRT_Row<D>;
}

export const MRT_TableBodyRow: FC<Props> = ({ row }) => {
  const { muiTableBodyRowProps, onRowClick, renderDetailPanel } = useMRT();

  const mTableBodyRowProps =
    muiTableBodyRowProps instanceof Function
      ? muiTableBodyRowProps(row)
      : muiTableBodyRowProps;

  const tableRowProps = {
    ...row.getRowProps(),
    ...mTableBodyRowProps,
  };

  return (
    <>
      <TableRow
        hover
        onClick={(event: MouseEvent<HTMLTableRowElement>) =>
          onRowClick?.(event, row)
        }
        selected={row.getIsSelected()}
        {...tableRowProps}
      >
        {row.getVisibleCells().map((cell) => (
          <MRT_TableBodyCell key={cell.getCellProps().key} cell={cell} />
        ))}
      </TableRow>
      {row.getIsExpanded() &&
        row.subRows?.map((subRow) => <MRT_TableBodyRow row={subRow} />)}
      {renderDetailPanel && !row.getIsGrouped() && (
        <MRT_TableDetailPanel row={row} />
      )}
    </>
  );
};
