import { useEffect, useMemo, useRef, useState } from 'react';
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
  prepareColumns,
  getAllLeafColumnDefs,
  getDefaultColumnOrderIds,
  getDefaultColumnFilterFn,
  getColumnId,
  showExpandColumn,
} from './column.utils';
import {
  type MRT_Cell,
  type MRT_Column,
  type MRT_ColumnDef,
  type MRT_FilterOption,
  type MRT_Localization,
  type MRT_Row,
  type MRT_TableInstance,
  type MRT_TableState,
  type MaterialReactTableOptions,
  type MRT_DensityState,
  type MRT_ColumnOrderState,
  type MRT_GroupingState,
  type MRT_FilterFnsState,
} from './types';
import { MRT_ExpandAllButton } from './buttons/MRT_ExpandAllButton';
import { MRT_ExpandButton } from './buttons/MRT_ExpandButton';
import { MRT_ToggleRowActionMenuButton } from './buttons/MRT_ToggleRowActionMenuButton';
import { MRT_SelectCheckbox } from './inputs/MRT_SelectCheckbox';

export const useMaterialReactTableInstance: <TData extends Record<string, any>>(
  tableOptions: MaterialReactTableOptions<TData> & {
    localization: MRT_Localization;
  },
) => MRT_TableInstance<TData> = <TData extends Record<string, any>>(
  tableOptions: MaterialReactTableOptions<TData> & {
    localization: MRT_Localization;
  },
) => {
  const bottomToolbarRef = useRef<HTMLDivElement>(null);
  const editInputRefs = useRef<Record<string, HTMLInputElement>>({});
  const filterInputRefs = useRef<Record<string, HTMLInputElement>>({});
  const searchInputRef = useRef<HTMLInputElement>(null);
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const tableHeadCellRefs = useRef<Record<string, HTMLTableCellElement>>({});
  const tablePaperRef = useRef<HTMLDivElement>(null);
  const topToolbarRef = useRef<HTMLDivElement>(null);

  const initialState: Partial<MRT_TableState<TData>> = useMemo(() => {
    const initState = tableOptions.initialState ?? {};
    initState.columnOrder =
      initState.columnOrder ?? getDefaultColumnOrderIds(tableOptions);
    initState.globalFilterFn = tableOptions.globalFilterFn ?? 'fuzzy';
    return initState;
  }, []);

  const [columnFilterFns, setColumnFilterFns] = useState<MRT_FilterFnsState>(
    () =>
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
  const [hoveredColumn, setHoveredColumn] = useState<
    MRT_Column<TData> | { id: string } | null
  >(initialState.hoveredColumn ?? null);
  const [hoveredRow, setHoveredRow] = useState<
    MRT_Row<TData> | { id: string } | null
  >(initialState.hoveredRow ?? null);
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

  const displayColumns = useMemo(
    () =>
      (
        [
          (tableOptions.state?.columnOrder ?? columnOrder).includes(
            'mrt-row-drag',
          ) && {
            header: tableOptions.localization.move,
            size: 60,
            ...tableOptions.defaultDisplayColumn,
            ...tableOptions.displayColumnDefOptions?.['mrt-row-drag'],
            id: 'mrt-row-drag',
          },
          (tableOptions.state?.columnOrder ?? columnOrder).includes(
            'mrt-row-actions',
          ) && {
            Cell: ({ cell, row }) => (
              <MRT_ToggleRowActionMenuButton
                cell={cell as any}
                row={row as any}
                table={table as any}
              />
            ),
            header: tableOptions.localization.actions,
            size: 70,
            ...tableOptions.defaultDisplayColumn,
            ...tableOptions.displayColumnDefOptions?.['mrt-row-actions'],
            id: 'mrt-row-actions',
          },
          (tableOptions.state?.columnOrder ?? columnOrder).includes(
            'mrt-row-expand',
          ) &&
            showExpandColumn(
              tableOptions,
              tableOptions.state?.grouping ?? grouping,
            ) && {
              Cell: ({ row }) => (
                <MRT_ExpandButton row={row as any} table={table as any} />
              ),
              Header: tableOptions.enableExpandAll
                ? () => <MRT_ExpandAllButton table={table as any} />
                : null,
              header: tableOptions.localization.expand,
              size: 60,
              ...tableOptions.defaultDisplayColumn,
              ...tableOptions.displayColumnDefOptions?.['mrt-row-expand'],
              id: 'mrt-row-expand',
            },
          (tableOptions.state?.columnOrder ?? columnOrder).includes(
            'mrt-row-select',
          ) && {
            Cell: ({ row }) => (
              <MRT_SelectCheckbox row={row as any} table={table as any} />
            ),
            Header:
              tableOptions.enableSelectAll &&
              tableOptions.enableMultiRowSelection
                ? () => <MRT_SelectCheckbox selectAll table={table as any} />
                : null,
            header: tableOptions.localization.select,
            size: 60,
            ...tableOptions.defaultDisplayColumn,
            ...tableOptions.displayColumnDefOptions?.['mrt-row-select'],
            id: 'mrt-row-select',
          },
          (tableOptions.state?.columnOrder ?? columnOrder).includes(
            'mrt-row-numbers',
          ) && {
            Cell: ({ row }) => row.index + 1,
            Header: () => tableOptions.localization.rowNumber,
            header: tableOptions.localization.rowNumbers,
            size: 60,
            ...tableOptions.defaultDisplayColumn,
            ...tableOptions.displayColumnDefOptions?.['mrt-row-numbers'],
            id: 'mrt-row-numbers',
          },
        ] as MRT_ColumnDef<TData>[]
      ).filter(Boolean),
    [
      columnOrder,
      grouping,
      tableOptions.displayColumnDefOptions,
      tableOptions.editingMode,
      tableOptions.enableColumnDragging,
      tableOptions.enableColumnFilterModes,
      tableOptions.enableColumnOrdering,
      tableOptions.enableEditing,
      tableOptions.enableExpandAll,
      tableOptions.enableExpanding,
      tableOptions.enableGrouping,
      tableOptions.enableRowActions,
      tableOptions.enableRowDragging,
      tableOptions.enableRowNumbers,
      tableOptions.enableRowOrdering,
      tableOptions.enableRowSelection,
      tableOptions.enableSelectAll,
      tableOptions.localization,
      tableOptions.positionActionsColumn,
      tableOptions.renderDetailPanel,
      tableOptions.renderRowActionMenuItems,
      tableOptions.renderRowActions,
      tableOptions.state?.columnOrder,
      tableOptions.state?.grouping,
    ],
  );

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
              ...getAllLeafColumnDefs(
                tableOptions.columns as MRT_ColumnDef<TData>[],
              ).map((col) => ({
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
  const table = {
    ...useReactTable({
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
      onColumnOrderChange: setColumnOrder,
      onGroupingChange: setGrouping,
      getSubRows: (row) => row?.subRows,
      ...tableOptions,
      //@ts-ignore
      columns: columnDefs,
      data,
      globalFilterFn:
        tableOptions.filterFns?.[globalFilterFn] ??
        tableOptions.filterFns?.fuzzy,
      initialState,
      state: {
        columnFilterFns,
        columnOrder,
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
    }),
    refs: {
      bottomToolbarRef,
      editInputRefs,
      filterInputRefs,
      searchInputRef,
      tableContainerRef,
      tableHeadCellRefs,
      tablePaperRef,
      topToolbarRef,
    },
    setColumnFilterFns:
      tableOptions.onColumnFilterFnsChange ?? setColumnFilterFns,
    setDensity: tableOptions.onDensityChange ?? setDensity,
    setDraggingColumn: tableOptions.onDraggingColumnChange ?? setDraggingColumn,
    setDraggingRow: tableOptions.onDraggingRowChange ?? setDraggingRow,
    setEditingCell: tableOptions.onEditingCellChange ?? setEditingCell,
    setEditingRow: tableOptions.onEditingRowChange ?? setEditingRow,
    setGlobalFilterFn: tableOptions.onGlobalFilterFnChange ?? setGlobalFilterFn,
    setHoveredColumn: tableOptions.onHoveredColumnChange ?? setHoveredColumn,
    setHoveredRow: tableOptions.onHoveredRowChange ?? setHoveredRow,
    setIsFullScreen: tableOptions.onIsFullScreenChange ?? setIsFullScreen,
    setShowAlertBanner:
      tableOptions.onShowAlertBannerChange ?? setShowAlertBanner,
    setShowColumnFilters:
      tableOptions.onShowColumnFiltersChange ?? setShowColumnFilters,
    setShowGlobalFilter:
      tableOptions.onShowGlobalFilterChange ?? setShowGlobalFilter,
    setShowToolbarDropZone:
      tableOptions.onShowToolbarDropZoneChange ?? setShowToolbarDropZone,
  } as MRT_TableInstance<TData>;

  const initialBodyHeight = useRef<string>();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      initialBodyHeight.current = document.body.style.height;
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (table.getState().isFullScreen) {
        document.body.style.height = '100vh';
      } else {
        document.body.style.height = initialBodyHeight.current as string;
      }
    }
  }, [table.getState().isFullScreen]);

  //if page index is out of bounds, set it to the last page
  useEffect(() => {
    const { pageIndex, pageSize } = table.getState().pagination;
    const totalRowCount =
      tableOptions.rowCount ?? table.getPrePaginationRowModel().rows.length;
    const firstVisibleRowIndex = pageIndex * pageSize;
    if (firstVisibleRowIndex > totalRowCount) {
      table.setPageIndex(Math.floor(totalRowCount / pageSize));
    }
  }, [tableOptions.rowCount, table.getPrePaginationRowModel().rows.length]);

  return table;
};
