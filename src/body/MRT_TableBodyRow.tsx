import React, { FC, MouseEvent } from 'react';
import { lighten, TableRow } from '@mui/material';
import { MRT_TableBodyCell } from './MRT_TableBodyCell';
import { MRT_TableDetailPanel } from './MRT_TableDetailPanel';
import type { MRT_Row, MRT_TableInstance } from '..';

interface Props {
  row: MRT_Row;
  tableInstance: MRT_TableInstance;
}

export const MRT_TableBodyRow: FC<Props> = ({ row, tableInstance }) => {
  const {
    options: { muiTableBodyRowProps, onRowClick, renderDetailPanel },
  } = tableInstance;

  const {
    // getCenterVisibleCells,
    getIsGrouped,
    getIsSelected,
    getVisibleCells,
    // getRightVisibleCells,
    getRowProps,
  } = row;

  const mTableBodyRowProps =
    muiTableBodyRowProps instanceof Function
      ? muiTableBodyRowProps({ row, tableInstance })
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
          onRowClick?.({ event, row, tableInstance })
        }
        selected={getIsSelected()}
        {...tableRowProps}
        sx={(theme) => ({
          backgroundColor: lighten(theme.palette.background.default, 0.06),
          //@ts-ignore
          ...(tableRowProps?.sx as any),
        })}
      >
        {getVisibleCells().map((cell) => (
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
