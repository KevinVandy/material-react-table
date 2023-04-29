import React, { DragEvent, memo, useRef } from 'react';
import TableRow from '@mui/material/TableRow';
import { alpha, darken, lighten } from '@mui/material/styles';
import { Memo_TRT_TableBodyCell, TRT_TableBodyCell } from './TRT_TableBodyCell';
import { TRT_TableDetailPanel } from './TRT_TableDetailPanel';
import type { VirtualItem, Virtualizer } from '@tanstack/react-virtual';
import type {
  TRT_Cell,
  TRT_Row,
  TRT_TableInstance,
} from '../TailwindCSSReactTable.d';

interface Props {
  columnVirtualizer?: Virtualizer<HTMLDivElement, HTMLTableCellElement>;
  measureElement?: (element: HTMLTableRowElement) => void;
  numRows: number;
  row: TRT_Row;
  rowIndex: number;
  table: TRT_TableInstance;
  virtualColumns?: VirtualItem[];
  virtualPaddingLeft?: number;
  virtualPaddingRight?: number;
  virtualRow?: VirtualItem;
}

export const TRT_TableBodyRow = ({
  columnVirtualizer,
  measureElement,
  numRows,
  row,
  rowIndex,
  table,
  virtualColumns,
  virtualPaddingLeft,
  virtualPaddingRight,
  virtualRow,
}: Props) => {
  const {
    getState,
    options: {
      enableRowOrdering,
      layoutMode,
      memoMode,
      tableBodyRowProps,
      renderDetailPanel,
    },
    setHoveredRow,
  } = table;
  const { draggingColumn, draggingRow, editingCell, editingRow, hoveredRow } =
    getState();

  const tableRowProps =
    tableBodyRowProps instanceof Function
      ? tableBodyRowProps({ row, staticRowIndex: rowIndex, table })
      : tableBodyRowProps;

  const handleDragEnter = (_e: DragEvent) => {
    if (enableRowOrdering && draggingRow) {
      setHoveredRow(row);
    }
  };

  const rowRef = useRef<HTMLTableRowElement | null>(null);

  return (
    <>
      <TableRow
        data-index={virtualRow?.index}
        onDragEnter={handleDragEnter}
        selected={row.getIsSelected()}
        ref={(node: HTMLTableRowElement) => {
          if (node) {
            rowRef.current = node;
            measureElement?.(node);
          }
        }}
        {...tableRowProps}
        sx={(theme) => ({
          backgroundColor: lighten(theme.palette.background.default, 0.06),
          display: layoutMode === 'grid' ? 'flex' : 'table-row',
          opacity:
            draggingRow?.id === row.id || hoveredRow?.id === row.id ? 0.5 : 1,
          position: virtualRow ? 'absolute' : undefined,
          top: virtualRow ? 0 : undefined,
          transform: virtualRow
            ? `translateY(${virtualRow?.start}px)`
            : undefined,
          transition: virtualRow ? 'none' : 'all 150ms ease-in-out',
          width: '100%',
          '&:hover td': {
            backgroundColor:
              tableRowProps?.hover !== false
                ? row.getIsSelected()
                  ? `${alpha(theme.palette.primary.main, 0.2)}`
                  : theme.palette.mode === 'dark'
                  ? `${lighten(theme.palette.background.default, 0.12)}`
                  : `${darken(theme.palette.background.default, 0.05)}`
                : undefined,
          },
          ...(tableRowProps?.sx instanceof Function
            ? tableRowProps.sx(theme)
            : (tableRowProps?.sx as any)),
        })}
      >
        {virtualPaddingLeft ? (
          <td style={{ display: 'flex', width: virtualPaddingLeft }} />
        ) : null}
        {(virtualColumns ?? row.getVisibleCells()).map((cellOrVirtualCell) => {
          const cell = columnVirtualizer
            ? row.getVisibleCells()[(cellOrVirtualCell as VirtualItem).index]
            : (cellOrVirtualCell as TRT_Cell);
          const props = {
            cell,
            key: cell.id,
            measureElement: columnVirtualizer?.measureElement,
            numRows,
            rowIndex,
            rowRef,
            table,
            virtualCell: columnVirtualizer
              ? (cellOrVirtualCell as VirtualItem)
              : undefined,
          };
          return memoMode === 'cells' &&
            cell.column.columnDef.columnDefType === 'data' &&
            !draggingColumn &&
            !draggingRow &&
            editingCell?.id !== cell.id &&
            editingRow?.id !== row.id ? (
            <Memo_TRT_TableBodyCell {...props} />
          ) : (
            <TRT_TableBodyCell {...props} />
          );
        })}
        {virtualPaddingRight ? (
          <td style={{ display: 'flex', width: virtualPaddingRight }} />
        ) : null}
      </TableRow>
      {renderDetailPanel && !row.getIsGrouped() && (
        <TRT_TableDetailPanel
          parentRowRef={rowRef}
          row={row}
          rowIndex={rowIndex}
          table={table}
          virtualRow={virtualRow}
        />
      )}
    </>
  );
};

export const Memo_TRT_TableBodyRow = memo(
  TRT_TableBodyRow,
  (prev, next) => prev.row === next.row && prev.rowIndex === next.rowIndex,
);
