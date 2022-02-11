import React, {
  Context,
  createContext,
  PropsWithChildren,
  useContext,
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
import { MaterialReactTableProps } from './MaterialReactTable';
import { UseMRTCalcs, useMRTCalcs } from './utils/useMRTCalcs';

export interface UseMRT<D extends {}>
  extends MaterialReactTableProps<D>,
    UseMRTCalcs {
  currentEditingRow: Row<D> | null;
  densePadding: boolean;
  setCurrentEditingRow: (currentRowEditingId: Row<D> | null) => void;
  setDensePadding: (densePadding: boolean) => void;
  setShowFilters: (showFilters: boolean) => void;
  setShowSearch: (showSearch: boolean) => void;
  showFilters: boolean;
  showSearch: boolean;
  tableInstance: TableInstance<D>;
}

const MaterialReactTableContext = (<D extends {}>() =>
  createContext<UseMRT<D>>({} as UseMRT<D>) as Context<UseMRT<D>>)();

export const MaterialReactTableProvider = <D extends {}>(
  props: PropsWithChildren<MaterialReactTableProps<D>>,
) => {
  const hooks: PluginHook<D>[] = [
    useResizeColumns,
    useFilters,
    useGlobalFilter,
    useGroupBy,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect,
  ];

  if (props.enableColumnResizing) hooks.unshift(useFlexLayout);

  const tableInstance = useTable<D>(props, ...hooks);

  const mrtCalcs = useMRTCalcs({ tableInstance });

  const [showSearch, setShowSearch] = useState(
    props.defaultShowSearchTextField ?? false,
  );
  const [showFilters, setShowFilters] = useState<boolean>(
    props.defaultShowFilters ?? false,
  );
  const [densePadding, setDensePadding] = useState<boolean>(
    props.defaultDensePadding ?? false,
  );
  const [currentEditingRow, setCurrentEditingRow] = useState<Row | null>(null);

  return (
    <MaterialReactTableContext.Provider
      value={{
        ...mrtCalcs,
        ...props,
        currentEditingRow,
        densePadding,
        setCurrentEditingRow,
        setDensePadding,
        setShowFilters,
        setShowSearch,
        showFilters,
        showSearch,
        // @ts-ignore
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
