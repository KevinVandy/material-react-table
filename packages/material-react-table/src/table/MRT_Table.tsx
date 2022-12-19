import React, { FC, useCallback, useMemo } from 'react';
import {
  defaultRangeExtractor,
  Range,
  useVirtualizer,
  Virtualizer,
} from '@tanstack/react-virtual';
import Table from '@mui/material/Table';
import { MRT_TableHead } from '../head/MRT_TableHead';
import { Memo_MRT_TableBody, MRT_TableBody } from '../body/MRT_TableBody';
import { MRT_TableFooter } from '../footer/MRT_TableFooter';
import { MRT_TableInstance } from '..';

interface Props {
  table: MRT_TableInstance;
}

export const MRT_Table: FC<Props> = ({ table }) => {
  const {
    getState,
    options: {
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
      muiTableProps,
    },
    refs: { tableContainerRef },
  } = table;
  const { isFullScreen, columnPinning, columnVisibility } = getState();

  const tableProps =
    muiTableProps instanceof Function
      ? muiTableProps({ table })
      : muiTableProps;

  const vProps =
    columnVirtualizerProps instanceof Function
      ? columnVirtualizerProps({ table })
      : columnVirtualizerProps;

  //get first 16 column widths and average them
  const averageColumnWidth = useMemo(() => {
    const columnsWidths =
      table
        .getRowModel()
        .rows[0]?.getCenterVisibleCells()
        ?.slice(0, 16)
        ?.map((cell) => cell.column.getSize() * 1.25) ?? [];
    return columnsWidths.reduce((a, b) => a + b, 0) / columnsWidths.length;
  }, [table.getRowModel().rows, columnPinning, columnVisibility]);

  const pinnedColumnIndexes = useMemo(
    () =>
      enableColumnVirtualization && enablePinning
        ? [
            ...table.getLeftFlatHeaders().map((h) => h.column.getPinnedIndex()),
            ...table
              .getRightFlatHeaders()
              .map(
                (h) =>
                  table.getVisibleFlatColumns().length -
                  h.column.getPinnedIndex() -
                  1,
              ),
          ]
        : [],
    [columnPinning, enableColumnVirtualization, enablePinning],
  );

  const columnVirtualizer:
    | Virtualizer<HTMLDivElement, HTMLTableCellElement>
    | undefined = enableColumnVirtualization
    ? useVirtualizer({
        count: table.getRowModel().rows[0].getVisibleCells().length,
        estimateSize: () => averageColumnWidth,
        getScrollElement: () => tableContainerRef.current,
        horizontal: true,
        measureElement: (element) => element?.getBoundingClientRect().width,
        overscan: 3,
        rangeExtractor: useCallback(
          (range: Range) =>
            [
              ...new Set([
                ...pinnedColumnIndexes,
                ...defaultRangeExtractor(range),
              ]),
            ].sort((a, b) => a - b),
          [pinnedColumnIndexes],
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
    virtualPaddingLeft = virtualColumns?.length
      ? virtualColumns[0]?.start || 0
      : 0;
    virtualPaddingRight = virtualColumns?.length
      ? columnVirtualizer.getTotalSize() -
        (virtualColumns[virtualColumns.length - 1]?.end || 0)
      : 0;
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
        display: layoutMode === 'grid' ? 'grid' : 'table',
        tableLayout:
          layoutMode !== 'grid' && enableColumnResizing ? 'fixed' : undefined,
        ...(tableProps?.sx instanceof Function
          ? tableProps.sx(theme)
          : (tableProps?.sx as any)),
      })}
    >
      {enableTableHead && <MRT_TableHead {...props} />}
      {memoMode === 'table-body' ? (
        <Memo_MRT_TableBody columnVirtualizer={columnVirtualizer} {...props} />
      ) : (
        <MRT_TableBody columnVirtualizer={columnVirtualizer} {...props} />
      )}
      {enableTableFooter && <MRT_TableFooter {...props} />}
    </Table>
  );
};
