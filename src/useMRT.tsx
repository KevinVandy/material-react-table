import React, {
  Context,
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from 'react';
import {
  PluginHook,
  Row,
  TableInstance,
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
import { MRT_Icons } from './icons';
import { MRT_Localization } from './localization';
import { MaterialReactTableProps } from './MaterialReactTable';

export type UseMRT<D extends {} = {}> = MaterialReactTableProps<D> & {
  anyRowsCanExpand: boolean;
  anyRowsExpanded: boolean;
  currentEditingRow: Row<D> | null;
  densePadding: boolean;
  fullScreen: boolean;
  icons: MRT_Icons;
  localization: MRT_Localization;
  setCurrentEditingRow: (currentRowEditingId: Row<D> | null) => void;
  setDensePadding: (densePadding: boolean) => void;
  setFullScreen: (fullScreen: boolean) => void;
  setShowFilters: (showFilters: boolean) => void;
  setShowSearch: (showSearch: boolean) => void;
  showFilters: boolean;
  showSearch: boolean;
  tableInstance: TableInstance<D>;
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

  const tableInstance = useTable<D>(props, ...hooks);

  const anyRowsCanExpand = useMemo(
    () => tableInstance.rows.some((row) => row.canExpand),
    [tableInstance.rows],
  );
  const anyRowsExpanded = useMemo(
    () => tableInstance.rows.some((row) => row.isExpanded),
    [tableInstance.rows],
  );
  const [currentEditingRow, setCurrentEditingRow] = useState<Row | null>(null);
  const [densePadding, setDensePadding] = useState(
    props.defaultDensePadding ?? false,
  );
  const [fullScreen, setFullScreen] = useState(
    props.defaultFullScreen ?? false,
  );
  const [showFilters, setShowFilters] = useState(
    props.defaultShowFilters ?? false,
  );
  const [showSearch, setShowSearch] = useState(
    props.defaultShowSearchTextField ?? false,
  );

  return (
    <MaterialReactTableContext.Provider
      value={{
        ...props,
        anyRowsCanExpand,
        anyRowsExpanded,
        currentEditingRow,
        densePadding,
        setCurrentEditingRow,
        setDensePadding,
        fullScreen,
        setFullScreen,
        setShowFilters,
        setShowSearch,
        showFilters,
        showSearch,
        //@ts-ignore
        tableInstance,
      }}
    >
      {props.children}
    </MaterialReactTableContext.Provider>
  );
};

export const useMRT = <D extends {}>(): UseMRT<D> =>
  //@ts-ignore
  useContext<UseMRT<D>>(MaterialReactTableContext);
