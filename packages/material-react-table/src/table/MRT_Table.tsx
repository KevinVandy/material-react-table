import { useCallback, useMemo } from 'react';
import {
  type Range,
  type Virtualizer,
  useVirtualizer,
} from '@tanstack/react-virtual';
import Table, { type TableProps } from '@mui/material/Table';
import { MRT_TableBody, Memo_MRT_TableBody } from '../body/MRT_TableBody';
import {
  extraIndexRangeExtractor,
  parseFromValuesOrFunc,
} from '../column.utils';
import { MRT_TableFooter } from '../footer/MRT_TableFooter';
import { MRT_TableHead } from '../head/MRT_TableHead';
import { parseCSSVarId } from '../style.utils';
import { type MRT_RowData, type MRT_TableInstance } from '../types';

interface Props<TData extends MRT_RowData> extends TableProps {
  table: MRT_TableInstance<TData>;
}

export const MRT_Table = <TData extends MRT_RowData>({
  table,
  ...rest
}: Props<TData>) => {
  const {
    getFlatHeaders,
    getState,
    options: {
      columnVirtualizerInstanceRef,
      columnVirtualizerOptions,
      columns,
      enableColumnPinning,
      enableColumnVirtualization,
      enableStickyHeader,
      enableTableFooter,
      enableTableHead,
      layoutMode,
      memoMode,
      muiTableProps,
    },
    refs: { tableContainerRef },
  } = table;
  const {
    columnPinning,
    columnSizing,
    columnSizingInfo,
    columnVisibility,
    draggingColumn,
    isFullScreen,
  } = getState();

  const tableProps = {
    ...parseFromValuesOrFunc(muiTableProps, { table }),
    ...rest,
  };

  const columnVirtualizerProps = parseFromValuesOrFunc(
    columnVirtualizerOptions,
    { table },
  );

  const columnSizeVars = useMemo(() => {
    const headers = getFlatHeaders();
    const colSizes: { [key: string]: number } = {};
    for (let i = 0; i < headers.length; i++) {
      const header = headers[i];
      let colSize = header.getSize();
      if (header.subHeaders?.length)
        colSize = colSize * 1.05 + header.subHeaders.length * 2;
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

  const draggingColumnIndex = table
    .getVisibleLeafColumns()
    .findIndex((c) => c.id === draggingColumn?.id);

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
          (range: Range) => {
            const newIndexs = extraIndexRangeExtractor(
              range,
              draggingColumnIndex,
            );
            return [
              ...new Set([
                ...leftPinnedIndexes,
                ...newIndexs,
                ...rightPinnedIndexes,
              ]),
            ];
          },
          [leftPinnedIndexes, rightPinnedIndexes, draggingColumnIndex],
        ),
        ...columnVirtualizerProps,
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
      style={{ ...columnSizeVars, ...tableProps?.style }}
      sx={(theme) => ({
        borderCollapse: 'separate',
        display: layoutMode?.startsWith('grid') ? 'grid' : undefined,
        ...(parseFromValuesOrFunc(tableProps?.sx, theme) as any),
      })}
    >
      {enableTableHead && <MRT_TableHead {...props} />}
      {memoMode === 'table-body' || columnSizingInfo.isResizingColumn ? (
        <Memo_MRT_TableBody columnVirtualizer={columnVirtualizer} {...props} />
      ) : (
        <MRT_TableBody columnVirtualizer={columnVirtualizer} {...props} />
      )}
      {enableTableFooter && <MRT_TableFooter {...props} />}
    </Table>
  );
};
