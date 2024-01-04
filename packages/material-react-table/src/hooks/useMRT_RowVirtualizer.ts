import { useCallback } from 'react';
import {
  type Range,
  type Virtualizer,
  useVirtualizer,
} from '@tanstack/react-virtual';
import {
  extraIndexRangeExtractor,
  parseFromValuesOrFunc,
} from '../column.utils';
import {
  type MRT_Row,
  type MRT_RowData,
  type MRT_TableInstance,
} from '../types';

export const useMRT_RowVirtualizer = <
  TData extends MRT_RowData,
  TScrollElement extends Element | Window = HTMLDivElement,
  TItemElement extends Element = HTMLTableRowElement,
>(
  table: MRT_TableInstance<TData>,
  rows?: MRT_Row<TData>[],
): Virtualizer<TScrollElement, TItemElement> | undefined => {
  const {
    getRowModel,
    getState,
    options: {
      enableRowVirtualization,
      rowVirtualizerInstanceRef,
      rowVirtualizerOptions,
    },
    refs: { tableContainerRef },
  } = table;
  const { density, draggingRow } = getState();

  const rowVirtualizerProps = parseFromValuesOrFunc(rowVirtualizerOptions, {
    table,
  });

  const rowVirtualizer = enableRowVirtualization
    ? (useVirtualizer({
        count: rows?.length ?? getRowModel().rows.length,
        estimateSize: () =>
          density === 'compact' ? 37 : density === 'comfortable' ? 58 : 73,
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
      }) as unknown as Virtualizer<TScrollElement, TItemElement>)
    : undefined;

  if (rowVirtualizerInstanceRef && rowVirtualizer) {
    //@ts-ignore
    rowVirtualizerInstanceRef.current = rowVirtualizer;
  }

  return rowVirtualizer;
};
