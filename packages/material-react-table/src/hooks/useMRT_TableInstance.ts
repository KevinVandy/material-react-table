import { useMemo, useRef, useState } from 'react';
import {
  getCoreRowModel,
  getExpandedRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getGroupedRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  createRow,
  getAllLeafColumnDefs,
  getColumnId,
  getDefaultColumnFilterFn,
  getDefaultColumnOrderIds,
  prepareColumns,
} from '../column.utils';
import {
  type MRT_Cell,
  type MRT_Column,
  type MRT_ColumnDef,
  type MRT_ColumnFilterFnsState,
  type MRT_ColumnOrderState,
  type MRT_DefinedTableOptions,
  type MRT_DensityState,
  type MRT_FilterOption,
  type MRT_GroupingState,
  type MRT_Row,
  type MRT_RowData,
  type MRT_TableInstance,
  type MRT_TableState,
  type MRT_Updater,
} from '../types';
import { useMRT_DisplayColumns } from './useMRT_DisplayColumns';
import { useMRT_Effects } from './useMRT_Effects';

export const useMRT_TableInstance: <TData extends MRT_RowData>(
  tableOptions: MRT_DefinedTableOptions<TData>,
) => MRT_TableInstance<TData> = <TData extends MRT_RowData>(
  tableOptions: MRT_DefinedTableOptions<TData>,
) => {
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
    const initState = tableOptions.initialState ?? {};
    initState.columnOrder =
      initState.columnOrder ?? getDefaultColumnOrderIds(tableOptions);
    initState.globalFilterFn = tableOptions.globalFilterFn ?? 'fuzzy';
    return initState;
  }, []);

  const [creatingRow, _setCreatingRow] = useState<MRT_Row<TData> | null>(
    initialState.creatingRow ?? null,
  );
  const [columnFilterFns, setColumnFilterFns] =
    useState<MRT_ColumnFilterFnsState>(() =>
      Object.assign(
        {},
        ...getAllLeafColumnDefs(
          tableOptions.columns as MRT_ColumnDef<TData>[],
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
  const [columnOrder, setColumnOrder] = useState<MRT_ColumnOrderState>(
    initialState.columnOrder ?? [],
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
  const [grouping, setGrouping] = useState<MRT_GroupingState>(
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
  const [showAlertBanner, setShowAlertBanner] = useState<boolean>(
    tableOptions.initialState?.showAlertBanner ?? false,
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

  const displayColumns = useMRT_DisplayColumns({
    columnOrder,
    creatingRow,
    grouping,
    tableOptions,
  });

  const columnDefs = useMemo(
    () =>
      prepareColumns({
        aggregationFns: tableOptions.aggregationFns as any,
        columnDefs: [...displayColumns, ...tableOptions.columns],
        columnFilterFns: tableOptions.state?.columnFilterFns ?? columnFilterFns,
        defaultDisplayColumn: tableOptions.defaultDisplayColumn ?? {},
        filterFns: tableOptions.filterFns as any,
        sortingFns: tableOptions.sortingFns as any,
      }),
    [
      columnFilterFns,
      displayColumns,
      tableOptions.columns,
      tableOptions.state?.columnFilterFns,
    ],
  );

  const data: TData[] = useMemo(
    () =>
      (tableOptions.state?.isLoading || tableOptions.state?.showSkeletons) &&
      !tableOptions.data.length
        ? [
            ...Array(
              tableOptions.state?.pagination?.pageSize ||
                initialState?.pagination?.pageSize ||
                10,
            ).fill(null),
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
      tableOptions.state?.isLoading,
      tableOptions.state?.showSkeletons,
    ],
  );

  //@ts-ignore
  const table = useReactTable({
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel:
      tableOptions.enableExpanding || tableOptions.enableGrouping
        ? getExpandedRowModel()
        : undefined,
    getFacetedMinMaxValues: tableOptions.enableFacetedValues
      ? getFacetedMinMaxValues()
      : undefined,
    getFacetedRowModel: tableOptions.enableFacetedValues
      ? getFacetedRowModel()
      : undefined,
    getFacetedUniqueValues: tableOptions.enableFacetedValues
      ? getFacetedUniqueValues()
      : undefined,
    getFilteredRowModel:
      tableOptions.enableColumnFilters ||
      tableOptions.enableGlobalFilter ||
      tableOptions.enableFilters
        ? getFilteredRowModel()
        : undefined,
    getGroupedRowModel: tableOptions.enableGrouping
      ? getGroupedRowModel()
      : undefined,
    getPaginationRowModel: tableOptions.enablePagination
      ? getPaginationRowModel()
      : undefined,
    getSortedRowModel: tableOptions.enableSorting
      ? getSortedRowModel()
      : undefined,
    getSubRows: (row) => row?.subRows,
    onColumnOrderChange: setColumnOrder,
    onGroupingChange: setGrouping,
    ...tableOptions,
    //@ts-ignore
    columns: columnDefs,
    data,
    globalFilterFn: tableOptions.filterFns?.[globalFilterFn ?? 'fuzzy'],
    initialState,
    state: {
      columnFilterFns,
      columnOrder,
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
      showAlertBanner,
      showColumnFilters,
      showGlobalFilter,
      showToolbarDropZone,
      ...tableOptions.state,
    },
  }) as MRT_TableInstance<TData>;

  // @ts-ignore
  table.refs = {
    // @ts-ignore
    bottomToolbarRef,
    editInputRefs,
    filterInputRefs,
    // @ts-ignore
    searchInputRef,
    // @ts-ignore
    tableContainerRef,
    // @ts-ignore
    tableFooterRef,
    tableHeadCellRefs,
    // @ts-ignore
    tableHeadRef,
    // @ts-ignore
    tablePaperRef,
    // @ts-ignore
    topToolbarRef,
  };

  const setCreatingRow = (row: MRT_Updater<MRT_Row<TData> | null | true>) => {
    let _row = row;
    if (row === true) {
      _row = createRow(table);
    }
    tableOptions?.onCreatingRowChange?.(_row as MRT_Row<TData> | null) ??
      _setCreatingRow(_row as MRT_Row<TData> | null);
  };

  table.setCreatingRow = setCreatingRow;
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
