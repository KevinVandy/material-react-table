import React, { DragEvent, memo, useRef } from 'react';
import TableRow from '@mui/material/TableRow';
import { darken, lighten } from '@mui/material/styles';
import { Memo_MRT_TableBodyCell, MRT_TableBodyCell } from './MRT_TableBodyCell';
import { MRT_TableDetailPanel } from './MRT_TableDetailPanel';
import type {
  MRT_Cell,
  MRT_Row,
  MRT_TableInstance,
  MRT_VirtualItem,
  MRT_Virtualizer,
} from '..';

interface Props {
  columnVirtualizer?: MRT_Virtualizer<HTMLDivElement, HTMLTableCellElement>;
  measureElement?: (element: HTMLTableRowElement) => void;
  numRows: number;
  row: MRT_Row;
  rowIndex: number;
  table: MRT_TableInstance;
  virtualColumns?: MRT_VirtualItem[];
  virtualPaddingLeft?: number;
  virtualPaddingRight?: number;
  virtualRow?: MRT_VirtualItem;
}

export const MRT_TableBodyRow = ({
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
    getIsSomeColumnsPinned,
    getState,
    options: {
      enableRowOrdering,
      layoutMode,
      memoMode,
      muiTableBodyRowProps,
      renderDetailPanel,
    },
    setHoveredRow,
  } = table;
  const { draggingColumn, draggingRow, editingCell, editingRow, hoveredRow } =
    getState();

  const tableRowProps =
    muiTableBodyRowProps instanceof Function
      ? muiTableBodyRowProps({ row, table })
      : muiTableBodyRowProps;

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
        hover
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
              tableRowProps?.hover !== false && getIsSomeColumnsPinned()
                ? theme.palette.mode === 'dark'
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
            ? row.getVisibleCells()[
                (cellOrVirtualCell as MRT_VirtualItem).index
              ]
            : (cellOrVirtualCell as MRT_Cell);
          const props = {
            cell,
            enableHover: tableRowProps?.hover !== false,
            key: cell.id,
            measureElement: columnVirtualizer?.measureElement,
            numRows,
            rowIndex,
            rowRef,
            table,
            virtualCell: columnVirtualizer
              ? (cellOrVirtualCell as MRT_VirtualItem)
              : undefined,
          };
          return memoMode === 'cells' &&
            cell.column.columnDef.columnDefType === 'data' &&
            !draggingColumn &&
            !draggingRow &&
            editingCell?.id !== cell.id &&
            editingRow?.id !== row.id ? (
            <Memo_MRT_TableBodyCell {...props} />
          ) : (
            <MRT_TableBodyCell {...props} />
          );
        })}
        {virtualPaddingRight ? (
          <td style={{ display: 'flex', width: virtualPaddingRight }} />
        ) : null}
      </TableRow>
      {renderDetailPanel && !row.getIsGrouped() && (
        <MRT_TableDetailPanel
          parentRowRef={rowRef}
          row={row}
          table={table}
          virtualRow={virtualRow}
        />
      )}
    </>
  );
};

export const Memo_MRT_TableBodyRow = memo(
  MRT_TableBodyRow,
  (prev, next) => prev.row === next.row && prev.rowIndex === next.rowIndex,
);
