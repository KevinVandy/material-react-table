import React, {
  Context,
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';
import {
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

export interface UseMaterialReactTable<D extends {}>
  extends MaterialReactTableProps<D>,
    UseMRTCalcs {
  densePadding: boolean;
  setDensePadding: (densePadding: boolean) => void;
  setShowFilters: (showFilters: boolean) => void;
  showFilters: boolean;
  tableInstance: TableInstance<D>;
}

const MaterialReactTableContext = (<D extends {}>() =>
  createContext<UseMaterialReactTable<D>>(
    {} as UseMaterialReactTable<D>,
  ) as Context<UseMaterialReactTable<D>>)();

export const MaterialReactTableProvider = <D extends {}>(
  props: PropsWithChildren<MaterialReactTableProps<D>>,
) => {
  const tableInstance = useTable<D>(
    props,
    useFlexLayout,
    useResizeColumns,
    useFilters,
    useGlobalFilter,
    useGroupBy,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect,
  );

  const mrtCalcs = useMRTCalcs({ tableInstance });

  const [showFilters, setShowFilters] = useState<boolean>(
    props.defaultShowFilters ?? false,
  );
  const [densePadding, setDensePadding] = useState<boolean>(
    props.defaultDensePadding ?? false,
  );

  return (
    <MaterialReactTableContext.Provider
      value={{
        ...mrtCalcs,
        ...props,
        densePadding,
        setDensePadding,
        setShowFilters,
        showFilters,
        // @ts-ignore
        tableInstance,
      }}
    >
      {props.children}
    </MaterialReactTableContext.Provider>
  );
};

export const useMaterialReactTable = <
  D extends {},
>(): UseMaterialReactTable<D> =>
  //@ts-ignore
  useContext<UseMaterialReactTable<D>>(MaterialReactTableContext);
