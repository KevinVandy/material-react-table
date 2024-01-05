import { useCallback, useMemo } from 'react';
import { type Range, useVirtualizer } from '@tanstack/react-virtual';
import {
  extraIndexRangeExtractor,
  parseFromValuesOrFunc,
} from '../column.utils';
import {
  type MRT_ColumnVirtualizer,
  type MRT_RowData,
  type MRT_TableInstance,
} from '../types';

export const useMRT_ColumnVirtualizer = <
  TData extends MRT_RowData,
  TScrollElement extends Element | Window = HTMLDivElement,
  TItemElement extends Element = HTMLTableCellElement,
>(
  table: MRT_TableInstance<TData>,
): MRT_ColumnVirtualizer | undefined => {
  const {
    getState,
    options: {
      columnVirtualizerInstanceRef,
      columnVirtualizerOptions,
      enableColumnPinning,
      enableColumnVirtualization,
    },
    refs: { tableContainerRef },
  } = table;
  const { columnPinning, columnVisibility, draggingColumn } = getState();

  const columnVirtualizerProps = parseFromValuesOrFunc(
    columnVirtualizerOptions,
    {
      table,
    },
  );

  const [leftPinnedIndexes, rightPinnedIndexes] = useMemo(
    () =>
      enableColumnVirtualization && enableColumnPinning
        ? [
            table.getLeftLeafColumns().map((c) => c.getPinnedIndex()),
            table
              .getRightLeafColumns()
              .map(
                (c) =>
                  table.getVisibleLeafColumns().length - c.getPinnedIndex() - 1,
              )
              .sort((a, b) => a - b),
          ]
        : [[], []],
    [columnPinning, enableColumnVirtualization, enableColumnPinning],
  );

  //get first 16 column widths and average them if calc is needed
  const averageColumnWidth = useMemo(() => {
    if (!enableColumnVirtualization || columnVirtualizerProps?.estimateSize) {
      return 0;
    }
    const columnsWidths =
      table
        .getRowModel()
        .rows[0]?.getCenterVisibleCells()
        ?.slice(0, 16)
        ?.map((cell) => cell.column.getSize() * 1.2) ?? [];
    return columnsWidths.reduce((a, b) => a + b, 0) / columnsWidths.length;
  }, [table.getRowModel().rows, columnPinning, columnVisibility]);

  const draggingColumnIndex = draggingColumn?.id
    ? table
        .getVisibleLeafColumns()
        .findIndex((c) => c.id === draggingColumn?.id)
    : undefined;

  const columnVirtualizer = enableColumnVirtualization
    ? (useVirtualizer({
        count: table.getVisibleLeafColumns().length,
        estimateSize: () => averageColumnWidth,
        getScrollElement: () => tableContainerRef.current,
        horizontal: true,
        overscan: 3,
        rangeExtractor: useCallback(
          (range: Range) => {
            const newIndexes = extraIndexRangeExtractor(
              range,
              draggingColumnIndex,
            );
            return [
              ...new Set([
                ...leftPinnedIndexes,
                ...newIndexes,
                ...rightPinnedIndexes,
              ]),
            ];
          },
          [leftPinnedIndexes, rightPinnedIndexes, draggingColumnIndex],
        ),
        ...columnVirtualizerProps,
      }) as unknown as MRT_ColumnVirtualizer<TScrollElement, TItemElement>)
    : undefined;

  if (columnVirtualizer) {
    const virtualColumns = columnVirtualizer.getVirtualItems();
    columnVirtualizer.virtualColumns = virtualColumns;
    if (virtualColumns.length) {
      columnVirtualizer.virtualPaddingLeft =
        (virtualColumns[leftPinnedIndexes.length]?.start ?? 0) -
        (virtualColumns[leftPinnedIndexes.length - 1]?.end ?? 0);
      columnVirtualizer.virtualPaddingRight =
        columnVirtualizer.getTotalSize() -
        (virtualColumns[virtualColumns.length - rightPinnedIndexes.length - 1]
          ?.end ?? 0) -
        (rightPinnedIndexes.length
          ? columnVirtualizer.getTotalSize() -
            (virtualColumns[virtualColumns.length - rightPinnedIndexes.length]
              ?.start ?? 0)
          : 0);
    }
    if (columnVirtualizerInstanceRef) {
      //@ts-ignore
      columnVirtualizerInstanceRef.current = columnVirtualizer;
    }
  }

  return columnVirtualizer as any;
};
