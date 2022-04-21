import React, { useMemo, useState } from 'react';
import {
  PaginationState,
  Table,
  createTable,
  functionalUpdate,
  getColumnFilteredRowModelSync,
  getExpandedRowModel,
  getGlobalFilteredRowModelSync,
  getGroupedRowModelSync,
  getPaginationRowModel,
  getSortedRowModelSync,
  useTableInstance,
  getCoreRowModelSync,
  ColumnDef,
} from '@tanstack/react-table';
import {
  MRT_ColumnInterface,
  MRT_FilterType,
  MRT_Row,
  MRT_TableInstance,
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
import { MRT_FILTER_TYPE } from '../enums';

export const MRT_TableRoot = <D extends Record<string, any> = {}>(
  props: MaterialReactTableProps<D>,
) => {
  const idPrefix = useMemo(
    () => props.idPrefix ?? Math.random().toString(36).substring(2, 9),
    [props.idPrefix],
  );
  const [currentEditingRow, setCurrentEditingRow] = useState<MRT_Row | null>(
    null,
  );
  const [isDensePadding, setIsDensePadding] = useState(
    props.initialState?.isDensePadding ?? false,
  );
  const [isFullScreen, setIsFullScreen] = useState(
    props.initialState?.isFullScreen ?? false,
  );
  const [showFilters, setShowFilters] = useState(
    props.initialState?.showFilters ?? false,
  );
  const [showGlobalFilter, setShowGlobalFilter] = useState(
    props.initialState?.showGlobalFilter ?? false,
  );
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: props.initialState?.pagination?.pageIndex ?? 0,
    pageSize: props.initialState?.pagination?.pageSize ?? 10,
    pageCount: props.initialState?.pagination?.pageCount ?? -1,
  });

  const [currentFilterTypes, setCurrentFilterTypes] = useState<{
    [key: string]: MRT_FilterType;
  }>(() =>
    Object.assign(
      {},
      ...getAllLeafColumnDefs(props.columns as MRT_ColumnInterface[]).map(
        (c) => ({
          [c.id as string]:
            c.filter ??
            props?.initialState?.columnFilters?.find((cf) => cf.id === c.id) ??
            (!!c.filterSelectOptions?.length
              ? MRT_FILTER_TYPE.EQUALS
              : MRT_FILTER_TYPE.BEST_MATCH),
        }),
      ),
    ),
  );

  const [currentGlobalFilterType, setCurrentGlobalFilterType] = useState(
    props.globalFilterType ?? MRT_FILTER_TYPE.BEST_MATCH_FIRST,
  );

  const table = useMemo(
    () => createTable<{ Row: D }>(),
    [],
  ) as unknown as Table<D>;

  const displayColumns = useMemo(
    () =>
      [
        (props.enableRowActions || props.enableEditing) &&
          createDisplayColumn(table, {
            Cell: ({ cell }) => (
              <MRT_ToggleRowActionMenuButton
                row={cell.row as MRT_Row}
                tableInstance={tableInstance}
              />
            ),
            header: props.localization?.actions,
            id: 'mrt-row-actions',
            maxWidth: 60,
            width: 60,
          }),
        (props.enableExpanded || props.enableGrouping) &&
          createDisplayColumn(table, {
            Cell: ({ cell }) => (
              <MRT_ExpandButton
                row={cell.row as MRT_Row}
                tableInstance={tableInstance}
              />
            ),
            Header: () =>
              props.enableExpandAll ? (
                <MRT_ExpandAllButton tableInstance={tableInstance} />
              ) : null,
            header: props.localization?.expand,
            id: 'mrt-expand',
            maxWidth: 40,
            width: 40,
          }),
        props.enableRowSelection &&
          createDisplayColumn(table, {
            Cell: ({ cell }) => (
              <MRT_SelectCheckbox
                row={cell.row as MRT_Row}
                tableInstance={tableInstance}
              />
            ),
            Header: () =>
              props.enableSelectAll ? (
                <MRT_SelectCheckbox selectAll tableInstance={tableInstance} />
              ) : null,
            header: props.localization?.select,
            id: 'mrt-select',
            maxWidth: 40,
            width: 40,
          }),
        props.enableRowNumbers &&
          createDisplayColumn(table, {
            Cell: ({ cell }) => cell.row.index + 1,
            Header: () => props.localization?.rowNumber,
            header: props.localization?.rowNumbers,
            id: 'mrt-row-numbers',
            maxWidth: 40,
            width: 40,
            minWidth: 40,
          }),
      ].filter(Boolean),
    [
      props.enableEditing,
      props.enableExpandAll,
      props.enableExpanded,
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
    () =>
      table.createColumns([
        ...displayColumns,
        ...props.columns.map((column) =>
          column.columns
            ? createGroup(table, column, currentFilterTypes)
            : createDataColumn(table, column, currentFilterTypes),
        ),
      ] as ColumnDef<D>[]),
    [table, props.columns, currentFilterTypes],
  );

  const data: D['Row'][] = useMemo(
    () =>
      props.isLoading && !props.data.length
        ? [...Array(10).fill(null)].map(() =>
            Object.assign(
              {},
              ...getAllLeafColumnDefs(
                props.columns as MRT_ColumnInterface[],
              ).map((c) => ({
                [c.id]: null,
              })),
            ),
          )
        : props.data,
    [props.data, props.isLoading],
  );

  //@ts-ignore
  const tableInstance: MRT_TableInstance<{}> = {
    ...useTableInstance(table, {
      ...props,
      columns,
      data,
      //@ts-ignore
      filterTypes: defaultFilterFNs,
      getColumnFilteredRowModel: getColumnFilteredRowModelSync(),
      getCoreRowModel: getCoreRowModelSync(),
      getExpandedRowModel: getExpandedRowModel(),
      getGlobalFilteredRowModel: getGlobalFilteredRowModelSync(),
      getGroupedRowModel: getGroupedRowModelSync(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModelSync(),
      getSubRows: props.getSubRows ?? ((originalRow: D) => originalRow.subRows),
      globalFilterType: currentGlobalFilterType,
      idPrefix,
      //@ts-ignore
      initialState: props.initialState,
      onPaginationChange: (updater: any) =>
        setPagination((old) => functionalUpdate(updater, old)),
      state: {
        currentEditingRow,
        currentFilterTypes,
        currentGlobalFilterType,
        isDensePadding,
        isFullScreen,
        //@ts-ignore
        pagination,
        showFilters,
        showGlobalFilter,
        ...props.state,
      },
    }),
    setCurrentEditingRow,
    setCurrentFilterTypes,
    setCurrentGlobalFilterType,
    setIsDensePadding,
    setIsFullScreen,
    setShowFilters,
    setShowGlobalFilter,
  };

  return <MRT_TablePaper tableInstance={tableInstance} />;
};
