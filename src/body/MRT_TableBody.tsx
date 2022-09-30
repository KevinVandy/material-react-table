import React, { FC, memo, useMemo } from 'react';
import { useVirtual } from 'react-virtual'; //stuck on v2 for now
// import { useVirtualizer, Virtualizer } from '@tanstack/react-virtual';
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
      virtualizerInstanceRef,
      virtualizerProps,
    },
    refs: { tableContainerRef, tablePaperRef },
  } = table;
  const { columnFilters, globalFilter, pagination, sorting } = getState();

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

  const virtualizer = enableRowVirtualization
    ? useVirtual({
        size: rows.length,
        parentRef: tableContainerRef,
        overscan: 15,
        ...vProps,
      })
    : ({} as any);

  if (virtualizerInstanceRef) {
    virtualizerInstanceRef.current = virtualizer;
  }

  // const virtualizer: Virtualizer = enableRowVirtualization
  //   ? useVirtualizer({
  //       count: rows.length,
  //       estimateSize: () => (density === 'compact' ? 25 : 50),
  //       getScrollElement: () => tableContainerRef.current as HTMLDivElement,
  //       overscan: 15,
  //       ...vProps,
  //     })
  //   : ({} as any);

  const virtualRows = enableRowVirtualization ? virtualizer.virtualItems : [];

  // const virtualRows = enableRowVirtualization
  //   ? virtualizer.getVirtualItems()
  //   : [];

  let paddingTop = 0;
  let paddingBottom = 0;
  if (enableRowVirtualization) {
    paddingTop = virtualRows.length ? virtualRows[0].start : 0;
    paddingBottom = virtualRows.length
      ? virtualizer.totalSize - virtualRows[virtualRows.length - 1].end
      : 0;
  }
  // if (enableRowVirtualization) {
  //   paddingTop = !!virtualRows.length ? virtualRows[0].start : 0;
  //   paddingBottom = !!virtualRows.length
  //     ? virtualizer.getTotalSize() - virtualRows[virtualRows.length - 1].end
  //     : 0;
  // }

  return (
    <TableBody {...tableBodyProps}>
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
          {enableRowVirtualization && paddingTop > 0 && (
            <tr>
              <td style={{ height: `${paddingTop}px` }} />
            </tr>
          )}
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
              };
              return memoMode === 'rows' ? (
                <Memo_MRT_TableBodyRow {...props} />
              ) : (
                <MRT_TableBodyRow {...props} />
              );
            },
          )}
          {enableRowVirtualization && paddingBottom > 0 && (
            <tr>
              <td style={{ height: `${paddingBottom}px` }} />
            </tr>
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
