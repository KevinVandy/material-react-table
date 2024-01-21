import { useCallback } from 'react';
import { type Range, useVirtualizer } from '@tanstack/react-virtual';
import {
  type MRT_Row,
  type MRT_RowData,
  type MRT_RowVirtualizer,
  type MRT_TableInstance,
} from '../types';
import { parseFromValuesOrFunc } from '../utils/utils';
import { extraIndexRangeExtractor } from '../utils/virtualization.utils';

export const useMRT_RowVirtualizer = <
  TData extends MRT_RowData,
  TScrollElement extends Element | Window = HTMLDivElement,
  TItemElement extends Element = HTMLTableRowElement,
>(
  table: MRT_TableInstance<TData>,
  rows?: MRT_Row<TData>[],
): MRT_RowVirtualizer<TScrollElement, TItemElement> | undefined => {
  const {
    getRowModel,
    getState,
    options: {
      enableRowVirtualization,
      renderDetailPanel,
      rowVirtualizerInstanceRef,
      rowVirtualizerOptions,
    },
    refs: { tableContainerRef },
  } = table;
  const { density, draggingRow, expanded } = getState();

  if (!enableRowVirtualization) return undefined;

  const rowVirtualizerProps = parseFromValuesOrFunc(rowVirtualizerOptions, {
    table,
  });

  const rowCount = rows?.length ?? getRowModel().rows.length;

  const normalRowHeight =
    density === 'compact' ? 37 : density === 'comfortable' ? 58 : 73;

  const rowVirtualizer = useVirtualizer({
    count: renderDetailPanel ? rowCount * 2 : rowCount,
    estimateSize: (index) =>
      renderDetailPanel && index % 2 === 1
        ? expanded === true
          ? 100
          : 0
        : normalRowHeight,
    getScrollElement: () => tableContainerRef.current,
    measureElement:
      typeof window !== 'undefined' &&
      navigator.userAgent.indexOf('Firefox') === -1
        ? (element) => element?.getBoundingClientRect().height
        : undefined,
    overscan: 4,
    rangeExtractor: useCallback(
      (range: Range) => {
        return extraIndexRangeExtractor(range, draggingRow?.index ?? 0);
      },
      [draggingRow],
    ),
    ...rowVirtualizerProps,
  }) as unknown as MRT_RowVirtualizer<TScrollElement, TItemElement>;

  rowVirtualizer.virtualRows = rowVirtualizer.getVirtualItems();

  if (rowVirtualizerInstanceRef) {
    //@ts-ignore
    rowVirtualizerInstanceRef.current = rowVirtualizer;
  }

  return rowVirtualizer;
};
