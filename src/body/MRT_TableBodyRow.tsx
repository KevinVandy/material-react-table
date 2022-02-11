import React, { FC, MouseEvent } from 'react';
import { alpha, styled, TableRow as MuiTableRow } from '@mui/material';
import { Row } from 'react-table';
import { MRT_TableBodyCell } from './MRT_TableBodyCell';
import { useMRT } from '../useMRT';
import { MRT_TableDetailPanel } from './MRT_TableDetailPanel';
import { MRT_ExpandButton } from '../buttons/MRT_ExpandButton';
import { MRT_SelectCheckbox } from '../inputs/MRT_SelectCheckbox';
import { MRT_ToggleRowActionMenuButton } from '../buttons/MRT_ToggleRowActionMenuButton';

export const TableRow = styled(MuiTableRow, {
  shouldForwardProp: (prop) => prop !== 'isSelected',
})<{ isSelected?: boolean }>(({ isSelected, theme }) => ({
  backgroundColor: isSelected
    ? alpha(theme.palette.primary.light, 0.1)
    : 'transparent',
}));

interface Props {
  row: Row;
}

export const MRT_TableBodyRow: FC<Props> = ({ row }) => {
  const {
    anyRowsCanExpand,
    enableRowActions,
    enableSelection,
    muiTableBodyRowProps,
    onRowClick,
    positionActionsColumn,
    renderDetailPanel,
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
      ...(mTableBodyRowProps?.style ?? {}),
    },
  };

  return (
    <>
      <TableRow
        isSelected={row.isSelected}
        hover
        onClick={(event: MouseEvent<HTMLTableRowElement>) =>
          onRowClick?.(event, row)
        }
        {...tableRowProps}
      >
        {enableRowActions && positionActionsColumn === 'first' && (
          <MRT_ToggleRowActionMenuButton row={row} />
        )}
        {(anyRowsCanExpand || renderDetailPanel) && (
          <MRT_ExpandButton row={row} />
        )}
        {enableSelection && <MRT_SelectCheckbox row={row} />}
        {row.cells.map((cell) => (
          <MRT_TableBodyCell key={cell.getCellProps().key} cell={cell} />
        ))}
        {enableRowActions && positionActionsColumn === 'last' && (
          <MRT_ToggleRowActionMenuButton row={row} />
        )}
      </TableRow>
      {renderDetailPanel && <MRT_TableDetailPanel row={row} />}
    </>
  );
};
