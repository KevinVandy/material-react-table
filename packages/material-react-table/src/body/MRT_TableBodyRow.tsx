import { type DragEvent, memo, useRef, useMemo } from 'react';
import TableRow from '@mui/material/TableRow';
import {
  type Theme,
  alpha,
  darken,
  lighten,
  useTheme,
} from '@mui/material/styles';
import { Memo_MRT_TableBodyCell, MRT_TableBodyCell } from './MRT_TableBodyCell';
import { MRT_TableDetailPanel } from './MRT_TableDetailPanel';
import { type VirtualItem, type Virtualizer } from '@tanstack/react-virtual';
import { parseFromValuesOrFunc } from '../column.utils';
import { type MRT_Cell, type MRT_Row, type MRT_TableInstance } from '../types';

interface Props<TData extends Record<string, any>> {
  columnVirtualizer?: Virtualizer<HTMLDivElement, HTMLTableCellElement>;
  measureElement?: (element: HTMLTableRowElement) => void;
  numRows: number;
  pinnedRowIds?: string[];
  row: MRT_Row<TData>;
  rowIndex: number;
  table: MRT_TableInstance<TData>;
  virtualColumns?: VirtualItem[];
  virtualPaddingLeft?: number;
  virtualPaddingRight?: number;
  virtualRow?: VirtualItem;
}

export const MRT_TableBodyRow = <TData extends Record<string, any>>({
  columnVirtualizer,
  measureElement,
  numRows,
  pinnedRowIds,
  row,
  rowIndex,
  table,
  virtualColumns,
  virtualPaddingLeft,
  virtualPaddingRight,
  virtualRow,
}: Props<TData>) => {
  const theme = useTheme();

  const {
    getState,
    options: {
      enableRowOrdering,
      enableRowPinning,
      enableStickyFooter,
      enableStickyHeader,
      layoutMode,
      rowPinningDisplayMode,
      memoMode,
      muiTableBodyRowProps,
      renderDetailPanel,
    },
    refs: { tableHeadRef, tableFooterRef },
    setHoveredRow,
  } = table;
  const {
    density,
    draggingColumn,
    draggingRow,
    editingCell,
    editingRow,
    hoveredRow,
    isFullScreen,
    rowPinning,
  } = getState();

  const isPinned = enableRowPinning && row.getIsPinned();

  const tableRowProps = parseFromValuesOrFunc(muiTableBodyRowProps, {
    row,
    staticRowIndex: rowIndex,
    table,
  });

  const [bottomPinnedIndex, topPinnedIndex] = useMemo(() => {
    if (
      !enableRowPinning ||
      !rowPinningDisplayMode?.includes('sticky') ||
      !pinnedRowIds ||
      !row.getIsPinned()
    )
      return [];
    return [
      [...pinnedRowIds].reverse().indexOf(row.id),
      pinnedRowIds.indexOf(row.id),
    ];
  }, [pinnedRowIds, rowPinning]);

  const tableHeadHeight =
    ((enableStickyHeader || isFullScreen) &&
      tableHeadRef.current?.clientHeight) ||
    0;
  const tableFooterHeight =
    (enableStickyFooter && tableFooterRef.current?.clientHeight) || 0;

  const sx = parseFromValuesOrFunc(tableRowProps?.sx, theme as any);

  const rowHeight =
    // @ts-ignore
    parseInt(tableRowProps?.style?.height ?? sx?.height, 10) ||
    (density === 'compact' ? 37 : density === 'comfortable' ? 53 : 69);

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
        sx={(theme: Theme) => ({
          backgroundColor: `${lighten(
            theme.palette.background.default,
            0.06,
          )} !important`,
          boxSizing: 'border-box',
          bottom:
            bottomPinnedIndex !== undefined && isPinned
              ? `${
                  bottomPinnedIndex * rowHeight +
                  (enableStickyFooter ? tableFooterHeight - 1 : 0)
                }px`
              : undefined,
          display: layoutMode === 'grid' ? 'flex' : 'table-row',
          opacity: isPinned
            ? 0.98
            : draggingRow?.id === row.id || hoveredRow?.id === row.id
            ? 0.5
            : 1,
          position: virtualRow
            ? 'absolute'
            : rowPinningDisplayMode?.includes('sticky') && isPinned
            ? 'sticky'
            : undefined,
          transition: virtualRow ? 'none' : 'all 150ms ease-in-out',
          top: virtualRow
            ? 0
            : topPinnedIndex !== undefined && isPinned
            ? `${
                topPinnedIndex * rowHeight +
                (enableStickyHeader || isFullScreen ? tableHeadHeight - 1 : 0)
              }px`
            : undefined,
          width: '100%',
          zIndex:
            rowPinningDisplayMode?.includes('sticky') && isPinned
              ? 1
              : undefined,
          td: {
            backgroundColor: row.getIsSelected()
              ? alpha(theme.palette.primary.main, 0.2)
              : isPinned
              ? alpha(theme.palette.primary.main, 0.1)
              : undefined,
          },
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
          ...(sx as any),
        })}
        style={{
          transform: virtualRow
            ? `translateY(${virtualRow?.start}px)`
            : undefined,
          ...tableRowProps?.style,
        }}
      >
        {virtualPaddingLeft ? (
          <td style={{ display: 'flex', width: virtualPaddingLeft }} />
        ) : null}
        {(virtualColumns ?? row.getVisibleCells()).map((cellOrVirtualCell) => {
          const cell = columnVirtualizer
            ? row.getVisibleCells()[(cellOrVirtualCell as VirtualItem).index]
            : (cellOrVirtualCell as MRT_Cell<TData>);
          const props = {
            cell,
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
            <Memo_MRT_TableBodyCell key={cell.id} {...props} />
          ) : (
            <MRT_TableBodyCell key={cell.id} {...props} />
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
          rowIndex={rowIndex}
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
) as typeof MRT_TableBodyRow;
