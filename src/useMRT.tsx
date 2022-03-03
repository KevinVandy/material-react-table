import React, {
  Context,
  PropsWithChildren,
  createContext,
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
import { MRT_Row, MRT_TableInstance } from '.';
import { MRT_Icons } from './icons';
import { MRT_Localization } from './localization';
import { MaterialReactTableProps } from './MaterialReactTable';

export type UseMRT<D extends {} = {}> = MaterialReactTableProps<D> & {
  anyRowsCanExpand: boolean;
  anyRowsExpanded: boolean;
  icons: MRT_Icons;
  localization: MRT_Localization;
  setCurrentEditingRow: (currentRowEditingId: MRT_Row<D> | null) => void;
  setDensePadding: (densePadding: boolean) => void;
  setFullScreen: (fullScreen: boolean) => void;
  setShowFilters: (showFilters: boolean) => void;
  setShowSearch: (showSearch: boolean) => void;
  tableInstance: MRT_TableInstance<D>;
};

const MaterialReactTableContext = (<D extends {}>() =>
  createContext<UseMRT<D>>({} as UseMRT<D>) as Context<UseMRT<D>>)();

export const MaterialReactTableProvider = <D extends {}>(
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

  const [currentEditingRow, setCurrentEditingRow] = useState<MRT_Row | null>(
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

  const tableInstance = useTable<D>(
    {
      ...props,
      useControlledState: (state) =>
        useMemo(
          () => ({
            ...state,
            currentEditingRow,
            densePadding,
            fullScreen,
            showFilters,
            showSearch,
            //@ts-ignore
            ...props?.useControlledState?.(state),
          }),
          [
            currentEditingRow,
            densePadding,
            fullScreen,
            showFilters,
            showSearch,
            state,
          ],
        ),
    },
    ...hooks,
  ) as MRT_TableInstance<D>;

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
        setCurrentEditingRow,
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

export const useMRT = <D extends {}>(): UseMRT<D> =>
  // @ts-ignore
  useContext<UseMRT<D>>(MaterialReactTableContext);
