import React, { useEffect, useMemo, useState } from 'react';
import {
  FilterFn,
  ReactTableGenerics,
  Table,
  TableState,
  createTable,
  filterFns,
  getCoreRowModel,
  getExpandedRowModel,
  getFacetedRowModel,
  getFilteredRowModel,
  getGroupedRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useTableInstance,
  sortingFns,
} from '@tanstack/react-table';
import {
  MRT_Cell,
  MRT_ColumnDef,
  MRT_FilterFn,
  MRT_FILTER_OPTION,
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
  createDataColumn,
  createDisplayColumn,
  createGroup,
  getAllLeafColumnDefs,
  getDefaultColumnOrderIds,
} from '../utils';
import { MRT_FilterFns } from '../filtersFns';
import { MRT_SortingFns } from '../sortingFns';

export const MRT_TableRoot = <D extends Record<string, any> = {}>(
  props: MaterialReactTableProps<D>,
) => {
  const [tableId, setIdPrefix] = useState(props.tableId);
  useEffect(
    () =>
      setIdPrefix(props.tableId ?? Math.random().toString(36).substring(2, 9)),
    [props.tableId],
  );

  const initialState: Partial<MRT_TableState<D>> = useMemo(() => {
    const initState = props.initialState ?? {};
    initState.columnOrder =
      initState.columnOrder ?? getDefaultColumnOrderIds(props);
    return initState;
  }, []);

  const [columnOrder, setColumnOrder] = useState(
    initialState.columnOrder ?? [],
  );
  const [currentEditingCell, setCurrentEditingCell] =
    useState<MRT_Cell<D> | null>(initialState?.currentEditingCell ?? null);
  const [currentEditingRow, setCurrentEditingRow] = useState<MRT_Row<D> | null>(
    initialState?.currentEditingRow ?? null,
  );
  const [density, setDensity] = useState(
    initialState?.density ?? 'comfortable',
  );
  const [isFullScreen, setIsFullScreen] = useState(
    initialState?.isFullScreen ?? false,
  );
  const [showFilters, setShowFilters] = useState(
    initialState?.showFilters ?? false,
  );
  const [showGlobalFilter, setShowGlobalFilter] = useState(
    initialState?.showGlobalFilter ?? false,
  );

  const [currentFilterFns, setCurrentFilterFns] = useState<{
    [key: string]: MRT_FilterFn;
  }>(() =>
    Object.assign(
      {},
      ...getAllLeafColumnDefs(props.columns as MRT_ColumnDef[]).map((c) => ({
        [c.id as string]:
          c.filterFn ??
          initialState?.currentFilterFns?.[c.id] ??
          (!!c.filterSelectOptions?.length ? 'equals' : 'fuzzy'),
      })),
    ),
  );

  const [currentGlobalFilterFn, setCurrentGlobalFilterFn] = useState<
    MRT_FILTER_OPTION | FilterFn<ReactTableGenerics> | string | number | symbol
  >(props.globalFilterFn ?? 'fuzzy');

  const table = useMemo(
    () =>
      // @ts-ignore
      createTable().setOptions({
        filterFns: { ...filterFns, ...MRT_FilterFns, ...props.filterFns },
        getCoreRowModel: getCoreRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getGroupedRowModel: getGroupedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        sortingFns: { ...sortingFns, ...MRT_SortingFns, ...props.sortingFns },
      }) as Table<D>,
    [],
  );

  const displayColumns = useMemo(() => {
    return [
      columnOrder.includes('mrt-row-actions') &&
        createDisplayColumn(table, {
          Cell: ({ cell }) => (
            <MRT_ToggleRowActionMenuButton
              row={cell.row as any}
              instance={instance}
            />
          ),
          header: props.localization?.actions,
          id: 'mrt-row-actions',
          muiTableBodyCellProps: props.muiTableBodyCellProps,
          muiTableHeadCellProps: props.muiTableHeadCellProps,
          size: 70,
        }),
      columnOrder.includes('mrt-expand') &&
        createDisplayColumn(table, {
          Cell: ({ cell }) => (
            <MRT_ExpandButton row={cell.row as any} instance={instance} />
          ),
          Header: () =>
            props.enableExpandAll ? (
              <MRT_ExpandAllButton instance={instance} />
            ) : null,
          header: props.localization?.expand,
          id: 'mrt-expand',
          muiTableBodyCellProps: props.muiTableBodyCellProps,
          muiTableHeadCellProps: props.muiTableHeadCellProps,
          size: 60,
        }),
      columnOrder.includes('mrt-select') &&
        createDisplayColumn(table, {
          Cell: ({ cell }) => (
            <MRT_SelectCheckbox row={cell.row as any} instance={instance} />
          ),
          Header: () =>
            props.enableSelectAll ? (
              <MRT_SelectCheckbox selectAll instance={instance} />
            ) : null,
          header: props.localization?.select,
          id: 'mrt-select',
          muiTableBodyCellProps: props.muiTableBodyCellProps,
          muiTableHeadCellProps: props.muiTableHeadCellProps,
          size: 60,
        }),
      columnOrder.includes('mrt-row-numbers') &&
        createDisplayColumn(table, {
          Cell: ({ cell }) => cell.row.index + 1,
          Header: () => props.localization?.rowNumber,
          header: props.localization?.rowNumbers,
          id: 'mrt-row-numbers',
          muiTableBodyCellProps: props.muiTableBodyCellProps,
          muiTableHeadCellProps: props.muiTableHeadCellProps,
          size: 60,
        }),
    ].filter(Boolean) as MRT_ColumnDef<D>[];
  }, [
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
    table,
  ]);

  const columns = useMemo(
    () => [
      ...displayColumns,
      ...props.columns.map((column) =>
        column.columns
          ? createGroup(table, column as any, currentFilterFns)
          : createDataColumn(table, column as any, currentFilterFns),
      ),
    ],
    [table, props.columns, currentFilterFns],
  );

  const data: D[] = useMemo(
    () =>
      (props.state?.isLoading || props.state?.showSkeletons) &&
      !props.data.length
        ? [...Array(10).fill(null)].map(() =>
            Object.assign(
              {},
              ...getAllLeafColumnDefs(props.columns as MRT_ColumnDef[]).map(
                (c) => ({
                  [c.id]: null,
                }),
              ),
            ),
          )
        : props.data,
    [props.data, props.state?.isLoading, props.state?.showSkeletons],
  );

  //@ts-ignore
  const instance = {
    //@ts-ignore
    ...useTableInstance(table, {
      onColumnOrderChange: setColumnOrder,
      ...props,
      //@ts-ignore
      columns,
      data,
      getSubRows: (row) => (row as MRT_Row)?.subRows,
      //@ts-ignore
      globalFilterFn: currentGlobalFilterFn,
      initialState,
      state: {
        columnOrder,
        currentEditingCell,
        currentEditingRow,
        currentFilterFns,
        currentGlobalFilterFn,
        density,
        isFullScreen,
        showFilters,
        showGlobalFilter,
        ...props.state,
      } as TableState,
      tableId,
    }),
    setCurrentEditingCell:
      props.onCurrentEditingCellChange ?? setCurrentEditingCell,
    setCurrentEditingRow:
      props.onCurrentEditingRowChange ?? setCurrentEditingRow,
    setCurrentFilterFns: props.onCurrentFilterFnsChange ?? setCurrentFilterFns,
    setCurrentGlobalFilterFn:
      props.onCurrentGlobalFilterFnChange ?? setCurrentGlobalFilterFn,
    setDensity: props.onDensityChange ?? setDensity,
    setIsFullScreen: props.onIsFullScreenChange ?? setIsFullScreen,
    setShowFilters: props.onShowFiltersChange ?? setShowFilters,
    setShowGlobalFilter: props.onShowGlobalFilterChange ?? setShowGlobalFilter,
  } as MRT_TableInstance;

  useEffect(() => {
    //@ts-ignore
    props.onStateChanged?.({ instance, state: instance.getState() });
  }, [instance.getState()]);

  useEffect(() => {
    props.onColumnOrderChanged?.({
      columnOrder: instance.getState().columnOrder,
      //@ts-ignore
      instance,
    });
  }, [instance.getState().columnOrder]);

  useEffect(() => {
    props.onColumnPinningChanged?.({
      columnPinning: instance.getState().columnPinning,
      //@ts-ignore
      instance,
    });
  }, [instance.getState().columnPinning]);

  useEffect(() => {
    props.onColumnVisibilityChanged?.({
      columnPinning: instance.getState().columnVisibility,
      //@ts-ignore
      instance,
    });
  }, [instance.getState().columnVisibility]);

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
        <MRT_TablePaper instance={instance} />
      </Dialog>
      {!isFullScreen && <MRT_TablePaper instance={instance} />}
    </>
  );
};
