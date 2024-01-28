import { useMemo, useRef, useState } from 'react';
import { useReactTable } from '@tanstack/react-table';
import {
  type MRT_Cell,
  type MRT_Column,
  type MRT_ColumnDef,
  type MRT_ColumnFilterFnsState,
  type MRT_ColumnOrderState,
  type MRT_ColumnSizingInfoState,
  type MRT_DefinedTableOptions,
  type MRT_DensityState,
  type MRT_FilterOption,
  type MRT_GroupingState,
  type MRT_PaginationState,
  type MRT_Row,
  type MRT_RowData,
  type MRT_StatefulTableOptions,
  type MRT_TableInstance,
  type MRT_TableState,
  type MRT_Updater,
} from '../types';
import {
  getAllLeafColumnDefs,
  getColumnId,
  getDefaultColumnFilterFn,
  prepareColumns,
} from '../utils/column.utils';
import { getDefaultColumnOrderIds } from '../utils/displayColumn.utils';
import { createRow } from '../utils/tanstack.helpers';
import { getMRT_DisplayColumns } from './display-columns/getMRT_DisplayColumns';
import { useMRT_Effects } from './useMRT_Effects';

export const useMRT_TableInstance = <TData extends MRT_RowData>(
  _tableOptions: MRT_DefinedTableOptions<TData>,
): MRT_TableInstance<TData> => {
  const actionCellRef = useRef<HTMLTableCellElement>(null);
  const bottomToolbarRef = useRef<HTMLDivElement>(null);
  const editInputRefs = useRef<Record<string, HTMLInputElement>>({});
  const filterInputRefs = useRef<Record<string, HTMLInputElement>>({});
  const searchInputRef = useRef<HTMLInputElement>(null);
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const tableHeadCellRefs = useRef<Record<string, HTMLTableCellElement>>({});
  const tablePaperRef = useRef<HTMLDivElement>(null);
  const topToolbarRef = useRef<HTMLDivElement>(null);
  const tableHeadRef = useRef<HTMLTableSectionElement>(null);
  const tableFooterRef = useRef<HTMLTableSectionElement>(null);

  const initialState: Partial<MRT_TableState<TData>> = useMemo(() => {
    const initState = _tableOptions.initialState ?? {};
    initState.columnOrder =
      initState.columnOrder ??
      getDefaultColumnOrderIds({
        ..._tableOptions,
        state: { ..._tableOptions.initialState, ..._tableOptions.state },
      } as MRT_StatefulTableOptions<TData>);
    initState.globalFilterFn = _tableOptions.globalFilterFn ?? 'fuzzy';
    return initState;
  }, []);

  _tableOptions.initialState = initialState;

  const [actionCell, setActionCell] = useState<MRT_Cell<TData> | null>(
    initialState.actionCell ?? null,
  );
  const [creatingRow, _setCreatingRow] = useState<MRT_Row<TData> | null>(
    initialState.creatingRow ?? null,
  );
  const [columnFilterFns, setColumnFilterFns] =
    useState<MRT_ColumnFilterFnsState>(() =>
      Object.assign(
        {},
        ...getAllLeafColumnDefs(
          _tableOptions.columns as MRT_ColumnDef<TData>[],
        ).map((col) => ({
          [getColumnId(col)]:
            col.filterFn instanceof Function
              ? col.filterFn.name ?? 'custom'
              : col.filterFn ??
                initialState?.columnFilterFns?.[getColumnId(col)] ??
                getDefaultColumnFilterFn(col),
        })),
      ),
    );
  const [columnOrder, onColumnOrderChange] = useState<MRT_ColumnOrderState>(
    initialState.columnOrder ?? [],
  );
  const [columnSizingInfo, onColumnSizingInfoChange] =
    useState<MRT_ColumnSizingInfoState>(
      initialState.columnSizingInfo ?? ({} as MRT_ColumnSizingInfoState),
    );
  const [density, setDensity] = useState<MRT_DensityState>(
    initialState?.density ?? 'comfortable',
  );
  const [draggingColumn, setDraggingColumn] =
    useState<MRT_Column<TData> | null>(initialState.draggingColumn ?? null);
  const [draggingRow, setDraggingRow] = useState<MRT_Row<TData> | null>(
    initialState.draggingRow ?? null,
  );
  const [editingCell, setEditingCell] = useState<MRT_Cell<TData> | null>(
    initialState.editingCell ?? null,
  );
  const [editingRow, setEditingRow] = useState<MRT_Row<TData> | null>(
    initialState.editingRow ?? null,
  );
  const [globalFilterFn, setGlobalFilterFn] = useState<MRT_FilterOption>(
    initialState.globalFilterFn ?? 'fuzzy',
  );
  const [grouping, onGroupingChange] = useState<MRT_GroupingState>(
    initialState.grouping ?? [],
  );
  const [hoveredColumn, setHoveredColumn] = useState<Partial<
    MRT_Column<TData>
  > | null>(initialState.hoveredColumn ?? null);
  const [hoveredRow, setHoveredRow] = useState<Partial<MRT_Row<TData>> | null>(
    initialState.hoveredRow ?? null,
  );
  const [isFullScreen, setIsFullScreen] = useState<boolean>(
    initialState?.isFullScreen ?? false,
  );
  const [pagination, onPaginationChange] = useState<MRT_PaginationState>(
    initialState?.pagination ?? { pageIndex: 0, pageSize: 10 },
  );
  const [showAlertBanner, setShowAlertBanner] = useState<boolean>(
    initialState?.showAlertBanner ?? false,
  );
  const [showColumnFilters, setShowColumnFilters] = useState<boolean>(
    initialState?.showColumnFilters ?? false,
  );
  const [showGlobalFilter, setShowGlobalFilter] = useState<boolean>(
    initialState?.showGlobalFilter ?? false,
  );
  const [showToolbarDropZone, setShowToolbarDropZone] = useState<boolean>(
    initialState?.showToolbarDropZone ?? false,
  );

  _tableOptions.state = {
    actionCell,
    columnFilterFns,
    columnOrder,
    columnSizingInfo,
    creatingRow,
    density,
    draggingColumn,
    draggingRow,
    editingCell,
    editingRow,
    globalFilterFn,
    grouping,
    hoveredColumn,
    hoveredRow,
    isFullScreen,
    pagination,
    showAlertBanner,
    showColumnFilters,
    showGlobalFilter,
    showToolbarDropZone,
    ..._tableOptions.state,
  };

  _tableOptions.onColumnOrderChange = onColumnOrderChange;
  _tableOptions.onColumnSizingInfoChange = onColumnSizingInfoChange;
  _tableOptions.onGroupingChange = onGroupingChange;
  _tableOptions.onPaginationChange = onPaginationChange;

  //@ts-ignore
  _tableOptions.globalFilterFn =
    _tableOptions.filterFns?.[globalFilterFn ?? 'fuzzy'];

  const tableOptions = _tableOptions as MRT_StatefulTableOptions<TData>;

  //don't recompute columnDefs while resizing column or dragging column/row
  const columnDefsRef = useRef<MRT_ColumnDef<TData>[]>([]);
  tableOptions.columns =
    tableOptions.state.columnSizingInfo.isResizingColumn ||
    tableOptions.state.draggingColumn ||
    tableOptions.state.draggingRow
      ? columnDefsRef.current
      : prepareColumns({
          columnDefs: [
            ...getMRT_DisplayColumns(tableOptions),
            ...tableOptions.columns,
          ],
          tableOptions,
        });
  columnDefsRef.current = tableOptions.columns;

  tableOptions.data = useMemo(
    () =>
      (tableOptions.state.isLoading || tableOptions.state.showSkeletons) &&
      !tableOptions.data.length
        ? [
            ...Array(Math.min(tableOptions.state.pagination.pageSize, 20)).fill(
              null,
            ),
          ].map(() =>
            Object.assign(
              {},
              ...getAllLeafColumnDefs(tableOptions.columns).map((col) => ({
                [getColumnId(col)]: null,
              })),
            ),
          )
        : tableOptions.data,
    [
      tableOptions.data,
      tableOptions.state.isLoading,
      tableOptions.state.showSkeletons,
    ],
  );

  //@ts-ignore
  const table = useReactTable(tableOptions) as MRT_TableInstance<TData>;

  table.refs = {
    actionCellRef,
    bottomToolbarRef,
    editInputRefs,
    filterInputRefs,
    searchInputRef,
    tableContainerRef,
    tableFooterRef,
    tableHeadCellRefs,
    tableHeadRef,
    tablePaperRef,
    topToolbarRef,
  };

  table.setActionCell = tableOptions.onActionCellChange ?? setActionCell;
  table.setCreatingRow = (row: MRT_Updater<MRT_Row<TData> | null | true>) => {
    let _row = row;
    if (row === true) {
      _row = createRow(table);
    }
    tableOptions?.onCreatingRowChange?.(_row as MRT_Row<TData> | null) ??
      _setCreatingRow(_row as MRT_Row<TData> | null);
  };
  table.setColumnFilterFns =
    tableOptions.onColumnFilterFnsChange ?? setColumnFilterFns;
  table.setDensity = tableOptions.onDensityChange ?? setDensity;
  table.setDraggingColumn =
    tableOptions.onDraggingColumnChange ?? setDraggingColumn;
  table.setDraggingRow = tableOptions.onDraggingRowChange ?? setDraggingRow;
  table.setEditingCell = tableOptions.onEditingCellChange ?? setEditingCell;
  table.setEditingRow = tableOptions.onEditingRowChange ?? setEditingRow;
  table.setGlobalFilterFn =
    tableOptions.onGlobalFilterFnChange ?? setGlobalFilterFn;
  table.setHoveredColumn =
    tableOptions.onHoveredColumnChange ?? setHoveredColumn;
  table.setHoveredRow = tableOptions.onHoveredRowChange ?? setHoveredRow;
  table.setIsFullScreen = tableOptions.onIsFullScreenChange ?? setIsFullScreen;
  table.setShowAlertBanner =
    tableOptions.onShowAlertBannerChange ?? setShowAlertBanner;
  table.setShowColumnFilters =
    tableOptions.onShowColumnFiltersChange ?? setShowColumnFilters;
  table.setShowGlobalFilter =
    tableOptions.onShowGlobalFilterChange ?? setShowGlobalFilter;
  table.setShowToolbarDropZone =
    tableOptions.onShowToolbarDropZoneChange ?? setShowToolbarDropZone;

  useMRT_Effects(table);

  return table;
};
