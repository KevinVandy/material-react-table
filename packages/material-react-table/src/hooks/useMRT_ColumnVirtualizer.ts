import { useCallback, useMemo } from 'react';
import { type Range, useVirtualizer } from '@tanstack/react-virtual';
import {
  type MRT_ColumnVirtualizer,
  type MRT_RowData,
  type MRT_TableInstance,
} from '../types';
import { parseFromValuesOrFunc } from '../utils/utils';
import { extraIndexRangeExtractor } from '../utils/virtualization.utils';

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

  if (!enableColumnVirtualization) return undefined;

  const columnVirtualizerProps = parseFromValuesOrFunc(
    columnVirtualizerOptions,
    {
      table,
    },
  );

  const visibleColumns = table.getVisibleLeafColumns();

  const [leftPinnedIndexes, rightPinnedIndexes] = useMemo(
    () =>
      enableColumnPinning
        ? [
            table.getLeftVisibleLeafColumns().map((c) => c.getPinnedIndex()),
            table
              .getRightVisibleLeafColumns()
              .map(
                (column) => visibleColumns.length - column.getPinnedIndex() - 1,
              )
              .sort((a, b) => a - b),
          ]
        : [[], []],
    [columnPinning, columnVisibility, enableColumnPinning],
  );

  const numPinnedLeft = leftPinnedIndexes.length;
  const numPinnedRight = rightPinnedIndexes.length;

  const draggingColumnIndex = useMemo(
    () =>
      draggingColumn?.id
        ? visibleColumns.findIndex((c) => c.id === draggingColumn?.id)
        : undefined,
    [draggingColumn?.id],
  );

  const columnVirtualizer = useVirtualizer({
    count: visibleColumns.length,
    estimateSize: (index) => visibleColumns[index].getSize(),
    getScrollElement: () => tableContainerRef.current,
    horizontal: true,
    overscan: 3,
    rangeExtractor: useCallback(
      (range: Range) => {
        const newIndexes = extraIndexRangeExtractor(range, draggingColumnIndex);
        if (!numPinnedLeft && !numPinnedRight) {
          return newIndexes;
        }
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
  }) as unknown as MRT_ColumnVirtualizer<TScrollElement, TItemElement>;

  const virtualColumns = columnVirtualizer.getVirtualItems();
  columnVirtualizer.virtualColumns = virtualColumns;
  const numColumns = virtualColumns.length;

  if (numColumns) {
    const totalSize = columnVirtualizer.getTotalSize();

    const leftNonPinnedStart = virtualColumns[numPinnedLeft]?.start || 0;
    const leftNonPinnedEnd =
      virtualColumns[leftPinnedIndexes.length - 1]?.end || 0;

    const rightNonPinnedStart =
      virtualColumns[numColumns - numPinnedRight]?.start || 0;
    const rightNonPinnedEnd =
      virtualColumns[numColumns - numPinnedRight - 1]?.end || 0;

    columnVirtualizer.virtualPaddingLeft =
      leftNonPinnedStart - leftNonPinnedEnd;

    columnVirtualizer.virtualPaddingRight =
      totalSize -
      rightNonPinnedEnd -
      (numPinnedRight ? totalSize - rightNonPinnedStart : 0);
  }

  if (columnVirtualizerInstanceRef) {
    //@ts-ignore
    columnVirtualizerInstanceRef.current = columnVirtualizer;
  }

  return columnVirtualizer as any;
};
