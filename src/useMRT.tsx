import React, {
  Context,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import {
  PluginHook,
  useExpanded,
  useFilters,
  useFlexLayout,
  useGlobalFilter,
  useGroupBy,
  usePagination,
  useResizeColumns,
  useRowSelect,
  useSortBy,
  useTable,
} from 'react-table';
import type {
  MRT_ColumnInterface,
  MRT_FilterType,
  MRT_Row,
  MRT_TableInstance,
} from '.';
import { MRT_FILTER_TYPE } from './enums';
import { MRT_Icons } from './icons';
import { MRT_Localization } from './localization';
import { MaterialReactTableProps } from './MaterialReactTable';
import { findLowestLevelCols } from './utils';

export type UseMRT<D extends {} = {}> = MaterialReactTableProps<D> & {
  anyRowsCanExpand: boolean;
  anyRowsExpanded: boolean;
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
  setDensePadding: Dispatch<SetStateAction<boolean>>;
  setFullScreen: Dispatch<SetStateAction<boolean>>;
  setShowFilters: Dispatch<SetStateAction<boolean>>;
  setShowSearch: Dispatch<SetStateAction<boolean>>;
  tableInstance: MRT_TableInstance<D>;
};

const MaterialReactTableContext = (<D extends {} = {}>() =>
  createContext<UseMRT<D>>({} as UseMRT<D>) as Context<UseMRT<D>>)();

export const MaterialReactTableProvider = <D extends {} = {}>(
  props: PropsWithChildren<MaterialReactTableProps<D>>,
) => {
  const hooks: PluginHook<D>[] = [
    useFilters,
    useGlobalFilter,
    useGroupBy,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect,
  ];

  if (props.enableColumnResizing)
    hooks.unshift(useResizeColumns, useFlexLayout);

  const [currentEditingRow, setCurrentEditingRow] = useState<MRT_Row<D> | null>(
    null,
  );
  const [densePadding, setDensePadding] = useState(
    props.initialState?.densePadding ?? false,
  );
  const [fullScreen, setFullScreen] = useState(
    props.initialState?.fullScreen ?? false,
  );
  const [showFilters, setShowFilters] = useState(
    props.initialState?.showFilters ?? false,
  );
  const [showSearch, setShowSearch] = useState(
    props.initialState?.showSearch ?? false,
  );

  const [currentFilterTypes, setCurrentFilterTypes] = useState<{
    [key: string]: MRT_FilterType;
  }>(() =>
    Object.assign(
      {},
      ...findLowestLevelCols(props.columns).map((c) => ({
        [c.accessor as string]:
          c.filter ??
          props?.initialState?.filters?.[c.accessor as any] ??
          (!!c.filterSelectOptions ? 'equals' : 'fuzzy'),
      })),
    ),
  );

  const applyFiltersToColumns = useCallback(
    (cols: MRT_ColumnInterface[]) =>
      cols.map((column) => {
        if (column.columns) {
          applyFiltersToColumns(column.columns);
        } else {
          column.filter =
            props?.filterTypes?.[
              currentFilterTypes[column.accessor as string] as MRT_FILTER_TYPE
            ];
        }
        return column;
      }),
    [currentFilterTypes, props.filterTypes],
  );

  const columns = useMemo(
    () => applyFiltersToColumns(props.columns),
    [props.columns, applyFiltersToColumns],
  );

  const data = useMemo(
    () =>
      !props.isLoading || !!props.data.length
        ? props.data
        : [...Array(10).fill(null)].map((_) =>
            Object.assign(
              {},
              ...findLowestLevelCols(props.columns).map((c) => ({
                [c.accessor as string]: null,
              })),
            ),
          ),
    [props.data, props.isLoading],
  );

  const tableInstance = useTable(
    // @ts-ignore
    {
      ...props,
      // @ts-ignore
      columns,
      data,
      useControlledState: (state) =>
        useMemo(
          () => ({
            ...state,
            currentEditingRow,
            currentFilterTypes,
            densePadding,
            fullScreen,
            showFilters,
            showSearch,
            //@ts-ignore
            ...props?.useControlledState?.(state),
          }),
          [
            currentEditingRow,
            currentFilterTypes,
            densePadding,
            fullScreen,
            showFilters,
            showSearch,
            state,
          ],
        ),
    },
    ...hooks,
  ) as unknown as MRT_TableInstance<D>;

  const idPrefix = useMemo(
    () => props.idPrefix ?? Math.random().toString(36).substring(2, 9),
    [props.idPrefix],
  );
  const anyRowsCanExpand = useMemo(
    () => tableInstance.rows.some((row) => row.canExpand),
    [tableInstance.rows],
  );
  const anyRowsExpanded = useMemo(
    () => tableInstance.rows.some((row) => row.isExpanded),
    [tableInstance.rows],
  );

  return (
    <MaterialReactTableContext.Provider
      value={{
        ...props,
        anyRowsCanExpand,
        anyRowsExpanded,
        idPrefix,
        //@ts-ignore
        setCurrentEditingRow,
        setCurrentFilterTypes,
        setDensePadding,
        setFullScreen,
        setShowFilters,
        setShowSearch,
        //@ts-ignore
        tableInstance,
      }}
    >
      {props.children}
    </MaterialReactTableContext.Provider>
  );
};

export const useMRT = <D extends {} = {}>(): UseMRT<D> =>
  useContext<UseMRT<D>>(
    MaterialReactTableContext as unknown as Context<UseMRT<D>>,
  );
