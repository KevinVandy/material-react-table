import React, { FC, memo, useMemo } from 'react';
import {
  useVirtualizer,
  Virtualizer,
  VirtualItem,
} from '@tanstack/react-virtual';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import { Memo_MRT_TableBodyRow, MRT_TableBodyRow } from './MRT_TableBodyRow';
import { rankGlobalFuzzy } from '../sortingFns';
import type { MRT_Row, MRT_TableInstance } from '..';

interface Props {
  table: MRT_TableInstance;
}

export const MRT_TableBody: FC<Props> = ({ table }) => {
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
      manualFiltering,
      manualSorting,
      memoMode,
      muiTableBodyProps,
      virtualizerInstanceRef,
      virtualizerProps,
    },
    refs: { tableContainerRef, tablePaperRef },
  } = table;
  const { columnFilters, density, globalFilter, pagination, sorting } =
    getState();

  const tableBodyProps =
    muiTableBodyProps instanceof Function
      ? muiTableBodyProps({ table })
      : muiTableBodyProps;

  const vProps =
    virtualizerProps instanceof Function
      ? virtualizerProps({ table })
      : virtualizerProps;

  const rows = useMemo(() => {
    if (
      enableGlobalFilterRankedResults &&
      globalFilter &&
      !manualFiltering &&
      !manualSorting &&
      !Object.values(sorting).some(Boolean)
    ) {
      const rankedRows = getPrePaginationRowModel().rows.sort((a, b) =>
        rankGlobalFuzzy(a, b),
      );
      if (enablePagination) {
        const start = pagination.pageIndex * pagination.pageSize;
        return rankedRows.slice(start, start + pagination.pageSize);
      }
      return rankedRows;
    }

    return enablePagination
      ? getRowModel().rows
      : getPrePaginationRowModel().rows;
  }, [
    enableGlobalFilterRankedResults,
    (enableGlobalFilterRankedResults && globalFilter) || !enablePagination
      ? getPrePaginationRowModel().rows
      : getRowModel().rows,
    globalFilter,
    pagination.pageIndex,
    pagination.pageSize,
  ]);

  const virtualizer:
    | Virtualizer<HTMLDivElement, HTMLTableRowElement>
    | undefined = enableRowVirtualization
    ? useVirtualizer({
        count: rows.length,
        estimateSize: () =>
          density === 'compact' ? 37 : density === 'comfortable' ? 58 : 73,
        getScrollElement: () => tableContainerRef.current,
        measureElement: (element) => element?.getBoundingClientRect().height,
        overscan: 10,
        ...vProps,
      })
    : undefined;

  if (virtualizerInstanceRef && virtualizer) {
    virtualizerInstanceRef.current = virtualizer;
  }

  const virtualRows = virtualizer ? virtualizer.getVirtualItems() : undefined;

  return (
    <TableBody
      {...tableBodyProps}
      sx={(theme) => ({
        display: layoutMode === 'grid' ? 'grid' : 'table-row-group',
        height: virtualizer ? `${virtualizer.getTotalSize()}px` : 'inherit',
        position: 'relative',
        ...(tableBodyProps?.sx instanceof Function
          ? tableBodyProps?.sx(theme)
          : (tableBodyProps?.sx as any)),
      })}
    >
      {tableBodyProps?.children ?? !rows.length ? (
        <tr style={{ display: layoutMode === 'grid' ? 'grid' : 'table-row' }}>
          <td
            colSpan={table.getVisibleLeafColumns().length}
            style={{ display: layoutMode === 'grid' ? 'grid' : 'table-cell' }}
          >
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
          </td>
        </tr>
      ) : (
        <>
          {(virtualRows ?? rows).map((rowOrVirtualRow, rowIndex) => {
            const row = virtualizer
              ? rows[rowOrVirtualRow.index]
              : (rowOrVirtualRow as MRT_Row);
            const props = {
              key: row.id,
              measureElement: virtualizer
                ? virtualizer.measureElement
                : undefined,
              numRows: rows.length,
              row,
              rowIndex: virtualizer ? rowOrVirtualRow.index : rowIndex,
              table,
              virtualRow: virtualizer
                ? (rowOrVirtualRow as VirtualItem)
                : undefined,
            };
            return memoMode === 'rows' ? (
              <Memo_MRT_TableBodyRow {...props} />
            ) : (
              <MRT_TableBodyRow {...props} />
            );
          })}
        </>
      )}
    </TableBody>
  );
};

export const Memo_MRT_TableBody = memo(
  MRT_TableBody,
  (prev, next) => prev.table.options.data === next.table.options.data,
);
