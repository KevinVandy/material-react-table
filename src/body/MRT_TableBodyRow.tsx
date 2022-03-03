import React, { FC, MouseEvent } from 'react';
import { alpha, TableCell, TableRow } from '@mui/material';
import {
  commonTableBodyCellStyles,
  MRT_TableBodyCell,
} from './MRT_TableBodyCell';
import { useMRT } from '../useMRT';
import { MRT_TableDetailPanel } from './MRT_TableDetailPanel';
import { MRT_ExpandButton } from '../buttons/MRT_ExpandButton';
import { MRT_SelectCheckbox } from '../inputs/MRT_SelectCheckbox';
import { MRT_ToggleRowActionMenuButton } from '../buttons/MRT_ToggleRowActionMenuButton';
import { MRT_Cell, MRT_Row } from '..';

interface Props {
  row: MRT_Row;
}

export const MRT_TableBodyRow: FC<Props> = ({ row }) => {
  const {
    anyRowsCanExpand,
    enableRowActions,
    enableRowEditing,
    enableRowNumbers,
    enableSelection,
    muiTableBodyRowProps,
    onRowClick,
    positionActionsColumn,
    renderDetailPanel,
    tableInstance: {
      state: { densePadding },
    },
  } = useMRT();

  const mTableBodyRowProps =
    muiTableBodyRowProps instanceof Function
      ? muiTableBodyRowProps(row)
      : muiTableBodyRowProps;

  const tableRowProps = {
    ...mTableBodyRowProps,
    ...row.getRowProps(),
    style: {
      ...row.getRowProps().style,
      ...mTableBodyRowProps?.style,
    },
  };

  return (
    <>
      <TableRow
        hover
        onClick={(event: MouseEvent<HTMLTableRowElement>) =>
          onRowClick?.(event, row)
        }
        {...tableRowProps}
        sx={(theme) =>
          ({
            backgroundColor: row.isSelected
              ? alpha(theme.palette.primary.light, 0.1)
              : 'transparent',
            ...tableRowProps?.sx,
          } as any)
        }
      >
        {enableRowNumbers && (
          <TableCell sx={{ ...commonTableBodyCellStyles(densePadding) }}>
            {row.index + 1}
          </TableCell>
        )}
        {(enableRowActions || enableRowEditing) &&
          positionActionsColumn === 'first' && (
            <MRT_ToggleRowActionMenuButton row={row} />
          )}
        {(anyRowsCanExpand || renderDetailPanel) && (
          <MRT_ExpandButton row={row} />
        )}
        {enableSelection && <MRT_SelectCheckbox row={row} />}
        {row.cells.map((cell: MRT_Cell) => (
          <MRT_TableBodyCell key={cell.getCellProps().key} cell={cell} />
        ))}
        {(enableRowActions || enableRowEditing) &&
          positionActionsColumn === 'last' && (
            <MRT_ToggleRowActionMenuButton row={row} />
          )}
      </TableRow>
      {renderDetailPanel && !row.isGrouped && (
        <MRT_TableDetailPanel row={row} />
      )}
    </>
  );
};
