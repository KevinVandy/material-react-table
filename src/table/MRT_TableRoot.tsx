import React, { useEffect, useMemo, useState } from 'react';
import {
  FilterFn,
  PaginationState,
  createTable,
  functionalUpdate,
  getExpandedRowModel,
  getPaginationRowModel,
  useTableInstance,
  getGroupedRowModel,
  getSortedRowModel,
  getCoreRowModel,
  getFilteredRowModel,
  ReactTableGenerics,
  getFacetedRowModel,
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
  const [idPrefix, setIdPrefix] = useState(props.idPrefix);
  useEffect(
    () =>
      setIdPrefix(props.idPrefix ?? Math.random().toString(36).substring(2, 9)),
    [props.idPrefix],
  );

  const initialState: Partial<MRT_TableState<D>> = useMemo(() => {
    if (!props.enablePersistentState || !props.idPrefix) {
      return props.initialState;
    }
    if (typeof window === 'undefined') {
      if (process.env.NODE_ENV !== 'production') {
        console.error(
          'The MRT Persistent Table State feature is not supported if using SSR, but you can wrap your <MaterialReactTable /> in a MUI <NoSsr> tags to let it work',
        );
      }
      return props.initialState;
    }
    const storedState =
      props.persistentStateMode === 'localStorage'
        ? localStorage.getItem(`mrt-${idPrefix}-table-state`)
        : props.persistentStateMode === 'sessionStorage'
        ? sessionStorage.getItem(`mrt-${idPrefix}-table-state`)
        : '{}';
    if (storedState) {
      const parsedState = JSON.parse(storedState);
      if (parsedState) {
        return { ...props.initialState, ...parsedState };
      }
    }
    return props.initialState;
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
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: initialState?.pagination?.pageIndex ?? 0,
    pageSize: initialState?.pagination?.pageSize ?? 10,
    pageCount: initialState?.pagination?.pageCount,
  });

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

  const table = useMemo(() => createTable(), []);

  const displayColumns = useMemo(
    () =>
      [
        (props.enableRowActions ||
          (props.enableEditing && props.editingMode === 'row')) &&
          createDisplayColumn(table, {
            Cell: ({ cell }) => (
              <MRT_ToggleRowActionMenuButton
                row={cell.row as any}
                tableInstance={tableInstance}
              />
            ),
            header: props.localization?.actions,
            id: 'mrt-row-actions',
            size: 60,
          }),
        (props.enableExpanding || props.enableGrouping) &&
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
            size: 50,
          }),
        props.enableRowNumbers &&
          createDisplayColumn(table, {
            Cell: ({ cell }) => cell.row.index + 1,
            Header: () => props.localization?.rowNumber,
            header: props.localization?.rowNumbers,
            id: 'mrt-row-numbers',
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

  const [columnOrder, setColumnOrder] = useState<string[]>(() =>
    initialState?.columnOrder ?? props.enableColumnOrdering
      ? getAllLeafColumnDefs(columns as MRT_ColumnDef[]).map((c) => c.id)
      : [],
  );

  //@ts-ignore
  const tableInstance = {
    //@ts-ignore
    ...useTableInstance(table, {
      filterFns: defaultFilterFNs,
      getCoreRowModel: getCoreRowModel(),
      getExpandedRowModel: getExpandedRowModel(),
      getFacetedRowModel: getFacetedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getGroupedRowModel: getGroupedRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getSubRows: (row) => (row as MRT_Row)?.subRows,
      //@ts-ignore
      globalFilterFn: currentGlobalFilterFn,
      onColumnOrderChange: setColumnOrder,
      onPaginationChange: (updater: any) =>
        setPagination((old) => functionalUpdate(updater, old)),
      ...props,
      //@ts-ignore
      columns,
      data,
      idPrefix,
      initialState,
      state: {
        columnOrder,
        currentEditingCell,
        currentEditingRow,
        currentFilterFns,
        currentGlobalFilterFn,
        isDensePadding,
        isFullScreen,
        //@ts-ignore
        pagination,
        showFilters,
        showGlobalFilter,
        ...props.state,
      },
    }),
    setCurrentEditingCell,
    setCurrentEditingRow,
    setCurrentFilterFns,
    setCurrentGlobalFilterFn,
    setIsDensePadding,
    setIsFullScreen,
    setShowFilters,
    setShowGlobalFilter,
  } as MRT_TableInstance;

  useEffect(() => {
    if (typeof window === 'undefined' || !props.enablePersistentState) {
      return;
    }
    if (!props.idPrefix && process.env.NODE_ENV !== 'production') {
      console.warn(
        'a unique idPrefix prop is required for persistent table state to work',
      );
      return;
    }
    const itemArgs: [string, string] = [
      `mrt-${idPrefix}-table-state`,
      JSON.stringify(tableInstance.getState()),
    ];
    if (props.persistentStateMode === 'localStorage') {
      localStorage.setItem(...itemArgs);
    } else if (props.persistentStateMode === 'sessionStorage') {
      sessionStorage.setItem(...itemArgs);
    }
  }, [
    props.enablePersistentState,
    props.idPrefix,
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
