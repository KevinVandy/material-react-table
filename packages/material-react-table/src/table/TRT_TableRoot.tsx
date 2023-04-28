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
import { TRT_ExpandAllButton } from '../buttons/TRT_ExpandAllButton';
import { TRT_ExpandButton } from '../buttons/TRT_ExpandButton';
import { TRT_ToggleRowActionMenuButton } from '../buttons/TRT_ToggleRowActionMenuButton';
import { TRT_SelectCheckbox } from '../inputs/TRT_SelectCheckbox';
import { TRT_TablePaper } from './TRT_TablePaper';
import { TRT_EditRowModal } from '../body/TRT_EditRowModal';
import {
  prepareColumns,
  getAllLeafColumnDefs,
  getDefaultColumnOrderIds,
  getDefaultColumnFilterFn,
  showExpandColumn,
  getColumnId,
} from '../column.utils';
import type {
  TRT_Cell,
  TRT_Column,
  TRT_ColumnDef,
  TRT_FilterOption,
  TRT_Localization,
  TRT_Row,
  TRT_TableInstance,
  TRT_TableState,
  MaterialReactTableProps,
  TRT_DensityState,
  TRT_ColumnOrderState,
  TRT_GroupingState,
} from '..';

export const TRT_TableRoot: any = <TData extends Record<string, any> = {}>(
  props: MaterialReactTableProps<TData> & { localization: TRT_Localization },
): JSX.Element => {
  const bottomToolbarRef = useRef<HTMLDivElement>(null);
  const editInputRefs = useRef<Record<string, HTMLInputElement>>({});
  const filterInputRefs = useRef<Record<string, HTMLInputElement>>({});
  const searchInputRef = useRef<HTMLInputElement>(null);
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const tableHeadCellRefs = useRef<Record<string, HTMLTableCellElement>>({});
  const tablePaperRef = useRef<HTMLDivElement>(null);
  const topToolbarRef = useRef<HTMLDivElement>(null);

  const initialState: Partial<TRT_TableState<TData>> = useMemo(() => {
    const initState = props.initialState ?? {};
    initState.columnOrder =
      initState.columnOrder ?? getDefaultColumnOrderIds(props);
    initState.globalFilterFn = props.globalFilterFn ?? 'fuzzy';
    return initState;
  }, []);

  const [columnFilterFns, setColumnFilterFns] = useState<{
    [key: string]: TRT_FilterOption;
  }>(() =>
    Object.assign(
      {},
      ...getAllLeafColumnDefs(props.columns as TRT_ColumnDef<TData>[]).map(
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
  const [columnOrder, setColumnOrder] = useState<TRT_ColumnOrderState>(
    initialState.columnOrder ?? [],
  );
  const [density, setDensity] = useState<TRT_DensityState>(
    initialState?.density ?? 'comfortable',
  );
  const [draggingColumn, setDraggingColumn] =
    useState<TRT_Column<TData> | null>(initialState.draggingColumn ?? null);
  const [draggingRow, setDraggingRow] = useState<TRT_Row<TData> | null>(
    initialState.draggingRow ?? null,
  );
  const [editingCell, setEditingCell] = useState<TRT_Cell<TData> | null>(
    initialState.editingCell ?? null,
  );
  const [editingRow, setEditingRow] = useState<TRT_Row<TData> | null>(
    initialState.editingRow ?? null,
  );
  const [globalFilterFn, setGlobalFilterFn] = useState<TRT_FilterOption>(
    initialState.globalFilterFn ?? 'fuzzy',
  );
  const [grouping, setGrouping] = useState<TRT_GroupingState>(
    initialState.grouping ?? [],
  );
  const [hoveredColumn, setHoveredColumn] = useState<
    TRT_Column<TData> | { id: string } | null
  >(initialState.hoveredColumn ?? null);
  const [hoveredRow, setHoveredRow] = useState<
    TRT_Row<TData> | { id: string } | null
  >(initialState.hoveredRow ?? null);
  const [isFullScreen, setIsFullScreen] = useState<boolean>(
    initialState?.isFullScreen ?? false,
  );
  const [showAlertBanner, setShowAlertBanner] = useState<boolean>(
    props.initialState?.showAlertBanner ?? false,
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
          (props.state?.columnOrder ?? columnOrder).includes(
            'mrt-row-drag',
          ) && {
            header: props.localization.move,
            size: 60,
            ...props.defaultDisplayColumn,
            ...props.displayColumnDefOptions?.['mrt-row-drag'],
            id: 'mrt-row-drag',
          },
          (props.state?.columnOrder ?? columnOrder).includes(
            'mrt-row-actions',
          ) && {
            Cell: ({ cell, row }) => (
              <TRT_ToggleRowActionMenuButton
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
          (props.state?.columnOrder ?? columnOrder).includes(
            'mrt-row-expand',
          ) &&
            showExpandColumn(props, props.state?.grouping ?? grouping) && {
              Cell: ({ row }) => (
                <TRT_ExpandButton row={row as any} table={table as any} />
              ),
              Header: props.enableExpandAll
                ? () => <TRT_ExpandAllButton table={table as any} />
                : null,
              header: props.localization.expand,
              size: 60,
              ...props.defaultDisplayColumn,
              ...props.displayColumnDefOptions?.['mrt-row-expand'],
              id: 'mrt-row-expand',
            },
          (props.state?.columnOrder ?? columnOrder).includes(
            'mrt-row-select',
          ) && {
            Cell: ({ row }) => (
              <TRT_SelectCheckbox row={row as any} table={table as any} />
            ),
            Header:
              props.enableSelectAll && props.enableMultiRowSelection
                ? () => <TRT_SelectCheckbox selectAll table={table as any} />
                : null,
            header: props.localization.select,
            size: 60,
            ...props.defaultDisplayColumn,
            ...props.displayColumnDefOptions?.['mrt-row-select'],
            id: 'mrt-row-select',
          },
          (props.state?.columnOrder ?? columnOrder).includes(
            'mrt-row-numbers',
          ) && {
            Cell: ({ row }) => row.index + 1,
            Header: () => props.localization.rowNumber,
            header: props.localization.rowNumbers,
            size: 60,
            ...props.defaultDisplayColumn,
            ...props.displayColumnDefOptions?.['mrt-row-numbers'],
            id: 'mrt-row-numbers',
          },
        ] as TRT_ColumnDef<TData>[]
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
      props.renderRowActionMenuItems,
      props.renderRowActions,
      props.state?.columnOrder,
      props.state?.grouping,
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
              ...getAllLeafColumnDefs(props.columns as TRT_ColumnDef[]).map(
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
    setShowColumnFilters:
      props.onShowColumnFiltersChange ?? setShowColumnFilters,
    setShowGlobalFilter: props.onShowGlobalFilterChange ?? setShowGlobalFilter,
    setShowToolbarDropZone:
      props.onShowToolbarDropZoneChange ?? setShowToolbarDropZone,
  } as TRT_TableInstance<TData>;

  if (props.tableFeatures) {
    props.tableFeatures.forEach((feature) => {
      Object.assign(table, feature(table));
    });
  }

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

  //if page index is out of bounds, set it to the last page
  useEffect(() => {
    const { pageIndex, pageSize } = table.getState().pagination;
    const totalRowCount =
      props.rowCount ?? table.getPrePaginationRowModel().rows.length;
    const firstVisibleRowIndex = pageIndex * pageSize;
    if (firstVisibleRowIndex > totalRowCount) {
      table.setPageIndex(Math.floor(totalRowCount / pageSize));
    }
  }, [props.rowCount, table.getPrePaginationRowModel().rows.length]);

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
        <TRT_TablePaper table={table as any} />
      </Dialog>
      {!table.getState().isFullScreen && (
        <TRT_TablePaper table={table as any} />
      )}
      {editingRow && props.editingMode === 'modal' && (
        <TRT_EditRowModal row={editingRow as any} table={table} open />
      )}
    </>
  );
};
