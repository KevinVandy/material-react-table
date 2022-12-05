import React, { FC, memo, useMemo } from 'react';
import { useVirtualizer, Virtualizer } from '@tanstack/react-virtual';
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
      localization,
      manualFiltering,
      manualSorting,
      memoMode,
      muiTableBodyProps,
    },
    refs: { tableContainerRef, tablePaperRef },
  } = table;
  const { columnFilters, globalFilter, pagination, sorting } = getState();

  const tableBodyProps =
    muiTableBodyProps instanceof Function
      ? muiTableBodyProps({ table })
      : muiTableBodyProps;

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

  const virtualizer: Virtualizer<any, any> = enableRowVirtualization
    ? useVirtualizer({
        getScrollElement: () => tableContainerRef?.current as HTMLDivElement,
        count: rows.length,
        estimateSize: () => 120,
        measureElement: (element) => element?.getBoundingClientRect().height,
        overscan: 12,
      })
    : ({} as any);

  const virtualRows = enableRowVirtualization
    ? virtualizer.getVirtualItems()
    : [];

  return (
    <TableBody
      sx={{
        height: enableRowVirtualization
          ? `${virtualizer.getTotalSize()}px`
          : 'inherit',
        width: '100%',
        position: 'relative',
      }}
      {...tableBodyProps}
    >
      {!rows.length ? (
        <tr>
          <td colSpan={table.getVisibleLeafColumns().length}>
            <Typography
              sx={{
                color: 'text.secondary',
                fontStyle: 'italic',
                maxWidth: `min(100vw, ${tablePaperRef.current?.clientWidth}px)`,
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
          {(enableRowVirtualization ? virtualRows : rows).map(
            (rowOrVirtualRow: any, rowIndex: number) => {
              const row = enableRowVirtualization
                ? (rows[rowOrVirtualRow.index] as MRT_Row)
                : (rowOrVirtualRow as MRT_Row);
              const props = {
                key: row.id,
                numRows: rows.length,
                row,
                rowIndex: enableRowVirtualization
                  ? rowOrVirtualRow.index
                  : rowIndex,
                table,
                virtualRow: enableRowVirtualization ? rowOrVirtualRow : null,
                virtualizer,
              };
              return memoMode === 'rows' ? (
                <Memo_MRT_TableBodyRow {...props} />
              ) : (
                <MRT_TableBodyRow {...props} />
              );
            },
          )}
        </>
      )}
    </TableBody>
  );
};

export const Memo_MRT_TableBody = memo(
  MRT_TableBody,
  (prev, next) => prev.table.options.data === next.table.options.data,
);
