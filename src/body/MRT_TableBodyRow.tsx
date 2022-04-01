import React, { FC, MouseEvent } from 'react';
import { TableCell, TableRow } from '@mui/material';
import {
  commonTableBodyButtonCellStyles,
  MRT_TableBodyCell,
} from './MRT_TableBodyCell';
import { useMRT } from '../useMRT';
import { MRT_TableDetailPanel } from './MRT_TableDetailPanel';
import { MRT_ExpandButton } from '../buttons/MRT_ExpandButton';
import { MRT_ToggleRowActionMenuButton } from '../buttons/MRT_ToggleRowActionMenuButton';
import type { MRT_Row } from '..';

interface Props<D extends Record<string, any> = {}> {
  row: MRT_Row<D>;
}

export const MRT_TableBodyRow: FC<Props> = ({ row }) => {
  const {
    getCanSomeRowsExpand,
    enableRowActions,
    enableRowEditing,
    muiTableBodyRowProps,
    onRowClick,
    positionActionsColumn,
    renderDetailPanel,
    tableInstance: { getState },
  } = useMRT();

  const { isDensePadding } = getState();

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
        {(enableRowActions || enableRowEditing) &&
          positionActionsColumn === 'first' && (
            <MRT_ToggleRowActionMenuButton row={row} />
          )}
        {(getCanSomeRowsExpand() || renderDetailPanel) && (
          <TableCell
            size="small"
            sx={{
              ...commonTableBodyButtonCellStyles({ isDensePadding }),
              pl: `${row.depth + 0.5}rem`,
              textAlign: 'left',
            }}
          >
            <MRT_ExpandButton row={row} />
          </TableCell>
        )}
        {row.getVisibleCells().map((cell) => (
          <MRT_TableBodyCell key={cell.getCellProps().key} cell={cell} />
        ))}
        {(enableRowActions || enableRowEditing) &&
          positionActionsColumn === 'last' && (
            <MRT_ToggleRowActionMenuButton row={row} />
          )}
      </TableRow>
      {renderDetailPanel && !row.getIsGrouped() && (
        <MRT_TableDetailPanel row={row} />
      )}
    </>
  );
};
