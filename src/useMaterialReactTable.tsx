import React, {
  Context,
  createContext,
  PropsWithChildren,
  useContext,
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

  return (
    <MaterialReactTableContext.Provider
      value={{
        // @ts-ignore
        tableInstance,
        ...mrtCalcs,
        ...props,
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
