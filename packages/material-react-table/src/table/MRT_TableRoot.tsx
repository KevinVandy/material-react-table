import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  getCoreRowModel,
  getExpandedRowModel,
  getFacetedRowModel,
  getFilteredRowModel,
  getGroupedRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import Grow from '@mui/material/Grow';
import { MRT_ExpandAllButton } from '../buttons/MRT_ExpandAllButton';
import { MRT_ExpandButton } from '../buttons/MRT_ExpandButton';
import { MRT_ToggleRowActionMenuButton } from '../buttons/MRT_ToggleRowActionMenuButton';
import { MRT_SelectCheckbox } from '../inputs/MRT_SelectCheckbox';
import { MRT_TablePaper } from './MRT_TablePaper';
import { MRT_EditRowModal } from '../body/MRT_EditRowModal';
import {
  prepareColumns,
  getAllLeafColumnDefs,
  getDefaultColumnOrderIds,
  getDefaultColumnFilterFn,
  showExpandColumn,
  getColumnId,
} from '../column.utils';
import type { GroupingState, TableState } from '@tanstack/react-table';
import type {
  MRT_Cell,
  MRT_Column,
  MRT_ColumnDef,
  MRT_FilterOption,
  MRT_Row,
  MRT_TableInstance,
  MRT_TableState,
  MaterialReactTableProps,
  MRT_Localization,
} from '..';

export const MRT_TableRoot = <TData extends Record<string, any> = {}>(
  props: MaterialReactTableProps<TData> & { localization: MRT_Localization },
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
    const initState = props.initialState ?? {};
    initState.columnOrder =
      initState.columnOrder ?? getDefaultColumnOrderIds(props);
    initState.globalFilterFn = props.globalFilterFn ?? 'fuzzy';
    return initState;
  }, []);

  const [columnFilterFns, setColumnFilterFns] = useState<{
    [key: string]: MRT_FilterOption;
  }>(() =>
    Object.assign(
      {},
      ...getAllLeafColumnDefs(props.columns as MRT_ColumnDef<TData>[]).map(
        (col) => ({
          [getColumnId(col)]:
            col.filterFn instanceof Function
              ? col.filterFn.name ?? 'custom'
              : col.filterFn ??
                initialState?.columnFilterFns?.[getColumnId(col)] ??
                getDefaultColumnFilterFn(col),
        }),
      ),
    ),
  );
  const [columnOrder, setColumnOrder] = useState(
    initialState.columnOrder ?? [],
  );
  const [density, setDensity] = useState(
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
  const [grouping, setGrouping] = useState<GroupingState>(
    initialState.grouping ?? [],
  );
  const [hoveredColumn, setHoveredColumn] = useState<
    MRT_Column<TData> | { id: string } | null
  >(initialState.hoveredColumn ?? null);
  const [hoveredRow, setHoveredRow] = useState<
    MRT_Row<TData> | { id: string } | null
  >(initialState.hoveredRow ?? null);
  const [isFullScreen, setIsFullScreen] = useState(
    initialState?.isFullScreen ?? false,
  );
  const [showAlertBanner, setShowAlertBanner] = useState(
    props.initialState?.showAlertBanner ?? false,
  );
  const [showColumnFilters, setShowFilters] = useState(
    initialState?.showColumnFilters ?? false,
  );
  const [showGlobalFilter, setShowGlobalFilter] = useState(
    initialState?.showGlobalFilter ?? false,
  );
  const [showToolbarDropZone, setShowToolbarDropZone] = useState(
    initialState?.showToolbarDropZone ?? false,
  );

  const displayColumns = useMemo(
    () =>
      (
        [
          columnOrder.includes('mrt-row-drag') && {
            header: props.localization.move,
            size: 60,
            ...props.defaultDisplayColumn,
            ...props.displayColumnDefOptions?.['mrt-row-drag'],
            id: 'mrt-row-drag',
          },
          columnOrder.includes('mrt-row-actions') && {
            Cell: ({ cell, row }) => (
              <MRT_ToggleRowActionMenuButton
                cell={cell as any}
                row={row as any}
                table={table as any}
              />
            ),
            header: props.localization.actions,
            size: 70,
            ...props.defaultDisplayColumn,
            ...props.displayColumnDefOptions?.['mrt-row-actions'],
            id: 'mrt-row-actions',
          },
          columnOrder.includes('mrt-row-expand') &&
            showExpandColumn(props, grouping) && {
              Cell: ({ row }) => (
                <MRT_ExpandButton row={row as any} table={table as any} />
              ),
              Header: props.enableExpandAll
                ? () => <MRT_ExpandAllButton table={table as any} />
                : null,
              header: props.localization.expand,
              size: 60,
              ...props.defaultDisplayColumn,
              ...props.displayColumnDefOptions?.['mrt-row-expand'],
              id: 'mrt-row-expand',
            },
          columnOrder.includes('mrt-row-select') && {
            Cell: ({ row }) => (
              <MRT_SelectCheckbox row={row as any} table={table as any} />
            ),
            Header:
              props.enableSelectAll && props.enableMultiRowSelection
                ? () => <MRT_SelectCheckbox selectAll table={table as any} />
                : null,
            header: props.localization.select,
            size: 60,
            ...props.defaultDisplayColumn,
            ...props.displayColumnDefOptions?.['mrt-row-select'],
            id: 'mrt-row-select',
          },
          columnOrder.includes('mrt-row-numbers') && {
            Cell: ({ row }) => row.index + 1,
            Header: () => props.localization.rowNumber,
            header: props.localization.rowNumbers,
            size: 60,
            ...props.defaultDisplayColumn,
            ...props.displayColumnDefOptions?.['mrt-row-numbers'],
            id: 'mrt-row-numbers',
          },
        ] as MRT_ColumnDef<TData>[]
      ).filter(Boolean),
    [
      columnOrder,
      grouping,
      props.displayColumnDefOptions,
      props.editingMode,
      props.enableColumnDragging,
      props.enableColumnFilterModes,
      props.enableColumnOrdering,
      props.enableEditing,
      props.enableExpandAll,
      props.enableExpanding,
      props.enableGrouping,
      props.enableRowActions,
      props.enableRowDragging,
      props.enableRowNumbers,
      props.enableRowOrdering,
      props.enableRowSelection,
      props.enableSelectAll,
      props.localization,
      props.positionActionsColumn,
      props.renderDetailPanel,
    ],
  );

  const columnDefs = useMemo(
    () =>
      prepareColumns({
        aggregationFns: props.aggregationFns as any,
        columnDefs: [...displayColumns, ...props.columns],
        columnFilterFns: props.state?.columnFilterFns ?? columnFilterFns,
        defaultDisplayColumn: props.defaultDisplayColumn ?? {},
        filterFns: props.filterFns as any,
        sortingFns: props.sortingFns as any,
      }),
    [
      columnFilterFns,
      displayColumns,
      props.columns,
      props.state?.columnFilterFns,
    ],
  );

  const data: TData[] = useMemo(
    () =>
      (props.state?.isLoading || props.state?.showSkeletons) &&
      !props.data.length
        ? [
            ...Array(
              props.state?.pagination?.pageSize ||
                initialState?.pagination?.pageSize ||
                10,
            ).fill(null),
          ].map(() =>
            Object.assign(
              {},
              ...getAllLeafColumnDefs(props.columns as MRT_ColumnDef[]).map(
                (col) => ({
                  [getColumnId(col)]: null,
                }),
              ),
            ),
          )
        : props.data,
    [props.data, props.state?.isLoading, props.state?.showSkeletons],
  );

  //@ts-ignore
  const table = {
    ...useReactTable({
      getCoreRowModel: getCoreRowModel(),
      getExpandedRowModel: getExpandedRowModel(),
      getFacetedRowModel: getFacetedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getGroupedRowModel: getGroupedRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      onColumnOrderChange: setColumnOrder,
      onGroupingChange: setGrouping,
      getSubRows: (row) => row?.subRows,
      ...props,
      //@ts-ignore
      columns: columnDefs,
      data,
      globalFilterFn:
        props.filterFns?.[globalFilterFn] ?? props.filterFns?.fuzzy,
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
        ...props.state,
      } as TableState,
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
    setColumnFilterFns: props.onColumnFilterFnsChange ?? setColumnFilterFns,
    setDensity: props.onDensityChange ?? setDensity,
    setDraggingColumn: props.onDraggingColumnChange ?? setDraggingColumn,
    setDraggingRow: props.onDraggingRowChange ?? setDraggingRow,
    setEditingCell: props.onEditingCellChange ?? setEditingCell,
    setEditingRow: props.onEditingRowChange ?? setEditingRow,
    setGlobalFilterFn: props.onGlobalFilterFnChange ?? setGlobalFilterFn,
    setHoveredColumn: props.onHoveredColumnChange ?? setHoveredColumn,
    setHoveredRow: props.onHoveredRowChange ?? setHoveredRow,
    setIsFullScreen: props.onIsFullScreenChange ?? setIsFullScreen,
    setShowAlertBanner: props.onShowAlertBannerChange ?? setShowAlertBanner,
    setShowFilters: props.onShowFiltersChange ?? setShowFilters,
    setShowGlobalFilter: props.onShowGlobalFilterChange ?? setShowGlobalFilter,
    setShowToolbarDropZone: props.onShowToolbarDropZoneChange ?? setShowToolbarDropZone,
  } as MRT_TableInstance<TData>;

  if (props.tableInstanceRef) {
    props.tableInstanceRef.current = table;
  }

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

  return (
    <>
      <Dialog
        PaperComponent={Box}
        TransitionComponent={!props.enableRowVirtualization ? Grow : undefined}
        disablePortal
        fullScreen
        keepMounted={false}
        onClose={() => table.setIsFullScreen(false)}
        open={table.getState().isFullScreen}
        transitionDuration={400}
      >
        <MRT_TablePaper table={table as any} />
      </Dialog>
      {!table.getState().isFullScreen && (
        <MRT_TablePaper table={table as any} />
      )}
      {editingRow && props.editingMode === 'modal' && (
        <MRT_EditRowModal row={editingRow as any} table={table} open />
      )}
    </>
  );
};
