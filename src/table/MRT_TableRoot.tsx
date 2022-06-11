import React, { useEffect, useMemo, useState } from 'react';
import {
  FilterFn,
  createTable,
  getExpandedRowModel,
  getPaginationRowModel,
  useTableInstance,
  getGroupedRowModel,
  getSortedRowModel,
  getCoreRowModel,
  getFilteredRowModel,
  ReactTableGenerics,
  getFacetedRowModel,
  TableState,
  Table,
} from '@tanstack/react-table';
import {
  MRT_Cell,
  MRT_ColumnDef,
  MRT_FilterFn,
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
import {
  createDataColumn,
  createDisplayColumn,
  createGroup,
  getAllLeafColumnDefs,
} from '../utils';
import { defaultFilterFNs } from '../filtersFNs';
import { MRT_FILTER_OPTION } from '../enums';
import { Box, Dialog, Grow } from '@mui/material';

export const MRT_TableRoot = <D extends Record<string, any> = {}>(
  props: MaterialReactTableProps<D>,
) => {
  const [tableId, setIdPrefix] = useState(props.tableId);
  useEffect(
    () =>
      setIdPrefix(props.tableId ?? Math.random().toString(36).substring(2, 9)),
    [props.tableId],
  );

  const showActionColumn =
    props.enableRowActions ||
    (props.enableEditing && props.editingMode === 'row');

  const showExpandColumn = props.enableExpanding || props.enableGrouping;

  const initialState: Partial<MRT_TableState<D>> = useMemo(() => {
    const initState = props.initialState ?? {};

    initState.columnOrder =
      initState?.columnOrder ??
      (props.enableColumnOrdering || props.enableGrouping)
        ? ([
            showActionColumn && 'mrt-row-actions',
            showExpandColumn && 'mrt-expand',
            props.enableRowSelection && 'mrt-select',
            props.enableRowNumbers && 'mrt-row-numbers',
            ...getAllLeafColumnDefs(props.columns as MRT_ColumnDef[]).map(
              (c) => c.id,
            ),
          ].filter(Boolean) as string[])
        : [];

    if (!props.enablePersistentState || !props.tableId) {
      return initState;
    }
    if (typeof window === 'undefined') {
      if (process.env.NODE_ENV !== 'production') {
        console.error(
          'The MRT Persistent Table State feature is not supported if using SSR, but you can wrap your <MaterialReactTable /> in a MUI <NoSsr> tags to let it work',
        );
      }
      return initState;
    }
    const storedState =
      props.persistentStateMode === 'localStorage'
        ? localStorage.getItem(`mrt-${tableId}-table-state`)
        : props.persistentStateMode === 'sessionStorage'
        ? sessionStorage.getItem(`mrt-${tableId}-table-state`)
        : '{}';
    if (storedState) {
      const parsedState = JSON.parse(storedState);
      if (parsedState) {
        return { ...initState, ...parsedState };
      }
    }
    return initState;
  }, []);

  const [currentEditingCell, setCurrentEditingCell] =
    useState<MRT_Cell<D> | null>(initialState?.currentEditingCell ?? null);
  const [currentEditingRow, setCurrentEditingRow] = useState<MRT_Row<D> | null>(
    initialState?.currentEditingRow ?? null,
  );
  const [isDensePadding, setIsDensePadding] = useState(
    initialState?.isDensePadding ?? false,
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
          (!!c.filterSelectOptions?.length
            ? MRT_FILTER_OPTION.EQUALS
            : MRT_FILTER_OPTION.FUZZY),
      })),
    ),
  );

  const [currentGlobalFilterFn, setCurrentGlobalFilterFn] = useState<
    MRT_FILTER_OPTION | FilterFn<ReactTableGenerics> | string | number | symbol
  >(props.globalFilterFn ?? MRT_FILTER_OPTION.FUZZY);

  const table = useMemo(
    () =>
      // @ts-ignore
      createTable().setOptions({
        //@ts-ignore
        filterFns: defaultFilterFNs,
        getCoreRowModel: getCoreRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getGroupedRowModel: getGroupedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getSubRows: (row) => (row as MRT_Row)?.subRows,
        tableId,
        initialState,
      }) as Table<D>,
    [],
  );

  const displayColumns = useMemo(
    () =>
      [
        showActionColumn &&
          createDisplayColumn(table, {
            Cell: ({ cell }) => (
              <MRT_ToggleRowActionMenuButton
                row={cell.row as any}
                tableInstance={tableInstance}
              />
            ),
            header: props.localization?.actions,
            id: 'mrt-row-actions',
            muiTableBodyCellProps: props.muiTableBodyCellProps,
            muiTableHeadCellProps: props.muiTableHeadCellProps,
            size: 70,
          }),
        showExpandColumn &&
          createDisplayColumn(table, {
            Cell: ({ cell }) => (
              <MRT_ExpandButton
                row={cell.row as any}
                tableInstance={tableInstance}
              />
            ),
            Header: () =>
              props.enableExpandAll ? (
                <MRT_ExpandAllButton tableInstance={tableInstance} />
              ) : null,
            header: props.localization?.expand,
            id: 'mrt-expand',
            muiTableBodyCellProps: props.muiTableBodyCellProps,
            muiTableHeadCellProps: props.muiTableHeadCellProps,
            size: 50,
          }),
        props.enableRowSelection &&
          createDisplayColumn(table, {
            Cell: ({ cell }) => (
              <MRT_SelectCheckbox
                row={cell.row as any}
                tableInstance={tableInstance}
              />
            ),
            Header: () =>
              props.enableSelectAll ? (
                <MRT_SelectCheckbox selectAll tableInstance={tableInstance} />
              ) : null,
            header: props.localization?.select,
            id: 'mrt-select',
            muiTableBodyCellProps: props.muiTableBodyCellProps,
            muiTableHeadCellProps: props.muiTableHeadCellProps,
            size: 50,
          }),
        props.enableRowNumbers &&
          createDisplayColumn(table, {
            Cell: ({ cell }) => cell.row.index + 1,
            Header: () => props.localization?.rowNumber,
            header: props.localization?.rowNumbers,
            id: 'mrt-row-numbers',
            muiTableBodyCellProps: props.muiTableBodyCellProps,
            muiTableHeadCellProps: props.muiTableHeadCellProps,
            size: 50,
          }),
      ].filter(Boolean),
    [
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
      table,
    ],
  );

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
  const tableInstance = {
    //@ts-ignore
    ...useTableInstance(table, {
      ...props,
      //@ts-ignore
      columns,
      data,
      //@ts-ignore
      globalFilterFn: currentGlobalFilterFn,
      state: {
        currentEditingCell,
        currentEditingRow,
        currentFilterFns,
        currentGlobalFilterFn,
        isDensePadding,
        isFullScreen,
        showFilters,
        showGlobalFilter,
        ...props.state,
      } as TableState,
    }),
    setCurrentEditingCell:
      props.onCurrentEditingCellChange ?? setCurrentEditingCell,
    setCurrentEditingRow:
      props.onCurrentEditingRowChange ?? setCurrentEditingRow,
    setCurrentFilterFns: props.onCurrentFilterFnsChange ?? setCurrentFilterFns,
    setCurrentGlobalFilterFn:
      props.onCurrentGlobalFilterFnChange ?? setCurrentGlobalFilterFn,
    setIsDensePadding: props.onIsDensePaddingChange ?? setIsDensePadding,
    setIsFullScreen: props.onIsFullScreenChange ?? setIsFullScreen,
    setShowFilters: props.onShowFiltersChange ?? setShowFilters,
    setShowGlobalFilter: props.onShowGlobalFilterChange ?? setShowGlobalFilter,
  } as MRT_TableInstance;

  useEffect(() => {
    if (typeof window === 'undefined' || !props.enablePersistentState) {
      return;
    }
    if (!props.tableId && process.env.NODE_ENV !== 'production') {
      console.warn(
        'a unique tableId prop is required for persistent table state to work',
      );
      return;
    }
    const itemArgs: [string, string] = [
      `mrt-${tableId}-table-state`,
      JSON.stringify(tableInstance.getState()),
    ];
    if (props.persistentStateMode === 'localStorage') {
      localStorage.setItem(...itemArgs);
    } else if (props.persistentStateMode === 'sessionStorage') {
      sessionStorage.setItem(...itemArgs);
    }
  }, [
    props.enablePersistentState,
    props.tableId,
    props.persistentStateMode,
    tableInstance,
  ]);

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
        <MRT_TablePaper tableInstance={tableInstance} />
      </Dialog>
      {!isFullScreen && <MRT_TablePaper tableInstance={tableInstance} />}
    </>
  );
};
