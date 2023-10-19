import { memo, useCallback, useMemo } from 'react';
import {
  type Range,
  type VirtualItem,
  type Virtualizer,
  useVirtualizer,
} from '@tanstack/react-virtual';
import TableBody, { type TableBodyProps } from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import { MRT_TableBodyRow, Memo_MRT_TableBodyRow } from './MRT_TableBodyRow';
import {
  extraIndexRangeExtractor,
  getCanRankRows,
  parseFromValuesOrFunc,
} from '../column.utils';
import { rankGlobalFuzzy } from '../sortingFns';
import {
  type MRT_Row,
  type MRT_RowData,
  type MRT_TableInstance,
} from '../types';

interface Props<TData extends MRT_RowData> extends TableBodyProps {
  columnVirtualizer?: Virtualizer<HTMLDivElement, HTMLTableCellElement>;
  table: MRT_TableInstance<TData>;
  virtualColumns?: VirtualItem[];
  virtualPaddingLeft?: number;
  virtualPaddingRight?: number;
}

export const MRT_TableBody = <TData extends MRT_RowData>({
  columnVirtualizer,
  table,
  virtualColumns,
  virtualPaddingLeft,
  virtualPaddingRight,
  ...rest
}: Props<TData>) => {
  const {
    getBottomRows,
    getCenterRows,
    getIsSomeRowsPinned,
    getPrePaginationRowModel,
    getRowModel,
    getState,
    getTopRows,
    options: {
      createDisplayMode,
      enableGlobalFilterRankedResults,
      enablePagination,
      enableRowPinning,
      enableRowVirtualization,
      enableStickyFooter,
      enableStickyHeader,
      layoutMode,
      localization,
      manualExpanding,
      manualFiltering,
      manualGrouping,
      manualPagination,
      manualSorting,
      memoMode,
      muiTableBodyProps,
      renderEmptyRowsFallback,
      rowPinningDisplayMode,
      rowVirtualizerInstanceRef,
      rowVirtualizerOptions,
    },
    refs: { tableContainerRef, tableFooterRef, tableHeadRef, tablePaperRef },
  } = table;
  const {
    columnFilters,
    creatingRow,
    density,
    draggingRow,
    expanded,
    globalFilter,
    isFullScreen,
    pagination,
    rowPinning,
    sorting,
  } = getState();

  const tableBodyProps = {
    ...parseFromValuesOrFunc(muiTableBodyProps, { table }),
    ...rest,
  };
  const rowVirtualizerProps = parseFromValuesOrFunc(rowVirtualizerOptions, {
    table,
  });

  const tableHeadHeight =
    ((enableStickyHeader || isFullScreen) &&
      tableHeadRef.current?.clientHeight) ||
    0;
  const tableFooterHeight =
    (enableStickyFooter && tableFooterRef.current?.clientHeight) || 0;

  const shouldRankRows = useMemo(
    () =>
      getCanRankRows(table) &&
      !Object.values(sorting).some(Boolean) &&
      globalFilter,
    [
      enableGlobalFilterRankedResults,
      expanded,
      globalFilter,
      manualExpanding,
      manualFiltering,
      manualGrouping,
      manualSorting,
      sorting,
    ],
  );

  const pinnedRowIds = useMemo(
    () =>
      getRowModel()
        .rows.filter((row) => row.getIsPinned())
        .map((r) => r.id),
    [rowPinning, table.getRowModel().rows],
  );

  const rows = useMemo(() => {
    let rows: MRT_Row<TData>[] = [];
    if (!shouldRankRows) {
      rows =
        !enableRowPinning || rowPinningDisplayMode?.includes('sticky')
          ? getRowModel().rows
          : getCenterRows();
    } else {
      rows = getPrePaginationRowModel().rows.sort((a, b) =>
        rankGlobalFuzzy(a, b),
      );
      if (enablePagination && !manualPagination) {
        const start = pagination.pageIndex * pagination.pageSize;
        rows = rows.slice(start, start + pagination.pageSize);
      }
    }
    if (enableRowPinning && rowPinningDisplayMode?.includes('sticky')) {
      rows = [
        ...getTopRows().filter((row) => !pinnedRowIds.includes(row.id)),
        ...rows,
        ...getBottomRows().filter((row) => !pinnedRowIds.includes(row.id)),
      ];
    }

    return rows;
  }, [
    shouldRankRows,
    shouldRankRows ? getPrePaginationRowModel().rows : getRowModel().rows,
    pagination.pageIndex,
    pagination.pageSize,
    rowPinning,
  ]);

  const rowVirtualizer:
    | Virtualizer<HTMLDivElement, HTMLTableRowElement>
    | undefined = enableRowVirtualization
    ? useVirtualizer({
        count: rows.length,
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
      })
    : undefined;

  if (rowVirtualizerInstanceRef && rowVirtualizer) {
    rowVirtualizerInstanceRef.current = rowVirtualizer;
  }

  const virtualRows = rowVirtualizer
    ? rowVirtualizer.getVirtualItems()
    : undefined;

  return (
    <>
      {!rowPinningDisplayMode?.includes('sticky') &&
        getIsSomeRowsPinned('top') && (
          <TableBody
            {...tableBodyProps}
            sx={(theme) => ({
              display: layoutMode?.startsWith('grid') ? 'grid' : undefined,
              position: 'sticky',
              top: tableHeadHeight - 1,
              zIndex: 1,
              ...(parseFromValuesOrFunc(tableBodyProps?.sx, theme) as any),
            })}
          >
            {getTopRows().map((row, rowIndex) => {
              const props = {
                columnVirtualizer,
                measureElement: rowVirtualizer?.measureElement,
                numRows: rows.length,
                row,
                rowIndex,
                table,
                virtualColumns,
                virtualPaddingLeft,
                virtualPaddingRight,
              };
              return memoMode === 'rows' ? (
                <Memo_MRT_TableBodyRow key={row.id} {...props} />
              ) : (
                <MRT_TableBodyRow key={row.id} {...props} />
              );
            })}
          </TableBody>
        )}
      <TableBody
        {...tableBodyProps}
        sx={(theme) => ({
          display: layoutMode?.startsWith('grid') ? 'grid' : undefined,
          height: rowVirtualizer
            ? `${rowVirtualizer.getTotalSize()}px`
            : 'inherit',
          minHeight: !rows.length ? '100px' : undefined,
          position: 'relative',
          ...(parseFromValuesOrFunc(tableBodyProps?.sx, theme) as any),
        })}
      >
        {creatingRow && createDisplayMode === 'row' && (
          <MRT_TableBodyRow row={creatingRow} rowIndex={-1} table={table} />
        )}
        {tableBodyProps?.children ??
          (!rows.length ? (
            <tr
              style={{
                display: layoutMode?.startsWith('grid') ? 'grid' : undefined,
              }}
            >
              <td
                colSpan={table.getVisibleLeafColumns().length}
                style={{
                  display: layoutMode?.startsWith('grid') ? 'grid' : undefined,
                }}
              >
                {renderEmptyRowsFallback?.({ table }) ?? (
                  <Typography
                    sx={{
                      color: 'text.secondary',
                      fontStyle: 'italic',
                      maxWidth: `min(100vw, ${
                        tablePaperRef.current?.clientWidth ?? 360
                      }px)`,
                      py: '2rem',
                      textAlign: 'center',
                      width: '100%',
                    }}
                  >
                    {globalFilter || columnFilters.length
                      ? localization.noResultsFound
                      : localization.noRecordsToDisplay}
                  </Typography>
                )}
              </td>
            </tr>
          ) : (
            <>
              {(virtualRows ?? rows).map((rowOrVirtualRow, rowIndex) => {
                const row = rowVirtualizer
                  ? rows[rowOrVirtualRow.index]
                  : (rowOrVirtualRow as MRT_Row<TData>);
                const props = {
                  columnVirtualizer,
                  measureElement: rowVirtualizer?.measureElement,
                  numRows: rows.length,
                  pinnedRowIds,
                  row,
                  rowIndex: rowVirtualizer ? rowOrVirtualRow.index : rowIndex,
                  table,
                  virtualColumns,
                  virtualPaddingLeft,
                  virtualPaddingRight,
                  virtualRow: rowVirtualizer
                    ? (rowOrVirtualRow as VirtualItem)
                    : undefined,
                };
                return memoMode === 'rows' ? (
                  <Memo_MRT_TableBodyRow key={row.id} {...props} />
                ) : (
                  <MRT_TableBodyRow key={row.id} {...props} />
                );
              })}
            </>
          ))}
      </TableBody>
      {!rowPinningDisplayMode?.includes('sticky') &&
        getIsSomeRowsPinned('bottom') && (
          <TableBody
            {...tableBodyProps}
            sx={(theme) => ({
              bottom: tableFooterHeight - 1,
              display: layoutMode?.startsWith('grid') ? 'grid' : undefined,
              position: 'sticky',
              zIndex: 1,
              ...(parseFromValuesOrFunc(tableBodyProps?.sx, theme) as any),
            })}
          >
            {getBottomRows().map((row, rowIndex) => {
              const props = {
                columnVirtualizer,
                measureElement: rowVirtualizer?.measureElement,
                numRows: rows.length,
                row,
                rowIndex,
                table,
                virtualColumns,
                virtualPaddingLeft,
                virtualPaddingRight,
              };
              return memoMode === 'rows' ? (
                <Memo_MRT_TableBodyRow key={row.id} {...props} />
              ) : (
                <MRT_TableBodyRow key={row.id} {...props} />
              );
            })}
          </TableBody>
        )}
    </>
  );
};

export const Memo_MRT_TableBody = memo(
  MRT_TableBody,
  (prev, next) => prev.table.options.data === next.table.options.data,
) as typeof MRT_TableBody;
