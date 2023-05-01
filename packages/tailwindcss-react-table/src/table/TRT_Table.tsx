import React, { useCallback, useMemo } from 'react';
import {
  defaultRangeExtractor,
  useVirtualizer,
  type Range,
  type Virtualizer,
} from '@tanstack/react-virtual';
import Table from '@mui/material/Table';
import { TRT_TableHead } from '../head/TRT_TableHead';
import { Memo_TRT_TableBody, TRT_TableBody } from '../body/TRT_TableBody';
import { TRT_TableFooter } from '../footer/TRT_TableFooter';
import { parseCSSVarId } from '../column.utils';
import type { TRT_TableInstance } from '../TailwindCSSReactTable.types';

interface Props {
  table: TRT_TableInstance;
}

export const TRT_Table = ({ table }: Props) => {
  const {
    getFlatHeaders,
    getState,
    options: {
      columns,
      columnVirtualizerInstanceRef,
      columnVirtualizerProps,
      enableColumnResizing,
      enableColumnVirtualization,
      enablePinning,
      enableStickyHeader,
      enableTableFooter,
      enableTableHead,
      layoutMode,
      memoMode,
    },
    refs: { tableContainerRef },
  } = table;
  const {
    columnPinning,
    columnSizing,
    columnSizingInfo,
    columnVisibility,
    isFullScreen,
  } = getState();

  let {
    options: { tableProps },
  } = table;
  tableProps =
    tableProps instanceof Function ? tableProps({ table }) : tableProps;

  const vProps =
    columnVirtualizerProps instanceof Function
      ? columnVirtualizerProps({ table })
      : columnVirtualizerProps;

  const columnSizeVars = useMemo(() => {
    const headers = getFlatHeaders();
    const colSizes: { [key: string]: number } = {};
    for (let i = 0; i < headers.length; i++) {
      const header = headers[i];
      const colSize = header.getSize();
      colSizes[`--header-${parseCSSVarId(header.id)}-size`] = colSize;
      colSizes[`--col-${parseCSSVarId(header.column.id)}-size`] = colSize;
    }
    return colSizes;
  }, [columns, columnSizing, columnSizingInfo, columnVisibility]);

  //get first 16 column widths and average them
  const averageColumnWidth = useMemo(() => {
    if (!enableColumnVirtualization) return 0;
    const columnsWidths =
      table
        .getRowModel()
        .rows[0]?.getCenterVisibleCells()
        ?.slice(0, 16)
        ?.map((cell) => cell.column.getSize() * 1.2) ?? [];
    return columnsWidths.reduce((a, b) => a + b, 0) / columnsWidths.length;
  }, [table.getRowModel().rows, columnPinning, columnVisibility]);

  const [leftPinnedIndexes, rightPinnedIndexes] = useMemo(
    () =>
      enableColumnVirtualization && enablePinning
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
    [columnPinning, enableColumnVirtualization, enablePinning],
  );

  const columnVirtualizer:
    | Virtualizer<HTMLDivElement, HTMLTableCellElement>
    | undefined = enableColumnVirtualization
    ? useVirtualizer({
        count: table.getVisibleLeafColumns().length,
        estimateSize: () => averageColumnWidth,
        getScrollElement: () => tableContainerRef.current,
        horizontal: true,
        overscan: 3,
        rangeExtractor: useCallback(
          (range: Range) => [
            ...new Set([
              ...leftPinnedIndexes,
              ...defaultRangeExtractor(range),
              ...rightPinnedIndexes,
            ]),
          ],
          [leftPinnedIndexes, rightPinnedIndexes],
        ),
        ...vProps,
      })
    : undefined;

  if (columnVirtualizerInstanceRef && columnVirtualizer) {
    columnVirtualizerInstanceRef.current = columnVirtualizer;
  }

  const virtualColumns = columnVirtualizer
    ? columnVirtualizer.getVirtualItems()
    : undefined;

  let virtualPaddingLeft: number | undefined;
  let virtualPaddingRight: number | undefined;

  if (columnVirtualizer && virtualColumns?.length) {
    virtualPaddingLeft = virtualColumns[leftPinnedIndexes.length]?.start ?? 0;
    virtualPaddingRight =
      columnVirtualizer.getTotalSize() -
      (virtualColumns[virtualColumns.length - 1 - rightPinnedIndexes.length]
        ?.end ?? 0);
  }

  const props = {
    table,
    virtualColumns,
    virtualPaddingLeft,
    virtualPaddingRight,
  };

  return (
    <Table
      stickyHeader={enableStickyHeader || isFullScreen}
      {...tableProps}
      sx={(theme) => ({
        borderCollapse: 'separate',
        display: layoutMode === 'grid' ? 'grid' : 'table',
        tableLayout:
          layoutMode !== 'grid' && enableColumnResizing ? 'fixed' : undefined,
        ...(tableProps?.sx instanceof Function
          ? tableProps.sx(theme)
          : (tableProps?.sx as any)),
      })}
      style={{ ...columnSizeVars, ...tableProps?.style }}
    >
      {enableTableHead && <TRT_TableHead {...props} />}
      {memoMode === 'table-body' || columnSizingInfo.isResizingColumn ? (
        <Memo_TRT_TableBody columnVirtualizer={columnVirtualizer} {...props} />
      ) : (
        <TRT_TableBody columnVirtualizer={columnVirtualizer} {...props} />
      )}
      {enableTableFooter && <TRT_TableFooter {...props} />}
    </Table>
  );
};
