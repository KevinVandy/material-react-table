import { type ChangeEvent, type MouseEvent } from 'react';
import { rankGlobalFuzzy } from '../fns/sortingFns';
import {
  type MRT_Row,
  type MRT_RowData,
  type MRT_TableInstance,
} from '../types';
import { parseFromValuesOrFunc } from './utils';

export const getMRT_Rows = <TData extends MRT_RowData>(
  table: MRT_TableInstance<TData>,
  pinnedRowIds: string[] = [],
  all?: boolean,
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
      enablePagination,
      enableRowPinning,
      manualPagination,
      positionCreatingRow,
      rowPinningDisplayMode,
    },
  } = table;
  const { creatingRow, pagination } = getState();

  const isRankingRows = getIsRankingRows(table);

  let rows: MRT_Row<TData>[] = [];
  if (!isRankingRows) {
    rows =
      !enableRowPinning || rowPinningDisplayMode?.includes('sticky')
        ? all
          ? getPrePaginationRowModel().rows
          : getRowModel().rows
        : getCenterRows();
  } else {
    rows = getPrePaginationRowModel().rows.sort((a, b) =>
      rankGlobalFuzzy(a, b),
    );
    if (enablePagination && !manualPagination && !all) {
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
};

export const getCanRankRows = <TData extends MRT_RowData>(
  table: MRT_TableInstance<TData>,
) => {
  const {
    getState,
    options: {
      enableGlobalFilterRankedResults,
      manualExpanding,
      manualFiltering,
      manualGrouping,
      manualSorting,
    },
  } = table;
  const { expanded, globalFilterFn } = getState();

  return (
    !manualExpanding &&
    !manualFiltering &&
    !manualGrouping &&
    !manualSorting &&
    enableGlobalFilterRankedResults &&
    globalFilterFn === 'fuzzy' &&
    expanded !== true &&
    !Object.values(expanded).some(Boolean)
  );
};

export const getIsRankingRows = <TData extends MRT_RowData>(
  table: MRT_TableInstance<TData>,
) => {
  const { globalFilter, sorting } = table.getState();

  return (
    getCanRankRows(table) &&
    globalFilter &&
    !Object.values(sorting).some(Boolean)
  );
};

export const getIsRowSelected = <TData extends MRT_RowData>({
  row,
  table,
}: {
  row: MRT_Row<TData>;
  table: MRT_TableInstance<TData>;
}) => {
  const {
    options: { enableRowSelection },
  } = table;

  return (
    row.getIsSelected() ||
    (parseFromValuesOrFunc(enableRowSelection, row) &&
      row.getCanSelectSubRows() &&
      row.getIsAllSubRowsSelected())
  );
};

export const getMRT_RowSelectionHandler =
  () =>
  <TData extends MRT_RowData>({
    event,
    row,
    staticRowIndex = 0,
    table,
  }: {
    event: ChangeEvent<HTMLInputElement> | MouseEvent<HTMLTableRowElement>;
    row: MRT_Row<TData>;
    staticRowIndex?: number;
    table: MRT_TableInstance<TData>;
  }) => {
    const {
      getState,
      options: {
        enableBatchRowSelection,
        enableRowPinning,
        rowPinningDisplayMode,
      },
      refs: { lastSelectedRowId: lastSelectedRowId },
    } = table;
    const {
      pagination: { pageIndex, pageSize },
    } = getState();

    const isChecked = getIsRowSelected({ row, table });

    const isStickySelection =
      enableRowPinning && rowPinningDisplayMode?.includes('select');

    // toggle selected of this row
    row.getToggleSelectedHandler()(event);

    // if shift key is pressed, select all rows between last selected and this one
    if (
      enableBatchRowSelection &&
      (event as any).nativeEvent.shiftKey &&
      lastSelectedRowId.current !== null
    ) {
      const rows = getMRT_Rows(table, undefined, true);
      const lastIndex = rows.findIndex(
        (r) => r.id === lastSelectedRowId.current,
      );
      if (lastIndex !== -1) {
        const currentIndex = staticRowIndex + pageSize * pageIndex;
        const [start, end] =
          lastIndex < currentIndex
            ? [lastIndex, currentIndex]
            : [currentIndex, lastIndex];
        for (let i = start; i <= end; i++) {
          rows[i].toggleSelected(!isChecked);
        }
      }
    }
    lastSelectedRowId.current = row.id;

    // if all sub rows were selected, unselect them
    if (row.getCanSelectSubRows() && row.getIsAllSubRowsSelected()) {
      row.subRows?.forEach((r) => r.toggleSelected(false));
    }

    if (isStickySelection) {
      row.pin(
        !row.getIsPinned() && isChecked
          ? rowPinningDisplayMode?.includes('bottom')
            ? 'bottom'
            : 'top'
          : false,
      );
    }
  };
