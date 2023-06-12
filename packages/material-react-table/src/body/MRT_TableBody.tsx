import { memo, useMemo } from 'react';
import {
  useVirtualizer,
  type VirtualItem,
  type Virtualizer,
} from '@tanstack/react-virtual';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import { Memo_MRT_TableBodyRow, MRT_TableBodyRow } from './MRT_TableBodyRow';
import { rankGlobalFuzzy } from '../sortingFns';
import { type MRT_Row, type MRT_TableInstance } from '../types';

interface Props {
  columnVirtualizer?: Virtualizer<HTMLDivElement, HTMLTableCellElement>;
  table: MRT_TableInstance;
  virtualColumns?: VirtualItem[];
  virtualPaddingLeft?: number;
  virtualPaddingRight?: number;
}

export const MRT_TableBody = ({
  columnVirtualizer,
  table,
  virtualColumns,
  virtualPaddingLeft,
  virtualPaddingRight,
}: Props) => {
  const {
    getRowModel,
    getPrePaginationRowModel,
    getState,
    options: {
      enableGlobalFilterRankedResults,
      enablePagination,
      enableRowVirtualization,
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
      rowVirtualizerInstanceRef,
      rowVirtualizerProps,
      virtualizerInstanceRef,
      virtualizerProps,
    },
    refs: { tableContainerRef, tablePaperRef },
  } = table;
  const {
    columnFilters,
    density,
    expanded,
    globalFilter,
    globalFilterFn,
    pagination,
    sorting,
  } = getState();

  const tableBodyProps =
    muiTableBodyProps instanceof Function
      ? muiTableBodyProps({ table })
      : muiTableBodyProps;

  const vProps_old =
    virtualizerProps instanceof Function
      ? virtualizerProps({ table })
      : virtualizerProps;

  const vProps =
    rowVirtualizerProps instanceof Function
      ? rowVirtualizerProps({ table })
      : rowVirtualizerProps;

  const shouldRankResults = useMemo(
    () =>
      !manualExpanding &&
      !manualFiltering &&
      !manualGrouping &&
      !manualSorting &&
      enableGlobalFilterRankedResults &&
      globalFilter &&
      globalFilterFn === 'fuzzy' &&
      expanded !== true &&
      !Object.values(sorting).some(Boolean) &&
      !Object.values(expanded).some(Boolean),
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

  const rows = useMemo(() => {
    if (!shouldRankResults) return getRowModel().rows;
    const rankedRows = getPrePaginationRowModel().rows.sort((a, b) =>
      rankGlobalFuzzy(a, b),
    );
    if (enablePagination && !manualPagination) {
      const start = pagination.pageIndex * pagination.pageSize;
      return rankedRows.slice(start, start + pagination.pageSize);
    }
    return rankedRows;
  }, [
    shouldRankResults,
    shouldRankResults ? getPrePaginationRowModel().rows : getRowModel().rows,
    pagination.pageIndex,
    pagination.pageSize,
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
        ...vProps_old,
        ...vProps,
      })
    : undefined;

  if (rowVirtualizerInstanceRef && rowVirtualizer) {
    rowVirtualizerInstanceRef.current = rowVirtualizer;
  }

  //deprecated
  if (virtualizerInstanceRef && rowVirtualizer) {
    virtualizerInstanceRef.current = rowVirtualizer;
  }

  const virtualRows = rowVirtualizer
    ? rowVirtualizer.getVirtualItems()
    : undefined;

  return (
    <TableBody
      {...tableBodyProps}
      sx={(theme) => ({
        display: layoutMode === 'grid' ? 'grid' : 'table-row-group',
        height: rowVirtualizer
          ? `${rowVirtualizer.getTotalSize()}px`
          : 'inherit',
        minHeight: !rows.length ? '100px' : undefined,
        position: 'relative',
        ...(tableBodyProps?.sx instanceof Function
          ? tableBodyProps?.sx(theme)
          : (tableBodyProps?.sx as any)),
      })}
    >
      {tableBodyProps?.children ??
        (!rows.length ? (
          <tr style={{ display: layoutMode === 'grid' ? 'grid' : 'table-row' }}>
            <td
              colSpan={table.getVisibleLeafColumns().length}
              style={{
                display: layoutMode === 'grid' ? 'grid' : 'table-cell',
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
                : (rowOrVirtualRow as MRT_Row);
              const props = {
                columnVirtualizer,
                measureElement: rowVirtualizer?.measureElement,
                numRows: rows.length,
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
  );
};

export const Memo_MRT_TableBody = memo(
  MRT_TableBody,
  (prev, next) => prev.table.options.data === next.table.options.data,
);
