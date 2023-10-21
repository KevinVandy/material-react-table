import { type DragEvent, memo, useMemo, useRef } from 'react';
import { type VirtualItem, type Virtualizer } from '@tanstack/react-virtual';
import TableRow from '@mui/material/TableRow';
import {
  type Theme,
  alpha,
  darken,
  lighten,
  useTheme,
} from '@mui/material/styles';
import { MRT_TableBodyCell, Memo_MRT_TableBodyCell } from './MRT_TableBodyCell';
import { MRT_TableDetailPanel } from './MRT_TableDetailPanel';
import { parseFromValuesOrFunc } from '../column.utils';
import { getMRTTheme } from '../style.utils';
import {
  type MRT_Cell,
  type MRT_Row,
  type MRT_RowData,
  type MRT_TableInstance,
} from '../types';

interface Props<TData extends MRT_RowData> {
  columnVirtualizer?: Virtualizer<HTMLDivElement, HTMLTableCellElement>;
  measureElement?: (element: HTMLTableRowElement) => void;
  numRows?: number;
  pinnedRowIds?: string[];
  row: MRT_Row<TData>;
  rowIndex: number;
  table: MRT_TableInstance<TData>;
  virtualColumns?: VirtualItem[];
  virtualPaddingLeft?: number;
  virtualPaddingRight?: number;
  virtualRow?: VirtualItem;
}

export const MRT_TableBodyRow = <TData extends MRT_RowData>({
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
      memoMode,
      muiTableBodyRowProps,
      renderDetailPanel,
      rowPinningDisplayMode,
    },
    refs: { tableFooterRef, tableHeadRef },
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

  const {
    baseBackgroundColor,
    pinnedRowBackgroundColor,
    selectedRowBackgroundColor,
  } = getMRTTheme(table, theme);

  return (
    <>
      <TableRow
        data-index={virtualRow?.index}
        data-pinned={!!isPinned || undefined}
        data-selected={row.getIsSelected() || undefined}
        onDragEnter={handleDragEnter}
        ref={(node: HTMLTableRowElement) => {
          if (node) {
            rowRef.current = node;
            measureElement?.(node);
          }
        }}
        selected={row.getIsSelected()}
        {...tableRowProps}
        style={{
          transform: virtualRow
            ? `translateY(${virtualRow?.start}px)`
            : undefined,
          ...tableRowProps?.style,
        }}
        sx={(theme: Theme) => ({
          '&:hover td': {
            backgroundColor:
              tableRowProps?.hover !== false
                ? row.getIsSelected()
                  ? `${alpha(selectedRowBackgroundColor, 0.3)}`
                  : theme.palette.mode === 'dark'
                  ? `${lighten(baseBackgroundColor, 0.05)}`
                  : `${darken(baseBackgroundColor, 0.05)}`
                : undefined,
          },
          backgroundColor: `${baseBackgroundColor} !important`,
          bottom:
            !virtualRow && bottomPinnedIndex !== undefined && isPinned
              ? `${
                  bottomPinnedIndex * rowHeight +
                  (enableStickyFooter ? tableFooterHeight - 1 : 0)
                }px`
              : undefined,
          boxSizing: 'border-box',
          display: layoutMode?.startsWith('grid') ? 'flex' : undefined,
          opacity: isPinned
            ? 0.97
            : draggingRow?.id === row.id || hoveredRow?.id === row.id
            ? 0.5
            : 1,
          position: virtualRow
            ? 'absolute'
            : rowPinningDisplayMode?.includes('sticky') && isPinned
            ? 'sticky'
            : undefined,
          td: {
            backgroundColor: row.getIsSelected()
              ? selectedRowBackgroundColor
              : isPinned
              ? pinnedRowBackgroundColor
              : undefined,
          },
          top: virtualRow
            ? 0
            : topPinnedIndex !== undefined && isPinned
            ? `${
                topPinnedIndex * rowHeight +
                (enableStickyHeader || isFullScreen ? tableHeadHeight - 1 : 0)
              }px`
            : undefined,
          transition: virtualRow ? 'none' : 'all 150ms ease-in-out',
          width: '100%',
          zIndex:
            rowPinningDisplayMode?.includes('sticky') && isPinned
              ? 2
              : undefined,
          ...(sx as any),
        })}
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
            virtualIndex: columnVirtualizer
              ? (cellOrVirtualCell as VirtualItem).index
              : undefined,
          };
          return cell ? (
            memoMode === 'cells' &&
            cell.column.columnDef.columnDefType === 'data' &&
            !draggingColumn &&
            !draggingRow &&
            editingCell?.id !== cell.id &&
            editingRow?.id !== row.id ? (
              <Memo_MRT_TableBodyCell key={cell.id} {...props} />
            ) : (
              <MRT_TableBodyCell key={cell.id} {...props} />
            )
          ) : null;
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
