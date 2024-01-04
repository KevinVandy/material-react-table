import { useMemo } from 'react';
import { getCanRankRows } from '../column.utils';
import { rankGlobalFuzzy } from '../sortingFns';
import {
  type MRT_Row,
  type MRT_RowData,
  type MRT_TableInstance,
} from '../types';

export const useMRT_Rows = <TData extends MRT_RowData>(
  table: MRT_TableInstance<TData>,
  pinnedRowIds: string[] = [],
): MRT_Row<TData>[] => {
  const {
    getBottomRows,
    getCenterRows,
    getPrePaginationRowModel,
    getRowModel,
    getState,
    getTopRows,
    options: {
      enableGlobalFilterRankedResults,
      enablePagination,
      enableRowPinning,
      manualExpanding,
      manualFiltering,
      manualGrouping,
      manualPagination,
      manualSorting,
      rowPinningDisplayMode,
    },
  } = table;
  const { expanded, globalFilter, pagination, rowPinning, sorting } =
    getState();

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

  return rows;
};
