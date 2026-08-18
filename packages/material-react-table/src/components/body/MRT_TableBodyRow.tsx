import { type DragEvent, memo, useMemo, useRef } from 'react';
import { type VirtualItem } from '@tanstack/react-virtual';
import TableRow, { type TableRowProps } from '@mui/material/TableRow';
import {
  type Theme,
  alpha,
  darken,
  lighten,
  useTheme,
} from '@mui/material/styles';
import { MRT_TableBodyCell, Memo_MRT_TableBodyCell } from './MRT_TableBodyCell';
import { MRT_TableDetailPanel } from './MRT_TableDetailPanel';
import {
  type MRT_Cell,
  type MRT_ColumnVirtualizer,
  type MRT_Row,
  type MRT_RowData,
  type MRT_RowVirtualizer,
  type MRT_TableInstance,
  type MRT_VirtualItem,
} from '../../types';
import { getIsRowSelected } from '../../utils/row.utils';
import {
  commonCellBeforeAfterStyles,
  getCommonPinnedCellStyles,
} from '../../utils/style.utils';
import { parseFromValuesOrFunc } from '../../utils/utils';

export interface MRT_TableBodyRowProps<TData extends MRT_RowData>
  extends TableRowProps {
  columnVirtualizer?: MRT_ColumnVirtualizer;
  numRows?: number;
  pinnedRowIds?: string[];
  row: MRT_Row<TData>;
  rowVirtualizer?: MRT_RowVirtualizer;
  staticRowIndex: number;
  table: MRT_TableInstance<TData>;
  virtualRow?: VirtualItem;
}

export const MRT_TableBodyRow = <TData extends MRT_RowData>({
  columnVirtualizer,
  numRows,
  pinnedRowIds,
  row,
  rowVirtualizer,
  staticRowIndex,
  table,
  virtualRow,
  ...rest
}: MRT_TableBodyRowProps<TData>) => {
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
      mrtTheme: {
        baseBackgroundColor,
        pinnedRowBackgroundColor,
        selectedRowBackgroundColor,
      },
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

  const visibleCells = row.getVisibleCells();

  const { virtualColumns, virtualPaddingLeft, virtualPaddingRight } =
    columnVirtualizer ?? {};

  const isRowSelected = getIsRowSelected({ row, table });
  const isRowPinned = enableRowPinning && row.getIsPinned();
  const isDraggingRow = draggingRow?.id === row.id;
  const isHoveredRow = hoveredRow?.id === row.id;

  const tableRowProps = {
    ...parseFromValuesOrFunc(muiTableBodyRowProps, {
      row,
      staticRowIndex,
      table,
    }),
    ...rest,
  };

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

  const defaultRowHeight =
    density === 'compact' ? 37 : density === 'comfortable' ? 53 : 69;

  const customRowHeight =
    // @ts-expect-error
    parseInt(tableRowProps?.style?.height ?? sx?.height, 10) || undefined;

  const rowHeight = customRowHeight || defaultRowHeight;

  const handleDragEnter = (_e: DragEvent) => {
    if (enableRowOrdering && draggingRow) {
      setHoveredRow(row);
    }
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
  };

  const rowRef = useRef<HTMLTableRowElement | null>(null);

  const cellHighlightColor = isRowSelected
    ? selectedRowBackgroundColor
    : isRowPinned
      ? pinnedRowBackgroundColor
      : undefined;

  const cellHighlightColorHover =
    tableRowProps?.hover !== false
      ? isRowSelected
        ? cellHighlightColor
        : theme.palette.mode === 'dark'
          ? `${lighten(baseBackgroundColor, 0.3)}`
          : `${darken(baseBackgroundColor, 0.3)}`
      : undefined;

  return (
    <>
      <TableRow
        data-index={renderDetailPanel ? staticRowIndex * 2 : staticRowIndex}
        data-pinned={!!isRowPinned || undefined}
        data-selected={isRowSelected || undefined}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        ref={(node: HTMLTableRowElement | null) => {
          rowRef.current = node;
          // ★null 必须透传给 virtualizer(2026-08-18 实测内存事故后改):
          // @tanstack/virtual 的 measureElement 只在**收到 null** 时才会遍历
          // elementsCache、把已断开的元素 unobserve 并从缓存里删掉 —— 那是它唯一的
          // 清扫入口。原先的 `if (node)` 守卫把这条路整个挡死,于是行卸载后
          // ResizeObserver 仍强引用着那个 <tr>,整棵行子树无法回收。
          // 实测(~500 行的表完整滚一遍,每次采样前强制 GC 只看存活):
          // 残留 14900 个游离节点、371 个监听器,反复滚动不再增长(每个 key 最多留一份)
          // 但也永不释放;手工补一次 measureElement(null) 当场全部释放。
          rowVirtualizer?.measureElement(node);
        }}
        selected={isRowSelected}
        {...tableRowProps}
        style={{
          transform: virtualRow
            ? `translateY(${virtualRow.start}px)`
            : undefined,
          ...tableRowProps?.style,
        }}
        sx={(theme: Theme) => ({
          '&:hover td:after': cellHighlightColorHover
            ? {
                backgroundColor: alpha(cellHighlightColorHover, 0.3),
                ...commonCellBeforeAfterStyles,
              }
            : undefined,
          backgroundColor: `${baseBackgroundColor} !important`,
          bottom:
            !virtualRow && bottomPinnedIndex !== undefined && isRowPinned
              ? `${
                  bottomPinnedIndex * rowHeight +
                  (enableStickyFooter ? tableFooterHeight - 1 : 0)
                }px`
              : undefined,
          boxSizing: 'border-box',
          display: layoutMode?.startsWith('grid') ? 'flex' : undefined,
          opacity: isRowPinned ? 0.97 : isDraggingRow || isHoveredRow ? 0.5 : 1,
          position: virtualRow
            ? 'absolute'
            : rowPinningDisplayMode?.includes('sticky') && isRowPinned
              ? 'sticky'
              : 'relative',
          td: {
            ...getCommonPinnedCellStyles({ table, theme }),
          },
          'td:after': cellHighlightColor
            ? {
                backgroundColor: cellHighlightColor,
                ...commonCellBeforeAfterStyles,
              }
            : undefined,
          top: virtualRow
            ? 0
            : topPinnedIndex !== undefined && isRowPinned
              ? `${
                  topPinnedIndex * rowHeight +
                  (enableStickyHeader || isFullScreen ? tableHeadHeight - 1 : 0)
                }px`
              : undefined,
          transition: virtualRow ? 'none' : 'all 150ms ease-in-out',
          width: '100%',
          zIndex:
            rowPinningDisplayMode?.includes('sticky') && isRowPinned ? 2 : 0,
          ...(sx as any),
        })}
      >
        {virtualPaddingLeft ? (
          <td style={{ display: 'flex', width: virtualPaddingLeft }} />
        ) : null}
        {(virtualColumns ?? visibleCells).map(
          (cellOrVirtualCell, staticColumnIndex) => {
            let cell = cellOrVirtualCell as MRT_Cell<TData>;
            if (columnVirtualizer) {
              staticColumnIndex = (cellOrVirtualCell as MRT_VirtualItem).index;
              cell = visibleCells[staticColumnIndex];
            }
            const props = {
              cell,
              numRows,
              rowRef,
              staticColumnIndex,
              staticRowIndex,
              table,
            };
            const key = `${cell.id}-${staticRowIndex}`;
            return cell ? (
              memoMode === 'cells' &&
              cell.column.columnDef.columnDefType === 'data' &&
              !draggingColumn &&
              !draggingRow &&
              editingCell?.id !== cell.id &&
              editingRow?.id !== row.id ? (
                <Memo_MRT_TableBodyCell key={key} {...props} />
              ) : (
                <MRT_TableBodyCell key={key} {...props} />
              )
            ) : null;
          },
        )}
        {virtualPaddingRight ? (
          <td style={{ display: 'flex', width: virtualPaddingRight }} />
        ) : null}
      </TableRow>
      {renderDetailPanel && !row.getIsGrouped() && (
        <MRT_TableDetailPanel
          parentRowRef={rowRef}
          row={row}
          rowVirtualizer={rowVirtualizer}
          staticRowIndex={staticRowIndex}
          table={table}
          virtualRow={virtualRow}
        />
      )}
    </>
  );
};

export const Memo_MRT_TableBodyRow = memo(
  MRT_TableBodyRow,
  (prev, next) =>
    prev.row === next.row && prev.staticRowIndex === next.staticRowIndex,
) as typeof MRT_TableBodyRow;
