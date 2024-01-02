import { useCallback, useMemo } from 'react';
import {
  type Range,
  type Virtualizer,
  useVirtualizer,
} from '@tanstack/react-virtual';
import {
  extraIndexRangeExtractor,
  parseFromValuesOrFunc,
} from '../column.utils';
import { type MRT_RowData, type MRT_TableInstance } from '../types';

export const useMRT_ColumnVirtualizer = <
  TData extends MRT_RowData,
  TScrollElement extends Element | Window = HTMLDivElement,
  TItemElement extends Element = HTMLTableCellElement,
>(
  table: MRT_TableInstance<TData>,
):
  | (Virtualizer<TScrollElement, TItemElement> & {
      virtualPaddingLeft?: number;
      virtualPaddingRight?: number;
    })
  | undefined => {
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
              ),
          ]
        : [[], []],
    [columnPinning, enableColumnVirtualization, enableColumnPinning],
  );

  //get first 16 column widths and average them if calc is needed
  const averageColumnWidth = useMemo(() => {
    if (!enableColumnVirtualization || columnVirtualizerProps?.estimateSize)
      return 0;
    const columnsWidths =
      table
        .getRowModel()
        .rows[0]?.getCenterVisibleCells()
        ?.slice(0, 16)
        ?.map((cell) => cell.column.getSize() * 1.2) ?? [];
    return columnsWidths.reduce((a, b) => a + b, 0) / columnsWidths.length;
  }, [table.getRowModel().rows, columnPinning, columnVisibility]);

  const draggingColumnIndex = table
    .getVisibleLeafColumns()
    .findIndex((c) => c.id === draggingColumn?.id);

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
      }) as unknown as Virtualizer<TScrollElement, TItemElement>)
    : undefined;

  if (columnVirtualizerInstanceRef && columnVirtualizer) {
    //@ts-ignore
    columnVirtualizerInstanceRef.current = columnVirtualizer;
  }

  const virtualColumns = columnVirtualizer
    ? columnVirtualizer.getVirtualItems()
    : undefined;

  if (columnVirtualizer && virtualColumns?.length) {
    // @ts-ignore
    columnVirtualizer.virtualPaddingLeft =
      virtualColumns[leftPinnedIndexes!.length]?.start ?? 0;
    // @ts-ignore
    columnVirtualizer.virtualPaddingRight =
      columnVirtualizer.getTotalSize() -
      (virtualColumns[virtualColumns.length - 1 - rightPinnedIndexes!.length]
        ?.end ?? 0);
  }

  return columnVirtualizer as any;
};
