import React, { FC, RefObject, useMemo } from 'react';
import { useVirtualizer, Virtualizer } from '@tanstack/react-virtual';
import { TableBody } from '@mui/material';
import { MRT_TableBodyRow } from './MRT_TableBodyRow';
import { rankGlobalFuzzy } from '../sortingFns';
import type { MRT_Row, MRT_TableInstance } from '..';

interface Props {
  table: MRT_TableInstance;
  tableContainerRef: RefObject<HTMLDivElement>;
}

export const MRT_TableBody: FC<Props> = ({ table, tableContainerRef }) => {
  const {
    getRowModel,
    getPrePaginationRowModel,
    getState,
    options: {
      enableGlobalFilterRankedResults,
      enablePagination,
      enableRowVirtualization,
      muiTableBodyProps,
      virtualizerProps,
    },
  } = table;
  const { density, globalFilter, pagination, sorting } = getState();

  const tableBodyProps =
    muiTableBodyProps instanceof Function
      ? muiTableBodyProps({ table })
      : muiTableBodyProps;

  const getIsSomeColumnsSorted = () => {
    return Object.values(sorting).some(Boolean);
  };

  const rows = useMemo(() => {
    if (
      enableGlobalFilterRankedResults &&
      globalFilter &&
      !getIsSomeColumnsSorted()
    ) {
      const rankedRows = getPrePaginationRowModel().rows.sort((a, b) =>
        rankGlobalFuzzy(a, b),
      );
      if (enablePagination) {
        return rankedRows.slice(0, pagination.pageSize);
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
  ]);

  const rowVirtualizer: Virtualizer = enableRowVirtualization
    ? useVirtualizer({
        estimateSize: () => (density === 'compact' ? 25 : 50),
        overscan: density === 'compact' ? 30 : 10,
        getScrollElement: () => tableContainerRef.current as HTMLDivElement,
        count: rows.length,
        ...virtualizerProps,
      })
    : ({} as any);

  const virtualRows = enableRowVirtualization
    ? rowVirtualizer.getVirtualItems()
    : [];

  let paddingTop = 0;
  let paddingBottom = 0;
  if (enableRowVirtualization) {
    paddingTop = !!virtualRows.length ? virtualRows[0].start : 0;
    paddingBottom = !!virtualRows.length
      ? rowVirtualizer.getTotalSize() - virtualRows[virtualRows.length - 1].end
      : 0;
  }

  return (
    <TableBody {...tableBodyProps}>
      {enableRowVirtualization && paddingTop > 0 && (
        <tr>
          <td style={{ height: `${paddingTop}px` }} />
        </tr>
      )}
      {/* @ts-ignore */}
      {(enableRowVirtualization ? virtualRows : rows).map(
        (rowOrVirtualRow: any, rowIndex: number) => {
          const row = enableRowVirtualization
            ? (rows[rowOrVirtualRow.index] as MRT_Row)
            : (rowOrVirtualRow as MRT_Row);
          return (
            <MRT_TableBodyRow
              key={row.id}
              row={row}
              rowIndex={
                enableRowVirtualization ? rowOrVirtualRow.index : rowIndex
              }
              table={table}
            />
          );
        },
      )}
      {enableRowVirtualization && paddingBottom > 0 && (
        <tr>
          <td style={{ height: `${paddingBottom}px` }} />
        </tr>
      )}
    </TableBody>
  );
};
