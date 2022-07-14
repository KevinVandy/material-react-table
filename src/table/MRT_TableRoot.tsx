import React, { useEffect, useMemo, useState } from 'react';
import {
  TableState,
  getCoreRowModel,
  getExpandedRowModel,
  getFacetedRowModel,
  getFilteredRowModel,
  getGroupedRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  MRT_Cell,
  MRT_Column,
  MRT_ColumnDef,
  MRT_FilterOption,
  MRT_Row,
  MRT_TableInstance,
  MRT_TableState,
} from '..';
import { MRT_ExpandAllButton } from '../buttons/MRT_ExpandAllButton';
import { MRT_ExpandButton } from '../buttons/MRT_ExpandButton';
import { MRT_ToggleRowActionMenuButton } from '../buttons/MRT_ToggleRowActionMenuButton';
import { MRT_SelectCheckbox } from '../inputs/MRT_SelectCheckbox';
import { MaterialReactTableProps } from '../MaterialReactTable';
import { MRT_TablePaper } from './MRT_TablePaper';
import { Box, Dialog, Grow } from '@mui/material';
import {
  prepareColumns,
  getAllLeafColumnDefs,
  getDefaultColumnOrderIds,
} from '../utils';
import { MRT_FilterFns } from '../filtersFns';
import { MRT_GrabHandleButton } from '../buttons/MRT_GrabHandleButton';

export const MRT_TableRoot = <TData extends Record<string, any> = {}>(
  props: MaterialReactTableProps<TData>,
) => {
  const [tableId, setIdPrefix] = useState(props.tableId);
  useEffect(
    () =>
      setIdPrefix(props.tableId ?? Math.random().toString(36).substring(2, 9)),
    [props.tableId],
  );

  const initialState: Partial<MRT_TableState<TData>> = useMemo(() => {
    const initState = props.initialState ?? {};
    initState.columnOrder =
      initState.columnOrder ?? getDefaultColumnOrderIds(props);
    return initState;
  }, []);

  const [columnOrder, setColumnOrder] = useState(
    initialState.columnOrder ?? [],
  );
  const [currentDraggingColumn, setCurrentDraggingColumn] =
    useState<MRT_Column<TData> | null>(null);
  const [currentDraggingRow, setCurrentDraggingRow] =
    useState<MRT_Row<TData> | null>(null);
  const [currentEditingCell, setCurrentEditingCell] =
    useState<MRT_Cell<TData> | null>(initialState?.currentEditingCell ?? null);
  const [currentEditingRow, setCurrentEditingRow] =
    useState<MRT_Row<TData> | null>(initialState?.currentEditingRow ?? null);
  const [currentHoveredColumn, setCurrentHoveredColumn] =
    useState<MRT_Column<TData> | null>(null);
  const [currentHoveredRow, setCurrentHoveredRow] =
    useState<MRT_Row<TData> | null>(null);
  const [density, setDensity] = useState(
    initialState?.density ?? 'comfortable',
  );
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

  const [currentFilterFns, setCurrentFilterFns] = useState<{
    [key: string]: MRT_FilterOption;
  }>(() =>
    Object.assign(
      {},
      ...getAllLeafColumnDefs(props.columns as MRT_ColumnDef<TData>[]).map(
        (col) => ({
          [col.id?.toString() ?? col.accessorKey?.toString() ?? '']:
            col.filterFn instanceof Function
              ? col.filterFn.name ?? 'custom'
              : col.filterFn ??
                initialState?.currentFilterFns?.[
                  col.id?.toString() ?? col.accessorKey?.toString() ?? ''
                ] ??
                (!!col.filterSelectOptions?.length ? 'equals' : 'fuzzy'),
        }),
      ),
    ),
  );

  const [currentGlobalFilterFn, setCurrentGlobalFilterFn] =
    useState<MRT_FilterOption>(
      props.globalFilterFn instanceof String
        ? (props.globalFilterFn as MRT_FilterOption)
        : 'fuzzy',
    );

  const displayColumns = useMemo(
    () =>
      (
        [
          columnOrder.includes('mrt-row-drag') && {
            Cell: ({ cell }) => (
              <MRT_GrabHandleButton
                onDragStart={() => table.setCurrentDraggingRow(cell.row as any)}
                onDragEnd={() => {
                  props.onRowReorder?.({
                    movingRow: table.getState().currentDraggingRow as any,
                    targetRow: table.getState().currentHoveredRow as any,
                  });
                  table.setCurrentDraggingRow(null);
                  table.setCurrentHoveredRow(null);
                }}
                table={table}
              />
            ),
            columnDefType: 'display',
            header: props.localization?.grab,
            id: 'mrt-row-drag',
            muiTableBodyCellProps: props.muiTableBodyCellProps,
            muiTableHeadCellProps: props.muiTableHeadCellProps,
            size: 60,
          },
          columnOrder.includes('mrt-row-actions') && {
            Cell: ({ cell }) => (
              <MRT_ToggleRowActionMenuButton
                row={cell.row as any}
                table={table}
              />
            ),
            columnDefType: 'display',
            header: props.localization?.actions,
            id: 'mrt-row-actions',
            muiTableBodyCellProps: props.muiTableBodyCellProps,
            muiTableHeadCellProps: props.muiTableHeadCellProps,
            size: 70,
          },
          columnOrder.includes('mrt-row-expand') && {
            Cell: ({ cell }) => (
              <MRT_ExpandButton row={cell.row as any} table={table} />
            ),
            Header: () =>
              props.enableExpandAll ? (
                <MRT_ExpandAllButton table={table} />
              ) : null,
            columnDefType: 'display',
            header: props.localization?.expand,
            id: 'mrt-row-expand',
            muiTableBodyCellProps: props.muiTableBodyCellProps,
            muiTableHeadCellProps: props.muiTableHeadCellProps,
            size: 60,
          },
          columnOrder.includes('mrt-row-select') && {
            Cell: ({ cell }) => (
              <MRT_SelectCheckbox row={cell.row as any} table={table} />
            ),
            Header: () =>
              props.enableSelectAll ? (
                <MRT_SelectCheckbox selectAll table={table} />
              ) : null,
            columnDefType: 'display',
            header: props.localization?.select,
            id: 'mrt-row-select',
            muiTableBodyCellProps: props.muiTableBodyCellProps,
            muiTableHeadCellProps: props.muiTableHeadCellProps,
            size: 60,
          },
          columnOrder.includes('mrt-row-numbers') && {
            Cell: ({ cell }) => cell.row.index + 1,
            Header: () => props.localization?.rowNumber,
            columnDefType: 'display',
            header: props.localization?.rowNumbers,
            id: 'mrt-row-numbers',
            muiTableBodyCellProps: props.muiTableBodyCellProps,
            muiTableHeadCellProps: props.muiTableHeadCellProps,
            size: 60,
          },
        ] as MRT_ColumnDef<TData>[]
      ).filter(Boolean),
    [
      columnOrder,
      props.editingMode,
      props.enableEditing,
      props.enableExpandAll,
      props.enableExpanding,
      props.enableGrouping,
      props.enableRowActions,
      props.enableRowNumbers,
      props.enableRowSelection,
      props.enableSelectAll,
      props.localization,
      props.muiTableBodyCellProps,
      props.muiTableHeadCellProps,
      props.positionActionsColumn,
    ],
  );

  const columnDefs = useMemo(
    () =>
      prepareColumns([...displayColumns, ...props.columns], currentFilterFns),
    [currentFilterFns, displayColumns, props.columns],
  );

  const data: TData[] = useMemo(
    () =>
      (props.state?.isLoading || props.state?.showSkeletons) &&
      !props.data.length
        ? [...Array(10).fill(null)].map(() =>
            Object.assign(
              {},
              ...getAllLeafColumnDefs(props.columns as MRT_ColumnDef[]).map(
                (col) => ({
                  [col.id ?? col.accessorKey ?? '']: null,
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
      ...props,
      //@ts-ignore
      columns: columnDefs,
      data,
      getSubRows: (row) => row?.subRows,
      //@ts-ignore
      globalFilterFn:
        MRT_FilterFns[currentGlobalFilterFn] ?? MRT_FilterFns.fuzzy,
      initialState,
      state: {
        columnOrder,
        currentDraggingColumn,
        currentDraggingRow,
        currentEditingCell,
        currentEditingRow,
        currentFilterFns,
        currentGlobalFilterFn,
        currentHoveredColumn,
        currentHoveredRow,
        density,
        isFullScreen,
        showAlertBanner,
        showColumnFilters,
        showGlobalFilter,
        ...props.state,
      } as TableState,
      tableId,
    }),
    setCurrentDraggingColumn:
      props.onCurrentDraggingColumnChange ?? setCurrentDraggingColumn,
    setCurrentDraggingRow:
      props.onCurrentDraggingRowChange ?? setCurrentDraggingRow,
    setCurrentEditingCell:
      props.onCurrentEditingCellChange ?? setCurrentEditingCell,
    setCurrentEditingRow:
      props.onCurrentEditingRowChange ?? setCurrentEditingRow,
    setCurrentFilterFns: props.onCurrentFilterFnsChange ?? setCurrentFilterFns,
    setCurrentGlobalFilterFn:
      props.onCurrentGlobalFilterFnChange ?? setCurrentGlobalFilterFn,
    setCurrentHoveredColumn:
      props.onCurrentHoveredColumnChange ?? setCurrentHoveredColumn,
    setCurrentHoveredRow:
      props.onCurrentHoveredRowChange ?? setCurrentHoveredRow,
    setDensity: props.onDensityChange ?? setDensity,
    setIsFullScreen: props.onIsFullScreenChange ?? setIsFullScreen,
    setShowAlertBanner: props.onShowAlertBannerChange ?? setShowAlertBanner,
    setShowFilters: props.onShowFiltersChange ?? setShowFilters,
    setShowGlobalFilter: props.onShowGlobalFilterChange ?? setShowGlobalFilter,
  } as MRT_TableInstance;

  return (
    <>
      <Dialog
        PaperComponent={Box}
        TransitionComponent={Grow}
        disablePortal
        fullScreen
        keepMounted={false}
        onClose={() => setIsFullScreen(false)}
        open={isFullScreen}
        transitionDuration={400}
      >
        <MRT_TablePaper table={table} />
      </Dialog>
      {!isFullScreen && <MRT_TablePaper table={table} />}
    </>
  );
};
