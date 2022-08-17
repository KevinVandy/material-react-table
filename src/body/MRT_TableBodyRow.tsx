import React, { DragEvent, FC, useRef } from 'react';
import { darken, lighten, TableRow, useTheme } from '@mui/material';
import { MRT_TableBodyCell } from './MRT_TableBodyCell';
import { MRT_TableDetailPanel } from './MRT_TableDetailPanel';
import type { MRT_Row, MRT_TableInstance } from '..';

interface Props {
  row: MRT_Row;
  rowIndex: number;
  table: MRT_TableInstance;
}

export const MRT_TableBodyRow: FC<Props> = ({ row, rowIndex, table }) => {
  const theme = useTheme();
  const {
    getIsSomeColumnsPinned,
    getState,
    options: { enableRowOrdering, muiTableBodyRowProps, renderDetailPanel },
    setHoveredRow,
  } = table;
  const { draggingRow, hoveredRow } = getState();

  const tableRowProps =
    muiTableBodyRowProps instanceof Function
      ? muiTableBodyRowProps({ row, table })
      : muiTableBodyRowProps;

  const handleDragEnter = (_e: DragEvent) => {
    if (enableRowOrdering && draggingRow) {
      setHoveredRow(row);
    }
  };

  const rowRef = useRef<HTMLTableRowElement>(null);

  const draggingBorder =
    draggingRow?.id === row.id
      ? `1px dashed ${theme.palette.text.secondary}`
      : hoveredRow?.id === row.id
      ? `2px dashed ${theme.palette.primary.main}`
      : undefined;

  const draggingBorders = draggingBorder
    ? {
        border: draggingBorder,
      }
    : undefined;

  return (
    <>
      <TableRow
        onDragEnter={handleDragEnter}
        hover
        selected={row.getIsSelected()}
        ref={rowRef}
        {...tableRowProps}
        sx={(theme) => ({
          backgroundColor: lighten(theme.palette.background.default, 0.06),
          opacity:
            draggingRow?.id === row.id || hoveredRow?.id === row.id ? 0.5 : 1,
          transition: 'all 0.2s ease-in-out',
          '&:hover td': {
            backgroundColor:
              tableRowProps?.hover !== false && getIsSomeColumnsPinned()
                ? theme.palette.mode === 'dark'
                  ? `${lighten(theme.palette.background.default, 0.12)}`
                  : `${darken(theme.palette.background.default, 0.05)}`
                : undefined,
          },
          ...(tableRowProps?.sx instanceof Function
            ? tableRowProps.sx(theme)
            : (tableRowProps?.sx as any)),
          ...draggingBorders,
        })}
      >
        {row?.getVisibleCells()?.map?.((cell) => (
          <MRT_TableBodyCell
            cell={cell}
            enableHover={tableRowProps?.hover !== false}
            key={cell.id}
            rowIndex={rowIndex}
            rowRef={rowRef}
            table={table}
          />
        ))}
      </TableRow>
      {renderDetailPanel && !row.getIsGrouped() && (
        <MRT_TableDetailPanel row={row} table={table} />
      )}
    </>
  );
};
