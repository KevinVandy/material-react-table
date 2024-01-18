import { useMemo } from 'react';
import { rankGlobalFuzzy } from '../fns/sortingFns';
import {
  type MRT_Row,
  type MRT_RowData,
  type MRT_TableInstance,
} from '../types';
import { getCanRankRows } from '../utils/row.utils';

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
      createDisplayMode,
      enableGlobalFilterRankedResults,
      enablePagination,
      enableRowPinning,
      manualExpanding,
      manualFiltering,
      manualGrouping,
      manualPagination,
      manualSorting,
      positionCreatingRow,
      rowPinningDisplayMode,
    },
  } = table;
  const {
    creatingRow,
    expanded,
    globalFilter,
    pagination,
    rowPinning,
    sorting,
  } = getState();

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
    if (
      positionCreatingRow !== undefined &&
      creatingRow &&
      createDisplayMode === 'row'
    ) {
      const creatingRowIndex = !isNaN(+positionCreatingRow)
        ? +positionCreatingRow
        : positionCreatingRow === 'top'
          ? 0
          : rows.length;
      rows = [
        ...rows.slice(0, creatingRowIndex),
        creatingRow,
        ...rows.slice(creatingRowIndex),
      ];
    }

    return rows;
  }, [
    creatingRow,
    pagination.pageIndex,
    pagination.pageSize,
    positionCreatingRow,
    rowPinning,
    shouldRankRows ? getPrePaginationRowModel().rows : getRowModel().rows,
    shouldRankRows,
  ]);

  return rows;
};
