import {
  columnFilterRowsFn,
  createTable,
  functionalUpdate,
  paginateRowsFn,
  PaginationState,
  sortRowsFn,
  useTable,
} from '@tanstack/react-table';
import React, {
  Context,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
} from 'react';
import type {
  MRT_ColumnInterface,
  MRT_FilterType,
  MRT_Row,
  MRT_TableInstance,
} from '.';
import { MRT_FILTER_TYPE } from './enums';
import { defaultFilterFNs } from './filtersFNs';
import { MRT_Icons } from './icons';
import { MRT_SelectCheckbox } from './inputs/MRT_SelectCheckbox';
import { MRT_Localization } from './localization';
import { MaterialReactTableProps } from './MaterialReactTable';
import {
  createDataColumn,
  createDisplayColumn,
  createGroup,
  findLowestLevelCols,
} from './utils';

export type UseMRT<D extends Record<string, any> = {}> =
  MaterialReactTableProps<D> & {
    getCanSomeRowsExpand: () => boolean;
    getIsSomeRowsExpanded: () => boolean;
    icons: MRT_Icons;
    idPrefix: string;
    filterTypes: { [key in MRT_FILTER_TYPE]: any };
    localization: MRT_Localization;
    setCurrentEditingRow: Dispatch<SetStateAction<MRT_Row<D> | null>>;
    setCurrentFilterTypes: Dispatch<
      SetStateAction<{
        [key: string]: MRT_FilterType;
      }>
    >;
    setCurrentGlobalFilterType: Dispatch<SetStateAction<MRT_FILTER_TYPE>>;
    setIsDensePadding: Dispatch<SetStateAction<boolean>>;
    setIsFullScreen: Dispatch<SetStateAction<boolean>>;
    setShowFilters: Dispatch<SetStateAction<boolean>>;
    setShowSearch: Dispatch<SetStateAction<boolean>>;
    tableInstance: MRT_TableInstance<D>;
  };

const MaterialReactTableContext = (<D extends Record<string, any> = {}>() =>
  createContext<UseMRT<D>>({} as UseMRT<D>) as Context<UseMRT<D>>)();

export const MaterialReactTableProvider = <D extends Record<string, any> = {}>(
  props: PropsWithChildren<MaterialReactTableProps<D>>,
) => {
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

  const [pagination, setPagination] = useState<Partial<PaginationState>>({
    pageIndex: props.initialState?.pagination?.pageIndex ?? 0,
    pageSize: props.initialState?.pagination?.pageSize ?? 10,
  });

  // const [currentFilterTypes, setCurrentFilterTypes] = useState<{
  //   [key: string]: MRT_FilterType;
  // }>(() =>
  //   Object.assign(
  //     {},
  //     ...findLowestLevelCols(props.columns).map((c) => ({
  //       [c.accessor as string]:
  //         c.filter ??
  //         props?.initialState?.filters?.[c.accessor as any] ??
  //         (!!c.filterSelectOptions?.length
  //           ? MRT_FILTER_TYPE.EQUALS
  //           : MRT_FILTER_TYPE.BEST_MATCH),
  //     })),
  //   ),
  // );

  // const [currentGlobalFilterType, setCurrentGlobalFilterType] = useState<
  //   MRT_FilterType | string | undefined
  // >(props.globalFilter);

  // const applyFiltersToColumns = useCallback(
  //   (cols: MRT_ColumnInterface[]) =>
  //     cols.map((column) => {
  //       if (column.columns) {
  //         applyFiltersToColumns(column.columns);
  //       } else {
  //         column.filter =
  //           props?.filterTypes?.[
  //             currentFilterTypes[column.accessor as string] as MRT_FILTER_TYPE
  //           ];
  //       }
  //       return column;
  //     }),
  //   [currentFilterTypes, props.filterTypes],
  // );

  // const columns = useMemo(
  //   () => applyFiltersToColumns(props.columns),
  //   [props.columns, applyFiltersToColumns],
  // );

  const table = useMemo(() => createTable<D>(), []);

  const displayColumns = useMemo(
    () =>
      [
        props.enableRowSelection &&
          createDisplayColumn(table, {
            Cell: ({ cell }) => <MRT_SelectCheckbox row={cell.row as any} />,
            Header: () =>
              props.enableSelectAll ? <MRT_SelectCheckbox selectAll /> : null,
            header: props.localization?.selection,
            id: 'selection',
            maxWidth: 30,
            width: 30,
          }),
      ].filter(Boolean),
    [props.enableRowSelection, props.enableSelectAll],
  );

  const columns = useMemo(
    () =>
      table.createColumns([
        ...displayColumns,
        ...props.columns.map((column) =>
          column.columns
            ? createGroup(table, column as any)
            : createDataColumn(table, column as any),
        ),
      ] as any),
    [table, props.columns],
  );

  const data: D[] = useMemo(
    () =>
      !props.isLoading || !!props.data.length
        ? props.data
        : [...Array(10).fill(null)].map((_) =>
            Object.assign(
              {},
              ...findLowestLevelCols(
                props.columns as MRT_ColumnInterface[],
              ).map((c) => ({
                [c.id]: null,
              })),
            ),
          ),
    [props.data, props.isLoading],
  );

  const tableInstance = useTable(table, {
    ...props,
    columnFilterRowsFn,
    columns,
    data,
    filterTypes: defaultFilterFNs,
    paginateRowsFn: paginateRowsFn,
    sortRowsFn,
    onPaginationChange: (updater: any) => {
      setPagination((old) => functionalUpdate(updater, old));
    },
    state: {
      currentEditingRow,
      isDensePadding,
      isFullScreen,
      pagination,
      showFilters,
      showSearch,
      ...props.state,
    },
  } as any);

  const idPrefix = useMemo(
    () => props.idPrefix ?? Math.random().toString(36).substring(2, 9),
    [props.idPrefix],
  );

  const getCanSomeRowsExpand = useCallback(
    () => tableInstance.getRowModel().rows.some((row) => row.getCanExpand()),
    [tableInstance.getRowModel().rows],
  );

  const getIsSomeRowsExpanded = useCallback(
    () => tableInstance.getRowModel().rows.some((row) => row.getIsExpanded()),
    [tableInstance.getRowModel().rows],
  );

  return (
    <MaterialReactTableContext.Provider
      value={
        {
          ...props,
          getCanSomeRowsExpand,
          getIsSomeRowsExpanded,
          idPrefix,
          setCurrentEditingRow,
          // setCurrentFilterTypes,
          // setCurrentGlobalFilterType,
          setIsDensePadding,
          setIsFullScreen,
          setShowFilters,
          setShowSearch,
          tableInstance,
        } as any
      }
    >
      {props.children}
    </MaterialReactTableContext.Provider>
  );
};

export const useMRT = <D extends Record<string, any> = {}>(): UseMRT<D> =>
  useContext<UseMRT<D>>(
    MaterialReactTableContext as unknown as Context<UseMRT<D>>,
  );
