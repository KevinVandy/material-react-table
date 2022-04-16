import {
  columnFilterRowsFn,
  createTable,
  expandRowsFn,
  functionalUpdate,
  globalFilterRowsFn,
  groupRowsFn,
  paginateRowsFn,
  PaginationState,
  sortRowsFn,
  Table,
  useTable,
} from '@tanstack/react-table';
import React, { useMemo, useState } from 'react';
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
  const [showSearch, setShowSearch] = useState(
    props.initialState?.showSearch ?? false,
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
            props?.initialState?.columnFilters?.[c.id as any] ??
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
        (props.enableRowActions || props.enableRowEditing) &&
          createDisplayColumn(table, {
            Cell: ({ cell }) => (
              <MRT_ToggleRowActionMenuButton
                row={cell.row as any}
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
            maxWidth: 40,
            width: 40,
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
            maxWidth: 40,
            width: 40,
          }),
        props.enableRowNumbers &&
          createDisplayColumn(table, {
            Cell: ({ cell }) => cell.row.index + 1,
            Header: () => '#',
            header: props.localization?.rowNumbers,
            id: 'mrt-row-numbers',
            maxWidth: 40,
            width: 40,
            minWidth: 40,
          }),
      ].filter(Boolean),
    [
      props.enableExpandAll,
      props.enableExpanded,
      props.enableRowActions,
      props.enableRowEditing,
      props.enableRowNumbers,
      props.enableRowSelection,
      props.enableSelectAll,
      props.localization,
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
      ] as any),
    [table, props.columns, currentFilterTypes],
  );

  const data = useMemo(
    () =>
      props.isLoading && !props.data.length
        ? [...Array(10).fill(null)].map((_) =>
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
  const tableInstance: MRT_TableInstance<{}> = useTable(table, {
    ...props,
    //@ts-ignore
    filterTypes: defaultFilterFNs,
    globalFilterType: currentGlobalFilterType,
    columnFilterRowsFn: columnFilterRowsFn,
    columns,
    data,
    expandRowsFn: expandRowsFn,
    getSubRows: props.getSubRows ?? ((originalRow: D) => originalRow.subRows),
    globalFilterRowsFn: globalFilterRowsFn,
    groupRowsFn: groupRowsFn,
    idPrefix,
    onPaginationChange: (updater: any) =>
      setPagination((old) => functionalUpdate(updater, old)),
    paginateRowsFn: paginateRowsFn,
    setCurrentEditingRow,
    setCurrentFilterTypes,
    setCurrentGlobalFilterType,
    setIsDensePadding,
    setIsFullScreen,
    setShowFilters,
    setShowSearch,
    sortRowsFn,
    state: {
      ...props.initialState,
      currentEditingRow,
      currentFilterTypes,
      currentGlobalFilterType,
      isDensePadding,
      isFullScreen,
      //@ts-ignore
      pagination,
      showFilters,
      showSearch,
      ...props.state,
    },
  });
  // console.log(tableInstance.getState());
  return <MRT_TablePaper tableInstance={tableInstance} />;
};
